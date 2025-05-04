document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  const agentSection = document.getElementById("agentSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  const agentNextBtn = document.getElementById("agentNextBtn");
  const backToAgentBtn = document.getElementById("backToAgentBtn");
  const backToAmountBtn = document.getElementById("backToAmountBtn");
  const clearSearchBtn = document.getElementById("clearSearch");
  const tabItems = document.querySelectorAll(".tab-item");
  const tabIndicator = document.querySelector(".tab-indicator");

  const agentInput = document.getElementById("agent-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const agentItems = document.querySelectorAll(".agent-item");

  const cashoutBtn = document.getElementById("cashout-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const selectedAmount = document.getElementById("selected-amount");
  const warningSection = document.querySelector(".warning-section");

  // Forms
  const agentSearchForm = document.getElementById("agentSearchForm");
  const amountForm = document.getElementById("amountForm");
  const pinForm = document.getElementById("pinForm");

  // Variables
  let selectedAgent = null;
  let currentAmount = 0;

  // Prevent default form submission
  if (agentSearchForm) {
    agentSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (amountForm) {
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (pinForm) {
    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  // Balance toggle with animation - Fixed for reliable operation
  if (showBalanceBtn) {
    showBalanceBtn.addEventListener("click", function () {
      // Ensure elements exist before using them
      if (balanceHidden && balanceVisible) {
        // First set transition
        balanceHidden.style.transition = "opacity 0.15s ease";
        balanceVisible.style.transition = "opacity 0.15s ease";

        // Hide the dots container
        balanceHidden.style.opacity = "0";

        // Use a setTimeout to allow the transition to complete
        setTimeout(() => {
          // Hide dots container and show amount container
          balanceHidden.style.display = "none";
          balanceVisible.style.display = "flex";

          // Force browser reflow to ensure transition works
          void balanceVisible.offsetWidth;

          // Fade in the amount container
          balanceVisible.style.opacity = "1";
        }, 150);
      }
    });
  }

  if (hideBalanceBtn) {
    hideBalanceBtn.addEventListener("click", function () {
      // Ensure elements exist before using them
      if (balanceHidden && balanceVisible) {
        // Set transition
        balanceHidden.style.transition = "opacity 0.15s ease";
        balanceVisible.style.transition = "opacity 0.15s ease";

        // Fade out amount container
        balanceVisible.style.opacity = "0";

        // Use a setTimeout to allow the transition to complete
        setTimeout(() => {
          // Hide amount container and show dots container
          balanceVisible.style.display = "none";
          balanceHidden.style.display = "flex";

          // Force browser reflow to ensure transition works
          void balanceHidden.offsetWidth;

          // Fade in dots container
          balanceHidden.style.opacity = "1";
        }, 150);
      }
    });
  }

  // Tab switching
  if (tabItems.length) {
    tabItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all tabs
        tabItems.forEach((tab) => tab.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Move the tab indicator
        const tabIndex = Array.from(tabItems).indexOf(this);
        tabIndicator.style.left = tabIndex * 50 + "%";
      });
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      agentInput.value = "";
      agentInput.focus();
    });
  }

  // Navigation between sections with smooth transition
  if (agentNextBtn) {
    agentNextBtn.addEventListener("click", function () {
      // Validate agent number or selection
      if (agentInput.value.length >= 11 || selectedAgent) {
        // Add exit animation to current section
        agentSection.style.opacity = "0";
        agentSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          agentSection.style.display = "none";

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
        agentInput.classList.add("shake-effect");
        setTimeout(() => {
          agentInput.classList.remove("shake-effect");
        }, 600);

        // Show validation message
        const searchContainer = document.querySelector(".search-container");
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-message";
        validationMsg.textContent = "সঠিক এজেন্ট নম্বর দিন";
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

  if (backToAgentBtn) {
    backToAgentBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show agent section with entrance animation
        agentSection.style.display = "block";
        agentSection.style.opacity = "0";
        agentSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          agentSection.style.opacity = "1";
          agentSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Navigation to PIN section
  if (cashoutBtn) {
    cashoutBtn.addEventListener("click", function () {
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

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Agent items selection
  agentItems.forEach((agent) => {
    agent.addEventListener("click", function () {
      // Add selection animation
      this.classList.add("selected-agent");

      // Get agent info
      const name = this.querySelector(".agent-name").textContent;
      const number = this.querySelector(".agent-number").textContent;

      // Store selected agent
      selectedAgent = {
        name,
        number,
      };

      // Set agent input value
      agentInput.value = number;

      // Highlight selected agent
      agentItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-agent");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        agentNextBtn.click();
      }, 300);
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

    // Calculate charge
    let charge = 0;
    if (amount <= 1000) {
      charge = Math.ceil(amount * 0.0185);
    } else if (amount <= 5000) {
      charge = Math.ceil(amount * 0.015);
    } else {
      charge = Math.ceil(amount * 0.0125);
    }

    // Update fee display
    const feeAmount = document.querySelectorAll(".fee-amount");
    if (feeAmount.length >= 2) {
      feeAmount[0].textContent = "৳" + charge;
    }

    // Check if amount is greater than balance
    const balance = 357.04; // From the UI balance display

    if (amount + charge > balance) {
      // Show warning message
      warningSection.style.display = "flex";
      cashoutBtn.disabled = true;
    } else {
      // Hide warning message
      warningSection.style.display = "none";

      // Enable/disable cashout button
      if (currentAmount >= 50) {
        cashoutBtn.disabled = false;
      } else {
        cashoutBtn.disabled = true;
      }
    }
  }

  // Amount input change
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      // Restrict to maximum allowed amount
      if (value > 25000) {
        value = 25000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        const maxNote = document.createElement("div");
        maxNote.className = "max-limit-note";
        maxNote.textContent = "সর্বোচ্চ ২৫,০০০ টাকা ক্যাশ আউট করা যাবে";
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
      // Simulate PIN verification (correct PIN is 12345 for demo)
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
    const agentName = document.querySelector(".recipient-name").textContent;
    const agentNumber = document.querySelector(".recipient-number").textContent;
    const amount = document.getElementById("selected-amount").textContent;

    successModal.innerHTML = `
                    <div style="background-color: white; border-radius: 20px; width: 90%; max-width: 400px; text-align: center; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <div style="width: 80px; height: 80px; margin: 0 auto 20px; color: #2ecc71;">
                            <i class="fas fa-check-circle" style="font-size: 80px;"></i>
                        </div>
                        <h2 style="color: #333; margin-bottom: 10px;">ক্যাশ আউট সফল হয়েছে!</h2>
                        <p style="color: #666; margin-bottom: 20px;">${agentName} (${agentNumber}) থেকে ${amount} টাকা সফলভাবে ক্যাশ আউট করা হয়েছে</p>
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
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <span style="color: #666;">চার্জ</span>
                                <span style="color: #333; font-weight: 500;">৳১৮.৫০</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; border-top: 1px solid #eee; padding-top: 10px; margin-top: 5px;">
                                <span style="color: #666; font-weight: 500;">নতুন ব্যালেন্স</span>
                                <span style="color: #e2146c; font-weight: 600;">৳৩৩৮.৫৪</span>
                            </div>
                        </div>
                        <button id="doneBtn" style="background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%); color: white; border: none; border-radius: 12px; padding: 14px; width: 100%; font-size: 16px; font-weight: 600; cursor: pointer;">ঠিক আছে</button>
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
    agentInput.value = "";
    amountInput.value = "";
    selectedAgent = null;
    currentAmount = 0;

    // Reset sections
    pinSection.style.display = "none";
    amountInputSection.style.display = "none";
    agentSection.style.display = "block";
    agentSection.style.opacity = "1";
    agentSection.style.transform = "translateX(0)";

    // Reset buttons
    cashoutBtn.disabled = true;
    cashoutBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ক্যাশ আউট করুন';
    confirmPinBtn.disabled = true;
    confirmPinBtn.innerHTML = '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';

    // Clear PIN inputs
    pinDigits.forEach((digit) => {
      digit.value = "";
    });

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    agentItems.forEach((item) => item.classList.remove("selected-agent"));

    // Hide warning section
    if (warningSection) {
      warningSection.style.display = "none";
    }
  }
});
