document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const searchInput = document.querySelector(".search-input");
  const merchantItems = document.querySelectorAll(".merchant-item");
  const qrScannerButton = document.querySelector(".qr-scanner-button");
  const backButton = document.querySelector(".back-button a");
  const subscriptionContainer = document.querySelector(
    ".subscription-container"
  );

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      merchantItems.forEach((item) => {
        const merchantName = item.getAttribute("data-merchant").toLowerCase();
        const merchantNumber = item.getAttribute("data-number").toLowerCase();

        if (
          merchantName.includes(searchTerm) ||
          merchantNumber.includes(searchTerm)
        ) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });

    // Clear search when focused
    searchInput.addEventListener("focus", function () {
      this.value = "";
      merchantItems.forEach((item) => {
        item.style.display = "flex";
      });
    });
  }

  // Subscription container click handler
  if (subscriptionContainer) {
    subscriptionContainer.addEventListener("click", function () {
      alert("সাবস্ক্রিপশন পেজে যাচ্ছে...");
    });
  }

  // QR Scanner click handler (simulated)
  if (qrScannerButton) {
    qrScannerButton.addEventListener("click", function () {
      alert("QR স্ক্যানার খোলা হচ্ছে...");
    });
  }

  // Back button handler
  if (backButton) {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.history.back();
    });
  }

  // Merchant item click handler - Updated to work with all merchant items
  merchantItems.forEach((item) => {
    item.addEventListener("click", function () {
      const merchantName = this.getAttribute("data-merchant");
      const merchantNumber = this.getAttribute("data-number");

      // Navigate to payment page with merchant info
      showPaymentPage(merchantName, merchantNumber);
    });
  });

  // Function to show payment page
  function showPaymentPage(merchantName, merchantNumber) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    // Create payment page
    const paymentPage = document.createElement("div");
    paymentPage.className = "payment-page";

    // Set initial content for the payment page
    paymentPage.innerHTML = `
      <div class="payment-container">
        <div class="payment-header">
          <div class="header-content">
            <div class="back-button">
              <button class="back-to-merchants"><i class="fas fa-arrow-left"></i></button>
            </div>
            <div class="header-title">
              <h3>পেমেন্ট</h3>
            </div>
            <div class="header-icon">
              <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
            </div>
          </div>
        </div>
        
        <div class="payment-body">
          <div class="merchant-details">
            <h4>প্রাপক</h4>
            <div class="merchant-info-display">
              <div class="merchant-icon-display">
                <i class="fas fa-shopping-bag"></i>
              </div>
              <div class="merchant-data">
                <h5 class="merchant-name-display">${merchantName}</h5>
                <p class="merchant-number-display">${merchantNumber}</p>
              </div>
            </div>
          </div>
          
          <div class="payment-amount-section">
            <h4>পরিমাণ</h4>
            <div class="amount-display">
              <h2 class="amount-value">৳0</h2>
            </div>
            <p class="total-amount">সর্বনিম্ন পরিমাণ: ৳1.00</p>
          </div>
          
          <div class="payment-method-section">
            <h4>উৎস বেছে নিন</h4>
            <div class="payment-options">
              <div class="payment-option active" data-method="bkash">
                <img src="images/bkashlogo.png" alt="বিকাশ">
                <span>বিকাশ</span>
              </div>
              <div class="payment-option" data-method="card">
                <i class="fas fa-credit-card"></i>
                <span>পে-সেন্টার</span>
              </div>
              <div class="payment-option" data-method="visa">
                <img src="images/visa-logo.png" alt="VISA">
                <span>****9850</span>
                <div class="selected-mark"><i class="fas fa-check-circle"></i></div>
              </div>
            </div>
          </div>
          
          <div class="reference-section">
            <p class="reference-note">স্বীকৃতি - সে সময়টি নিয়ে এগিয়ে যান</p>
          </div>
          
          <div class="payment-buttons">
            <button class="next-button" disabled>
              এগিয়ে যান
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Append elements to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(paymentPage);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        z-index: 999;
        animation: quickFade 0.1s ease-out;
      }
      
      .payment-page {
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 420px;
        height: 550px;
        z-index: 1000;
        animation: quickSlide 0.15s ease-out;
      }

      .payment-container {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .pin-popup, .success-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 450px;
        z-index: 1000;
        animation: quickSlide 0.15s ease-out;
      }
      
      @keyframes quickFade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes quickSlide {
        from { transform: translate(-50%, -45%); opacity: 0; }
        to { transform: translate(-50%, -50%); opacity: 1; }
      }
      
      .pin-popup-content, .success-popup-content {
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      .payment-header, .pin-header, .success-header {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        padding: 12px 16px;
        position: relative;
        overflow: hidden;
      }
      
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      
      .back-button button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .header-title h3 {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
      
      .header-icon img {
        width: 28px;
        height: auto;
      }
      
      .payment-body, .popup-body {
        padding: 16px;
        flex: 1;
        overflow-y: auto;
      }
      
      .merchant-details {
        margin-bottom: 16px;
      }
      
      .merchant-details h4 {
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
        font-weight: 500;
      }
      
      .merchant-info-display {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f9f9f9;
        padding: 12px;
        border-radius: 12px;
      }
      
      .merchant-icon-display {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
      }
      
      .merchant-name-display {
        font-size: 15px;
        font-weight: 600;
        color: #333;
        margin: 0 0 4px 0;
      }
      
      .merchant-number-display {
        font-size: 13px;
        color: #666;
        margin: 0;
      }
      
      .payment-amount-section {
        text-align: center;
        padding: 16px 0;
        margin-bottom: 16px;
        background: #fcfcfc;
        border-radius: 12px;
      }
      
      .amount-display {
        margin: 8px 0;
        cursor: pointer;
      }
      
      .amount-value {
        font-size: 36px;
        font-weight: 700;
        color: #e2146c;
        margin: 0;
      }
      
      .total-amount {
        font-size: 12px;
        color: #888;
        margin: 8px 0 0 0;
      }
      
      .payment-method-section {
        margin-bottom: 16px;
      }
      
      .payment-method-section h4 {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        font-weight: 500;
      }
      
      .payment-options {
        display: flex;
        gap: 8px;
      }
      
      .payment-option {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f9f9f9;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 10px 8px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      
      .payment-option img {
        height: 20px;
        width: auto;
        margin-bottom: 6px;
      }
      
      .payment-option i {
        font-size: 20px;
        margin-bottom: 6px;
        color: #666;
      }
      
      .payment-option span {
        font-size: 11px;
        color: #333;
        font-weight: 500;
      }
      
      .payment-option.active {
        border-color: #e2146c;
        background: rgba(226, 20, 108, 0.05);
      }
      
      .selected-mark {
        position: absolute;
        top: 6px;
        right: 6px;
        color: #e2146c;
        font-size: 10px;
      }
      
      .reference-section {
        text-align: center;
        margin-bottom: 16px;
        padding: 8px 0;
      }
      
      .reference-note {
        font-size: 12px;
        color: #666;
        margin: 0;
      }
      
      .payment-buttons {
        margin-top: auto;
        padding-top: 26px;
      }
      
      .next-button {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
      }
      
      .next-button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      
      @media (max-width: 480px) {
        .payment-page {
          width: 95%;
          height: 90%;
        }
        
        .pin-popup, .success-popup {
          width: 90%;
          height: 80%;
        }
      }
    `;

    document.head.appendChild(style);

    // Elements
    const amountValue = paymentPage.querySelector(".amount-value");
    const paymentOptions = paymentPage.querySelectorAll(".payment-option");
    const nextButton = paymentPage.querySelector(".next-button");
    const backButton = paymentPage.querySelector(".back-to-merchants");
    const amountDisplay = paymentPage.querySelector(".amount-display");

    // Initialize with a default amount
    let currentAmount = 0;

    // Update amount display
    function updateAmountDisplay() {
      amountValue.textContent = `৳${currentAmount}`;
    }

    // Validate form to enable/disable next button
    function validateForm() {
      const hasSelectedPayment =
        paymentPage.querySelector(".payment-option.active") !== null;
      const isValidAmount = currentAmount >= 1;

      nextButton.disabled = !(hasSelectedPayment && isValidAmount);

      if (nextButton.disabled) {
        nextButton.style.background = "#ccc";
        nextButton.style.cursor = "not-allowed";
      } else {
        nextButton.style.background =
          "linear-gradient(135deg, #e2146c 0%, #a4126a 100%)";
        nextButton.style.cursor = "pointer";
      }
    }

    // Handle payment option selection
    paymentOptions.forEach((option) => {
      option.addEventListener("click", function () {
        paymentOptions.forEach((opt) => opt.classList.remove("active"));
        this.classList.add("active");
        validateForm();
      });
    });

    // Amount display click handler
    amountDisplay.addEventListener("click", function () {
      showAmountInputModal();
    });

    // Back button handler
    backButton.addEventListener("click", function () {
      document.body.removeChild(overlay);
      document.body.removeChild(paymentPage);
      document.head.removeChild(style);
    });

    // Next button click handler
    nextButton.addEventListener("click", function () {
      // Hide current page
      paymentPage.style.display = "none";
      // Show PIN entry popup
      showPinEntryPopup(merchantName, merchantNumber, currentAmount);
    });

    // Function to show amount input modal
    function showAmountInputModal() {
      const amountModal = document.createElement("div");
      amountModal.className = "amount-modal";

      amountModal.innerHTML = `
        <div class="amount-modal-content">
          <div class="amount-header">
            <h3>পরিমাণ লিখুন</h3>
            <button class="close-amount-modal"><i class="fas fa-times"></i></button>
          </div>
          <div class="amount-input-container">
            <div class="amount-input-wrapper">
              <span class="taka-symbol">৳</span>
              <input type="number" class="amount-input-field" value="${currentAmount}" min="1">
            </div>
          </div>
          <button class="save-amount-button">সেভ করুন</button>
        </div>
      `;

      paymentPage.appendChild(amountModal);

      const modalStyle = document.createElement("style");
      modalStyle.textContent = `
        .amount-modal {
          position: absolute;
          top: 13%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          animation: quickFade 0.1s ease-out;
          border-radius: 16px;
        }
        
        .amount-modal-content {
          background-color: white;
          border-radius: 16px;
          width: 90%;
          max-width: 340px;
          padding: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          animation: quickScale 0.15s ease-out;
        }
        
        @keyframes quickScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .amount-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .amount-header h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
        
        .close-amount-modal {
          background: #f5f5f5;
          border: none;
          font-size: 16px;
          color: #666;
          cursor: pointer;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .amount-input-container {
          margin: 20px 0;
        }
        
        .amount-input-wrapper {
          display: flex;
          align-items: center;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          padding: 10px 12px;
          background-color: #f9f9f9;
        }
        
        .amount-input-wrapper:focus-within {
          border-color: #e2146c;
          background-color: white;
        }
        
        .taka-symbol {
          font-size: 22px;
          font-weight: 600;
          color: #e2146c;
          margin-right: 8px;
        }
        
        .amount-input-field {
          flex: 1;
          border: none;
          outline: none;
          background-color: transparent;
          font-size: 22px;
          font-weight: 600;
          color: #333;
        }
        
        .save-amount-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
      `;

      document.head.appendChild(modalStyle);

      const amountInput = amountModal.querySelector(".amount-input-field");
      const saveButton = amountModal.querySelector(".save-amount-button");
      const closeButton = amountModal.querySelector(".close-amount-modal");

      setTimeout(() => {
        amountInput.focus();
        amountInput.select();
      }, 50);

      saveButton.addEventListener("click", function () {
        const newAmount = parseInt(amountInput.value) || 0;

        if (newAmount >= 1) {
          currentAmount = newAmount;
          updateAmountDisplay();
          validateForm();

          paymentPage.removeChild(amountModal);
          document.head.removeChild(modalStyle);
        } else {
          const wrapper = amountModal.querySelector(".amount-input-wrapper");
          wrapper.style.borderColor = "#ff3b30";
          wrapper.style.backgroundColor = "rgba(255, 59, 48, 0.05)";

          setTimeout(() => {
            wrapper.style.borderColor = "";
            wrapper.style.backgroundColor = "";
          }, 1000);
        }
      });

      closeButton.addEventListener("click", function () {
        paymentPage.removeChild(amountModal);
        document.head.removeChild(modalStyle);
      });

      amountInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          saveButton.click();
        }
      });
    }
  }

  // Function to show PIN entry popup
  function showPinEntryPopup(merchantName, merchantNumber, currentAmount) {
    // Create overlay if not exists
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "9998";
      document.body.appendChild(overlay);
    }

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    const pinPopup = document.createElement("div");
    pinPopup.className = "pin-popup";

    // Set PIN popup style
    pinPopup.style.position = "fixed";
    pinPopup.style.top = "50%";
    pinPopup.style.left = "50%";
    pinPopup.style.transform = "translate(-50%, -50%)";
    pinPopup.style.width = "100%";
    pinPopup.style.maxWidth = "420px";
    pinPopup.style.height = "auto";
    pinPopup.style.maxHeight = "90vh";
    pinPopup.style.zIndex = "9999";
    pinPopup.style.backgroundColor = "white";
    pinPopup.style.borderRadius = "16px";
    pinPopup.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
    pinPopup.style.overflow = "hidden";
    pinPopup.style.display = "flex";
    pinPopup.style.flexDirection = "column";

    pinPopup.innerHTML = `
      <div style="background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%); padding: 16px; position: relative; overflow: hidden; flex-shrink: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1;">
          <div>
            <button class="back-to-payment" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; font-size: 16px; cursor: pointer; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div>
            <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0;">পিন প্রবেশ করুন</h3>
          </div>
          <div>
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন" style="width: 28px; height: auto;">
          </div>
        </div>
      </div>
      
      <div style="padding: 20px; display: flex; flex-direction: column; overflow-y: auto; flex: 1;">
        <div style="margin-bottom: 15px;">
          <div style="margin-bottom: 10px;">
            <span style="font-size: 14px; color: #666; font-weight: 500;">পেমেন্ট করা হচ্ছে</span>
          </div>
          <div style="display: flex; align-items: center; gap: 15px; background: #f9f9f9; padding: 12px; border-radius: 10px;">
            <div style="width: 40px; height: 40px; background-color: rgba(226, 20, 108, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #e2146c; font-size: 18px;">
              <i class="fas fa-store"></i>
            </div>
            <div>
              <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 3px;">${merchantName}</div>
              <div style="font-size: 14px; color: #666;">${merchantNumber}</div>
            </div>
          </div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #f0f0f0;">
          <div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;">
              <span>পরিমাণ</span>
              <span style="color: #e2146c; font-weight: 500;">৳${currentAmount}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;">
              <span>চার্জ</span>
              <span>৳0.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; font-weight: 600;">
              <span>মোট</span>
              <span style="color: #e2146c;">৳${currentAmount}</span>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div style="text-align: center; font-size: 15px; font-weight: 500; color: #333; margin-bottom: 20px;">আপনার বিকাশ পিন দিন</div>
          <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px;">
            <input type="password" class="pin-box" maxlength="1" inputmode="numeric" style="width: 50px; height: 55px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 24px; text-align: center; outline: none; -webkit-text-security: disc; background-color: #f9f9f9;">
            <input type="password" class="pin-box" maxlength="1" inputmode="numeric" style="width: 50px; height: 55px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 24px; text-align: center; outline: none; -webkit-text-security: disc; background-color: #f9f9f9;">
            <input type="password" class="pin-box" maxlength="1" inputmode="numeric" style="width: 50px; height: 55px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 24px; text-align: center; outline: none; -webkit-text-security: disc; background-color: #f9f9f9;">
            <input type="password" class="pin-box" maxlength="1" inputmode="numeric" style="width: 50px; height: 55px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 24px; text-align: center; outline: none; -webkit-text-security: disc; background-color: #f9f9f9;">
          </div>
          <button class="confirm-pin-button" disabled style="width: 100%; padding: 16px; background: #ccc; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: not-allowed; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 20px;">
            পেমেন্ট করুন
          </button>
        </div>
       <div style="text-align: center; margin-top: 10px;">
          <a href="#" style="color: #e2146c; text-decoration: none; font-size: 14px; font-weight: 500;">পিন ভুলে গেছেন?</a>
        </div>
      </div>
    `;

    document.body.appendChild(pinPopup);

    const pinBoxes = pinPopup.querySelectorAll(".pin-box");
    const confirmButton = pinPopup.querySelector(".confirm-pin-button");
    const backButton = pinPopup.querySelector(".back-to-payment");

    setTimeout(() => {
      pinBoxes[0].focus();
    }, 50);

    pinBoxes.forEach((box, index) => {
      box.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < pinBoxes.length - 1) {
            pinBoxes[index + 1].focus();
          }
        }

        const isComplete = Array.from(pinBoxes).every(
          (box) => box.value.length === 1
        );
        confirmButton.disabled = !isComplete;

        if (confirmButton.disabled) {
          confirmButton.style.background = "#ccc";
          confirmButton.style.cursor = "not-allowed";
        } else {
          confirmButton.style.background =
            "linear-gradient(135deg, #e2146c 0%, #a4126a 100%)";
          confirmButton.style.cursor = "pointer";
        }
      });

      box.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
          pinBoxes[index - 1].focus();
        }
      });

      // Improve focus appearance
      box.addEventListener("focus", function () {
        this.style.borderColor = "#e2146c";
        this.style.backgroundColor = "white";
        this.style.boxShadow = "0 0 0 3px rgba(226, 20, 108, 0.1)";
      });

      box.addEventListener("blur", function () {
        this.style.borderColor = "#e0e0e0";
        this.style.backgroundColor = "#f9f9f9";
        this.style.boxShadow = "none";
      });
    });

    confirmButton.addEventListener("click", function () {
      if (confirmButton.disabled) return;

      // Remove PIN popup
      document.body.removeChild(pinPopup);

      // Show success popup
      showSuccessPopup(merchantName, merchantNumber, currentAmount);
    });

    backButton.addEventListener("click", function () {
      // Remove PIN popup
      document.body.removeChild(pinPopup);

      // Allow background scrolling again
      document.body.style.overflow = "";

      // Show payment page again
      showPaymentPage(merchantName, merchantNumber);
    });
  }

  // Function to show success popup after payment
  function showSuccessPopup(merchantName, merchantNumber, amount) {
    const successPopup = document.createElement("div");
    successPopup.className = "success-popup";

    const transactionId = "TXN" + Math.floor(Math.random() * 10000000000);
    const currentDate = new Date().toLocaleString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    successPopup.innerHTML = `
      <div class="success-popup-content">
        <div class="success-header">
          <div class="header-content">
            <div class="header-title centered">
              <h3>পেমেন্ট সফল</h3>
            </div>
          </div>
        </div>
        
        <div class="popup-body">
          <div class="success-message-container">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="success-message">
              <h3>ধন্যবাদ!</h3>
              <p>আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</p>
            </div>
          </div>
          
          <div class="transaction-details-compact">
            <div class="merchant-compact">
              <div class="merchant-icon-mini">
                <i class="fas fa-store"></i>
              </div>
              <div class="merchant-name-mini">${merchantName}</div>
            </div>
            
            <div class="amount-row-compact">
              <span class="amount-value-large">৳${amount}</span>
            </div>
            
            <div class="trans-id-compact">
              <span>ট্রানজেকশন আইডি: ${transactionId}</span>
            </div>
          </div>
          
          <div class="action-buttons-container">
            <button class="share-button" id="shareButton">
              <i class="fas fa-share-alt"></i> শেয়ার করুন
            </button>
            <button class="download-button" id="downloadReceiptBtn">
              <i class="fas fa-download"></i> ডাউনলোড করুন
            </button>
            <button class="done-button">
              ঠিক আছে
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(successPopup);

    const style = document.createElement("style");
    style.textContent = `
      .success-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 420px;
        height: auto;
        max-height: 90vh;
        z-index: 9999;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }
      
      .success-popup-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .success-header {
        background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
        padding: 12px 16px;
        position: relative;
      }
      
      .header-content {
        position: relative;
        z-index: 1;
      }
      
      .header-title.centered {
        width: 100%;
        text-align: center;
      }
      
      .header-title h3 {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
      
      .popup-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .success-message-container {
        text-align: center;
        margin-bottom: 12px;
      }
      
      .success-icon {
        font-size: 40px;
        color: #2ecc71;
        margin-bottom: 8px;
      }
      
      .success-message h3 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0 0 4px 0;
      }
      
      .success-message p {
        font-size: 12px;
        color: #666;
        margin: 0;
      }
      
      .transaction-details-compact {
        background-color: #f9f9f9;
        padding: 12px;
        border-radius: 10px;
        margin-bottom: 16px;
        text-align: center;
      }
      
      .merchant-compact {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      
      .merchant-icon-mini {
        width: 28px;
        height: 28px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #e2146c;
        font-size: 12px;
      }
      
      .merchant-name-mini {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
      
      .amount-row-compact {
        margin-bottom: 12px;
      }
      
      .amount-value-large {
        font-size: 24px;
        font-weight: 700;
        color: #e2146c;
      }
      
      .trans-id-compact {
        font-size: 11px;
        color: #666;
      }
      
      .action-buttons-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: auto;
      }
      
      .share-button, .download-button {
        width: 100%;
        padding: 10px;
        background-color: white;
        color: #e2146c;
        border: 1px solid #e2146c;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.2s;
      }
      
      .share-button:hover, .download-button:hover {
        background-color: rgba(226, 20, 108, 0.05);
      }
      
      .done-button {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
    `;

    document.head.appendChild(style);

    const downloadButton = successPopup.querySelector("#downloadReceiptBtn");
    downloadButton.addEventListener("click", function () {
      generateAndDownloadReceipt(
        merchantName,
        merchantNumber,
        amount,
        transactionId,
        currentDate
      );
    });

    const shareButton = successPopup.querySelector("#shareButton");
    shareButton.addEventListener("click", function () {
      if (navigator.share) {
        navigator
          .share({
            title: "বিকাশ পেমেন্ট রসিদ",
            text: `${merchantName} কে ৳${amount} টাকা পেমেন্ট করা হয়েছে। ট্রানজেকশন আইডি: ${transactionId}`,
          })
          .catch((error) => console.log("Sharing failed", error));
      } else {
        alert("আপনার রসিদ শেয়ার করার জন্য ডাউনলোড করুন।");
      }
    });

    const doneButton = successPopup.querySelector(".done-button");
    doneButton.addEventListener("click", function () {
      // Remove all popups and overlays
      const overlay = document.querySelector(".modal-overlay");
      const paymentPage = document.querySelector(".payment-page");
      const pinPopup = document.querySelector(".pin-popup");

      if (overlay) document.body.removeChild(overlay);
      if (paymentPage) document.body.removeChild(paymentPage);
      if (pinPopup) document.body.removeChild(pinPopup);
      document.body.removeChild(successPopup);

      // Allow background scrolling again
      document.body.style.overflow = "";

      // Remove all styles
      const styles = document.querySelectorAll("style");
      styles.forEach((style) => {
        if (
          style.textContent.includes("modal-overlay") ||
          style.textContent.includes("payment-page") ||
          style.textContent.includes("pin-popup") ||
          style.textContent.includes("success-popup")
        ) {
          document.head.removeChild(style);
        }
      });
    });
  }

  // Function to generate and download receipt
  function generateAndDownloadReceipt(
    merchantName,
    merchantNumber,
    amount,
    transactionId,
    date
  ) {
    const receiptHTML = `<!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>বিকাশ পেমেন্ট রিসিট</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
          }
          .receipt {
            max-width: 400px;
            margin: 20px auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .receipt-header {
            background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
            color: white;
            padding: 20px;
            text-align: center;
          }
          .receipt-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .receipt-header img {
            width: 80px;
            margin-bottom: 10px;
          }
          .success-icon {
            text-align: center;
            font-size: 48px;
            margin: 20px 0;
            color: #2ecc71;
          }
          .receipt-body {
            padding: 20px;
          }
          .merchant-info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .merchant-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f9f9f9;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: #e2146c;
            font-size: 20px;
          }
          .merchant-details h2 {
            margin: 0 0 5px 0;
            font-size: 18px;
          }
          .merchant-details p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
          .transaction-details div {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .transaction-details div:last-child {
            border-bottom: none;
          }
          .label {
            color: #666;
            font-size: 14px;
          }
          .value {
            font-weight: bold;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="receipt-header">
            <img src="https://www.bkash.com/sites/all/themes/bkash/logo.png" alt="বিকাশ লোগো">
            <h1>পেমেন্ট রিসিট</h1>
          </div>
          <div class="success-icon">✓</div>
          <div class="receipt-body">
            <div class="merchant-info">
              <div class="merchant-icon">🏪</div>
              <div class="merchant-details">
                <h2>${merchantName}</h2>
                <p>${merchantNumber}</p>
              </div>
            </div>
            <div class="transaction-details">
              <div>
                <span class="label">পরিমাণ</span>
                <span class="value">৳${amount}</span>
              </div>
              <div>
                <span class="label">চার্জ</span>
                <span class="value">৳0.00</span>
              </div>
              <div>
                <span class="label">মোট পরিমাণ</span>
                <span class="value">৳${amount}</span>
              </div>
              <div>
                <span class="label">ট্রানজেকশন আইডি</span>
                <span class="value">${transactionId}</span>
              </div>
              <div>
                <span class="label">তারিখ ও সময়</span>
                <span class="value">${date}</span>
              </div>
            </div>
          </div>
          <div class="footer">
            &copy; বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </body>
      </html>`;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/html;charset=utf-8," + encodeURIComponent(receiptHTML)
    );
    element.setAttribute("download", "bkash_payment_receipt.html");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
});
