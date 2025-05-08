// agentRequest.js

document.addEventListener("DOMContentLoaded", function () {
  // Main Elements
  const mainContainer = document.querySelector(".transaction-container");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const contactsList = document.getElementById("contactsList");
  const contactItems = document.querySelectorAll(".contact-item");

  // Initialize the UI state
  let currentPage = "main"; // 'main', 'customerVerify', 'amount', 'pin', 'success', 'history', 'activeRequests'
  let currentCustomer = null;
  let currentAmount = 0;
  let commissionRate = 0.015; // 1.5% commission for agent

  // Utility Functions
  function createPopup(title, content) {
    // Remove any existing popup
    removePopup();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create container
    const container = document.createElement("div");
    container.className = "popup-container";

    // Create header with gradient
    const header = document.createElement("div");
    header.className = "form-header-gradient";

    const headerContent = document.createElement("div");
    headerContent.className = "header-content";

    const backButton = document.createElement("div");
    backButton.className = "back-button";
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backButton.addEventListener("click", handleBackButton);

    const headerTitle = document.createElement("div");
    headerTitle.className = "header-title";
    headerTitle.innerHTML = `<h3>${title}</h3>`;

    const logoContainer = document.createElement("div");
    logoContainer.className = "bkash-logo";
    logoContainer.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 50px;">';

    headerContent.appendChild(backButton);
    headerContent.appendChild(headerTitle);
    headerContent.appendChild(logoContainer);
    header.appendChild(headerContent);

    // Add content
    const contentContainer = document.createElement("div");
    contentContainer.className = "transaction-form";
    contentContainer.innerHTML = content;

    container.appendChild(header);
    container.appendChild(contentContainer);
    overlay.appendChild(container);

    // Add animation classes after a small delay to trigger transitions
    setTimeout(() => {
      overlay.classList.add("show");
      container.classList.add("show");

      // Apply blur to main container
      if (mainContainer) {
        mainContainer.classList.add("blur");
      }
    }, 10);

    // Close popup when clicking outside the container
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        removePopup();
        resetMainPage();
      }
    });

    return { overlay, container, contentContainer };
  }

  function removePopup() {
    const overlay = document.querySelector(".popup-overlay");
    if (overlay) {
      const container = overlay.querySelector(".popup-container");
      overlay.classList.remove("show");
      if (container) {
        container.classList.remove("show");
      }

      // Remove after animation completes
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }

    // Reset main container if it was blurred
    if (mainContainer) {
      mainContainer.classList.remove("blur");
    }
  }

  function validateBangladeshiNumber(number) {
    // Validate Bangladeshi phone numbers
    // Must start with 013, 014, 015, 016, 017, 018, or 019 and be 11 digits
    // First normalize the number by removing spaces, dashes, etc.
    const cleanNumber = number.replace(/[\s-]+/g, "");

    // Check if number starts with +880, remove it
    let processedNumber = cleanNumber;
    if (processedNumber.startsWith("+880")) {
      processedNumber = processedNumber.substring(4);
    }
    // Check if number starts with 880, remove it
    else if (processedNumber.startsWith("880")) {
      processedNumber = processedNumber.substring(3);
    }

    // Add 0 at beginning if number starts directly with 1
    if (processedNumber.startsWith("1")) {
      processedNumber = "0" + processedNumber;
    }

    // Now validate with regex
    const regex = /^01[3-9]\d{8}$/;
    return regex.test(processedNumber);
  }

  // PART 1: CONTACT SELECTION AND SEARCH FUNCTIONALITY

  // Handle contact item click
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      showCustomerVerifyPopup(name, number);
    });
  });

  // Handle search functionality
  searchBtn.addEventListener("click", function () {
    processSearchInput();
  });

  // Function to process search input - handles both customer search and direct number entry
  function processSearchInput() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
      alert("অনুগ্রহ করে গ্রাহকের নাম বা বিকাশ নাম্বার দিন।");
      return;
    }

    // Check if it's a valid phone number
    if (validateBangladeshiNumber(searchTerm)) {
      // Valid bKash number entered - proceed directly with verification
      showCustomerVerifyPopup("নতুন বিকাশ গ্রাহক", searchTerm);
      return;
    }

    // If not a valid number, check if it's a partial number
    if (/^\d+$/.test(searchTerm)) {
      // Numeric but not a valid bKash number
      alert(
        "অবৈধ বিকাশ নাম্বার। সঠিক ১১ ডিজিটের বিকাশ নাম্বার দিন। উদাহরণ: ০১৭XXXXXXXX"
      );
      return;
    }

    // Search through contacts
    let found = false;
    contactItems.forEach((item) => {
      const name = item
        .querySelector(".contact-name")
        .textContent.toLowerCase();
      const number = item.querySelector(".contact-number").textContent;

      if (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        number.includes(searchTerm)
      ) {
        found = true;
        showCustomerVerifyPopup(
          item.querySelector(".contact-name").textContent,
          number
        );
        return;
      }
    });

    if (!found) {
      // No matching contact found
      alert(
        "কোন গ্রাহক পাওয়া যায়নি। একটি সঠিক বিকাশ নাম্বার দিন অথবা আবার চেষ্টা করুন।"
      );
    }
  }

  // PART 2: CUSTOMER VERIFICATION AND TRANSACTION FLOW

  function showCustomerVerifyPopup(name, number) {
    currentCustomer = { name, number };
    currentPage = "customerVerify";

    const initial = name.charAt(0);
    const colorClasses = [
      "blue",
      "yellow",
      "green",
      "purple",
      "pink",
      "light-green",
      "coral",
    ];
    const colorClass =
      colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const content = `
      <div class="recipient-info">
        <div class="contact-avatar ${colorClass}">
          <span>${initial}</span>
        </div>
        <div class="contact-info">
          <div class="contact-name">${name}</div>
          <div class="contact-number">${number}</div>
        </div>
      </div>
      
      <div class="customer-verification">
        <div class="verification-header">গ্রাহকের যাচাইকরণ</div>
        
        <div class="verification-item">
          <div class="verification-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="verification-text">
            বিকাশ সক্রিয় অ্যাকাউন্ট
          </div>
        </div>
        
        <div class="verification-item">
          <div class="verification-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="verification-text">
            KYC ভেরিফাইড
          </div>
        </div>
        
        <div class="verification-item">
          <div class="verification-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="verification-text">
            এজেন্ট টু কাস্টমার রিকোয়েস্টের জন্য যোগ্য
          </div>
        </div>
      </div>
      
      <div style="padding: 10px 15px 20px;">
        <div style="font-size: 15px; margin-bottom: 10px; color: #444;">
          এই নাম্বারে রিকোয়েস্ট মানি পাঠাতে চান?
        </div>
        <div style="font-size: 13px; color: #666; margin-bottom: 15px;">
          গ্রাহকের প্রোফাইল আইকন এবং নাম্বার সঠিক কিনা নিশ্চিত করুন। ভুল নাম্বারে রিকোয়েস্ট পাঠানো যাবে না।
        </div>
      </div>
      
      <div class="popup-footer">
        <button class="proceed-btn" id="verifyProceedBtn">পরবর্তী ধাপে যান</button>
      </div>
    `;

    const popup = createPopup("গ্রাহক যাচাইকরণ", content);

    // Add event listener to proceed button
    const verifyProceedBtn =
      popup.contentContainer.querySelector("#verifyProceedBtn");

    verifyProceedBtn.addEventListener("click", function () {
      removePopup();
      showAmountPopup(name, number);
    });
  }

  function showAmountPopup(name, number) {
    currentPage = "amount";

    const content = `
      <div class="recipient-info">
        <div class="contact-avatar blue">
          <span>${name.charAt(0)}</span>
        </div>
        <div class="contact-info">
          <div class="contact-name">${name}</div>
          <div class="contact-number">${number}</div>
        </div>
      </div>
      <div class="amount-field">
        <div class="amount-label">রিকোয়েস্ট পরিমাণ</div>
        <div class="amount-input-wrapper">
          <span class="currency-symbol">৳</span>
          <input type="text" class="amount-input" id="amountInput" placeholder="0.00" inputmode="numeric">
        </div>
        <div class="amount-limit">এজেন্ট রিকোয়েস্ট লিমিট: ৳100,000.00</div>
      </div>
      
      <div class="reference-field">
        <div class="reference-label">রেফারেন্স <span class="optional">(ঐচ্ছিক)</span></div>
        <input type="text" class="reference-input" id="referenceInput" placeholder="রেফারেন্স যোগ করুন">
      </div>
      
      <div class="note-field">
        <div class="note-label">গ্রাহকের জন্য নোট <span class="optional">(ঐচ্ছিক)</span></div>
        <textarea class="note-input" id="noteInput" placeholder="গ্রাহকের জন্য নোট লিখুন" maxlength="50"></textarea>
        <div class="character-count"><span id="charCount">0</span>/50</div>
      </div>
      
      <div id="commissionBlock" style="padding: 0 15px; margin-bottom: 15px;">
        <div class="commission-info">
          <div class="commission-title">এজেন্ট কমিশন (1.5%)</div>
          <div class="commission-value">৳0.00</div>
        </div>
      </div>
      
      <div class="popup-footer">
        <button class="proceed-btn" id="proceedBtn">এগিয়ে যান</button>
      </div>
    `;

    const popup = createPopup("রিকোয়েস্ট মানি", content);

    // Add event listener to proceed button
    const proceedBtn = popup.contentContainer.querySelector("#proceedBtn");
    const amountInput = popup.contentContainer.querySelector("#amountInput");
    const noteInput = popup.contentContainer.querySelector("#noteInput");
    const charCount = popup.contentContainer.querySelector("#charCount");
    const commissionValue =
      popup.contentContainer.querySelector(".commission-value");

    // Character count for note
    noteInput.addEventListener("input", function () {
      charCount.textContent = this.value.length;
    });

    // Amount input validation and commission calculation
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters except decimal point
      this.value = this.value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = this.value.split(".");
      if (parts.length > 2) {
        this.value = parts[0] + "." + parts.slice(1).join("");
      }

      // Limit to two decimal places
      if (parts.length > 1 && parts[1].length > 2) {
        this.value = parts[0] + "." + parts[1].substring(0, 2);
      }

      // Calculate commission
      const amount = parseFloat(this.value) || 0;
      const commission = amount * commissionRate;
      commissionValue.textContent = `৳${commission.toFixed(2)}`;
    });

    proceedBtn.addEventListener("click", function () {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 100000) {
        alert("রিকোয়েস্ট লিমিট ৳100,000.00 এর বেশি হতে পারবে না।");
        return;
      }

      currentAmount = amount;
      removePopup();
      showPinPopup();
    });
  }

  function showPinPopup() {
    currentPage = "pin";

    const content = `
      <div class="pin-entry-section" style="padding: 30px 20px;">
        <div class="pin-instruction" style="font-size: 16px; color: #333; margin-bottom: 25px; text-align: center;">
          অনুগ্রহ করে আপনার এজেন্ট পিন নাম্বার প্রবেশ করুন
        </div>
        <div class="pin-amount" style="text-align: center; margin-bottom: 30px;">
          <div class="amount-value" style="font-size: 28px; font-weight: 600; color: #198ae2;">৳${currentAmount.toFixed(
            2
          )}</div>
          <div style="font-size: 14px; color: #666; margin-top: 5px;">
            কমিশন: ৳${(currentAmount * commissionRate).toFixed(2)}
          </div>
        </div>
        <div class="pin-input-container" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 40px;">
          <input type="password" maxlength="1" class="pin-input pin-input-1" inputmode="numeric" 
                 style="width: 45px; height: 45px; border: 2px solid #ddd; border-radius: 8px; text-align: center; font-size: 22px; background-color: #f9f9f9;">
          <input type="password" maxlength="1" class="pin-input pin-input-2" inputmode="numeric"
                 style="width: 45px; height: 45px; border: 2px solid #ddd; border-radius: 8px; text-align: center; font-size: 22px; background-color: #f9f9f9;">
          <input type="password" maxlength="1" class="pin-input pin-input-3" inputmode="numeric"
                 style="width: 45px; height: 45px; border: 2px solid #ddd; border-radius: 8px; text-align: center; font-size: 22px; background-color: #f9f9f9;">
          <input type="password" maxlength="1" class="pin-input pin-input-4" inputmode="numeric"
                 style="width: 45px; height: 45px; border: 2px solid #ddd; border-radius: 8px; text-align: center; font-size: 22px; background-color: #f9f9f9;">
          <input type="password" maxlength="1" class="pin-input pin-input-5" inputmode="numeric"
                 style="width: 45px; height: 45px; border: 2px solid #ddd; border-radius: 8px; text-align: center; font-size: 22px; background-color: #f9f9f9;">
        </div>
        <div style="text-align: center; color: #666; font-size: 14px; margin-bottom: 30px;">
          পিন দিয়ে আপনি এই লেনদেন নিশ্চিত করছেন
        </div>
      </div>
      <div class="popup-footer">
        <button class="proceed-btn" id="confirmPinBtn">কনফার্ম করুন</button>
      </div>
    `;

    const popup = createPopup("এজেন্ট পিন এন্ট্রি", content);

    // Pin input behavior
    const pinInputs = popup.contentContainer.querySelectorAll(".pin-input");
    const confirmPinBtn =
      popup.contentContainer.querySelector("#confirmPinBtn");

    let currentPinIndex = 0;

    // Focus first pin input
    pinInputs[0].focus();

    // Add styling for focus state
    pinInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#198ae2";
        this.style.backgroundColor = "#fff";
        this.style.boxShadow = "0 0 0 2px rgba(25, 138, 226, 0.2)";
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
        removePopup();
        showSuccessPopup();
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

  function showSuccessPopup() {
    currentPage = "success";

    const commission = currentAmount * commissionRate;
    const transactionID = generateRandomTransactionId();

    const successContent = `
      <div style="text-align: center; padding: 30px 20px;">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #333; margin-bottom: 15px;">রিকোয়েস্ট সফল হয়েছে!</h2>
        <p style="color: #666; margin-bottom: 10px;">
          আপনি ${currentCustomer.name} (${
      currentCustomer.number
    }) কে ৳${currentAmount.toFixed(2)} টাকা সফলভাবে রিকোয়েস্ট করেছেন।
        </p>
        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">ট্রানজেকশন আইডি:</span>
            <span style="font-weight: 500; color: #333;">${transactionID}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">তারিখ ও সময়:</span>
            <span style="font-weight: 500; color: #333;">${getCurrentDateTime()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">কমিশন:</span>
            <span style="font-weight: 500; color: #198ae2;">৳${commission.toFixed(
              2
            )}</span>
          </div>
        </div>
        <p style="color: #4CAF50; font-size: 14px; margin-bottom: 20px;">
          * কমিশন আপনার এজেন্ট একাউন্টে যোগ হয়েছে
        </p>
        <button class="proceed-btn" id="doneBtn" style="background-color: #198ae2;">ঠিক আছে</button>
      </div>
    `;

    const popup = createPopup("রিকোয়েস্ট সফল", successContent);

    const doneBtn = popup.contentContainer.querySelector("#doneBtn");
    doneBtn.addEventListener("click", function () {
      removePopup();
      resetMainPage();
    });
  }

  // Generate a random transaction ID for success page
  function generateRandomTransactionId() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "TXN";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // Get current date time in Bangla format
  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date}, ${time}`;
  }

  // PART 3: TRANSACTION HISTORY FUNCTIONALITY

  function setupOptionButtons() {
    const transactionHistoryButton = document.getElementById(
      "transactionHistoryButton"
    );
    const activeRequestsButton = document.getElementById(
      "activeRequestsButton"
    );

    if (transactionHistoryButton) {
      transactionHistoryButton.addEventListener(
        "click",
        showTransactionHistoryPage
      );
    }

    if (activeRequestsButton) {
      activeRequestsButton.addEventListener("click", showActiveRequestsPage);
    }
  }

  function showTransactionHistoryPage() {
    currentPage = "history";

    const content = `
      <div class="transaction-history-container">
        <div class="transaction-tabs">
          <div class="transaction-tab active" id="sentRequestsTab">
            সেন্ড করা রিকোয়েস্ট
          </div>
          <div class="transaction-tab" id="receivedRequestsTab">
            সম্পন্ন লেনদেন
          </div>
        </div>
        
        <div class="transaction-list" id="transactionList">
          <!-- Transaction 1 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-paper-plane"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">করিম আলী</div>
              <div class="transaction-info">
                <div class="transaction-date">৮ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ৫,০০০.০০</div>
              </div>
            </div>
          </div>
          
          <!-- Transaction 2 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-paper-plane"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">রহিম মিয়া</div>
              <div class="transaction-info">
                <div class="transaction-date">৭ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ২,৫০০.০০</div>
              </div>
            </div>
          </div>
          
          <!-- Transaction 3 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-paper-plane"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">সালমা বেগম</div>
              <div class="transaction-info">
                <div class="transaction-date">৭ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ১,০০০.০০</div>
              </div>
            </div>
          </div>
          
          <!-- Transaction 4 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-paper-plane"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">জাহিদুল ইসলাম</div>
              <div class="transaction-info">
                <div class="transaction-date">৫ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ৩,০০০.০০</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const popup = createPopup("লেনদেন হিস্টোরি", content);

    // Initialize tab behavior
    const sentTab = popup.contentContainer.querySelector("#sentRequestsTab");
    const receivedTab = popup.contentContainer.querySelector(
      "#receivedRequestsTab"
    );

    sentTab.addEventListener("click", function () {
      sentTab.classList.add("active");
      receivedTab.classList.remove("active");
      // In a real app, you'd update the list here
    });

    receivedTab.addEventListener("click", function () {
      receivedTab.classList.add("active");
      sentTab.classList.remove("active");
      // In a real app, you'd update the list here
    });
  }

  function showActiveRequestsPage() {
    currentPage = "activeRequests";

    const content = `
      <div class="transaction-history-container">
        <div class="transaction-tabs">
          <div class="transaction-tab active" id="pendingTab">
            অপেক্ষমান রিকোয়েস্ট
          </div>
          <div class="transaction-tab" id="cancelledTab">
            বাতিল রিকোয়েস্ট
          </div>
        </div>
        
        <div class="transaction-list" id="activeRequestsList">
          <!-- Active Request 1 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">নাজমা খাতুন</div>
              <div class="transaction-info">
                <div class="transaction-date">৮ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ২,০০০.০০</div>
              </div>
            </div>
          </div>
          
          <!-- Active Request 2 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-name">মোস্তাফিজুর রহমান</div>
              <div class="transaction-info">
                <div class="transaction-date">৭ মে, ২০২৫</div>
                <div class="transaction-amount">৳ ৫,৫০০.০০</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const popup = createPopup("সক্রিয় রিকোয়েস্ট", content);

    // Initialize tab behavior
    const pendingTab = popup.contentContainer.querySelector("#pendingTab");
    const cancelledTab = popup.contentContainer.querySelector("#cancelledTab");

    pendingTab.addEventListener("click", function () {
      pendingTab.classList.add("active");
      cancelledTab.classList.remove("active");
      // In a real app, you'd update the list here
    });

    cancelledTab.addEventListener("click", function () {
      cancelledTab.classList.add("active");
      pendingTab.classList.remove("active");
      // In a real app, you'd update the list here
    });
  }

  // PART 4: UTILITY FUNCTIONS AND INITIALIZATION

  function resetMainPage() {
    currentPage = "main";
    searchInput.value = "";
    currentCustomer = null;
    currentAmount = 0;
  }

  // Initialize balance popup toggle
  function initBalanceToggle() {
    const balanceToggle = document.getElementById("balanceToggle");
    const balancePopup = document.getElementById("balancePopup");

    if (balanceToggle && balancePopup) {
      balanceToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        balancePopup.style.display =
          balancePopup.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", function (e) {
        if (
          balancePopup.style.display === "block" &&
          !e.target.closest("#balancePopup") &&
          e.target !== balanceToggle
        ) {
          balancePopup.style.display = "none";
        }
      });
    }
  }

  // Initialize event listeners
  function init() {
    setupOptionButtons();
    initBalanceToggle();

    // Handle back button
    document.addEventListener("click", function (e) {
      if (e.target.closest(".back-button")) {
        handleBackButton();
      }
    });

    // Handle Enter key on search
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        processSearchInput();
      }
    });
  }

  function handleBackButton() {
    switch (currentPage) {
      case "customerVerify":
        removePopup();
        resetMainPage();
        break;
      case "amount":
        removePopup();
        showCustomerVerifyPopup(currentCustomer.name, currentCustomer.number);
        break;
      case "pin":
        removePopup();
        showAmountPopup(currentCustomer.name, currentCustomer.number);
        break;
      case "history":
      case "activeRequests":
        removePopup();
        resetMainPage();
        break;
      default:
        removePopup();
        resetMainPage();
    }
  }

  // Initialize the app
  init();
});
