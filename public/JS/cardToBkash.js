// Enhanced Card to bKash JavaScript with Popup Implementation
document.addEventListener("DOMContentLoaded", function () {
  // Card to bKash Option Click Handler
  const cardToBkashOption = document.getElementById("cardToBkashOption");
  if (cardToBkashOption) {
    cardToBkashOption.addEventListener("click", function () {
      showCardToBkashPopup();
    });
  }

  // Show Card to bKash Popup
  function showCardToBkashPopup() {
    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="title-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h3>Card to bKash</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div id="cardToBkashPopupSection" class="add-money-form">
        <div class="tab-container">
          <div class="tab-item active" data-tab="myAccount">My Account</div>
          <div class="tab-item" data-tab="otherAccount">Other Account</div>
        </div>

        <div class="account-section-title">Your bKash Account Number</div>
        <div class="account-info">
          <div class="account-number">01616122600</div>
        </div>

        <div class="account-section-title">Amount</div>
        <div class="account-input-container">
          <div class="account-input-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <input type="text" placeholder="Enter amount" class="account-input" id="cardAmount">
        </div>

        <div class="min-amount-text">Min. amount ৳50.00</div>

        <button class="action-btn proceed-btn" id="cardToBkashPopupNext">
          Proceed <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Back button functionality
    const backBtn = popupContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Tab functionality
    const tabItems = popupContainer.querySelectorAll(".tab-item");
    tabItems.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        tabItems.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked tab
        this.classList.add("active");
      });
    });

    // Proceed button functionality
    const proceedBtn = popupContainer.querySelector("#cardToBkashPopupNext");
    proceedBtn.addEventListener("click", function () {
      const amountInput = popupContainer.querySelector("#cardAmount");
      const amount = amountInput.value.trim();

      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) < 50) {
        showError("Please enter a valid amount (minimum ৳50)");
        return;
      }

      // Close current popup
      closePopup(popupOverlay, popupContainer);

      // Show card selection popup
      showCardSelectionPopup(amount);
    });
  }

  // Show Card Selection Popup
  function showCardSelectionPopup(amount) {
    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="title-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h3>Select Card Type</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div class="add-money-form">
        <div class="card-type-title">Select your card type</div>
        <div class="card-types">
          <div class="card-type-item" data-card-type="visa">
            <div class="card-type-logo">
              <img src="images/cards/visa.png" alt="VISA">
            </div>
            <div class="card-type-name">VISA</div>
            <div class="right-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>

          <div class="card-type-item" data-card-type="mastercard">
            <div class="card-type-logo">
              <img src="images/cards/mastercard.png" alt="Mastercard">
            </div>
            <div class="card-type-name">Mastercard</div>
            <div class="right-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>

          <div class="card-type-item" data-card-type="amex">
            <div class="card-type-logo">
              <img src="images/cards/amex.png" alt="American Express / Citymaxx">
            </div>
            <div class="card-type-name">American Express / Citymaxx</div>
            <div class="right-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
        
        <div class="transaction-amount-display">
          <div class="amount-label">Transaction Amount</div>
          <div class="amount-value">৳${amount}</div>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Back button functionality
    const backBtn = popupContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
      showCardToBkashPopup();
    });

    // Card type item click functionality
    const cardTypeItems = popupContainer.querySelectorAll(".card-type-item");
    cardTypeItems.forEach((item) => {
      item.addEventListener("click", function () {
        const cardType = this.getAttribute("data-card-type");
        const cardName = this.querySelector(".card-type-name").textContent;

        // Close current popup
        closePopup(popupOverlay, popupContainer);

        // Show card details popup
        showCardDetailsPopup(cardType, cardName, amount);
      });
    });
  }

  // Show Card Details Popup
  function showCardDetailsPopup(cardType, cardName, amount) {
    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    // Determine card details based on type
    let cardLogo, cardColor;
    switch (cardType) {
      case "visa":
        cardLogo = "images/cards/visa.png";
        cardColor = "#1A1F71";
        break;
      case "mastercard":
        cardLogo = "images/cards/mastercard.png";
        cardColor = "#FF5F00";
        break;
      case "amex":
        cardLogo = "images/cards/amex.png";
        cardColor = "#006FCF";
        break;
    }

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="title-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <h3>Add Money with ${cardName}</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div class="add-money-form">
        <div class="card-form-container">
          <div class="card-preview" style="background: linear-gradient(135deg, ${cardColor}, ${cardColor}dd);">
            <div class="card-chip"></div>
            <div class="card-number-preview">**** **** **** ****</div>
            <div class="card-details">
              <div class="card-holder">
                <span class="card-label">CARD HOLDER</span>
                <span class="card-name-preview">YOUR NAME</span>
              </div>
              <div class="card-expires">
                <span class="card-label">EXPIRES</span>
                <span class="card-expiry-preview">MM/YY</span>
              </div>
            </div>
            <img src="${cardLogo}" alt="${cardType}" class="card-brand-logo">
          </div>
          
          <form class="card-form" id="${cardType}Form">
            <div class="form-column">
              <div class="form-group">
                <label>Card Number</label>
                <div class="input-group">
                  <i class="fas fa-credit-card"></i>
                  <input type="text" class="card-number" placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group half">
                  <label>Expiry Date</label>
                  <div class="input-group">
                    <i class="fas fa-calendar"></i>
                    <input type="text" class="expiry-date" placeholder="MM/YY" maxlength="5">
                  </div>
                </div>
                
                <div class="form-group half">
                  <label>CVV</label>
                  <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" class="cvv" placeholder="XXX" maxlength="4">
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>Cardholder Name</label>
                <div class="input-group">
                  <i class="fas fa-user"></i>
                  <input type="text" class="card-name" placeholder="As shown on card">
                </div>
              </div>
              
              <div class="transaction-amount-display">
                <div class="amount-label">Transaction Amount</div>
                <div class="amount-value">৳${amount}</div>
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-proceed">Proceed</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Back button functionality
    const backBtn = popupContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
      showCardSelectionPopup(amount);
    });

    // Cancel button functionality
    const cancelBtn = popupContainer.querySelector(".btn-cancel");
    cancelBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Card number formatting and preview
    const cardNumberInput = popupContainer.querySelector(".card-number");
    const cardNumberPreview = popupContainer.querySelector(
      ".card-number-preview"
    );

    cardNumberInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(\d{4})/g, "$1 ").trim();
      e.target.value = value;

      // Update preview with masked numbers
      if (value.length > 0) {
        let maskedValue = value.replace(/\d(?=\d{4})/g, "*");
        cardNumberPreview.textContent = maskedValue;
      } else {
        cardNumberPreview.textContent = "**** **** **** ****";
      }
    });

    // Expiry date formatting and preview
    const expiryInput = popupContainer.querySelector(".expiry-date");
    const expiryPreview = popupContainer.querySelector(".card-expiry-preview");

    expiryInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      e.target.value = value;

      // Update preview
      expiryPreview.textContent = value || "MM/YY";
    });

    // Cardholder name preview
    const cardNameInput = popupContainer.querySelector(".card-name");
    const cardNamePreview = popupContainer.querySelector(".card-name-preview");

    cardNameInput.addEventListener("input", function (e) {
      cardNamePreview.textContent = e.target.value.toUpperCase() || "YOUR NAME";
    });

    // Form submission
    const form = popupContainer.querySelector(".card-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      const cardNumber = cardNumberInput.value.replace(/\s/g, "");
      const expiry = expiryInput.value;
      const cvv = popupContainer.querySelector(".cvv").value;
      const cardName = popupContainer.querySelector(".card-name").value;

      if (cardNumber.length < 16) {
        showError("Please enter valid card number");
        return;
      }

      if (!expiry || expiry.length < 5) {
        showError("Please enter valid expiry date");
        return;
      }

      if (!cvv || cvv.length < 3) {
        showError("Please enter valid CVV");
        return;
      }

      if (!cardName) {
        showError("Please enter cardholder name");
        return;
      }

      // Get mobile number (this would be the bKash account)
      let mobileNumber = "01616122600";

      // Close current popup
      closePopup(popupOverlay, popupContainer);

      // Show OTP verification popup
      showOtpVerificationPopup(
        mobileNumber,
        cardNumber,
        cardType,
        cardName,
        amount
      );
    });
  }

  // Show OTP Verification Popup
  function showOtpVerificationPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Generate 6-digit OTP
    const otp = generateOTP();
    console.log(`OTP for demo: ${otp}`);

    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="title-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>OTP Verification</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div class="add-money-form">
        <div class="otp-verification-container">
          <div class="otp-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <p class="otp-message">A 6-digit OTP has been sent to your registered mobile number <strong>${mobileNumber}</strong></p>
          
          <div class="otp-input-group">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="text" class="otp-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
          </div>
          
          <div class="otp-timer">
            Time remaining: <span id="otpTimer">02:00</span>
          </div>
          
          <div class="transaction-amount-display">
            <div class="amount-label">Transaction Amount</div>
            <div class="amount-value">৳${amount}</div>
          </div>
          
          <div class="otp-actions">
            <button type="button" class="btn-resend" disabled>Resend OTP</button>
            <button type="button" class="btn-verify">Verify OTP</button>
          </div>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Focus on first OTP input
    setTimeout(() => {
      const firstInput = popupContainer.querySelector(".otp-input");
      if (firstInput) firstInput.focus();
    }, 300);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Back button functionality
    const backBtn = popupContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
      showCardDetailsPopup(cardType, getCardTypeName(cardType), amount);
    });

    // OTP input handling
    const otpInputs = popupContainer.querySelectorAll(".otp-input");
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        if (this.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    // Start OTP timer
    startOtpTimer(popupContainer);

    // Verify button functionality
    const verifyBtn = popupContainer.querySelector(".btn-verify");
    verifyBtn.addEventListener("click", function () {
      const enteredOTP = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");

      if (enteredOTP.length !== 6) {
        showError("Please enter complete 6-digit OTP");
        return;
      }

      // For demo purposes, accept any 6-digit OTP
      if (enteredOTP.length === 6) {
        // Close current popup
        closePopup(popupOverlay, popupContainer);

        // Show PIN verification popup
        showPinVerificationPopup(
          mobileNumber,
          cardNumber,
          cardType,
          cardName,
          amount
        );
      } else {
        showError("Invalid OTP. Please try again.");
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      }
    });

    // Resend button functionality
    const resendBtn = popupContainer.querySelector(".btn-resend");
    resendBtn.addEventListener("click", function () {
      if (!this.disabled) {
        // Generate new OTP
        const newOTP = generateOTP();
        console.log(`New OTP for demo: ${newOTP}`);

        // Reset timer
        startOtpTimer(popupContainer);

        // Disable resend button
        this.disabled = true;

        // Show notification
        showNotification("OTP has been resent to your mobile number");

        // Clear OTP inputs
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();
      }
    });
  }

  // Show PIN Verification Popup
  function showPinVerificationPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="title-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h3>Enter bKash PIN</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div class="add-money-form">
        <div class="pin-verification-container">
          <div class="pin-icon">
            <i class="fas fa-lock"></i>
          </div>
          <p class="pin-message">Enter your 5-digit bKash PIN to complete the transaction</p>
          
          <div class="pin-input-group">
            <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
          </div>
          
          <div class="transaction-amount-display">
            <div class="amount-label">Transaction Amount</div>
            <div class="amount-value">৳${amount}</div>
          </div>
          
          <div class="pin-actions">
            <button type="button" class="btn-cancel">Cancel</button>
            <button type="button" class="btn-confirm">Confirm</button>
          </div>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Focus on first PIN input
    setTimeout(() => {
      const firstInput = popupContainer.querySelector(".pin-input");
      if (firstInput) firstInput.focus();
    }, 300);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Back button functionality
    const backBtn = popupContainer.querySelector(".back-btn");
    backBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
      showOtpVerificationPopup(
        mobileNumber,
        cardNumber,
        cardType,
        cardName,
        amount
      );
    });

    // Cancel button functionality
    const cancelBtn = popupContainer.querySelector(".btn-cancel");
    cancelBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // PIN input handling
    const pinInputs = popupContainer.querySelectorAll(".pin-input");
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    // Confirm button functionality
    const confirmBtn = popupContainer.querySelector(".btn-confirm");
    confirmBtn.addEventListener("click", function () {
      const enteredPIN = Array.from(pinInputs)
        .map((input) => input.value)
        .join("");

      if (enteredPIN.length !== 5) {
        showError("Please enter complete 5-digit PIN");
        return;
      }

      // Show loading
      showLoading("Processing transaction...");

      // Simulate processing time
      setTimeout(() => {
        // Hide loading
        hideLoading();

        // Close current popup
        closePopup(popupOverlay, popupContainer);

        // Show success popup
        showSuccessPopup(mobileNumber, cardNumber, cardType, cardName, amount);
      }, 2000);
    });
  }

  // Show Success Popup
  function showSuccessPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Generate transaction ID
    const transactionId = generateTransactionId();
    const currentTime = new Date().toLocaleString();

    // Create popup overlay
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container success-popup";

    // Create popup content with gradient header
    popupContainer.innerHTML = `
      <div class="form-header-gradient">
        <button class="popup-close-btn">
          <i class="fas fa-times"></i>
        </button>
        <div class="header-content">
          <div class="header-title">
            <div class="title-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Payment Successful</h3>
          </div>
          <div class="bkash-logo">
            <img src="images/bkashlogo.png" alt="bKash Logo" height="32">
          </div>
        </div>
      </div>
      <div class="add-money-form">
        <div class="success-container">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="success-message">Transaction Successful!</div>
          <div class="success-amount">৳${amount}</div>
          <div class="success-info">has been added to your bKash account</div>
          
          <div class="transaction-details">
            <div class="detail-item">
              <span class="detail-label">Transaction ID</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">From</span>
              <span class="detail-value">${cardName} (${maskCardNumber(
      cardNumber
    )})</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">To</span>
              <span class="detail-value">${mobileNumber}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Time</span>
              <span class="detail-value">${currentTime}</span>
            </div>
          </div>
          
          <div class="success-actions">
            <button type="button" class="btn-download" onclick="downloadReceipt('${transactionId}', '${mobileNumber}', '${maskCardNumber(
      cardNumber
    )}', '${cardType}', '${cardName}', '${amount}', '${currentTime}')">
              <i class="fas fa-download"></i> Download Receipt
            </button>
            <button type="button" class="btn-done">Done</button>
          </div>
        </div>
      </div>
    `;

    // Append to body
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    // Close button functionality
    const closeBtn = popupContainer.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });

    // Done button functionality
    const doneBtn = popupContainer.querySelector(".btn-done");
    doneBtn.addEventListener("click", function () {
      closePopup(popupOverlay, popupContainer);
    });
  }

  // Utility Functions

  // Close popup with animation
  function closePopup(overlay, container) {
    overlay.classList.remove("show");
    container.classList.remove("show");

    setTimeout(() => {
      overlay.remove();
      container.remove();
    }, 300);
  }

  // Generate 6-digit OTP
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate Transaction ID
  function generateTransactionId() {
    return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Get card type name
  function getCardTypeName(cardType) {
    switch (cardType) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      default:
        return cardType;
    }
  }

  // Mask card number (show only last 4 digits)
  function maskCardNumber(cardNumber) {
    return "****" + cardNumber.slice(-4);
  }

  // Start OTP timer
  function startOtpTimer(container) {
    let timeLeft = 120; // 2 minutes
    const timerElement = container.querySelector("#otpTimer");
    const resendBtn = container.querySelector(".btn-resend");

    // Clear any existing timers
    if (window.otpTimerInterval) {
      clearInterval(window.otpTimerInterval);
    }

    // Reset timer display
    updateTimerDisplay();

    // Start new timer
    window.otpTimerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(window.otpTimerInterval);
        resendBtn.disabled = false;
      }
    }, 1000);

    function updateTimerDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }

  // Show loading overlay
  function showLoading(message) {
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-message">${message}</div>
      </div>
    `;

    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
      loadingOverlay.classList.add("show");
    }, 10);
  }

  // Hide loading overlay
  function hideLoading() {
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.classList.remove("show");

      setTimeout(() => {
        loadingOverlay.remove();
      }, 300);
    }
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.classList.add("show");
    }, 10);

    setTimeout(() => {
      errorDiv.classList.remove("show");

      setTimeout(() => {
        errorDiv.remove();
      }, 300);
    }, 3000);
  }

  // Show notification
  function showNotification(message) {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = "notification-message";
    notificationDiv.textContent = message;

    document.body.appendChild(notificationDiv);

    setTimeout(() => {
      notificationDiv.classList.add("show");
    }, 10);

    setTimeout(() => {
      notificationDiv.classList.remove("show");

      setTimeout(() => {
        notificationDiv.remove();
      }, 300);
    }, 3000);
  }

  // Download receipt
  window.downloadReceipt = function (
    transactionId,
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount,
    time
  ) {
    const receiptContent = `
=====================================
        bKash TRANSACTION RECEIPT
=====================================

Transaction ID: ${transactionId}
Date & Time: ${time}
Transaction Type: Card to bKash

AMOUNT: ৳${amount}

From: ${cardName}
Card: ${cardType.toUpperCase()} (${cardNumber})
To: bKash Account (${mobileNumber})

Status: SUCCESSFUL

Thank you for using bKash!
For any inquiries, call 16247.
=====================================
`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Add required CSS styles
  function addStylesForCardPopup() {
    // Check if styles already exist
    if (document.getElementById("card-to-bkash-styles")) {
      return;
    }

    // Create style element
    const style = document.createElement("style");
    style.id = "card-to-bkash-styles";
    style.textContent = `
      /* Popup Overlay */
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 2000;
        animation: fadeIn 0.3s ease forwards;
        backdrop-filter: blur(3px);
      }
      
      .popup-overlay.show {
        display: block;
      }
      
      /* Popup Container */
      .popup-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        width: 95%;
        max-width: 500px;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        z-index: 2001;
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
        margin: 0 auto; /* Ensure horizontal centering */
      }
      
      .popup-container.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      
      /* Close Button */
      .popup-close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        cursor: pointer;
        z-index: 10;
        transition: all 0.2s;
      }
      
      .popup-close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Back Button */
      .back-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
        transition: all 0.2s;
      }
      
      .back-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Header Title */
      .header-title {
        display: flex;
        align-items: center;
      }
      
      /* bKash Logo */
      .bkash-logo {
        display: flex;
        align-items: center;
      }
      
      /* Transaction Amount Display */
      .transaction-amount-display {
        background-color: #f8f8f8;
        border-radius: 10px;
        padding: 15px;
        margin: 20px 0;
      }
      
      .amount-label {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
      
      .amount-value {
        font-size: 20px;
        font-weight: 600;
        color: #e2146c;
      }
      
      /* Card Preview */
      .card-preview {
        width: 100%;
        max-width: 350px;
        aspect-ratio: 1.6 / 1;
        margin: 0 auto 20px;
        border-radius: 12px;
        padding: 20px;
        color: white;
        position: relative;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }
      
      .card-chip {
        width: 40px;
        height: 30px;
        background: linear-gradient(135deg, #f5d182 0%, #e4b84a 100%);
        border-radius: 5px;
        margin-bottom: 20px;
      }
      
      .card-number-preview {
        font-size: 18px;
        letter-spacing: 2px;
        margin-bottom: 20px;
      }
      
      .card-details {
        display: flex;
        justify-content: space-between;
      }
      
      .card-label {
        font-size: 10px;
        opacity: 0.8;
        margin-bottom: 5px;
        display: block;
      }
      
      .card-brand-logo {
        position: absolute;
        bottom: 20px;
        right: 20px;
        height: 30px;
        filter: brightness(0) invert(1);
        opacity: 0.8;
      }
      
      /* Form Styles */
      .card-form-container {
        padding: 20px 0;
      }
      
      .form-group {
        margin-bottom: 15px;
      }
      
      .form-group label {
        display: block;
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
      
      .form-row {
        display: flex;
        gap: 10px;
      }
      
      .form-group.half {
        flex: 1;
      }
      
      .input-group {
        position: relative;
      }
      
      .input-group i {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }
      
      .input-group input {
        width: 100%;
        padding: 12px 12px 12px 35px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
      }
      
      .input-group input:focus {
        outline: none;
        border-color: #e2146c;
      }
      
      /* Action Buttons */
      .form-actions, .otp-actions, .pin-actions, .success-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      
      .btn-cancel, .btn-proceed, .btn-resend, .btn-verify, .btn-confirm, .btn-download, .btn-done {
        flex: 1;
        padding: 12px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .btn-cancel {
        background-color: #f1f1f1;
        color: #666;
        border: none;
      }
      
      .btn-proceed, .btn-verify, .btn-confirm, .btn-done {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
        border: none;
      }
      
      .btn-resend {
        background-color: white;
        color: #666;
        border: 1px solid #ddd;
      }
      
      .btn-download {
        background-color: #f1f1f1;
        color: #333;
        border: none;
      }
      
      .btn-resend:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      /* OTP Verification */
      .otp-verification-container {
        padding: 20px 0;
        text-align: center;
      }
      
      .otp-icon, .pin-icon {
        width: 60px;
        height: 60px;
        background-color: #f8f8f8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: #e2146c;
        font-size: 24px;
      }
      
      .otp-message, .pin-message {
        color: #666;
        margin-bottom: 20px;
        line-height: 1.5;
      }
      
      .otp-input-group, .pin-input-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
      }
      
      .otp-input, .pin-input {
        width: 40px;
        height: 40px;
        text-align: center;
        font-size: 18px;
        border: 2px solid #ddd;
        border-radius: 8px;
      }
      
      .otp-input:focus, .pin-input:focus {
        outline: none;
        border-color: #e2146c;
      }
      
      .otp-timer {
        color: #666;
        margin-bottom: 15px;
      }
      
      /* PIN Verification */
      .pin-verification-container {
        padding: 20px 0;
        text-align: center;
      }
      
      /* Success Container */
      .success-container {
        padding: 20px 0;
        text-align: center;
      }
      
      .success-icon {
        width: 70px;
        height: 70px;
        background-color: #4CAF50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 32px;
      }
      
      .success-message {
        font-size: 22px;
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
      }
      
      .success-amount {
        font-size: 28px;
        font-weight: 700;
        color: #e2146c;
        margin-bottom: 5px;
      }
      
      .success-info {
        color: #666;
        margin-bottom: 20px;
      }
      
      .transaction-details {
        background-color: #f8f8f8;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 20px;
      }
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
      
      .detail-item:last-child {
        border-bottom: none;
      }
      
      .detail-label {
        color: #666;
      }
      
      .detail-value {
        font-weight: 500;
      }
      
      /* Loading Overlay */
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .loading-overlay.show {
        opacity: 1;
      }
      
      .loading-container {
        text-align: center;
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #e2146c;
        border-radius: 50%;
        margin: 0 auto 15px;
        animation: spin 1s linear infinite;
      }
      
      .loading-message {
        color: #333;
        font-weight: 500;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Error Message */
      .error-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background-color: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transition: transform 0.3s ease;
      }
      
      .error-message.show {
        transform: translateX(-50%) translateY(0);
      }
      
      /* Notification Message */
      .notification-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transition: transform 0.3s ease;
      }
      
      .notification-message.show {
        transform: translateX(-50%) translateY(0);
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Responsive Styles */
      @media (max-width: 480px) {
        .popup-container {
          width: 90%;
          max-width: none;
          margin: 0 auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.95);
          border-radius: 16px;
        }
        
        .popup-container.show {
          transform: translate(-50%, -50%) scale(1);
        }
        
        .card-preview {
          max-width: 280px;
        }
        
        .form-row {
          flex-direction: column;
          gap: 15px;
        }
        
        .otp-input, .pin-input {
          width: 35px;
          height: 35px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // Initialize styles
  addStylesForCardPopup();
});
