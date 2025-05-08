// Agent Receipt JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sample receipt data
  const receipts = [
    {
      id: "REC001",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3500,
      date: "2024-12-10",
      txnId: "AGT4589623157",
      type: "receipt",
      customerNumber: "01712345678",
      serviceCharge: 10,
      commission: 8,
    },
    {
      id: "REC002",
      provider: "Carnival Internet",
      providerLogo: "/images/providers/carnival.png",
      accountNumber: "CN987654",
      amount: 1200,
      date: "2024-12-15",
      txnId: "AGT4589624589",
      type: "receipt",
      customerNumber: "01812345678",
      serviceCharge: 15,
      commission: 10,
    },
    {
      id: "REC003",
      provider: "Dhaka WASA",
      providerLogo: "/images/providers/wasa.png",
      accountNumber: "WA456789",
      amount: 3800,
      date: "2024-12-20",
      txnId: "AGT4589626789",
      type: "receipt",
      customerNumber: "01612345678",
      serviceCharge: 10,
      commission: 5,
    },
  ];

  // Sample token data
  const tokens = [
    {
      id: "TOK001",
      provider: "Palli Bidyut (Prepaid)",
      providerLogo: "/images/providers/palli-bidyut.png",
      accountNumber: "PB789456123",
      amount: 500,
      date: "2024-12-18",
      tokenCode: "2345-6789-0123-4567",
      units: "50 kWh",
      type: "token",
      customerNumber: "01712345678",
      serviceCharge: 10,
      commission: 5,
    },
    {
      id: "TOK002",
      provider: "NESCO (Prepaid)",
      providerLogo: "/images/providers/nesco.png",
      accountNumber: "NS654321789",
      amount: 750,
      date: "2024-12-22",
      tokenCode: "9876-5432-1098-7654",
      units: "75 kWh",
      type: "token",
      customerNumber: "01812345678",
      serviceCharge: 10,
      commission: 8,
    },
  ];

  // Elements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const receiptsContent = document.getElementById("receipts-content");
  const tokensContent = document.getElementById("tokens-content");
  const searchInput = document.getElementById("receipt-search");
  const clearSearchBtn = document.getElementById("clearReceiptSearch");
  const dateFilter = document.getElementById("date-filter");
  const noResults = document.getElementById("no-results");
  const loadMoreBtn = document.getElementById("load-more-btn");

  // Bengali month names
  const bengaliMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  // Current active tab
  let activeTab = "receipts";

  // Format number with commas
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Format date to Bengali
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = bengaliMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Get formatted time from date string
  function formatTime(dateStr) {
    const date = new Date(dateStr);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update tab buttons
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      // Update content visibility
      const tabId = this.dataset.tab;
      activeTab = tabId;

      if (tabId === "receipts") {
        receiptsContent.classList.add("active");
        tokensContent.classList.remove("active");
      } else {
        tokensContent.classList.add("active");
        receiptsContent.classList.remove("active");
      }
    });
  });

  // Filter items based on search and date
  function filterItems() {
    const searchValue = searchInput?.value.toLowerCase() || "";
    const dateValue = dateFilter?.value || "all";

    let filteredItems = activeTab === "receipts" ? receipts : tokens;

    // Search filter
    if (searchValue) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.provider.toLowerCase().includes(searchValue) ||
          item.accountNumber.toLowerCase().includes(searchValue) ||
          item.customerNumber.toLowerCase().includes(searchValue) ||
          (item.txnId && item.txnId.toLowerCase().includes(searchValue)) ||
          (item.tokenCode && item.tokenCode.toLowerCase().includes(searchValue))
      );
    }

    // Date filter
    if (dateValue !== "all") {
      const currentDate = new Date();
      let startDate;

      switch (dateValue) {
        case "today":
          startDate = new Date(currentDate);
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 7);
          break;
        case "month":
          startDate = new Date(currentDate);
          startDate.setDate(1);
          break;
      }

      if (startDate) {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) >= startDate
        );
      }
    }

    return filteredItems;
  }

  // Show receipt details modal
  function showReceiptDetails(receiptId) {
    const receipt = receipts.find((r) => r.id === receiptId);
    if (!receipt) return;

    const modal = document.createElement("div");
    modal.className = "receipt-modal";

    // Create formatted date and time
    const formattedDate = formatDate(receipt.date);
    const formattedTime = formatTime(receipt.date);
    const totalAmount = receipt.amount + receipt.serviceCharge;

    modal.innerHTML = `
      <div class="receipt-modal-content">
        <div class="receipt-modal-header">
          <h3>রিসিট বিবরণী</h3>
          <button class="close-receipt-modal">&times;</button>
        </div>
        <div class="receipt-modal-body">
          <div class="receipt-preview">
            <div class="receipt-preview-header">
              <div class="receipt-preview-logo">
                <img src="${receipt.providerLogo}" alt="${receipt.provider}">
              </div>
              <div class="receipt-preview-title">বিকাশ এজেন্ট</div>
              <div class="receipt-preview-subtitle">বিল পেমেন্ট রিসিট</div>
            </div>
            
            <div class="receipt-preview-body">
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">এজেন্ট নাম</div>
                <div class="receipt-detail-value">শাহজালাল স্টোর</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">প্রতিষ্ঠান</div>
                <div class="receipt-detail-value">${receipt.provider}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">গ্রাহকের নম্বর</div>
                <div class="receipt-detail-value">${
                  receipt.customerNumber
                }</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">অ্যাকাউন্ট নম্বর</div>
                <div class="receipt-detail-value">${receipt.accountNumber}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">তারিখ</div>
                <div class="receipt-detail-value">${formattedDate}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">সময়</div>
                <div class="receipt-detail-value">${formattedTime}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">ট্রানজেকশন আইডি</div>
                <div class="receipt-detail-value">${receipt.txnId}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">বিল পরিমাণ</div>
                <div class="receipt-detail-value">৳${formatNumber(
                  receipt.amount
                )}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">সার্ভিস চার্জ</div>
                <div class="receipt-detail-value">৳${formatNumber(
                  receipt.serviceCharge
                )}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">এজেন্ট কমিশন</div>
                <div class="receipt-detail-value commission">৳${formatNumber(
                  receipt.commission
                )}</div>
              </div>
              <div class="receipt-detail-row total">
                <div class="receipt-detail-label">মোট পরিশোধিত</div>
                <div class="receipt-detail-value amount">৳${formatNumber(
                  totalAmount
                )}</div>
              </div>
            </div>
            
            <div class="receipt-barcode">
              <svg width="200" height="60" class="barcode-image">
                <!-- Simple barcode representation -->
                <rect x="10" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="18" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="25" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="35" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="45" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="52" y="5" width="8" height="50" fill="#333"></rect>
                <rect x="65" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="72" y="5" width="5" height="50" fill="#333"></rect>
                <rect x="82" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="90" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="100" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="108" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="118" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="125" y="5" width="7" height="50" fill="#333"></rect>
                <rect x="135" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="142" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="150" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="158" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="168" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="180" y="5" width="3" height="50" fill="#333"></rect>
              </svg>
            </div>
            
            <div class="receipt-footer">
              <p>এই রিসিটটি গ্রাহকের বিল পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন</p>
              <p>বিকাশ এজেন্ট সাপোর্টঃ 16247 (Option 2)</p>
              <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
          </div>
        </div>
        <div class="receipt-modal-footer">
          <button class="download-receipt-btn">
            <i class="fas fa-download"></i> ডাউনলোড করুন
          </button>
          <button class="print-receipt-btn">
            <i class="fas fa-print"></i> প্রিন্ট করুন
          </button>
          <button class="share-receipt-btn">
            <i class="fas fa-share-alt"></i> শেয়ার করুন
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal
      .querySelector(".close-receipt-modal")
      .addEventListener("click", () => {
        document.body.removeChild(modal);
      });

    modal
      .querySelector(".download-receipt-btn")
      .addEventListener("click", () => {
        downloadReceipt(receipt);
      });

    modal.querySelector(".print-receipt-btn").addEventListener("click", () => {
      printReceipt(receipt);
    });

    modal.querySelector(".share-receipt-btn").addEventListener("click", () => {
      shareReceipt(receipt);
    });

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // Show token details modal
  function showTokenDetails(tokenId) {
    const token = tokens.find((t) => t.id === tokenId);
    if (!token) return;

    const modal = document.createElement("div");
    modal.className = "receipt-modal";

    // Create formatted date and time
    const formattedDate = formatDate(token.date);
    const formattedTime = formatTime(token.date);
    const totalAmount = token.amount + token.serviceCharge;

    modal.innerHTML = `
      <div class="receipt-modal-content">
        <div class="receipt-modal-header">
          <h3>টোকেন বিবরণী</h3>
          <button class="close-receipt-modal">&times;</button>
        </div>
        <div class="receipt-modal-body">
          <div class="receipt-preview">
            <div class="receipt-preview-header">
              <div class="receipt-preview-logo">
                <img src="${token.providerLogo}" alt="${token.provider}">
              </div>
              <div class="receipt-preview-title">বিকাশ এজেন্ট</div>
              <div class="receipt-preview-subtitle">প্রিপেইড টোকেন</div>
            </div>
            
            <div class="token-label">টোকেন নম্বর</div>
            <div class="token-value">${token.tokenCode}</div>
            
            <div class="receipt-preview-body">
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">এজেন্ট নাম</div>
                <div class="receipt-detail-value">শাহজালাল স্টোর</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">প্রতিষ্ঠান</div>
                <div class="receipt-detail-value">${token.provider}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">গ্রাহকের নম্বর</div>
                <div class="receipt-detail-value">${token.customerNumber}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">মিটার নম্বর</div>
                <div class="receipt-detail-value">${token.accountNumber}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">ইউনিট</div>
                <div class="receipt-detail-value">${token.units}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">তারিখ</div>
                <div class="receipt-detail-value">${formattedDate}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">সময়</div>
                <div class="receipt-detail-value">${formattedTime}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">বিল পরিমাণ</div>
                <div class="receipt-detail-value">৳${formatNumber(
                  token.amount
                )}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">সার্ভিস চার্জ</div>
                <div class="receipt-detail-value">৳${formatNumber(
                  token.serviceCharge
                )}</div>
              </div>
              <div class="receipt-detail-row">
                <div class="receipt-detail-label">এজেন্ট কমিশন</div>
                <div class="receipt-detail-value commission">৳${formatNumber(
                  token.commission
                )}</div>
              </div>
              <div class="receipt-detail-row total">
                <div class="receipt-detail-label">মোট পরিশোধিত</div>
                <div class="receipt-detail-value amount">৳${formatNumber(
                  totalAmount
                )}</div>
              </div>
            </div>
            
            <div class="receipt-barcode">
              <svg width="200" height="60" class="barcode-image">
                <!-- Simple barcode representation -->
                <rect x="10" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="18" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="25" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="35" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="45" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="52" y="5" width="8" height="50" fill="#333"></rect>
                <rect x="65" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="72" y="5" width="5" height="50" fill="#333"></rect>
                <rect x="82" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="90" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="100" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="108" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="118" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="125" y="5" width="7" height="50" fill="#333"></rect>
                <rect x="135" y="5" width="3" height="50" fill="#333"></rect>
                <rect x="142" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="150" y="5" width="2" height="50" fill="#333"></rect>
                <rect x="158" y="5" width="6" height="50" fill="#333"></rect>
                <rect x="168" y="5" width="4" height="50" fill="#333"></rect>
                <rect x="180" y="5" width="3" height="50" fill="#333"></rect>
              </svg>
            </div>
            
            <div class="receipt-footer">
              <p>এই টোকেনটি গ্রাহকের বিল পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন</p>
              <p>বিকাশ এজেন্ট সাপোর্টঃ 16247 (Option 2)</p>
              <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
          </div>
        </div>
        <div class="receipt-modal-footer">
          <button class="download-token-btn">
            <i class="fas fa-download"></i> ডাউনলোড করুন
          </button>
          <button class="print-token-btn">
            <i class="fas fa-print"></i> প্রিন্ট করুন
          </button>
          <button class="copy-token-code-btn" data-token="${token.tokenCode}">
            <i class="fas fa-copy"></i> টোকেন কপি করুন
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal
      .querySelector(".close-receipt-modal")
      .addEventListener("click", () => {
        document.body.removeChild(modal);
      });

    modal.querySelector(".download-token-btn").addEventListener("click", () => {
      downloadToken(token);
    });

    modal.querySelector(".print-token-btn").addEventListener("click", () => {
      printToken(token);
    });

    modal
      .querySelector(".copy-token-code-btn")
      .addEventListener("click", function () {
        const tokenCode = this.dataset.token;
        copyToClipboard(tokenCode);
      });

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // Download receipt
  function downloadReceipt(receipt) {
    // Create formatted date and time
    const formattedDate = formatDate(receipt.date);
    const formattedTime = formatTime(receipt.date);
    const totalAmount = receipt.amount + receipt.serviceCharge;

    const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>বিকাশ এজেন্ট - বিল রিসিট</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .receipt {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #198ae2;
          padding-bottom: 20px;
        }
        .logo {
          color: #198ae2;
          font-size: 28px;
          font-weight: bold;
        }
        .title {
          font-size: 24px;
          margin-top: 10px;
          color: #333;
        }
        .success-icon {
          color: #28a745;
          font-size: 50px;
          display: block;
          margin: 20px auto;
        }
        .receipt-type {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-bottom: 20px;
        }
        .details {
          margin-bottom: 30px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          color: #666;
          flex: 1;
        }
        .detail-value {
          color: #333;
          font-weight: 500;
          flex: 1;
          text-align: right;
        }
        .total {
          font-weight: bold;
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .commission {
          color: #28a745;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          color: #777;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
        .barcode {
          text-align: center;
          margin: 30px 0;
        }
        .agent-info {
          text-align: center;
          margin-bottom: 20px;
          color: #198ae2;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">বিকাশ এজেন্ট</div>
          <div class="title">বিল পেমেন্ট রিসিট</div>
        </div>
        
        <div class="agent-info">শাহজালাল স্টোর</div>
        <div class="success-icon">✓</div>
        <div class="receipt-type">এজেন্ট কপি</div>
        
        <div class="details">
          <div class="detail-row">
            <div class="detail-label">প্রতিষ্ঠান</div>
            <div class="detail-value">${receipt.provider}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">গ্রাহকের নম্বর</div>
            <div class="detail-value">${receipt.customerNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">অ্যাকাউন্ট নম্বর</div>
            <div class="detail-value">${receipt.accountNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">তারিখ</div>
            <div class="detail-value">${formattedDate}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">সময়</div>
            <div class="detail-value">${formattedTime}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ট্রানজেকশন আইডি</div>
            <div class="detail-value">${receipt.txnId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">বিল পরিমাণ</div>
            <div class="detail-value">৳${formatNumber(receipt.amount)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">সার্ভিস চার্জ</div>
            <div class="detail-value">৳${formatNumber(
              receipt.serviceCharge
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">এজেন্ট কমিশন</div>
            <div class="detail-value commission">৳${formatNumber(
              receipt.commission
            )}</div>
          </div>
          <div class="detail-row total">
            <div class="detail-label">মোট পরিশোধিত</div>
            <div class="detail-value" style="color: #198ae2">৳${formatNumber(
              totalAmount
            )}</div>
          </div>
        </div>
        
        <div class="barcode">
          <svg width="200" height="80">
            <!-- Simple barcode representation -->
            <rect x="10" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="18" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="25" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="35" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="45" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="52" y="10" width="8" height="60" fill="#333"></rect>
            <rect x="65" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="72" y="10" width="5" height="60" fill="#333"></rect>
            <rect x="82" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="90" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="100" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="108" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="118" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="125" y="10" width="7" height="60" fill="#333"></rect>
            <rect x="135" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="142" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="150" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="158" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="168" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="180" y="10" width="3" height="60" fill="#333"></rect>
          </svg>
        </div>
        
        <div class="footer">
          <p>এই রিসিটটি গ্রাহকের বিল পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন</p>
          <p>বিকাশ এজেন্ট সাপোর্টঃ 16247 (Option 2)</p>
          <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([receiptContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `রিসিট_${receipt.txnId}.html`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Download token
  function downloadToken(token) {
    // Create formatted date and time
    const formattedDate = formatDate(token.date);
    const formattedTime = formatTime(token.date);
    const totalAmount = token.amount + token.serviceCharge;

    const tokenContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>বিকাশ এজেন্ট - টোকেন</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .receipt {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #198ae2;
          padding-bottom: 20px;
        }
        .logo {
          color: #198ae2;
          font-size: 28px;
          font-weight: bold;
        }
        .title {
          font-size: 24px;
          margin-top: 10px;
          color: #333;
        }
        .token-label {
          text-align: center;
          margin: 15px 0;
          padding: 10px;
          background-color: #f0f7ff;
          border-radius: 8px;
          color: #198ae2;
          font-weight: 600;
        }
        .token-value {
          text-align: center;
          font-family: monospace;
          font-size: 24px;
          letter-spacing: 2px;
          margin: 10px 0 30px;
          padding: 15px;
          background-color: #fff;
          border: 2px dashed #198ae2;
          border-radius: 8px;
          color: #333;
        }
        .details {
          margin-bottom: 30px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-label {
          color: #666;
          flex: 1;
        }
        .detail-value {
          color: #333;
          font-weight: 500;
          flex: 1;
          text-align: right;
        }
        .total {
          font-weight: bold;
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .commission {
          color: #28a745;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          color: #777;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
        .barcode {
          text-align: center;
          margin: 30px 0;
        }
        .agent-info {
          text-align: center;
          margin-bottom: 20px;
          color: #198ae2;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">বিকাশ এজেন্ট</div>
          <div class="title">প্রিপেইড টোকেন</div>
        </div>
        
        <div class="agent-info">শাহজালাল স্টোর</div>
        
        <div class="token-label">টোকেন নম্বর</div>
        <div class="token-value">${token.tokenCode}</div>
        
        <div class="details">
          <div class="detail-row">
            <div class="detail-label">প্রতিষ্ঠান</div>
            <div class="detail-value">${token.provider}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">গ্রাহকের নম্বর</div>
            <div class="detail-value">${token.customerNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">মিটার নম্বর</div>
            <div class="detail-value">${token.accountNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ইউনিট</div>
            <div class="detail-value">${token.units}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">তারিখ</div>
            <div class="detail-value">${formattedDate}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">সময়</div>
            <div class="detail-value">${formattedTime}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">বিল পরিমাণ</div>
            <div class="detail-value">৳${formatNumber(token.amount)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">সার্ভিস চার্জ</div>
            <div class="detail-value">৳${formatNumber(
              token.serviceCharge
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">এজেন্ট কমিশন</div>
            <div class="detail-value commission">৳${formatNumber(
              token.commission
            )}</div>
          </div>
          <div class="detail-row total">
            <div class="detail-label">মোট পরিশোধিত</div>
            <div class="detail-value" style="color: #198ae2">৳${formatNumber(
              totalAmount
            )}</div>
          </div>
        </div>
        
        <div class="barcode">
          <svg width="200" height="80">
            <!-- Simple barcode representation -->
            <rect x="10" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="18" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="25" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="35" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="45" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="52" y="10" width="8" height="60" fill="#333"></rect>
            <rect x="65" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="72" y="10" width="5" height="60" fill="#333"></rect>
            <rect x="82" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="90" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="100" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="108" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="118" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="125" y="10" width="7" height="60" fill="#333"></rect>
            <rect x="135" y="10" width="3" height="60" fill="#333"></rect>
            <rect x="142" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="150" y="10" width="2" height="60" fill="#333"></rect>
            <rect x="158" y="10" width="6" height="60" fill="#333"></rect>
            <rect x="168" y="10" width="4" height="60" fill="#333"></rect>
            <rect x="180" y="10" width="3" height="60" fill="#333"></rect>
          </svg>
        </div>
        
        <div class="footer">
          <p>এই টোকেনটি গ্রাহকের বিল পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন</p>
          <p>বিকাশ এজেন্ট সাপোর্টঃ 16247 (Option 2)</p>
          <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([tokenContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `টোকেন_${token.accountNumber}.html`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Print receipt
  function printReceipt(receipt) {
    // In a real app, this would print the receipt
    alert(`রিসিট প্রিন্ট হচ্ছে: ${receipt.txnId}`);
  }

  // Print token
  function printToken(token) {
    // In a real app, this would print the token
    alert(`টোকেন প্রিন্ট হচ্ছে: ${token.tokenCode}`);
  }

  // Share receipt
  function shareReceipt(receipt) {
    if (navigator.share) {
      navigator
        .share({
          title: `${receipt.provider} - রিসিট`,
          text: `বিকাশ এজেন্ট রিসিট\nপ্রতিষ্ঠান: ${receipt.provider}\nগ্রাহক: ${
            receipt.customerNumber
          }\nমূল্য: ৳${formatNumber(receipt.amount)}`,
          url: window.location.href,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.log("Error sharing:", error);
        });
    } else {
      alert("শেয়ার করার জন্য দুঃখিত, আপনার ডিভাইস এই ফিচার সাপোর্ট করে না।");
    }
  }

  // Copy to clipboard
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show success message
        const popup = document.createElement("div");
        popup.className = "copy-popup";
        popup.innerHTML = `<i class="fas fa-check"></i> টোকেন কপি হয়েছে`;
        document.body.appendChild(popup);

        // Remove popup after 2 seconds
        setTimeout(() => {
          popup.style.animation = "fadeOut 0.3s ease-out";
          setTimeout(() => {
            document.body.removeChild(popup);
          }, 300);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("কপি করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      });
  }

  // Add event listeners to action buttons
  function addActionButtonListeners() {
    // Receipts view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        showReceiptDetails(receiptId);
      });
    });

    // Receipts print buttons
    document.querySelectorAll(".print-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        const receipt = receipts.find((r) => r.id === receiptId);
        if (receipt) {
          printReceipt(receipt);
        }
      });
    });

    // Receipts share buttons
    document.querySelectorAll(".share-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        const receipt = receipts.find((r) => r.id === receiptId);
        if (receipt) {
          shareReceipt(receipt);
        }
      });
    });

    // Tokens view buttons
    document.querySelectorAll(".view-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenId = this.dataset.tokenId;
        showTokenDetails(tokenId);
      });
    });

    // Tokens print buttons
    document.querySelectorAll(".print-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenId = this.dataset.tokenId;
        const token = tokens.find((t) => t.id === tokenId);
        if (token) {
          printToken(token);
        }
      });
    });

    // Tokens share buttons
    document.querySelectorAll(".share-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenId = this.dataset.tokenId;
        const token = tokens.find((t) => t.id === tokenId);
        if (token) {
          shareReceipt(token); // Use the same share function
        }
      });
    });

    // Copy token buttons
    document.querySelectorAll(".copy-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenCode =
          this.parentElement.querySelector(".token-code").textContent;
        copyToClipboard(tokenCode);
      });
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      if (activeTab === "receipts") {
        // Filter receipt items
        document
          .querySelectorAll("#receipts-content .receipt-item")
          .forEach((item) => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchValue)) {
              item.style.display = "flex";
            } else {
              item.style.display = "none";
            }
          });

        // Check if any receipt items are visible
        const hasVisibleItems = Array.from(
          document.querySelectorAll("#receipts-content .receipt-item")
        ).some((item) => item.style.display !== "none");

        document.getElementById("no-results").style.display = hasVisibleItems
          ? "none"
          : "block";
      } else {
        // Filter token items
        document
          .querySelectorAll("#tokens-content .token-item")
          .forEach((item) => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchValue)) {
              item.style.display = "flex";
            } else {
              item.style.display = "none";
            }
          });

        // Check if any token items are visible
        const hasVisibleItems = Array.from(
          document.querySelectorAll("#tokens-content .token-item")
        ).some((item) => item.style.display !== "none");

        document.getElementById("no-results").style.display = hasVisibleItems
          ? "none"
          : "block";
      }
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();

        // Show all items
        if (activeTab === "receipts") {
          document
            .querySelectorAll("#receipts-content .receipt-item")
            .forEach((item) => {
              item.style.display = "flex";
            });
        } else {
          document
            .querySelectorAll("#tokens-content .token-item")
            .forEach((item) => {
              item.style.display = "flex";
            });
        }

        // Hide no results message
        document.getElementById("no-results").style.display = "none";
      }
    });
  }

  // Date filter dropdown
  if (dateFilter) {
    dateFilter.addEventListener("change", function () {
      // Implement date filtering here
      // This would typically query the server for the date range
      alert(`সময়ের পরিসর পরিবর্তন করা হয়েছে: ${this.value}`);

      // In a real implementation, this would update the displayed items
    });
  }

  // Load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // Implement load more functionality here
      // In a real app, this would load more data from the server
      alert("আরও রিসিট/টোকেন লোড হচ্ছে...");
    });
  }

  // Initialize
  function init() {
    // Add event listeners to action buttons
    addActionButtonListeners();
  }

  // Start the app
  init();
});
