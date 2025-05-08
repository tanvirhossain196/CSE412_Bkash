document.addEventListener("DOMContentLoaded", function () {
  // Initialize with the agent button already in HTML
  const agentBtn = document.getElementById("agentButton");

  if (agentBtn) {
    // Add click event to agent button
    agentBtn.addEventListener("click", function () {
      showAgentOptions();
    });
  }

  // Check if redirected from PIN setup
  const redirectedFromPinSetup = localStorage.getItem("redirectedFromPinSetup");
  if (redirectedFromPinSetup === "true") {
    // Clear the flag
    localStorage.removeItem("redirectedFromPinSetup");
    // Show agent login popup automatically
    showAgentLoginPopup();
  }

  // Create popup containers for agent login and registration if they don't exist
  createAgentPopups();

  // ====================================
  // FUNCTIONS
  // ====================================

  // Function to show agent options popup
  function showAgentOptions() {
    const agentOptionsContent = `
      <div class="login-options">
        <div class="login-message">
          <p>বিকাশ এজেন্ট লগইন অথবা রেজিস্ট্রেশন করুন</p>
        </div>
        <div class="login-buttons">
          <button class="btn-primary login-btn" id="btnAgentLogin">লগইন</button>
          <button class="btn-secondary register-btn" id="btnAgentRegister">এজেন্ট রেজিস্ট্রেশন</button>
        </div>
      </div>
    `;

    createPopup(
      "agentOptionsPopup",
      "এজেন্ট অ্যাকসেস",
      agentOptionsContent,
      false
    ); // No back button for initial popup

    // Add event listeners for the buttons
    setTimeout(() => {
      document
        .getElementById("btnAgentLogin")
        .addEventListener("click", function () {
          hidePopup("agentOptionsPopup");
          showAgentLoginPopup();
        });

      document
        .getElementById("btnAgentRegister")
        .addEventListener("click", function () {
          hidePopup("agentOptionsPopup");
          showAgentRegistrationPopup();
        });
    }, 100);
  }

  // Function to show agent login popup - Exactly matching screenshot
  function showAgentLoginPopup() {
    clearAllPopups();

    const agentLoginContent = `
      <div class="number-verification">
        <div class="logo-section">
          <div class="bkash-logo">
            <img src="images/bkash-bird-logo.png" alt="বিকাশ লোগো">
          </div>
        </div>
        <div class="form-group">
          <label>এজেন্ট নাম্বার <span class="required">*</span></label>
          <div class="mobile-input">
            <span class="country-code">+88</span>
            <div class="input-with-icon">
              <i class="fas fa-mobile-alt input-icon"></i>
              <input type="tel" id="agentNumber" placeholder="01xxxxxxxxx" maxlength="11" pattern="01[0-9]{9}" required>
            </div>
          </div>
          <small class="input-help">১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন</small>
        </div>
        <button class="btn-primary" id="btnSubmitAgentNumber">নাম্বার দিয়ে অগ্রসর হন</button>
      </div>
    `;

    createPopup(
      "agentLoginPopup",
      "এজেন্ট লগইন",
      agentLoginContent,
      true,
      function () {
        hidePopup("agentLoginPopup");
        showAgentOptions();
      }
    );

    // Add event listener for the submit button with validation
    setTimeout(() => {
      const agentNumberInput = document.getElementById("agentNumber");
      const btnSubmit = document.getElementById("btnSubmitAgentNumber");

      // Number validation on input
      agentNumberInput.addEventListener("input", function () {
        // Only allow digits
        this.value = this.value.replace(/[^0-9]/g, "");

        // Auto-prefix with "01" if user tries to enter something else
        if (this.value.length >= 2 && !this.value.startsWith("01")) {
          this.value = "01" + this.value.substring(2);
        }
      });

      btnSubmit.addEventListener("click", function () {
        const agentNumber = agentNumberInput.value;

        // Validate agent number
        if (agentNumber.length !== 11) {
          showNotification("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
          return;
        }

        if (!agentNumber.startsWith("01")) {
          showNotification("মোবাইল নাম্বার ০১ দিয়ে শুরু হতে হবে");
          return;
        }

        // Store agent number
        localStorage.setItem("agentNumber", agentNumber);

        // Proceed to PIN entry
        hidePopup("agentLoginPopup");
        showAgentPinPopup();
      });

      // Style the input and button to match screenshot
      const mobileInput = document.querySelector(".mobile-input");
      if (mobileInput) {
        mobileInput.style.display = "flex";
        mobileInput.style.border = "1px solid #e0e0e0";
        mobileInput.style.borderRadius = "5px";
        mobileInput.style.overflow = "hidden";
      }

      const countryCode = document.querySelector(".country-code");
      if (countryCode) {
        countryCode.style.padding = "12px 15px";
        countryCode.style.backgroundColor = "#f8f8f8";
        countryCode.style.borderRight = "1px solid #e0e0e0";
        countryCode.style.fontWeight = "500";
      }

      // Style the button exactly like screenshot
      if (btnSubmit) {
        btnSubmit.style.backgroundColor = "#23386a";
        btnSubmit.style.borderColor = "#23386a";
        btnSubmit.style.width = "100%";
        btnSubmit.style.padding = "12px";
        btnSubmit.style.marginTop = "20px";
        btnSubmit.style.borderRadius = "4px";
        btnSubmit.style.fontWeight = "500";
        btnSubmit.style.fontSize = "16px";
      }

      // Style the agent number input to match screenshot
      if (agentNumberInput) {
        agentNumberInput.style.border = "none";
        agentNumberInput.style.padding = "12px 15px 12px 35px";
        agentNumberInput.style.width = "100%";
        agentNumberInput.style.fontSize = "16px";
        agentNumberInput.style.outline = "none";
      }

      // Style logo section to match screenshot
      const logoSection = document.querySelector(".logo-section");
      if (logoSection) {
        logoSection.style.textAlign = "center";
        logoSection.style.margin = "0 0 20px 0";
      }

      // Style the small helper text
      const inputHelp = document.querySelector(".input-help");
      if (inputHelp) {
        inputHelp.style.fontSize = "12px";
        inputHelp.style.color = "#777";
        inputHelp.style.marginTop = "5px";
      }
    }, 100);
  }

  // Function to show agent PIN popup - simplified for quick login
  function showAgentPinPopup() {
    clearAllPopups();

    const agentPinContent = `
      <div class="pin-setup">
        <h3>আপনার এজেন্ট পিন দিন</h3>
        <p>আপনার ৫ সংখ্যার পিন দিন</p>
        <div class="security-warning">
          <div class="warning-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <p>আপনার পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
        </div>
        
        <div class="pin-input-container">
          <div class="pin-input-wrapper">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]">
            <input type="password" maxlength="1" class="login-pin-input" pattern="[0-9]">
          </div>
        </div>
        
        <div class="show-pin-container">
          <label class="show-pin-label">
            <input type="checkbox" id="showAgentPinCheckbox">
            <span class="checkbox-text">পিন দেখুন</span>
          </label>
        </div>
        
        <button class="btn-primary" id="btnSubmitAgentPin">লগইন করুন</button>
      </div>
    `;

    createPopup(
      "agentPinPopup",
      "এজেন্ট পিন",
      agentPinContent,
      true,
      function () {
        hidePopup("agentPinPopup");
        showAgentLoginPopup();
      }
    );

    // Add event listeners
    setTimeout(() => {
      // PIN input field behavior
      setupPinInputFields(document.querySelectorAll(".login-pin-input"));

      // Style PIN input fields
      const loginPinInputs = document.querySelectorAll(".login-pin-input");
      loginPinInputs.forEach((input) => {
        input.style.width = "50px";
        input.style.height = "50px";
        input.style.borderRadius = "5px";
        input.style.fontSize = "24px";
        input.style.textAlign = "center";
        input.style.border = "1px solid #ccc";
        input.style.margin = "0 5px";
      });

      // Show/hide PIN
      const showAgentPinCheckbox = document.getElementById(
        "showAgentPinCheckbox"
      );
      if (showAgentPinCheckbox) {
        showAgentPinCheckbox.addEventListener("change", function () {
          const pinInputs = document.querySelectorAll(".login-pin-input");
          const inputType = this.checked ? "text" : "password";
          pinInputs.forEach((input) => {
            input.type = inputType;
          });
        });
      }

      // Style security warning
      const securityWarning = document.querySelector(".security-warning");
      if (securityWarning) {
        securityWarning.style.backgroundColor = "#fff9e6";
        securityWarning.style.border = "1px solid #ffe066";
        securityWarning.style.borderRadius = "5px";
        securityWarning.style.padding = "15px";
        securityWarning.style.margin = "15px 0";
        securityWarning.style.display = "flex";
        securityWarning.style.alignItems = "center";
      }

      // Style button
      const loginBtn = document.getElementById("btnSubmitAgentPin");
      if (loginBtn) {
        loginBtn.style.backgroundColor = "#23386a";
        loginBtn.style.borderColor = "#23386a";
        loginBtn.style.width = "100%";
        loginBtn.style.padding = "12px";
        loginBtn.style.marginTop = "20px";
        loginBtn.style.fontSize = "16px";
        loginBtn.style.fontWeight = "500";
      }

      // Submit button with direct onclick method
      const btnSubmitAgentPin = document.getElementById("btnSubmitAgentPin");
      if (btnSubmitAgentPin) {
        btnSubmitAgentPin.onclick = function (e) {
          e.preventDefault();

          // Collect PIN
          let pin = "";
          const pinInputs = document.querySelectorAll(".login-pin-input");
          let isPinComplete = true;

          pinInputs.forEach((input) => {
            if (!input.value) isPinComplete = false;
            pin += input.value || "";
          });

          if (!isPinComplete) {
            showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
            return;
          }

          // Get stored PIN
          const storedAgentData = JSON.parse(
            localStorage.getItem("agentData") || "{}"
          );
          const storedPin = storedAgentData.pin;

          // Validate PIN
          if (pin !== storedPin) {
            showNotification("ভুল পিন! আবার চেষ্টা করুন");
            // Clear inputs
            pinInputs.forEach((input) => {
              input.value = "";
            });
            pinInputs[0].focus();
            return;
          }

          // Update agent data
          storedAgentData.isLoggedIn = true;
          localStorage.setItem("agentData", JSON.stringify(storedAgentData));

          // Show success notification
          showNotification("এজেন্ট লগইন সফল হয়েছে");

          // Redirect to agent.html
          setTimeout(() => {
            window.location.href = "agent.html";
          }, 1000);
        };
      }
    }, 200);
  }

  // Function to show agent registration popup
  function showAgentRegistrationPopup() {
    clearAllPopups();

    const agentRegistrationContent = `
      <div class="agent-registration-form">
        <div class="form-group">
          <label>দোকানের নাম <span class="required">*</span></label>
          <div class="input-with-icon">
            <i class="fas fa-store input-icon"></i>
            <input type="text" id="shopName" placeholder="দোকানের নাম" required>
          </div>
        </div>
        
        <div class="form-group">
          <label>জেলা নির্বাচন করুন <span class="required">*</span></label>
          <div class="input-with-icon">
            <i class="fas fa-map-marker-alt input-icon"></i>
            <select id="district" class="form-select">
              <option value="" disabled selected>জেলা নির্বাচন করুন</option>
              <option value="dhaka">ঢাকা</option>
              <option value="chittagong">চট্টগ্রাম</option>
              <option value="sylhet">সিলেট</option>
              <option value="rajshahi">রাজশাহী</option>
              <option value="khulna">খুলনা</option>
              <option value="barisal">বরিশাল</option>
              <option value="rangpur">রংপুর</option>
              <option value="mymensingh">ময়মনসিংহ</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label>এলাকা নির্বাচন করুন <span class="required">*</span></label>
          <div class="input-with-icon">
            <i class="fas fa-location-arrow input-icon"></i>
            <select id="area" class="form-select">
              <option value="" disabled selected>এলাকা নির্বাচন করুন</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label>যোগাযোগের কারণে নাম লিখুন <span class="required">*</span></label>
          <div class="input-with-icon">
            <i class="fas fa-user input-icon"></i>
            <input type="text" id="contactName" placeholder="নাম লিখুন" required>
          </div>
        </div>
        
        <div class="form-group">
          <label>ফোন নাম্বর <span class="required">*</span></label>
          <div class="input-with-icon">
            <i class="fas fa-mobile-alt input-icon"></i>
            <input type="tel" id="phoneNumber" placeholder="ফোন নাম্বর লিখুন" maxlength="11" required>
          </div>
        </div>
        
        <div class="form-group">
          <label>ইমেইল ঠিকানা</label>
          <div class="input-with-icon">
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" id="email" placeholder="ইমেইল ঠিকানা লিখুন">
          </div>
        </div>
        
        <div class="form-group">
          <label>সর্বশেষ বয়স বা জন্মের তারিখ দিন</label>
          <div class="input-with-icon">
            <i class="fas fa-calendar-alt input-icon"></i>
            <input type="text" id="age" placeholder="সর্বশেষ বয়স" required>
          </div>
        </div>
        
        <div class="captcha-container">
          <div class="g-recaptcha">
            <label class="captcha-label">
              <input type="checkbox" id="fakeRecaptcha"> আমি রোবট নই
            </label>
          </div>
        </div>
        
        <button class="btn-primary" id="btnSubmitRegistration">জমা দিন</button>
      </div>
    `;

    createPopup(
      "agentRegistrationPopup",
      "এজেন্ট রেজিস্ট্রেশন",
      agentRegistrationContent,
      true,
      function () {
        hidePopup("agentRegistrationPopup");
        showAgentOptions();
      }
    );

    // Add event listeners
    setTimeout(() => {
      // Populate areas based on district
      const districtSelect = document.getElementById("district");
      const areaSelect = document.getElementById("area");

      districtSelect.addEventListener("change", function () {
        areaSelect.innerHTML =
          '<option value="" disabled selected>এলাকা নির্বাচন করুন</option>';

        const district = this.value;
        let areas = [];

        // Add areas based on selected district
        switch (district) {
          case "dhaka":
            areas = ["মিরপুর", "গুলশান", "ধানমন্ডি", "মোহাম্মদপুর", "উত্তরা"];
            break;
          case "chittagong":
            areas = ["আগ্রাবাদ", "নাসিরাবাদ", "হালিশহর", "পতেঙ্গা"];
            break;
          case "sylhet":
            areas = ["ঝলোকাঠি", "আম্বরখানা", "সুবিদবাজার"];
            break;
          case "rajshahi":
            areas = ["বোয়ালিয়া", "শাহমখদুম", "রাজপাড়া"];
            break;
          case "khulna":
            areas = ["খালিশপুর", "সোনাডাঙ্গা", "দৌলতপুর"];
            break;
          default:
            areas = ["প্রধান এলাকা", "শহর", "গ্রাম"];
        }

        areas.forEach((area) => {
          const option = document.createElement("option");
          option.value = area;
          option.textContent = area;
          areaSelect.appendChild(option);
        });
      });

      // Submit button - Modified to go directly to PIN setup
      document
        .getElementById("btnSubmitRegistration")
        .addEventListener("click", function () {
          // Validate form
          const shopName = document.getElementById("shopName").value;
          const district = document.getElementById("district").value;
          const area = document.getElementById("area").value;
          const contactName = document.getElementById("contactName").value;
          const phoneNumber = document.getElementById("phoneNumber").value;
          const recaptchaChecked =
            document.getElementById("fakeRecaptcha").checked;

          if (!shopName || !district || !area || !contactName || !phoneNumber) {
            showNotification("সমস্ত প্রয়োজনীয় তথ্য পূরণ করুন");
            return;
          }

          if (!recaptchaChecked) {
            showNotification("রেকাপচা চেক করুন");
            return;
          }

          // Store registration data
          const registrationData = {
            shopName,
            district,
            area,
            contactName,
            phoneNumber,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value,
          };

          localStorage.setItem(
            "agentRegistrationData",
            JSON.stringify(registrationData)
          );
          localStorage.setItem("agentNumber", phoneNumber);

          // Proceed directly to PIN setup (skip verification)
          hidePopup("agentRegistrationPopup");
          showSetPinPopup();
        });
    }, 100);
  }

  // Function to show set PIN popup - Direct button binding
  function showSetPinPopup() {
    // Clear all previous popups but keep overlay
    const popupContainer = document.getElementById("agentPopupContainer");
    if (popupContainer) {
      popupContainer.innerHTML = "";
    }

    // Make sure popup containers exist
    ensurePopupContainersExist();

    // Ensure overlay is visible
    const overlay = document.getElementById("agentOverlay");
    if (overlay) {
      overlay.classList.add("show");
    }

    const setPinContent = `
    <div class="pin-setup">
      <p>৫ সংখ্যার একটি পিন সেট করুন যা আপনি মনে রাখতে পারবেন</p>
      
      <div class="security-warning">
        <div class="warning-icon">
          <i class="fas fa-shield-alt"></i>
        </div>
        <p>আপনার পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
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
        <p>এই পিন দিয়ে আপনি বিকাশ এজেন্ট প্যানেলে লগইন করতে পারবেন</p>
      </div>
      <button type="button" class="btn-primary" id="btnSubmitPin">আগিয়ে যান</button>
    </div>
  `;

    // Create popup with exact styling to match screenshot
    createPopup("setPinPopup", "পিন সেট করুন", setPinContent, false);

    // Style PIN fields immediately
    const allPinInputs = document.querySelectorAll(
      ".pin-input, .pin-confirm-input"
    );
    allPinInputs.forEach((input) => {
      input.style.width = "50px";
      input.style.height = "50px";
      input.style.borderRadius = "5px";
      input.style.fontSize = "24px";
      input.style.textAlign = "center";
      input.style.border = "1px solid #ccc";
      input.style.margin = "0 5px";
    });

    // Style security warning immediately
    const securityWarning = document.querySelector(".security-warning");
    if (securityWarning) {
      securityWarning.style.backgroundColor = "#fff9e6";
      securityWarning.style.border = "1px solid #ffe066";
      securityWarning.style.borderRadius = "5px";
      securityWarning.style.padding = "15px";
      securityWarning.style.margin = "15px 0";
      securityWarning.style.display = "flex";
      securityWarning.style.alignItems = "center";
    }

    // Style button immediately
    const submitBtn = document.getElementById("btnSubmitPin");
    if (submitBtn) {
      submitBtn.style.backgroundColor = "#23386a";
      submitBtn.style.borderColor = "#23386a";
      submitBtn.style.width = "100%";
      submitBtn.style.padding = "12px";
      submitBtn.style.marginTop = "20px";
      submitBtn.style.fontWeight = "500";
      submitBtn.style.fontSize = "16px";
      submitBtn.style.cursor = "pointer";
    }

    // Setup PIN input fields after small delay
    setTimeout(function () {
      setupPinInputFields(document.querySelectorAll(".pin-input"));
      setupPinInputFields(document.querySelectorAll(".pin-confirm-input"));

      // Show/hide PIN checkbox event
      const showPinCheckbox = document.getElementById("showPinCheckbox");
      if (showPinCheckbox) {
        showPinCheckbox.addEventListener("change", function () {
          const inputType = this.checked ? "text" : "password";

          document.querySelectorAll(".pin-input").forEach((input) => {
            input.type = inputType;
          });

          document.querySelectorAll(".pin-confirm-input").forEach((input) => {
            input.type = inputType;
          });
        });
      }

      // IMPORTANT: Direct binding for submission button
      const submitPinButton = document.getElementById("btnSubmitPin");
      if (submitPinButton) {
        console.log("Button found, attaching click handler");

        // Remove any existing handlers
        submitPinButton.removeEventListener("click", handlePinSubmit);

        // Add direct handler
        submitPinButton.addEventListener("click", handlePinSubmit);
      } else {
        console.log("Button not found!");
      }
    }, 300);
  }

  // Separate function to handle pin submission
  function handlePinSubmit() {
    console.log("Pin submit button clicked");

    // Collect and validate PIN
    const pinInputs = document.querySelectorAll(".pin-input");
    const confirmInputs = document.querySelectorAll(".pin-confirm-input");
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

    // Store PIN
    localStorage.setItem("agentPin", pin);

    // Create agent data object
    const agentData = {
      agentNumber: localStorage.getItem("agentNumber") || "",
      pin: pin,
      isLoggedIn: false,
      registrationComplete: true,
    };

    // Store agent data
    localStorage.setItem("agentData", JSON.stringify(agentData));

    // INSTANT TRANSITION - No delay
    hideAllPopups();
    showAgentLoginPopup();
  }

  // Function to create popups with enhanced styling
  function createPopup(
    id,
    title,
    content,
    showBackButton = false,
    backCallback = null
  ) {
    ensurePopupContainersExist();
    const popupContainer = document.getElementById("agentPopupContainer");
    const overlay = document.getElementById("agentOverlay");

    // Create popup element
    const popup = document.createElement("div");
    popup.id = id;
    popup.className = "popup";
    popup.style.display = "block"; // Force display block

    // Enhanced styling for a more professional look
    popup.style.width = "450px";
    popup.style.maxWidth = "90%";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.25)";
    popup.style.margin = "auto";

    const popupHeader = document.createElement("div");
    popupHeader.className = "popup-header";
    popupHeader.style.backgroundColor = "#23386a";
    popupHeader.style.color = "#ffffff";
    popupHeader.style.padding = "15px 20px";
    popupHeader.style.borderTopLeftRadius = "8px";
    popupHeader.style.borderTopRightRadius = "8px";
    popupHeader.style.display = "flex";
    popupHeader.style.alignItems = "center";
    popupHeader.style.justifyContent = "space-between";

    // Add back button if needed
    if (showBackButton && backCallback) {
      const backBtn = document.createElement("button");
      backBtn.className = "popup-back";
      backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
      backBtn.style.backgroundColor = "transparent";
      backBtn.style.border = "none";
      backBtn.style.fontSize = "18px";
      backBtn.style.color = "#ffffff";
      backBtn.style.cursor = "pointer";
      backBtn.style.marginRight = "10px";
      backBtn.addEventListener("click", backCallback);
      popupHeader.appendChild(backBtn);
    } else if (showBackButton) {
      // Default back behavior
      const backBtn = document.createElement("button");
      backBtn.className = "popup-back";
      backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
      backBtn.style.backgroundColor = "transparent";
      backBtn.style.border = "none";
      backBtn.style.fontSize = "18px";
      backBtn.style.color = "#ffffff";
      backBtn.style.cursor = "pointer";
      backBtn.style.marginRight = "10px";
      backBtn.addEventListener("click", () => hidePopup(id));
      popupHeader.appendChild(backBtn);
    }

    const popupTitle = document.createElement("h2");
    popupTitle.className = "popup-title";
    popupTitle.textContent = title;
    popupTitle.style.textAlign = "center";
    popupTitle.style.margin = "0";
    popupTitle.style.fontSize = "18px";
    popupTitle.style.fontWeight = "600";
    popupTitle.style.flex = "1";
    popupTitle.style.color = "#ffffff"; // Set text color to white

    const closeBtn = document.createElement("button");
    closeBtn.className = "popup-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.backgroundColor = "transparent";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.color = "#ffffff";
    closeBtn.style.cursor = "pointer";

    // Always redirect to index.html when X is clicked
    closeBtn.addEventListener("click", () => {
      hideAllPopups();
      window.location.href = "index.html";
    });

    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    popupContent.innerHTML = content;

    // Make content scrollable with max height
    popupContent.style.maxHeight = "70vh";
    popupContent.style.overflowY = "auto";
    popupContent.style.padding = "20px";

    // Add some more professional styling
    popupContent.style.backgroundColor = "#ffffff";
    popupContent.style.borderBottomLeftRadius = "8px";
    popupContent.style.borderBottomRightRadius = "8px";

    // Assemble popup
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(closeBtn);
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);

    // Add to container
    popupContainer.appendChild(popup);

    // Show popup and overlay
    overlay.classList.add("show");
    popup.classList.add("show");

    // Enhance form element styling inside popups for a more professional look
    enhanceFormElements(popup);

    return popup;
  }

  // Create all popup containers with enhanced styling
  function createAgentPopups() {
    ensurePopupContainersExist();
  }

  // Helper function to ensure popup containers exist
  function ensurePopupContainersExist() {
    // Create container for popups if not exists
    if (!document.getElementById("agentPopupContainer")) {
      const popupContainer = document.createElement("div");
      popupContainer.id = "agentPopupContainer";
      popupContainer.className = "popup-container";
      document.body.appendChild(popupContainer);
    }

    // Create overlay
    if (!document.getElementById("agentOverlay")) {
      const overlay = document.createElement("div");
      overlay.id = "agentOverlay";
      overlay.className = "overlay";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Darker overlay for better contrast
      document.body.appendChild(overlay);
    }

    // Create notification element
    if (!document.getElementById("agentNotification")) {
      const notification = document.createElement("div");
      notification.id = "agentNotification";
      notification.className = "notification";
      notification.style.borderRadius = "8px";
      notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      document.body.appendChild(notification);
    }

    // Add custom styles to override popup headers and buttons
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .popup-header {
        background-color: #23386a !important;
      }
      .popup-header * {
        color: #ffffff !important;
      }
      .btn-primary {
        background-color: #23386a !important;
        border-color: #23386a !important;
      }
      .btn-primary:hover {
        background-color: #1b2d5a !important;
        border-color: #1b2d5a !important;
        opacity: 0.95;
      }
      .overlay.show {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .popup {
        transition: all 0.3s ease;
      }
      .pin-input-container, .verification-input {
        margin: 20px 0;
      }
      .pin-input-wrapper, .verification-input {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 15px 0;
      }
      .pin-input, .login-pin-input, .code-input, .pin-confirm-input {
        width: 45px !important;
        height: 50px;
        text-align: center;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid #ccc;
      }
      .security-warning {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .security-warning p {
        margin: 0;
        font-size: 14px;
      }
      .mobile-input {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 6px;
        overflow: hidden;
      }
      .country-code {
        background-color: #f8f9fa;
        padding: 12px 10px;
        border-right: 1px solid #ddd;
      }
      .mobile-input input {
        border: none !important;
        border-radius: 0 !important;
      }
      .input-help {
        display: block;
        font-size: 12px;
        color: #666;
        margin-top: 5px;
      }
      .show-pin-container {
        margin: 20px 0;
      }
      .notification.show {
        background-color: #23386a;
        color: white;
        border-left: 5px solid #198ae2;
      }
      .input-with-icon {
        position: relative;
        flex: 1;
      }
      .input-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #777;
      }
      .input-with-icon input {
        padding-left: 35px !important;
        width: 100%;
      }
      .form-group label {
        font-weight: 600;
        margin-bottom: 8px;
        display: block;
      }
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .loading-overlay.show {
        opacity: 1;
      }
      .loading-content {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }
      .loading-spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #198ae2;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      .loading-message {
        font-size: 18px;
        color: #333;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Helper function to enhance form elements for a more professional look with icons
  function enhanceFormElements(popup) {
    // Enhance form inputs
    const inputs = popup.querySelectorAll(
      'input[type="text"], input[type="tel"], input[type="email"], input[type="password"]'
    );
    inputs.forEach((input) => {
      if (
        !input.classList.contains("pin-input") &&
        !input.classList.contains("login-pin-input") &&
        !input.classList.contains("code-input") &&
        !input.classList.contains("pin-confirm-input")
      ) {
        input.style.padding = "12px 15px 12px 35px"; // Extra padding for icons
        input.style.borderRadius = "6px";
        input.style.border = "1px solid #ddd";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";
        input.style.fontSize = "16px";
        input.style.transition = "border-color 0.3s";

        // Check if already wrapped in input-with-icon
        if (
          !input.parentNode.classList.contains("input-with-icon") &&
          !input.parentNode.classList.contains("mobile-input")
        ) {
          // Add icon based on input type
          const wrapper = document.createElement("div");
          wrapper.className = "input-with-icon";

          const icon = document.createElement("i");
          if (input.type === "tel") {
            icon.className = "fas fa-mobile-alt input-icon";
          } else if (input.type === "email") {
            icon.className = "fas fa-envelope input-icon";
          } else if (input.type === "password") {
            icon.className = "fas fa-lock input-icon";
          } else {
            icon.className = "fas fa-user input-icon";
          }

          // Insert wrapper before input
          input.parentNode.insertBefore(wrapper, input);
          // Move input inside wrapper
          wrapper.appendChild(input);
          // Add icon
          wrapper.insertBefore(icon, input);
        }
      }
    });

    // Enhance select elements
    const selects = popup.querySelectorAll("select");
    selects.forEach((select) => {
      select.style.padding = "12px 15px 12px 35px";
      select.style.borderRadius = "6px";
      select.style.border = "1px solid #ddd";
      select.style.width = "100%";
      select.style.boxSizing = "border-box";
      select.style.fontSize = "16px";
      select.style.backgroundColor = "#ffffff";
      select.style.cursor = "pointer";

      // Check if already wrapped
      if (!select.parentNode.classList.contains("input-with-icon")) {
        // Add icon for select
        const wrapper = document.createElement("div");
        wrapper.className = "input-with-icon";

        const icon = document.createElement("i");
        icon.className = "fas fa-map-marker-alt input-icon";

        // Insert wrapper before select
        select.parentNode.insertBefore(wrapper, select);
        // Move select inside wrapper
        wrapper.appendChild(select);
        // Add icon
        wrapper.insertBefore(icon, select);
      }
    });

    // Enhance buttons - Use correct dark blue #23386a
    const buttons = popup.querySelectorAll(".btn-primary, .btn-secondary");
    buttons.forEach((button) => {
      button.style.padding = "12px 20px";
      button.style.borderRadius = "6px";
      button.style.fontWeight = "bold";
      button.style.cursor = "pointer";
      button.style.transition = "background-color 0.3s";

      if (button.classList.contains("btn-primary")) {
        button.style.backgroundColor = "#23386a";
        button.style.borderColor = "#23386a";
        button.style.color = "#ffffff";
      }
    });

    // Enhance form groups
    const formGroups = popup.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      group.style.marginBottom = "20px";
    });

    // Enhance labels
    const labels = popup.querySelectorAll("label");
    labels.forEach((label) => {
      label.style.marginBottom = "8px";
      label.style.display = "block";
      label.style.fontWeight = "500";
    });
  }

  // Function to completely clear all popups
  function clearAllPopups() {
    const popupContainer = document.getElementById("agentPopupContainer");
    const overlay = document.getElementById("agentOverlay");

    if (popupContainer) {
      popupContainer.innerHTML = "";
    }

    if (overlay) {
      overlay.classList.remove("show");
    }
  }

  // Function to show loading overlay
  function showLoadingOverlay(message = "লোড হচ্ছে...") {
    // Create loading overlay if it doesn't exist
    if (!document.getElementById("loadingOverlay")) {
      const loadingOverlay = document.createElement("div");
      loadingOverlay.id = "loadingOverlay";
      loadingOverlay.className = "loading-overlay";

      const loadingContent = document.createElement("div");
      loadingContent.className = "loading-content";

      const spinner = document.createElement("div");
      spinner.className = "loading-spinner";

      const loadingMessage = document.createElement("div");
      loadingMessage.id = "loadingMessage";
      loadingMessage.className = "loading-message";

      loadingContent.appendChild(spinner);
      loadingContent.appendChild(loadingMessage);
      loadingOverlay.appendChild(loadingContent);
      document.body.appendChild(loadingOverlay);
    }

    // Set message and show
    document.getElementById("loadingMessage").textContent = message;
    document.getElementById("loadingOverlay").classList.add("show");
  }

  // Function to hide loading overlay
  function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.classList.remove("show");
    }
  }

  // ====================================
  // HELPER FUNCTIONS
  // ====================================

  // Hide popup
  function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.remove("show");
    }
  }

  // Hide all popups
  function hideAllPopups() {
    const popups = document.querySelectorAll(".popup");
    const overlay = document.getElementById("agentOverlay");

    popups.forEach((popup) => {
      popup.classList.remove("show");
    });

    if (overlay) {
      overlay.classList.remove("show");
    }
  }

  // Show notification
  function showNotification(message) {
    const notification = document.getElementById("agentNotification");
    if (notification) {
      notification.textContent = message;
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
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

  // Setup code input fields for verification code
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

  // Check if user is logged in
  checkAgentLoginStatus();

  // Function to check agent login status
  function checkAgentLoginStatus() {
    const agentData = localStorage.getItem("agentData");

    if (agentData) {
      const parsedData = JSON.parse(agentData);

      if (
        parsedData.isLoggedIn &&
        window.location.pathname.includes("agent.html")
      ) {
        // User is on agent.html and is logged in - do nothing
        // Add agent panel specific behaviors if needed
        setupAgentLogout();
      } else if (
        parsedData.isLoggedIn &&
        !window.location.pathname.includes("agent.html")
      ) {
        // User is logged in but not on agent.html
        // Could redirect to agent.html or show notification based on requirement
      } else if (
        !parsedData.isLoggedIn &&
        window.location.pathname.includes("agent.html")
      ) {
        // User is on agent.html but not logged in - redirect to index
        window.location.href = "index.html";
      }
    } else if (window.location.pathname.includes("agent.html")) {
      // No agent data but on agent.html - redirect to index
      window.location.href = "index.html";
    }
  }

  // Setup agent logout
  function setupAgentLogout() {
    // Look for all logout buttons/links in agent.html
    const logoutButtons = document.querySelectorAll(".user-dropdown-item");

    logoutButtons.forEach((item) => {
      if (item.textContent.includes("লগ আউট")) {
        item.addEventListener("click", function (e) {
          e.preventDefault();

          // Update agent data
          const agentData = JSON.parse(localStorage.getItem("agentData"));
          agentData.isLoggedIn = false;
          localStorage.setItem("agentData", JSON.stringify(agentData));

          // Redirect to index.html
          window.location.href = "index.html";
        });
      }
    });
  }
});
