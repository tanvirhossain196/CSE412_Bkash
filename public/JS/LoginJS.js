// ====================================
// PART 1: CORE SETUP AND INITIALIZATION
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  // Global state for user
  const currentUser = {
    isLoggedIn: false,
    mobileNumber: null,
    operator: null,
    pin: null,
    verificationCode: null,
    nidInfo: {
      name: "",
      fatherName: "",
      motherName: "",
      dob: "",
      address: "",
      nidNumber: "",
    },
    accountType: null, // "login" or "register"
  };

  // Initialize the app components
  initApp();

  // App initialization
  function initApp() {
    setupNavigation();
    adjustServiceGridLayout();
    setupServicesButton();
    setupLanguageToggle();
    createPopupContainers();
    setupMobileMenu();
    setupSidebarLogoutHandler();

    // Check if user is already logged in (from localStorage or sessionStorage)
    checkLoggedInStatus();

    console.log("Application initialized successfully");
  }

  // Adjust the service grid layout to make items closer together
  function adjustServiceGridLayout() {
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
      // Reduce padding and gap to make items closer
      serviceGrid.style.gridGap = "10px 20px";
      serviceGrid.style.padding = "0 4%";

      // Make service items more compact
      const serviceItems = document.querySelectorAll(".service-item");
      serviceItems.forEach((item) => {
        item.style.padding = "5px";
      });
    }
  }

  function checkLoggedInStatus() {
    const savedUser = localStorage.getItem("bkashUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        // Update currentUser with saved data
        Object.assign(currentUser, parsedUser);

        // Set login status
        if (parsedUser.isLoggedIn) {
          currentUser.isLoggedIn = true;

          // Update UI immediately
          updateUIForLoggedInUser();

          // Fix services button explicitly
          const loginButton = document.getElementById("loginButton");
          if (loginButton) {
            loginButton.classList.add("logged-in");

            // Remove any previous click listeners to avoid duplicates
            const newButton = loginButton.cloneNode(true);
            loginButton.parentNode.replaceChild(newButton, loginButton);

            // Add the click event again
            setupServicesButtonLoggedIn(newButton);
          }

          console.log("User session restored successfully", currentUser);

          // If we're on index.html, redirect to main.html
          if (
            window.location.pathname.includes("index.html") ||
            window.location.pathname.endsWith("/")
          ) {
            window.location.href = "main.html";
          }
        }
      } catch (e) {
        console.error("Error restoring user session:", e);
        localStorage.removeItem("bkashUser");
      }
    }
  }

  // Setup services button click event for logged in users
  function setupServicesButtonLoggedIn(button) {
    const serviceGrid = document.getElementById("serviceGrid");

    if (button && serviceGrid) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Services button clicked by logged in user");

        // Always toggle dropdown for logged in users
        this.classList.toggle("active");
        serviceGrid.classList.toggle("show");
      });
    }
  }

  // Update UI elements when user is logged in
  function updateUIForLoggedInUser() {
    if (!currentUser.isLoggedIn) return;

    console.log("Updating UI for logged-in user", currentUser.mobileNumber);

    // Add logged-in class to services button
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
      loginButton.classList.add("logged-in");

      // Update sidebar with user info if present
      const sidebarUser = document.querySelector(".sidebar-user-img");
      if (sidebarUser) {
        // Add user mobile number to sidebar
        const sidebarTitle = document.querySelector(".sidebar-title");
        if (sidebarTitle) {
          sidebarTitle.innerHTML = `বিকাশ মেনু <br><small style="font-size: 12px;">+88${currentUser.mobileNumber}</small>`;
        }
      }
    }

    // Update any user-specific UI elements
    const userElements = document.querySelectorAll(".user-mobile-number");
    userElements.forEach((el) => {
      el.textContent = currentUser.mobileNumber;
    });

    // Also update service grid layout to make items closer
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
      serviceGrid.style.gridGap = "10px 30px";
      serviceGrid.style.padding = "0 3%";
    }
  }

  // Setup main navigation
  function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      if (item.id === "loginButton") return; // Handled separately

      item.addEventListener("click", function (e) {
        // Only prevent default for items that don't have specific URLs
        if (!this.getAttribute("href") || this.getAttribute("href") === "#") {
          e.preventDefault();
        }
      });
    });
  }

  function setupServicesButton() {
    const servicesButton = document.getElementById("servicesButton");
    const serviceGrid = document.getElementById("serviceGrid");

    if (servicesButton && serviceGrid) {
      servicesButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Always check current login status from both memory and localStorage
        const savedUser = localStorage.getItem("bkashUser");
        let isLoggedIn = currentUser.isLoggedIn;

        if (!isLoggedIn && savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            isLoggedIn = parsedUser.isLoggedIn;

            // If user is logged in from localStorage but not in memory,
            // update currentUser and UI
            if (parsedUser.isLoggedIn && !currentUser.isLoggedIn) {
              Object.assign(currentUser, parsedUser);
              currentUser.isLoggedIn = true;
              updateUIForLoggedInUser();

              // Replace button with new one to ensure clean event handlers
              const newButton = servicesButton.cloneNode(true);
              servicesButton.parentNode.replaceChild(newButton, servicesButton);

              // Set up click handler for logged in state
              setupServicesButtonLoggedIn(newButton);

              // Call click on the new button to show menu
              setTimeout(() => newButton.click(), 100);
              return;
            }
          } catch (e) {
            console.error("Error parsing saved user:", e);
          }
        }

        console.log("Services button clicked, logged in status:", isLoggedIn);

        if (!isLoggedIn) {
          // Show login/registration popup if not logged in
          showPopup("loginPopup");
          showNotification("সার্ভিস দেখতে লগইন করুন");
        } else {
          // Toggle dropdown menu if logged in
          this.classList.toggle("active");
          serviceGrid.classList.toggle("show");
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (
          serviceGrid.classList.contains("show") &&
          !servicesButton.contains(e.target) &&
          !serviceGrid.contains(e.target)
        ) {
          servicesButton.classList.remove("active");
          serviceGrid.classList.remove("show");
        }
      });
    }
  }
  // Setup sidebar logout handler - improved integration with sidebar
  function setupSidebarLogoutHandler() {
    document.addEventListener("click", function (e) {
      // Check for logout button in sidebar
      if (
        e.target &&
        (e.target.textContent === "লগ আউট" ||
          (e.target.parentElement &&
            e.target.parentElement.textContent === "লগ আউট"))
      ) {
        logout();

        // Also close the sidebar
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebarOverlay");

        if (sidebar && overlay) {
          sidebar.classList.remove("active");
          sidebar.style.right = "-60%";
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  }

  // Logout function
  function logout() {
    currentUser.isLoggedIn = false;
    localStorage.removeItem("bkashUser");

    // Update UI elements
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
      loginButton.classList.remove("logged-in");

      // Close services dropdown if open
      const serviceGrid = document.getElementById("serviceGrid");
      if (serviceGrid && serviceGrid.classList.contains("show")) {
        serviceGrid.classList.remove("show");
        loginButton.classList.remove("active");
      }
    }

    showNotification("লগআউট সফল হয়েছে");

    // Redirect to home page after logout
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }

  // Setup mobile menu
  function setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", function () {
        nav.classList.toggle("show-mobile");
      });
    }
  }

  // Setup language toggle
  function setupLanguageToggle() {
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        langButtons.forEach(function (btn) {
          btn.classList.remove("active-lang");
        });
        this.classList.add("active-lang");
      });
    });
  }

  // ====================================
  // PART 2: POPUP CONTENT TEMPLATES
  // ====================================

  // Login content
  function createLoginContent() {
    return `
      <div class="login-options">
        <div class="login-message">
          <p>যে দেশেই থাকুন না কেন, আপনার বাংলাদেশি NID দিয়ে বিকাশ একাউন্ট খুলুন অথবা লগ ইন করুন</p>
        </div>
        <div class="login-buttons">
          <button class="btn-primary login-btn" id="btnLogin">লগ ইন</button>
          <button class="btn-secondary register-btn" id="btnRegister">রেজিস্ট্রেশন</button>
        </div>
        <button class="btn-text" id="btnViewApp">বিকাশ অ্যাপ ঘুরে দেখুন</button>
      </div>
    `;
  }

  // Number verification content for login
  function createLoginVerificationContent() {
    return `
      <div class="number-verification">
        <div class="logo-section">
          <div class="bkash-logo">
            <img src="images/bkash-bird-logo.png" alt="বিকাশ লোগো">
          </div>
        </div>
        <div class="form-group">
          <label>মোবাইল নাম্বার <span class="required">*</span></label>
          <div class="mobile-input">
            <span class="country-code">+88</span>
            <input type="tel" id="loginMobileNumber" placeholder="01xxxxxxxxx" maxlength="11" pattern="01[0-9]{9}" required>
          </div>
          <small class="input-help">১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন (শুরু হবে 013, 014, 015, 016, 017, 018, 019 দিয়ে)</small>
        </div>
        <button class="btn-primary" id="btnSubmitLoginNumber">পরবর্তী</button>
      </div>
    `;
  }

  // Verification code content
  function createLoginCodeContent() {
    return `
      <div class="verification-code">
        <h3>ভেরিফিকেশন কোড</h3>
        <p>আপনার মোবাইলে পাঠানো ৬ ডিজিটের ভেরিফিকেশন কোড লিখুন</p>
        <p>পুনরায় পাঠান <span class="countdown" id="resendTimer">120</span> সেকেন্ড পর</p>
        <div class="mobile-info">
          <p>ভেরিফিকেশন কোড এই নাম্বারে পাঠানো হয়েছে</p>
          <div class="number-display">
            <img src="images/operator-gp.png" alt="Operator" class="operator-icon" id="loginOperatorIcon">
            <span class="mobile-number" id="loginMobileNumberDisplay">+880xxxxxxxxxx</span>
            <a href="#" class="change-link" id="btnChangeLoginNumber">(পরিবর্তন করুন)</a>
          </div>
        </div>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <p>আপনার বিকাশ পিন ও ভেরিফিকেশন কোড কাউকে দিবেন না</p>
        </div>
        <div class="verification-input">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
        </div>
        <p><a href="#" id="btnResendCode" class="btn-text">কোড পাননি? আবার পাঠান</a></p>
        <button class="btn-primary" id="btnSubmitLoginCode">অগ্রসর হন</button>
      </div>
    `;
  }

  // PIN input content for login - Improved professional design
  function createLoginPinContent() {
    return `
      <div class="pin-setup">
        <h3>আপনার বিকাশ পিন দিন</h3>
        <p>আপনার ৫ সংখ্যার পিন দিন</p>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <p>আপনার বিকাশ পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
        </div>
        
        <div class="pin-input-container">
          <div class="pin-input-wrapper">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]" required>
          </div>
        </div>
        
        <div class="show-pin-container">
          <label class="show-pin-label">
            <input type="checkbox" id="showLoginPinCheckbox">
            <span class="checkbox-text">পিন দেখুন</span>
          </label>
        </div>
        
        <button class="btn-primary" id="btnSubmitLoginPin">লগইন করুন</button>
        <p class="pin-forgot"><a href="#" id="btnForgotPin" class="btn-text">পিন ভুলে গেছেন?</a></p>
      </div>
    `;
  }

  // Number verification content for registration - Improved with better mobile validation
  function createNumberVerificationContent() {
    return `
      <div class="number-verification">
        <div class="logo-section">
          <div class="bkash-logo">
            <img src="images/bkash-bird-logo.png" alt="বিকাশ লোগো">
          </div>
        </div>
        <div class="form-group">
          <label>দেশের কোড <span class="required">*</span></label>
          <div class="country-select">
            <img src="images/bd-flag.png" alt="বাংলাদেশ" class="country-flag">
            <span>বাংলাদেশ</span>
          </div>
        </div>
        <div class="form-group">
          <label>মোবাইল নাম্বার <span class="required">*</span></label>
          <div class="mobile-input">
            <span class="country-code">+88</span>
            <input type="tel" id="mobileNumber" placeholder="01xxxxxxxxx" maxlength="11" pattern="01[0-9]{9}" required>
          </div>
          <small class="input-help">১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন (013, 014, 015, 016, 017, 018 বা 019 দিয়ে শুরু)</small>
        </div>
        <div class="terms-check">
          <input type="checkbox" id="termsCheckbox" required>
          <label for="termsCheckbox">
            <a href="#" id="btnTermsConditions">নিয়ম ও শর্তসমূহে</a> সম্মত আছি
          </label>
        </div>
        <button class="btn-primary" id="btnSubmitNumber">পরবর্তী</button>
      </div>
    `;
  }

  // Operator selection content
  function createOperatorSelectionContent() {
    return `
      <div class="operator-selection">
        <h3>অপারেটর বেছে নিন</h3>
        <p>এই নম্বারের বর্তমান অপারেটর বেছে নিন</p>
        <div class="operator-grid">
          <div class="operator-item" data-operator="airtel" data-prefix="016">
            <img src="images/operator-airtel.png" alt="Airtel">
          </div>
          <div class="operator-item" data-operator="banglalink" data-prefix="014,019">
            <img src="images/operator-banglalink.png" alt="Banglalink">
          </div>
          <div class="operator-item" data-operator="grameenphone" data-prefix="017,013">
            <img src="images/operator-gp.png" alt="Grameenphone">
          </div>
          <div class="operator-item" data-operator="robi" data-prefix="018">
            <img src="images/operator-robi.png" alt="Robi">
          </div>
          <div class="operator-item" data-operator="skitto" data-prefix="013,017">
            <img src="images/operator-skitto.png" alt="Skitto">
          </div>
          <div class="operator-item" data-operator="teletalk" data-prefix="015">
            <img src="images/operator-teletalk.png" alt="Teletalk">
          </div>
        </div>
        <div class="mobile-info" id="selectedMobileDisplay">
          <p>আপনার মোবাইল নাম্বার:</p>
          <div class="number-display">
            <span class="mobile-number" id="displayMobileNumber">+880xxxxxxxxxx</span>
          </div>
        </div>
        <button class="btn-outline" id="btnCancelOperator">বাতিল করুন</button>
      </div>
    `;
  }

  // Identity selection content
  function createIdentitySelectionContent() {
    return `
      <div class="identity-selection">
        <div class="logo-section">
          <img src="images/bkash-bird-logo.png" alt="বিকাশ লোগো">
        </div>
        <h3>আইডি ধরন নির্বাচন করুন</h3>
        <div class="identity-options">
          <div class="identity-option" id="btnSelectNid">
            <div class="identity-icon">
              <img src="images/nid-icon.png" alt="জাতীয় পরিচয়পত্র">
            </div>
            <div class="identity-name">জাতীয় পরিচয়পত্র</div>
          </div>
          <div class="identity-option" id="btnSelectBirthCert">
            <div class="identity-icon">
              <img src="images/birth-cert-icon.png" alt="জন্ম সনদ">
            </div>
            <div class="identity-name">জন্ম সনদ</div>
            <div class="identity-note">১৪ থেকে ১৮ বছরের জন্য প্রযোজ্য</div>
          </div>
        </div>
        <div class="mobile-info">
          <p>আপনার মোবাইল নাম্বার:</p>
          <div class="number-display">
            <img src="images/operator-gp.png" alt="Operator" class="operator-icon" id="operatorIconDisplay">
            <span class="mobile-number" id="mobileNumberDisplay">+880xxxxxxxxxx</span>
          </div>
        </div>
      </div>
    `;
  }

  // Verification code content
  function createVerificationCodeContent() {
    return `
      <div class="verification-code">
        <h3>ভেরিফিকেশন কোড</h3>
        <p>আপনার মোবাইলে পাঠানো ৬ ডিজিটের ভেরিফিকেশন কোড লিখুন</p>
        <p>পুনরায় পাঠান <span class="countdown" id="resendTimer">120</span> সেকেন্ড পর</p>
        <div class="mobile-info">
          <p>ভেরিফিকেশন কোড এই নাম্বারে পাঠানো হয়েছে</p>
          <div class="number-display">
            <img src="images/operator-gp.png" alt="Operator" class="operator-icon" id="verificationOperatorIcon">
            <span class="mobile-number" id="verificationMobileNumber">+880xxxxxxxxxx</span>
            <a href="#" class="change-link" id="btnChangeNumberFromVerification">(পরিবর্তন করুন)</a>
          </div>
        </div>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <p>আপনার বিকাশ পিন ও ভেরিফিকেশন কোড কাউকে দিবেন না</p>
        </div>
        <div class="verification-input">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
          <input type="text" maxlength="1" class="code-input" pattern="[0-9]">
        </div>
        <p><a href="#" id="btnResendCode" class="btn-text">কোড পাননি? আবার পাঠান</a></p>
        <button class="btn-primary" id="btnSubmitVerificationCode">পরবর্তী</button>
      </div>
    `;
  }

  // Terms content
  function createTermsContent() {
    return `
      <div class="terms-content">
        <div class="terms-scroll">
          <h3>বিকাশ সার্ভিস শর্তাবলি</h3>
          <div class="terms-text">
            <p>১। বিকাশ লিমিটেড, যথাক্রমে "বিকাশ" নামে অভিহিত, এর প্রাথমিক কার্যক্রমগুলো মাধ্যমে (বিকাশ প্যাক, মোবাইলে বিকাশ এ্যাপ) সেবা পাবেন বাংলাদেশ ব্যাংক এবং সরকারের সিদ্ধান্ত অনুযায়ী।</p>
            <p>২। বিষয় বা প্রেক্ষাপট অন্যথা সংশ্লিষ্ট না করুন, নিচে তালিকাভুক্ত কিছু শর্ত আছে যা প্রাসঙ্গিক বিকাশ সেবা সম্পর্কে আপনার মানা আবশ্যক:</p>
            <p>৩। বিকাশে রেজিস্ট্রেশনের জন্য আপনাকে আপনার নিজের নামে একটি সক্রিয় মোবাইল কানেকশন এবং জাতীয় পরিচয়পত্র ব্যবহার করতে হবে।</p>
            <p>৪। আপনার বিকাশ একাউন্টে সর্বাধিক ৩,০০,০০০ টাকা রাখা যাবে এবং সর্বনিম্ন ১০ টাকা থাকতে হবে।</p>
            <p>৫। সেন্ড মানি করতে হলে সর্বনিম্ন ১০ টাকা এবং সর্বাধিক ২৫,০০০ টাকা পাঠানো যাবে একটি লেনদেনে।</p>
            <p>৬। আপনি দিনে সর্বাধিক ২০টি লেনদেন করতে পারবেন এবং সর্বোচ্চ ২ লক্ষ টাকা পাঠাতে পারবেন একদিনে।</p>
            <p>৭। কোনো ব্যবসায়িক কারণে বিকাশ একাউন্ট ব্যবহার করতে হলে আপনাকে মার্চেন্ট একাউন্ট নিতে হবে।</p>
            <p>৮। বিকাশ অধিকার সংরক্ষণ করে যেকোনো সময় এই শর্তাবলী পরিবর্তন করার।</p>
            <p>৯। বিকাশের মাধ্যমে কোনো অবৈধ অর্থলেনদেন বা ঝুঁকিপূর্ণ কার্যকলাপে জড়িত হওয়া আইনত দণ্ডনীয় অপরাধ।</p>
            <p>১০। আপনার বিকাশ একাউন্ট ও পিন কাউকে শেয়ার করবেন না।</p>
            <!-- More terms text here -->
          </div>
        </div>
        <div class="terms-actions">
          <button class="btn-outline" id="btnCancelTerms">আমার সম্মতি নেই</button>
          <button class="btn-primary" id="btnAcceptTerms">আমার সম্মতি আছে</button>
        </div>
      </div>
    `;
  }

  // eKYC content
  function createEkycContent() {
    return `
      <div class="ekyc-content">
        <div class="logo-section">
          <img src="images/bkash-bird-logo.png" alt="বিকাশ লোগো">
        </div>
        <h3>তিনটি সহজধাপে আপনার ই-কেওয়াইসির তথ্য দিন</h3>
        <div class="ekyc-steps">
          <div class="ekyc-step">
            <div class="step-number">১</div>
            <div class="step-text">আপনার NID এর ছবি তুলুন</div>
          </div>
         <div class="ekyc-step">
            <div class="step-number">১</div>
            <div class="step-text">আপনার NID এর ছবি তুলুন</div>
          </div>
          <div class="ekyc-step">
            <div class="step-number">২</div>
            <div class="step-text">প্রয়োজনীয় তথ্য প্রদান করুন</div>
          </div>
          <div class="ekyc-step">
            <div class="step-number">৩</div>
            <div class="step-text">নিজের চেহারার ছবি তুলুন</div>
          </div>
        </div>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <p>আপনার তথ্য সুরক্ষিতভাবে সংরক্ষণ করা হবে এবং শুধুমাত্র প্রমাণীকরণের জন্য ব্যবহার করা হবে</p>
        </div>
        <button class="btn-primary" id="btnStartNidUpload">NID এর ছবি তুলুন</button>
      </div>
    `;
  }

  // NID upload content
  function createNidUploadContent() {
    return `
    <div class="nid-upload">
      <h3>জাতীয় পরিচয়পত্র আপলোড করুন</h3>
      <div class="upload-sections-scroll">
        <div class="upload-sections">
          <div class="upload-section">
            <div class="upload-title">NID এর সামনের অংশ <span class="required">*</span></div>
            <div class="upload-area" id="frontNidUpload">
              <div class="upload-icon">
                <i class="fas fa-camera"></i>
              </div>
              <div class="upload-text">ক্যামেরা দিয়ে ছবি তুলুন</div>
              <input type="file" accept="image/*" capture="environment" class="upload-input" id="frontNidInput">
            </div>
          </div>
          <div class="upload-section">
            <div class="upload-title">NID এর পিছনের অংশ <span class="required">*</span></div>
            <div class="upload-area" id="backNidUpload">
              <div class="upload-icon">
                <i class="fas fa-camera"></i>
              </div>
              <div class="upload-text">ক্যামেরা দিয়ে ছবি তুলুন</div>
              <input type="file" accept="image/*" capture="environment" class="upload-input" id="backNidInput">
            </div>
          </div>
        </div>
        <div class="upload-guidelines">
          <h4>ছবি তোলার নির্দেশনা:</h4>
          <ul>
            <li>NID সম্পূর্ণভাবে ফ্রেমের মধ্যে রাখুন</li>
            <li>সমস্ত তথ্য পরিষ্কারভাবে দেখা যায় এমনভাবে ছবি তুলুন</li>
            <li>প্রতিফলন এড়াতে অতিরিক্ত আলো ব্যবহার করুন</li>
          </ul>
        </div>
        <div class="upload-preview">
          <div class="preview-area" id="frontNidPreview"></div>
          <div class="preview-area" id="backNidPreview"></div>
        </div>
      </div>
      <div class="upload-actions">
        <button class="btn-outline" id="btnCancelNidUpload">বাতিল করুন</button>
        <button class="btn-primary" id="btnSubmitNidUpload">পরবর্তী</button>
      </div>
    </div>
  `;
  }

  // NID details content
  function createNidDetailsContent() {
    return `
      <div class="nid-details">
        <h3>আপনার NID তথ্য যাচাই করুন</h3>
        <p>নিম্নলিখিত তথ্যগুলি আপনার NID থেকে পাওয়া গেছে। অনুগ্রহ করে সেগুলি যাচাই করুন এবং প্রয়োজনে সংশোধন করুন।</p>
        <div class="form-group">
          <label>নাম <span class="required">*</span></label>
          <input type="text" id="nidName" placeholder="আপনার নাম" required>
        </div>
        <div class="form-group">
          <label>পিতার নাম <span class="required">*</span></label>
          <input type="text" id="nidFatherName" placeholder="পিতার নাম" required>
        </div>
        <div class="form-group">
          <label>মাতার নাম <span class="required">*</span></label>
          <input type="text" id="nidMotherName" placeholder="মাতার নাম" required>
        </div>
        <div class="form-group">
          <label>জন্ম তারিখ <span class="required">*</span></label>
          <input type="date" id="nidDob" required>
        </div>
        <div class="form-group">
          <label>NID নম্বর <span class="required">*</span></label>
          <input type="text" id="nidNumber" placeholder="১০-ডিজিট NID নম্বর" maxlength="10" required>
          <small class="input-help">আপনার NID কার্ডে উল্লেখিত ১০ ডিজিটের নম্বর দিন</small>
        </div>
        <div class="form-group">
          <label>ঠিকানা <span class="required">*</span></label>
          <textarea id="nidAddress" placeholder="আপনার ঠিকানা" required></textarea>
        </div>
        <div class="details-actions">
          <button class="btn-outline" id="btnEditNidDetails">সংশোধন করুন</button>
          <button class="btn-primary" id="btnSubmitNidDetails">তথ্য সম্পূর্ণ করুন</button>
        </div>
      </div>
    `;
  }

  // Face verification content
  function createFaceVerificationContent() {
    return `
      <div class="face-verification">
        <h3>চেহারা যাচাই করুন</h3>
        <p>আপনার চেহারার ৩টি ছবি তুলুন</p>
        <div class="face-upload-grid">
          <div class="face-upload">
            <div class="face-label">সামনে থেকে <span class="required">*</span></div>
            <div class="face-upload-area" id="frontFaceUpload">
              <div class="upload-icon">
                <i class="fas fa-camera"></i>
              </div>
              <input type="file" accept="image/*" capture="user" class="upload-input" id="frontFaceInput">
            </div>
          </div>
          <div class="face-upload">
            <div class="face-label">বাম দিক থেকে <span class="required">*</span></div>
            <div class="face-upload-area" id="leftFaceUpload">
              <div class="upload-icon">
                <i class="fas fa-camera"></i>
              </div>
              <input type="file" accept="image/*" capture="user" class="upload-input" id="leftFaceInput">
            </div>
          </div>
          <div class="face-upload">
            <div class="face-label">ডান দিক থেকে <span class="required">*</span></div>
            <div class="face-upload-area" id="rightFaceUpload">
              <div class="upload-icon">
                <i class="fas fa-camera"></i>
              </div>
              <input type="file" accept="image/*" capture="user" class="upload-input" id="rightFaceInput">
            </div>
          </div>
        </div>
        <div class="face-guidelines">
          <h4>ছবি তোলার নির্দেশনা:</h4>
          <ul>
            <li>চেহারা সম্পূর্ণভাবে দেখা যায় এমনভাবে ছবি তুলুন</li>
            <li>উজ্জ্বল আলোয় ছবি তুলুন</li>
            <li>চশমা, টুপি, বা অন্য কোন আবরণ ছাড়া ছবি তুলুন</li>
          </ul>
        </div>
        <div class="face-preview-grid">
          <div class="face-preview" id="frontFacePreview"></div>
          <div class="face-preview" id="leftFacePreview"></div>
          <div class="face-preview" id="rightFacePreview"></div>
        </div>
        <button class="btn-primary" id="btnSubmitFaceVerification">পরবর্তী</button>
      </div>
    `;
  }

  // PIN setup content - Improved professional design
  function createPinSetupContent() {
    return `
      <div class="pin-setup">
        <h3>বিকাশ পিন সেট করুন</h3>
        <p>৫ সংখ্যার একটি পিন সেট করুন যা আপনি মনে রাখতে পারবেন</p>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <p>আপনার বিকাশ পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
        </div>
        
        <div class="pin-input-container">
          <label>পিন <span class="required">*</span></label>
          <div class="pin-input-wrapper">
            <input type="password" maxlength="1" class="pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-input" pattern="[0-9]" required>
          </div>
        </div>
        
        <div class="pin-input-container">
          <label>পিন আবার লিখুন <span class="required">*</span></label>
          <div class="pin-input-wrapper">
            <input type="password" maxlength="1" class="pin-confirm-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-confirm-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-confirm-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-confirm-input" pattern="[0-9]" required>
            <input type="password" maxlength="1" class="pin-confirm-input" pattern="[0-9]" required>
          </div>
        </div>
        
        <div class="show-pin-container">
          <label class="show-pin-label">
            <input type="checkbox" id="showPinCheckbox">
            <span class="checkbox-text">পিন দেখুন</span>
          </label>
        </div>
        
        <div class="pin-note">
          <p>এই পিন দিয়ে আপনি বিকাশে লগইন করতে পারবেন এবং সকল লেনদেন অনুমোদন করতে পারবেন</p>
        </div>
        <button class="btn-primary" id="btnSubmitPin">পিন সেট করুন</button>
      </div>
    `;
  }

  // Success content - UPDATED with improved login button functionality and redirect to main.html
  function createSuccessContent() {
    return `
    <div class="success-content">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>অভিনন্দন!</h3>
      <p>আপনার বিকাশ একাউন্ট সফলভাবে তৈরি হয়েছে</p>
      <div class="account-info">
        <div class="account-number">
          <span class="label">বিকাশ অ্যাকাউন্ট:</span>
          <span class="value" id="accountNumber">01XXXXXXXXX</span>
        </div>
        <div class="account-nid">
          <span class="label">NID নাম্বার:</span>
          <span class="value" id="successNidNumber">XXXXXXXXXX</span>
        </div>
      </div>
      <button class="btn-primary full-width" id="btnSuccessOk">ঠিক আছে</button>
    </div>
  `;
  }

  const additionalStyles = `
  /* Scrollable NID Upload Container */
  .upload-sections-scroll {
    max-height: 330px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 5px;
    margin-bottom: 15px;
  }
  
  /* Full width button */
  .full-width {
    width: 100% !important;
    max-width: 100% !important;
    margin-top: 20px;
  }
  
  /* Improved account info styling */
  .account-info {
    background-color: var(--light-gray);
    padding: 15px;
    border-radius: 10px;
    margin: 20px 0;
    width: 100%;
  }
  
  .account-number, .account-nid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  
  .account-nid {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--gray);
  }
  
  /* Reduce popup size for success modal */
  #successPopup .popup-content {
    padding: 20px 15px;
  }
  
  /* Ensure NID upload container is smaller */
  .nid-upload {
    padding-bottom: 10px;
  }
`;

  // Function to initialize all changes
  function applyBkashUpdates() {
    console.log("Applying bKash UI updates...");

    // Apply CSS changes
    const styleElement = document.createElement("style");
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);

    // Override original functions
    if (typeof window.createNidUploadContent === "function") {
      console.log("Overriding NID upload content function");
      window.createNidUploadContent = createNidUploadContent;
    }

    if (typeof window.createSuccessContent === "function") {
      console.log("Overriding success content function");
      window.createSuccessContent = createSuccessContent;
    }

    if (typeof window.setupSuccessPopup === "function") {
      console.log("Overriding success popup setup function");
      window.setupSuccessPopup = setupSuccessPopup;
    }

    // Check for open popups that need immediate update
    const nidUploadPopup = document.getElementById("nidUploadPopup");
    const successPopup = document.getElementById("successPopup");

    if (nidUploadPopup && nidUploadPopup.classList.contains("show")) {
      const content = nidUploadPopup.querySelector(".popup-content");
      if (content) {
        content.innerHTML = createNidUploadContent();
        if (typeof window.setupNidUploadPopup === "function") {
          window.setupNidUploadPopup();
        }
      }
    }

    if (successPopup && successPopup.classList.contains("show")) {
      const content = successPopup.querySelector(".popup-content");
      if (content) {
        content.innerHTML = createSuccessContent();
        if (typeof window.setupSuccessPopup === "function") {
          window.setupSuccessPopup();
        }
      }
    }

    console.log("bKash UI updates completed");
  }

  // Run updates on load or immediately if already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyBkashUpdates);
  } else {
    applyBkashUpdates();
  }

  // ====================================
  // PART 3: POPUP MANAGEMENT AND UI COMPONENTS
  // ====================================

  // Create popup containers for all required steps
  function createPopupContainers() {
    const popupContainers = [
      {
        id: "loginPopup",
        title: "লগ ইন / রেজিস্ট্রেশন",
        content: createLoginContent(),
      },
      // Login flow popups
      {
        id: "loginVerificationPopup",
        title: "মোবাইল নাম্বার দিয়ে লগ ইন করুন",
        content: createLoginVerificationContent(),
        hasBackButton: true,
        backTarget: "loginPopup",
      },
      {
        id: "loginCodePopup",
        title: "ভেরিফিকেশন কোড",
        content: createLoginCodeContent(),
        hasBackButton: true,
        backTarget: "loginVerificationPopup",
      },
      {
        id: "loginPinPopup",
        title: "পিন এন্ট্রি",
        content: createLoginPinContent(),
        hasBackButton: true,
        backTarget: "loginCodePopup",
      },
      // Registration flow popups
      {
        id: "numberVerificationPopup",
        title: "মোবাইল নাম্বার দিয়ে রেজিস্ট্রেশন করুন",
        content: createNumberVerificationContent(),
        hasBackButton: true,
        backTarget: "loginPopup",
      },
      {
        id: "operatorSelectionPopup",
        title: "অপারেটর বেছে নিন",
        content: createOperatorSelectionContent(),
        hasBackButton: true,
        backTarget: "numberVerificationPopup",
      },
      {
        id: "identitySelectionPopup",
        title: "পরিচয় যাচাই করুন",
        content: createIdentitySelectionContent(),
        hasBackButton: true,
        backTarget: "operatorSelectionPopup",
      },
      {
        id: "verificationCodePopup",
        title: "আপনার মোবাইল নাম্বার যাচাই করুন",
        content: createVerificationCodeContent(),
        hasBackButton: true,
        backTarget: "numberVerificationPopup",
      },
      {
        id: "termsPopup",
        title: "শর্তসমূহ",
        content: createTermsContent(),
        hasBackButton: true,
        backTarget: "verificationCodePopup",
      },
      {
        id: "eKycPopup",
        title: "ই-কেওয়াইসি",
        content: createEkycContent(),
        hasBackButton: true,
        backTarget: "termsPopup",
      },
      {
        id: "nidUploadPopup",
        title: "জাতীয় পরিচয়পত্র আপলোড করুন",
        content: createNidUploadContent(),
        hasBackButton: true,
        backTarget: "eKycPopup",
      },
      {
        id: "nidDetailsPopup",
        title: "জাতীয় পরিচয়পত্র তথ্য",
        content: createNidDetailsContent(),
        hasBackButton: true,
        backTarget: "nidUploadPopup",
      },
      {
        id: "faceVerificationPopup",
        title: "চেহারা যাচাই",
        content: createFaceVerificationContent(),
        hasBackButton: true,
        backTarget: "nidDetailsPopup",
      },
      {
        id: "pinSetupPopup",
        title: "পিন সেট করুন",
        content: createPinSetupContent(),
        hasBackButton: true,
        backTarget: "faceVerificationPopup",
      },
      {
        id: "successPopup",
        title: "রেজিস্ট্রেশন সফল",
        content: createSuccessContent(),
      },
    ];

    // Create all popup elements
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.classList.add("popup-container");

    popupContainers.forEach((popup) => {
      const popupElement = createPopupElement(
        popup.id,
        popup.title,
        popup.content,
        popup.hasBackButton,
        popup.backTarget
      );
      popupContainer.appendChild(popupElement);
    });

    // Add popup container to body
    document.body.appendChild(popupContainer);

    // Add overlay element
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Add notification element
    const notification = document.createElement("div");
    notification.id = "notification";
    notification.classList.add("notification");
    document.body.appendChild(notification);
  }

  // Create a popup element with improved styling for professional appearance
  function createPopupElement(id, title, content, hasBackButton, backTarget) {
    const popup = document.createElement("div");
    popup.id = id;
    popup.classList.add("popup");

    const popupHeader = document.createElement("div");
    popupHeader.classList.add("popup-header");
    // Set bKash pink color for all popup headers
    popupHeader.style.backgroundColor = "#e2146c";
    popupHeader.style.color = "#ffffff";

    // Add back button if specified
    if (hasBackButton) {
      const backBtn = document.createElement("button");
      backBtn.classList.add("popup-back");
      backBtn.innerHTML = "<i class='fas fa-arrow-left'></i>";
      backBtn.style.backgroundColor = "transparent";
      backBtn.style.border = "none";
      backBtn.style.fontSize = "18px";
      backBtn.style.color = "#ffffff";
      backBtn.style.cursor = "pointer";
      backBtn.addEventListener("click", () => {
        hidePopup(id);
        showPopup(backTarget);
      });
      popupHeader.appendChild(backBtn);
    } else {
      // Add empty space to maintain alignment
      const spacer = document.createElement("div");
      spacer.style.width = "24px";
      popupHeader.appendChild(spacer);
    }

    // Create popup title
    const popupTitle = document.createElement("h2");
    popupTitle.classList.add("popup-title");
    popupTitle.textContent = title;
    popupTitle.style.textAlign = "center";
    popupTitle.style.margin = "0";
    popupTitle.style.fontSize = "18px";
    popupTitle.style.fontWeight = "600";
    popupTitle.style.flex = "1";

    // Add bKash logo to right side of header
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("popup-logo");
    logoContainer.style.display = "flex";
    logoContainer.style.alignItems = "center";

    const logo = document.createElement("img");
    logo.src = "images/bkashlogo.png"; // Make sure this path is correct
    logo.alt = "বিকাশ";
    logo.style.height = "30px";
    logo.style.marginRight = "10px";

    logoContainer.appendChild(logo);

    // Add close button
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("popup-close");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.backgroundColor = "transparent";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.color = "#ffffff";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", () => hideAllPopups());

    // Assemble header components
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(logoContainer);
    popupHeader.appendChild(closeBtn);

    // Create popup content
    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    popupContent.innerHTML = content;

    // Add components to popup
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);

    return popup;
  }

  // Show popup with overlay
  function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
      document.querySelectorAll(".popup").forEach((p) => {
        p.classList.remove("show");
      });

      overlay.classList.add("show");
      popup.classList.add("show");

      // Setup event listeners based on which popup is shown
      setupPopupEventListeners(popupId);
    }
  }

  // Hide popup
  function hidePopup(popupId) {
    const popup = document.getElementById(popupId);

    if (popup) {
      popup.classList.remove("show");
    }
  }

  // Hide all popups
  function hideAllPopups() {
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.remove("show");
    });

    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.classList.remove("show");
    }
  }

  // Show notification
  function showNotification(message) {
    const notification = document.getElementById("notification");
    if (notification) {
      notification.textContent = message;
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  }

  // Save user data to localStorage
  function saveUserToLocalStorage() {
    try {
      localStorage.setItem("bkashUser", JSON.stringify(currentUser));
      console.log("User data saved to localStorage", currentUser);
    } catch (e) {
      console.error("Error saving user data:", e);
    }
  }

  // ====================================
  // PART 4: EVENT HANDLER IMPLEMENTATION AND BUSINESS LOGIC
  // ====================================

  // Setup event listeners for popups
  function setupPopupEventListeners(popupId) {
    if (popupId === "loginPopup") {
      setupLoginPopup();
    } else if (popupId === "loginVerificationPopup") {
      setupLoginVerificationPopup();
    } else if (popupId === "loginCodePopup") {
      setupLoginCodePopup();
    } else if (popupId === "loginPinPopup") {
      setupLoginPinPopup();
    } else if (popupId === "numberVerificationPopup") {
      setupNumberVerificationPopup();
    } else if (popupId === "operatorSelectionPopup") {
      setupOperatorSelectionPopup();
    } else if (popupId === "identitySelectionPopup") {
      setupIdentitySelectionPopup();
    } else if (popupId === "verificationCodePopup") {
      setupVerificationCodePopup();
    } else if (popupId === "termsPopup") {
      setupTermsPopup();
    } else if (popupId === "eKycPopup") {
      setupEkycPopup();
    } else if (popupId === "nidUploadPopup") {
      setupNidUploadPopup();
    } else if (popupId === "nidDetailsPopup") {
      setupNidDetailsPopup();
    } else if (popupId === "faceVerificationPopup") {
      setupFaceVerificationPopup();
    } else if (popupId === "pinSetupPopup") {
      setupPinSetupPopup();
    } else if (popupId === "successPopup") {
      setupSuccessPopup();
    }
  }

  // Login popup handlers
  function setupLoginPopup() {
    const loginBtn = document.getElementById("btnLogin");
    const registerBtn = document.getElementById("btnRegister");
    const viewAppBtn = document.getElementById("btnViewApp");

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        currentUser.accountType = "login";
        hidePopup("loginPopup");
        showPopup("loginVerificationPopup");
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener("click", () => {
        currentUser.accountType = "register";
        hidePopup("loginPopup");
        showPopup("numberVerificationPopup");
      });
    }

    if (viewAppBtn) {
      viewAppBtn.addEventListener("click", () => {
        hideAllPopups();
        showNotification("বিকাশ অ্যাপ ডাউনলোড করুন");
      });
    }
  }

  // Login verification popup handlers - Improved phone validation
  function setupLoginVerificationPopup() {
    const submitBtn = document.getElementById("btnSubmitLoginNumber");
    const mobileInput = document.getElementById("loginMobileNumber");

    if (mobileInput) {
      // Enhanced input validation for Bangladeshi numbers
      mobileInput.addEventListener("input", function () {
        // Force input to only contain numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Ensure it starts with proper Bangladeshi prefixes
        if (this.value.length >= 3) {
          const prefix = this.value.substring(0, 3);
          const validPrefixes = [
            "013",
            "014",
            "015",
            "016",
            "017",
            "018",
            "019",
          ];

          if (!validPrefixes.includes(prefix) && this.value.startsWith("01")) {
            // If starts with 01 but 3rd digit not valid, don't correct it
            // but will be validated on submit
          } else if (!this.value.startsWith("01")) {
            // If doesn't start with 01, correct to default 017
            this.value = "017" + this.value.substring(3);
          }
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const mobileNumber = document.getElementById("loginMobileNumber").value;

        // Enhanced validation for Bangladeshi mobile numbers
        if (mobileNumber.length !== 11) {
          showNotification("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
          return;
        }

        // Validate correct Bangladeshi prefixes
        const prefix = mobileNumber.substring(0, 3);
        const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];

        if (!validPrefixes.includes(prefix)) {
          showNotification(
            "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (013/014/015/016/017/018/019)"
          );
          return;
        }

        // Store mobile number in user object
        currentUser.mobileNumber = mobileNumber;

        // Update mobile number display
        const mobileNumberDisplay = document.getElementById(
          "loginMobileNumberDisplay"
        );
        if (mobileNumberDisplay) {
          mobileNumberDisplay.textContent = "+880" + mobileNumber;
        }

        // Detect operator for icon
        let operatorIcon = determineOperatorIcon(prefix);

        // Update operator icon
        const operatorIconElement =
          document.getElementById("loginOperatorIcon");
        if (operatorIconElement && operatorIcon) {
          operatorIconElement.src = operatorIcon;
        }

        hidePopup("loginVerificationPopup");
        showPopup("loginCodePopup");
      });
    }
  }

  // Determine operator icon based on prefix - Enhanced with better detection
  function determineOperatorIcon(prefix) {
    switch (prefix) {
      case "017":
      case "013":
        return "images/operator-gp.png"; // Grameenphone
      case "018":
        return "images/operator-robi.png"; // Robi
      case "016":
        return "images/operator-airtel.png"; // Airtel
      case "019":
      case "014":
        return "images/operator-banglalink.png"; // Banglalink
      case "015":
        return "images/operator-teletalk.png"; // Teletalk
      default:
        return "images/operator-gp.png"; // Default to Grameenphone
    }
  }

  // Login code verification popup handlers
  function setupLoginCodePopup() {
    const submitBtn = document.getElementById("btnSubmitLoginCode");
    const codeInputs = document.querySelectorAll("#loginCodePopup .code-input");
    const changeNumberBtn = document.getElementById("btnChangeLoginNumber");
    const resendBtn = document.getElementById("btnResendCode");

    // Update mobile number display
    const mobileNumber = document.getElementById("loginMobileNumberDisplay");
    if (mobileNumber && currentUser.mobileNumber) {
      mobileNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    // Setup countdown timer
    setupCountdownTimer();

    // Setup code input focus behavior
    setupCodeInputFields(codeInputs);

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate verification code
        let code = "";
        let isComplete = true;

        codeInputs.forEach((input) => {
          code += input.value;
          if (!input.value) isComplete = false;
        });

        if (!isComplete || code.length !== 6) {
          showNotification("৬ ডিজিটের সম্পূর্ণ কোড দিন");
          return;
        }

        currentUser.verificationCode = code;
        hidePopup("loginCodePopup");
        showPopup("loginPinPopup");
      });
    }

    if (changeNumberBtn) {
      changeNumberBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("loginCodePopup");
        showPopup("loginVerificationPopup");
      });
    }

    if (resendBtn) {
      resendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Simulate code resending
        showNotification("নতুন ভেরিফিকেশন কোড পাঠানো হয়েছে");
        setupCountdownTimer();
        resendBtn.style.opacity = "0.5";
        resendBtn.style.pointerEvents = "none";

        // Clear all input fields
        codeInputs.forEach((input) => {
          input.value = "";
        });

        // Focus on first input
        if (codeInputs.length > 0) {
          codeInputs[0].focus();
        }

        // Re-enable resend button after countdown
        setTimeout(() => {
          resendBtn.style.opacity = "1";
          resendBtn.style.pointerEvents = "auto";
        }, 120000);
      });
    }
  }

  // Login PIN entry popup handlers - Fixed for proper services button functionality and redirect to main.html
  function setupLoginPinPopup() {
    const pinInputs = document.querySelectorAll(".login-pin-input");
    const submitBtn = document.getElementById("btnSubmitLoginPin");
    const showPinCheckbox = document.getElementById("showLoginPinCheckbox");
    const forgotPinBtn = document.getElementById("btnForgotPin");

    // Setup automatic focus behavior for PIN inputs
    setupPinInputFields(pinInputs);

    if (showPinCheckbox) {
      showPinCheckbox.addEventListener("change", function () {
        const inputType = this.checked ? "text" : "password";

        pinInputs.forEach((input) => {
          input.type = inputType;
        });
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Collect and validate PIN
        let pin = "";
        let isPinComplete = true;

        pinInputs.forEach((input) => {
          if (!input.value) isPinComplete = false;
          pin += input.value;
        });

        if (!isPinComplete || pin.length !== 5) {
          showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
          return;
        }

        // For demo, accept any 5-digit PIN
        currentUser.pin = pin;
        currentUser.isLoggedIn = true;

        // Save to localStorage for session persistence
        saveUserToLocalStorage();

        hideAllPopups();
        showNotification("লগইন সফল হয়েছে");

        // Redirect to main.html after successful login
        setTimeout(() => {
          window.location.href = "main.html";
        }, 1000);
      });
    }

    if (forgotPinBtn) {
      forgotPinBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showNotification("পিন রিসেট করার জন্য বিকাশ অ্যাপ ব্যবহার করুন");
      });
    }
  }

  // Number verification popup handlers for registration - Enhanced validation
  function setupNumberVerificationPopup() {
    const submitBtn = document.getElementById("btnSubmitNumber");
    const termsBtn = document.getElementById("btnTermsConditions");
    const mobileInput = document.getElementById("mobileNumber");
    const termsCheckbox = document.getElementById("termsCheckbox");

    if (mobileInput) {
      // Enhanced input validation for Bangladeshi numbers
      mobileInput.addEventListener("input", function () {
        // Force input to only contain numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Ensure it starts with proper Bangladeshi prefixes
        if (this.value.length >= 3) {
          const prefix = this.value.substring(0, 3);
          const validPrefixes = [
            "013",
            "014",
            "015",
            "016",
            "017",
            "018",
            "019",
          ];

          if (!validPrefixes.includes(prefix) && this.value.startsWith("01")) {
            // If starts with 01 but 3rd digit not valid, don't correct it
            // but will be validated on submit
          } else if (!this.value.startsWith("01")) {
            // If doesn't start with 01, correct to default 017
            this.value = "017" + this.value.substring(3);
          }
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const mobileNumber = document.getElementById("mobileNumber").value;

        // Enhanced validation for Bangladeshi mobile numbers
        if (mobileNumber.length !== 11) {
          showNotification("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
          return;
        }

        // Validate correct Bangladeshi prefixes
        const prefix = mobileNumber.substring(0, 3);
        const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];

        if (!validPrefixes.includes(prefix)) {
          showNotification(
            "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (013/014/015/016/017/018/019)"
          );
          return;
        }

        // Validate terms agreement
        if (termsCheckbox && !termsCheckbox.checked) {
          showNotification("নিয়ম ও শর্তসমূহে সম্মত হোন");
          return;
        }

        // Store mobile number in user object
        currentUser.mobileNumber = mobileNumber;

        // Update mobile number display in operator selection
        const displayMobileNumber = document.getElementById(
          "displayMobileNumber"
        );
        if (displayMobileNumber) {
          displayMobileNumber.textContent = "+880" + mobileNumber;
        }

        // Detect operator based on prefix and pre-select in next screen
        detectAndHighlightOperator(prefix);

        hidePopup("numberVerificationPopup");
        showPopup("operatorSelectionPopup");
      });
    }

    if (termsBtn) {
      termsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("numberVerificationPopup");
        showPopup("termsPopup");
      });
    }
  }

  // Detect operator based on mobile number prefix - Enhanced to improve matching
  function detectAndHighlightOperator(prefix) {
    let operatorToSelect = null;

    // Map prefixes to operators
    switch (prefix) {
      case "017":
      case "013":
        operatorToSelect = "grameenphone";
        break;
      case "018":
        operatorToSelect = "robi";
        break;
      case "016":
        operatorToSelect = "airtel";
        break;
      case "019":
      case "014":
        operatorToSelect = "banglalink";
        break;
      case "015":
        operatorToSelect = "teletalk";
        break;
      default:
        // If no match (shouldn't happen with validation), default to GP
        operatorToSelect = "grameenphone";
    }

    // Pre-select operator in next screen
    if (operatorToSelect) {
      setTimeout(() => {
        const operatorItems = document.querySelectorAll(".operator-item");
        operatorItems.forEach((item) => {
          if (item.getAttribute("data-operator") === operatorToSelect) {
            item.classList.add("pre-selected");
            // Add visual indicator for pre-selected operator
            item.style.borderColor = "#e2146c";
            item.style.boxShadow = "0 0 5px rgba(226, 20, 108, 0.3)";
          } else {
            item.classList.remove("pre-selected");
            item.style.borderColor = "";
            item.style.boxShadow = "";
          }
        });
      }, 100);
    }
  }

  // Operator selection popup handlers - Improved validation
  function setupOperatorSelectionPopup() {
    const operatorItems = document.querySelectorAll(".operator-item");
    const cancelBtn = document.getElementById("btnCancelOperator");
    const mobileNumber = currentUser.mobileNumber || "";
    const prefix = mobileNumber.substring(0, 3);

    // Update mobile number display
    const displayMobileNumber = document.getElementById("displayMobileNumber");
    if (displayMobileNumber) {
      displayMobileNumber.textContent = "+880" + mobileNumber;
    }

    operatorItems.forEach((item) => {
      // Validate operator selection against number prefix
      item.addEventListener("click", () => {
        const operator = item.getAttribute("data-operator");
        const prefixes = item.getAttribute("data-prefix").split(",");

        // Check if the mobile number prefix matches the expected prefix for this operator
        const isValidPrefix = prefixes.some((validPrefix) =>
          mobileNumber.startsWith(validPrefix)
        );

        if (!isValidPrefix) {
          showNotification(`এই নম্বরটি ${operator} অপারেটর নয়`);
          return;
        }

        // Set selected operator
        currentUser.operator = operator;

        // Update operator icon in subsequent screens
        updateOperatorIcon(operator);

        hidePopup("operatorSelectionPopup");
        showPopup("identitySelectionPopup");
      });
    });

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("operatorSelectionPopup");
        showPopup("numberVerificationPopup");
      });
    }
  }

  // Update operator icon in all relevant places
  function updateOperatorIcon(operator) {
    const operatorIcons = document.querySelectorAll(".operator-icon");
    const iconSrc = `images/operator-${operator}.png`;

    operatorIcons.forEach((icon) => {
      icon.src = iconSrc;
      icon.alt = operator;
    });
  }

  // Identity selection popup handlers
  function setupIdentitySelectionPopup() {
    const nidBtn = document.getElementById("btnSelectNid");
    const birthCertBtn = document.getElementById("btnSelectBirthCert");

    // Update mobile number display
    const mobileNumberDisplay = document.getElementById("mobileNumberDisplay");
    if (mobileNumberDisplay && currentUser.mobileNumber) {
      mobileNumberDisplay.textContent = "+880" + currentUser.mobileNumber;
    }

    if (nidBtn) {
      nidBtn.addEventListener("click", () => {
        hidePopup("identitySelectionPopup");
        showPopup("verificationCodePopup");
      });
    }

    if (birthCertBtn) {
      birthCertBtn.addEventListener("click", () => {
        showNotification("বর্তমানে শুধুমাত্র NID দিয়ে রেজিস্ট্রেশন সম্ভব");
      });
    }
  }

  // Verification code popup handlers
  function setupVerificationCodePopup() {
    const submitBtn = document.getElementById("btnSubmitVerificationCode");
    const codeInputs = document.querySelectorAll(
      "#verificationCodePopup .code-input"
    );
    const changeNumberBtn = document.getElementById(
      "btnChangeNumberFromVerification"
    );
    const resendBtn = document.getElementById("btnResendCode");

    // Update mobile number and operator icon
    const mobileNumber = document.getElementById("verificationMobileNumber");
    if (mobileNumber && currentUser.mobileNumber) {
      mobileNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    // Setup countdown timer
    setupCountdownTimer();

    // Setup code input focus behavior
    setupCodeInputFields(codeInputs);

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate verification code
        let code = "";
        let isComplete = true;

        codeInputs.forEach((input) => {
          code += input.value;
          if (!input.value) isComplete = false;
        });

        if (!isComplete || code.length !== 6) {
          showNotification("৬ ডিজিটের সম্পূর্ণ কোড দিন");
          return;
        }

        currentUser.verificationCode = code;
        hidePopup("verificationCodePopup");
        showPopup("eKycPopup");
      });
    }

    if (changeNumberBtn) {
      changeNumberBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("verificationCodePopup");
        showPopup("numberVerificationPopup");
      });
    }

    if (resendBtn) {
      resendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Simulate code resending
        showNotification("নতুন ভেরিফিকেশন কোড পাঠানো হয়েছে");
        setupCountdownTimer();
        resendBtn.style.opacity = "0.5";
        resendBtn.style.pointerEvents = "none";

        // Clear all input fields
        codeInputs.forEach((input) => {
          input.value = "";
        });

        // Focus on first input
        if (codeInputs.length > 0) {
          codeInputs[0].focus();
        }

        // Re-enable resend button after countdown
        setTimeout(() => {
          resendBtn.style.opacity = "1";
          resendBtn.style.pointerEvents = "auto";
        }, 120000);
      });
    }
  }

  // Setup countdown timer for verification code
  function setupCountdownTimer() {
    const timerElement = document.getElementById("resendTimer");
    if (!timerElement) return;

    let timeLeft = 120; // 2 minutes
    timerElement.textContent = timeLeft;

    const countdownInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  // Setup input fields for verification code
  function setupCodeInputFields(inputs) {
    if (!inputs || !inputs.length) return;

    // Auto focus to first input
    inputs[0].focus();

    // Setup input behavior
    inputs.forEach((input, index) => {
      // Handle numeric input and auto-advance
      input.addEventListener("input", function (e) {
        // Replace any non-numeric input
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          if (!this.value && index > 0) {
            inputs[index - 1].focus();
          }
        }
      });

      // Handle paste events for the entire code
      input.addEventListener("paste", function (e) {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const numericData = pasteData.replace(/[^0-9]/g, "");

        if (numericData.length > 0) {
          // Distribute pasted digits across inputs
          for (let i = 0; i < inputs.length; i++) {
            if (i < numericData.length) {
              inputs[i].value = numericData[i];
            }
          }

          // Focus the next empty input or the last one
          let focusIndex = Math.min(numericData.length, inputs.length - 1);
          inputs[focusIndex].focus();
        }
      });
    });
  }

  // ====================================
  // PART 5: ADDITIONAL COMPONENTS AND REGISTRATION COMPLETION
  // ====================================

  // Terms popup handlers
  function setupTermsPopup() {
    const acceptBtn = document.getElementById("btnAcceptTerms");
    const cancelBtn = document.getElementById("btnCancelTerms");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        hidePopup("termsPopup");
        // Determine where to go based on where we came from
        if (currentUser.accountType === "register") {
          if (currentUser.verificationCode) {
            showPopup("eKycPopup");
          } else {
            showPopup("numberVerificationPopup");
          }
        } else {
          showPopup("numberVerificationPopup");
        }
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("termsPopup");
        showPopup("numberVerificationPopup");
      });
    }
  }

  // eKYC popup handlers
  function setupEkycPopup() {
    const startBtn = document.getElementById("btnStartNidUpload");

    if (startBtn) {
      startBtn.addEventListener("click", () => {
        hidePopup("eKycPopup");
        showPopup("nidUploadPopup");
      });
    }
  }

  // NID upload popup handlers
  function setupNidUploadPopup() {
    const frontNidInput = document.getElementById("frontNidInput");
    const backNidInput = document.getElementById("backNidInput");
    const frontPreview = document.getElementById("frontNidPreview");
    const backPreview = document.getElementById("backNidPreview");
    const submitBtn = document.getElementById("btnSubmitNidUpload");
    const cancelBtn = document.getElementById("btnCancelNidUpload");

    if (frontNidInput && frontPreview) {
      frontNidInput.addEventListener("change", (e) => {
        handleImageUpload(e, frontPreview);
      });
    }

    if (backNidInput && backPreview) {
      backNidInput.addEventListener("change", (e) => {
        handleImageUpload(e, backPreview);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (
          !frontPreview.classList.contains("has-image") ||
          !backPreview.classList.contains("has-image")
        ) {
          showNotification("NID এর উভয় দিকের ছবি তুলুন");
          return;
        }

        // Simulate NID OCR and extract info
        simulateNidDataExtraction();

        hidePopup("nidUploadPopup");
        showPopup("nidDetailsPopup");
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("nidUploadPopup");
        showPopup("eKycPopup");
      });
    }
  }

  // Handle image upload and preview
  function handleImageUpload(event, previewElement) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      showNotification("শুধুমাত্র ছবি আপলোড করুন");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("ছবির সাইজ 5MB এর কম হতে হবে");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      previewElement.classList.add("has-image");
    };
    reader.readAsDataURL(file);
  }

  // Simulate NID data extraction via OCR
  function simulateNidDataExtraction() {
    // Show loading notification
    showNotification("NID তথ্য যাচাই করা হচ্ছে...");

    // In a real implementation, this would be an API call to an OCR service
    setTimeout(() => {
      // For demo, we'll use predefined data
      const extractedData = {
        name: "আতাউর রহমান",
        fatherName: "আব্দুল ওয়াদুদ",
        motherName: "আফরোজা বেগম",
        dob: "1993-07-25",
        address:
          "আকন্দ বাড়ী, গ্রাম/রাস্তা: হালুয়া রাজার চষ্টি, মনতলা, ডাকঘর: সৈয়দা এলাকা - ২০০১, জামালপুর সদর, জামালপুর",
        nidNumber: "1993391368",
      };

      // Store in user object
      currentUser.nidInfo = extractedData;

      // Populate form fields
      populateNidFormFields(extractedData);
    }, 1000);
  }

  // Populate NID form fields with extracted data
  function populateNidFormFields(data) {
    const nameField = document.getElementById("nidName");
    const fatherNameField = document.getElementById("nidFatherName");
    const motherNameField = document.getElementById("nidMotherName");
    const dobField = document.getElementById("nidDob");
    const addressField = document.getElementById("nidAddress");
    const nidNumberField = document.getElementById("nidNumber");

    if (nameField) nameField.value = data.name;
    if (fatherNameField) fatherNameField.value = data.fatherName;
    if (motherNameField) motherNameField.value = data.motherName;
    if (dobField) dobField.value = data.dob;
    if (addressField) addressField.value = data.address;
    if (nidNumberField) nidNumberField.value = data.nidNumber;
  }

  // NID details popup handlers
  function setupNidDetailsPopup() {
    const submitBtn = document.getElementById("btnSubmitNidDetails");
    const editBtn = document.getElementById("btnEditNidDetails");

    // Populate form with extracted NID data
    if (currentUser.nidInfo) {
      populateNidFormFields(currentUser.nidInfo);
    }

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        // Enable all form fields for editing
        const formInputs = document.querySelectorAll(
          "#nidDetailsPopup input, #nidDetailsPopup textarea"
        );
        formInputs.forEach((input) => {
          input.readOnly = false;
        });

        showNotification("তথ্য সংশোধন করতে পারেন");
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate all required fields
        const nameField = document.getElementById("nidName");
        const fatherNameField = document.getElementById("nidFatherName");
        const motherNameField = document.getElementById("nidMotherName");
        const dobField = document.getElementById("nidDob");
        const addressField = document.getElementById("nidAddress");
        const nidNumberField = document.getElementById("nidNumber");

        if (
          !nameField.value ||
          !fatherNameField.value ||
          !motherNameField.value ||
          !dobField.value ||
          !addressField.value ||
          !nidNumberField.value
        ) {
          showNotification("সকল প্রয়োজনীয় তথ্য দিন");
          return;
        }

        // Validate NID number (10 digits only)
        if (nidNumberField.value.length !== 10) {
          showNotification("সঠিক NID নম্বর দিন (১০ ডিজিট)");
          return;
        }

        // Update user object with form data
        currentUser.nidInfo = {
          name: nameField.value,
          fatherName: fatherNameField.value,
          motherName: motherNameField.value,
          dob: dobField.value,
          address: addressField.value,
          nidNumber: nidNumberField.value,
        };

        hidePopup("nidDetailsPopup");
        showPopup("faceVerificationPopup");
      });
    }
  }

  // Face verification popup handlers
  function setupFaceVerificationPopup() {
    const frontFaceInput = document.getElementById("frontFaceInput");
    const leftFaceInput = document.getElementById("leftFaceInput");
    const rightFaceInput = document.getElementById("rightFaceInput");
    const frontPreview = document.getElementById("frontFacePreview");
    const leftPreview = document.getElementById("leftFacePreview");
    const rightPreview = document.getElementById("rightFacePreview");
    const submitBtn = document.getElementById("btnSubmitFaceVerification");

    if (frontFaceInput && frontPreview) {
      frontFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, frontPreview);
      });
    }

    if (leftFaceInput && leftPreview) {
      leftFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, leftPreview);
      });
    }

    if (rightFaceInput && rightPreview) {
      rightFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, rightPreview);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (
          !frontPreview.classList.contains("has-image") ||
          !leftPreview.classList.contains("has-image") ||
          !rightPreview.classList.contains("has-image")
        ) {
          showNotification("সব তিনটি ছবি তুলুন");
          return;
        }

        // Simulate face verification process
        simulateFaceVerification();
      });
    }
  }

  // Simulate face verification with NID
  function simulateFaceVerification() {
    // Show loading notification
    showNotification("ছবি যাচাই করা হচ্ছে...");

    // Simulate server verification delay
    setTimeout(() => {
      // Success verification simulation
      hidePopup("faceVerificationPopup");
      showPopup("pinSetupPopup");
    }, 2000);
  }

  // PIN setup popup handlers - Enhanced with improved validation
  function setupPinSetupPopup() {
    const pinInputs = document.querySelectorAll(".pin-input");
    const confirmInputs = document.querySelectorAll(".pin-confirm-input");
    const submitBtn = document.getElementById("btnSubmitPin");
    const showPinCheckbox = document.getElementById("showPinCheckbox");

    // Setup automatic focus behavior for PIN inputs
    setupPinInputFields(pinInputs);
    setupPinInputFields(confirmInputs);

    if (showPinCheckbox) {
      showPinCheckbox.addEventListener("change", function () {
        const inputType = this.checked ? "text" : "password";

        pinInputs.forEach((input) => {
          input.type = inputType;
        });

        confirmInputs.forEach((input) => {
          input.type = inputType;
        });
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Collect and validate PIN
        let pin = "";
        let confirmPin = "";
        let isPinComplete = true;
        let isConfirmComplete = true;

        pinInputs.forEach((input) => {
          if (!input.value) isPinComplete = false;
          pin += input.value;
        });

        confirmInputs.forEach((input) => {
          if (!input.value) isConfirmComplete = false;
          confirmPin += input.value;
        });

        if (!isPinComplete || !isConfirmComplete) {
          showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
          return;
        }

        if (pin !== confirmPin) {
          showNotification("পিন মিলছে না");
          // Clear confirm inputs
          confirmInputs.forEach((input) => {
            input.value = "";
          });
          confirmInputs[0].focus();
          return;
        }

        // Validate PIN strength (e.g., not sequential or repeated digits)
        if (isWeakPin(pin)) {
          showNotification("দুর্বল পিন। শক্তিশালী পিন ব্যবহার করুন");
          return;
        }

        // Store PIN and complete registration
        currentUser.pin = pin;
        currentUser.isLoggedIn = true;

        // Save to localStorage for session persistence
        saveUserToLocalStorage();

        // Update account display
        updateAccountDisplay();

        hidePopup("pinSetupPopup");
        showPopup("successPopup");
      });
    }
  }

  // Check if PIN is weak (sequential, repeated, common patterns)
  function isWeakPin(pin) {
    // Check for sequential numbers (e.g., 12345)
    const sequential = "01234567890";
    if (sequential.includes(pin)) return true;

    // Check for reverse sequential (e.g., 54321)
    const reverseSeq = "09876543210";
    if (reverseSeq.includes(pin)) return true;

    // Check for repeated digits (e.g., 11111)
    if (/^(\d)\1{4}$/.test(pin)) return true;

    // Check common PINs
    const commonPins = [
      "12345",
      "54321",
      "11111",
      "22222",
      "33333",
      "44444",
      "55555",
      "66666",
      "77777",
      "88888",
      "99999",
      "00000",
      "98765",
      "56789",
    ];
    if (commonPins.includes(pin)) return true;

    return false;
  }

  // Setup PIN input fields behavior
  function setupPinInputFields(inputs) {
    if (!inputs || !inputs.length) return;

    // Auto focus first input
    inputs[0].focus();

    inputs.forEach((input, index) => {
      // Handle numeric input and auto-advance
      input.addEventListener("input", function (e) {
        // Replace any non-numeric input
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          if (!this.value && index > 0) {
            inputs[index - 1].focus();
          }
        }
      });
    });
  }

  // Update account display in success popup
  function updateAccountDisplay() {
    const accountNumber = document.getElementById("accountNumber");
    const nidNumber = document.getElementById("successNidNumber");

    if (accountNumber && currentUser.mobileNumber) {
      accountNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    if (nidNumber && currentUser.nidInfo && currentUser.nidInfo.nidNumber) {
      // Show masked NID number for security
      const nid = currentUser.nidInfo.nidNumber;
      const maskedNid =
        nid.substring(0, 2) + "XXXXXX" + nid.substring(nid.length - 2);
      nidNumber.textContent = maskedNid;
    }
  }

  // Success popup handlers - Fixed for proper services button functionality
  function setupSuccessPopup() {
    const okButton = document.getElementById("btnSuccessOk");

    updateAccountDisplay();

    if (okButton) {
      okButton.addEventListener("click", () => {
        hideAllPopups();

        // Show login popup directly
        showPopup("loginVerificationPopup");

        // Show notification
        showNotification("লগইন করুন");
      });
    }
  }

  function applyUIChanges() {
    // Add the additional styles
    const styleElement = document.createElement("style");
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);

    // Replace the existing content creation functions
    window.createNidUploadContent = createNidUploadContent;
    window.createSuccessContent = createSuccessContent;

    // Replace the success popup setup function
    window.setupSuccessPopup = setupSuccessPopup;

    // Refresh any open popups to apply changes
    const nidUploadPopup = document.getElementById("nidUploadPopup");
    const successPopup = document.getElementById("successPopup");

    if (nidUploadPopup && nidUploadPopup.classList.contains("show")) {
      const content = nidUploadPopup.querySelector(".popup-content");
      if (content) {
        content.innerHTML = createNidUploadContent();
        setupNidUploadPopup(); // Re-init event handlers
      }
    }

    if (successPopup && successPopup.classList.contains("show")) {
      const content = successPopup.querySelector(".popup-content");
      if (content) {
        content.innerHTML = createSuccessContent();
        setupSuccessPopup(); // Re-init event handlers
      }
    }

    console.log("bKash UI updates applied successfully");
  }

  // Initialize the changes when document is ready
  document.addEventListener("DOMContentLoaded", function () {
    applyUIChanges();
  });

  // Or apply immediately if document is already loaded
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    applyUIChanges();
  }

  // Make showPopup and other necessary functions globally accessible
  window.showPopup = showPopup;
  window.hideAllPopups = hideAllPopups;
  window.showNotification = showNotification;

  // Add CSS for improved popup styling and PIN input design
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Service Grid Enhanced Styling */
    .service-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px 30px !important;
      padding: 0 3% !important;
    }
    
    .service-item {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #444;
      padding: 8px !important;
      border-radius: 8px;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .service-item:hover {
      background-color: #f5f5f5;
      transform: translateY(-2px);
    }
    
    .service-icon {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    /* Login Component Enhanced Styles */
    .login-buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
      margin-bottom: 15px;
    }
    
    .login-buttons .btn-primary,
    .login-buttons .btn-secondary {
      flex: 0 0 48%;
      max-width: 48%;
    }
    
    /* Enhanced PIN Input Styling */
    .pin-input-container {
      margin: 20px 0;
    }
    
    .pin-input-wrapper {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 15px 0;
    }
    
    .pin-input,
    .pin-confirm-input,
    .login-pin-input {
      width: 45px;
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 20px;
      text-align: center;
      outline: none;
      transition: border-color 0.3s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .pin-input:focus,
    .pin-confirm-input:focus,
    .login-pin-input:focus {
      border-color: #e2146c;
      box-shadow: 0 0 0 3px rgba(226, 20, 108, 0.2);
    }
    
    .show-pin-container {
      display: flex;
      justify-content: center;
      margin: 15px 0;
    }
    
    .show-pin-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    
    .show-pin-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    
    .checkbox-text {
      font-size: 14px;
      color: #666;
    }
    
    .pin-forgot {
      margin-top: 15px;
      text-align: center;
    }
    
    .pin-forgot a {
      color: #e2146c;
      text-decoration: none;
    }
    
    .pin-forgot a:hover {
      text-decoration: underline;
    }
    
    /* Enhanced Popup Styling */
    .popup {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      overflow: hidden;
    }
    
    .popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      background-color: #e2146c !important;
      color: #ffffff !important;
    }
    
    .popup-title {
      text-align: center;
      flex-grow: 1;
      font-weight: 600;
      margin: 0;
    }
    
    .popup-back {
      opacity: 0.8;
      transition: opacity 0.2s ease;
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
    }
    
    .popup-back:hover {
      opacity: 1;
    }
    
    .popup-close {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 24px;
      cursor: pointer;
    }
    
    /* Popup logo styling */
    .popup-logo {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    
    .popup-logo img {
      height: 30px;
    }
    
    /* Form Elements Enhancement */
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #555;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      transition: border-color 0.3s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #e2146c;
      outline: none;
      box-shadow: 0 0 0 3px rgba(226, 20, 108, 0.1);
    }
    
    .input-help {
      display: block;
      font-size: 12px;
      color: #777;
      margin-top: 5px;
    }
    
    .mobile-input {
      display: flex;
      overflow: hidden;
      border: 1px solid #ddd;
      border-radius: 8px;
      transition: border-color 0.3s;
    }
    
    .mobile-input:focus-within {
      border-color: #e2146c;
      box-shadow: 0 0 0 3px rgba(226, 20, 108, 0.1);
    }
    
    .country-code {
      background: #f5f5f5;
      padding: 12px 15px;
      border-right: 1px solid #ddd;
      color: #555;
      display: flex;
      align-items: center;
    }
    
    .mobile-input input {
      flex: 1;
      border: none !important;
      padding: 12px 15px;
      outline: none;
    }
  `;

  document.head.appendChild(styleElement);
});
