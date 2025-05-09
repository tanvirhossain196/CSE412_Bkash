// donationJS.js - Complete JavaScript for the bKash Donation functionality

// ====================== PART 1: INITIALIZATION AND UTILITY FUNCTIONS ======================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize main elements
  const mainContainer = document.getElementById("mainContainer");
  const foundationItems = document.querySelectorAll(".foundation-item");
  const backButton = document.querySelector(".back-button");

  // Initialize state
  let currentFoundation = null;
  let formState = {
    hideIdentity: false,
    name: "",
    email: "",
    amount: "",
  };

  // Utility function to create popup container
  function createPopupContainer() {
    const popupContainer = document.createElement("div");
    popupContainer.className = "donation-container";
    popupContainer.style.opacity = "0";
    popupContainer.style.transform = "translate(-50%, -50%) scale(0.9)";

    // Add to body
    document.body.appendChild(popupContainer);

    // Force reflow and animate in
    setTimeout(() => {
      popupContainer.style.opacity = "1";
      popupContainer.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    return popupContainer;
  }

  // Utility function to remove popup
  function removePopup(popup) {
    popup.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.9)";

    setTimeout(() => {
      document.body.removeChild(popup);
    }, 300);
  }

  // Utility function to generate standard header for popups
  function generateHeader(title) {
    return `
            <div class="form-header-gradient">
                <div class="header-content">
                    <div class="back-button popup-back-button">
                        <i class="fas fa-arrow-left" style="color: white; font-size: 20px; cursor: pointer;"></i>
                    </div>
                    <div class="header-title">
                        <h3>${title}</h3>
                    </div>
                    <div class="bkash-logo">
                        <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
                    </div>
                </div>
            </div>
        `;
  }

  // ====================== PART 2: FOUNDATION SELECTION AND DONATION FORM ======================

  // Add click event listeners to foundation items
  foundationItems.forEach((item) => {
    item.addEventListener("click", function () {
      const foundationName = this.querySelector(".foundation-name").textContent;
      const foundationLogo = this.querySelector(".foundation-logo img").src;
      currentFoundation = {
        name: foundationName,
        logo: foundationLogo,
      };

      // Main container should be hidden when showing popup
      mainContainer.style.display = "none";

      showDonationForm(currentFoundation);
    });
  });

  // Handle main back button
  // Replace the back button with a logo in the main page
  if (backButton) {
    // Replace back button with a small bKash logo
    backButton.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 24px; width: auto; object-fit: contain;">';
    backButton.style.cursor = "default"; // Remove the cursor pointer

    // Remove the click event if there was one
    backButton.removeEventListener("click", null);
  }

  // Function to show donation form popup
  function showDonationForm(foundation) {
    const popup = createPopupContainer();

    popup.innerHTML = `
            ${generateHeader("অনুদান")}
            <div class="donation-content">
                <div class="info-banner">
                    <p>অনুদান দিচ্ছেন</p>
                </div>
                <div style="padding: 20px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div class="foundation-logo" style="margin-right: 15px;">
                            <img src="${foundation.logo}" alt="${
      foundation.name
    }">
                        </div>
                        <div class="foundation-name">
                            <p style="font-size: 18px; font-weight: 500;">${
                              foundation.name
                            }</p>
                            <p style="color: #1c2e58; font-size: 14px; cursor: pointer;">আরো জানতে</p>
                        </div>
                    </div>
                    
                    <form id="donationForm">
                        <div style="margin-bottom: 15px; display: flex; align-items: center;">
                            <input type="checkbox" id="hideIdentity" style="width: 18px; height: 18px; margin-right: 10px;">
                            <label for="hideIdentity" style="font-size: 14px;">আমি আমার পরিচয় শেয়ার করতে চাই না</label>
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-size: 14px;">আপনার নাম (ইংরেজিতে)</label>
                            <input type="text" id="donorName" placeholder="এখানে আপনার নাম লিখুন" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-size: 14px;">আপনার ই-মেইল</label>
                            <input type="email" id="donorEmail" placeholder="এখানে আপনার ই-মেইল লিখুন" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 30px;">
                            <label style="display: block; margin-bottom: 5px; font-size: 14px;">অনুদানের পরিমাণ (ইংরেজিতে)</label>
                            <input type="number" id="donationAmount" placeholder="এখানে অনুদানের পরিমাণ লিখুন" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;" required>
                        </div>
                        
                        <p style="font-size: 13px; color: #666; margin-bottom: 20px; text-align: center;">
                            এগিয়ে যাওয়ার মাধ্যমে আপনি আমাদের <span style="color: #1c2e58; text-decoration: underline; cursor: pointer;">শর্তাবলির</span> সাথে সম্মত হচ্ছেন
                        </p>
                        
                        <button type="submit" style="width: 100%;  background: linear-gradient(135deg, #1c2e58 0%, #112555 100%); color: white; border: none; padding: 15px; border-radius: 4px; font-size: 16px; font-weight: 500; cursor: pointer; text-align: center;">
                            অনুদান
                        </button>
                    </form>
                </div>
            </div>
        `;

    // Setup event listeners for the donation form
    const hideIdentityCheckbox = popup.querySelector("#hideIdentity");
    const nameInput = popup.querySelector("#donorName");
    const emailInput = popup.querySelector("#donorEmail");
    const donationForm = popup.querySelector("#donationForm");
    const popupBackButton = popup.querySelector(".popup-back-button");

    // Handle identity hiding toggle
    hideIdentityCheckbox.addEventListener("change", function () {
      formState.hideIdentity = this.checked;

      if (this.checked) {
        nameInput.disabled = true;
        nameInput.style.opacity = "0.5";
        emailInput.disabled = true;
        emailInput.style.opacity = "0.5";
      } else {
        nameInput.disabled = false;
        nameInput.style.opacity = "1";
        emailInput.disabled = false;
        emailInput.style.opacity = "1";
      }
    });

    // Handle form submission
    donationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      formState.name = nameInput.value;
      formState.email = emailInput.value;
      formState.amount = popup.querySelector("#donationAmount").value;

      // Validate amount
      if (
        !formState.amount ||
        isNaN(formState.amount) ||
        formState.amount <= 0
      ) {
        alert("অনুগ্রহ করে সঠিক অনুদানের পরিমাণ দিন");
        return;
      }

      // Remove this popup
      removePopup(popup);

      // Show PIN entry popup
      showPinEntryPopup();
    });

    // Handle back button to return to the foundation list
    popupBackButton.addEventListener("click", function () {
      removePopup(popup);
      // Return to main page with foundation list
      mainContainer.style.display = "flex";
    });
  }

  // ====================== PART 3: PIN ENTRY POPUP ======================

  // Function to show PIN entry popup
  function showPinEntryPopup() {
    const popup = createPopupContainer();

    popup.innerHTML = `
            ${generateHeader("পিন")}
            <div class="donation-content" style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div class="foundation-logo" style="margin: 0 auto 15px; width: 60px; height: 60px;">
                        <img src="${currentFoundation.logo}" alt="${
      currentFoundation.name
    }">
                    </div>
                    <p style="font-size: 16px; font-weight: 500;">${
                      currentFoundation.name
                    }</p>
                </div>
                
                <div style="border: 1px solid #eee; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <p style="font-size: 14px; color: #666; margin-bottom: 5px;">অনুদানের পরিমাণ</p>
                    <p style="font-size: 20px; font-weight: 600;">${
                      formState.amount
                    } টাকা</p>
                </div>
                
                <form id="pinForm">
                    <div class="form-group" style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 10px; font-size: 14px; text-align: center;">আপনার বিকাশ অ্যাকাউন্ট পিন দিন</label>
                        <div style="display: flex; justify-content: center; gap: 8px;">
                            <input type="password" maxlength="1" class="pin-input" style="width: 40px; height: 50px; text-align: center; font-size: 20px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="password" maxlength="1" class="pin-input" style="width: 40px; height: 50px; text-align: center; font-size: 20px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="password" maxlength="1" class="pin-input" style="width: 40px; height: 50px; text-align: center; font-size: 20px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="password" maxlength="1" class="pin-input" style="width: 40px; height: 50px; text-align: center; font-size: 20px; border: 1px solid #ddd; border-radius: 4px;">
                            <input type="password" maxlength="1" class="pin-input" style="width: 40px; height: 50px; text-align: center; font-size: 20px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                    </div>
                    
                    <p style="font-size: 13px; color: #666; margin-bottom: 20px; text-align: center;">
                        পিন দিয়ে আপনি <span style="color: #1c2e58; text-decoration: underline; cursor: pointer;">শর্তাবলির</span> সাথে সম্মত হচ্ছেন
                    </p>
                    
                    <button type="submit" style="width: 100%;  background: linear-gradient(135deg, #1c2e58 0%, #112555 100%); color: white; border: none; padding: 15px; border-radius: 4px; font-size: 16px; font-weight: 500; cursor: pointer; text-align: center;">
                        এগিয়ে যান
                    </button>
                </form>
            </div>
        `;

    // Set up PIN input auto-focus
    const pinInputs = popup.querySelectorAll(".pin-input");

    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === this.maxLength) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    // Focus the first PIN input
    pinInputs[0].focus();

    // Handle PIN form submission
    const pinForm = popup.querySelector("#pinForm");
    const popupBackButton = popup.querySelector(".popup-back-button");

    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get PIN
      let pin = "";
      pinInputs.forEach((input) => {
        pin += input.value;
      });

      // Validate PIN
      if (pin.length !== 5) {
        alert("অনুগ্রহ করে সঠিক 5 ডিজিট পিন দিন");
        return;
      }

      // Remove this popup
      removePopup(popup);

      // Show success popup
      showSuccessPopup();
    });

    // Handle back button - Return to donation form
    popupBackButton.addEventListener("click", function () {
      removePopup(popup);
      // Return to donation form with the selected foundation
      showDonationForm(currentFoundation);
    });
  }

  // ====================== PART 4: SUCCESS POPUP ======================

  // Function to show success popup
  function showSuccessPopup() {
    const popup = createPopupContainer();
    popup.style.height = "auto";
    popup.style.maxHeight = "450px";

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = currentDate.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const transactionId = generateTransactionId();

    // Custom success header instead of using the standard header
    const successHeader = `
      <div class="form-header-gradient" style="background: linear-gradient(135deg, #00a651 0%, #008542 100%);">
          <div class="header-content">
              <div class="back-button popup-back-button">
                  <img src="images/icons/back-icon.png" alt="Back" style="height: 24px; width: 24px; object-fit: contain; cursor: pointer;">
              </div>
              <div class="header-title">
                  <h3>অনুদান সফল</h3>
              </div>
              <div class="bkash-logo">
                  <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">
              </div>
          </div>
      </div>
    `;

    popup.innerHTML = `
            ${successHeader}
            <div class="donation-content" style="padding: 20px; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <div style="width: 80px; height: 80px; background-color: #00a651; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 15px;">
                        <i class="fas fa-check" style="color: white; font-size: 40px;"></i>
                    </div>
                    <h3 style="font-size: 20px; color: #00a651; margin-bottom: 5px;">অনুদান সফল হয়েছে</h3>
                    <p style="font-size: 14px; color: #666;">ধন্যবাদ, আপনার অনুদান সফলভাবে সম্পন্ন হয়েছে</p>
                </div>
                
                <div style="border: 1px solid #eee; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <p style="font-size: 14px; color: #666;">তারিখ ও সময়</p>
                        <p style="font-size: 14px;">${dateString}, ${timeString}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <p style="font-size: 14px; color: #666;">ট্রানজেকশন আইডি</p>
                        <p style="font-size: 14px;">${transactionId}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <p style="font-size: 14px; color: #666;">প্রতিষ্ঠান</p>
                        <p style="font-size: 14px;">${currentFoundation.name}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <p style="font-size: 14px; color: #666;">অনুদানের পরিমাণ</p>
                        <p style="font-size: 14px; font-weight: 600;">${formState.amount} টাকা</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button id="downloadReceipt" style="flex: 1; background-color: white; color: #00a651; border: 1px solid #00a651; padding: 12px; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">
                        ডাউনলোড
                    </button>
                    <button id="donationDone" style="flex: 1; background: linear-gradient(135deg, #00a651 0%, #008542 100%); color: white; border: none; padding: 12px; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">
                        ঠিক আছে
                    </button>
                </div>
            </div>
        `;

    // Set up event listeners
    const downloadButton = popup.querySelector("#downloadReceipt");
    const doneButton = popup.querySelector("#donationDone");
    const popupBackButton = popup.querySelector(".popup-back-button");

    downloadButton.addEventListener("click", function () {
      generateAndDownloadReceipt();
    });

    doneButton.addEventListener("click", function () {
      removePopup(popup);
      // Return to main foundation list
      mainContainer.style.display = "flex";
    });

    // Handle back button - Return to PIN entry screen
    popupBackButton.addEventListener("click", function () {
      removePopup(popup);
      // Return to PIN entry screen
      showPinEntryPopup();
    });
  }

  // Function to generate transaction ID
  function generateTransactionId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // ====================== PART 5: UTILITY FUNCTIONS FOR RECEIPT GENERATION ======================

  // Function to generate and download receipt
  function generateAndDownloadReceipt() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = currentDate.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const transactionId = generateTransactionId();

    const receiptHtml = `
            <!DOCTYPE html>
            <html lang="bn">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>বিকাশ অনুদান রসিদ</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }
                    body {
                        background-color: #f5f5f5;
                        padding: 20px;
                    }
                    .receipt {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: white;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    }
                    .receipt-header {
                         background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
                        color: white;
                        padding: 20px;
                        text-align: center;
                        position: relative;
                    }
                    .receipt-header h2 {
                        font-size: 24px;
                        margin-bottom: 5px;
                    }
                    .receipt-header p {
                        font-size: 14px;
                    }
                    .receipt-logo {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        width: 60px;
                    }
                    .receipt-body {
                        padding: 20px;
                    }
                    .receipt-status {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .receipt-status h3 {
                        color: #00a651;
                        font-size: 20px;
                        margin-bottom: 5px;
                    }
                    .receipt-status p {
                        color: #666;
                        font-size: 14px;
                    }
                    .receipt-details {
                        border: 1px solid #eee;
                        border-radius: 8px;
                        padding: 15px;
                    }
                    .detail-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-bottom: 1px solid #eee;
                    }
                    .detail-row:last-child {
                        border-bottom: none;
                    }
                    .detail-label {
                        color: #666;
                        font-size: 14px;
                    }
                    .detail-value {
                        font-size: 14px;
                        text-align: right;
                    }
                    .detail-value.important {
                        font-weight: bold;
                    }
                    .receipt-footer {
                        text-align: center;
                        padding: 20px;
                        color: #999;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="receipt-header">
                        <h2>বিকাশ অনুদান রসিদ</h2>
                        <p>ট্রানজেকশন আইডি: ${transactionId}</p>
                        <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" class="receipt-logo">
                    </div>
                    
                    <div class="receipt-body">
                        <div class="receipt-status">
                            <h3>অনুদান সফল হয়েছে</h3>
                            <p>ধন্যবাদ, আপনার অনুদান সফলভাবে সম্পন্ন হয়েছে</p>
                        </div>
                        
                        <div class="receipt-details">
                            <div class="detail-row">
                                <span class="detail-label">তারিখ ও সময়</span>
                                <span class="detail-value">${dateString}, ${timeString}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">ট্রানজেকশন আইডি</span>
                                <span class="detail-value">${transactionId}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">প্রতিষ্ঠান</span>
                                <span class="detail-value">${
                                  currentFoundation.name
                                }</span>
                            </div>
                            ${
                              !formState.hideIdentity
                                ? `
                            <div class="detail-row">
                                <span class="detail-label">দাতার নাম</span>
                                <span class="detail-value">${
                                  formState.name || "অজানা"
                                }</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">দাতার ই-মেইল</span>
                                <span class="detail-value">${
                                  formState.email || "অজানা"
                                }</span>
                            </div>
                            `
                                : ""
                            }
                            <div class="detail-row">
                                <span class="detail-label">অনুদানের পরিমাণ</span>
                                <span class="detail-value important">${
                                  formState.amount
                                } টাকা</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="receipt-footer">
                        <p>© ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
                    </div>
                </div>
            </body>
            </html>
        `;

    // Create blob and download
    const blob = new Blob([receiptHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Donation_Receipt_${transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Add CSS for popups
  const style = document.createElement("style");
  style.textContent = `
        .donation-container {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 80vh;
            z-index: 900;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .back-button, .popup-back-button {
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .donation-container {
                border-radius: 0;
                height: 100vh;
                width: 100%;
            }
        }
    `;
  document.head.appendChild(style);
});
