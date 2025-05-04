// Insurance Payment Flow - Part 1: Main Setup & Institution Selection
document.addEventListener("DOMContentLoaded", function () {
  // Main configuration
  const config = {
    animationSpeed: 300,
    popupZIndex: 1000,
    currentStep: 0,
    policyNumber: "",
    selectedInstitution: "",
    policyType: "self", // 'self' or 'other'
    mobileNumber: "",
    amount: "",
    pin: "",
  };

  // Insurance institutions data
  const insuranceInstitutions = [
    {
      id: "delta-life",
      name: "Delta Life",
      logo: "images/delta-life-logo.png",
    },
    {
      id: "guardian-life",
      name: "Guardian Life",
      logo: "images/guardian-life-logo.png",
    },
    {
      id: "nrb-islamic",
      name: "NRB Islamic",
      logo: "images/nrb-islamic-logo.png",
    },
    {
      id: "akij-takaful",
      name: "Akij Takaful",
      logo: "images/akij-takaful-logo.png",
    },
    {
      id: "jamuna-life",
      name: "Jamuna Life",
      logo: "images/jamuna-life-logo.png",
    },
  ];

  // Initialize the flow by setting up event listeners
  initializeFlow();

  function initializeFlow() {
    // Attach click event to the premium payment menu item
    const premiumPaymentMenuItem = document.querySelector(
      ".insurance-menu-list .menu-item:first-child"
    );
    if (premiumPaymentMenuItem) {
      premiumPaymentMenuItem.addEventListener(
        "click",
        showInstitutionSelectionPage
      );
    }

    // Initialize back button functionality
    setupBackButtonListener();
  }

  function setupBackButtonListener() {
    // Global back button handler
    document.addEventListener("click", function (e) {
      if (e.target.closest(".back-button")) {
        handleBackButtonClick();
      }
    });
  }

  function handleBackButtonClick() {
  // Find current popup
  const currentPopup = document.querySelector(".insurance-popup") || document.querySelector(".faq-popup");
  if (!currentPopup) return;
  
  // Handle back button functionality based on current step
  if (config.currentStep > 0) {
    // Save current step before decrementing
    const previousStep = config.currentStep;
    config.currentStep--;

    // Remove current popup
    fadeOutAndRemove(currentPopup);

    // Show previous popup based on step
    setTimeout(() => {
      switch (config.currentStep) {
        case 0:
          // Back to main insurance menu - no need to show new popup
          break;
        case 1:
          showInstitutionSelectionPage();
          break;
        case 2:
          showPolicyNumberInputPage();
          break;
        case 3:
          showPolicyDetailsPage();
          break;
        case 4:
          showAmountInputPage();
          break;
        default:
          // If something went wrong, reset to main page
          config.currentStep = 0;
          break;
      }
    }, 300); // Wait for fade out animation to complete
  } else if (config.currentFaqIndex >= 0) {
    // We're in FAQ details, go back to FAQ list
    config.currentFaqIndex = -1;
    fadeOutAndRemove(currentPopup);
    setTimeout(() => {
      showFaqMainPage();
    }, 300);
  } else {
    // If we're at the main level of a popup, just close it
    fadeOutAndRemove(currentPopup);
  }
}

  // Utility function to create and show popups
  function createPopup(content) {
    const popup = document.createElement("div");
    popup.className = "insurance-popup";

    // Position exactly like the main container
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(0.95)";
    popup.style.width = "100%";
    popup.style.maxWidth = "500px";
    popup.style.height = "80vh";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.zIndex = "901";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    popup.innerHTML = content;
    document.body.appendChild(popup);

    // Get main container to apply blur
    const mainContainer = document.querySelector(
      ".insurance-service-container"
    );

    // Trigger reflow to ensure transition works
    popup.offsetHeight;
    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, -50%) scale(1)";

    // Add blur to main container
    if (mainContainer) {
      mainContainer.classList.add("blur");
      // Hide the main container from screen readers when popup is active
      mainContainer.setAttribute("aria-hidden", "true");
    }

    // Handle mobile view
    if (window.innerWidth <= 500) {
      popup.style.height = "100vh";
      popup.style.maxHeight = "100vh";
      popup.style.width = "100%";
      popup.style.borderRadius = "0";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.transform = "scale(0.95)";

      // Special animation for mobile
      setTimeout(() => {
        popup.style.transform = "scale(1)";
      }, 10);
    }

    return popup;
  }

  function fadeOutAndRemove(element) {
    element.style.opacity = "0";
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, config.animationSpeed);
  }

  // Step 1: Show institution selection page
  function showInstitutionSelectionPage() {
    config.currentStep = 1;

    let institutionsHTML = "";
    insuranceInstitutions.forEach((institution) => {
      institutionsHTML += `
        <div class="institution-item" data-id="${institution.id}">
          <div class="institution-logo">
            <img src="${institution.logo}" alt="${institution.name}" onerror="this.src='https://via.placeholder.com/50'">
          </div>
          <div class="institution-name">${institution.name}</div>
        </div>
      `;
    });

    const popupContent = `
      <div class="form-header-gradient">
        <div class="header-content">
          <div class="back-button">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="header-title">
            <h3>ইন্সুরেন্স প্রতিষ্ঠান নির্বাচন করুন</h3>
          </div>
        </div>
      </div>
      <div class="popup-content insurance-institutions">
        <form id="institutionSelectionForm">
          ${institutionsHTML}
        </form>
      </div>
    `;

    const popup = createPopup(popupContent);

    // Add event listeners to institution items
    const institutionItems = popup.querySelectorAll(".institution-item");
    institutionItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const institutionId = item.getAttribute("data-id");
        const institution = insuranceInstitutions.find(
          (inst) => inst.id === institutionId
        );
        if (institution) {
          config.selectedInstitution = institution;
          fadeOutAndRemove(popup);
          showPolicyNumberInputPage();
        }
      });
    });

    // Style the institutions list
    const style = document.createElement("style");
    style.textContent = `
      .insurance-popup {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .form-header-gradient {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        padding: 0;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
        height: 80px;
        min-height: 80px;
        max-height: 80px;
      }
      .form-header-gradient::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.15), transparent 70%);
      }
      .header-content {
        position: relative;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
      }
      .back-button {
        width: 36px;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .back-button i {
        color: white;
        font-size: 18px;
      }
      .header-title {
        flex: 1;
        text-align: center;
      }
      .header-title h3 {
        font-size: 20px;
        font-weight: 600;
        color: white;
        margin: 0;
        letter-spacing: 0.5px;
      }
      .popup-content {
        padding: 20px;
        max-height: 70vh;
        overflow-y: auto;
      }
      .insurance-institutions {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .institution-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: all 0.3s;
        border: 1px solid #eee;
      }
      .institution-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        border-color: #e2146c;
      }
      .institution-item:active {
        transform: translateY(0);
        background-color: #fafafa;
      }
      .institution-logo {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        overflow: hidden;
        border-radius: 50%;
        background-color: #f8f9fa;
      }
      .institution-logo img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .institution-name {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
    `;
    document.head.appendChild(style);
  }

  // Insurance Payment Flow - Part 2: Policy Input & Details
  // This part continues from Part 1 and handles the policy number input page and policy details

  function showPolicyNumberInputPage() {
    config.currentStep = 2;

    const institution = config.selectedInstitution;

    const popupContent = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="back-button">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="header-title">
          <h3>পলিসি নম্বর</h3>
        </div>
      </div>
    </div>
    <div class="popup-content policy-input-container">
      <form id="policyNumberForm">
        <div class="recipient-info">
          <div class="recipient-label">প্রাপক</div>
          <div class="recipient-details">
            <div class="recipient-logo">
              <img src="${institution.logo}" alt="${institution.name}" onerror="this.src='https://via.placeholder.com/40'">
            </div>
            <div class="recipient-name">${institution.name}</div>
          </div>
        </div>
        
        <div class="policy-number-container">
          <div class="policy-label">পলিসি নাম্বার</div>
          <div class="policy-input-field">
            <input type="text" id="policyNumberInput" placeholder="পলিসি নাম্বার দিন" maxlength="13" required>
          </div>
        </div>
        
        <div class="policy-type-selector">
          <div class="policy-type-label">
            <input type="radio" id="selfPolicy" name="policyType" value="self" checked>
            <label for="selfPolicy">আমার পলিসি</label>
          </div>
          <div class="policy-type-label">
            <input type="radio" id="otherPolicy" name="policyType" value="other">
            <label for="otherPolicy">অন্যের পলিসি</label>
          </div>
        </div>
        
        <div id="mobileNumberContainer" class="mobile-number-container">
          <div class="mobile-label">পলিসি হোল্ডারের মোবাইল নাম্বার</div>
          <div class="mobile-input-field" id="mobileInputField">
            <input type="tel" id="mobileNumberInput" placeholder="মোবাইল নাম্বার দিন" maxlength="11">
          </div>
        </div>
        
        <div class="next-button-container">
          <button type="submit" id="nextButton" class="next-button" disabled>এগিয়ে যান</button>
        </div>
      </form>
    </div>
  `;

    const popup = createPopup(popupContent);

    // Add event listeners
    const policyForm = popup.querySelector("#policyNumberForm");
    const policyNumberInput = popup.querySelector("#policyNumberInput");
    const selfPolicyRadio = popup.querySelector("#selfPolicy");
    const otherPolicyRadio = popup.querySelector("#otherPolicy");
    const mobileNumberContainer = popup.querySelector("#mobileNumberContainer");
    const mobileNumberInput = popup.querySelector("#mobileNumberInput");
    const nextButton = popup.querySelector("#nextButton");

    // Initially hide mobile number input if self policy is selected
    mobileNumberContainer.style.display = "none";

    // Policy type selection event
    selfPolicyRadio.addEventListener("change", function () {
      if (this.checked) {
        mobileNumberContainer.style.display = "none";
        config.policyType = "self";
        validateForm();
      }
    });

    otherPolicyRadio.addEventListener("change", function () {
      if (this.checked) {
        mobileNumberContainer.style.display = "block";
        config.policyType = "other";
        validateForm();
      }
    });

    // Input validation events
    policyNumberInput.addEventListener("input", validateForm);
    mobileNumberInput.addEventListener("input", validateForm);

    // Form validation function
    function validateForm() {
      const policyNumber = policyNumberInput.value.trim();
      const isPolicyValid = policyNumber.length === 13;

      let isMobileValid = true;
      if (otherPolicyRadio.checked) {
        const mobileNumber = mobileNumberInput.value.trim();
        isMobileValid =
          mobileNumber.length === 11 && /^01[0-9]{9}$/.test(mobileNumber);
      }

      nextButton.disabled = !(isPolicyValid && isMobileValid);
    }

    // Form submission
    policyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      config.policyNumber = policyNumberInput.value.trim();

      if (config.policyType === "other") {
        config.mobileNumber = mobileNumberInput.value.trim();
      } else {
        config.mobileNumber = "01616122600"; // Default number for self policy
      }

      fadeOutAndRemove(popup);
      showPolicyDetailsPage();
    });

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
    .policy-input-container {
      padding: 20px;
    }
    .recipient-info {
      margin-bottom: 20px;
    }
    .recipient-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .recipient-details {
      display: flex;
      align-items: center;
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 8px;
    }
    .recipient-logo {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
      background-color: white;
    }
    .recipient-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .recipient-name {
      font-size: 16px;
      font-weight: 500;
    }
    .policy-number-container, .mobile-number-container {
      margin-bottom: 20px;
    }
    .policy-label, .mobile-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .policy-input-field, .mobile-input-field {
      position: relative;
    }
    .policy-input-field input, .mobile-input-field input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s;
    }
    .policy-input-field input:focus, .mobile-input-field input:focus {
      border-color: #e2146c;
    }
    .policy-type-selector {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .policy-type-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .policy-type-label input[type="radio"] {
      margin-right: 8px;
      accent-color: #e2146c;
    }
    .next-button-container {
      margin-top: 30px;
    }
    .next-button {
      width: 100%;
      padding: 14px;
      background-color: #e2146c;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .next-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .next-button:not(:disabled):hover {
      background-color: #c01159;
    }
  `;
    document.head.appendChild(style);
  }

  function showPolicyDetailsPage() {
    config.currentStep = 3;

    // Mock policy details (in a real scenario, this would come from an API)
    const policyDetails = {
      policyNumber: config.policyNumber,
      policyHolder: "মোঃ আসাদুজ্জামান",
      policyType: "জীবন বীমা",
      dueDate: "২৫ এপ্রিল, ২০২৫",
      dueAmount: "2,500",
    };

    const popupContent = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="back-button">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="header-title">
          <h3>পলিসি বিবরণ</h3>
        </div>
      </div>
    </div>
    <div class="popup-content policy-details-container">
      <form id="policyDetailsForm">
        <div class="policy-detail-card">
          <div class="policy-detail-item">
            <div class="detail-label">পলিসি নম্বর</div>
            <div class="detail-value">${policyDetails.policyNumber}</div>
          </div>
          
          <div class="policy-detail-item">
            <div class="detail-label">পলিসি হোল্ডার</div>
            <div class="detail-value">${policyDetails.policyHolder}</div>
          </div>
          
          <div class="policy-detail-item">
            <div class="detail-label">পলিসি ধরন</div>
            <div class="detail-value">${policyDetails.policyType}</div>
          </div>
          
          <div class="policy-detail-item">
            <div class="detail-label">ডিউ ডেট</div>
            <div class="detail-value">${policyDetails.dueDate}</div>
          </div>
          
          <div class="policy-detail-item">
            <div class="detail-label">বকেয়া পরিমাণ</div>
            <div class="detail-value amount-highlight">৳ ${policyDetails.dueAmount}</div>
          </div>
        </div>
        
        <div class="next-button-container">
          <button type="submit" id="payButton" class="next-button">প্রিমিয়াম পরিশোধ করুন</button>
        </div>
      </form>
    </div>
  `;

    const popup = createPopup(popupContent);

    // Add event listener to pay button
    const policyDetailsForm = popup.querySelector("#policyDetailsForm");
    policyDetailsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      fadeOutAndRemove(popup);
      showAmountInputPage(policyDetails.dueAmount);
    });

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
    .policy-details-container {
      padding: 20px;
    }
    .policy-detail-card {
      background-color: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
    }
    .policy-detail-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
    .policy-detail-item:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
      font-size: 14px;
    }
    .detail-value {
      font-weight: 500;
      font-size: 16px;
    }
    .amount-highlight {
      color: #e2146c;
      font-weight: 600;
      font-size: 18px;
    }
  `;
    document.head.appendChild(style);
  }

  // Insurance Payment Flow - Part 3: Amount Input & PIN Verification
  // This part continues from Part 2 and handles the amount input and PIN verification pages

  function showAmountInputPage(suggestedAmount) {
    config.currentStep = 4;

    const institution = config.selectedInstitution;

    const popupContent = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="back-button">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="header-title">
          <h3>প্রিমিয়াম পরিমাণ</h3>
        </div>
      </div>
    </div>
    <div class="popup-content amount-input-container">
      <form id="amountInputForm">
        <div class="recipient-info">
          <div class="recipient-label">প্রাপক</div>
          <div class="recipient-details">
            <div class="recipient-logo">
              <img src="${institution.logo}" alt="${
      institution.name
    }" onerror="this.src='https://via.placeholder.com/40'">
            </div>
            <div class="recipient-name">${institution.name}</div>
          </div>
        </div>
        
        <div class="policy-summary">
          <div class="summary-item">
            <div class="summary-label">পলিসি নম্বর</div>
            <div class="summary-value">${config.policyNumber}</div>
          </div>
        </div>
        
        <div class="amount-container">
          <div class="amount-label">টাকার পরিমাণ</div>
          <div class="amount-input-field">
            <span class="currency-symbol">৳</span>
            <input type="text" id="amountInput" placeholder="0" value="${suggestedAmount.replace(
              /,/g,
              ""
            )}">
          </div>
          <div class="amount-hint">সর্বনিম্ন ৫০ টাকা</div>
        </div>
        
        <div class="next-button-container">
          <button type="submit" id="confirmAmountButton" class="next-button">নিশ্চিত করুন</button>
        </div>
      </form>
    </div>
  `;

    const popup = createPopup(popupContent);

    // Add event listeners
    const amountForm = popup.querySelector("#amountInputForm");
    const amountInput = popup.querySelector("#amountInput");
    const amountHint = popup.querySelector(".amount-hint");

    // Format amount as user types
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      let value = this.value.replace(/[^0-9]/g, "");

      // Reset error message
      amountHint.style.color = "#666";
      amountHint.textContent = "সর্বনিম্ন ৫০ টাকা";

      this.value = value;
    });

    // Form submission
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = amountInput.value.trim();

      if (amount && parseInt(amount) >= 50) {
        config.amount = amount;
        fadeOutAndRemove(popup);
        showPinEntryPage();
      } else {
        // Show error
        amountHint.style.color = "red";
        amountHint.textContent = "সর্বনিম্ন ৫০ টাকা প্রয়োজন";

        // Shake effect on input field
        const amountInputField = popup.querySelector(".amount-input-field");
        amountInputField.classList.add("shake-animation");
        setTimeout(() => {
          amountInputField.classList.remove("shake-animation");
        }, 500);
      }
    });

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
    .amount-input-container {
      padding: 20px;
    }
    .policy-summary {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
    }
    .summary-label {
      color: #666;
      font-size: 14px;
    }
    .summary-value {
      font-weight: 500;
    }
    .amount-container {
      margin: 20px 0;
    }
    .amount-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .amount-input-field {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .currency-symbol {
      padding: 0 15px;
      font-size: 18px;
      color: #666;
      background-color: #f8f9fa;
      border-right: 1px solid #ddd;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .amount-input-field input {
      flex: 1;
      padding: 12px 15px;
      border: none;
      font-size: 18px;
      outline: none;
      text-align: right;
    }
    .amount-hint {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      text-align: right;
    }
    .shake-animation {
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
    document.head.appendChild(style);
  }

  function showPinEntryPage() {
    config.currentStep = 5;

    const institution = config.selectedInstitution;

    // Format amount with commas for display
    const formattedAmount = parseInt(config.amount).toLocaleString();

    const popupContent = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="back-button">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="header-title">
          <h3>পিন এন্ট্রি</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    <div class="popup-content pin-entry-container">
      <div class="pin-entry-section">
        <div class="pin-instruction">
          অনুগ্রহ করে আপনার বিকাশ পিন নাম্বার প্রবেশ করুন
        </div>
        <div class="pin-amount">
          <div class="amount-value">৳${formattedAmount}</div>
        </div>
        <div class="pin-input-container">
          <input type="password" maxlength="1" class="pin-input pin-input-1" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-input pin-input-2" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-input pin-input-3" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-input pin-input-4" inputmode="numeric">
          <input type="password" maxlength="1" class="pin-input pin-input-5" inputmode="numeric">
        </div>
        <div class="pin-confirmation">
          পিন দিয়ে আপনি এই লেনদেন নিশ্চিত করছেন
        </div>
      </div>
      <div class="popup-footer">
        <button id="confirmPinBtn" class="next-button" disabled>কনফার্ম করুন</button>
      </div>
    </div>
  `;

    const popup = createPopup(popupContent);

    // Pin input behavior
    const pinInputs = popup.querySelectorAll(".pin-input");
    const confirmPinBtn = popup.querySelector("#confirmPinBtn");

    let currentPinIndex = 0;

    // Focus first pin input
    pinInputs[0].focus();

    // Add styling for focus state
    pinInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#e2146c";
        this.style.backgroundColor = "#fff";
        this.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
      });

      input.addEventListener("blur", function () {
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "#f9f9f9";
        this.style.boxShadow = "none";
      });
    });

    // Regular keyboard input
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value !== "") {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
            currentPinIndex = index + 1;
          }
        }

        // Check if all fields are filled
        let allFilled = true;
        pinInputs.forEach((input) => {
          if (input.value === "") {
            allFilled = false;
          }
        });

        confirmPinBtn.disabled = !allFilled;
      });

      input.addEventListener("keydown", function (e) {
        // Handle backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
          pinInputs[index - 1].value = "";
          currentPinIndex = index - 1;
        }
      });
    });

    confirmPinBtn.addEventListener("click", function () {
      // Check if all pin inputs have values
      let allFilled = true;
      let pin = "";

      pinInputs.forEach((input) => {
        if (input.value === "") {
          allFilled = false;
        }
        pin += input.value;
      });

      if (!allFilled) {
        alert("দয়া করে সম্পূর্ণ পিন প্রবেশ করুন।");
        return;
      }

      // Validate pin (for demo, any 5-digit pin is valid)
      if (pin.length === 5) {
        config.pin = pin;
        fadeOutAndRemove(popup);
        showSuccessPage();
      } else {
        alert("অবৈধ পিন। আবার চেষ্টা করুন।");
        pinInputs.forEach((input) => {
          input.value = "";
        });
        pinInputs[0].focus();
        currentPinIndex = 0;
      }
    });
  }
  // Insurance Payment Flow - Part 4: Success Page & Completion
  // This part continues from Part 3 and handles the success page and transaction completion

  function showSuccessPage() {
    config.currentStep = 6;

    const institution = config.selectedInstitution;

    // Get current date and time for transaction
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Generate a random transaction ID
    const transactionId =
      "TX" +
      Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0");

    // Format amount with commas for display
    const formattedAmount = parseInt(config.amount).toLocaleString();

    const popupContent = `
    <div class="form-header-gradient">
      <div class="header-content">
        <div class="header-title">
          <h3>লেনদেন সফল</h3>
        </div>
        <div class="bkash-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
        </div>
      </div>
    </div>
    <div class="popup-content success-container">
      <div>
        <i class="fas fa-check-circle success-icon"></i>
      </div>
      
      <h2 class="success-title">প্রিমিয়াম পেমেন্ট সফল হয়েছে!</h2>
      <p class="success-details">আপনি ${institution.name} কে ৳${formattedAmount} টাকা রিকোয়েস্ট করেছেন।</p>
      <p class="success-id">রিকোয়েস্ট আইডি: ${transactionId}</p>
      
      <button id="doneBtn" class="success-button">ঠিক আছে</button>
    </div>
  `;

    const popup = createPopup(popupContent);

    const doneBtn = popup.querySelector("#doneBtn");
    doneBtn.addEventListener("click", function () {
      fadeOutAndRemove(popup);
      resetConfigData();
    });
  }

  function generateAndDownloadReceipt(transactionId, date, time) {
    const institution = config.selectedInstitution;

    // Format amount with commas for display
    const formattedAmount = parseInt(config.amount).toLocaleString();

    // Create receipt HTML
    const receiptHTML = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>বিকাশ প্রিমিয়াম পেমেন্ট রিসিট</title>
      <style>
        body {
          font-family: 'Hind Siliguri', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .receipt-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .bkash-logo {
          max-width: 150px;
          margin-bottom: 10px;
        }
        .receipt-title {
          font-size: 24px;
          font-weight: 600;
          color: #e2146c;
          margin: 10px 0;
        }
        .transaction-status {
          display: inline-block;
          background-color: #28a745;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          margin: 10px 0;
        }
        .receipt-content {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .receipt-row:last-child {
          border-bottom: none;
        }
        .receipt-label {
          font-weight: 500;
        }
        .receipt-value {
          text-align: right;
        }
        .receipt-footer {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-top: 40px;
        }
        .print-button {
          background-color: #e2146c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          display: block;
          margin: 0 auto;
        }
        @media print {
          .print-button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-header">
        <img src="images/bkashlogo.png" alt="বিকাশ লোগো" class="bkash-logo">
        <h1 class="receipt-title">প্রিমিয়াম পেমেন্ট রিসিট</h1>
        <div class="transaction-status">সফল</div>
      </div>
      
      <div class="receipt-content">
        <div class="receipt-row">
          <div class="receipt-label">ট্রানজেকশন আইডি</div>
          <div class="receipt-value">${transactionId}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">তারিখ ও সময়</div>
          <div class="receipt-value">${date} ${time}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">প্রাপক</div>
          <div class="receipt-value">${institution.name}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">পলিসি নম্বর</div>
          <div class="receipt-value">${config.policyNumber}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">বিকাশ নম্বর</div>
          <div class="receipt-value">${config.mobileNumber}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">পরিমাণ</div>
          <div class="receipt-value">৳ ${formattedAmount}</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">চার্জ</div>
          <div class="receipt-value">৳ 0.00</div>
        </div>
        
        <div class="receipt-row">
          <div class="receipt-label">মোট পরিমাণ</div>
          <div class="receipt-value">৳ ${formattedAmount}</div>
        </div>
      </div>
      
      <button class="print-button" onclick="window.print()">প্রিন্ট করুন</button>
      
      <div class="receipt-footer">
        <p>এই রিসিটটি আপনার প্রিমিয়াম পেমেন্টের প্রমাণ হিসেবে সংরক্ষণ করুন।</p>
        <p>&copy; ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </body>
    </html>
  `;

    // Create a Blob from the HTML
    const blob = new Blob([receiptHTML], { type: "text/html" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Premium_Payment_${transactionId}.html`;

    // Trigger download
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  function resetConfigData() {
    config.currentStep = 0;
    config.policyNumber = "";
    config.selectedInstitution = "";
    config.policyType = "self";
    config.mobileNumber = "";
    config.amount = "";
    config.pin = "";
  }

  // Initialize notification system
  function showNotification(message, duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".notification");
    if (!notification) {
      notification = document.createElement("div");
      notification.className = "notification";
      document.body.appendChild(notification);
    }

    // Set message and show
    notification.textContent = message;
    notification.classList.add("show");

    // Hide after duration
    setTimeout(() => {
      notification.classList.remove("show");
    }, duration);
  }

  // FAQ Data - Questions and Answers
  const faqData = [
    {
      id: "premium-payment-service",
      question:
        "বিকাশ-এর মাধ্যমে ইন্সুরেন্স (প্রিমিয়াম) পেমেন্ট সার্ভিসটি কী?",
      answer: `বিকাশ-এর "ইন্সুরেন্স সার্ভিস" আপনাকে বিভিন্ন ইন্সুরেন্স কোম্পানির প্রিমিয়াম পেমেন্ট সহজে ও দ্রুত করার সুবিধা দেয়। আপনি যেকোনো সময়, যেকোনো স্থান থেকে আপনার পলিসি প্রিমিয়াম পরিশোধ করতে পারবেন।`,
    },
    {
      id: "who-can-use",
      question: "সার্ভিসটি কাদের জন্য প্রযোজ্য?",
      answer: `যেকোনো বিকাশ গ্রাহক যাদের বিভিন্ন ইন্সুরেন্স কোম্পানির সাথে বীমা পলিসি আছে, তারা এই সার্ভিসটি ব্যবহার করে সহজেই প্রিমিয়াম পরিশোধ করতে পারবেন। এটি সকল প্রকার বীমা যেমন - জীবন বীমা, স্বাস্থ্য বীমা, এবং অন্যান্য ইন্সুরেন্স পলিসির জন্য প্রযোজ্য।`,
    },
    {
      id: "service-charge",
      question: "সার্ভিসটি পেতে গ্রাহকদের কোনো প্রকার চার্জ লাগবে?",
      answer: `না, বিকাশের মাধ্যমে ইন্সুরেন্স প্রিমিয়াম পরিশোধ করতে কোনো অতিরিক্ত চার্জ লাগে না। আপনি সম্পূর্ণ বিনামূল্যে এই সেবাটি ব্যবহার করতে পারবেন।`,
    },
    {
      id: "missed-confirmation",
      question:
        "গ্রাহক যদি পেমেন্ট সম্পন্ন হওয়ার কনফারমেশন নোটিফিকেশন/এসএমএস পায় কিন্তু ইন্সুরেন্স কোম্পানি থেকে পলিসি আপডেট হওয়ার কনফারমেশন নোটিফিকেশন/এসএমএস না পায়, তাহলে কী করণীয়?",
      answer: `যদি আপনি বিকাশ থেকে পেমেন্ট সম্পন্ন হওয়ার নিশ্চিতকরণ পেয়ে থাকেন কিন্তু ইন্সুরেন্স কোম্পানি থেকে কোনো নিশ্চিতকরণ না পান, তাহলে:
      
      ১. বিকাশ অ্যাপের "ট্রানজেকশন হিস্টোরি" থেকে ট্রানজেকশন আইডি সংগ্রহ করুন
      ২. সংশ্লিষ্ট ইন্সুরেন্স কোম্পানির কাস্টমার সার্ভিসে যোগাযোগ করুন এবং ট্রানজেকশন আইডি উল্লেখ করুন
      ৩. প্রয়োজনে বিকাশ কাস্টমার কেয়ার (১৬২৪৭) নম্বরে যোগাযোগ করুন`,
    },
    {
      id: "failed-payment",
      question:
        "বিকাশ গ্রাহকের যদি পেমেন্ট সফল না হয় কিন্তু একাউন্ট থেকে টাকা কেটে নেয়া হয়, তাহলে কী করণীয়?",
      answer: `যদি পেমেন্ট সফল না হয় কিন্তু আপনার অ্যাকাউন্ট থেকে টাকা কাটা যায়, তাহলে:
      
      ১. সাধারণত টাকা ৭২ ঘণ্টার মধ্যে আপনার অ্যাকাউন্টে ফেরত আসবে
      ২. যদি ৭২ ঘণ্টার মধ্যে টাকা ফেরত না আসে, তাহলে বিকাশ কাস্টমার কেয়ার (১৬২৪৭) নম্বরে যোগাযোগ করুন
      ৩. আপনার ট্রানজেকশন আইডি বা লেনদেনের তারিখ ও সময় সম্পর্কে তথ্য প্রদান করুন`,
    },
  ];

  // Initialize the FAQ system by setting up event listeners
  initializeFaqSystem();

  function initializeFaqSystem() {
    // Attach click event to the FAQ menu item
    const faqMenuItem = document.querySelector(
      ".insurance-menu-list .menu-item:nth-child(2)"
    );
    if (faqMenuItem) {
      faqMenuItem.addEventListener("click", showFaqMainPage);
    }

    // Initialize back button functionality for FAQ section
    setupFaqBackButtonListener();
  }

  function setupFaqBackButtonListener() {
    // Global back button handler for FAQ section
    document.addEventListener("click", function (e) {
      if (e.target.closest(".faq-back-button")) {
        handleFaqBackButtonClick();
      }
    });
  }

  function handleFaqBackButtonClick() {
    // Handle back button functionality based on current FAQ index
    if (config.currentFaqIndex >= 0) {
      // If we're viewing a specific FAQ answer, go back to the main FAQ list
      config.currentFaqIndex = -1;
      const currentPopup = document.querySelector(".faq-popup");
      if (currentPopup) {
        fadeOutAndRemove(currentPopup);
        showFaqMainPage();
      }
    } else {
      // If we're on the main FAQ list, close the popup
      const currentPopup = document.querySelector(".faq-popup");
      if (currentPopup) {
        fadeOutAndRemove(currentPopup);
      }
    }
  }

  // Insurance FAQ System - Part 2: UI Components & Utilities
  // This part continues from Part 1 and includes utility functions for creating popups and UI elements

  // Utility function to create and show popups for FAQ
  function createFaqPopup(content) {
    const popup = document.createElement("div");
    popup.className = "faq-popup";

    // Position exactly like the main container
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(0.95)";
    popup.style.width = "100%";
    popup.style.maxWidth = "500px";
    popup.style.height = "80vh";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.zIndex = "901";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    popup.innerHTML = content;
    document.body.appendChild(popup);

    // Get main container to apply blur
    const mainContainer = document.querySelector(
      ".insurance-service-container"
    );

    // Trigger reflow to ensure transition works
    popup.offsetHeight;
    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, -50%) scale(1)";

    // Add blur to main container
    if (mainContainer) {
      mainContainer.classList.add("blur");
      // Hide the main container from screen readers when popup is active
      mainContainer.setAttribute("aria-hidden", "true");
    }

    // Handle mobile view
    if (window.innerWidth <= 500) {
      popup.style.height = "100vh";
      popup.style.maxHeight = "100vh";
      popup.style.width = "100%";
      popup.style.borderRadius = "0";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.transform = "scale(0.95)";

      // Special animation for mobile
      setTimeout(() => {
        popup.style.transform = "scale(1)";
      }, 10);
    }

    return popup;
  }

  function fadeOutAndRemove(element) {
    if (!element) return;

    // Different animation based on device size
    if (window.innerWidth <= 500) {
      element.style.transform = "scale(0.95)";
    } else {
      element.style.transform = "translate(-50%, -50%) scale(0.95)";
    }

    element.style.opacity = "0";

    // Remove blur from main container
    const mainContainer = document.querySelector(
      ".insurance-service-container"
    );
    if (mainContainer) {
      mainContainer.classList.remove("blur");
      // Make main container visible to screen readers again
      mainContainer.setAttribute("aria-hidden", "false");
    }

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300);
  }

  // Show the main FAQ page with all questions
  function showFaqMainPage() {
    config.currentFaqIndex = -1;

    let faqQuestionsHTML = "";
    faqData.forEach((faq, index) => {
      faqQuestionsHTML += `
        <div class="faq-item" data-index="${index}">
          <div class="faq-question">${faq.question}</div>
          <div class="faq-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      `;
    });

    const popupContent = `
      <div class="form-header-gradient">
        <div class="header-content">
          <div class="faq-back-button">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="header-title">
            <h3>সচরাচর জিজ্ঞাসা</h3>
          </div>
          <div class="header-logo">
            <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
          </div>
        </div>
      </div>
      <div class="popup-content faq-questions-container">
        <div class="faq-title">ইন্সুরেন্স সার্ভিস সম্পর্কিত প্রশ্ন ও উত্তর</div>
        <div class="faq-questions-list">
          ${faqQuestionsHTML}
        </div>
      </div>
    `;

    const popup = createFaqPopup(popupContent);

    // Add event listeners to FAQ items
    const faqItems = popup.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const faqIndex = parseInt(item.getAttribute("data-index"));
        if (!isNaN(faqIndex) && faqIndex >= 0 && faqIndex < faqData.length) {
          fadeOutAndRemove(popup);
          showFaqAnswerPage(faqIndex);
        }
      });
    });

    // Add styles for the FAQ main page
    const style = document.createElement("style");
    style.textContent = `
      .faq-popup {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .form-header-gradient {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        padding: 0;
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
        height: 80px;
        min-height: 80px;
        max-height: 80px;
      }
      .form-header-gradient::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.15), transparent 70%);
      }
      .header-content {
        position: relative;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
      }
      .faq-back-button {
        width: 36px;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .faq-back-button i {
        color: white;
        font-size: 18px;
      }
      .header-title {
        flex: 1;
        text-align: center;
      }
      .header-title h3 {
        font-size: 20px;
        font-weight: 600;
        color: white;
        margin: 0;
        letter-spacing: 0.5px;
      }
      .header-logo {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .header-logo img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .popup-content {
        padding: 20px;
        max-height: 70vh;
        overflow-y: auto;
      }
      .faq-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 20px;
        color: #333;
      }
      .faq-questions-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .faq-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: all 0.3s;
        border: 1px solid #eee;
      }
      .faq-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        border-color: #e2146c;
      }
      .faq-item:active {
        transform: translateY(0);
        background-color: #fafafa;
      }
      .faq-question {
        flex: 1;
        font-size: 15px;
        color: #333;
      }
      .faq-arrow {
        color: #ccc;
        font-size: 18px;
        margin-left: 10px;
      }
    `;
    document.head.appendChild(style);
  }

  // Insurance FAQ System - Part 3: FAQ Answer Page
  // This part continues from Part 2 and handles the display of individual FAQ answers

  // Show a specific FAQ answer page
  function showFaqAnswerPage(faqIndex) {
    config.currentFaqIndex = faqIndex;
    const faq = faqData[faqIndex];

    const popupContent = `
      <div class="form-header-gradient">
        <div class="header-content">
          <div class="faq-back-button">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="header-title">
            <h3>প্রশ্নের উত্তর</h3>
          </div>
          <div class="header-logo">
            <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
          </div>
        </div>
      </div>
      <div class="popup-content faq-answer-container">
        <div class="faq-question-box">
          <div class="question-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <div class="question-text">${faq.question}</div>
        </div>
        
        <div class="faq-answer-box">
          <div class="answer-icon">
            <i class="fas fa-comment-dots"></i>
          </div>
          <div class="answer-text">${faq.answer}</div>
        </div>
        
        <div class="faq-actions">
          <div class="faq-helpful">
            <div class="helpful-text">এই উত্তরটি কি আপনার জন্য সহায়ক ছিল?</div>
            <div class="helpful-buttons">
              <button class="helpful-button yes-button">
                <i class="fas fa-thumbs-up"></i> হ্যাঁ
              </button>
              <button class="helpful-button no-button">
                <i class="fas fa-thumbs-down"></i> না
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const popup = createFaqPopup(popupContent);

    // Add event listeners for helpful buttons
    const yesButton = popup.querySelector(".yes-button");
    const noButton = popup.querySelector(".no-button");

    if (yesButton) {
      yesButton.addEventListener("click", function () {
        // Handle "Yes" feedback
        showFeedbackThanks(true);
      });
    }

    if (noButton) {
      noButton.addEventListener("click", function () {
        // Handle "No" feedback
        showFeedbackThanks(false);
      });
    }

    // Add styles for the FAQ answer page
    const style = document.createElement("style");
    style.textContent = `
      .faq-answer-container {
        padding: 20px;
      }
      .faq-question-box {
        display: flex;
        align-items: flex-start;
        background-color: #f8f9fa;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
      }
      .question-icon {
        color: #e2146c;
        font-size: 24px;
        margin-right: 15px;
        flex-shrink: 0;
      }
      .question-text {
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      .faq-answer-box {
        display: flex;
        align-items: flex-start;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }
      .answer-icon {
        color: #28a745;
        font-size: 24px;
        margin-right: 15px;
        flex-shrink: 0;
      }
      .answer-text {
        font-size: 15px;
        line-height: 1.6;
        color: #333;
        white-space: pre-line;
      }
      .faq-actions {
        margin-top: 30px;
        border-top: 1px solid #eee;
        padding-top: 20px;
      }
      .faq-helpful {
        text-align: center;
      }
      .helpful-text {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }
      .helpful-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
      }
      .helpful-button {
        padding: 8px 20px;
        border-radius: 20px;
        border: 1px solid #ddd;
        background-color: #fff;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .yes-button:hover {
        background-color: #e6f7e9;
        border-color: #28a745;
        color: #28a745;
      }
      .no-button:hover {
        background-color: #fff0f0;
        border-color: #dc3545;
        color: #dc3545;
      }
    `;
    document.head.appendChild(style);
  }

  // Show a thank you message after feedback
  function showFeedbackThanks(isPositive) {
    // Create a toast notification for feedback
    const notification = document.createElement("div");
    notification.className = "feedback-notification";
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas ${isPositive ? "fa-check-circle" : "fa-info-circle"}"></i>
      </div>
      <div class="notification-message">
        ${
          isPositive
            ? "আপনার প্রতিক্রিয়ার জন্য ধন্যবাদ!"
            : "আমরা দুঃখিত। আপনার মতামতের জন্য ধন্যবাদ।"
        }
      </div>
    `;

    document.body.appendChild(notification);

    // Style for the notification
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = isPositive ? "#28a745" : "#17a2b8";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.gap = "10px";
    notification.style.zIndex = "9999";
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.3s ease";

    // Notification icon style
    const notificationIcon = notification.querySelector(".notification-icon");
    notificationIcon.style.fontSize = "20px";

    // Notification message style
    const notificationMessage = notification.querySelector(
      ".notification-message"
    );
    notificationMessage.style.fontSize = "14px";

    // Show notification with animation
    setTimeout(() => {
      notification.style.opacity = "1";
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Insurance FAQ System - Part 4: Integration & Exports
  // This part finalizes the FAQ implementation and exports the public API

  // Initialize notification system for FAQ feedback
  function showFaqNotification(message, type = "info", duration = 3000) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".faq-notification");
    if (!notification) {
      notification = document.createElement("div");
      notification.className = "faq-notification";
      document.body.appendChild(notification);
    }

    // Set message, type, and show
    notification.textContent = message;
    notification.className = `faq-notification ${type}`;
    notification.classList.add("show");

    // Hide after duration
    setTimeout(() => {
      notification.classList.remove("show");
    }, duration);
  }

  // Add styles for notification
  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
    .faq-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 9999;
      color: white;
    }
    .faq-notification.show {
      transform: translateX(0);
    }
    .faq-notification.info {
      background-color: #17a2b8;
    }
    .faq-notification.success {
      background-color: #28a745;
    }
    .faq-notification.warning {
      background-color: #ffc107;
      color: #333;
    }
    .faq-notification.error {
      background-color: #dc3545;
    }
  `;
  document.head.appendChild(notificationStyle);

  // Add a custom search functionality to the FAQ
  function addFaqSearch() {
    // Get the current FAQ popup
    const popup = document.querySelector(".faq-popup");
    if (!popup) return;

    // Check if we're on the main FAQ page
    const questionsContainer = popup.querySelector(".faq-questions-container");
    if (!questionsContainer) return;

    // Create search box
    const searchBox = document.createElement("div");
    searchBox.className = "faq-search-box";
    searchBox.innerHTML = `
      <div class="search-input-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="faq-search-input" placeholder="প্রশ্ন খুঁজুন...">
      </div>
    `;

    // Insert at the top of questions container
    const faqTitle = questionsContainer.querySelector(".faq-title");
    if (faqTitle) {
      faqTitle.parentNode.insertBefore(searchBox, faqTitle.nextSibling);
    } else {
      questionsContainer.prepend(searchBox);
    }

    // Add search functionality
    const searchInput = searchBox.querySelector(".faq-search-input");
    const faqItems = popup.querySelectorAll(".faq-item");

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      faqItems.forEach((item) => {
        const questionText = item
          .querySelector(".faq-question")
          .textContent.toLowerCase();

        if (searchTerm === "" || questionText.includes(searchTerm)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });

    // Add styles for search box
    const searchStyle = document.createElement("style");
    searchStyle.textContent = `
      .faq-search-box {
        margin-bottom: 20px;
      }
      .search-input-container {
        position: relative;
        display: flex;
        align-items: center;
      }
      .search-icon {
        position: absolute;
        left: 15px;
        color: #999;
      }
      .faq-search-input {
        width: 100%;
        padding: 12px 15px 12px 40px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.3s;
      }
      .faq-search-input:focus {
        border-color: #e2146c;
      }
    `;
    document.head.appendChild(searchStyle);
  }

  // Add event listener to enhance the FAQ page with search when it's created
  const originalCreateFaqPopup = createFaqPopup;
  createFaqPopup = function (content) {
    const popup = originalCreateFaqPopup(content);

    // If this is the main FAQ page, add search functionality
    if (content.includes("faq-questions-container")) {
      setTimeout(addFaqSearch, 100); // Slight delay to ensure DOM is ready
    }

    return popup;
  };

  // Create FAQ module with exported functions
  const InsuranceFAQ = {
    showFaqMainPage: showFaqMainPage,
    showFaqAnswerPage: showFaqAnswerPage,
    showFaqNotification: showFaqNotification,
    getFaqData: () => faqData,
  };

  // Export the InsuranceFAQ object for global access
  window.InsuranceFAQ = InsuranceFAQ;

  document.head.appendChild(notificationStyle);
});

// Add shorthand functions for direct access
const FAQ = {
  show: function () {
    if (window.InsuranceFAQ) {
      window.InsuranceFAQ.showFaqMainPage();
    }
  },
  showQuestion: function (index) {
    if (window.InsuranceFAQ) {
      window.InsuranceFAQ.showFaqAnswerPage(index);
    }
  },
};

window.addEventListener("resize", function () {
  const popups = document.querySelectorAll(".insurance-popup, .faq-popup");

  popups.forEach((popup) => {
    if (window.innerWidth <= 500) {
      popup.style.height = "100vh";
      popup.style.maxHeight = "100vh";
      popup.style.width = "100%";
      popup.style.borderRadius = "0";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.transform = "scale(1)";
    } else {
      popup.style.height = "80vh";
      popup.style.maxHeight = "80vh";
      popup.style.width = "100%";
      popup.style.maxWidth = "500px";
      popup.style.borderRadius = "16px";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
    }
  });
});

// Export FAQ object for global access
window.FAQ = FAQ;

// Add shorthand functions for common tasks
const Insurance = {
  showInstitutionSelection: showInstitutionSelectionPage,
  showPolicyNumberInput: showPolicyNumberInputPage,
  showPolicyDetails: showPolicyDetailsPage,
  showAmountInput: showAmountInputPage,
  showPinEntry: showPinEntryPage,
  showSuccess: showSuccessPage,
  showNotification: showNotification,
};

// Export the Insurance object for global access
window.Insurance = Insurance;
