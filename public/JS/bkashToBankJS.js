// bKash to Bank JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // ==================== MAIN SECTIONS & ELEMENTS ====================
  // Main sections
  const accountSelectionSection = document.getElementById(
    "accountSelectionSection"
  );
  const bankListSection = document.getElementById("bankListSection");

  // Create bank transfer section dynamically if it doesn't exist
  let bankTransferSection = document.getElementById("bankTransferSection");
  if (!bankTransferSection) {
    bankTransferSection = document.createElement("div");
    bankTransferSection.id = "bankTransferSection";
    bankTransferSection.className = "bank-transfer-section";
    bankTransferSection.innerHTML = `
      <div class="back-button" id="backToBankList">
        <i class="fas fa-arrow-left"></i> Back
      </div>
      <div class="bank-header">
        <div class="selected-bank-logo">
          <img src="images/banks/default-bank.png" alt="Selected Bank">
        </div>
        <div class="selected-bank-name">Bank Name</div>
      </div>
      <div class="form-group">
        <label class="form-label">Bank Account Number</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-university"></i>
          </div>
          <input type="text" id="bankAccountNumber" placeholder="Enter Account Number" class="form-input">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Account Holder Name</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-user"></i>
          </div>
          <input type="text" id="accountHolderName" placeholder="Enter Account Holder Name" class="form-input">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Amount</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <input type="text" id="transferAmount" placeholder="Enter Amount" class="form-input">
        </div>
        <div class="amount-info">
          <span>Min: ৳50.00</span>
          <span>Max: ৳25,000.00</span>
        </div>
      </div>
      <div class="info-box">
        <div class="info-icon">
          <i class="fas fa-info-circle"></i>
        </div>
        <div class="info-text">
          Bank transfers typically take 1-2 business days to complete. <a href="#" class="info-link">Learn more</a>
        </div>
      </div>
      <div class="terms-text">
        <input type="checkbox" id="termsCheck" class="terms-checkbox">
        <span>I agree to the <a href="#" class="info-link">Terms and Conditions</a> for this transaction</span>
      </div>
      <button class="action-btn proceed-btn" id="proceedBankTransfer" disabled>
        <i class="fas fa-arrow-right"></i> Proceed
      </button>
    `;

    // Add to the bKash to Bank form
    const bkashToBankForm = document.querySelector(".bkash-to-bank-form");
    if (bkashToBankForm) {
      bkashToBankForm.appendChild(bankTransferSection);
    }
  }

  // Navigation buttons
  const bankAccountOption = document.getElementById("bankAccountOption");
  const debitCardOption = document.getElementById("debitCardOption");
  const backToBankMain = document.getElementById("backToBankMain");
  const backToBankList = document.getElementById("backToBankList");

  // bKash brand colors
  const bkashPrimary = "#e2146c"; // bKash pink/magenta
  const bkashSecondary = "#b4116e"; // darker shade for gradient

  // State
  let currentSelectedBank = null;
  let navigationHistory = ["accountSelectionSection"];

  // ==================== BANK DATA ====================
  // Bank data
  const banks = [
    {
      id: 1,
      name: "Agrani Bank",
      logo: "images/banks/agrani-bank.png",
      hasBadge: true,
    },
    {
      id: 2,
      name: "AB Bank Limited",
      logo: "images/banks/ab-bank.png",
      hasBadge: true,
    },
    {
      id: 3,
      name: "Bangladesh Development Bank Limited",
      logo: "images/banks/bdbl.png",
      hasBadge: false,
    },
    {
      id: 4,
      name: "Community Bank Bangladesh",
      logo: "images/banks/community-bank.png",
      hasBadge: true,
    },
    {
      id: 5,
      name: "DHAKA BANK LIMITED",
      logo: "images/banks/dhaka-bank.png",
      hasBadge: true,
    },
  ];

  // ==================== CORE NAVIGATION FUNCTIONS ====================
  // Function to show a specific section
  function showSection(section) {
    // Hide all sections first
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
    ];

    allSections.forEach((s) => {
      if (s) s.style.display = "none";
    });

    // Show the requested section with animation
    if (section) {
      section.style.display = "block";
      section.classList.add("fade-in");

      // Remove animation class after it completes
      setTimeout(() => {
        section.classList.remove("fade-in");
      }, 300);

      // Add to navigation history
      const sectionId = section.id;
      if (navigationHistory[navigationHistory.length - 1] !== sectionId) {
        navigationHistory.push(sectionId);
      }
    }
  }

  // ==================== EVENT HANDLERS ====================
  // Bank Account option click handler
  if (bankAccountOption) {
    bankAccountOption.addEventListener("click", function () {
      showSection(bankListSection);
      initializeBankList();
    });
  }

  // Debit Card option click handler
  if (debitCardOption) {
    debitCardOption.addEventListener("click", function () {
      showNumberAmountPopup();
    });
  }

  // Back button handlers
  if (backToBankMain) {
    backToBankMain.addEventListener("click", function () {
      showSection(accountSelectionSection);
    });
  }

  if (backToBankList) {
    backToBankList.addEventListener("click", function () {
      showSection(bankListSection);
    });
  }

  // ==================== BANK TO BANK TRANSFER FUNCTIONS ====================
  // Function to initialize dynamic bank list with proper event handling
  function initializeBankList() {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    // Clear existing content
    bankListContainer.innerHTML = "";

    // Show all banks
    banks.forEach((bank) => {
      const bankItem = createBankItem(bank);
      bankListContainer.appendChild(bankItem);
    });

    // Setup search functionality
    setupBankSearch();
  }

  // Setup bank search functionality
  function setupBankSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchInput && searchBtn) {
      // Search on input change
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        filterBanks(query);
      });

      // Search on button click
      searchBtn.addEventListener("click", function () {
        const query = searchInput.value.toLowerCase();
        filterBanks(query);
      });
    }
  }

  // Filter banks based on search query
  function filterBanks(query) {
    const bankItems = document.querySelectorAll(".bank-item");

    bankItems.forEach((item) => {
      const bankName = item
        .querySelector(".bank-name")
        .textContent.toLowerCase();
      if (bankName.includes(query)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Create bank item - FIXED to return the element instead of appending
  function createBankItem(bank) {
    const bankItem = document.createElement("div");
    bankItem.className = `bank-item ${bank.hasBadge ? "has-badge" : ""}`;

    bankItem.innerHTML = `
      <div class="bank-logo">
        <img src="${bank.logo}" alt="${bank.name}" onerror="this.src='images/bank-placeholder.png'">
      </div>
      <div class="bank-name">${bank.name}</div>
      <div class="link-icon">
        <i class="fas fa-link"></i>
      </div>
    `;

    // Add click event directly to the bankItem element
    bankItem.addEventListener("click", function () {
      // Set the selected bank
      currentSelectedBank = bank;
      console.log("Bank selected:", bank.name); // Debug log

      // Update bank transfer form with the selected bank
      const bankLogo = document.querySelector(".selected-bank-logo img");
      const bankName = document.querySelector(".selected-bank-name");

      if (bankLogo) bankLogo.src = bank.logo;
      if (bankName) bankName.textContent = bank.name;

      // Show the bank transfer form
      showSection(bankTransferSection);

      // Setup form validation
      setupBankTransferValidation();
    });

    return bankItem;
  }

  // Setup Bank Transfer Form Validation
  function setupBankTransferValidation() {
    const bankAccountNumber = document.getElementById("bankAccountNumber");
    const accountHolderName = document.getElementById("accountHolderName");
    const transferAmount = document.getElementById("transferAmount");
    const termsCheck = document.getElementById("termsCheck");
    const proceedBtn = document.getElementById("proceedBankTransfer");

    if (
      !bankAccountNumber ||
      !accountHolderName ||
      !transferAmount ||
      !termsCheck ||
      !proceedBtn
    ) {
      console.error("Bank transfer form elements not found!");
      return;
    }

    // Form validation function
    function validateForm() {
      const isAccountValid = bankAccountNumber.value.length >= 10;
      const isNameValid = accountHolderName.value.length >= 3;
      const amountValue = parseFloat(transferAmount.value);
      const isAmountValid =
        !isNaN(amountValue) && amountValue >= 50 && amountValue <= 25000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(
        isAccountValid &&
        isNameValid &&
        isAmountValid &&
        isTermsChecked
      );

      if (proceedBtn.disabled) {
        proceedBtn.style.opacity = "0.7";
      } else {
        proceedBtn.style.opacity = "1";
      }
    }

    // Add event listeners
    bankAccountNumber.addEventListener("input", validateForm);
    accountHolderName.addEventListener("input", validateForm);
    transferAmount.addEventListener("input", function () {
      // Format amount
      let value = this.value.replace(/[^\d.]/g, "");

      // Allow only one decimal point
      const decimalPoints = value.match(/\./g) || [];
      if (decimalPoints.length > 1) {
        value = value.substring(0, value.lastIndexOf("."));
      }

      this.value = value;
      validateForm();
    });
    termsCheck.addEventListener("change", validateForm);

    // Initial validation
    validateForm();

    // Add proceed button event listener
    proceedBtn.addEventListener("click", function () {
      if (!proceedBtn.disabled) {
        processBankTransfer();
      }
    });
  }

  // Process Bank Transfer
  function processBankTransfer() {
    const accountNumber = document.getElementById("bankAccountNumber").value;
    const accountName = document.getElementById("accountHolderName").value;
    const amount = document.getElementById("transferAmount").value;

    // Show loading
    showLoading("Processing bank transfer...");

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      // Show PIN verification with 5 digits
      showBankPinVerification(accountNumber, accountName, amount);
    }, 1500);
  }

  // Make sure these functions replace the originals
  window.processBankTransfer = processBankTransfer;
  window.showBankPinVerification = showBankPinVerification;
  window.processBankPinConfirmation = processBankPinConfirmation;
  window.showBankSuccessPopup = showBankSuccessPopup;
  window.hideBankPinPopup = hideBankPinPopup;

  function showBankPinVerification(accountNumber, accountName, amount) {
    // Hide previous sections
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
    ];

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });

    // Create overlay first
    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";
    overlay.id = "pinOverlay";
    document.body.appendChild(overlay);

    // Create popup - get dimensions from main container
    const containerElement = document.querySelector(".bkash-to-bank-container");
    const containerWidth = containerElement.offsetWidth;
    const containerHeight = containerElement.offsetHeight;

    const popup = document.createElement("div");
    popup.className = "pin-popup";
    popup.id = "bankPinEntryPopup";
    popup.dataset.accountNumber = accountNumber;
    popup.dataset.accountName = accountName;
    popup.dataset.amount = amount;

    popup.innerHTML = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="header-title">
          <h3>বিকাশ পিন দিন</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="popup-content">
        <div class="pin-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        
        <div class="pin-title">Enter bKash PIN</div>
        <div class="pin-subtitle">Please enter your 5-digit PIN to authorize the transfer of ৳${amount} to ${
      currentSelectedBank ? currentSelectedBank.name : "Bank Account"
    }</div>
        
        <div class="pin-input-container">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
        </div>
        
        <div class="info-box">
          <div class="info-icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <div class="info-text">
            Never share your PIN with anyone. bKash representatives will never ask for your PIN.
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="action-btn cancel-btn" id="cancelBankPin">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="action-btn proceed-btn" id="confirmBankPin" disabled>
            <i class="fas fa-check"></i> Confirm
          </button>
        </div>
      </div>
    </div>
  `;

    // Add to body
    document.body.appendChild(popup);

    // Match dimensions with container and set position
    popup.style.width = `${containerWidth}px`;
    popup.style.height = `${containerHeight}px`;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    // Show with animation
    setTimeout(() => {
      overlay.classList.add("show");
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const cancelBtn = popup.querySelector("#cancelBankPin");
    const confirmBtn = popup.querySelector("#confirmBankPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    cancelBtn.addEventListener("click", function () {
      hideBankPinPopup();
      showSection(bankTransferSection);
    });

    confirmBtn.addEventListener("click", function () {
      processBankPinConfirmation(
        popup.dataset.accountNumber,
        popup.dataset.accountName,
        popup.dataset.amount
      );
    });

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        // Only allow numeric input
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length === 1 && index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }

        // Check if all fields are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;

        // Update button styling
        if (allFilled) {
          confirmBtn.style.opacity = "1";
        } else {
          confirmBtn.style.opacity = "0.7";
        }
      });

      input.addEventListener("keydown", function (e) {
        // Move to previous input on backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    // Focus first input
    pinInputs[0].focus();
  }

  function processBankPinConfirmation(accountNumber, accountName, amount) {
    // Show loading
    showLoading("Confirming transaction...");

    // Hide PIN popup
    hideBankPinPopup();

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      showBankSuccessPopup(accountNumber, accountName, amount);
    }, 1500);
  }

  function hideBankPinPopup() {
    const popup = document.getElementById("bankPinEntryPopup");
    const overlay = document.getElementById("pinOverlay");

    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => {
        popup.remove();
      }, 300);
    }

    if (overlay) {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  // Process Bank PIN Confirmation
  function processBankPinConfirmation(accountNumber, accountName, amount) {
    // Show loading
    showLoading("Confirming transaction...");

    // Get container dimensions before hiding the PIN popup
    const pinPopup = document.getElementById("bankPinEntryPopup");
    const containerWidth = pinPopup.style.width;
    const containerHeight = pinPopup.style.height;

    // Hide PIN popup
    hideBankPinPopup();

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      showBankSuccessPopup(
        accountNumber,
        accountName,
        amount,
        containerWidth,
        containerHeight
      );
    }, 1500);
  }

  function showBankSuccessPopup(
    accountNumber,
    accountName,
    amount,
    width = "550px",
    height = "700px"
  ) {
    // Hide any remaining elements
    const allSections = document.querySelectorAll(
      ".bkash-to-bank-section, .pin-popup, .pin-overlay"
    );

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });

    // Generate transaction ID
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";
    overlay.id = "successOverlay";
    document.body.appendChild(overlay);

    // Create popup
    const popup = document.createElement("div");
    popup.className = "pin-popup success-popup";
    popup.id = "bankSuccessPopup";
    popup.dataset.transactionId = transactionId;
    popup.dataset.bankName = currentSelectedBank
      ? currentSelectedBank.name
      : "Bank Account";
    popup.dataset.accountNumber = accountNumber;
    popup.dataset.accountName = accountName;
    popup.dataset.amount = amount;
    popup.dataset.time = currentTime;

    popup.innerHTML = `
    <div class="form-header-gradient success-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="header-title">
          <h3>Transfer Successful</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="success-popup-body">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <div class="success-amount">৳${amount}</div>
        <div class="success-message">has been transferred successfully</div>
        
        <div class="transaction-details">
          <div class="detail-row">
            <div class="detail-label">Transaction ID</div>
            <div class="detail-value">${transactionId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">From</div>
            <div class="detail-value">bKash Account</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">To</div>
            <div class="detail-value">${
              currentSelectedBank ? currentSelectedBank.name : "Bank Account"
            }</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Account Number</div>
            <div class="detail-value">${accountNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Account Name</div>
            <div class="detail-value">${accountName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Time</div>
            <div class="detail-value">${currentTime}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value success">Completed</div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="action-btn cancel-btn" id="downloadBankReceipt">
            <i class="fas fa-download"></i> Download Receipt
          </button>
          <button class="action-btn proceed-btn" id="bankDoneButton">
            <i class="fas fa-check"></i> Done
          </button>
        </div>
      </div>
    </div>
  `;

    // Add to body
    document.body.appendChild(popup);

    // Set dimensions to match PIN popup
    popup.style.width = width;
    popup.style.height = height;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    // Style the success header to be green
    const successHeaderStyle = document.createElement("style");
    successHeaderStyle.id = "success-header-style";
    successHeaderStyle.innerHTML = `
    .success-header-gradient {
      background: linear-gradient(135deg, rgb(30, 150, 80) 0%, rgb(20, 120, 60) 100%) !important;
    }
    .success-header-gradient::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: radial-gradient(
        circle at top right,
        rgba(255, 255, 255, 0.15),
        transparent 70%
      );
    }
    .success-icon {
      color: rgb(30, 150, 80);
    }
    .detail-value.success {
      color: rgb(30, 150, 80);
    }
  `;

    // Add the style if it doesn't already exist
    if (!document.getElementById("success-header-style")) {
      document.head.appendChild(successHeaderStyle);
    }

    // Show with animation
    setTimeout(() => {
      overlay.classList.add("show");
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const doneBtn = popup.querySelector("#bankDoneButton");
    const downloadBtn = popup.querySelector("#downloadBankReceipt");

    doneBtn.addEventListener("click", function () {
      // Hide popup and overlay with animation
      popup.classList.remove("show");
      overlay.classList.remove("show");

      setTimeout(() => {
        // Remove popup and overlay
        popup.remove();
        overlay.remove();

        // Show the original bKash to Bank section
        const bkashToBankSection = document.querySelector(
          ".bkash-to-bank-section"
        );
        if (bkashToBankSection) {
          bkashToBankSection.style.display = "flex";
        }

        // Show the account selection section
        showSection(accountSelectionSection);
      }, 300);
    });

    downloadBtn.addEventListener("click", function () {
      downloadBankReceipt(
        popup.dataset.transactionId,
        popup.dataset.bankName,
        popup.dataset.accountNumber,
        popup.dataset.accountName,
        popup.dataset.amount,
        popup.dataset.time
      );
    });
  }

  // Hide Bank Success Popup
  function hideBankSuccessPopup() {
    const popup = document.getElementById("bankSuccessPopup");
    if (!popup) return;

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
      showSection(accountSelectionSection);
    }, 300);
  }

  // Download Bank Receipt
  function downloadBankReceipt(
    transactionId,
    bankName,
    accountNumber,
    accountName,
    amount,
    time
  ) {
    // Create receipt content
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${transactionId}
      Amount: ৳${amount}
      From: bKash Account
      To: ${bankName}
      Account Number: ${accountNumber}
      Account Name: ${accountName}
      Time: ${time}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // ==================== VISA DEBIT CARD FLOW FUNCTIONS ====================
  // Show the Number and Amount Popup
  function showNumberAmountPopup() {
    // Hide previous sections
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
    ];

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });

    // Create popup
    const popup = document.createElement("div");
    popup.className = "bkash-to-bank-container";
    popup.id = "bkashNumberAmountPopup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";

    popup.innerHTML = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-credit-card"></i>
        </div>
        <div class="header-title">
          <h3>Visa Debit Card</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="back-button" id="backToAccountSelect">
        <i class="fas fa-arrow-left"></i> Back
      </div>
      
      <div class="form-group">
        <label class="form-label">bKash Account Number</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <input type="text" id="bkashAccountNumber" placeholder="Enter bKash Account Number" class="form-input">
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Amount</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <input type="text" id="bkashAmount" placeholder="Enter amount" class="form-input">
        </div>
        <div class="amount-info">
          <span>Min: ৳50.00</span>
          <span>Max: ৳20,000.00</span>
        </div>
      </div>
      
      <div class="info-box">
        <div class="info-icon">
          <i class="fas fa-info-circle"></i>
        </div>
        <div class="info-text">
          Card transactions are typically processed instantly. <a href="#" class="info-link">Learn more</a>
        </div>
      </div>
      
      <div class="terms-text">
        <input type="checkbox" id="visaTermsCheck" class="terms-checkbox">
        <span>I agree to the <a href="#" class="info-link">Terms and Conditions</a> for this transaction</span>
      </div>
      
      <button class="action-btn proceed-btn" id="continueToCard" disabled>
        <i class="fas fa-arrow-right"></i> Proceed
      </button>
    </div>
  `;

    // Add to the bKash to Bank section
    const bkashToBankSection = document.querySelector(".bkash-to-bank-section");
    if (bkashToBankSection) {
      bkashToBankSection.appendChild(popup);
    }

    // Setup back button handler
    const backButton = document.getElementById("backToAccountSelect");
    if (backButton) {
      backButton.addEventListener("click", function () {
        popup.remove();
        showSection(accountSelectionSection);
      });
    }

    // Setup form validation
    const bkashNumberInput = document.getElementById("bkashAccountNumber");
    const amountInput = document.getElementById("bkashAmount");
    const termsCheck = document.getElementById("visaTermsCheck");
    const proceedBtn = document.getElementById("continueToCard");

    function validateForm() {
      const isNumberValid =
        bkashNumberInput.value.length === 11 &&
        bkashNumberInput.value.startsWith("01");
      const amountValue = parseFloat(amountInput.value);
      const isAmountValid =
        !isNaN(amountValue) && amountValue >= 50 && amountValue <= 20000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(isNumberValid && isAmountValid && isTermsChecked);

      if (proceedBtn.disabled) {
        proceedBtn.style.opacity = "0.7";
      } else {
        proceedBtn.style.opacity = "1";
      }
    }

    // Add event listeners
    if (bkashNumberInput) {
      bkashNumberInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 11) value = value.substring(0, 11);
        this.value = value;
        validateForm();
      });
    }

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        let value = this.value.replace(/[^\d.]/g, "");
        // Allow only one decimal point
        const decimalPoints = value.match(/\./g) || [];
        if (decimalPoints.length > 1) {
          value = value.substring(0, value.lastIndexOf("."));
        }
        this.value = value;
        validateForm();
      });
    }

    if (termsCheck) {
      termsCheck.addEventListener("change", validateForm);
    }

    // Add proceed button event listener
    if (proceedBtn) {
      proceedBtn.addEventListener("click", function () {
        if (!proceedBtn.disabled) {
          // Hide the current popup
          popup.remove();

          // Show the card form
          const bkashNumber = bkashNumberInput.value;
          const amount = amountInput.value;
          showCardForm(bkashNumber, amount);
        }
      });
    }
  }

  // Hide Number Amount Popup
  function hideNumberAmountPopup() {
    const popup = document.getElementById("bkashNumberAmountPopup");
    if (!popup) return;

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
    }, 300);
  }

  // Show Card Form
  function showCardForm(bkashNumber, amount) {
    // Hide previous sections
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
    ];

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });

    // Create popup
    const popup = document.createElement("div");
    popup.className = "bkash-to-bank-container";
    popup.id = "visaCardFormPopup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;

    popup.innerHTML = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-credit-card"></i>
        </div>
        <div class="header-title">
          <h3>Card Details</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="back-button" id="backToNumberAmount">
        <i class="fas fa-arrow-left"></i> Back
      </div>
      
      <div class="card-visual">
        <div class="card-chip"></div>
        <div class="card-number">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>****</span>
        </div>
        <div class="card-details">
          <div class="card-holder">
            <div class="card-label">CARD HOLDER</div>
            <div class="card-value">YOUR NAME</div>
          </div>
          <div class="card-expiry">
            <div class="card-label">EXPIRES</div>
            <div class="card-value">MM/YY</div>
          </div>
        </div>
        <div class="card-brand">
          <img src="images/visa-white.png" alt="VISA" class="visa-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSIxNiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTIwLjcyNy4xMjVoLTYuMTI0bC0zLjgzNiAxNC42ODJoNi4xMThsMy44NDItMTQuNjgyem0xNi41MTggMTQuNjgyaDMuOTA1bC0yLjQ2LTIuNzU4LTEuNjUzLTEuNTU0Yy0xLjI2OCAxLjQ5MS0yLjMxNSAzLjI2LTIuNjU2IDQuMDE4bDIuODY0LjI5NHptNC40MDUgMGwzLjE1LTE0LjY4MmgtMy43NmwtNS4zMjYgMTIuMTVILjIwNWMxLjU3Ni0uNDEzIDMuMDg2LTEuMDQzIDQuMzQ4LTEuODhMOC4wNjEuMTI1aDYuMWwtMy44NCAxNC42ODJoNS45N3pNMTEuMDAzIDE0LjgwN2wuMDQ3LS4wNC4wNDYtLjA0IDQuMDcxLTEyLjcyNmg1LjMxNWwuNTM0IDguNjk2Yy4wMS4zNDguMDA4Ljc2OC4wMTMgMS4wM2wuMDA1LS4wNDJjLS41MzQtMS40OTMtNC4wNy0xMC42ODUtNC4wNy0xMC42ODVoLTUuMzg2TDcuNTQ1IDE0LjgwN2g1Ljk3YTUuMjMgNS4yMyAwIDAgMS0yLjUyIDBoLjAwOHptMjkuOTk4IDBMMzguOTk4LjEyNWgtMy43NmwtNS4zMjYgMTIuNzI2aDguMWwtMS4xNjYgMi4xNjdoNS45N2wtMy4xNS0xNC42NjNoLTUuMDdsLTQgMTIuNzI1aC00LjE1OGwzLjc5NC01LjUzOWMtMS4yNjggMS40OTEtMi4zMDQgMy40MS0yLjY1NSA0LjAxN2wtMi44NTEtMi43NTZINTEuM2wtMy4xNSAxNC42NjNoLTUuOTdsMS4xNjYtMi4yMTVoLTcuNTk3bDUuMjUtMTIuNzI3eiIvPjwvc3ZnPgo='" />
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Card Number</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-credit-card"></i>
          </div>
          <input type="text" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" class="form-input">
        </div>
      </div>
      
      <div class="form-group">
        <div class="form-row" style="display: flex; gap: 10px;">
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Expiry Date</label>
            <div class="input-container">
              <div class="input-icon">
                <i class="far fa-calendar-alt"></i>
              </div>
              <input type="text" id="expiryDate" placeholder="MM/YY" class="form-input">
            </div>
          </div>
          
          <div class="form-group" style="flex: 1;">
            <label class="form-label">CVV</label>
            <div class="input-container">
              <div class="input-icon">
                <i class="fas fa-lock"></i>
              </div>
              <input type="text" id="cvv" placeholder="XXX" class="form-input">
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Cardholder Name</label>
        <div class="input-container">
          <div class="input-icon">
            <i class="fas fa-user"></i>
          </div>
          <input type="text" id="cardholderName" placeholder="As shown on card" class="form-input">
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="action-btn cancel-btn" id="cancelCardForm">
          <i class="fas fa-times"></i> Cancel
        </button>
        <button class="action-btn proceed-btn" id="proceedCardForm">
          <i class="fas fa-arrow-right"></i> Proceed
        </button>
      </div>
    </div>
  `;

    // Add to the bKash to Bank section
    const bkashToBankSection = document.querySelector(".bkash-to-bank-section");
    if (bkashToBankSection) {
      bkashToBankSection.appendChild(popup);
    }

    // Setup back button handler
    const backButton = document.getElementById("backToNumberAmount");
    if (backButton) {
      backButton.addEventListener("click", function () {
        popup.remove();
        showNumberAmountPopup();
      });
    }

    // Setup cancel button handler
    const cancelButton = document.getElementById("cancelCardForm");
    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        popup.remove();
        showSection(accountSelectionSection);
      });
    }

    // Format card number
    const cardNumberInput = document.getElementById("cardNumber");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 16) value = value.substring(0, 16);
        if (value.length > 0) value = value.match(/.{1,4}/g).join(" ");
        this.value = value;

        // Update card visual
        updateCardVisual();
      });
    }

    // Format expiry date
    const expiryDateInput = document.getElementById("expiryDate");
    if (expiryDateInput) {
      expiryDateInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 4) value = value.substring(0, 4);
        if (value.length > 2)
          value = value.substring(0, 2) + "/" + value.substring(2);
        this.value = value;

        // Update card visual
        updateCardVisual();
      });
    }

    // Format CVV
    const cvvInput = document.getElementById("cvv");
    if (cvvInput) {
      cvvInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 3) value = value.substring(0, 3);
        this.value = value;
      });
    }

    // Update cardholder name on card visual
    const cardholderNameInput = document.getElementById("cardholderName");
    if (cardholderNameInput) {
      cardholderNameInput.addEventListener("input", function () {
        updateCardVisual();
      });
    }

    // Function to update card visual
    function updateCardVisual() {
      const cardNumber = document.getElementById("cardNumber").value;
      const expiryDate = document.getElementById("expiryDate").value;
      const cardholderName = document.getElementById("cardholderName").value;

      const cardNumberDisplay = document.querySelector(".card-number");
      if (cardNumberDisplay && cardNumber) {
        // Format the card number for display
        const parts = [];
        for (let i = 0; i < 4; i++) {
          const start = i * 4;
          const part = cardNumber.substring(start, start + 4).trim();
          if (part) {
            parts.push(part);
          } else {
            parts.push("****");
          }
        }

        // Update the card number display
        cardNumberDisplay.innerHTML = parts
          .map((part) => `<span>${part}</span>`)
          .join("");
      }

      const cardHolderValue = document.querySelector(
        ".card-holder .card-value"
      );
      if (cardHolderValue) {
        cardHolderValue.textContent = cardholderName || "YOUR NAME";
      }

      const cardExpiryValue = document.querySelector(
        ".card-expiry .card-value"
      );
      if (cardExpiryValue) {
        cardExpiryValue.textContent = expiryDate || "MM/YY";
      }
    }

    // Add proceed button event listener
    const proceedBtn = document.getElementById("proceedCardForm");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", function () {
        // Validate inputs
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;
        const cardholderName = document.getElementById("cardholderName").value;

        if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
          showNotification("Please enter a valid card number");
          return;
        }

        if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
          showNotification("Please enter a valid expiry date (MM/YY)");
          return;
        }

        if (!cvv || cvv.length < 3) {
          showNotification("Please enter a valid CVV");
          return;
        }

        if (!cardholderName || cardholderName.length < 3) {
          showNotification("Please enter the cardholder name");
          return;
        }

        // Hide the card form
        popup.remove();

        // Show loading
        showLoading("Processing payment...");

        // Simulate processing and show PIN verification
        setTimeout(() => {
          hideLoading();
          showCardPinVerification(
            popup.dataset.bkashNumber,
            popup.dataset.amount,
            cardholderName
          );
        }, 1500);
      });
    }
  }

  function showCardPinVerification(bkashNumber, amount, cardholderName) {
    // Create overlay first
    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";
    overlay.id = "cardPinOverlay";
    document.body.appendChild(overlay);

    // Create PIN popup with consistent style
    const popup = document.createElement("div");
    popup.className = "pin-popup";
    popup.id = "cardPinEntryPopup";
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;
    popup.dataset.cardholderName = cardholderName;

    // Get dimensions from main container
    const containerElement = document.querySelector(".bkash-to-bank-container");
    const containerWidth = containerElement
      ? containerElement.offsetWidth
      : 550;
    const containerHeight = containerElement
      ? containerElement.offsetHeight
      : 700;

    popup.innerHTML = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="header-title">
          <h3>বিকাশ পিন দিন</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="popup-content">
        <div class="pin-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        
        <div class="pin-title">Enter bKash PIN</div>
        <div class="pin-subtitle">Please enter your 5-digit PIN to add ৳${amount} to your bKash account</div>
        
        <div class="pin-input-container">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
          <input type="password" maxlength="1" class="pin-input">
        </div>
        
        <div class="info-box">
          <div class="info-icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <div class="info-text">
            Never share your PIN with anyone. bKash representatives will never ask for your PIN.
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="action-btn cancel-btn" id="cancelCardPin">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="action-btn proceed-btn" id="confirmCardPin" disabled>
            <i class="fas fa-check"></i> Confirm
          </button>
        </div>
      </div>
    </div>
  `;

    // Add to body
    document.body.appendChild(popup);

    // Set dimensions to match container
    popup.style.width = `${containerWidth}px`;
    popup.style.height = `${containerHeight}px`;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    // Show with animation
    setTimeout(() => {
      overlay.classList.add("show");
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const cancelBtn = popup.querySelector("#cancelCardPin");
    const confirmBtn = popup.querySelector("#confirmCardPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    cancelBtn.addEventListener("click", function () {
      hideCardPinPopup();
      showSection(accountSelectionSection);
    });

    confirmBtn.addEventListener("click", function () {
      processCardPinConfirmation(
        popup.dataset.bkashNumber,
        popup.dataset.amount,
        popup.dataset.cardholderName
      );
    });

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        // Only allow numeric input
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length === 1 && index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }

        // Check if all fields are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;

        // Update button styling
        if (allFilled) {
          confirmBtn.style.opacity = "1";
        } else {
          confirmBtn.style.opacity = "0.7";
        }
      });

      input.addEventListener("keydown", function (e) {
        // Move to previous input on backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    // Focus first input
    pinInputs[0].focus();
  }

  function processCardPinConfirmation(bkashNumber, amount, cardholderName) {
    // Show loading
    showLoading("Confirming transaction...");

    // Get container dimensions before hiding the PIN popup
    const pinPopup = document.getElementById("cardPinEntryPopup");
    const containerWidth = pinPopup.style.width;
    const containerHeight = pinPopup.style.height;

    // Hide PIN popup
    hideCardPinPopup();

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      showCardSuccessPopup(
        bkashNumber,
        amount,
        cardholderName,
        containerWidth,
        containerHeight
      );
    }, 1500);
  }

  function showCardSuccessPopup(
    bkashNumber,
    amount,
    cardholderName,
    width = "550px",
    height = "700px"
  ) {
    // Generate transaction ID
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";
    overlay.id = "cardSuccessOverlay";
    document.body.appendChild(overlay);

    // Create popup
    const popup = document.createElement("div");
    popup.className = "pin-popup success-popup";
    popup.id = "cardSuccessPopup";
    popup.dataset.transactionId = transactionId;
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;
    popup.dataset.cardholderName = cardholderName;
    popup.dataset.time = currentTime;

    popup.innerHTML = `
    <div class="form-header-gradient success-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="header-title">
          <h3>Transfer Successful</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="bkash-to-bank-form">
      <div class="success-popup-body">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <div class="success-amount">৳${amount}</div>
        <div class="success-message">has been added to your bKash account</div>
        
        <div class="transaction-details">
          <div class="detail-row">
            <div class="detail-label">Transaction ID</div>
            <div class="detail-value">${transactionId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">From</div>
            <div class="detail-value">Visa Card (${cardholderName})</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">To</div>
            <div class="detail-value">bKash Account (${bkashNumber})</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Time</div>
            <div class="detail-value">${currentTime}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value success">Completed</div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="action-btn cancel-btn" id="downloadCardReceipt">
            <i class="fas fa-download"></i> Download Receipt
          </button>
          <button class="action-btn proceed-btn" id="cardDoneButton">
            <i class="fas fa-check"></i> Done
          </button>
        </div>
      </div>
    </div>
  `;

    // Add to body
    document.body.appendChild(popup);

    // Set dimensions to match PIN popup
    popup.style.width = width;
    popup.style.height = height;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    // Style the success header to be green
    const successHeaderStyle = document.createElement("style");
    successHeaderStyle.id = "success-header-style";
    successHeaderStyle.innerHTML = `
    .success-header-gradient {
      background: linear-gradient(135deg, rgb(30, 150, 80) 0%, rgb(20, 120, 60) 100%) !important;
    }
    .success-header-gradient::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: radial-gradient(
        circle at top right,
        rgba(255, 255, 255, 0.15),
        transparent 70%
      );
    }
    .success-icon {
      color: rgb(30, 150, 80);
    }
    .detail-value.success {
      color: rgb(30, 150, 80);
    }
  `;

    // Add the style if it doesn't already exist
    if (!document.getElementById("success-header-style")) {
      document.head.appendChild(successHeaderStyle);
    }

    // Show with animation
    setTimeout(() => {
      overlay.classList.add("show");
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const doneBtn = popup.querySelector("#cardDoneButton");
    const downloadBtn = popup.querySelector("#downloadCardReceipt");

    doneBtn.addEventListener("click", function () {
      // Hide popup and overlay with animation
      popup.classList.remove("show");
      overlay.classList.remove("show");

      setTimeout(() => {
        // Remove popup and overlay
        popup.remove();
        overlay.remove();

        // Show the original bKash to Bank section
        const bkashToBankSection = document.querySelector(
          ".bkash-to-bank-section"
        );
        if (bkashToBankSection) {
          bkashToBankSection.style.display = "flex";
        }

        // Show the account selection section
        showSection(accountSelectionSection);
      }, 300);
    });

    downloadBtn.addEventListener("click", function () {
      downloadCardReceipt(
        popup.dataset.transactionId,
        popup.dataset.bkashNumber,
        popup.dataset.amount,
        popup.dataset.cardholderName,
        popup.dataset.time
      );
    });
  }

  function hideCardPinPopup() {
    const popup = document.getElementById("cardPinEntryPopup");
    const overlay = document.getElementById("cardPinOverlay");

    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => {
        popup.remove();
      }, 300);
    }

    if (overlay) {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  function downloadCardReceipt(
    transactionId,
    bkashNumber,
    amount,
    cardholderName,
    time
  ) {
    // Create receipt content
    const receiptContent = `
    bKash Transaction Receipt
    ========================
    
    Transaction ID: ${transactionId}
    Amount: ৳${amount}
    From: Visa Card (${cardholderName})
    To: bKash Account (${bkashNumber})
    Time: ${time}
    
    Status: Successful
    
    Thank you for using bKash!
  `;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Hide Card Form
  function hideCardForm() {
    const popup = document.getElementById("visaCardPopup");
    if (!popup) return;

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
    }, 300);
  }

  // Process Card Payment
  function processCardPayment(bkashNumber, amount) {
    // Get form values
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    const cardholderName = document.getElementById("cardholderName").value;

    // Validate inputs
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      showNotification("Please enter a valid card number");
      return;
    }

    if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
      showNotification("Please enter a valid expiry date (MM/YY)");
      return;
    }

    if (!cvv || cvv.length < 3) {
      showNotification("Please enter a valid CVV");
      return;
    }

    if (!cardholderName || cardholderName.length < 3) {
      showNotification("Please enter the cardholder name");
      return;
    }

    // Show loading
    showLoading("Processing payment...");

    // Hide card form
    hideCardForm();

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      showPinPopup(bkashNumber, amount);
    }, 1500);
  }

  // Show PIN Popup
  function showPinPopup(bkashNumber, amount) {
    // Get the container dimensions for matching size
    const containerWidth = document.querySelector(
      ".bkash-to-bank-container"
    ).offsetWidth;

    // bKash brand colors
    const bkashPrimary = "#e2146c";
    const bkashSecondary = "#a4126a";

    // Create popup
    const popup = document.createElement("div");
    popup.className = "pin-popup";
    popup.id = "pinEntryPopup";
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;

    popup.innerHTML = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="title-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="header-title">
          <h3>বিকাশ পিন দিন</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    
    <div class="popup-content">
      <div class="pin-icon">
        <i class="fas fa-lock"></i>
      </div>
      
      <div class="pin-title">Enter bKash PIN</div>
      <div class="pin-subtitle">Please enter your 5-digit PIN to complete the transaction</div>
      
      <div class="pin-input-container">
        <input type="password" maxlength="1" class="pin-input">
        <input type="password" maxlength="1" class="pin-input">
        <input type="password" maxlength="1" class="pin-input">
        <input type="password" maxlength="1" class="pin-input">
        <input type="password" maxlength="1" class="pin-input">
      </div>
      
      <button class="proceed-button" id="confirmPin" disabled>Confirm</button>
    </div>
  `;

    // Add to body
    document.body.appendChild(popup);

    // Set width to match container
    popup.style.width = containerWidth + "px";
    popup.style.left = `calc(50% - ${containerWidth / 2}px)`;

    // Set top position to align with main container
    const containerTop = document
      .querySelector(".bkash-to-bank-container")
      .getBoundingClientRect().top;
    popup.style.top = `${containerTop}px`;

    // Apply bKash color for header
    popup.querySelector(
      ".proceed-button"
    ).style.background = `linear-gradient(135deg, ${bkashPrimary} 0%, ${bkashSecondary} 100%)`;

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const closePopup = popup.querySelector(".close-popup");
    const confirmBtn = popup.querySelector("#confirmPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    if (closePopup) {
      closePopup.addEventListener("click", function () {
        hidePinPopup();
        showSection(accountSelectionSection);
      });
    }

    confirmBtn.addEventListener("click", function () {
      processPinConfirmation(popup.dataset.bkashNumber, popup.dataset.amount);
    });

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1 && index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }

        // Check if all fields are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;
      });

      input.addEventListener("keydown", function (e) {
        // Move to previous input on backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    // Focus first input
    pinInputs[0].focus();
  }

  // Hide PIN Popup
  function hidePinPopup() {
    const popup = document.getElementById("pinEntryPopup");
    if (!popup) return;

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
    }, 300);
  }

  // Process PIN Confirmation
  function processPinConfirmation(bkashNumber, amount) {
    // Show loading
    showLoading("Confirming transaction...");

    // Hide PIN popup
    hidePinPopup();

    // Simulate processing
    setTimeout(() => {
      hideLoading();
      showSuccessPopup(bkashNumber, amount);
    }, 1500);
  }

  // Show Success Popup
  function showSuccessPopup(bkashNumber, amount) {
    // Get container dimensions
    const containerWidth = document.querySelector(
      ".bkash-to-bank-container"
    ).offsetWidth;

    // Generate transaction ID
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.id = "successPopup";
    popup.dataset.transactionId = transactionId;
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;
    popup.dataset.time = currentTime;

    popup.innerHTML = `
      <div class="popup-header">
        <div class="popup-title">Transaction Successful</div>
        <div class="close-popup" id="closeSuccessPopup">
          <i class="fas fa-times"></i>
        </div>
      </div>
      
      <div class="popup-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <div class="success-amount">৳${amount}</div>
        <div class="success-message">has been added to your bKash account</div>
        
        <div class="transaction-details">
          <div class="detail-row">
            <div class="detail-label">Transaction ID</div>
            <div class="detail-value">${transactionId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">From</div>
            <div class="detail-value">Visa Card</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">To</div>
            <div class="detail-value">${bkashNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Time</div>
            <div class="detail-value">${currentTime}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value success">Completed</div>
          </div>
        </div>
        
        <div class="success-actions">
          <button class="download-receipt-btn" id="downloadReceipt">
            <i class="fas fa-download"></i> Download Receipt
          </button>
          <button class="done-btn" id="doneButton">Done</button>
        </div>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Set width to match container
    popup.style.width = containerWidth + "px";
    popup.style.left = `calc(50% - ${containerWidth / 2}px)`;

    // Set top position to align with main container
    const containerTop = document
      .querySelector(".bkash-to-bank-container")
      .getBoundingClientRect().top;
    popup.style.top = `${containerTop}px`;

    // Set colors
    popup.querySelector(".popup-header").style.backgroundColor = "#4CAF50";
    popup.querySelector(".success-icon").style.color = "#4CAF50";
    popup.querySelector(".success-amount").style.color = bkashPrimary;
    popup.querySelector(".detail-value.success").style.color = "#4CAF50";
    popup.querySelector(
      ".done-btn"
    ).style.background = `linear-gradient(135deg, ${bkashPrimary} 0%, ${bkashSecondary} 100%)`;

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const closePopup = popup.querySelector("#closeSuccessPopup");
    const doneBtn = popup.querySelector("#doneButton");
    const downloadBtn = popup.querySelector("#downloadReceipt");

    closePopup.addEventListener("click", function () {
      hideSuccessPopup();
    });

    doneBtn.addEventListener("click", function () {
      hideSuccessPopup();
    });

    downloadBtn.addEventListener("click", function () {
      downloadReceipt(
        popup.dataset.transactionId,
        popup.dataset.bkashNumber,
        popup.dataset.amount,
        popup.dataset.time
      );
    });
  }

  // Hide Success Popup
  function hideSuccessPopup() {
    const popup = document.getElementById("successPopup");
    if (!popup) return;

    popup.classList.remove("show");

    setTimeout(() => {
      popup.remove();
      showSection(accountSelectionSection);
    }, 300);
  }

  // Download Receipt
  function downloadReceipt(transactionId, bkashNumber, amount, time) {
    // Create receipt content
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${transactionId}
      Amount: ৳${amount}
      From: Visa Card
      To: ${bkashNumber}
      Time: ${time}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // ==================== UTILITY FUNCTIONS ====================
  // Show Loading
  // Show Loading
  function showLoading(message) {
    // Remove any existing loading overlay
    const existingOverlay = document.querySelector(".loading-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-overlay";
    loadingDiv.innerHTML = `
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p>${message}</p>
    </div>
  `;
    document.body.appendChild(loadingDiv);
  }

  // Hide Loading
  function hideLoading() {
    const loadingDiv = document.querySelector(".loading-overlay");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  // Show Notification
  function showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  
  // ==================== STYLES FUNCTIONS ====================
  // Add CSS for all popups and animations
  function addPopupStyles() {
    // Check if styles are already added
    if (document.getElementById("popup-styles")) return;

    const style = document.createElement("style");
    style.id = "popup-styles";
    style.innerHTML = `
      /* Common Popup Styles */
      .card-details-popup,
      .card-form-popup,
      .pin-popup {
        position: fixed;
        z-index: 3000;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
      }
      
      .card-details-popup.show,
      .card-form-popup.show,
      .pin-popup.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        background-color: ${bkashPrimary};
        color: white;
      }
      
      .back-arrow,
      .close-popup {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 16px;
      }
      
      .popup-title {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        flex: 1;
      }
      
      .popup-content {
        padding: 20px;
        max-height: calc(100vh - 200px);
        overflow-y: auto;
      }
      
      .popup-footer {
        display: flex;
        gap: 10px;
        padding: 15px 20px;
        border-top: 1px solid #eee;
      }
      
      /* PIN Entry Styles */
      .pin-icon {
        font-size: 48px;
        color: ${bkashPrimary};
        margin: 10px 0 20px;
        text-align: center;
      }
      
      .pin-title {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 10px;
      }
      
      .pin-subtitle {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 30px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .pin-input-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
      }
      
      .pin-input {
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 22px;
        border: 2px solid #ddd;
        border-radius: 10px;
        background-color: #f9f9f9;
        transition: all 0.3s;
      }
      
      .pin-input:focus {
        border-color: ${bkashPrimary};
        outline: none;
        background-color: white;
      }
    `;

    document.head.appendChild(style);
  }

  // Add Success Popup Styles
  function addSuccessPopupStyles() {
    // Check if styles are already added
    if (document.getElementById("success-popup-styles")) return;

    const style = document.createElement("style");
    style.id = "success-popup-styles";
    style.innerHTML = `
    /* Success Popup Styles */
    .success-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      z-index: 3000;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      max-width: 550px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }

    .success-popup.show {
      transform: translateY(0);
    }

    /* New Header Style */
    .success-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
       background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
      color: white;
      height: 60px;
    }

    .success-header-left, 
    .success-header-right {
      width: 40px;
      display: flex;
      align-items: center;
    }

    .success-header-title {
      flex: 1;
      text-align: center;
    }

    .success-header-title h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .success-logo {
      height: 36px;
    }

    .success-popup-body {
      padding: 15px;
      overflow-y: auto;
      flex: 1;
      max-height: calc(100% - 60px);
    }

    .success-icon {
      font-size: 54px;
      color: #4caf50;
      margin: 15px 0;
      text-align: center;
    }

    .success-amount {
      font-size: 24px;
      font-weight: 600;
      color: #1c2e58;
      margin-bottom: 5px;
      text-align: center;
    }

    .success-message {
      color: #666;
      margin-bottom: 15px;
      text-align: center;
    }

    .transaction-details {
      background-color: #f8f8f8;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 15px;
      text-align: left;
      font-size: 14px;
      max-height: 250px;
      overflow-y: auto;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      color: #666;
    }

    .detail-value {
      font-weight: 600;
      color: #333;
    }

    .detail-value.success {
      color: #4caf50;
    }

    .success-actions {
      display: flex;
      gap: 12px;
      padding: 5px 0;
    }

    .download-receipt-btn {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background-color: #f1f1f1;
      color: #333;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .done-btn {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      border: none;
       background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  `;

    document.head.appendChild(style);
  }

  // Add Card Form Styles
  function addCardFormStyles() {
    // Check if styles already exist
    if (document.getElementById("card-form-styles")) return;

    const style = document.createElement("style");
    style.id = "card-form-styles";
    style.innerHTML = `
      /* Card Form Specific Styles */
      .card-visual {
         background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
        border-radius: 10px;
        padding: 20px;
        color: white;
        margin-bottom: 20px;
        position: relative;
        overflow: hidden;
        height: 200px;
        box-shadow: 0 10px 20px rgba(226, 20, 108, 0.2);
      }
      
      .card-visual::before {
        content: "";
        position: absolute;
        top: -50px;
        right: -50px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1;
      }
      
      .card-chip {
        width: 40px;
        height: 30px;
        background: #ffc107;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      
      .card-number {
        font-size: 20px;
        letter-spacing: 2px;
        margin-bottom: 20px;
        display: flex;
        gap: 10px;
      }
      
      .card-details {
        display: flex;
        justify-content: space-between;
      }
      
      .card-holder {
        flex: 1;
      }
      
      .card-label {
        font-size: 10px;
        opacity: 0.7;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      
      .card-value {
        font-size: 14px;
        font-weight: 500;
      }
      
      .card-brand {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 24px;
        font-weight: 600;
      }
      
      .visa-logo {
        height: 24px;
      }
      
      .input-wrapper {
        position: relative;
      }
      
      .card-input {
        width: 100%;
        padding: 15px 15px 15px 45px;
        border-radius: 10px;
        border: 1px solid #ddd;
        font-size: 15px;
        background-color: #f9f9f9;
        transition: all 0.3s;
      }
      
      .card-input:focus {
        border-color: #1c2e58;
        box-shadow: 0 0 0 2px rgba(226, 20, 108, 0.1);
        outline: none;
        background-color: white;
      }
    `;

    document.head.appendChild(style);
  }

  // Add Utility Styles
  function addUtilityStyles() {
    // Check if styles already exist
    if (document.getElementById("utility-styles")) return;

    const style = document.createElement("style");
    style.id = "utility-styles";
    style.innerHTML = `
      /* Loading Overlay */
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      
      .loading-content {
        text-align: center;
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1c2e58;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Notification */
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 9999;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      /* Animation */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .fade-in {
        animation: fadeIn 0.3s ease forwards;
      }
      
      /* Responsive Styles */
      @media (max-width: 768px) {
        .form-row {
          flex-direction: column;
          gap: 10px;
        }
        
        .form-actions,
        .success-actions {
          flex-direction: column;
        }
      }
      
      @media (max-width: 500px) {
        .pin-input {
          width: 40px;
          height: 40px;
          font-size: 18px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // Add all necessary styles
  addPopupStyles();
  addSuccessPopupStyles();
  addCardFormStyles();
  addUtilityStyles();

  // Initialize the first screen
  showSection(accountSelectionSection);

  // Debug message to console
  console.log("bKash to Bank functionality initialized");

  function addUpdatedPinStyles() {
    // Check if styles already exist
    if (document.getElementById("updated-pin-styles")) return;

    const style = document.createElement("style");
    style.id = "updated-pin-styles";
    style.innerHTML = `
    /* PIN Overlay Styles */
    .pin-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1900;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .pin-overlay.show {
      opacity: 1;
    }
    
    /* PIN Input Styles */
    .pin-popup {
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .pin-popup.show {
      opacity: 1;
    }
    
    .pin-icon {
      text-align: center;
      font-size: 48px;
      color: #1c2e58;
      margin: 20px 0;
    }
    
    .pin-title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
      color: #333;
    }
    
    .pin-subtitle {
      font-size: 15px;
      color: #666;
      text-align: center;
      margin-bottom: 25px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .pin-input-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 25px;
    }
    
    .pin-input {
      width: 48px;
      height: 48px;
      text-align: center;
      font-size: 24px;
      border: 2px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      transition: all 0.3s;
    }
    
    .pin-input:focus {
      border-color: #1c2e58;
      outline: none;
      background-color: white;
      box-shadow: 0 0 0 2px rgba(226, 20, 108, 0.1);
    }
    
    .popup-content {
      padding: 15px 20px;
    }
    
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    
    /* Success Popup Styles */
    .success-popup {
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .success-popup.show {
      opacity: 1;
    }
    
    .success-popup-body {
      padding: 15px 20px;
      overflow-y: auto;
    }
    
    .success-icon {
      font-size: 54px;
      margin: 15px 0;
      text-align: center;
    }
    
    .success-amount {
      font-size: 24px;
      font-weight: 600;
      color: #1c2e58;
      margin-bottom: 5px;
      text-align: center;
    }
    
    .success-message {
      color: #666;
      margin-bottom: 20px;
      text-align: center;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .pin-input {
        width: 42px;
        height: 42px;
        font-size: 20px;
      }
      
      .action-buttons {
        flex-direction: column;
      }
    }
    
    @media (max-width: 500px) {
      .pin-input {
        width: 38px;
        height: 38px;
        font-size: 18px;
      }
    }
  `;

    document.head.appendChild(style);
  }

  // Call this function when the page loads
  document.addEventListener("DOMContentLoaded", function () {
    addUpdatedPinStyles();
  });
});

// Add this to body onload or immediately
