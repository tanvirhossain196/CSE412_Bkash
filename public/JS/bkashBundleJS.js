// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Balance Toggle Function for Bundle Section
  const showBundleBalanceBtn = document.getElementById("showBundleBalanceBtn");
  const hideBundleBalanceBtn = document.getElementById("hideBundleBalanceBtn");
  const bundleBalanceHidden = document.getElementById("bundleBalanceHidden");
  const bundleBalanceVisible = document.getElementById("bundleBalanceVisible");

  if (showBundleBalanceBtn && hideBundleBalanceBtn) {
    showBundleBalanceBtn.addEventListener("click", function () {
      bundleBalanceHidden.style.display = "none";
      bundleBalanceVisible.style.display = "flex";
    });

    hideBundleBalanceBtn.addEventListener("click", function () {
      bundleBalanceHidden.style.display = "flex";
      bundleBalanceVisible.style.display = "none";
    });
  }

  // Create Bundle Detail Popup
  const createBundleDetailPopup = () => {
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "bundle-popup-overlay";

    const popupContent = document.createElement("div");
    popupContent.className = "bundle-popup-content";

    // Header
    const popupHeader = document.createElement("div");
    popupHeader.className = "bundle-popup-header";
    popupHeader.innerHTML = `
            <div class="popup-title">ব্যান্ডেলের বিস্তারিত</div>
            <button class="popup-close-btn">&times;</button>
        `;

    // Details
    const bundleDetails = document.createElement("div");
    bundleDetails.className = "bundle-popup-details";

    // Buy Now Button
    const buyButton = document.createElement("button");
    buyButton.className = "bundle-buy-btn";
    buyButton.textContent = "এখনই কিনুন";

    // Assemble popup
    popupContent.appendChild(popupHeader);
    popupContent.appendChild(bundleDetails);
    popupContent.appendChild(buyButton);
    popupOverlay.appendChild(popupContent);

    document.body.appendChild(popupOverlay);

    // Close functionality
    const closeBtn = popupOverlay.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", () => {
      popupOverlay.classList.remove("active");
      setTimeout(() => {
        popupOverlay.remove();
      }, 300);
    });

    return { popupOverlay, bundleDetails, buyButton };
  };

  // Create Pin Entry Popup
  const createPinEntryPopup = (
    bundleName,
    bundlePrice,
    bundleValidity,
    bundleSavings
  ) => {
    const pinOverlay = document.createElement("div");
    pinOverlay.className = "pin-popup-overlay centered-popup";

    const pinContent = document.createElement("div");
    pinContent.className = "pin-popup-content centered-content";

    // bKash Header
    const bkashHeader = document.createElement("div");
    bkashHeader.className = "bkash-app-header";
    bkashHeader.innerHTML = `
      <div class="bkash-header-left">
          <div class="bkash-logo-circle">
              <i class="fas fa-mobile-alt"></i>
          </div>
          <span class="bkash-header-title">মোবাইল রিচার্জ</span>
      </div>
      
    `;

    // Purchase info header
    const purchaseHeader = document.createElement("div");
    purchaseHeader.className = "simple-purchase-header";

    // Extract savings value (remove "বাঁচবে" prefix)
    const savingsValue = bundleSavings.replace("বাঁচবে ", "");

    purchaseHeader.innerHTML = `
      <div class="purchase-title">বান্ডেল কেনা</div>
      <div class="bundle-name">${bundleName}</div>
      <div class="bundle-price">${bundlePrice}</div>
      <div class="bundle-validity">মেয়াদঃ ${bundleValidity} | সাশ্রয়ঃ ${savingsValue}</div>
    `;

    // PIN Entry Container
    const pinEntryContainer = document.createElement("div");
    pinEntryContainer.className = "simple-pin-container";

    pinEntryContainer.innerHTML = `
      <div class="pin-title">পিন নাম্বার টাইপ</div>
      <div class="pin-instruction">আপনার বিকাশ পিন এন্টার করুন</div>
      <div class="simple-pin-digits">
          <input type="password" class="simple-pin-digit" maxlength="1" inputmode="numeric">
          <input type="password" class="simple-pin-digit" maxlength="1" inputmode="numeric">
          <input type="password" class="simple-pin-digit" maxlength="1" inputmode="numeric">
          <input type="password" class="simple-pin-digit" maxlength="1" inputmode="numeric">
          <input type="password" class="simple-pin-digit" maxlength="1" inputmode="numeric">
      </div>
      <div class="pin-forgot">
          <a href="#">পিন ভুলে গেছেন?</a>
      </div>
      <div class="pin-action-buttons">
          <button class="pin-cancel-button">বাতিল</button>
          <button class="pin-confirm-button" disabled>নিশ্চিত</button>
      </div>
    `;

    // Assemble popup
    pinContent.appendChild(bkashHeader);
    pinContent.appendChild(purchaseHeader);
    pinContent.appendChild(pinEntryContainer);
    pinOverlay.appendChild(pinContent);

    document.body.appendChild(pinOverlay);

    // Setup close functionality
    const cancelBtn = pinOverlay.querySelector(".pin-cancel-button");
    cancelBtn.addEventListener("click", () => {
      pinOverlay.classList.remove("active");
      setTimeout(() => {
        pinOverlay.remove();
      }, 300);
    });

    // Setup PIN digit fields
    const pinDigits = pinOverlay.querySelectorAll(".simple-pin-digit");
    const confirmBtn = pinOverlay.querySelector(".pin-confirm-button");

    pinDigits.forEach((digit, index) => {
      // Auto-focus next input after entering a digit
      digit.addEventListener("input", () => {
        if (digit.value.length === 1) {
          // Add active class to show focus
          digit.classList.add("filled");

          if (index < pinDigits.length - 1) {
            pinDigits[index + 1].focus();
          } else {
            // Last digit entered, focus the confirm button
            confirmBtn.focus();
          }
        } else {
          digit.classList.remove("filled");
        }

        // Enable confirm button if all digits are filled
        let isComplete = true;
        pinDigits.forEach((d) => {
          if (d.value.length === 0) isComplete = false;
        });

        confirmBtn.disabled = !isComplete;
        if (isComplete) {
          confirmBtn.classList.add("active");
        } else {
          confirmBtn.classList.remove("active");
        }
      });

      // Handle backspace key
      digit.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && digit.value.length === 0 && index > 0) {
          pinDigits[index - 1].focus();
        }
      });

      // Handle focus styles
      digit.addEventListener("focus", () => {
        digit.classList.add("focused");
      });

      digit.addEventListener("blur", () => {
        digit.classList.remove("focused");
      });
    });

    // Handle confirm button
    confirmBtn.addEventListener("click", () => {
      if (confirmBtn.disabled) return;

      // Create transaction ID
      const txnId = "TXN" + Math.floor(Math.random() * 10000000000);
      const currentTime = new Date();
      const timeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = currentTime.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Show success message
      showSuccessMessage(pinOverlay, {
        bundleName,
        bundlePrice,
        bundleValidity,
        bundleSavings: savingsValue,
        txnId,
        time: timeString,
        date: dateString,
      });
    });

    // Focus first digit on popup open
    setTimeout(() => {
      pinDigits[0].focus();
    }, 300);

    return pinOverlay;
  };

  // Success Message
  const showSuccessMessage = (pinOverlay, details) => {
    const pinContent = pinOverlay.querySelector(".pin-popup-content");

    pinContent.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-title">সফল!</div>
                <div class="success-amount">${details.bundlePrice}</div>
                
                <div class="success-details">
                    <div class="success-detail-row">
                        <div class="detail-label">বান্ডেল</div>
                        <div class="detail-value">${details.bundleName}</div>
                    </div>
                    <div class="success-detail-row">
                        <div class="detail-label">মেয়াদ</div>
                        <div class="detail-value">${details.bundleValidity}</div>
                    </div>
                    <div class="success-detail-row">
                        <div class="detail-label">সাশ্রয়</div>
                        <div class="detail-value">${details.bundleSavings}</div>
                    </div>
                    <div class="success-detail-row">
                        <div class="detail-label">তারিখ ও সময়</div>
                        <div class="detail-value">${details.date}, ${details.time}</div>
                    </div>
                    <div class="success-detail-row">
                        <div class="detail-label">ট্রানজ্যাকশন আইডি</div>
                        <div class="detail-value">${details.txnId}</div>
                    </div>
                </div>
                
                <button class="success-close-btn">ঠিক আছে</button>
            </div>
        `;

    const closeBtn = pinContent.querySelector(".success-close-btn");
    closeBtn.addEventListener("click", () => {
      pinOverlay.classList.remove("active");
      setTimeout(() => {
        pinOverlay.remove();
      }, 300);
    });
  };

  // Show/Hide Bundles Functionality
  const bundleOptionsList = document.querySelector(".bundle-options-list");
  const bundleOptions = document.querySelectorAll(".bundle-option");

  // Initially hide all but the first 2 bundles
  if (bundleOptions.length > 2) {
    for (let i = 2; i < bundleOptions.length; i++) {
      bundleOptions[i].style.display = "none";
    }

    // Create "See More" button
    const seeMoreBtn = document.createElement("div");
    seeMoreBtn.className = "see-more-btn";
    seeMoreBtn.innerHTML =
      '<span>See More</span><i class="fas fa-chevron-down"></i>';
    bundleOptionsList.appendChild(seeMoreBtn);

    // Toggle visibility on click
    seeMoreBtn.addEventListener("click", function () {
      const isExpanded = this.classList.contains("expanded");

      if (!isExpanded) {
        // Show all bundles
        for (let i = 2; i < bundleOptions.length; i++) {
          bundleOptions[i].style.display = "";
          bundleOptions[i].classList.add("fade-in");
        }
        this.classList.add("expanded");
        this.innerHTML =
          '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
      } else {
        // Hide bundles after index 1
        for (let i = 2; i < bundleOptions.length; i++) {
          bundleOptions[i].style.display = "none";
          bundleOptions[i].classList.remove("fade-in");
        }
        this.classList.remove("expanded");
        this.innerHTML =
          '<span>See More</span><i class="fas fa-chevron-down"></i>';
      }
    });
  }

  // Bundle Option Click Events
  const bundleDetailsOptions = document.querySelectorAll(".bundle-details");
  bundleDetailsOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Get the bundle data
      const bundleName = this.querySelector(".bundle-name").textContent;
      const bundlePrice = this.querySelector(".bundle-price span").textContent;
      const bundleValidity = this.querySelector(".bundle-validity").textContent;
      const bundleSavings = this.querySelector(
        ".savings-badge span"
      ).textContent;
      const bundleIcon = this.closest(".bundle-option")
        .querySelector(".bundle-icon-container")
        .cloneNode(true);

      // Create popup with details
      const { popupOverlay, bundleDetails, buyButton } =
        createBundleDetailPopup();

      // Fill in bundle details
      bundleDetails.innerHTML = `
                <div class="bundle-popup-item">
                    <div class="bundle-popup-icon">${bundleIcon.outerHTML}</div>
                    <div class="bundle-popup-info">
                        <div class="popup-bundle-name">${bundleName}</div>
                        <div class="popup-bundle-validity">${bundleValidity}</div>
                        <div class="popup-bundle-price">${bundlePrice}</div>
                    </div>
                </div>
                <div class="bundle-popup-description">
                    <h4>বান্ডেলে আছে</h4>
                    <div class="popup-bundle-feature">
                        <i class="fas fa-check-circle"></i>
                        <span>${bundleName} চার্জ ফ্রি</span>
                    </div>
                    <div class="popup-bundle-saving">
                        <i class="fas fa-tag"></i>
                        <span>${bundleSavings}</span>
                    </div>
                    <div class="popup-bundle-terms">
                        <p>* বান্ডেল কেনার ${bundleValidity} পর্যন্ত কার্যকর থাকবে</p>
                    </div>
                </div>
            `;

      // Show popup with animation
      setTimeout(() => {
        popupOverlay.classList.add("active");
      }, 10);

      // Buy button functionality - show PIN entry
      buyButton.addEventListener("click", () => {
        popupOverlay.remove();

        // Create and show PIN entry popup with bundle details
        const pinPopup = createPinEntryPopup(
          bundleName,
          bundlePrice,
          bundleValidity,
          bundleSavings
        );
        setTimeout(() => {
          pinPopup.classList.add("active");
        }, 10);
      });
    });
  });

  // Alternative Option Click Events
  const altOptions = document.querySelectorAll(".bundle-alt-option");
  altOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Get the bundle name
      const bundleName = this.querySelector(".alt-option-text").textContent;

      // Find corresponding main bundle data
      const parentBundle = this.closest(".bundle-option");
      const bundleDetails = parentBundle.querySelector(".bundle-details");

      // Trigger click on the main bundle details
      if (bundleDetails) {
        bundleDetails.click();
      }
    });
  });

  // Add styles for popups and other UI elements
  const styleElement = document.createElement("style");
  styleElement.textContent = `
        /* Bundle Popup Styles */
        .bundle-popup-overlay, .pin-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .bundle-popup-overlay {
            align-items: flex-end;
            justify-content: center;
        }
        
        .pin-popup-overlay.centered-popup {
            align-items: center;
            justify-content: center;
        }
        
        .bundle-popup-overlay.active, .pin-popup-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .bundle-popup-content {
            width: 100%;
            max-width: 500px;
            background-color: white;
            border-radius: 16px 16px 0 0;
            overflow: hidden;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }
        
        .pin-popup-content.centered-content {
            width: 90%;
            max-width: 400px;
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            transform: scale(0.9);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .bundle-popup-overlay.active .bundle-popup-content {
            transform: translateY(0);
        }
        
        .pin-popup-overlay.active .pin-popup-content.centered-content {
            transform: scale(1);
            opacity: 1;
        }
        
        .bundle-popup-header, .pin-popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .popup-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        
        .popup-close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
        }
        
        .bundle-popup-details {
            padding: 20px;
        }
        
        .bundle-popup-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .bundle-popup-icon {
            margin-right: 15px;
        }
        
        .popup-bundle-name {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        
        .popup-bundle-validity, .popup-bundle-price {
            font-size: 14px;
            color: #666;
            margin-bottom: 3px;
        }
        
        .popup-bundle-price {
            font-weight: 600;
            color: #e2146c;
        }
        
        .bundle-popup-description {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
        }
        
        .bundle-popup-description h4 {
            font-size: 15px;
            margin-bottom: 10px;
            color: #333;
        }
        
        .popup-bundle-feature, .popup-bundle-saving {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .popup-bundle-feature i, .popup-bundle-saving i {
            color: #4caf50;
            margin-right: 8px;
            font-size: 14px;
        }
        
        .popup-bundle-saving i {
            color: #e2146c;
        }
        
        .popup-bundle-terms {
            margin-top: 10px;
            font-size: 12px;
            color: #999;
        }
        
        .bundle-buy-btn {
            display: block;
            width: calc(100% - 40px);
            margin: 0 20px 20px;
            padding: 15px;
            background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(226, 20, 108, 0.2);
        }
        
        .bundle-buy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(226, 20, 108, 0.3);
        }
        
        /* Modern PIN Entry Styles */
        .pin-popup-content.centered-content {
            width: 90%;
            max-width: 400px;
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            transform: scale(0.9);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .pin-purchase-header {
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            text-align: center;
        }
        
        .purchase-title {
            font-size: 16px;
            color: #555;
            margin-bottom: 8px;
        }
        
        .bundle-name {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        
        .bundle-price {
            font-size: 24px;
            font-weight: 700;
            color: #e2146c;
            margin-bottom: 5px;
        }
        
        .bundle-validity {
            font-size: 13px;
            color: #777;
        }
        
        .modern-pin-container {
            padding: 20px;
        }
        
        .pin-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            text-align: center;
            margin-bottom: 15px;
        }
        
        .pin-instruction {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .modern-pin-digits {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .modern-pin-digit {
            width: 50px;
            height: 50px;
            border: 1.5px solid #ddd;
            border-radius: 8px;
            font-size: 22px;
            text-align: center;
            outline: none;
            -webkit-text-security: disc;
            background-color: white;
            transition: all 0.2s ease;
        }
        
        .modern-pin-digit.focused {
            border-color: #e2146c;
            box-shadow: 0 0 0 2px rgba(226, 20, 108, 0.1);
        }
        
        .modern-pin-digit.filled {
            border-color: #e2146c;
            background-color: rgba(226, 20, 108, 0.05);
        }
        
        .pin-forgot {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .pin-forgot a {
            color: #e2146c;
            font-size: 14px;
            text-decoration: none;
        }
        
        .pin-action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .pin-cancel-button, .pin-confirm-button {
            flex: 1;
            padding: 15px 0;
            font-size: 16px;
            font-weight: 500;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .pin-cancel-button {
            background-color: #f5f5f5;
            color: #555;
        }
        
        .pin-cancel-button:hover {
            background-color: #eee;
        }
        
        .pin-confirm-button {
            background-color: #f0f0f0;
            color: #aaa;
            cursor: not-allowed;
        }
        
        .pin-confirm-button.active {
            background-color: #e2146c;
            color: white;
            cursor: pointer;
        }
        
        .pin-confirm-button.active:hover {
            background-color: #d01361;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(226, 20, 108, 0.2);
        }
        
        /* User info section styles */
        .user-recharge-info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            background-color: white;
        }
        
        .back-button {
            width: 36px;
            height: 36px;
            background-color: #f5f5f5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-right: 15px;
        }
        
        .back-button i {
            color: #666;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            flex: 1;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            background-color: #2196F3;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            margin-right: 10px;
        }
        
        .user-details {
            flex: 1;
        }
        
        .user-name {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        
        .user-number {
            font-size: 14px;
            color: #666;
        }
        
        .contact-btn {
            background-color: #e2146c;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .bundle-purchase-info {
            flex: 1;
        }
        
        .bundle-name {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }
        
        .bundle-amount {
            font-size: 14px;
            color: #666;
        }
        
        /* PIN Entry section styles */
        .pin-entry-section {
            padding: 20px;
            background-color: #f9f9f9;
        }
        
        .amount-section {
            background-color: white;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .amount-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .amount-input-field {
            font-size: 20px;
            font-weight: 600;
            color: #e2146c;
        }
        
        .pin-instruction {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
        }
        
        .pin-digits {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 25px;
        }
        
        .pin-digit {
            width: 55px;
            height: 55px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            font-size: 20px;
            text-align: center;
            outline: none;
            -webkit-text-security: disc;
            background-color: white;
        }
        
        .confirm-btn {
            width: 100%;
            padding: 15px;
            background-color: #f0f0f0;
            color: #999;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 500;
            cursor: not-allowed;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .confirm-btn:not(:disabled) {
            background-color: #e2146c;
            color: white;
            cursor: pointer;
        }
        
        .pin-digit {
            width: 45px;
            height: 55px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 20px;
            text-align: center;
            outline: none;
            -webkit-text-security: disc;
        }
        
        .pin-digit:focus {
            border-color: #e2146c;
            box-shadow: 0 3px 10px rgba(226, 20, 108, 0.1);
        }
        
        .forgot-pin {
            margin-bottom: 25px;
        }
        
        .forgot-pin a {
            color: #e2146c;
            font-size: 14px;
            text-decoration: none;
        }
        
        .pin-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .pin-cancel-btn {
            flex: 1;
            padding: 15px;
            background-color: #f0f0f0;
            color: #666;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .pin-cancel-btn:hover {
            background-color: #e0e0e0;
        }
        
        .pin-confirm-btn {
            flex: 1;
            padding: 15px;
            background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .pin-confirm-btn:hover:not(:disabled) {
            box-shadow: 0 4px 10px rgba(226, 20, 108, 0.2);
            transform: translateY(-2px);
        }
        
        .pin-confirm-btn:disabled {
            background: #f0f0f0;
            color: #aaa;
            cursor: not-allowed;
        }
        
        /* Success Message Styles */
        .success-message {
            padding: 30px 20px;
            text-align: center;
        }
        
        .success-icon {
            margin: 0 auto 20px;
            width: 70px;
            height: 70px;
            background-color: rgba(76, 175, 80, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .success-icon i {
            color: #4caf50;
            font-size: 40px;
        }
        
        .success-title {
            font-size: 22px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }
        
        .success-amount {
            font-size: 26px;
            font-weight: 700;
            color: #e2146c;
            margin-bottom: 20px;
        }
        
        .success-details {
            background-color: #f9f9f9;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 25px;
            text-align: left;
            border: 1px solid #f0f0f0;
        }
        
        .success-detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .success-detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            color: #666;
            font-size: 14px;
        }
        
        .detail-value {
            color: #333;
            font-size: 14px;
            font-weight: 500;
            word-break: break-word;
            text-align: right;
            max-width: 60%;
        }
        
        .success-close-btn {
            padding: 14px 50px;
            background-color: #e2146c;
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(226, 20, 108, 0.2);
        }
        
        .success-close-btn:hover {
            background-color: #c4115c;
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(226, 20, 108, 0.3);
        }
        
        /* Other Button Styles */
        .highlight-effect {
            background-color: rgba(226, 20, 108, 0.05) !important;
            transition: background-color 0.3s ease;
        }
        
        .see-more-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
            margin: 10px 0;
            background-color: #f9f9f9;
            border-radius: 12px;
            cursor: pointer;
            color: #e2146c;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .see-more-btn span {
            margin-right: 5px;
        }
        
        .see-more-btn:hover {
            background-color: #f0f0f0;
        }
        
        .fade-in {
            animation: fadeInAnimation 0.5s ease forwards;
        }
        
        @keyframes fadeInAnimation {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* bKash App Header Styles */
        .bkash-app-header {
          background-color: #e2146c;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          color: white;
          border-radius: 12px 12px 0 0;
        }
        
        .bkash-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .bkash-logo-circle {
          width: 32px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bkash-logo-circle i {
          font-size: 16px;
        }
        
        .bkash-header-title {
          font-size: 18px;
          font-weight: 500;
        }
        
        .bkash-header-right {
          display: flex;
          align-items: center;
        }
        
        .bkash-dots {
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 6px 12px;
          position: relative;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
          margin: 0 2px;
        }
        
        .eye-icon-container {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          position: relative;
          border-radius: 50%;
          background-color: #333;
          border: 1px solid white;
        }
        
        .eye-icon-container i {
          font-size: 10px;
          color: white;
        }
        
        /* Simple PIN Entry Styles */
        .simple-purchase-header {
          padding: 15px;
          border-bottom: 1px solid #f0f0f0;
          text-align: center;
        }
        
        .simple-pin-container {
          padding: 20px;
        }
        
        .simple-pin-digits {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .simple-pin-digit {
          width: 45px;
          height: 45px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 18px;
          text-align: center;
          outline: none;
          -webkit-text-security: disc;
          background-color: white;
          transition: all 0.2s ease;
        }
    `;
  document.head.appendChild(styleElement);

  // Ripple effect for buttons
  const rippleButtons = document.querySelectorAll(".ripple");

  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple effect style
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .ripple {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            animation: ripple-animation 0.6s ease-out;
            opacity: 0;
        }
        
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);
});
