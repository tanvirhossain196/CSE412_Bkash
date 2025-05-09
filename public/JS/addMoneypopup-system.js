// Add this to the top of all three JS files to ensure consistent popup behavior

// Unified Popup System
const PopupSystem = {
  // Store active popups
  activePopups: [],

  // Create a new popup with consistent sizing and positioning
  createPopup: function (content, options = {}) {
    // Default options
    const defaultOptions = {
      width: "95%",
      maxWidth: "500px",
      closeOnBackdropClick: true,
      showBackButton: true,
      onBack: null,
      gradient: "linear-gradient(135deg, #1c2e58 0%, #112555 100%)",
      titleIcon: "fas fa-credit-card",
      title: "Add Money",
    };

    // Merge options
    const settings = { ...defaultOptions, ...options };

    // Create popup overlay (backdrop)
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container with consistent size
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    popupContainer.style.width = settings.width;
    popupContainer.style.maxWidth = settings.maxWidth;

    // Add header with back button if needed
    let headerHTML = `
      <div class="form-header-gradient" style="background: ${
        settings.gradient
      };">
        <div class="header-content">
          <div class="header-left">
            ${
              settings.showBackButton
                ? `<button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>`
                : ""
            }
            <div class="title-icon">
              <i class="${settings.titleIcon}"></i>
            </div>
          </div>
          <div class="header-center">
            <h3>${settings.title}</h3>
          </div>
          <div class="header-right">
            <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
          </div>
        </div>
      </div>
    `;

    // Add content to popup
    popupContainer.innerHTML =
      headerHTML + `<div class="popup-content">${content}</div>`;

    // Add to DOM
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Store reference to popup elements
    const popup = {
      overlay: popupOverlay,
      container: popupContainer,
      settings: settings,
    };

    // Add to active popups
    this.activePopups.push(popup);

    // Add event listeners
    if (settings.closeOnBackdropClick) {
      popupOverlay.addEventListener("click", () => {
        this.closePopup(popup);
      });
    }

    // Add back button functionality if needed
    if (settings.showBackButton) {
      const backBtn = popupContainer.querySelector(".back-btn");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          if (settings.onBack && typeof settings.onBack === "function") {
            settings.onBack();
          } else {
            this.closePopup(popup);
          }
        });
      }
    }

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    return popup;
  },

  // Close a specific popup
  closePopup: function (popup) {
    if (!popup) return;

    popup.overlay.classList.remove("show");
    popup.container.classList.remove("show");

    setTimeout(() => {
      popup.overlay.remove();
      popup.container.remove();

      // Remove from active popups
      const index = this.activePopups.indexOf(popup);
      if (index > -1) {
        this.activePopups.splice(index, 1);
      }
    }, 300);
  },

  // Close all popups
  closeAllPopups: function () {
    [...this.activePopups].forEach((popup) => {
      this.closePopup(popup);
    });
  },

  // Replace current popup with a new one
  replacePopup: function (content, options = {}) {
    // If there's an active popup, get its position
    const currentPopup = this.activePopups[this.activePopups.length - 1];

    // Close the current popup
    if (currentPopup) {
      this.closePopup(currentPopup);
    }

    // Create new popup
    return this.createPopup(content, options);
  },

  // Add required styles for popups
  addPopupStyles: function () {
    // Check if styles already exist
    if (document.getElementById("unified-popup-styles")) {
      return;
    }

    // Create style element
    const style = document.createElement("style");
    style.id = "unified-popup-styles";
    style.textContent = `
      /* Popup Overlay */
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 2000;
        animation: fadeIn 0.3s ease forwards;
        backdrop-filter: blur(3px);
      }
      
      .popup-overlay.show {
        display: block;
      }
      
      /* Popup Container */
      .popup-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        width: 95%;
        max-width: 500px;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        z-index: 2001;
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .popup-container.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      
      /* Popup Content */
      .popup-content {
        max-height: calc(90vh - 60px); /* Account for header */
        overflow-y: auto;
        padding: 20px;
      }
      
      /* Back Button */
      .back-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
        transition: all 0.2s;
      }
      
      .back-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      /* Header Content */
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 20px;
        position: relative;
        z-index: 1;
      }

      .header-left, .header-right {
        display: flex;
        align-items: center;
      }

      .header-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .header-center h3 {
        font-size: 20px;
        font-weight: 600;
        color: white;
        margin: 0;
        letter-spacing: 0.5px;
      }

      .title-icon {
        width: 36px;
        height: 36px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .title-icon i {
        color: white;
        font-size: 18px;
      }
      
      /* Animation */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;

    document.head.appendChild(style);
  },
};

// Initialize popup system styles
document.addEventListener("DOMContentLoaded", function () {
  PopupSystem.addPopupStyles();
});
