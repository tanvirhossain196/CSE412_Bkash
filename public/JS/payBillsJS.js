document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  // Sections
  const categorySection = document.getElementById("categorySection");
  const providerSection = document.getElementById("providerSection");
  const billInfoSection = document.getElementById("billInfoSection");
  const billConfirmSection = document.getElementById("billConfirmSection");
  const pinSection = document.getElementById("pinSection");

  // Navigation Buttons
  const backToCategoryBtn = document.getElementById("backToCategoryBtn");
  const backToProviderBtn = document.getElementById("backToProviderBtn");
  const backToBillInfoBtn = document.getElementById("backToBillInfoBtn");
  const backToConfirmBtn = document.getElementById("backToConfirmBtn");
  const billInfoNextBtn = document.getElementById("billInfoNextBtn");
  const payBillBtn = document.getElementById("payBillBtn");
  const confirmPinBtn = document.getElementById("confirmPinBtn");

  // Search Elements
  const billSearchInput = document.getElementById("bill-search");
  const clearBillSearchBtn = document.getElementById("clearBillSearch");
  const providerSearchInput = document.getElementById("provider-search");
  const clearProviderSearchBtn = document.getElementById("clearProviderSearch");

  // Form Elements
  const meterNumberInput = document.getElementById("meter-number");
  const billAmountInput = document.getElementById("bill-amount");
  const referenceInput = document.getElementById("reference");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const contactNumberInput = document.getElementById("contact-number"); // New contact number field
  const billMonthSelect = document.getElementById("bill-month"); // New month selection field

  // Category and Provider Elements
  const categoryItems = document.querySelectorAll(".bill-category-item");
  const billItems = document.querySelectorAll(".bill-item");
  const providerItems = document.querySelectorAll(".provider-item");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // Selected Elements
  const selectedCategoryName = document.getElementById("selectedCategoryName");
  const selectedProviderName = document.getElementById("selectedProviderName");
  const confirmProviderName = document.getElementById("confirmProviderName");
  const confirmProviderCategory = document.getElementById(
    "confirmProviderCategory"
  );
  const confirmMeterNumber = document.getElementById("confirmMeterNumber");
  const confirmBillAmount = document.getElementById("confirmBillAmount");
  const confirmCharge = document.getElementById("confirmCharge");
  const confirmTotalAmount = document.getElementById("confirmTotalAmount");
  const pinProviderName = document.getElementById("pinProviderName");
  const pinBillAmount = document.getElementById("pinBillAmount");
  const confirmProviderLogo = document.getElementById("confirmProviderLogo");
  const pinProviderLogo = document.getElementById("pinProviderLogo");

  // New confirmation fields
  const confirmContactNumber = document.getElementById("confirmContactNumber");
  const confirmBillMonth = document.getElementById("confirmBillMonth");

  // Variables
  let selectedCategory = null;
  let selectedProvider = null;
  let currentBillAmount = 0;
  let serviceCharge = 0;
  let currentBillMonth = "";
  let currentContactNumber = "";
  let billReference = "";
  let transactionId = "";

  // Configure field settings for different bill categories
  const categoryFieldConfig = {
    electricity: {
      accountLabel: "মিটার/একাউন্ট নম্বর",
      accountPlaceholder: "মিটার/একাউন্ট নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) => value.trim().length === 13,
      accountErrorMsg: "মিটার নম্বর অবশ্যই ১৩ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: true,
    },
    gas: {
      accountLabel: "বিল অ্যাকাউন্ট নম্বর",
      accountPlaceholder: "বিল অ্যাকাউন্ট নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) =>
        value.trim().length >= 8 && value.trim().length <= 15,
      accountErrorMsg: "অ্যাকাউন্ট নম্বর অবশ্যই ৮-১৫ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: true,
    },
    water: {
      accountLabel: "বিল নম্বর",
      accountPlaceholder: "বিল নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) =>
        value.trim().length >= 5 && value.trim().length <= 12,
      accountErrorMsg: "বিল নম্বর অবশ্যই ৫-১২ অক্ষরের হতে হবে",
      showContact: true,
      showMonth: true,
    },
    internet: {
      accountLabel: "ইউজার আইডি",
      accountPlaceholder: "ইউজার আইডি লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক ইউজার আইডি দিন",
      showContact: true,
      showMonth: true,
    },
    telephone: {
      accountLabel: "আইপি ফোন নম্বর",
      accountPlaceholder: "আইপি ফোন নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক আইপি ফোন নম্বর দিন",
      showContact: true,
      showMonth: true,
    },
    tv: {
      accountLabel: "কাস্টমার আইডি",
      accountPlaceholder: "কাস্টমার আইডি লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক কাস্টমার আইডি দিন",
      showContact: true,
      showMonth: false,
    },
    "credit-card": {
      accountLabel: "কার্ড নম্বর",
      accountPlaceholder: "১৬ ডিজিট কার্ড নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) => value.trim().length === 16,
      accountErrorMsg: "কার্ড নম্বর অবশ্যই ১৬ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: false,
    },
    government: {
      accountLabel: "এনআইডি নম্বর",
      accountPlaceholder: "এনআইডি নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) =>
        value.trim().length === 10 || value.trim().length === 17,
      accountErrorMsg: "সঠিক এনআইডি নম্বর দিন (১০ বা ১৭ সংখ্যা)",
      showContact: true,
      showMonth: false,
    },
    insurance: {
      accountLabel: "পলিসি নম্বর",
      accountPlaceholder: "পলিসি নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক পলিসি নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
    traffic: {
      accountLabel: "বিলার আইডি নম্বর",
      accountPlaceholder: "বিলার আইডি নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক বিলার আইডি নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
    others: {
      accountLabel: "বুরো শাখা নম্বর",
      accountPlaceholder: "বুরো শাখা নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 3,
      accountErrorMsg: "সঠিক বুরো শাখা নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
  };

  // Default field config if category not found
  const defaultFieldConfig = {
    accountLabel: "একাউন্ট নম্বর",
    accountPlaceholder: "একাউন্ট নম্বর লিখুন",
    accountType: "text",
    accountValidation: (value) => value.trim().length > 0,
    accountErrorMsg: "একাউন্ট নম্বর দিন",
    showContact: true,
    showMonth: true,
  };

  // Function to update bill info form based on selected category
  function updateBillInfoForm(category) {
    // Get field configuration for the selected category
    const fieldConfig = categoryFieldConfig[category] || defaultFieldConfig;

    // Update account field
    const accountField = document.querySelector(
      '.form-field label[for="meter-number"]'
    );
    const accountInput = document.getElementById("meter-number");

    if (accountField) {
      accountField.textContent = fieldConfig.accountLabel;
    }

    if (accountInput) {
      accountInput.placeholder = fieldConfig.accountPlaceholder;
      accountInput.type = fieldConfig.accountType;

      // Clear any existing input and error messages
      accountInput.value = "";
      const errorMsg =
        accountInput.parentElement.querySelector(".error-message");
      if (errorMsg) {
        errorMsg.remove();
      }
      accountInput.parentElement.classList.remove("error");
    }

    // Show/hide contact number field
    const contactField = document.querySelector(
      ".form-field:has(#contact-number)"
    );
    if (contactField) {
      contactField.style.display = fieldConfig.showContact ? "block" : "none";
      document.getElementById("contact-number").value = "";
    }

    // Show/hide month selection field
    const monthField = document.querySelector(".form-field:has(#bill-month)");
    if (monthField) {
      monthField.style.display = fieldConfig.showMonth ? "block" : "none";
      document.getElementById("bill-month").selectedIndex = 0;
    }

    // Clear bill amount
    const billAmountInput = document.getElementById("bill-amount");
    if (billAmountInput) {
      billAmountInput.value = "";
    }

    // Disable next button until valid inputs are provided
    if (billInfoNextBtn) {
      billInfoNextBtn.disabled = true;
    }
  }

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Get month name in Bangla
  function getBanglaMonthName(value) {
    const monthMap = {
      january: "জানুয়ারি",
      february: "ফেব্রুয়ারি",
      march: "মার্চ",
      april: "এপ্রিল",
      may: "মে",
      june: "জুন",
      july: "জুলাই",
      august: "অগাস্ট",
      september: "সেপ্টেম্বর",
      october: "অক্টোবর",
      november: "নভেম্বর",
      december: "ডিসেম্বর",
    };
    return monthMap[value] || "";
  }

  // Generate PDF for download
  function generatePDF(data) {
    const fieldConfig =
      categoryFieldConfig[selectedCategory] || defaultFieldConfig;

    const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>বিকাশ বিল রিসিট</title>
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
          border-bottom: 2px solid #e2146c;
          padding-bottom: 20px;
        }
        .logo {
          color: #e2146c;
          font-size: 28px;
          font-weight: bold;
        }
        .title {
          font-size: 24px;
          margin-top: 10px;
          color: #333;
        }
        .success-icon {
          color: #2ecc71;
          font-size: 50px;
          display: block;
          margin: 20px auto;
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
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">বিকাশ</div>
          <div class="title">বিল পেমেন্ট রিসিট</div>
        </div>
        
        <div class="success-icon">✓</div>
        
        <div class="details">
          <div class="detail-row">
            <div class="detail-label">প্রতিষ্ঠান</div>
            <div class="detail-value">${data.providerName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">বিল ধরণ</div>
            <div class="detail-value">${data.category}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">${fieldConfig.accountLabel}</div>
            <div class="detail-value">${data.meterNumber}</div>
          </div>
          ${
            fieldConfig.showContact
              ? `
          <div class="detail-row">
            <div class="detail-label">যোগাযোগ নম্বর</div>
            <div class="detail-value">${data.contactNumber}</div>
          </div>
          `
              : ""
          }
          ${
            fieldConfig.showMonth
              ? `
          <div class="detail-row">
            <div class="detail-label">বিল মাস</div>
            <div class="detail-value">${data.billMonth}</div>
          </div>
          `
              : ""
          }
          <div class="detail-row">
            <div class="detail-label">বিল পরিমাণ</div>
            <div class="detail-value">${data.billAmount}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">চার্জ</div>
            <div class="detail-value">${data.charge}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">রেফারেন্স</div>
            <div class="detail-value">${data.reference || "N/A"}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">ট্রানজেকশন আইডি</div>
            <div class="detail-value">${data.transactionId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">তারিখ ও সময়</div>
            <div class="detail-value">${data.date}</div>
          </div>
          
          <div class="detail-row total">
            <div class="detail-label">মোট পরিশোধিত</div>
            <div class="detail-value" style="color: #e2146c">${
              data.totalAmount
            }</div>
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
          <p>বিকাশ কাস্টমার কেয়ারঃ 16247</p>
          <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([content], { type: "text/html" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "বিকাশ_বিল_রিসিট.html";
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Balance toggle with animation
  if (showBalanceBtn) {
    showBalanceBtn.addEventListener("click", function () {
      balanceHidden.style.opacity = "0";
      setTimeout(() => {
        balanceHidden.style.display = "none";
        balanceVisible.style.display = "flex";
        balanceVisible.style.opacity = "0";
        setTimeout(() => {
          balanceVisible.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  if (hideBalanceBtn) {
    hideBalanceBtn.addEventListener("click", function () {
      balanceVisible.style.opacity = "0";
      setTimeout(() => {
        balanceVisible.style.display = "none";
        balanceHidden.style.display = "flex";
        balanceHidden.style.opacity = "0";
        setTimeout(() => {
          balanceHidden.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  // Tab switching
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabGroup = this.parentElement.querySelectorAll(".tab-btn");
        tabGroup.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");

        // Get tab content id
        const tabId = this.dataset.tab;
        if (tabId) {
          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => {
            content.classList.remove("active");
          });
          const activeContent = document.getElementById(tabId + "Bills");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
      });
    });
  }

  // Clear search buttons
  if (clearBillSearchBtn) {
    clearBillSearchBtn.addEventListener("click", function () {
      billSearchInput.value = "";
      billSearchInput.focus();
    });
  }

  if (clearProviderSearchBtn) {
    clearProviderSearchBtn.addEventListener("click", function () {
      providerSearchInput.value = "";
      providerSearchInput.focus();
    });
  }

  // Search functionality for providers
  if (providerSearchInput) {
    providerSearchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      document.querySelectorAll(".provider-item").forEach((provider) => {
        const providerName = provider
          .querySelector(".provider-name")
          .textContent.toLowerCase();
        const providerType = provider
          .querySelector(".provider-type")
          .textContent.toLowerCase();

        if (
          providerName.includes(searchValue) ||
          providerType.includes(searchValue)
        ) {
          provider.style.display = "flex";
        } else {
          provider.style.display = "none";
        }
      });
    });
  }

  // Search functionality for bills/categories
  if (billSearchInput) {
    billSearchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      if (searchValue.length > 0) {
        // Show all providers from all categories
        document.querySelectorAll(".provider-list").forEach((list) => {
          list.style.display = "block";
        });

        document
          .querySelectorAll(".bill-item, .bill-category-item, .provider-item")
          .forEach((item) => {
            let itemText = "";

            if (item.classList.contains("bill-item")) {
              itemText =
                item.querySelector(".bill-name").textContent.toLowerCase() +
                " " +
                item.querySelector(".bill-type").textContent.toLowerCase();
            } else if (item.classList.contains("bill-category-item")) {
              itemText = item
                .querySelector(".bill-category-name")
                .textContent.toLowerCase();
            } else if (item.classList.contains("provider-item")) {
              itemText =
                item.querySelector(".provider-name").textContent.toLowerCase() +
                " " +
                item.querySelector(".provider-type").textContent.toLowerCase();
            }

            if (itemText.includes(searchValue)) {
              item.style.display = item.classList.contains("provider-item")
                ? "flex"
                : "block";
            } else {
              item.style.display = "none";
            }
          });
      } else {
        // Reset display
        document
          .querySelectorAll(".bill-item, .bill-category-item")
          .forEach((item) => {
            item.style.display = item.classList.contains("bill-item")
              ? "flex"
              : "block";
          });

        // Hide provider lists except the active one
        document.querySelectorAll(".provider-list").forEach((list) => {
          if (list.id === selectedCategory + "Providers") {
            list.style.display = "block";
          } else {
            list.style.display = "none";
          }
        });
      }
    });
  }

  // Navigation between sections with smooth transitions
  function navigateTo(fromSection, toSection) {
    // Add exit animation
    fromSection.style.opacity = "0";
    fromSection.style.transform = "translateX(-20px)";

    setTimeout(() => {
      fromSection.style.display = "none";

      // Show destination section with entrance animation
      toSection.style.display = "block";
      toSection.style.opacity = "0";
      toSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        toSection.style.opacity = "1";
        toSection.style.transform = "translateX(0)";
      }, 50);
    }, 200);
  }

  // Category selection
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      selectedCategory = this.dataset.category;

      // Update UI
      if (selectedCategoryName) {
        selectedCategoryName.textContent = this.querySelector(
          ".bill-category-name"
        ).textContent;
      }

      // Show only relevant provider list
      document.querySelectorAll(".provider-list").forEach((list) => {
        if (list.id === selectedCategory + "Providers") {
          list.style.display = "block";
        } else {
          list.style.display = "none";
        }
      });

      // Navigate to provider section
      navigateTo(categorySection, providerSection);
    });
  });

  // Bill item selection (from recent bills)
  billItems.forEach((item) => {
    item.addEventListener("click", function () {
      const billName = this.querySelector(".bill-name").textContent;
      const billType = this.querySelector(".bill-type").textContent;
      const billLogo = this.querySelector(".bill-logo img").src;

      // Set selected provider details
      selectedProvider = this.dataset.bill;

      if (selectedProviderName) {
        selectedProviderName.textContent = billName;
      }

      // Navigate to bill info section
      navigateTo(categorySection, billInfoSection);
    });
  });

  // Provider selection
  providerItems.forEach((item) => {
    item.addEventListener("click", function () {
      const providerName = this.querySelector(".provider-name").textContent;
      const providerType = this.querySelector(".provider-type").textContent;
      const providerLogo = this.querySelector(".provider-logo img").src;

      // Set selected provider details
      selectedProvider = this.dataset.provider;

      if (selectedProviderName) {
        selectedProviderName.textContent = providerName;
      }

      // Update form fields based on selected category
      updateBillInfoForm(selectedCategory);

      // Navigate to bill info section
      navigateTo(providerSection, billInfoSection);
    });
  });

  // Back buttons
  if (backToCategoryBtn) {
    backToCategoryBtn.addEventListener("click", function () {
      navigateTo(providerSection, categorySection);
    });
  }

  if (backToProviderBtn) {
    backToProviderBtn.addEventListener("click", function () {
      navigateTo(billInfoSection, providerSection);
    });
  }

  if (backToBillInfoBtn) {
    backToBillInfoBtn.addEventListener("click", function () {
      navigateTo(billConfirmSection, billInfoSection);
    });
  }

  if (backToConfirmBtn) {
    backToConfirmBtn.addEventListener("click", function () {
      navigateTo(pinSection, billConfirmSection);
    });
  }

  // Bill amount input handling
  if (billAmountInput) {
    billAmountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      currentBillAmount = parseInt(this.value) || 0;

      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Replace existing meterNumberInput event handlers with this new implementation
  if (meterNumberInput) {
    meterNumberInput.addEventListener("input", function () {
      // ক্রেডিট কার্ড ক্যাটাগরি চেক
      if (selectedCategory === "credit-card") {
        // শুধু নম্বর রাখা, বাকি সব রিমুভ
        let cleanValue = this.value.replace(/\D/g, "");

        // 16 ডিজিটের বেশি হলে কেটে ফেলা
        if (cleanValue.length > 16) {
          cleanValue = cleanValue.substring(0, 16);
        }

        // ভ্যালিডেশন চেক
        if (cleanValue.length > 0 && cleanValue.length !== 16) {
          this.parentElement.classList.add("error");
          let errorMsg = this.parentElement.querySelector(".error-message");
          if (!errorMsg) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            this.parentElement.appendChild(errorMsg);
          }
          errorMsg.textContent = "কার্ড নম্বর অবশ্যই ১৬ সংখ্যার হতে হবে";
        } else {
          this.parentElement.classList.remove("error");
          const errorMsg = this.parentElement.querySelector(".error-message");
          if (errorMsg) {
            errorMsg.remove();
          }
        }

        // আপডেট ভ্যালু - ফরম্যাটিং ছাড়া
        this.value = cleanValue;
      } else {
        // অন্যান্য বিল টাইপের জন্য
        let value = this.value.replace(/\D/g, "");

        if (value.length > 13) {
          value = value.substring(0, 13);
        }

        this.value = value;

        // ভ্যালিডেশন চেক
        if (value.length > 0 && value.length !== 13) {
          this.parentElement.classList.add("error");
          let errorMsg = this.parentElement.querySelector(".error-message");
          if (!errorMsg) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            this.parentElement.appendChild(errorMsg);
          }
          errorMsg.textContent = "বিল নম্বর অবশ্যই ১৩ সংখ্যার হতে হবে";
        } else {
          this.parentElement.classList.remove("error");
          const errorMsg = this.parentElement.querySelector(".error-message");
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      }

      // বাটন আপডেট
      updateBillInfoNextButton();
    });
  }

  // Replace the existing contactNumberInput event handler with:
  if (contactNumberInput) {
    contactNumberInput.addEventListener("input", function () {
      // Allow only numbers
      this.value = this.value.replace(/\D/g, "");

      // Limit to 11 digits
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }

      // Store current contact number
      currentContactNumber = this.value;

      // Validate Bangladesh prefixes (013, 014, 015, 016, 017, 018, 019)
      const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
      const isValidPrefix =
        this.value.length >= 3
          ? validPrefixes.some((prefix) => this.value.startsWith(prefix))
          : true;

      // Get appropriate error message based on the input state
      let errorMessage = "";

      if (this.value.length === 0) {
        // Empty input - no error message needed
        errorMessage = "";
      } else if (this.value.length < 11) {
        // Too short
        errorMessage = "মোবাইল নম্বর অবশ্যই ১১ ডিজিট হতে হবে";
      } else if (!isValidPrefix) {
        // Invalid prefix
        errorMessage = "অবৈধ মোবাইল প্রিফিক্স। ০১৩-০১৯ দিয়ে শুরু করুন";
      }

      // Show or clear error message
      if (errorMessage) {
        // Check if error message already exists
        let errorMsg = this.parentElement.querySelector(".phone-hint");
        if (!errorMsg) {
          errorMsg = document.createElement("span");
          errorMsg.className = "phone-hint";
          errorMsg.style.cssText = `
            display: block;
            color: #ff6b6b;
            font-size: 11px;
            margin-top: 4px;
            padding-left: 2px;
          `;
          this.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = errorMessage;

        // Add error class to parent
        this.parentElement.classList.add("error");
      } else {
        // Remove error message if no errors
        const errorMsg = this.parentElement.querySelector(".phone-hint");
        if (errorMsg) {
          errorMsg.remove();
        }

        // Remove error class from parent
        this.parentElement.classList.remove("error");
      }

      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Bill month select handling
  if (billMonthSelect) {
    billMonthSelect.addEventListener("change", function () {
      // Store current bill month
      currentBillMonth = this.value;
      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Replace existing updateBillInfoNextButton function
  function updateBillInfoNextButton() {
    if (billInfoNextBtn) {
      let isValidAccount = false;

      // ক্রেডিট কার্ড ঠিক 16 ডিজিট হতে হবে
      if (selectedCategory === "credit-card") {
        isValidAccount = meterNumberInput.value.length === 16;
      }
      // অন্যান্য বিল ঠিক 13 ডিজিট হতে হবে
      else {
        isValidAccount = meterNumberInput.value.length === 13;
      }

      // কন্টাক্ট নম্বর চেক
      const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
      const isValidContact =
        contactNumberInput.value.trim().length === 11 &&
        validPrefixes.some((prefix) =>
          contactNumberInput.value.startsWith(prefix)
        );

      // বিল মাস চেক
      const isMonthSelected = billMonthSelect
        ? billMonthSelect.value !== ""
        : true;

      // বাটন সক্রিয়/নিষ্ক্রিয় করা
      if (
        currentBillAmount > 0 &&
        isValidAccount &&
        isValidContact &&
        isMonthSelected
      ) {
        billInfoNextBtn.disabled = false;
      } else {
        billInfoNextBtn.disabled = true;
      }
    }
  }

  // Add this function after the existing functions and before the event listeners
  function updateConfirmationSection(category) {
    const fieldConfig = categoryFieldConfig[category] || defaultFieldConfig;

    // Update account label
    const confirmAccountLabel = document.getElementById("confirmAccountLabel");
    if (confirmAccountLabel) {
      confirmAccountLabel.textContent = fieldConfig.accountLabel;
    }

    // Show/hide contact number detail
    const contactDetail = document.querySelector(".contact-detail");
    if (contactDetail) {
      contactDetail.style.display = fieldConfig.showContact ? "flex" : "none";
    }

    // Show/hide bill month detail
    const monthDetail = document.querySelector(".month-detail");
    if (monthDetail) {
      monthDetail.style.display = fieldConfig.showMonth ? "flex" : "none";
    }
  }

  // Replace the existing billInfoNextBtn click handler with this updated version
  if (billInfoNextBtn) {
    billInfoNextBtn.addEventListener("click", function () {
      const fieldConfig =
        categoryFieldConfig[selectedCategory] || defaultFieldConfig;

      // Set confirmation values
      if (confirmProviderName) {
        confirmProviderName.textContent = selectedProviderName.textContent;
      }

      if (confirmProviderCategory) {
        confirmProviderCategory.textContent = selectedCategoryName
          ? selectedCategoryName.textContent
          : "বিল";
      }

      if (confirmMeterNumber) {
        confirmMeterNumber.textContent = meterNumberInput.value;
      }

      // Set new confirmation values
      if (confirmContactNumber) {
        confirmContactNumber.textContent = fieldConfig.showContact
          ? contactNumberInput.value
          : "N/A";
      }

      if (confirmBillMonth) {
        confirmBillMonth.textContent = fieldConfig.showMonth
          ? getBanglaMonthName(billMonthSelect.value)
          : "N/A";
      }

      if (confirmBillAmount) {
        confirmBillAmount.textContent = "৳" + formatNumber(currentBillAmount);
      }

      // Calculate service charge (example logic)
      if (selectedCategory === "credit-card") {
        serviceCharge = Math.round(currentBillAmount * 0.01); // 1% for credit cards
      } else {
        serviceCharge = 0; // No charge for utility bills
      }

      if (confirmCharge) {
        confirmCharge.textContent = "৳" + formatNumber(serviceCharge);
      }

      if (confirmTotalAmount) {
        const totalAmount = currentBillAmount + serviceCharge;
        confirmTotalAmount.textContent = "৳" + formatNumber(totalAmount);
      }

      // Update confirmation labels based on selected category
      updateConfirmationSection(selectedCategory);

      // Navigate to confirmation section
      navigateTo(billInfoSection, billConfirmSection);
    });
  }

  // Pay bill button
  if (payBillBtn) {
    payBillBtn.addEventListener("click", function () {
      // Store reference value if provided
      billReference = referenceInput.value || "";

      // Set PIN section details
      if (pinProviderName) {
        pinProviderName.textContent = confirmProviderName.textContent;
      }

      if (pinBillAmount) {
        pinBillAmount.textContent = confirmTotalAmount.textContent;
      }

      // Copy logos
      if (pinProviderLogo && confirmProviderLogo) {
        pinProviderLogo.src = confirmProviderLogo.src;
      }

      // Navigate to PIN section
      navigateTo(billConfirmSection, pinSection);

      // Focus first PIN digit
      if (pinDigits.length > 0) {
        pinDigits[0].focus();
      }
    });
  }

  // Handle PIN input
  pinDigits.forEach((digit, index) => {
    digit.addEventListener("input", function () {
      // Move to next input when character is entered
      if (this.value && index < pinDigits.length - 1) {
        pinDigits[index + 1].focus();
      }

      // Check if all digits are filled
      let allFilled = true;
      pinDigits.forEach((input) => {
        if (!input.value) allFilled = false;
      });

      // Enable confirm button when all digits are filled
      if (confirmPinBtn) {
        confirmPinBtn.disabled = !allFilled;
      }
    });

    // Navigate backward on backspace when empty
    digit.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        pinDigits[index - 1].focus();
      }
    });
  });

  // Handle confirm PIN button
  if (confirmPinBtn) {
    confirmPinBtn.addEventListener("click", function () {
      // Simulate PIN verification
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
      this.disabled = true;

      // Generate transaction ID
      transactionId = "TXN" + Math.floor(Math.random() * 10000000);

      // Simulate processing
      setTimeout(() => {
        showSuccessMessage();
      }, 1500);
    });
  }

  // Replace the existing showSuccessMessage function with this updated version
  function showSuccessMessage() {
    // Get field configuration for the selected category
    const fieldConfig =
      categoryFieldConfig[selectedCategory] || defaultFieldConfig;

    // Create success modal
    const successModal = document.createElement("div");
    successModal.className = "success-modal";

    const meterNumber =
      document.getElementById("confirmMeterNumber").textContent;
    const billAmount =
      document.getElementById("confirmTotalAmount").textContent;
    const billName = document.getElementById("confirmProviderName").textContent;
    const billCategory = document.getElementById(
      "confirmProviderCategory"
    ).textContent;
    const contactNumber = document.getElementById(
      "confirmContactNumber"
    ).textContent;
    const billMonth = document.getElementById("confirmBillMonth").textContent;
    const currentDate = new Date().toLocaleString("bn-BD");

    // Create dynamic HTML content based on field configuration
    let detailsHTML = `
      <div class="detail-row">
        <span class="detail-row-label">${fieldConfig.accountLabel}</span>
        <span class="detail-row-value">${meterNumber}</span>
      </div>
    `;

    // Add contact number if shown
    if (fieldConfig.showContact) {
      detailsHTML += `
        <div class="detail-row">
          <span class="detail-row-label">যোগাযোগ নম্বর</span>
          <span class="detail-row-value">${contactNumber}</span>
        </div>
      `;
    }

    // Add bill month if shown
    if (fieldConfig.showMonth) {
      detailsHTML += `
        <div class="detail-row">
          <span class="detail-row-label">বিল মাস</span>
          <span class="detail-row-value">${billMonth}</span>
        </div>
      `;
    }

    // Add transaction ID and date
    detailsHTML += `
      <div class="detail-row">
        <span class="detail-row-label">ট্রানজেকশন আইডি</span>
        <span class="detail-row-value">${transactionId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-row-label">তারিখ ও সময়</span>
        <span class="detail-row-value">${currentDate}</span>
      </div>
      <div class="detail-row total">
        <span class="detail-row-label">মোট</span>
        <span class="detail-row-value total">${billAmount}</span>
      </div>
    `;

    successModal.innerHTML = `
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-check-circle" style="font-size: 80px;"></i>
        </div>
        <h2 class="success-title">বিল পরিশোধ সফল হয়েছে!</h2>
        <p class="success-message">${billName} - এর ${billAmount} টাকা সফলভাবে পরিশোধ করা হয়েছে</p>
        <div class="success-details">
          ${detailsHTML}
        </div>
        <button id="downloadReceiptBtn" class="action-btn download-btn ripple">
          <i class="fas fa-download"></i> রিসিট ডাউনলোড করুন
        </button>
        <button id="doneBtn" class="action-btn next-btn ripple" style="margin-top: 15px;">
          ঠিক আছে
        </button>
      </div>
    `;

    document.body.appendChild(successModal);

    // Add click handler for done button
    const doneBtn = document.getElementById("doneBtn");
    doneBtn.addEventListener("click", function () {
      document.body.removeChild(successModal);

      // Instead of resetForm(), navigate back to the home/category screen
      // Reset display of sections
      pinSection.style.display = "none";
      billConfirmSection.style.display = "none";
      billInfoSection.style.display = "none";
      providerSection.style.display = "none";
      categorySection.style.display = "block";
      categorySection.style.opacity = "1";
      categorySection.style.transform = "translateX(0)";

      // Reset buttons
      confirmPinBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
      confirmPinBtn.disabled = true;

      // Clear PIN inputs
      pinDigits.forEach((digit) => {
        digit.value = "";
      });
    });

    // Add click handler for download receipt button
    const downloadReceiptBtn = document.getElementById("downloadReceiptBtn");
    downloadReceiptBtn.addEventListener("click", function () {
      // Prepare receipt data
      const receiptData = {
        providerName: billName,
        category: billCategory,
        meterNumber: meterNumber,
        contactNumber: contactNumber,
        billMonth: billMonth,
        billAmount: document.getElementById("confirmBillAmount").textContent,
        charge: document.getElementById("confirmCharge").textContent,
        reference: billReference,
        transactionId: transactionId,
        date: currentDate,
        totalAmount: billAmount,
      };

      // Generate and download PDF
      generatePDF(receiptData);
    });
  }

  // রিসিট এবং টোকেন এবং পে বিল বিবরণী এলিমেন্ট খুঁজে নিন
  const receiptSection = document.querySelector(".receipt-section");
  const billHistorySection = document.querySelector(".bill-history-section");

  // রিসিট এবং টোকেন ক্লিক হ্যান্ডলার
  if (receiptSection) {
    receiptSection.addEventListener("click", function () {
      // রিসিট এবং টোকেন পেজে নিয়ে যাও
      window.location.href = "payBillsReceipt.html";
    });
  }

  // পে বিল বিবরণী ক্লিক হ্যান্ডলার
  if (billHistorySection) {
    billHistorySection.addEventListener("click", function () {
      // পে বিল বিবরণী পেজে নিয়ে যাও
      window.location.href = "payBillsHistory.html";
    });
  }

  // CSS ক্লাস যোগ করুন যাতে কার্সর পয়েন্টার দেখায়
  if (receiptSection && !receiptSection.classList.contains("clickable")) {
    receiptSection.classList.add("clickable");
    receiptSection.style.cursor = "pointer";
  }

  if (
    billHistorySection &&
    !billHistorySection.classList.contains("clickable")
  ) {
    billHistorySection.classList.add("clickable");
    billHistorySection.style.cursor = "pointer";
  }
});
