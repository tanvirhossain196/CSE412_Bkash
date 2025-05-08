// Sidebar functionality for bKash
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded, initializing right-side sidebar");

  // Create sidebar elements if they don't exist
  if (!document.getElementById("sidebarOverlay")) {
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
    console.log("Created sidebar overlay");
  }

  if (!document.getElementById("sidebar")) {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.className = "sidebar";

    // Add sidebar header with title
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-user">
          <img src="images/user-avatar.png" alt="User Profile" class="sidebar-user-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMTAgLTE2IDB6Ii8+PC9zdmc+'">
        </div>
        <span class="sidebar-title">বিকাশ মেনু</span>
        <div class="sidebar-close" id="sidebarClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-language">
        <button class="language-btn active">English</button>
        <button class="language-btn">বাংলা</button>
      </div>
      <div class="sidebar-menu" id="menuItems"></div>
    `;

    document.body.appendChild(sidebar);
    console.log("Created sidebar");

    // Add menu items
    const menuItems = [
      { icon: "fa-home", text: "হোম", notification: false, id: "homeMenu" },
      {
        icon: "fa-chart-line",
        text: "স্টেটমেন্ট",
        notification: false,
        id: "statementMenu",
      },
      {
        icon: "fa-exclamation-circle",
        text: "লিমিট",
        notification: true,
        id: "limitMenu",
      },
      {
        icon: "fa-percent",
        text: "কুপন",
        notification: false,
        id: "couponMenu",
      },
      {
        icon: "fa-sync",
        text: "তথ্য হালনাগাদ",
        notification: true,
        id: "updateInfoMenu",
      },
      {
        icon: "fa-id-card",
        text: "নমিনির তথ্য হালনাগাদ",
        notification: true,
        id: "nomineeUpdateMenu",
      },
      {
        icon: "fa-users",
        text: "রেফার বিকাশ অ্যাপ",
        notification: false,
        id: "referMenu",
      },
      {
        icon: "fa-map-marker-alt",
        text: "বিকাশ ম্যাপ",
        notification: false,
        id: "bkashMapMenu",
      },
      {
        icon: "fa-compass",
        text: "বিকাশ নিয়ে জানুন",
        notification: true,
        id: "aboutBkashMenu",
      },
      {
        icon: "fa-cog",
        text: "সেটিংস",
        notification: false,
        id: "settingsMenu",
      },
      {
        icon: "fa-history",
        text: "অটো পে",
        notification: true,
        id: "autoPayMenu",
      },
      {
        icon: "fa-headset",
        text: "সাপোর্ট",
        notification: false,
        id: "supportMenu",
      },
      {
        icon: "fa-sign-out-alt",
        text: "লগ আউট",
        notification: false,
        id: "logoutButton",
      },
    ];

    const menuItemsContainer = document.getElementById("menuItems");
    if (menuItemsContainer) {
      menuItems.forEach((item) => {
        const menuItem = document.createElement("a");
        menuItem.className = "sidebar-menu-item";
        menuItem.href = "#";
        menuItem.id = item.id;

        menuItem.innerHTML = `
          <div class="sidebar-menu-icon">
            <i class="fas ${item.icon}"></i>
          </div>
          <div class="sidebar-menu-text">${item.text}</div>
          ${item.notification ? '<div class="sidebar-notification"></div>' : ""}
        `;

        menuItemsContainer.appendChild(menuItem);
      });
      console.log("Added menu items");
    }
  }

  // Create popup container - for all popups
  if (!document.getElementById("bkashPopupContainer")) {
    const popupContainer = document.createElement("div");
    popupContainer.id = "bkashPopupContainer";
    document.body.appendChild(popupContainer);
  }

  // Remove any existing sidebar styles to avoid conflicts
  const existingStyles = document.querySelectorAll(
    'style[data-id="sidebar-styles"]'
  );
  existingStyles.forEach((style) => style.remove());

  // Add the CSS styles directly to document head
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-id", "sidebar-styles");
  styleElement.textContent = `
    /* Sidebar styles - RIGHT SIDE OPENING */
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1050;
      display: none;
    }
    
    .sidebar-overlay.active {
      display: block;
    }
    
    /* RIGHT SIDE positioning */
    .sidebar {
      position: fixed;
      top: 0;
      right: -80% !important; /* Force right positioning */
      left: auto !important; /* Override any left positioning */
      width: 80%;
      max-width: 350px;
      height: 100%;
      background-color: white;
      z-index: 1100;
      transition: right 0.3s ease !important; /* Force transition on right property */
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    
    /* RIGHT SIDE slide in */
    .sidebar.active {
      right: 0 !important; /* Force right: 0 */
      left: auto !important; /* Override any left positioning */
    }
    
    .sidebar-header {
      background-color: #23386a;
      color: white;
      padding: 15px;
      display: flex;
      align-items: center;
      position: relative;
    }
    
    .sidebar-user {
      margin-right: 15px;
    }
    
    .sidebar-user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .sidebar-title {
      font-size: 20px;
      font-weight: 600;
      flex-grow: 1;
    }
    
    .sidebar-close {
      font-size: 20px;
      cursor: pointer;
    }
    
    .sidebar-language {
      padding: 15px;
      border-bottom: 1px solid #eee;
      display: flex;
      gap: 10px;
    }
    
    .language-btn {
      background-color: transparent;
      border: 1px solid #23386a;
      color: #23386a;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 14px;
      cursor: pointer;
      outline: none;
    }
    
    .language-btn.active {
      background-color: #23386a;
      color: white;
    }
    
    .sidebar-menu {
      flex: 1;
    }
    
    .sidebar-menu-item {
      padding: 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      text-decoration: none;
      color: #333;
    }
    
    .sidebar-menu-item:hover {
      background-color: #f9f9f9;
    }
    
    .sidebar-menu-icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #23386a;
      margin-right: 15px;
      font-size: 18px;
    }
    
    .sidebar-menu-text {
      font-size: 16px;
      flex-grow: 1;
    }
    
    .sidebar-notification {
      width: 8px;
      height: 8px;
      background-color: #23386a;
      border-radius: 50%;
    }
    
    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: white;
      font-size: 24px;
      cursor: pointer;
      margin-right: 15px;
    }
  
    /* Popup styles for all popups */
    .bkash-popup {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100%;
      background-color: white;
      z-index: 1200;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .bkash-popup.active {
      right: 0;
    }

    .popup-header {
      background-color: #23386a;
      color: white;
      padding: 15px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }

    .popup-back {
      margin-right: 15px;
      font-size: 18px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .popup-back:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .popup-title {
      font-size: 18px;
      font-weight: 600;
      flex-grow: 1;
      text-align: center;
    }

    .popup-logo {
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popup-logo img {
      height: 25px;
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
    }

    /* Transaction Statement Styles */
    .statement-tabs {
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 15px;
    }

    .statement-tab {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      font-size: 16px;
      cursor: pointer;
      color: #666;
      position: relative;
    }

    .statement-tab.active {
      color: #23386a;
      font-weight: 500;
    }

    .statement-tab.active:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #23386a;
    }

    .transaction-search {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      border-radius: 30px;
      padding: 5px 15px;
      margin-bottom: 20px;
    }

    .transaction-search i {
      color: #aaa;
      margin-right: 10px;
    }

    .transaction-search input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      outline: none;
      font-size: 14px;
    }

    .filter-button {
      background-color: white;
      border: none;
      color: #23386a;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 5px;
      font-size: 18px;
    }

    .transaction-list {
      margin-bottom: 20px;
    }

    .transaction-group-header {
      font-size: 14px;
      color: #666;
      margin: 15px 0 10px;
    }

    .transaction-item {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #f0f0f0;
    }

    .transaction-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .transaction-icon img {
      width: 30px;
      height: 30px;
    }

    .transaction-details {
      flex: 1;
    }

    .transaction-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 3px;
    }

    .transaction-subtitle {
      font-size: 14px;
      color: #666;
      margin-bottom: 3px;
    }

    .transaction-time {
      font-size: 12px;
      color: #999;
    }

    .transaction-amount {
      font-size: 16px;
      font-weight: 600;
    }

    .transaction-amount.debit {
      color: #23386a;
    }

    .transaction-amount.credit {
      color: #00a651;
    }

    .transaction-id {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  
    .monthly-summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      margin-bottom: 20px;
    }

    .month-navigation {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .month-nav-button {
      background: none;
      border: none;
      font-size: 20px;
      color: #23386a;
      cursor: pointer;
    }

    .month-title {
      font-size: 16px;
      font-weight: 500;
    }

    .last-updated {
      font-size: 12px;
      color: #999;
    }

    .balance-summary {
      display: flex;
      background-color: #f8f8f8;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .balance-col {
      flex: 1;
      padding: 15px;
      text-align: center;
    }

    .balance-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }

    .balance-amount {
      font-size: 18px;
      font-weight: 600;
    }

    .transaction-category {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .category-info {
      display: flex;
      flex-direction: column;
    }

    .category-name {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .category-count {
      font-size: 12px;
      color: #999;
    }

    .category-amount {
      font-size: 16px;
      font-weight: 600;
    }

    .category-amount.debit {
      color: #23386a;
    }

    .category-amount.credit {
      color: #00a651;
    }

    /* Limits Page Styles */
    .limits-tabs {
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 15px;
    }

    .limits-tab {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      font-size: 16px;
      cursor: pointer;
      color: #666;
      position: relative;
    }

    .limits-tab.active {
      color: #23386a;
      font-weight: 500;
    }

    .limits-tab.active:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #23386a;
    }

    .limits-subtabs {
      display: flex;
      margin-bottom: 20px;
    }

    .limits-subtab {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      font-size: 14px;
      cursor: pointer;
      color: #666;
      border-bottom: 1px solid #f0f0f0;
    }

    .limits-subtab.active {
      color: #23386a;
      font-weight: 500;
      border-bottom: 2px solid #23386a;
    }

    .limits-table {
      width: 100%;
      border-collapse: collapse;
    }

    .limits-table td {
      padding: 12px 8px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
    }

    .limits-table tr td:first-child {
      width: 50%;
    }

    .limits-table tr td:nth-child(2) {
      width: 20%;
      text-align: center;
      color: #23386a;
    }

    .limits-table tr td:last-child {
      width: 30%;
      text-align: right;
      font-weight: 500;
    }
  
    /* Coupon Page Styles */
    .coupon-header {
      margin-bottom: 20px;
    }

    .coupon-video-link {
      display: flex;
      align-items: center;
      padding: 15px;
      background-color: #f8f8f8;
      border-radius: 10px;
      margin-bottom: 15px;
      text-decoration: none;
      color: #333;
    }

    .coupon-video-link i {
      color: #23386a;
      margin-right: 10px;
      font-size: 18px;
    }

    .coupon-tabs {
      margin-bottom: 15px;
    }

    .coupon-search {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .coupon-input {
      flex: 1;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px 0 0 8px;
      outline: none;
      font-size: 14px;
    }

    .coupon-search-btn {
      padding: 12px 20px;
      background-color: #999;
      color: white;
      border: none;
      border-radius: 0 8px 8px 0;
      font-size: 14px;
      cursor: pointer;
    }

    .no-coupons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      color: #999;
    }

    .no-coupons-icon {
      font-size: 50px;
      color: #23386a;
      margin-bottom: 20px;
    }

    /* Update Info Styles */
    .update-info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    }

    .update-info-icon {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }

    .update-info-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      text-align: center;
    }

    .update-info-text {
      font-size: 14px;
      color: #666;
      text-align: center;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .update-steps {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 30px;
    }

    .update-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 33%;
    }

    .update-step-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }

    .update-step-text {
      font-size: 12px;
      text-align: center;
      color: #666;
    }

    .update-button {
      padding: 12px 30px;
      background-color: #23386a;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .update-button i {
      margin-left: 10px;
    }
  
    /* Refer App Styles */
    .refer-container {
      padding: 15px 0;
    }

    .refer-card {
      background-color: #f8f8f8;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .refer-image {
      width: 150px;
      margin-bottom: 15px;
    }

    .refer-text {
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }

    .refer-button {
      padding: 10px 30px;
      background-color: #23386a;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 10px;
    }

    .refer-terms {
      font-size: 12px;
      color: #666;
      text-decoration: underline;
    }

    .refer-steps {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .refer-step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .refer-step-icon {
      width: 50px;
      height: 50px;
      background-color: #23386a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      margin-bottom: 10px;
    }

    .refer-step-text {
      font-size: 12px;
      color: #666;
      line-height: 1.3;
    }

    /* Map Styles */
    .map-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .map-search {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      border-radius: 30px;
      padding: 5px 15px;
      margin-bottom: 15px;
    }

    .map-search i {
      color: #aaa;
      margin-right: 10px;
    }

    .map-search input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      outline: none;
      font-size: 14px;
    }

    .map-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      margin-bottom: 15px;
    }

    .map-loading-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.8);
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      color: #333;
    }

    .map-legend {
      display: flex;
      justify-content: space-around;
      padding: 15px 0;
      border-top: 1px solid #f0f0f0;
    }

    .legend-item {
      display: flex;
      align-items: center;
    }
    
    .legend-icon {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .legend-text {
      font-size: 12px;
      color: #666;
    }
  
    /* About bKash Styles */
    .about-container {
      padding: 0 0 20px;
    }
    
    .about-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 20px;
    }
    
    .about-title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 5px;
      color: #23386a;
    }
    
    .about-subtitle {
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    
    .about-sections {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
    
    .about-section {
      padding: 0 15px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #333;
      position: relative;
      padding-left: 15px;
    }
    
    .section-title::before {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      height: 15px;
      width: 3px;
      background-color: #23386a;
    }
    
    .section-text {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
    
    .services-list {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    
    .services-list li {
      font-size: 14px;
      color: #666;
      padding-left: 20px;
      position: relative;
    }
    
    .services-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 0;
      color: #23386a;
    }
    
    .contact-item {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }
    
    .contact-item i {
      color: #23386a;
      margin-right: 10px;
      width: 20px;
      text-align: center;
    }
    
    .social-links {
      display: flex;
      gap: 15px;
      margin-top: 15px;
    }
    
    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #23386a;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background-color: #23386a;
      color: white;
      transform: translateY(-3px);
    }
    
    /* Settings Styles */
    .settings-container {
      padding: 10px 0;
    }
    
    .settings-group {
      margin-bottom: 25px;
    }
    
    .settings-group-title {
      font-size: 16px;
      font-weight: 600;
      color: #666;
      padding: 0 15px 10px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 5px;
    }
    
    .settings-item {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #f5f5f5;
    }
    
    .settings-item-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(226, 20, 108, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: #23386a;
    }
    
    .settings-item-content {
      flex: 1;
    }
    
    .settings-item-title {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 3px;
    }
    
    .settings-item-desc {
      font-size: 12px;
      color: #666;
    }
    
    .settings-item-action {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
    }
    
    .settings-current-value {
      font-size: 14px;
      color: #666;
    }
  
    /* Auto Pay Styles */
    .autopay-container {
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .autopay-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .autopay-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 5px;
      color: #23386a;
    }
    
    .autopay-subtitle {
      font-size: 14px;
      color: #666;
    }
    
    .autopay-setup {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 30px;
      padding: 0 15px;
    }
    
    .setup-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30%;
    }
    
    .setup-step-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #23386a;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .setup-step-text {
      font-size: 13px;
      color: #666;
      text-align: center;
    }
    
    .autopay-actions {
      margin-bottom: 30px;
    }
    
    .autopay-button {
      padding: 12px 25px;
      background-color: #23386a;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .autopay-button i {
      margin-right: 8px;
    }
    
    .no-autopay {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0;
      color: #999;
    }
    
    /* Support Styles */
    .support-container {
      padding: 20px 0;
    }
    
    .support-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 25px;
    }
    
    .support-image {
      margin-bottom: 15px;
    }
    
    .support-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      text-align: center;
    }
    
    .support-search {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      border-radius: 30px;
      padding: 5px 15px;
      margin: 0 15px 25px;
    }
    
    .support-search i {
      color: #aaa;
      margin-right: 10px;
    }
    
    .support-search input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      outline: none;
      font-size: 14px;
    }
    
    .contact-options {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      margin-bottom: 30px;
    }
    
    .contact-option {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 10px;
      background-color: #f8f8f8;
      border-radius: 10px;
    }
    
    .contact-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(226, 20, 108, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #23386a;
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .contact-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 3px;
      text-align: center;
    }
    
    .contact-desc {
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    
    .faq-section {
      padding: 0 15px;
    }
    
    .faq-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
    }
    
    .faq-item {
      margin-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      cursor: pointer;
    }
    
    .faq-question span {
      font-size: 14px;
      font-weight: 500;
    }
    
    .faq-question i {
      color: #23386a;
      transition: transform 0.3s ease;
    }
    
    .faq-answer {
      padding: 0 0 15px;
    }
    
    .faq-answer p {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }
    
    /* Nominee Update Styles */
    .nominee-update-item {
      display: flex;
      align-items: center;
      padding: 20px 15px;
      background-color: #f8f8f8;
      border-radius: 10px;
      margin: 20px 15px;
    }
    
    .nominee-update-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(226, 20, 108, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }
    
    .nominee-update-icon img {
      width: 30px;
      height: 30px;
    }
    
    .nominee-update-text {
      font-size: 16px;
      font-weight: 500;
      flex: 1;
    }
    
    /* WhatsNew Styles */
    .whatsnew-container {
      padding: 15px 0;
    }
    
    .month-selector {
      width: 100%;
      padding: 15px;
      background-color: #23386a;
      color: white;
      font-size: 16px;
      font-weight: 500;
      border: none;
      border-radius: 8px;
      margin-bottom: 20px;
      outline: none;
      cursor: pointer;
      text-align: center;
      position: relative;
    }
    
    .month-selector::after {
      content: '\\f107';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .update-item {
      display: flex;
      padding: 15px;
      background-color: #f8f8f8;
      border-radius: 10px;
      margin-bottom: 15px;
    }
    
    .update-item-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      background-color: rgba(226, 20, 108, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: #23386a;
    }
    
    .update-item-content {
      flex: 1;
    }
    
    .update-item-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
      color: #333;
    }
    
    .update-item-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    
    .update-item-date {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
    
    /* Additional AutoPay Options Styles */
    .autopay-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      padding: 15px;
      margin-top: 20px;
    }
    
    .autopay-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: #f8f8f8;
      border-radius: 10px;
      text-align: center;
      transition: all 0.3s ease;
      text-decoration: none;
      color: #333;
    }
    
    .autopay-option:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .autopay-option-icon {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
    }
    
    .autopay-option-title {
      font-size: 16px;
      font-weight: 500;
      color: #23386a;
    }
    
    /* Home Button Styles */
    .home-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #23386a;
      color: white;
      border: none;
      border-radius: 30px;
      padding: 12px 30px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      margin-top: 30px;
      text-decoration: none;
    }
    
    .home-button i {
      margin-right: 8px;
    }
    
    /* Additional responsive styles */
    @media (max-width: 480px) {
      .contact-options {
        flex-direction: column;
        gap: 15px;
      }
      
      .contact-option {
        width: 100%;
      }
      
      .services-list {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .autopay-options {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Media Queries */
    @media (min-width: 768px) {
      .bkash-popup {
        width: 400px;
        right: -400px;
      }
    }

    /* Map interactive components */
    .map-zoom-controls {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .map-zoom-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #333;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      border: none;
      cursor: pointer;
    }
    
    .map-center-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #23386a;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      border: none;
      cursor: pointer;
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
    
    /* Map marker tooltip */
    .map-marker-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border-radius: 5px;
      padding: 8px 12px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .map-marker-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: white transparent transparent transparent;
    }
    
    .map-marker {
      position: relative;
      cursor: pointer;
    }
    
    .map-marker:hover .map-marker-tooltip {
      visibility: visible;
      opacity: 1;
    }
  `;

  document.head.appendChild(styleElement);
  console.log("Added sidebar styles with RIGHT side positioning");

  // Find the menu toggle element
  const menuToggle = document.querySelector(".menu-toggle");
  console.log("Menu toggle element found:", menuToggle);

  if (menuToggle) {
    // Make sure the cursor style is set to pointer to indicate it's clickable
    menuToggle.style.cursor = "pointer";

    // Add click event using multiple methods for maximum compatibility
    menuToggle.addEventListener("click", toggleSidebar);
    menuToggle.onclick = toggleSidebar;
    console.log("Click event added to menu toggle");
  }

  // Function to toggle sidebar
  function toggleSidebar() {
    console.log("Toggle sidebar function called");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      // Force inline styles to override any conflicting CSS
      sidebar.style.right = "-80%";
      sidebar.style.left = "auto";
      sidebar.style.transition = "right 0.3s ease";

      // Add active class after setting inline styles
      setTimeout(() => {
        sidebar.classList.add("active");
        // Force right:0 through inline style as well
        sidebar.style.right = "0";
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }, 10);
    }
  }

  // Setup close functionality
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
    console.log("Click event added to close button");
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
    console.log("Click event added to overlay");
  }

  // Function to close sidebar
  function closeSidebar() {
    console.log("Close sidebar function called");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      sidebar.classList.remove("active");
      // Also reset inline style
      sidebar.style.right = "-80%";
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Set up language button functionality
  const languageButtons = document.querySelectorAll(".language-btn");
  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      languageButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Function to create a popup
  function createPopup(id, title, content) {
    // Close any open popup first
    closeAllPopups();

    const popupContainer = document.getElementById("bkashPopupContainer");

    const popup = document.createElement("div");
    popup.id = id;
    popup.className = "bkash-popup";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="popup-back">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">${title}</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        ${content}
      </div>
    `;

    popupContainer.appendChild(popup);

    // Add event listener for back button
    popup.querySelector(".popup-back").addEventListener("click", () => {
      closePopup(popup);
    });

    // Animate popup
    setTimeout(() => {
      popup.classList.add("active");
    }, 10);

    return popup;
  }

  // Function to close a specific popup
  function closePopup(popup) {
    popup.classList.remove("active");

    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }

  // Function to close all popups
  function closeAllPopups() {
    const popupContainer = document.getElementById("bkashPopupContainer");
    if (popupContainer) {
      const popups = popupContainer.querySelectorAll(".bkash-popup");
      popups.forEach((popup) => {
        closePopup(popup);
      });
    }
  }

  // Statement menu tab click handlers
  function setupStatementTabs() {
    const tabs = document.querySelectorAll(".statement-tab");
    const detailsContent = document.querySelector(".transaction-list");
    const summaryContent = document.querySelector(".statement-summary-tab");

    if (tabs && tabs.length === 2) {
      tabs[0].addEventListener("click", function () {
        tabs[0].classList.add("active");
        tabs[1].classList.remove("active");
        if (detailsContent && summaryContent) {
          detailsContent.style.display = "block";
          summaryContent.style.display = "none";
        }
      });

      tabs[1].addEventListener("click", function () {
        tabs[1].classList.add("active");
        tabs[0].classList.remove("active");
        if (detailsContent && summaryContent) {
          detailsContent.style.display = "none";
          summaryContent.style.display = "block";
        }
      });
    }
  }

  // Home menu click - redirect to main.html
  const homeMenu = document.getElementById("homeMenu");
  if (homeMenu) {
    homeMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();
      window.location.href = "main.html";
    });
  }

  // Statement menu click - show statement popup
  const statementMenu = document.getElementById("statementMenu");
  if (statementMenu) {
    statementMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const statementContent = `
        <div class="statement-tabs">
          <div class="statement-tab active">লেনদেনের বিবরণী</div>
          <div class="statement-tab">লেনদেনের সারসংক্ষেপ</div>
        </div>
        
        <div class="transaction-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="TrxID বা নাম্বার দিয়ে খুঁজুন">
          <button class="filter-button">
            <i class="fas fa-filter"></i>
          </button>
        </div>
        
        <div class="transaction-list">
          <div class="transaction-group-header">গত ৩০ দিনের লেনদেন</div>
          
          <!-- Transaction Item 1 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <img src="images/icons/image4.png" alt="ক্যাশ আউট">
            </div>
            <div class="transaction-details">
              <div class="transaction-title">ক্যাশ আউট</div>
              <div class="transaction-subtitle">Muslim Pharma_01600000117</div>
              <div class="transaction-time">06:12pm 29/04/25</div>
              <div class="transaction-id">TrxID: CDT6PP16EK</div>
            </div>
            <div class="transaction-amount debit">- ৳8,500.00</div>
          </div>
          
          <!-- Transaction Item 2 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <img src="images/icons/image1.png" alt="রিসিভড মানি">
            </div>
            <div class="transaction-details">
              <div class="transaction-title">রিসিভড মানি</div>
              <div class="transaction-subtitle">Nasir Uddin</div>
              <div class="transaction-time">07:05am 29/04/25</div>
              <div class="transaction-id">TrxID: CDT8P8A2BM</div>
            </div>
            <div class="transaction-amount credit">+ ৳3,500.00</div>
          </div>
          
          <!-- Transaction Item 3 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <img src="images/icons/image1.png" alt="রিসিভড মানি">
            </div>
            <div class="transaction-details">
              <div class="transaction-title">রিসিভড মানি</div>
              <div class="transaction-subtitle">01822133714</div>
              <div class="transaction-time">06:56pm 27/04/25</div>
              <div class="transaction-id">TrxID: CDR0O29PHI</div>
            </div>
            <div class="transaction-amount credit">+ ৳5,100.00</div>
          </div>
          
          <!-- Transaction Item 4 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <img src="images/icons/image3.png" alt="সেন্ড মানি">
            </div>
            <div class="transaction-details">
              <div class="transaction-title">সেন্ড মানি</div>
              <div class="transaction-subtitle">01894671464</div>
              <div class="transaction-time">03:00pm 25/04/25</div>
              <div class="transaction-id">TrxID: CDP7MATCLD</div>
            </div>
            <div class="transaction-amount debit">- ৳750.00</div>
          </div>
          
          <!-- Transaction Item 5 -->
          <div class="transaction-item">
            <div class="transaction-icon">
              <img src="images/icons/image10.png" alt="ব্যাংক টু বিকাশ">
            </div>
            <div class="transaction-details">
              <div class="transaction-title">ব্যাংক টু বিকাশ</div>
              <div class="transaction-subtitle">Bank Asia Ltd</div>
              <div class="transaction-time">03:00pm 25/04/25</div>
              <div class="transaction-id">TrxID: CDP7MASOOJ</div>
            </div>
            <div class="transaction-amount credit">+ ৳750.00</div>
          </div>
        </div>
        
        <div class="statement-summary-tab" style="display: none;">
          <div class="monthly-summary-header">
            <div class="month-navigation">
              <button class="month-nav-button"><i class="fas fa-chevron-left"></i></button>
              <div class="month-title">এপ্রিল 2025 সার-সংক্ষেপ</div>
              <button class="month-nav-button"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="last-updated">শেষ আপডেট: 07:35am 01/05/25</div>
          </div>
          
          <div class="balance-summary">
            <div class="balance-col">
              <div class="balance-label">শুরুর ব্যালেন্স</div>
              <div class="balance-amount">৳1,669.66</div>
            </div>
            <div class="balance-col">
              <div class="balance-label">শেষ ব্যালেন্স</div>
              <div class="balance-amount">৳4.14</div>
            </div>
          </div>
          
          <!-- Transaction Categories -->
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">সেন্ড মানি</div>
              <div class="category-count">৮ বার</div>
            </div>
            <div class="category-amount debit">- ৳19,376.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">রিসিভড মানি</div>
              <div class="category-count">১৬ বার</div>
            </div>
            <div class="category-amount credit">+ ৳40,775.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">মোবাইল রিচার্জ</div>
              <div class="category-count">২ বার</div>
            </div>
            <div class="category-amount debit">- ৳107.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">ব্যাংক টু বিকাশ</div>
              <div class="category-count">৬ বার</div>
            </div>
            <div class="category-amount credit">+ ৳11,030.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">ক্যাশ আউট</div>
              <div class="category-count">৫ বার</div>
            </div>
            <div class="category-amount debit">- ৳28,000.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">পেমেন্ট</div>
              <div class="category-count">৯ বার</div>
            </div>
            <div class="category-amount debit">- ৳5,538.00</div>
          </div>
          
          <div class="transaction-category">
            <div class="category-info">
              <div class="category-name">বিকাশ ফি</div>
              <div class="category-count"></div>
            </div>
            <div class="category-amount debit">- ৳449.52</div>
          </div>
        </div>
      `;

      const statementPopup = createPopup(
        "statementPopup",
        "স্টেটমেন্ট",
        statementContent
      );

      // Setup tabs for statement
      setTimeout(() => {
        setupStatementTabs();
      }, 100);
    });
  }

  // Limit menu click - show limits popup
  const limitMenu = document.getElementById("limitMenu");
  if (limitMenu) {
    limitMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const limitsContent = `
        <div class="limits-tabs">
          <div class="limits-tab active">দৈনিক লিমিট</div>
          <div class="limits-tab">মাসিক লিমিট</div>
        </div>
        
        <div class="limits-subtabs">
          <div class="limits-subtab active">সংখ্যা</div>
          <div class="limits-subtab">পরিমাণ</div>
        </div>
        
        <table class="limits-table">
          <tr>
            <td>এজেন্ট থেকে ক্যাশ ইন</td>
            <td>0</td>
            <td>৳0.00</td>
          </tr>
          <tr>
           <td></td>
            <td>10 টি</td>
            <td>৳50,000.00</td>
          </tr>
          <tr>
            <td>ব্যাংক ও কার্ড থেকে অ্যাড মানি</td>
            <td>0</td>
            <td>৳0.00</td>
          </tr>
          <tr>
            <td></td>
            <td>20 টি</td>
            <td>৳50,000.00</td>
          </tr>
          <tr>
            <td>সেন্ড মানি</td>
            <td>0</td>
            <td>৳0.00</td>
          </tr>
          <tr>
            <td></td>
            <td>50 টি</td>
            <td>৳50,000.00</td>
          </tr>
          <tr>
            <td>বিকাশ টু ব্যাংক</td>
            <td>0</td>
            <td>৳0.00</td>
          </tr>
          <tr>
            <td></td>
            <td>10 টি</td>
            <td>৳50,000.00</td>
          </tr>
          <tr>
            <td>মোবাইল রিচার্জ</td>
            <td>0</td>
            <td>৳0.00</td>
          </tr>
          <tr>
            <td></td>
            <td>50 টি</td>
            <td>৳10,000.00</td>
          </tr>
        </table>
      `;

      const limitPopup = createPopup("limitPopup", "লিমিট", limitsContent);

      // Setup tabs
      setTimeout(() => {
        const limitTabs = limitPopup.querySelectorAll(".limits-tab");
        if (limitTabs && limitTabs.length === 2) {
          limitTabs.forEach((tab) => {
            tab.addEventListener("click", function () {
              limitTabs.forEach((t) => t.classList.remove("active"));
              this.classList.add("active");
            });
          });
        }

        const limitSubtabs = limitPopup.querySelectorAll(".limits-subtab");
        if (limitSubtabs && limitSubtabs.length === 2) {
          limitSubtabs.forEach((tab) => {
            tab.addEventListener("click", function () {
              limitSubtabs.forEach((t) => t.classList.remove("active"));
              this.classList.add("active");
            });
          });
        }
      }, 100);
    });
  }

  // Coupon menu click - show coupon popup
  const couponMenu = document.getElementById("couponMenu");
  if (couponMenu) {
    couponMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const couponContent = `
        <div class="coupon-header">
          <a href="#" class="coupon-video-link">
            <i class="fas fa-play-circle"></i>
            <span>দেখুন কীভাবে কুপন ব্যবহার করবেন</span>
            <i class="fas fa-chevron-right" style="margin-left: auto;"></i>
          </a>
        </div>
        
        <div class="coupon-tabs">
          <div class="statement-tabs">
            <div class="statement-tab active">সব কুপন</div>
          </div>
        </div>
        
        <div class="coupon-search">
          <input type="text" class="coupon-input" placeholder="কুপন কোড লিখুন">
          <button class="coupon-search-btn">যোগ করুন</button>
        </div>
        
        <div class="no-coupons">
          <img src="images/icons/image13.png" alt="কুপন" style="width: 80px; margin-bottom: 20px;">
          <p>আপনার এই মুহূর্তে কোনো কুপন নেই</p>
        </div>
      `;

      createPopup("couponPopup", "কুপন", couponContent);
    });
  }

  // Update Info menu click - show update info popup
  const updateInfoMenu = document.getElementById("updateInfoMenu");
  if (updateInfoMenu) {
    updateInfoMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const updateInfoContent = `
        <div class="update-info-container">
          <img src="images/icons/image7.png" alt="তথ্য হালনাগাদ" class="update-info-icon">
          <h2 class="update-info-title">অনুগ্রহ করে আপনার তথ্য হালনাগাদ করুন</h2>
          <p class="update-info-text">আপনার বিকাশ একাউন্ট যদি জাতীয় পরিচয়পত্র (NID) দিয়ে নিবন্ধন করা হয়ে থাকে, তাহলে আপনি তথ্য হালনাগাদ করতে পারবেন সহজেই। বিস্তারিত জানতে বা সাহায্যের জন্য বিকাশ গ্রাহক সেবায় যোগাযোগ করুন।</p>
          
          <div class="update-steps">
            <div class="update-step">
              <img src="images/icons/id-card.png" alt="NID" class="update-step-icon">
              <p class="update-step-text">আপনার NID এর ছবি তুলুন</p>
            </div>
            <div class="update-step">
              <img src="images/icons/form.png" alt="ফর্ম" class="update-step-icon">
              <p class="update-step-text">প্রয়োজনীয় তথ্য প্রদান করুন</p>
            </div>
            <div class="update-step">
              <img src="images/icons/selfie.png" alt="সেলফি" class="update-step-icon">
              <p class="update-step-text">নিজের ছেহারার ছবি তুলুন</p>
            </div>
          </div>
          
          <button class="update-button">
            শুরু করুন
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;

      createPopup("updateInfoPopup", "তথ্য হালনাগাদ", updateInfoContent);
    });
  }

  // Nominee Info Update menu click
  const nomineeUpdateMenu = document.getElementById("nomineeUpdateMenu");
  if (nomineeUpdateMenu) {
    nomineeUpdateMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const nomineeUpdateContent = `
        <div class="nominee-update-item">
          <div class="nominee-update-icon">
            <img src="images/icons/person-edit.png" alt="নমিনি">
          </div>
          <div class="nominee-update-text">নমিনির তথ্য হালনাগাদ</div>
          <i class="fas fa-chevron-right"></i>
        </div>
      `;

      createPopup(
        "nomineeUpdatePopup",
        "নমিনির তথ্য হালনাগাদ",
        nomineeUpdateContent
      );
    });
  }

  // Refer bKash App menu click
  const referMenu = document.getElementById("referMenu");
  if (referMenu) {
    referMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const referContent = `
        <div class="refer-container">
          <div class="refer-card">
            <img src="images/refer-image.png" alt="রেফার" class="refer-image">
            <p class="refer-text">ভালো কিছু শেয়ার করুন, বিকাশ অ্যাপ রেফার করুন</p>
            <button class="refer-button">
              <i class="fas fa-share-alt"></i> রেফার
            </button>
            <a href="#" class="refer-terms">নিয়ম ও শর্তাবলী</a>
          </div>
          
          <div class="refer-steps">
            <div class="refer-step">
              <div class="refer-step-icon">
                <i class="fas fa-users"></i>
              </div>
              <p class="refer-step-text">"রেফার" বাটন ট্যাপ করে রেফারেল লিংক শেয়ার করুন</p>
            </div>
            <div class="refer-step">
              <div class="refer-step-icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <p class="refer-step-text">নতুন গ্রাহকের লেনদেন নিশ্চিত করুন</p>
            </div>
            <div class="refer-step">
              <div class="refer-step-icon">
                <i class="fas fa-bullhorn"></i>
              </div>
              <p class="refer-step-text">নতুন অফারের জন্য অপেক্ষা করুন</p>
            </div>
          </div>
        </div>
      `;

      createPopup("referPopup", "রেফার বিকাশ অ্যাপ", referContent);
    });
  }

  // bKash Map menu click - with enhanced interactive Bangladesh map
  const bkashMapMenu = document.getElementById("bkashMapMenu");
  if (bkashMapMenu) {
    bkashMapMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const mapContent = `
        <div class="map-container">
          <div class="map-search">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="এজেন্ট/আউটলেট খুঁজুন">
          </div>
          
          <div class="map-placeholder">
            <img src="images/map-placeholder.png" alt="ম্যাপ" style="width: 100%; max-height: 400px; object-fit: cover;">
            <div class="map-loading-text">ম্যাপ লোড হচ্ছে...</div>
            
            <!-- Interactive map elements -->
            <div class="map-zoom-controls">
              <button class="map-zoom-button">
                <i class="fas fa-plus"></i>
              </button>
              <button class="map-zoom-button">
                <i class="fas fa-minus"></i>
              </button>
            </div>
            
            <button class="map-center-button">
              <i class="fas fa-crosshairs"></i>
            </button>
            
            <!-- Example map markers -->
            <div class="map-marker" style="position: absolute; top: 30%; left: 40%;">
              <i class="fas fa-map-marker-alt" style="color: #e2146c; font-size: 20px;"></i>
              <div class="map-marker-tooltip">
                বিকাশ এজেন্ট: ঢাকা-১২১৫
              </div>
            </div>
            
            <div class="map-marker" style="position: absolute; top: 40%; left: 50%;">
              <i class="fas fa-map-marker-alt" style="color: #00a651; font-size: 20px;"></i>
              <div class="map-marker-tooltip">
                বিকাশ আউটলেট: চট্টগ্রাম-৪২০৩
              </div>
            </div>
            
            <div class="map-marker" style="position: absolute; top: 35%; left: 45%;">
              <i class="fas fa-map-marker-alt" style="color: #3498db; font-size: 20px;"></i>
              <div class="map-marker-tooltip">
                ATM: সিলেট-৩১০০
              </div>
            </div>
          </div>
          
          <div class="map-legend">
            <div class="legend-item">
              <div class="legend-icon" style="background-color: #23386a;"></div>
              <div class="legend-text">বিকাশ এজেন্ট</div>
            </div>
            <div class="legend-item">
              <div class="legend-icon" style="background-color: #00a651;"></div>
              <div class="legend-text">বিকাশ আউটলেট</div>
            </div>
            <div class="legend-item">
              <div class="legend-icon" style="background-color: #3498db;"></div>
              <div class="legend-text">ATM</div>
            </div>
          </div>
          
          <a href="main.html" class="home-button">
            <i class="fas fa-home"></i> হোম এ ফিরে যাই
          </a>
        </div>
      `;

      const mapPopup = createPopup("bkashMapPopup", "বিকাশ ম্যাপ", mapContent);

      // Add interactivity to map controls
      setTimeout(() => {
        const zoomButtons = mapPopup.querySelectorAll(".map-zoom-button");
        const centerButton = mapPopup.querySelector(".map-center-button");
        const mapPlaceholder = mapPopup.querySelector(".map-placeholder");

        if (zoomButtons && zoomButtons.length === 2) {
          // Zoom in button
          zoomButtons[0].addEventListener("click", function () {
            // Simulate zoom in effect
            mapPlaceholder.style.transform = "scale(1.1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";
          });

          // Zoom out button
          zoomButtons[1].addEventListener("click", function () {
            // Simulate zoom out effect
            mapPlaceholder.style.transform = "scale(1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";
          });
        }

        if (centerButton) {
          centerButton.addEventListener("click", function () {
            // Simulate centering the map
            mapPlaceholder.style.transform = "scale(1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";

            // Show loading temporarily
            const loadingText = mapPopup.querySelector(".map-loading-text");
            if (loadingText) {
              loadingText.style.display = "block";
              loadingText.textContent =
                "আপনার অবস্থান অনুসারে ম্যাপ লোড করা হচ্ছে...";

              setTimeout(() => {
                loadingText.style.display = "none";
              }, 1500);
            }
          });
        }
      }, 100);
    });
  }

  // About bKash Menu click - enhanced with images and sections
  const aboutBkashMenu = document.getElementById("aboutBkashMenu");
  if (aboutBkashMenu) {
    aboutBkashMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const aboutContent = `
        <div class="about-container">
          <div class="about-header">
            <img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 60px; margin-bottom: 20px;">
            <h2 class="about-title">বিকাশ নিয়ে জানুন</h2>
            <p class="about-subtitle">বাংলাদেশে মোবাইল ফিনান্সিয়াল সার্ভিসের অগ্রদূত</p>
          </div>
          
          <div class="about-sections">
            <div class="about-section">
              <h3 class="section-title">আমাদের সম্পর্কে</h3>
              <p class="section-text">বিকাশ ২০১১ সালে যাত্রা শুরু করে এবং বর্তমানে বাংলাদেশের সবচেয়ে বড় মোবাইল ফিনান্সিয়াল সার্ভিস প্রদানকারী প্রতিষ্ঠান। বিকাশ ব্র্যাক ব্যাংকের একটি সাবসিডিয়ারি যা বাংলাদেশে ফিনান্সিয়াল ইনক্লুশন বাড়াতে কাজ করছে।</p>
              
              <!-- Added image section -->
              <div style="text-align: center; margin: 15px 0;">
                <img src="images/bkash-office.jpg" alt="বিকাশ অফিস" style="max-width: 100%; border-radius: 8px;">
                <p style="font-size: 12px; color: #999; margin-top: 5px;">বিকাশ কর্পোরেট অফিস, ঢাকা</p>
              </div>
            </div>
            
            <div class="about-section">
              <h3 class="section-title">আমাদের মিশন</h3>
              <p class="section-text">আমাদের লক্ষ্য বাংলাদেশের সকল মানুষের জন্য সহজলভ্য, নিরাপদ এবং সাশ্রয়ী ফিনান্সিয়াল সেবা প্রদান করা এবং ডিজিটাল লেনদেনের মাধ্যমে দেশের অর্থনীতিকে শক্তিশালী করা।</p>
            </div>
            
            <div class="about-section">
              <h3 class="section-title">আমাদের সেবাসমূহ</h3>
              <ul class="services-list">
                <li>সেন্ড মানি</li>
                <li>ক্যাশ আউট</li>
                <li>মোবাইল রিচার্জ</li>
                <li>পেমেন্ট</li>
                <li>অ্যাড মানি</li>
                <li>পে বিল</li>
                <li>রেমিটেন্স</li>
                <li>সেভিংস</li>
                <li>লোন</li>
              </ul>
              
              <!-- Added image carousel -->
              <div style="margin: 20px 0; text-align: center;">
                <img src="images/bkash-services.jpg" alt="বিকাশ সার্ভিস" style="max-width: 100%; border-radius: 8px;">
              </div>
            </div>
            
            <div class="about-section">
              <h3 class="section-title">যোগাযোগ করুন</h3>
              <p class="contact-item"><i class="fas fa-phone"></i> 16247 (24/7)</p>
              <p class="contact-item"><i class="fas fa-envelope"></i> support@bkash.com</p>
              <p class="contact-item"><i class="fas fa-map-marker-alt"></i> বিকাশ টাওয়ার, ঢাকা, বাংলাদেশ</p>
              <div class="social-links">
                <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          
          <a href="main.html" class="home-button">
            <i class="fas fa-home"></i> হোম এ ফিরে যাই
          </a>
        </div>
      `;

      createPopup("aboutBkashPopup", "বিকাশ নিয়ে জানুন", aboutContent);
    });
  }

  // Settings Menu Click
  const settingsMenu = document.getElementById("settingsMenu");
  if (settingsMenu) {
    settingsMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const settingsContent = `
        <div class="settings-container">
          <div class="settings-group">
            <h3 class="settings-group-title">অ্যাকাউন্ট সেটিংস</h3>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-user-circle"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">প্রোফাইল সেটিংস</div>
                <div class="settings-item-desc">আপনার প্রোফাইল তথ্য আপডেট করুন</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">সিকিউরিটি সেটিংস</div>
                <div class="settings-item-desc">পিন এবং সিকিউরিটি প্রশ্ন পরিবর্তন করুন</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
          
          <div class="settings-group">
            <h3 class="settings-group-title">অ্যাপ্লিকেশন সেটিংস</h3>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-bell"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">নোটিফিকেশন</div>
                <div class="settings-item-desc">নোটিফিকেশন সেটিংস পরিবর্তন করুন</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-toggle-on"></i>
              </div>
            </div>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-language"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">ভাষা</div>
                <div class="settings-item-desc">অ্যাপ্লিকেশনের ভাষা পরিবর্তন করুন</div>
              </div>
              <div class="settings-item-action">
                <span class="settings-current-value">বাংলা</span>
              </div>
            </div>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-moon"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">ডার্ক মোড</div>
                <div class="settings-item-desc">অ্যাপ্লিকেশনের থিম পরিবর্তন করুন</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-toggle-off"></i>
              </div>
            </div>
          </div>
          
          <div class="settings-group">
            <h3 class="settings-group-title">সাধারণ</h3>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">হেল্প ও সাপোর্ট</div>
                <div class="settings-item-desc">সাহায্য এবং FAQ দেখুন</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">টার্মস ও কন্ডিশন</div>
                <div class="settings-item-desc">অ্যাপ্লিকেশনের নিয়ম ও শর্তাবলী</div>
              </div>
              <div class="settings-item-action">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            
            <div class="settings-item">
              <div class="settings-item-icon">
                <i class="fas fa-info-circle"></i>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">অ্যাপ সম্পর্কে</div>
                <div class="settings-item-desc">অ্যাপ্লিকেশন ভার্সন এবং তথ্য</div>
              </div>
              <div class="settings-item-action">
                <span class="settings-current-value">v6.7.0</span>
              </div>
            </div>
          </div>
        </div>
      `;

      createPopup("settingsPopup", "সেটিংস", settingsContent);
    });
  }

  // Auto Pay Menu Click - Enhanced with payment options
  const autoPayMenu = document.getElementById("autoPayMenu");
  if (autoPayMenu) {
    autoPayMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const autoPayContent = `
        <div class="autopay-container">
          <div class="autopay-header">
            <img src="images/icons/image6.png" alt="অটো পে" style="width: 60px; margin-bottom: 15px;">
            <h2 class="autopay-title">অটো পে</h2>
            <p class="autopay-subtitle">সময়মত বিল পরিশোধ করুন স্বয়ংক্রিয়ভাবে</p>
          </div>
          
          <div class="autopay-setup">
            <div class="setup-step">
              <div class="setup-step-number">১</div>
              <div class="setup-step-text">আপনার বিল নির্বাচন করুন</div>
            </div>
            <div class="setup-step">
              <div class="setup-step-number">২</div>
              <div class="setup-step-text">পেমেন্ট সময় নির্ধারণ করুন</div>
            </div>
            <div class="setup-step">
              <div class="setup-step-number">৩</div>
              <div class="setup-step-text">অটো পে সেট আপ সম্পন্ন করুন</div>
            </div>
          </div>
          
          <div class="autopay-actions">
            <button class="autopay-button" id="newAutoPayBtn">
              <i class="fas fa-plus"></i> নতুন অটো পে সেট আপ
            </button>
          </div>
          
          <div class="no-autopay">
            <img src="images/icons/image6.png" alt="অটো পে" style="width: 50px; margin-bottom: 15px; opacity: 0.5;">
            <p>আপনার কোনো অটো পে সেট আপ নেই</p>
          </div>
          
          <!-- Add service options -->
          <div class="autopay-options" style="display: none;" id="autoPayOptions">
            <a href="recharge.html" class="autopay-option">
              <img src="images/icons/image2.png" class="autopay-option-icon" alt="মোবাইল রিচার্জ">
              <div class="autopay-option-title">মোবাইল রিচার্জ</div>
            </a>
            <a href="payBills.html" class="autopay-option">
              <img src="images/icons/image6.png" class="autopay-option-icon" alt="পে বিল">
              <div class="autopay-option-title">পে বিল</div>
            </a>
            <a href="sendMoney.html" class="autopay-option">
              <img src="images/icons/image1.png" class="autopay-option-icon" alt="সেন্ড মানি">
              <div class="autopay-option-title">সেন্ড মানি</div>
            </a>
          </div>
        </div>
      `;

      const autoPayPopup = createPopup(
        "autoPayPopup",
        "অটো পে",
        autoPayContent
      );

      // Handle new auto pay button click
      setTimeout(() => {
        const newAutoPayBtn = autoPayPopup.querySelector("#newAutoPayBtn");
        const autoPayOptions = autoPayPopup.querySelector("#autoPayOptions");

        if (newAutoPayBtn && autoPayOptions) {
          newAutoPayBtn.addEventListener("click", function () {
            // Show options when button is clicked
            autoPayOptions.style.display = "grid";
            // Hide the no autopay message
            const noAutoPay = autoPayPopup.querySelector(".no-autopay");
            if (noAutoPay) {
              noAutoPay.style.display = "none";
            }
          });
        }
      }, 100);
    });
  }

  // Support Menu Click - Enhanced with live chat and email options
  const supportMenu = document.getElementById("supportMenu");
  if (supportMenu) {
    supportMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const supportContent = `
        <div class="support-container">
          <div class="support-header">
            <div class="support-image">
              <img src="images/icons/support.png" alt="সাপোর্ট" style="width: 80px;">
            </div>
            <h2 class="support-title">কিভাবে আমরা সাহায্য করতে পারি?</h2>
          </div>
          
          <div class="support-search">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="আপনার প্রশ্ন লিখুন...">
          </div>
          
          <div class="contact-options">
            <div class="contact-option" id="liveChat">
              <div class="contact-icon">
                <i class="fas fa-comments"></i>
              </div>
              <div class="contact-title">লাইভ চ্যাট</div>
              <div class="contact-desc">সরাসরি কথা বলুন</div>
            </div>
            
            <div class="contact-option" id="phoneCall">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="contact-title">16247 এ কল করুন</div>
              <div class="contact-desc">24/7 গ্রাহক সেবা</div>
            </div>
            
            <div class="contact-option" id="emailSupport">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-title">ইমেইল</div>
              <div class="contact-desc">support@bkash.com</div>
            </div>
          </div>
          
          <div class="faq-section">
            <h3 class="faq-title">জনপ্রিয় প্রশ্ন</h3>
            
            <div class="faq-item">
              <div class="faq-question">
                <span>কিভাবে পিন রিসেট করবেন?</span>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>আপনার পিন রিসেট করতে, বিকাশ অ্যাপে লগইন করুন এবং "সেটিংস > সিকিউরিটি সেটিংস > পিন পরিবর্তন করুন" এ যান। বর্তমান পিন দিন এবং তারপর নতুন পিন সেট করুন।</p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <span>মোবাইল নাম্বার পরিবর্তন করবেন কিভাবে?</span>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>মোবাইল নাম্বার পরিবর্তন করতে আপনাকে নিকটস্থ বিকাশ সেন্টারে যেতে হবে। আপনার জাতীয় পরিচয়পত্র এবং বর্তমান মোবাইল নাম্বার সাথে নিয়ে যান।</p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <span>লেনদেন চার্জ কত?</span>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>সেন্ড মানি: ফ্রি, ক্যাশ আউট: 1.85%, অ্যাড মানি: ফ্রি, পেমেন্ট: ফ্রি, মোবাইল রিচার্জ: ফ্রি। বিস্তারিত জানতে বিকাশ ওয়েবসাইট ভিজিট করুন।</p>
              </div>
            </div>
          </div>
        </div>
      `;

      const supportPopup = createPopup(
        "supportPopup",
        "হেল্প এবং সাপোর্ট",
        supportContent
      );

      // Setup FAQ accordion and contact buttons
      setTimeout(() => {
        const faqItems = supportPopup.querySelectorAll(".faq-item");
        if (faqItems && faqItems.length > 0) {
          faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (question && answer) {
              // Initially hide answers
              answer.style.display = "none";

              question.addEventListener("click", function () {
                const isOpen = answer.style.display === "block";

                // Close all answers
                faqItems.forEach((faq) => {
                  faq.querySelector(".faq-answer").style.display = "none";
                  faq.querySelector(".fas").classList.remove("fa-chevron-up");
                  faq.querySelector(".fas").classList.add("fa-chevron-down");
                });

                // Toggle current answer
                if (!isOpen) {
                  answer.style.display = "block";
                  question
                    .querySelector(".fas")
                    .classList.remove("fa-chevron-down");
                  question.querySelector(".fas").classList.add("fa-chevron-up");
                }
              });
            }
          });
        }

        // Add click events for contact options
        const liveChat = supportPopup.querySelector("#liveChat");
        const phoneCall = supportPopup.querySelector("#phoneCall");
        const emailSupport = supportPopup.querySelector("#emailSupport");

        if (liveChat) {
          liveChat.addEventListener("click", function () {
            // Redirect to live chat page
            createLiveChatPopup();
          });
        }

        if (phoneCall) {
          phoneCall.addEventListener("click", function () {
            // Simulate phone call
            alert("Calling 16247...");
          });
        }

        if (emailSupport) {
          emailSupport.addEventListener("click", function () {
            // Redirect to email compose
            createEmailPopup();
          });
        }
      }, 100);

      // Function to create live chat popup
      function createLiveChatPopup() {
        const liveChatContent = `
          <div style="padding: 20px; height: 100%;">
            <div style="background-color: #f8f8f8; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <img src="images/customer-service.png" alt="Agent" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                <div>
                  <div style="font-weight: 500;">বিকাশ সাপোর্ট</div>
                  <div style="font-size: 12px; color: #666;">অনলাইন | রিপ্লাই টাইম: 1 মিনিট</div>
                </div>
              </div>
              <p style="font-size: 14px; color: #666;">আসসালামু আলাইকুম! বিকাশ সাপোর্টে আপনাকে স্বাগতম। আপনি কিভাবে সাহায্য পেতে চান?</p>
            </div>
            
            <div style="display: flex; margin-bottom: 15px;">
              <input type="text" placeholder="আপনার মেসেজ লিখুন..." style="flex: 1; padding: 12px 15px; border-radius: 25px; border: 1px solid #ddd; outline: none;">
              <button style="margin-left: 10px; width: 40px; height: 40px; border-radius: 50%; background-color: #23386a; color: white; border: none; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        `;

        createPopup("liveChatPopup", "লাইভ চ্যাট", liveChatContent);
      }

      // Function to create email popup
      function createEmailPopup() {
        const emailContent = `
          <div style="padding: 20px;">
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">টু:</label>
              <input type="text" value="support@bkash.com" readonly style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #ddd; outline: none; background-color: #f5f5f5;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">সাবজেক্ট:</label>
              <input type="text" placeholder="সাবজেক্ট লিখুন" style="width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #ddd; outline: none;">
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">বিস্তারিত:</label>
              <textarea placeholder="আপনার সমস্যা বা অনুরোধের বিস্তারিত লিখুন..." style="width: 100%; height: 150px; padding: 12px 15px; border-radius: 8px; border: 1px solid #ddd; outline: none; resize: none;"></textarea>
            </div>
            
            <button style="width: 100%; padding: 12px; background-color: #23386a; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
              <i class="fas fa-paper-plane" style="margin-right: 8px;"></i> ইমেইল পাঠান
            </button>
          </div>
        `;

        createPopup("emailPopup", "ইমেইল", emailContent);
      }
    });
  }

  // Add WhatsNew in bKash App Menu (New feature based on screenshots)
  const aboutBkashAppMenu = document.querySelector("#aboutBkashMenu");
  if (aboutBkashAppMenu) {
    aboutBkashAppMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      // Show What's New in bKash App
      const whatsNewContent = `
        <div class="whatsnew-container">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="flex: 1; font-size: 18px; font-weight: 600; color: #333;">
              বিকাশ নিয়ে জানুন > বিকাশ অ্যাপে নতুন যা আছে
            </div>
          </div>
          
          <select class="month-selector">
            <option selected>এপ্রিল ২০২৫</option>
            <option>মার্চ ২০২৫</option>
            <option>ফেব্রুয়ারি ২০২৫</option>
            <option>জানুয়ারি ২০২৫</option>
            <option>ডিসেম্বর ২০২৪</option>
          </select>
          
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-flex; gap: 20px;">
              <div style="text-align: center; border: 2px dashed #e2146c; border-radius: 15px; padding: 15px; width: 100px;">
                <img src="images/icons/fingerprint.png" alt="ফিঙ্গারপ্রিন্ট" style="width: 50px; height: 50px; margin-bottom: 10px;">
              </div>
              <div style="text-align: center; border: 2px dashed #e2146c; border-radius: 15px; padding: 15px; width: 100px;">
                <img src="images/icons/face-id.png" alt="ফেস আইডি" style="width: 50px; height: 50px; margin-bottom: 10px;">
              </div>
            </div>
            
            <p style="margin-top: 15px; font-size: 14px; color: #666; text-align: center;">
              আপনার হ্যান্ডসেটের টাচ/ফেস আইডি ব্যবহার করে এখন বিকাশ অ্যাপে লগইন এবং মোবাইল রিচার্জ ও পেমেন্ট লেনদেন করতে পারেন।
            </p>
          </div>
          
          <div style="background-color: #fff1f6; border-radius: 10px; padding: 15px; margin-top: 20px;">
            <button style="background-color: #23386a; color: white; width: 100%; padding: 12px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
              মার্চ মাসে যা নতুন ছিল
            </button>
          </div>
          
          <a href="main.html" class="home-button" style="margin-top: 30px;">
            <i class="fas fa-home"></i> হোম এ ফিরে যাই
          </a>
        </div>
      `;

      const whatsNewPopup = createPopup(
        "whatsNewPopup",
        "বিকাশ অ্যাপে নতুন যা আছে",
        whatsNewContent
      );

      // Add event handlers for month selector
      setTimeout(() => {
        const monthSelector = whatsNewPopup.querySelector(".month-selector");
        if (monthSelector) {
          monthSelector.addEventListener("change", function () {
            // Simulate loading different monthly updates
            const selectedMonth = this.value;
            let updateContent;

            // Show different content based on selected month
            if (selectedMonth === "মার্চ ২০২৫") {
              // March 2025 updates
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <img src="images/qr-code.png" alt="QR কোড" style="width: 120px; height: 120px; margin-bottom: 15px;">
                  <p style="font-size: 14px; color: #666;">QR কোড স্ক্যান করে পেমেন্ট করুন সহজেই</p>
                </div>
              `;
            } else if (selectedMonth === "ফেব্রুয়ারি ২০২৫") {
              // February 2025 updates
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <img src="images/bill-payment.png" alt="বিল পেমেন্ট" style="width: 120px; height: 120px; margin-bottom: 15px;">
                  <p style="font-size: 14px; color: #666;">অটো বিল পেমেন্ট ফিচার যোগ করা হয়েছে</p>
                </div>
              `;
            } else {
              // Default for other months
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <p style="font-size: 14px; color: #666;">এই মাসে কোন আপডেট নেই</p>
                </div>
              `;
            }

            // Update the content
            const contentContainer = whatsNewPopup.querySelector(
              ".whatsnew-container"
            );
            const existingContent = contentContainer.innerHTML;
            const newContent = existingContent.replace(
              /<div style="text-align: center; margin-bottom: 20px;">([\s\S]*?)<\/div>\s+<div style="background-color: #fff1f6;/,
              `<div style="text-align: center; margin-bottom: 20px;">${updateContent}</div>\n\n<div style="background-color: #fff1f6;`
            );

            contentContainer.innerHTML = newContent;
          });
        }
      }, 100);
    });
  }

  // Setup logout functionality
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Logout button clicked");

      // Show a logout confirmation notification if possible
      if (typeof showNotification === "function") {
        showNotification("লগআউট করা হচ্ছে...");
      }

      // Clear user data from localStorage
      if (localStorage.getItem("bkashUser")) {
        localStorage.removeItem("bkashUser");
        console.log("User data cleared from localStorage");
      }

      // Close the sidebar
      closeSidebar();

      // Add a small delay before redirecting to ensure the sidebar closes first
      setTimeout(() => {
        console.log("Redirecting to index.html");
        window.location.href = "index.html";
      }, 500);
    });
    console.log("Logout button event handler added");
  } else {
    console.log("Logout button not found");

    // Add a delegated event listener to handle logout from other elements
    document.addEventListener("click", function (e) {
      // Check if the clicked element or its parent is the logout button
      const target = e.target;
      const isLogoutButton =
        (target.classList.contains("sidebar-menu-item") &&
          target.textContent.includes("লগ আউট")) ||
        (target.parentElement &&
          target.parentElement.classList.contains("sidebar-menu-item") &&
          target.parentElement.textContent.includes("লগ আউট"));

      if (isLogoutButton) {
        e.preventDefault();
        console.log("Logout element clicked via delegation");

        // Clear user data from localStorage
        if (localStorage.getItem("bkashUser")) {
          localStorage.removeItem("bkashUser");
          console.log("User data cleared from localStorage");
        }

        // Close the sidebar
        closeSidebar();

        // Add a small delay before redirecting
        setTimeout(() => {
          console.log("Redirecting to index.html");
          window.location.href = "index.html";
        }, 500);
      }
    });
    console.log("Delegated logout event handler added");
  }

  

  console.log(
    "Right-side sidebar initialization complete with all menu functionalities"
  );
});
