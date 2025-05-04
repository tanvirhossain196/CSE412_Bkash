document.addEventListener("DOMContentLoaded", function () {
  // Find the specific savings option for tax certificate
  const taxCertificateOption = Array.from(
    document.querySelectorAll(".savings-option")
  ).find((option) =>
    option.querySelector(".option-text p").textContent.includes("আয়কর সনদ")
  );

  if (taxCertificateOption) {
    // Replace existing event listener
    taxCertificateOption.replaceWith(taxCertificateOption.cloneNode(true));
    const newTaxOption = Array.from(
      document.querySelectorAll(".savings-option")
    ).find((option) =>
      option.querySelector(".option-text p").textContent.includes("আয়কর সনদ")
    );

    newTaxOption.addEventListener("click", function () {
      showEtinInfoPopup();
    });
  }

  // Enhanced closePopup function with overlay handling
  function closePopup(overlay, popup) {
    if (overlay && overlay.parentNode) {
      overlay.style.animation = "quickFade 0.15s ease-out reverse";
      setTimeout(() => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
        }
      }, 150);
    }
    if (popup && popup.parentNode) {
      popup.style.animation = "quickSlide 0.15s ease-out reverse";
      setTimeout(() => {
        if (popup.parentNode) {
          document.body.removeChild(popup);
        }
      }, 150);
    }
  }

  // Add showEtinInfoDetailPopup function
  function showEtinInfoDetailPopup() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "1001";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.width = "380px";
    popup.style.maxWidth = "90%";
    popup.style.height = "80vh";
    popup.style.maxHeight = "600px";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
    popup.style.zIndex = "1002";
    popup.style.backgroundColor = "#ffffff";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.innerHTML = `
      <div class="popup-header" style="background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%); padding: 16px; position: relative; overflow: hidden; flex-shrink: 0;">
        <div class="header-content" style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1;">
          <div class="back-button">
            <button class="back-button-btn" style="background: rgba(255, 255, 255, 0.1); border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; transition: all 0.3s ease;">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <div class="header-title centered-title" style="flex: 1; text-align: center;">
            <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0;">ই-টিন সম্পর্কে বিস্তারিত</h3>
          </div>
          <div class="header-icon" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন" style="width: 32px; height: auto;">
          </div>
        </div>
      </div>

      <div class="popup-body" style="padding: 15px; background-color: #f5f5f5; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
        <div class="etin-info-container">
          <div class="etin-info-header" style="text-align: center; margin-bottom: 20px; padding: 15px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
            <div class="etin-info-icon" style="width: 60px; height: 60px; background: rgba(52, 152, 219, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
              <i class="fas fa-id-card" style="font-size: 28px; color: #3498db;"></i>
            </div>
            <h2 style="font-size: 20px; color: #333; margin-bottom: 8px; font-weight: 600;">ই-টিন (e-TIN) কী?</h2>
            <p style="color: #666; font-size: 14px; line-height: 1.5; margin: 0;">Electronic Taxpayer's Identification Number (e-TIN) হলো আপনার ডিজিটাল করদাতা শনাক্তকরণ নম্বর।</p>
          </div>

          <div class="etin-info-section" style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);">
            <h3 style="font-size: 16px; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600;">
              <i class="fas fa-question-circle" style="color: #e2146c; font-size: 18px;"></i> ই-টিন কেন প্রয়োজন?
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">আয়কর রিটার্ন দাখিলের জন্য</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">আয়কর সনদপত্র পাওয়ার জন্য</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">ব্যাংক হিসাব খোলার জন্য</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">বিদেশ ভ্রমণের জন্য পাসপোর্ট করার সময়</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">ব্যবসায়িক লাইসেন্স নবায়নের জন্য</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">সরকারি চাকরির আবেদনের জন্য</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">বড় অঙ্কের লেনদেনের জন্য</li>
            </ul>
          </div>

          <div class="etin-info-section" style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);">
            <h3 style="font-size: 16px; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600;">
              <i class="fas fa-laptop" style="color: #e2146c; font-size: 18px;"></i> ই-টিন কীভাবে পাবেন?
            </h3>
            <ol style="padding-left: 20px; margin: 0;">
              <li style="padding: 6px 0; color: #555; font-size: 14px; line-height: 1.5;">জাতীয় রাজস্ব বোর্ডের অনলাইন পোর্টাল www.nbr.gov.bd তে যান</li>
              <li style="padding: 6px 0; color: #555; font-size: 14px; line-height: 1.5;">'ই-টিন রেজিস্ট্রেশন' অপশনে ক্লিক করুন</li>
              <li style="padding: 6px 0; color: #555; font-size: 14px; line-height: 1.5;">প্রয়োজনীয় তথ্য পূরণ করুন</li>
              <li style="padding: 6px 0; color: #555; font-size: 14px; line-height: 1.5;">ভেরিফিকেশন সম্পন্ন করুন</li>
              <li style="padding: 6px 0; color: #555; font-size: 14px; line-height: 1.5;">সাবমিট করার পর আপনার ই-টিন সার্টিফিকেট ডাউনলোড করুন</li>
            </ol>
          </div>

          <div class="etin-info-section" style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);">
            <h3 style="font-size: 16px; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600;">
              <i class="fas fa-info-circle" style="color: #e2146c; font-size: 18px;"></i> গুরুত্বপূর্ণ তথ্য
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">ই-টিন একবার নিবন্ধন করলে তা আজীবন বৈধ থাকে</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">ই-টিন নম্বর ১২ ডিজিটের হয়</li>
              <li style="position: relative; padding: 6px 0 6px 20px; color: #555; font-size: 14px; line-height: 1.5;">ই-টিন নিবন্ধন সম্পূর্ণ বিনামূল্যে</li>
            </ul>
          </div>

          <div class="etin-info-section" style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);">
            <h3 style="font-size: 16px; color: #333; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600;">
              <i class="fas fa-phone-alt" style="color: #e2146c; font-size: 18px;"></i> যোগাযোগ
            </h3>
            <div class="contact-info" style="background: #f9f9f9; padding: 12px; border-radius: 8px; margin-top: 8px;">
              <p style="margin: 4px 0; color: #555; font-size: 14px;"><strong style="color: #333;">NBR হেল্পলাইন:</strong> ০৯৬১১-৭৭০০৮৮</p>
              <p style="margin: 4px 0; color: #555; font-size: 14px;"><strong style="color: #333;">ইমেইল:</strong> helpdesk@nbr.gov.bd</p>
              <p style="margin: 4px 0; color: #555; font-size: 14px;"><strong style="color: #333;">ওয়েবসাইট:</strong> www.nbr.gov.bd</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Back button functionality
    const backButton = popup.querySelector(".back-button-btn");
    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showEtinInfoPopup(); // Return to the main E-TIN popup
    });

    // Add hover effect for back button
    backButton.addEventListener("mouseover", function () {
      this.style.background = "rgba(255, 255, 255, 0.2)";
    });
    backButton.addEventListener("mouseout", function () {
      this.style.background = "rgba(255, 255, 255, 0.1)";
    });
  }

  // Stage 1: Show E-TIN information popup
  function showEtinInfoPopup() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>ই-টিন তথ্য</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="savings-action" style="padding: 30px 20px;">
          <div class="savings-icon" style="background-color: rgba(52, 152, 219, 0.1);">
            <i class="fas fa-file-alt" style="color: #3498db; font-size: 40px;"></i>
          </div>
          <div style="text-align: center; margin-bottom: 30px;">
            <h4 style="font-size: 20px; color: #333; margin-bottom: 10px;">ই-টিন তথ্য প্রদান করুন</h4>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 20px;">
              আপনার রিটার্ন ও আয়কর সনদ পেতে ই-টিন নম্বর প্রয়োজন
            </p>
          </div>
        </div>

        <div class="savings-options" style="padding: 0 20px;">
          <div class="savings-option etin-option">
            <div class="option-icon" style="background-color: rgba(52, 152, 219, 0.1);">
              <i class="fas fa-id-card" style="color: #3498db;"></i>
            </div>
            <div class="option-text">
              <p>ই-টিন নম্বর দিন</p>
            </div>
            <div class="option-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>

          <div class="savings-option etin-help">
            <div class="option-icon" style="background-color: rgba(46, 204, 113, 0.1);">
              <i class="fas fa-question-circle" style="color: #2ecc71;"></i>
            </div>
            <div class="option-text">
              <p>ই-টিন সম্পর্কে জানুন</p>
            </div>
            <div class="option-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Event listeners
    const backButton = popup.querySelector(".back-button-btn");
    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
    });

    const etinOption = popup.querySelector(".etin-option");
    etinOption.addEventListener("click", function () {
      closePopup(overlay, popup);
      showEtinEntryPopup();
    });

    const etinHelp = popup.querySelector(".etin-help");
    etinHelp.addEventListener("click", function () {
      closePopup(overlay, popup);
      showEtinInfoDetailPopup();
    });
  }

  // Stage 2: Show E-TIN entry form
  function showEtinEntryPopup() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>ই-টিন নম্বর</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="popup-form">
          <div class="form-group">
            <label class="form-label">ই-টিন নম্বর লিখুন</label>
            <input type="text" class="form-input etin-input" placeholder="১২ ডিজিটের ই-টিন নম্বর" maxlength="12">
            <div class="form-helper" style="color: #666; font-size: 12px; margin-top: 8px;">
              আপনার ১২ ডিজিটের ই-টিন নম্বর প্রবেশ করুন
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">মোবাইল নম্বর</label>
            <input type="text" class="form-input mobile-input" placeholder="০১XXXXXXXXX" maxlength="11">
          </div>

          <div class="form-group">
            <label class="form-label">সনদের ধরন</label>
            <div class="form-select cert-type-select">ধরন বেছে নিন</div>
            <div class="dropdown-options cert-type-options">
              <div class="dropdown-option" data-value="return">রিটার্ন সনদ</div>
              <div class="dropdown-option" data-value="tax">আয়কর সনদ</div>
              <div class="dropdown-option" data-value="both">উভয় সনদ</div>
            </div>
          </div>

          <button class="action-button verify-button" disabled>
            যাচাই করুন
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Event listeners
    const backButton = popup.querySelector(".back-button-btn");
    const etinInput = popup.querySelector(".etin-input");
    const mobileInput = popup.querySelector(".mobile-input");
    const certTypeSelect = popup.querySelector(".cert-type-select");
    const certTypeOptions = popup.querySelector(".cert-type-options");
    const verifyButton = popup.querySelector(".verify-button");
    let selectedType = null;

    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showEtinInfoPopup();
    });

    // E-TIN input validation
    etinInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 12);
      validateForm();
    });

    // Mobile input validation
    mobileInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
      validateForm();
    });

    // Certificate type selection
    certTypeSelect.addEventListener("click", function () {
      certTypeOptions.style.display =
        certTypeOptions.style.display === "block" ? "none" : "block";
    });

    certTypeOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        selectedType = this.getAttribute("data-value");
        certTypeSelect.textContent = this.textContent;
        certTypeOptions.style.display = "none";
        validateForm();
      });
    });

    // Form validation
    function validateForm() {
      const isValid =
        etinInput.value.length === 12 &&
        mobileInput.value.length === 11 &&
        selectedType !== null;

      verifyButton.disabled = !isValid;
      if (isValid) {
        verifyButton.style.background =
          "linear-gradient(135deg, #e2146c 0%, #a4126a 100%)";
        verifyButton.style.cursor = "pointer";
      } else {
        verifyButton.style.background =
          "linear-gradient(135deg, #cccccc 0%, #999999 100%)";
        verifyButton.style.cursor = "not-allowed";
      }
    }

    // Submit button click
    verifyButton.addEventListener("click", function () {
      if (!verifyButton.disabled) {
        const etinData = {
          etinNumber: etinInput.value,
          mobileNumber: mobileInput.value,
          certificateType: selectedType,
        };
        closePopup(overlay, popup);
        showConfirmationPopup(etinData);
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener(
      "click",
      function (event) {
        if (
          !event.target.closest(".form-select") &&
          !event.target.closest(".dropdown-options")
        ) {
          certTypeOptions.style.display = "none";
        }
      },
      { capture: true }
    );
  }

  // Stage 3: Show confirmation page
  function showConfirmationPopup(etinData) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";

    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>তথ্য নিশ্চিত করুন</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">ই-টিন নম্বর</span>
            <span class="summary-value">${etinData.etinNumber}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">মোবাইল নম্বর</span>
            <span class="summary-value">${etinData.mobileNumber}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">সনদের ধরন</span>
            <span class="summary-value">${certTypeText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">সার্ভিস চার্জ</span>
            <span class="summary-value highlight">৳৫০</span>
          </div>
        </div>

        <div style="background-color: #fff8e1; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <div style="display: flex; align-items: flex-start;">
            <i class="fas fa-info-circle" style="color: #ffc107; margin-right: 10px; margin-top: 3px;"></i>
            <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
              দয়া করে নিশ্চিত করুন যে আপনার প্রদত্ত তথ্য সঠিক। ভুল তথ্য প্রদান করলে সনদ প্রাপ্তিতে সমস্যা হতে পারে।
            </p>
          </div>
        </div>

        <button class="action-button confirm-button">
          নিশ্চিত করুন
        </button>
      </div>
    `;

    document.body.appendChild(popup);

    // Event listeners
    const backButton = popup.querySelector(".back-button-btn");
    const confirmButton = popup.querySelector(".confirm-button");

    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showEtinEntryPopup();
    });

    confirmButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showPinEntryPopup(etinData);
    });
  }

  // Stage 4: Show PIN entry page
  function showPinEntryPopup(etinData) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>পিন নম্বর প্রদান করুন</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="pin-container">
          <p class="pin-label">আপনার ৫ ডিজিটের বিকাশ পিন নম্বর দিন</p>
          <div class="pin-input-group">
            <input type="password" class="pin-input" maxlength="1" data-index="0">
            <input type="password" class="pin-input" maxlength="1" data-index="1">
            <input type="password" class="pin-input" maxlength="1" data-index="2">
            <input type="password" class="pin-input" maxlength="1" data-index="3">
            <input type="password" class="pin-input" maxlength="1" data-index="4">
          </div>
          <div style="text-align: center; color: #666; font-size: 14px; margin-top: 20px;">
            <i class="fas fa-lock" style="margin-right: 8px;"></i>
            আপনার পিন সুরক্ষিত রাখা হবে
          </div>
        </div>
        
        <button class="action-button submit-pin-button" disabled>
          জমা দিন
        </button>
      </div>
    `;

    document.body.appendChild(popup);

    // PIN entry logic
    const pinInputs = popup.querySelectorAll(".pin-input");
    const submitButton = popup.querySelector(".submit-pin-button");
    const backButton = popup.querySelector(".back-button-btn");

    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        if (e.target.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }

        // Check if all inputs are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        submitButton.disabled = !allFilled;
        if (allFilled) {
          submitButton.style.background =
            "linear-gradient(135deg, #e2146c 0%, #a4126a 100%)";
          submitButton.style.cursor = "pointer";
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showConfirmationPopup(etinData);
    });

    submitButton.addEventListener("click", function () {
      if (!submitButton.disabled) {
        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");
        etinData.pin = pin;
        closePopup(overlay, popup);
        showSuccessPage(etinData);
      }
    });
  }

  // Stage 5: Show success page
  function showSuccessPage(etinData) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

    const certificateNumber =
      "CERT" + Math.floor(10000000 + Math.random() * 90000000);
    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.innerHTML = `
    <div class="success-header">
      <div class="success-header-content">
        <div style="width: 36px;"></div>
        <div class="success-header-title">সনদ প্রাপ্তি সফল</div>
        <div class="success-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ আইকন" style="width: 100%; height: auto;">
        </div>
      </div>
    </div>

    <div class="success-body">
      <div class="success-content">
        <div class="success-icon">
          <i class="fas fa-check"></i>
        </div>
        
        <h2 class="success-title">অভিনন্দন!</h2>
        <p class="success-message">আপনার ${certTypeText} সফলভাবে প্রস্তুত হয়েছে</p>
        
        <div class="account-details-card">
          <div class="account-detail-row">
            <span class="account-label">সনদ নম্বর</span>
            <span class="account-value">${certificateNumber}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">ই-টিন নম্বর</span>
            <span class="account-value">${etinData.etinNumber}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">সনদের ধরন</span>
            <span class="account-value">${certTypeText}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">তারিখ</span>
            <span class="account-value">${new Date().toLocaleDateString(
              "bn-BD"
            )}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">সার্ভিস চার্জ</span>
            <span class="account-value">৳৫০</span>
          </div>
        </div>
        
        <!-- Additional info to demonstrate scrolling -->
        <div class="additional-info" style="background-color: #f0f9f4; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
          <h4 style="color: #11998e; margin-bottom: 10px; font-size: 16px;">আপনার সনদ সম্পর্কে বিস্তারিত</h4>
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 10px;">
            আপনার ${certTypeText} সফলভাবে তৈরি করা হয়েছে। এই সনদ ব্যবহার করে আপনি বিভিন্ন প্রতিষ্ঠানে প্রয়োজনীয় কাজ করতে পারবেন।
          </p>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            কোনো সমস্যা হলে বিকাশ হটলাইন ১৬২৪৭ নম্বরে কল করুন।
          </p>
        </div>
      </div>
      
      <div class="success-buttons">
        <button class="success-button">
          <i class="fas fa-check-circle"></i>
          ঠিক আছে
        </button>
        
        <button class="success-button download">
          <i class="fas fa-download"></i>
          সনদ ডাউনলোড করুন
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(popup);

    // Event listeners
    const okButton = popup.querySelector(".success-button");
    const downloadButton = popup.querySelector(".success-button.download");

    okButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });

    downloadButton.addEventListener("click", function () {
      downloadCertificate(etinData, certificateNumber);
    });
  }

  const etinSuccessStyles = document.createElement("style");
  etinSuccessStyles.textContent = `
  /* Enhanced Success Popup */
  .success-popup {
    width: 450px;
    max-width: 90%;
    height: 500px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    animation: popupFadeIn 0.3s ease-out;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1002;
    display: flex;
    flex-direction: column;
  }
  
  /* Professional Header */
  .success-header {
    background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .success-header::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    transform: translate(50%, -50%);
  }
  
  .success-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .success-header-title {
    color: white;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    flex: 1;
  }
  
  .success-logo {
    width: 36px;
    height: 36px;
  }
  
  /* Success Content Structure */
  .success-body {
    display: flex;
    flex-direction: column;
    height: calc(500px - 60px); /* Account for header height */
  }
  
  .success-content {
    flex: 1;
    overflow-y: auto;
    padding: 25px 20px 15px;
  }
  
  .success-buttons {
    padding: 15px 20px 20px;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
  }
  
  /* Success Content Styling */
  .success-icon {
    width: 80px;
    height: 80px;
    background-color: rgba(56, 239, 125, 0.1);
    border-radius: 50%;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38ef7d;
    font-size: 40px;
  }
  
  .success-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
    text-align: center;
  }
  
  .success-message {
    font-size: 16px;
    color: #666;
    margin-bottom: 25px;
    line-height: 1.5;
    text-align: center;
  }
  
  /* Account Details Card */
  .account-details-card {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .account-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .account-detail-row:last-child {
    border-bottom: none;
  }
  
  .account-label {
    color: #888;
    font-size: 14px;
  }
  
  .account-value {
    color: #333;
    font-weight: 500;
    font-size: 15px;
  }
  
  /* Buttons */
  .success-button {
    width: 100%;
    background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-bottom: 15px;
  }
  
  .success-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(56, 239, 125, 0.2);
  }
  
  .success-button.download {
    background: #f8f9fa;
    color: #11998e;
    border: 1px solid #e6e8ea;
    margin-bottom: 0;
  }
  
  .success-button.download:hover {
    background: #f1f3f5;
  }
  
  .success-button i {
    margin-right: 8px;
  }
  
  /* Scrollbar styling */
  .success-content::-webkit-scrollbar {
    width: 5px;
  }
  
  .success-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }
  
  .success-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 5px;
  }
  
  .success-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  /* Animation */
  @keyframes popupFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;
  document.head.appendChild(etinSuccessStyles);

  function updateETinSuccessImplementation() {
    // Find and replace the original showSuccessPage function call in the PIN submit handler
    const submitPINHandlers = document.querySelectorAll(".submit-pin-button");
    if (submitPINHandlers.length > 0) {
      submitPINHandlers.forEach((button) => {
        // Clone and replace to remove old event handlers
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Add new event handler
        newButton.addEventListener("click", function () {
          if (!newButton.disabled) {
            const pinInputs = document.querySelectorAll(".pin-input");
            const pin = Array.from(pinInputs)
              .map((input) => input.value)
              .join("");

            // Collect data to pass to success page
            const etinData = {
              etinNumber:
                document.getElementById("nidNumber")?.value || "19XXXXXX68",
              mobileNumber:
                document.getElementById("mobileNumber")?.value || "01XXXXXXXXX",
              certificateType: "tax", // Default to tax certificate
              pin: pin,
            };

            // Close popup
            const overlay = document.querySelector(".modal-overlay");
            const popup = document.querySelector(".savings-popup");
            if (overlay && popup) {
              closePopup(overlay, popup);
              // Show the new success page
              showSuccessPage(etinData);
            }
          }
        });
      });
    }
  }

  // Initialize when document is ready or when relevant elements exist
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    updateETinSuccessImplementation();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      updateETinSuccessImplementation
    );
  }

  // Function to generate and download certificate
  function downloadCertificate(etinData, certificateNumber) {
    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>বিকাশ ${certTypeText} - ${certificateNumber}</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          body {
            font-family: 'Hind Siliguri', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .certificate-container {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 10mm auto;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            position: relative;
          }
          .certificate-watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            color: rgba(226, 20, 108, 0.05);
            white-space: nowrap;
            pointer-events: none;
          }
          .certificate-header {
            text-align: center;
            border-bottom: 2px solid #e2146c;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .certificate-logo {
            width: 80px;
            margin-bottom: 20px;
          }
          .certificate-title {
            font-size: 32px;
            color: #e2146c;
            margin: 0;
            font-weight: 700;
          }
          .certificate-subtitle {
            font-size: 18px;
            color: #333;
            margin: 10px 0;
          }
          .certificate-body {
            margin: 40px 0;
          }
          .certificate-section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 20px;
            color: #e2146c;
            border-bottom: 1px solid #e2146c;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .info-item {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
          }
          .info-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }
          .certificate-footer {
            position: absolute;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            border-top: 1px solid #eee;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .qr-code {
            position: absolute;
            bottom: 30mm;
            right: 30mm;
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #999;
          }
          @media print {
            .certificate-container {
              margin: 0;
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="certificate-watermark">বিকাশ</div>
          
          <div class="certificate-header">
            <img src="images/bkashlogo.png" class="certificate-logo" alt="বিকাশ লোগো">
            <h1 class="certificate-title">${certTypeText}</h1>
            <p class="certificate-subtitle">Certificate Number: ${certificateNumber}</p>
          </div>
          
          <div class="certificate-body">
            <div class="certificate-section">
              <h2 class="section-title">করদাতার তথ্য</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">ই-টিন নম্বর</div>
                  <div class="info-value">${etinData.etinNumber}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">মোবাইল নম্বর</div>
                  <div class="info-value">${etinData.mobileNumber}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">ইস্যু করার তারিখ</div>
                  <div class="info-value">${new Date().toLocaleDateString(
                    "bn-BD"
                  )}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">বৈধতার মেয়াদ</div>
                  <div class="info-value">১ বছর</div>
                </div>
              </div>
            </div>
            
            ${
              etinData.certificateType === "return" ||
              etinData.certificateType === "both"
                ? `
            <div class="certificate-section">
              <h2 class="section-title">রিটার্ন তথ্য</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">আয়বর্ষ</div>
                  <div class="info-value">২০২৪-২০২৫</div>
                </div>
                <div class="info-item">
                  <div class="info-label">রিটার্ন দাখিলের তারিখ</div>
                  <div class="info-value">${new Date().toLocaleDateString(
                    "bn-BD"
                  )}</div>
                </div>
              </div>
            </div>
            `
                : ""
            }
            
            ${
              etinData.certificateType === "tax" ||
              etinData.certificateType === "both"
                ? `
            <div class="certificate-section">
              <h2 class="section-title">আয়কর তথ্য</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">আয়কর প্রদানের তারিখ</div>
                  <div class="info-value">${new Date().toLocaleDateString(
                    "bn-BD"
                  )}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">আয়কর পরিমাণ</div>
                  <div class="info-value">৳২৫,০০০</div>
                </div>
              </div>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="qr-code">
            QR Code
          </div>
          
          <div class="certificate-footer">
            <p>এই সনদটি বিকাশ ডিজিটাল প্ল্যাটফর্মের মাধ্যমে স্বয়ংক্রিয়ভাবে তৈরি করা হয়েছে</p>
            <p>হেল্পলাইন: ১৬২৪৭ | ইমেইল: support@bkash.com | ওয়েবসাইট: www.bkash.com</p>
            <p style="margin-top: 10px; font-size: 10px;">এই সনদটি শুধুমাত্র ১ বছরের জন্য বৈধ। যাচাইকরণের জন্য ভিজিট করুন: www.bkash.com/verify</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_${certTypeText}_${certificateNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
});

// Add required CSS styles for E-TIN info popup
const etinInfoStyles = document.createElement("style");
etinInfoStyles.textContent = `
  /* Style the list bullets */
  .etin-info-section ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 6px;
    height: 6px;
    background: #e2146c;
    border-radius: 50%;
  }

  /* Scrollbar styling */
  .popup-body::-webkit-scrollbar {
    width: 5px;
  }

  .popup-body::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .popup-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .popup-body::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
document.head.appendChild(etinInfoStyles);
