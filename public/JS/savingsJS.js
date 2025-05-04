document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const newSavingsButton = document.querySelector(".new-savings-button");
  const savingsOptions = document.querySelectorAll(".savings-option");

  // Event Listeners
  newSavingsButton.addEventListener("click", function () {
    showSavingsTypeSelection();
  });

  savingsOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const optionText = this.querySelector(".option-text p").textContent;

      if (optionText.includes("আয়কর সনদ")) {
        alert("রিটার্ন ও আয়কর সনদ পেজে নিয়ে যাওয়া হচ্ছে...");
      } else if (optionText.includes("জিজ্ঞাসা")) {
        alert("সাধারণ জিজ্ঞাসা পেজে নিয়ে যাওয়া হচ্ছে...");
      }
    });
  });

  // Helper function to close popups
  function closePopup(overlay, popup) {
    if (overlay) document.body.removeChild(overlay);
    if (popup) document.body.removeChild(popup);
  }

  // Function to validate form in step 2
  function validateSavingsForm(state) {
    return state.frequency && state.tenure && state.amount;
  }

  // Function to calculate projected returns
  function calculateReturns(type, frequency, tenure, amount) {
    let rate = type === "dps" ? 0.085 : 0.08;
    let period = frequency === "weekly" ? tenure * 4 : tenure;
    let totalDeposit = amount * period;
    let interest = totalDeposit * rate * (tenure / 12);

    return {
      totalDeposit: totalDeposit,
      interest: interest,
      maturityAmount: totalDeposit + interest,
    };
  }

  // Function to show savings type selection popup (Step 1)
  function showSavingsTypeSelection() {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);

    // Create popup
    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>সেভিংস</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="step-container">
          <div class="step">
            <div class="step-circle active">১</div>
            <div class="step-line"></div>
            <div class="step-circle">২</div>
            <div class="step-line"></div>
            <div class="step-circle">৩</div>
          </div>
        </div>
        
        <div class="step-info">
          <h4>স্কিম বাছাই</h4>
        </div>
        
        <div class="savings-types">
          <div class="savings-type" data-type="dps">
            <div class="type-icon dps">
              <i class="fas fa-piggy-bank"></i>
            </div>
            <div class="type-text">
              <div class="type-title">ডিপিএস</div>
              <div class="type-desc">মূলধারাভিত্তিক</div>
            </div>
            <div class="type-arrow">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div class="savings-type" data-type="islamic">
            <div class="type-icon islamic">
              <i class="fas fa-mosque"></i>
            </div>
            <div class="type-text">
              <div class="type-title">ইসলামিক ডিপিএস</div>
              <div class="type-desc">শরিয়াভিত্তিক</div>
            </div>
            <div class="type-arrow">
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

    const savingsTypes = popup.querySelectorAll(".savings-type");
    savingsTypes.forEach((type) => {
      type.addEventListener("click", function () {
        const savingsType = this.getAttribute("data-type");
        savingsTypes.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        setTimeout(() => {
          closePopup(overlay, popup);
          showSavingsDetailsSelection(savingsType);
        }, 300);
      });
    });
  }

  // Function to show savings details selection (Step 2)
  function showSavingsDetailsSelection(savingsType) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

    const savingsState = {
      type: savingsType,
      frequency: null,
      tenure: null,
      amount: null,
    };

    const popup = document.createElement("div");
    popup.className = "savings-popup";

    const typeTitle = savingsType === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>সেভিংস</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="step-container">
          <div class="step">
            <div class="step-circle active">১</div>
            <div class="step-line active"></div>
            <div class="step-circle active">২</div>
            <div class="step-line"></div>
            <div class="step-circle">৩</div>
          </div>
        </div>
        
        <div class="step-info">
          <h4>প্রতিষ্ঠান বাছাই</h4>
        </div>
        
        <div class="popup-form">
          <div class="form-group">
            <label class="form-label">${typeTitle} এর ধরন</label>
            <div class="form-select frequency-select">ধরন বেছে নিন</div>
            <div class="dropdown-options frequency-options">
              <div class="dropdown-option" data-value="weekly">সাপ্তাহিক</div>
              <div class="dropdown-option" data-value="monthly">মাসিক</div>
            </div>
          </div>
          
          <div class="form-group" style="display: none;">
            <label class="form-label">মেয়াদ</label>
            <div class="form-select tenure-select">মেয়াদ বেছে নিন</div>
            <div class="dropdown-options tenure-options">
              <div class="dropdown-option" data-value="6">৬ মাস</div>
              <div class="dropdown-option" data-value="12">১২ মাস</div>
              <div class="dropdown-option" data-value="24">২৪ মাস</div>
              <div class="dropdown-option" data-value="36">৩৬ মাস</div>
              <div class="dropdown-option" data-value="60">৬০ মাস</div>
            </div>
          </div>
          
          <div class="form-group" style="display: none;">
            <label class="form-label">পরিমাণ</label>
            <div class="form-select amount-select">জমার পরিমাণ বেছে নিন</div>
            <div class="dropdown-options amount-options">
              <div class="dropdown-option" data-value="250">৳২৫০</div>
              <div class="dropdown-option" data-value="500">৳৫০০</div>
              <div class="dropdown-option" data-value="1000">৳১০০০</div>
              <div class="dropdown-option" data-value="2000">৳২০০০</div>
              <div class="dropdown-option" data-value="5000">৳৫০০০</div>
              <div class="dropdown-option" data-value="10000">৳১০০০০</div>
            </div>
          </div>
          
          <div class="available-balance">ব্যবহারযোগ্য ব্যালেন্স: ৳৩০.৭৯</div>
          
          <button class="action-button next-button" disabled>
            এগিয়ে যান
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Get form elements
    const frequencySelect = popup.querySelector(".frequency-select");
    const frequencyOptions = popup.querySelector(".frequency-options");
    const tenureGroup = popup.querySelectorAll(".form-group")[1];
    const tenureSelect = popup.querySelector(".tenure-select");
    const tenureOptions = popup.querySelector(".tenure-options");
    const amountGroup = popup.querySelectorAll(".form-group")[2];
    const amountSelect = popup.querySelector(".amount-select");
    const amountOptions = popup.querySelector(".amount-options");
    const nextButton = popup.querySelector(".next-button");
    const backButton = popup.querySelector(".back-button-btn");

    // Toggle dropdown function
    function toggleDropdown(select, options) {
      options.style.display =
        options.style.display === "block" ? "none" : "block";

      const allDropdowns = popup.querySelectorAll(".dropdown-options");
      allDropdowns.forEach((dropdown) => {
        if (dropdown !== options) {
          dropdown.style.display = "none";
        }
      });
    }

    // Event listeners for dropdowns
    frequencySelect.addEventListener("click", () =>
      toggleDropdown(frequencySelect, frequencyOptions)
    );

    tenureSelect.addEventListener("click", () =>
      toggleDropdown(tenureSelect, tenureOptions)
    );

    amountSelect.addEventListener("click", () =>
      toggleDropdown(amountSelect, amountOptions)
    );

    // Event listeners for dropdown options
    frequencyOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        frequencySelect.textContent = text;
        frequencyOptions.style.display = "none";
        savingsState.frequency = value;

        // Show tenure group
        tenureGroup.style.display = "block";
      });
    });

    tenureOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        tenureSelect.textContent = text;
        tenureOptions.style.display = "none";
        savingsState.tenure = parseInt(value);

        // Show amount group
        amountGroup.style.display = "block";
      });
    });

    amountOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        amountSelect.textContent = text;
        amountOptions.style.display = "none";
        savingsState.amount = parseInt(value);

        // Enable next button
        nextButton.disabled = !validateSavingsForm(savingsState);
        if (!nextButton.disabled) {
          nextButton.style.background =
            "linear-gradient(135deg, #e2146c 0%, #a4126a 100%)";
          nextButton.style.cursor = "pointer";
        }
      });
    });

    // Back button event listener
    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showSavingsTypeSelection();
    });

    // Next button event listener
    nextButton.addEventListener("click", function () {
      if (!nextButton.disabled) {
        closePopup(overlay, popup);
        showBankSelection(savingsState);
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
          const allDropdowns = popup.querySelectorAll(".dropdown-options");
          allDropdowns.forEach((dropdown) => {
            dropdown.style.display = "none";
          });
        }
      },
      { capture: true }
    );
  }

  // Function to show bank selection (Step 3)
  function showBankSelection(state) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

    const banks = [
      { name: "IDLC Finance PLC", rate: "8.75%", logo: "idlc.png" },
      { name: "Dhaka Bank PLC", rate: "8.5%", logo: "dhaka-bank.png" },
      { name: "BRAC Bank PLC", rate: "8.0%", logo: "brac-bank.png" },
    ];

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>সেভিংস</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="step-container">
          <div class="step">
            <div class="step-circle active">১</div>
            <div class="step-line active"></div>
            <div class="step-circle active">২</div>
            <div class="step-line active"></div>
            <div class="step-circle active">৩</div>
          </div>
        </div>
        
        <div class="step-info">
          <h4>ব্যাংক বাছাই</h4>
        </div>
        
        <div class="bank-selection">
          ${banks
            .map(
              (bank) => `
            <div class="bank-item" data-bank="${bank.name}">
              <div class="bank-logo">
                <img src="images/${bank.logo}" alt="${bank.name}">
              </div>
              <div class="bank-info">
                <p class="bank-name">${bank.name}</p>
                <div class="bank-rate">
                  <span class="rate-value">${bank.rate}</span>
                  <span class="rate-label">মুনাফার হার p.a.</span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Event listeners
    const backButton = popup.querySelector(".back-button-btn");
    const bankItems = popup.querySelectorAll(".bank-item");

    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showSavingsDetailsSelection(state.type);
    });

    bankItems.forEach((item) => {
      item.addEventListener("click", function () {
        const selectedBank = this.getAttribute("data-bank");
        state.bank = selectedBank;

        closePopup(overlay, popup);
        showSavingsConfirmation(state);
      });
    });
  }

  // Function to show savings confirmation
  function showSavingsConfirmation(state) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

    const returns = calculateReturns(
      state.type,
      state.frequency,
      state.tenure,
      state.amount
    );

    const typeText = state.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText = state.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const tenureText = `${state.tenure} মাস`;
    const depositText = `৳${state.amount}`;
    const totalDepositText = `৳${returns.totalDeposit}`;
    const interestText = `৳${Math.round(returns.interest)}`;
    const maturityText = `৳${Math.round(returns.maturityAmount)}`;

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>সেভিংস নিশ্চিত করুন</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body">
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">ব্যাংক</span>
            <span class="summary-value">${state.bank}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">সেভিংসের ধরন</span>
            <span class="summary-value">${typeText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">ধরন</span>
            <span class="summary-value">${frequencyText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">মেয়াদ</span>
            <span class="summary-value">${tenureText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">জমার পরিমাণ</span>
            <span class="summary-value">${depositText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">মোট জমা</span>
            <span class="summary-value">${totalDepositText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">সম্ভাব্য আয়</span>
            <span class="summary-value">${interestText}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">মেয়াদান্তে প্রাপ্তি</span>
            <span class="summary-value highlight">${maturityText}</span>
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
      showBankSelection(state);
    });

    confirmButton.addEventListener("click", function () {
      closePopup(overlay, popup);
      showPINEntry(state);
    });
  }

  // Function to show PIN entry
  function showPINEntry(state) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

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
          <p class="pin-label">আপনার ৫ ডিজিটের পিন নম্বর দিন</p>
          <div class="pin-input-group">
            <input type="password" class="pin-input" maxlength="1" data-index="0">
            <input type="password" class="pin-input" maxlength="1" data-index="1">
            <input type="password" class="pin-input" maxlength="1" data-index="2">
            <input type="password" class="pin-input" maxlength="1" data-index="3">
            <input type="password" class="pin-input" maxlength="1" data-index="4">
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
      showSavingsConfirmation(state);
    });

    submitButton.addEventListener("click", function () {
      if (!submitButton.disabled) {
        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");
        state.pin = pin;

        closePopup(overlay, popup);
        showSuccessMessage(state);
      }
    });
  }

  // Enhanced function to show success message
  function showSuccessMessage(state) {
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);
    }

    const accountNumber =
      "DPS" + Math.floor(10000000 + Math.random() * 90000000);

    const typeText = state.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText = state.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const amountText = `৳${state.amount}`;

    // Create enhanced success popup with fixed size and scrollable content
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.innerHTML = `
    <div class="success-header">
      <div class="success-header-content">
        <div style="width: 36px;"></div>
        <div class="success-header-title">সেভিংস সফল</div>
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
        <p class="success-message">আপনার ${typeText} সেভিংস সফলভাবে খোলা হয়েছে</p>
        
        <div class="account-details-card">
          <div class="account-detail-row">
            <span class="account-label">সেভিংস অ্যাকাউন্ট নম্বর</span>
            <span class="account-value">${accountNumber}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">ব্যাংক</span>
            <span class="account-value">${state.bank}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">ধরন</span>
            <span class="account-value">${frequencyText}</span>
          </div>
          <div class="account-detail-row">
            <span class="account-label">জমার পরিমাণ</span>
            <span class="account-value">${amountText}</span>
          </div>
        </div>
        
        <!-- Additional info to demonstrate scrolling -->
        <div class="additional-info" style="background-color: #f0f9f4; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
          <h4 style="color: #11998e; margin-bottom: 10px; font-size: 16px;">আপনার সেভিংস সম্পর্কে বিস্তারিত</h4>
          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 10px;">
            আপনার সেভিংস অ্যাকাউন্ট সফলভাবে খোলা হয়েছে। মেয়াদান্তে আপনি লাভসহ আপনার টাকা ফেরত পাবেন।
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
          ডাউনলোড
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
      downloadSavingsDetails(state, accountNumber);
    });
  }

  // This function replaces the existing showSuccessMessage function in savingsJS.js
  // Make sure to in
  // Function to download savings details
  function downloadSavingsDetails(state, accountNumber) {
    const typeText = state.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText = state.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const tenureText = `${state.tenure} মাস`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>বিকাশ সেভিংস - ${typeText}</title>
        <style>
          body {
            font-family: 'Hind Siliguri', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
          }
          .header h1 {
            color: #38ef7d;
            margin-bottom: 5px;
            font-size: 28px;
          }
          .header h2 {
            color: #333;
            font-size: 22px;
            margin-top: 0;
          }
          .success-badge {
            display: inline-block;
            background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-top: 10px;
          }
          .details {
            margin: 30px 0;
            background-color: #f9f9f9;
            border-radius: 12px;
            padding: 20px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            color: #666;
            font-size: 15px;
          }
          .detail-value {
            font-weight: 600;
            color: #333;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo img {
            height: 40px;
          }
          .confirmation-number {
            background-color: #f1f9f6;
            border: 1px dashed #38ef7d;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
          }
          .confirmation-number p {
            margin: 0;
            color: #333;
            font-size: 14px;
          }
          .confirmation-number strong {
            display: block;
            font-size: 18px;
            color: #11998e;
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
          </div>
          
          <div class="header">
            <h1>বিকাশ সেভিংস</h1>
            <h2>${typeText}</h2>
            <div class="success-badge">সফলভাবে খোলা হয়েছে</div>
          </div>
          
          <div class="confirmation-number">
            <p>আপনার সেভিংস অ্যাকাউন্ট নম্বর</p>
            <strong>${accountNumber}</strong>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">ব্যাংক</span>
              <span class="detail-value">${state.bank}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">সেভিংসের ধরন</span>
              <span class="detail-value">${typeText}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">ফ্রিকোয়েন্সি</span>
              <span class="detail-value">${frequencyText}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">মেয়াদ</span>
              <span class="detail-value">${tenureText}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">জমার পরিমাণ</span>
              <span class="detail-value">৳${state.amount}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">তারিখ</span>
              <span class="detail-value">${new Date().toLocaleDateString(
                "bn-BD"
              )}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>এই ডকুমেন্টটি আপনার বিকাশ সেভিংস একাউন্টের প্রমাণ হিসেবে ব্যবহার করা যাবে।</p>
            <p>বিস্তারিত তথ্যের জন্য কল করুন: ১৬২৪৭</p>
            <p>© ${new Date().getFullYear()} বিকাশ লিমিটেড</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Savings_${accountNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
});

// Add custom CSS for improved styling of success page
const successStyles = document.createElement("style");
successStyles.textContent = `
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
document.head.appendChild(successStyles);
