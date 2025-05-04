// addMoneyJS.js - Bank to bKash Implementation
document.addEventListener("DOMContentLoaded", function () {
  // Main sections
  const sourceSelectionSection = document.getElementById(
    "sourceSelectionSection"
  );
  const bankToBkashSection = document.getElementById("bankToBkashSection");
  const bankListSection = document.getElementById("bankListSection");
  const bankAccountSection = document.getElementById("bankAccountSection");
  const cardToBkashSection = document.getElementById("cardToBkashSection");
  const cardTypeSection = document.getElementById("cardTypeSection");

  // Balance toggle elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  // Bank to bKash specific elements
  const bankToBkashOption = document.getElementById("bankToBkashOption");
  const bankAccountOption = document.getElementById("bankAccountOption");
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  // State
  let currentSelectedBank = null;
  let navigationHistory = ["sourceSelectionSection"];
  let showingAllBanks = false;

  // Bank data - Only 3 banks
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
      hasBadge: true,
    },
  ];

  // Balance toggle functionality
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

  // Function to show a specific section
  function showSection(section) {
    // Hide all sections first
    const allSections = [
      sourceSelectionSection,
      bankToBkashSection,
      bankListSection,
      bankAccountSection,
      cardToBkashSection,
      cardTypeSection,
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

  // Add back button functionality if needed
  function addBackButton(container, targetSection) {
    // Create back button if it doesn't exist
    let backButton = container.querySelector(".back-button");

    if (!backButton) {
      backButton = document.createElement("div");
      backButton.className = "back-button";
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
      container.insertBefore(backButton, container.firstChild);
    }

    // Add click event
    backButton.addEventListener("click", function () {
      showSection(targetSection);
    });
  }

  // Bank to bKash flow initialization
  if (bankToBkashOption) {
    bankToBkashOption.addEventListener("click", function () {
      showSection(bankToBkashSection);
    });
  }

  // Bank Account option
  if (bankAccountOption) {
    bankAccountOption.addEventListener("click", function () {
      showSection(bankListSection);

      // Add back button to bank list section
      if (bankListSection) {
        addBackButton(bankListSection, bankToBkashSection);
      }

      // Initialize bank list with limited banks
      initializeBankList(false);
    });
  }

  // Create the bottom sheet for bank selection
  function createBottomSheet(bank) {
    // Get the bank list container
    const bankListContainer = document.querySelector(".bank-list");

    // Hide all bank items
    const bankItems = bankListContainer.querySelectorAll(".bank-item");
    bankItems.forEach((item) => {
      item.style.display = "none";
    });

    // Create new bottom sheet
    const sheet = document.createElement("div");
    sheet.className = "custom-bottom-sheet";
    sheet.innerHTML = `
      <div class="sheet-content">
        <div class="sheet-header">
          <h3 class="sheet-title">Add Bank Account</h3>
          <button class="sheet-close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="sheet-body">
          <div class="bank-info-display">
            <div class="bank-info-logo">
              <img src="${bank.logo}" alt="${bank.name}">
            </div>
            <div class="bank-info-name">${bank.name}</div>
          </div>
          <div class="info-box">
            <div class="info-icon">
              <i class="fas fa-link"></i>
            </div>
            <div class="info-text">
              <p>Add Money from Bank Account to bKash</p>
              <p class="highlight-text">Added Bank Account can be used for both <strong>Add Money (Bank to bKash)</strong> and <strong>bKash to Bank</strong></p>
            </div>
          </div>
          <div class="sheet-actions">
            <button class="sheet-cancel-btn">Cancel</button>
            <button class="sheet-confirm-btn">Add Bank Account</button>
          </div>
        </div>
      </div>
    `;

    // Style the sheet to appear in place of bank list
    sheet.style.backgroundColor = "white";
    sheet.style.borderRadius = "16px";
    sheet.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    sheet.style.padding = "20px";
    sheet.style.marginTop = "10px";
    sheet.style.animation = "fadeIn 0.3s ease-out";

    // Clear and append to bank list container
    bankListContainer.innerHTML = "";
    bankListContainer.appendChild(sheet);

    // Set current selected bank
    currentSelectedBank = bank;

    // Event listeners
    const cancelBtn = sheet.querySelector(".sheet-cancel-btn");
    const confirmBtn = sheet.querySelector(".sheet-confirm-btn");
    const closeBtn = sheet.querySelector(".sheet-close-btn");

    const closeSheet = () => {
      sheet.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => {
        initializeBankList();
      }, 300);
    };

    cancelBtn.addEventListener("click", closeSheet);
    closeBtn.addEventListener("click", closeSheet);

    confirmBtn.addEventListener("click", function () {
      showBankAccountForm(bank);
    });
  }

  // Show bank account form with all required fields
  function showBankAccountForm(bank) {
    // Update bank account section with selected bank
    const bankLogo = bankAccountSection.querySelector(
      ".selected-bank-logo img"
    );
    const bankName = bankAccountSection.querySelector(".selected-bank-name");

    bankLogo.src = bank.logo;
    bankName.textContent = bank.name;

    // Create the complete form structure
    const formContent = `
      <div class="form-steps">
        <div class="form-step active" data-step="1">
          <div class="bank-header">
            <div class="selected-bank-logo">
              <img src="${bank.logo}" alt="${bank.name}">
            </div>
            <div class="selected-bank-name">${bank.name}</div>
          </div>
          
          <div class="form-group">
            <label class="account-input-label">Account Number</label>
            <div class="account-input-container">
              <div class="account-input-icon">
                <i class="fas fa-user"></i>
              </div>
              <input type="text" placeholder="Enter 16-digit Bank Account number" class="account-input" id="accountNumber" maxlength="19">
            </div>
            <span class="error-message" id="accountError"></span>
          </div>

          <div class="form-group">
            <label class="account-input-label">Mobile Number</label>
            <div class="account-input-container">
              <div class="account-input-icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <input type="text" placeholder="Enter bKash mobile number" class="account-input" id="mobileNumber" maxlength="11">
            </div>
            <span class="error-message" id="mobileError"></span>
          </div>

          <div class="form-group">
            <label class="account-input-label">Amount</label>
            <div class="account-input-container">
              <div class="account-input-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <input type="text" placeholder="Enter amount (Min: ৳50, Max: ৳20,000)" class="account-input" id="amount">
            </div>
            <span class="error-message" id="amountError"></span>
          </div>

          <div class="info-box">
            <div class="info-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <div class="info-text">
              OTP will be sent to the mobile number you provided above. Please ensure the number is correct. For more details, check <span class="info-link">i</span>
            </div>
          </div>

          <div class="terms-text">
            <input type="checkbox" id="termsCheck" class="terms-checkbox">
            <label for="termsCheck">I agree to the <a href="#" class="info-link">Terms & Conditions</a></label>
          </div>

          <button class="action-btn proceed-btn" id="proceedBtn" disabled>
            Proceed <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="form-step" data-step="2" style="display: none;">
          <div class="otp-verification">
            <h4>OTP Verification</h4>
            <p>Enter the 6-digit OTP sent to your registered mobile number</p>
            <div class="otp-input-container">
              <input type="text" maxlength="1" class="otp-input">
              <input type="text" maxlength="1" class="otp-input">
              <input type="text" maxlength="1" class="otp-input">
              <input type="text" maxlength="1" class="otp-input">
              <input type="text" maxlength="1" class="otp-input">
              <input type="text" maxlength="1" class="otp-input">
            </div>
            <p class="resend-text">Didn't receive OTP? <button class="resend-btn" id="resendOTP">Resend</button></p>
            <button class="action-btn proceed-btn" id="verifyOTPBtn" disabled>
              Verify OTP <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div class="form-step" data-step="3" style="display: none;">
          <div class="pin-verification">
            <h4>Enter bKash PIN</h4>
            <p>Enter your 5-digit bKash PIN to complete the transaction</p>
            <div class="pin-input-container">
              <input type="password" maxlength="1" class="pin-input">
              <input type="password" maxlength="1" class="pin-input">
              <input type="password" maxlength="1" class="pin-input">
              <input type="password" maxlength="1" class="pin-input">
              <input type="password" maxlength="1" class="pin-input">
            </div>
            <button class="action-btn proceed-btn" id="confirmPINBtn" disabled>
              Confirm <i class="fas fa-check"></i>
            </button>
          </div>
        </div>

        <div class="form-step" data-step="4" style="display: none;">
          <div class="success-screen">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h4>Transaction Successful!</h4>
            <p class="transaction-amount">৳<span id="transactionAmount"></span></p>
            <p class="transaction-info">has been added to your bKash account</p>
            <div class="transaction-details">
              <div class="detail-item">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value" id="transactionId"></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">From:</span>
                <span class="detail-value" id="fromBank"></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">To:</span>
                <span class="detail-value" id="toBkash"></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Time:</span>
                <span class="detail-value" id="transactionTime"></span>
              </div>
            </div>
            <div class="success-actions">
              <button class="action-btn download-btn" id="downloadReceipt">
                <i class="fas fa-download"></i> Download Receipt
              </button>
              <button class="action-btn proceed-btn" id="addMoreMoney">
                Add More Money
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Set the content
    bankAccountSection.innerHTML = formContent;
    showSection(bankAccountSection);

    // Setup form validation and steps
    setupFormValidation();
    setupFormSteps();
  }

  // Form validation
  function setupFormValidation() {
    const accountNumber = document.getElementById("accountNumber");
    const mobileNumber = document.getElementById("mobileNumber");
    const amount = document.getElementById("amount");
    const termsCheck = document.getElementById("termsCheck");
    const proceedBtn = document.getElementById("proceedBtn");

    // Account number formatting
    accountNumber.addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "");
      if (this.value.length > 16) {
        this.value = this.value.slice(0, 16);
      }
      if (this.value.length > 4) {
        this.value = this.value.match(/.{1,4}/g).join(" ");
      }
      validateForm();
    });

    // Mobile number validation
    mobileNumber.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }
      validateForm();
    });

    // Amount validation
    amount.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9.]/g, "");
      validateForm();
    });

    // Terms checkbox
    termsCheck.addEventListener("change", validateForm);

    function validateForm() {
      const isAccountValid =
        accountNumber.value.replace(/\s/g, "").length === 16;
      const isMobileValid =
        mobileNumber.value.length === 11 && mobileNumber.value.startsWith("01");
      const amountValue = parseFloat(amount.value);
      const isAmountValid = amountValue >= 50 && amountValue <= 20000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(
        isAccountValid &&
        isMobileValid &&
        isAmountValid &&
        isTermsChecked
      );

      // Show error messages
      document.getElementById("accountError").textContent = isAccountValid
        ? ""
        : "Please enter a valid 16-digit account number";
      document.getElementById("mobileError").textContent = isMobileValid
        ? ""
        : "Please enter a valid 11-digit bKash number starting with 01";
      document.getElementById("amountError").textContent = isAmountValid
        ? ""
        : "Please enter amount between ৳50 and ৳20,000";
    }
  }

  // Form steps handling
  function setupFormSteps() {
    const proceedBtn = document.getElementById("proceedBtn");

    proceedBtn.addEventListener("click", function () {
      showStep(2);
      setupOTPVerification();
    });
  }

  // OTP Verification
  function setupOTPVerification() {
    const otpInputs = document.querySelectorAll(".otp-input");
    const verifyOTPBtn = document.getElementById("verifyOTPBtn");
    const resendOTP = document.getElementById("resendOTP");
    const mobileNumber = document.getElementById("mobileNumber").value;

    // Update the OTP message
    const otpMessage = document.querySelector(".otp-verification p");
    if (otpMessage) {
      otpMessage.textContent = `Enter the 6-digit OTP sent to ${mobileNumber}`;
    }

    // OTP input handling
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
        checkOTPComplete();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    function checkOTPComplete() {
      const otpComplete = Array.from(otpInputs).every(
        (input) => input.value.length === 1
      );
      verifyOTPBtn.disabled = !otpComplete;
    }

    verifyOTPBtn.addEventListener("click", function () {
      showStep(3);
      setupPINVerification();
    });

    resendOTP.addEventListener("click", function () {
      this.disabled = true;
      this.textContent = "Resending...";
      setTimeout(() => {
        this.disabled = false;
        this.textContent = "Resend";
        showNotification(`OTP sent successfully to ${mobileNumber}!`);
      }, 2000);
    });
  }

  // PIN Verification
  function setupPINVerification() {
    const pinInputs = document.querySelectorAll(".pin-input");
    const confirmPINBtn = document.getElementById("confirmPINBtn");

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }
        checkPINComplete();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    function checkPINComplete() {
      const pinComplete = Array.from(pinInputs).every(
        (input) => input.value.length === 1
      );
      confirmPINBtn.disabled = !pinComplete;
    }

    confirmPINBtn.addEventListener("click", function () {
      processTransaction();
    });
  }

  // Process Transaction
  function processTransaction() {
    // Show loading
    showLoading("Processing transaction...");

    setTimeout(() => {
      hideLoading();
      showStep(4);
      showTransactionSuccess();
    }, 2000);
  }

  // Show Transaction Success
  function showTransactionSuccess() {
    const amount = document.getElementById("amount").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const transactionId = generateTransactionId();
    const currentTime = new Date().toLocaleString();

    document.getElementById("transactionAmount").textContent = amount;
    document.getElementById("transactionId").textContent = transactionId;
    document.getElementById("fromBank").textContent = currentSelectedBank.name;
    document.getElementById("toBkash").textContent = mobileNumber;
    document.getElementById("transactionTime").textContent = currentTime;

    // Add event listeners for success actions
    document
      .getElementById("downloadReceipt")
      .addEventListener("click", downloadReceipt);
    document
      .getElementById("addMoreMoney")
      .addEventListener("click", function () {
        showSection(sourceSelectionSection);
      });
  }

  // Download Receipt
  function downloadReceipt() {
    // Create receipt content
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${document.getElementById("transactionId").textContent}
      Amount: ৳${document.getElementById("transactionAmount").textContent}
      From: ${document.getElementById("fromBank").textContent}
      To: ${document.getElementById("toBkash").textContent}
      Time: ${document.getElementById("transactionTime").textContent}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${
      document.getElementById("transactionId").textContent
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Show specific step
  function showStep(stepNumber) {
    const steps = document.querySelectorAll(".form-step");
    steps.forEach((step) => {
      step.style.display =
        step.dataset.step === stepNumber.toString() ? "block" : "none";
    });
  }

  // Generate Transaction ID
  function generateTransactionId() {
    return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Show Loading
  function showLoading(message) {
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

  // Real-time search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      // If there is a query, filter banks
      if (query.length > 0) {
        filterBanks(query);
      } else {
        // Show initial set of banks if search is cleared
        initializeBankList(showingAllBanks);
      }
    });
  }

  // Filter banks based on search query
  function filterBanks(query) {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    bankListContainer.innerHTML = "";

    banks
      .filter((bank) => bank.name.toLowerCase().includes(query))
      .forEach((bank) => {
        createBankItem(bank, bankListContainer);
      });
  }

  // Function to initialize dynamic bank list
  function initializeBankList(showAll = false) {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    // Clear existing content
    bankListContainer.innerHTML = "";

    // Show all banks
    banks.forEach((bank) => {
      createBankItem(bank, bankListContainer);
    });
  }

  // Create bank item
  function createBankItem(bank, container) {
    const bankItem = document.createElement("div");
    bankItem.className = `bank-item ${bank.hasBadge ? "has-badge" : ""}`;

    bankItem.innerHTML = `
      <div class="bank-logo">
        <img src="${bank.logo}" alt="${bank.name}" onerror="this.src='images/banks/default-bank.png'">
      </div>
      <div class="bank-name">${bank.name}</div>
      <div class="link-icon">
        <i class="fas fa-link"></i>
      </div>
    `;

    bankItem.addEventListener("click", function () {
      createBottomSheet(bank);
    });

    container.appendChild(bankItem);
  }

  // Add animation styles
  function addAnimation() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      .fade-in {
        animation: fadeIn 0.3s ease forwards;
      }
      
      .back-button {
        padding: 5px 0;
        margin-bottom: 15px;
        color: #666;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: color 0.2s;
      }
      
      .back-button:hover {
        color: #e2146c;
      }
      
      .back-button i {
        margin-right: 8px;
      }
      
      /* Bottom sheet styles */
      .custom-bottom-sheet {
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        margin: 20px 0;
        overflow: hidden;
      }
      
      .sheet-header {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .sheet-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      
      .sheet-close-btn {
        background: none;
        border: none;
        font-size: 20px;
        color: #999;
        cursor: pointer;
        padding: 5px;
      }
      
      .sheet-body {
        padding: 20px;
      }
      
      .bank-info-display {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 15px;
        background: #f8f8f8;
        border-radius: 10px;
      }
      
      .bank-info-logo {
        width: 50px;
        height: 50px;
        margin-right: 15px;
      }
      
      .bank-info-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .bank-info-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      
      .highlight-text {
        margin-top: 10px;
        color: #333;
      }
      
      .sheet-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      
      .sheet-cancel-btn,
      .sheet-confirm-btn {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
      }
      
      .sheet-cancel-btn {
        background: #f5f5f5;
        color: #666;
      }
      
      .sheet-confirm-btn {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
      }
      
      /* Form styles */
      .form-group {
        margin-bottom: 20px;
      }
      
      .error-message {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        display: block;
      }
      
      .terms-checkbox {
        margin-right: 8px;
      }
      
      /* OTP and PIN styles */
      .otp-verification,
      .pin-verification {
        text-align: center;
        padding: 20px;
      }
      
      .otp-input-container,
      .pin-input-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
      }
      
      .otp-input,
      .pin-input {
        width: 45px;
        height: 45px;
        text-align: center;
        font-size: 20px;
        border: 2px solid #eee;
        border-radius: 10px;
        outline: none;
      }
      
      .otp-input:focus,
      .pin-input:focus {
        border-color: #e2146c;
      }
      
      .resend-text {
        color: #666;
        margin-top: 15px;
      }
      
      .resend-btn {
        background: none;
        border: none;
        color: #e2146c;
        cursor: pointer;
        font-weight: 600;
      }
      
      /* Success screen styles */
      .success-screen {
        text-align: center;
        padding: 20px;
      }
      
      .success-icon {
        font-size: 60px;
        color: #4CAF50;
        margin-bottom: 20px;
      }
      
      .transaction-amount {
        font-size: 32px;
        font-weight: 700;
        color: #e2146c;
        margin: 10px 0;
      }
      
      .transaction-info {
        color: #666;
        margin-bottom: 20px;
      }
      
      .transaction-details {
        background: #f8f8f8;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        text-align: left;
      }
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
      
      .detail-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      
      .detail-label {
        color: #666;
      }
      
      .detail-value {
        font-weight: 600;
        color: #333;
      }
      
      .success-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      
      .download-btn {
        background: #f5f5f5;
        color: #333;
      }
      
      /* Loading overlay */
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
        border-top: 4px solid #e2146c;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Notification styles */
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
      
      /* Toggle button styles */
      .toggle-container {
        margin-top: 15px;
        text-align: center;
      }
      
      .toggle-banks-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
        background-color: #f5f5f5;
        border: none;
        border-radius: 10px;
        color: #555;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .toggle-banks-btn:hover {
        background-color: #eee;
      }
      
      /* Responsive styles */
      @media (max-width: 480px) {
        .custom-bottom-sheet {
          margin: 10px 0;
        }
        
        .otp-input,
        .pin-input {
          width: 40px;
          height: 40px;
          font-size: 18px;
        }
        
        .transaction-amount {
          font-size: 28px;
        }
        
        .sheet-actions,
        .success-actions {
          flex-direction: column;
        }
        
        .sheet-cancel-btn,
        .sheet-confirm-btn,
        .download-btn,
        .proceed-btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add animations
  addAnimation();

  // Initialize the first screen
  showSection(sourceSelectionSection);
});
