document.addEventListener("DOMContentLoaded", function () {
  // Update all form headers to use bKash logo instead of balance display
  updateFormHeaders();

  // Elements
  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  const numberNextBtn = document.getElementById("numberNextBtn");
  const backToNumberBtn = document.getElementById("backToNumberBtn");
  const backToAmountBtn = document.getElementById("backToAmountBtn");
  const clearSearchBtn = document.getElementById("clearSearch");

  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const operatorItems = document.querySelectorAll(".operator-item");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const amountTabBtns = document.querySelectorAll("[data-amount-tab]");
  const packageItems = document.querySelectorAll(".package-item");

  const rechargeBtn = document.getElementById("recharge-btn");
  const packageBtn = document.getElementById("package-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const selectedAmount = document.getElementById("selected-amount");

  // Variables
  let selectedContact = null;
  let selectedOperator = "gp";
  let currentAmount = 0;
  let selectedPackage = null;

  // Function to update all form headers to use bKash logo
  function updateFormHeaders() {
    // Find all form headers on the page and update them
    const formHeaders = document.querySelectorAll(".form-header-gradient");

    formHeaders.forEach((header) => {
      const headerContent = header.querySelector(".header-content");

      // If the header already has our structure, skip it
      if (headerContent && headerContent.querySelector(".header-logo")) {
        return;
      }

      // Remove the old balance container if it exists
      const balanceContainer =
        headerContent?.querySelector(".balance-container");
      if (balanceContainer) {
        balanceContainer.remove();
      }

      // Also remove balance-hidden and balance-visible if they exist
      const balanceHidden = headerContent?.querySelector("#balanceHidden");
      const balanceVisible = headerContent?.querySelector("#balanceVisible");
      if (balanceHidden) balanceHidden.remove();
      if (balanceVisible) balanceVisible.remove();

      // Create the new logo container
      const logoContainer = document.createElement("div");
      logoContainer.className = "header-logo";
      logoContainer.innerHTML =
        '<img src="images/bkashlogo.png" alt="বিকাশ লোগো" class="form-header-logo">';

      // Add the logo container to the header
      if (headerContent) {
        headerContent.appendChild(logoContainer);
      }
    });

    console.log("Form headers updated successfully");
  }

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      phoneInput.value = "";
      phoneInput.focus();
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
          const activeContent = document.getElementById(tabId + "Contacts");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
      });
    });
  }

  // Amount Tab switching
  if (amountTabBtns.length) {
    amountTabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabGroup = this.parentElement.querySelectorAll(".tab-btn");
        tabGroup.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");

        // Get tab content id
        const tabId = this.dataset.amountTab;
        if (tabId) {
          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => {
            content.classList.remove("active");
          });
          const activeContent = document.getElementById(tabId + "TabContent");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
      });
    });
  }

  // Navigation between sections with smooth transition
  if (numberNextBtn) {
    numberNextBtn.addEventListener("click", function () {
      // Validate phone number
      if (phoneInput.value.length >= 11 || selectedContact) {
        // Add exit animation to current section
        numberInputSection.style.opacity = "0";
        numberInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          numberInputSection.style.display = "none";

          // Show amount section with entrance animation
          amountInputSection.style.display = "block";
          amountInputSection.style.opacity = "0";
          amountInputSection.style.transform = "translateX(20px)";

          setTimeout(() => {
            amountInputSection.style.opacity = "1";
            amountInputSection.style.transform = "translateX(0)";
          }, 50);

          // Focus on amount input
          amountInput.focus();
        }, 200);
      } else {
        // Shake effect for validation error
        phoneInput.classList.add("shake-effect");
        setTimeout(() => {
          phoneInput.classList.remove("shake-effect");
        }, 600);

        // Show validation message
        const searchContainer = document.querySelector(".search-container");
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-message";
        validationMsg.textContent = "সঠিক মোবাইল নম্বর দিন";
        validationMsg.style.color = "#e74c3c";
        validationMsg.style.fontSize = "12px";
        validationMsg.style.textAlign = "center";
        validationMsg.style.padding = "5px";

        // Remove any existing validation message
        const existingMsg = searchContainer.querySelector(
          ".validation-message"
        );
        if (existingMsg) {
          existingMsg.remove();
        }

        searchContainer.appendChild(validationMsg);

        // Auto remove message after 3 seconds
        setTimeout(() => {
          validationMsg.style.opacity = "0";
          setTimeout(() => {
            validationMsg.remove();
          }, 300);
        }, 3000);
      }
    });
  }

  if (backToNumberBtn) {
    backToNumberBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show number section with entrance animation
        numberInputSection.style.display = "block";
        numberInputSection.style.opacity = "0";
        numberInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          numberInputSection.style.opacity = "1";
          numberInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Navigation to PIN section
  if (rechargeBtn) {
    rechargeBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show PIN section with entrance animation
        pinSection.style.display = "block";
        pinSection.style.opacity = "0";
        pinSection.style.transform = "translateX(20px)";

        selectedAmount.textContent = "৳" + formatNumber(currentAmount);

        setTimeout(() => {
          pinSection.style.opacity = "1";
          pinSection.style.transform = "translateX(0)";
          // Focus first PIN digit
          pinDigits[0].focus();
        }, 50);
      }, 200);
    });
  }

  if (packageBtn) {
    packageBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show PIN section with entrance animation
        pinSection.style.display = "block";
        pinSection.style.opacity = "0";
        pinSection.style.transform = "translateX(20px)";

        selectedAmount.textContent = "৳" + formatNumber(selectedPackage);

        setTimeout(() => {
          pinSection.style.opacity = "1";
          pinSection.style.transform = "translateX(0)";
          // Focus first PIN digit
          pinDigits[0].focus();
        }, 50);
      }, 200);
    });
  }

  if (backToAmountBtn) {
    backToAmountBtn.addEventListener("click", function () {
      // Add exit animation
      pinSection.style.opacity = "0";
      pinSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        pinSection.style.display = "none";

        // Show amount section with entrance animation
        amountInputSection.style.display = "block";
        amountInputSection.style.opacity = "0";
        amountInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          amountInputSection.style.opacity = "1";
          amountInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Contact selection
  contactItems.forEach((contact) => {
    contact.addEventListener("click", function () {
      // Add selection animation
      this.classList.add("selected-contact");

      // Get contact info
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      const initial = name.charAt(0);
      const avatarClass = this.querySelector(".contact-avatar").className;
      const gradient = avatarClass.split(" ")[1];
      const operatorBadge = this.querySelector(".operator-badge");
      const operator = operatorBadge.className.split(" ")[1];
      const operatorName = operatorBadge.textContent;

      // Store selected contact
      selectedContact = {
        name,
        number,
        initial,
        gradient,
        operator,
        operatorName,
      };

      // Set number input value
      phoneInput.value = number;

      // Highlight selected contact
      contactItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-contact");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        numberNextBtn.click();
      }, 500);
    });
  });

  // Operator selection
  operatorItems.forEach((item) => {
    item.addEventListener("click", function () {
      operatorItems.forEach((op) => op.classList.remove("active"));
      this.classList.add("active");

      // Get operator type from data attribute or class name
      const operatorImg = this.querySelector(".operator-icon img");
      const operatorSrc = operatorImg.getAttribute("alt").toLowerCase();

      if (operatorSrc.includes("গ্রামীণফোন")) {
        selectedOperator = "gp";
      } else if (operatorSrc.includes("রবি")) {
        selectedOperator = "robi";
      } else if (operatorSrc.includes("বাংলালিংক")) {
        selectedOperator = "bl";
      } else if (operatorSrc.includes("এয়ারটেল")) {
        selectedOperator = "airtel";
      } else if (operatorSrc.includes("টেলিটক")) {
        selectedOperator = "tt";
      }
    });
  });

  // Package selection
  packageItems.forEach((item) => {
    item.addEventListener("click", function () {
      packageItems.forEach((pack) => pack.classList.remove("active"));
      this.classList.add("active");

      // Get package price
      selectedPackage = parseInt(this.dataset.packagePrice);

      // Enable package button
      packageBtn.disabled = false;
    });
  });

  // Quick amount buttons
  quickAmountBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const amount = parseInt(this.dataset.amount);

      // Set value with visual feedback
      amountInput.value = amount;
      amountInput.style.transition = "all 0.2s";
      amountInput.style.transform = "scale(1.05)";

      setTimeout(() => {
        amountInput.style.transform = "scale(1)";
      }, 200);

      updateAmount(amount);
    });
  });

  // Process amount change
  function updateAmount(amount) {
    currentAmount = amount;

    // Remove active class from all quick amount buttons
    quickAmountBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to matching button
    quickAmountBtns.forEach((btn) => {
      const btnAmount = parseInt(btn.dataset.amount);
      if (btnAmount === currentAmount) {
        btn.classList.add("active");
      }
    });

    // Enable/disable recharge button
    if (currentAmount >= 10) {
      rechargeBtn.disabled = false;
    } else {
      rechargeBtn.disabled = true;
    }
  }

  // Amount input change
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      // Restrict to maximum allowed amount
      if (value > 1000) {
        value = 1000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        const maxNote = document.createElement("div");
        maxNote.className = "max-limit-note";
        maxNote.textContent = "সর্বোচ্চ ১,০০০ টাকা রিচার্জ করা যাবে";
        maxNote.style.color = "#e74c3c";
        maxNote.style.fontSize = "12px";
        maxNote.style.textAlign = "center";
        maxNote.style.padding = "5px";
        maxNote.style.marginTop = "10px";

        // Remove any existing note
        const existingNote = amountCard.querySelector(".max-limit-note");
        if (existingNote) {
          existingNote.remove();
        }

        amountCard.appendChild(maxNote);

        // Auto remove after 3 seconds
        setTimeout(() => {
          maxNote.style.opacity = "0";
          setTimeout(() => {
            maxNote.remove();
          }, 300);
        }, 3000);
      }

      updateAmount(value);
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
      confirmPinBtn.disabled = !allFilled;
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
      // Simulate PIN verification (correct PIN is 1234 for demo)
      let enteredPin = "";
      pinDigits.forEach((digit) => {
        enteredPin += digit.value;
      });

      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
      this.disabled = true;

      // Simulate processing
      setTimeout(() => {
        showSuccessMessage();
      }, 1500);
    });
  }

  // Show success message
  function showSuccessMessage() {
    // Create success modal
    const successModal = document.createElement("div");
    successModal.className = "success-modal";
    successModal.style.position = "fixed";
    successModal.style.top = "0";
    successModal.style.left = "0";
    successModal.style.width = "100%";
    successModal.style.height = "100%";
    successModal.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    successModal.style.display = "flex";
    successModal.style.alignItems = "center";
    successModal.style.justifyContent = "center";
    successModal.style.zIndex = "9999";

    // Success content
    const recipient = document.querySelector(".recipient-number").textContent;
    const amount = document.getElementById("selected-amount").textContent;

    successModal.innerHTML = `
      <div style="background-color: white; border-radius: 20px; width: 90%; max-width: 400px; text-align: center; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="width: 80px; height: 80px; margin: 0 auto 20px; color: #2ecc71;">
              <i class="fas fa-check-circle" style="font-size: 80px;"></i>
          </div>
          <h2 style="color: #333; margin-bottom: 10px;">রিচার্জ সফল হয়েছে!</h2>
          <p style="color: #666; margin-bottom: 20px;">${recipient} নম্বরে ${amount} টাকা সফলভাবে রিচার্জ করা হয়েছে</p>
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 15px; margin-bottom: 25px; text-align: left;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #666;">ট্রানজেকশন আইডি</span>
                  <span style="color: #333; font-weight: 500;">TXN${Math.floor(
                    Math.random() * 10000000
                  )}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #666;">তারিখ ও সময়</span>
                  <span style="color: #333; font-weight: 500;">${new Date().toLocaleString(
                    "bn-BD"
                  )}</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #eee; padding-top: 10px; margin-top: 5px;">
                  <span style="color: #666; font-weight: 500;">মোট</span>
                  <span style="color: #1c2e58; font-weight: 600;">${amount}</span>
              </div>
          </div>
          <button id="doneBtn" style="background: linear-gradient(135deg, #1c2e58 0%, #112555 100%); color: white; border: none; border-radius: 12px; padding: 14px; width: 100%; font-size: 16px; font-weight: 600; cursor: pointer;">ঠিক আছে</button>
      </div>
    `;

    document.body.appendChild(successModal);

    // Add click handler for done button
    const doneBtn = document.getElementById("doneBtn");
    doneBtn.addEventListener("click", function () {
      document.body.removeChild(successModal);
      resetForm();
    });
  }

  // Reset form
  function resetForm() {
    // Reset values
    phoneInput.value = "";
    amountInput.value = "";
    selectedContact = null;
    currentAmount = 0;
    selectedPackage = null;

    // Reset sections
    pinSection.style.display = "none";
    amountInputSection.style.display = "none";
    numberInputSection.style.display = "block";
    numberInputSection.style.opacity = "1";
    numberInputSection.style.transform = "translateX(0)";

    // Reset buttons
    rechargeBtn.disabled = true;
    rechargeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> রিচার্জ করুন';
    packageBtn.disabled = true;
    confirmPinBtn.disabled = true;
    confirmPinBtn.innerHTML = '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';

    // Clear PIN inputs
    pinDigits.forEach((digit) => {
      digit.value = "";
    });

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));
    packageItems.forEach((item) => item.classList.remove("active"));
  }
});
