// Agent Bill History JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sample bill data (in real app, this would come from database/API)
  const billHistory = [
    {
      id: "BIL20241210001",
      category: "electricity",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3500,
      date: "2024-12-10",
      txnId: "AGT4589623157",
      status: "paid",
      customerNumber: "01712345678",
      serviceCharge: 10,
      commission: 8,
    },
    {
      id: "BIL20241215002",
      category: "internet",
      provider: "Carnival Internet",
      providerLogo: "/images/providers/carnival.png",
      accountNumber: "CN987654",
      amount: 1200,
      date: "2024-12-15",
      txnId: "AGT4589624589",
      status: "paid",
      customerNumber: "01812345678",
      serviceCharge: 15,
      commission: 10,
    },
    {
      id: "BIL20241220003",
      category: "water",
      provider: "Dhaka WASA",
      providerLogo: "/images/providers/wasa.png",
      accountNumber: "WA456789",
      amount: 3800,
      date: "2024-12-20",
      txnId: "AGT4589626789",
      status: "paid",
      customerNumber: "01612345678",
      serviceCharge: 10,
      commission: 5,
    },
    {
      id: "BIL20241105004",
      category: "credit-card",
      provider: "BRAC Bank Credit Card",
      providerLogo: "/images/providers/brac-bank.png",
      accountNumber: "****4589",
      amount: 8000,
      date: "2024-11-05",
      txnId: "AGT4589628901",
      status: "paid",
      customerNumber: "01712345678",
      serviceCharge: 20,
      commission: 15,
    },
    {
      id: "BIL20241112005",
      category: "gas",
      provider: "Titas Gas",
      providerLogo: "/images/providers/titas.png",
      accountNumber: "TG123456",
      amount: 1500,
      date: "2024-11-12",
      txnId: "AGT4589629012",
      status: "paid",
      customerNumber: "01812345678",
      serviceCharge: 10,
      commission: 5,
    },
    {
      id: "BIL20241008006",
      category: "electricity",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3200,
      date: "2024-10-08",
      txnId: "AGT4589621023",
      status: "paid",
      customerNumber: "01712345678",
      serviceCharge: 10,
      commission: 8,
    },
    {
      id: "BIL20241015007",
      category: "telephone",
      provider: "BTCL",
      providerLogo: "/images/providers/btcl.png",
      accountNumber: "BT789456",
      amount: 950,
      date: "2024-10-15",
      txnId: "AGT4589622034",
      status: "paid",
      customerNumber: "01612345678",
      serviceCharge: 10,
      commission: 5,
    },
    {
      id: "BIL20241221008",
      category: "education",
      provider: "Dhaka University",
      providerLogo: "/images/providers/du.png",
      accountNumber: "EDU20245678",
      amount: 5500,
      date: "2024-12-21",
      txnId: "AGT4589630123",
      status: "pending",
      customerNumber: "01512345678",
      serviceCharge: 15,
      commission: 10,
    },
    {
      id: "BIL20241222009",
      category: "government",
      provider: "NID Service",
      providerLogo: "/images/providers/nid.png",
      accountNumber: "NID987654321",
      amount: 200,
      date: "2024-12-22",
      txnId: "AGT4589631234",
      status: "failed",
      customerNumber: "01912345678",
      serviceCharge: 10,
      commission: 0,
    },
  ];

  // Elements
  const monthDropdownBtn = document.getElementById("month-dropdown-btn");
  const yearDropdownBtn = document.getElementById("year-dropdown-btn");
  const categoryDropdownBtn = document.getElementById("category-dropdown-btn");
  const monthDropdownList = document.getElementById("month-dropdown-list");
  const yearDropdownList = document.getElementById("year-dropdown-list");
  const categoryDropdownList = document.getElementById(
    "category-dropdown-list"
  );
  const totalAmount = document.getElementById("total-amount");
  const totalCount = document.getElementById("total-count");
  const totalCommission = document.getElementById("total-commission");
  const historyList = document.getElementById("history-list");
  const emptyState = document.getElementById("empty-state");
  const noResults = document.getElementById("no-results");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const generatePdfBtn = document.getElementById("generate-pdf");
  const printReportBtn = document.getElementById("print-report");

  // Selected filter values
  let selectedMonth = null;
  let selectedYear = null;
  let selectedCategory = "all";

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

  // Category names in Bengali
  const categoryNames = {
    electricity: "বিদ্যুৎ",
    gas: "গ্যাস",
    water: "পানি",
    internet: "ইন্টারনেট",
    telephone: "টেলিফোন",
    tv: "টিভি",
    "credit-card": "ক্রেডিট কার্ড",
    government: "সরকারি ফি",
    insurance: "ইন্স্যুরেন্স",
    traffic: "ট্র্যাফিক",
    education: "শিক্ষা",
    others: "অন্যান্য",
  };

  // Format number with commas (Bengali style)
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

  // Handle dropdown toggle
  function toggleDropdown(btn, list) {
    // Close all other dropdowns
    document.querySelectorAll(".filter-dropdown-btn").forEach((dropBtn) => {
      if (dropBtn !== btn) {
        dropBtn.classList.remove("active");
      }
    });
    document.querySelectorAll(".filter-dropdown-list").forEach((dropList) => {
      if (dropList !== list) {
        dropList.classList.remove("show");
      }
    });

    // Toggle current dropdown
    btn.classList.toggle("active");
    list.classList.toggle("show");
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-dropdown-container")) {
      document.querySelectorAll(".filter-dropdown-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelectorAll(".filter-dropdown-list").forEach((list) => {
        list.classList.remove("show");
      });
    }
  });

  // Handle dropdown selection
  function handleDropdownSelection(container, value, text) {
    const btn = container.querySelector(".filter-dropdown-btn");
    const items = container.querySelectorAll(".filter-dropdown-item");

    // Update button text
    btn.querySelector("span").textContent = text;
    btn.classList.add("selected");

    // Update selected state
    items.forEach((item) => {
      item.classList.remove("selected");
      if (item.dataset.value === value) {
        item.classList.add("selected");
      }
    });

    // Close dropdown
    btn.classList.remove("active");
    container.querySelector(".filter-dropdown-list").classList.remove("show");
  }

  // Setup dropdown event listeners
  function setupDropdowns() {
    // Month dropdown
    monthDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(monthDropdownBtn, monthDropdownList);
    });

    monthDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedMonth = item.dataset.value;
          handleDropdownSelection(
            monthDropdownBtn.parentElement,
            selectedMonth,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });

    // Year dropdown
    yearDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(yearDropdownBtn, yearDropdownList);
    });

    yearDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedYear = item.dataset.value;
          handleDropdownSelection(
            yearDropdownBtn.parentElement,
            selectedYear,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });

    // Category dropdown
    categoryDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(categoryDropdownBtn, categoryDropdownList);
    });

    categoryDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedCategory = item.dataset.value;
          handleDropdownSelection(
            categoryDropdownBtn.parentElement,
            selectedCategory,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });
  }

  // Group bills by month and year
  function groupBillsByMonth(bills) {
    return bills.reduce((groups, bill) => {
      const date = new Date(bill.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(bill);
      return groups;
    }, {});
  }

  // Check if required filters are selected
  function checkFiltersSelected() {
    return selectedMonth !== null && selectedYear !== null;
  }

  // Filter bills based on selected criteria
  function filterBills() {
    if (!checkFiltersSelected()) {
      return [];
    }

    let filteredBills = billHistory;

    // Filter by year
    filteredBills = filteredBills.filter((bill) => {
      const billYear = new Date(bill.date).getFullYear().toString();
      return billYear === selectedYear;
    });

    // Filter by month
    filteredBills = filteredBills.filter((bill) => {
      const billMonth = new Date(bill.date).getMonth().toString();
      return billMonth === selectedMonth;
    });

    // Filter by category
    if (selectedCategory !== "all") {
      filteredBills = filteredBills.filter(
        (bill) => bill.category === selectedCategory
      );
    }

    return filteredBills;
  }

  // Update summary cards
  function updateSummary(bills) {
    const total = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const count = bills.length;
    const commission = bills.reduce((sum, bill) => sum + bill.commission, 0);

    totalAmount.textContent = `৳${formatNumber(total)}`;
    totalCount.textContent = `${count}টি`;
    totalCommission.textContent = `৳${formatNumber(commission)}`;
  }

  // Render bill item
  function renderBillItem(bill) {
    // Get status icon and class
    let statusIcon = '<i class="fas fa-check-circle"></i>';
    let statusText = "পরিশোধিত";

    if (bill.status === "pending") {
      statusIcon = '<i class="fas fa-clock"></i>';
      statusText = "প্রক্রিয়াধীন";
    } else if (bill.status === "failed") {
      statusIcon = '<i class="fas fa-times-circle"></i>';
      statusText = "ব্যর্থ";
    }

    return `
      <div class="bill-item" data-category="${
        bill.category
      }" data-bill-id="${bill.id}">
        <div class="bill-logo">
          <img src="${bill.providerLogo}" alt="${bill.provider}">
        </div>
        <div class="bill-details">
          <div class="bill-title">${bill.provider}</div>
          <div class="bill-customer">
            <span>গ্রাহক: ${bill.customerNumber}</span>
          </div>
          <div class="bill-info">
            <span>${
              bill.category === "credit-card"
                ? "Card"
                : bill.category === "internet"
                ? "User ID"
                : bill.category === "electricity" || bill.category === "gas"
                ? "মিটার নং"
                : "Account"
            }: ${bill.accountNumber}</span>
            <span class="separator">|</span>
            <span>${formatDate(bill.date)}</span>
          </div>
          <div class="bill-txn">TXN#: ${bill.txnId}</div>
        </div>
        <div class="bill-amount-section">
          <div class="bill-amount-container">
            <div class="bill-amount">৳${formatNumber(bill.amount)}</div>
            <div class="bill-commission">কমিশন: ৳${formatNumber(
              bill.commission
            )}</div>
          </div>
          <div class="bill-status ${bill.status}">
            ${statusIcon}
            <span>${statusText}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render grouped bills
  function renderBills(bills) {
    if (bills.length === 0) {
      historyList.style.display = "none";
      noResults.style.display = "block";
      document.querySelector(".load-more-container").classList.remove("show");
      generatePdfBtn.style.display = "none";
      printReportBtn.style.display = "none";
      return;
    }

    historyList.style.display = "block";
    noResults.style.display = "none";
    document.querySelector(".load-more-container").classList.add("show");
    generatePdfBtn.style.display = "flex";
    printReportBtn.style.display = "flex";

    const groupedBills = groupBillsByMonth(bills);
    historyList.innerHTML = "";

    // Sort groups by date (latest first)
    const sortedGroups = Object.keys(groupedBills).sort((a, b) => {
      const [yearA, monthA] = a.split("-").map(Number);
      const [yearB, monthB] = b.split("-").map(Number);
      return yearB - yearA || monthB - monthA;
    });

    sortedGroups.forEach((monthYear) => {
      const [year, month] = monthYear.split("-");
      const monthBills = groupedBills[monthYear];

      // Calculate month summary
      const monthTotal = monthBills.reduce((sum, bill) => sum + bill.amount, 0);
      const monthCount = monthBills.length;
      const monthCommission = monthBills.reduce(
        (sum, bill) => sum + bill.commission,
        0
      );

      // Create month group
      const monthGroup = document.createElement("div");
      monthGroup.className = "month-group";
      monthGroup.innerHTML = `
        <div class="month-header">
          <h4>${bengaliMonths[parseInt(month)]} ${year}</h4>
          <div class="month-summary">
            <span>মোট: ৳${formatNumber(monthTotal)}</span>
            <span class="separator">|</span>
            <span>${monthCount}টি বিল</span>
            <span class="separator">|</span>
            <span>কমিশন: ৳${formatNumber(monthCommission)}</span>
          </div>
        </div>
      `;

      // Add bills to month group
      monthBills.forEach((bill) => {
        monthGroup.innerHTML += renderBillItem(bill);
      });

      historyList.appendChild(monthGroup);
    });
  }

  // Initialize filters
  function initializeFilters() {
    setupDropdowns();

    // Hide summary cards initially
    document.querySelector(".summary-cards").style.display = "none";

    // Show empty state
    emptyState.style.display = "block";
    historyList.style.display = "none";
    noResults.style.display = "none";
  }

  // Check and apply filters
  function checkAndApplyFilters() {
    if (checkFiltersSelected()) {
      emptyState.style.display = "none";
      historyList.style.display = "block";
      document.querySelector(".summary-cards").style.display = "grid";
      applyFilters();
    } else {
      emptyState.style.display = "block";
      historyList.style.display = "none";
      document.querySelector(".summary-cards").style.display = "none";
    }
  }

  // Apply filters and render
  function applyFilters() {
    const filteredBills = filterBills();
    updateSummary(filteredBills);
    renderBills(filteredBills);
  }

  // Handle bill item click for detailed view
  function handleBillClick(event) {
    const billItem = event.target.closest(".bill-item");
    if (!billItem) return;

    const billId = billItem.dataset.billId;
    const bill = billHistory.find((b) => b.id === billId);

    if (bill) {
      showBillDetails(bill);
    }
  }

  // Show bill details modal
  function showBillDetails(bill) {
    const modal = document.createElement("div");
    modal.className = "bill-details-modal";

    // Get status class
    let statusClass = "paid";
    let statusText = "পরিশোধিত";

    if (bill.status === "pending") {
      statusClass = "pending";
      statusText = "প্রক্রিয়াধীন";
    } else if (bill.status === "failed") {
      statusClass = "failed";
      statusText = "ব্যর্থ";
    }

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>বিল বিবরণী</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="bill-detail-logo">
            <img src="${bill.providerLogo}" alt="${bill.provider}">
          </div>
          <h4>${bill.provider}</h4>
          <div class="detail-item">
            <span class="detail-label">ক্যাটাগরি</span>
            <span class="detail-value">${categoryNames[bill.category]}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">গ্রাহকের নম্বর</span>
            <span class="detail-value">${bill.customerNumber}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">অ্যাকাউন্ট নম্বর</span>
            <span class="detail-value">${bill.accountNumber}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">তারিখ</span>
            <span class="detail-value">${formatDate(bill.date)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">ট্রানজেকশন আইডি</span>
            <span class="detail-value">${bill.txnId}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">বিল পরিমাণ</span>
            <span class="detail-value amount">৳${formatNumber(
              bill.amount
            )}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">সার্ভিস চার্জ</span>
            <span class="detail-value">৳${formatNumber(
              bill.serviceCharge
            )}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">এজেন্ট কমিশন</span>
            <span class="detail-value commission">৳${formatNumber(
              bill.commission
            )}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">স্ট্যাটাস</span>
            <span class="detail-value">
              <span class="status-badge ${statusClass}">${statusText}</span>
            </span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="download-receipt-btn">
            <i class="fas fa-download"></i> রিসিট ডাউনলোড
          </button>
          <button class="print-receipt-btn">
            <i class="fas fa-print"></i> প্রিন্ট করুন
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector(".close-modal").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal
      .querySelector(".download-receipt-btn")
      .addEventListener("click", () => {
        downloadReceipt(bill);
      });

    modal.querySelector(".print-receipt-btn").addEventListener("click", () => {
      printReceipt(bill);
    });

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // Download receipt
  function downloadReceipt(bill) {
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
            <div class="detail-value">${bill.provider}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ক্যাটাগরি</div>
            <div class="detail-value">${categoryNames[bill.category]}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">গ্রাহকের নম্বর</div>
            <div class="detail-value">${bill.customerNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">অ্যাকাউন্ট নম্বর</div>
            <div class="detail-value">${bill.accountNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">তারিখ</div>
            <div class="detail-value">${formatDate(bill.date)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">বিল পরিমাণ</div>
            <div class="detail-value">৳${formatNumber(bill.amount)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">সার্ভিস চার্জ</div>
            <div class="detail-value">৳${formatNumber(bill.serviceCharge)}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">এজেন্ট কমিশন</div>
            <div class="detail-value commission">৳${formatNumber(
              bill.commission
            )}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ট্রানজেকশন আইডি</div>
            <div class="detail-value">${bill.txnId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">স্ট্যাটাস</div>
            <div class="detail-value">${
              bill.status === "paid"
                ? "পরিশোধিত"
                : bill.status === "pending"
                ? "প্রক্রিয়াধীন"
                : "ব্যর্থ"
            }</div>
          </div>
          
          <div class="detail-row total">
            <div class="detail-label">গ্রাহক পরিশোধিত</div>
            <div class="detail-value" style="color: #198ae2">৳${formatNumber(
              bill.amount + bill.serviceCharge
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
          <p>এই রিসিটটি আপনার বিল পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন</p>
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
    link.download = `বিকাশ_এজেন্ট_রিসিট_${bill.txnId}.html`;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Print receipt
  function printReceipt(bill) {
    // In a real app, this would print the receipt
    alert(`রিসিট প্রিন্ট হচ্ছে: ${bill.txnId}`);
  }

  // Generate PDF report
  function generatePDF() {
    const filteredBills = filterBills();

    // In a real app, this would use a PDF library like jsPDF
    alert(`PDF রিপোর্ট তৈরি হচ্ছে... (${filteredBills.length}টি বিল)`);
  }

  // Print report
  function printReport() {
    const filteredBills = filterBills();

    // In a real app, this would print the report
    alert(`রিপোর্ট প্রিন্ট হচ্ছে... (${filteredBills.length}টি বিল)`);
  }

  // Load more functionality
  function loadMore() {
    // In a real app, this would load more data from the server
    alert("আরও বিল লোড হচ্ছে...");
  }

  // Initialize
  function init() {
    initializeFilters();

    // Event listeners
    historyList.addEventListener("click", handleBillClick);
    loadMoreBtn.addEventListener("click", loadMore);
    generatePdfBtn.addEventListener("click", generatePDF);
    printReportBtn.addEventListener("click", printReport);
  }

  // Start the app
  init();
});
