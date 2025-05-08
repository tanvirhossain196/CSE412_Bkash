document.addEventListener("DOMContentLoaded", function () {
  // Get all service items
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    // Add premium UI elements to each service item

    // 1. Add highlight accent (top right corner triangle)
    const highlightAccent = document.createElement("div");
    highlightAccent.className = "highlight-accent";
    item.appendChild(highlightAccent);

    // 2. Add hover line indicator (bottom line)
    const hoverLine = document.createElement("div");
    hoverLine.className = "hover-line";
    item.appendChild(hoverLine);

    // 3. Add hover arrow
    const hoverArrow = document.createElement("div");
    hoverArrow.className = "hover-arrow";
    hoverArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
    item.appendChild(hoverArrow);

    // 4. Add ripple container for click effect
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple-container";
    item.appendChild(rippleContainer);

    // 5. Add ripple effect on click
    item.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";

      const rect = rippleContainer.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      rippleContainer.appendChild(ripple);

      // Add active click class
      this.classList.add("active-click");

      // Remove ripple after animation and active class
      setTimeout(() => {
        ripple.remove();
        this.classList.remove("active-click");
      }, 600);
    });

    // 6. Add 3D tilt effect based on mouse position
    item.addEventListener("mousemove", function (e) {
      if (!item.matches(":hover")) return;

      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt values (max ±5 degrees)
      const tiltX = (y / rect.height - 0.5) * 8;
      const tiltY = (x / rect.width - 0.5) * -8;

      // Apply 3D transform to item
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px) scale(1.05)`;

      // Dynamic shadow based on tilt
      const shadowX = (x / rect.width - 0.5) * 10;
      const shadowY = (y / rect.height - 0.5) * 10;
      item.style.boxShadow = `
        ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.08),
        ${shadowX / 2}px ${shadowY / 2}px 15px rgba(226, 20, 108, 0.1),
        0 5px 10px rgba(226, 20, 108, 0.05),
        inset 0 1px 1px rgba(255, 255, 255, 0.9)
      `;

      // Apply 3D transform to icon
      const icon = item.querySelector(".service-icon");
      if (icon) {
        const iconTiltX = tiltX * 1.5; // Amplify icon tilt for more pronounced effect
        const iconTiltY = tiltY * 1.5;
        icon.style.transform = `rotateX(${iconTiltX}deg) rotateY(${iconTiltY}deg) translateZ(30px) scale(1.2)`;
      }
    });

    // 7. Reset transform on mouse leave
    item.addEventListener("mouseleave", function () {
      item.style.transform = "";
      item.style.boxShadow = "";

      // Reset icon transform
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transform = "";
      }

      // Wait a small amount of time before allowing transitions again
      setTimeout(() => {
        item.style.transition = "all 0.45s cubic-bezier(0.19, 1, 0.22, 1)";
        if (icon) {
          icon.style.transition = "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      }, 50);
    });

    // 8. Disable transitions during mouse movement for smoothness
    item.addEventListener("mouseenter", function () {
      item.style.transition = "none";

      // Disable icon transition
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transition = "none";
      }

      // Initial transform to avoid jump
      item.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px) scale(1.05)";

      // Force browser to apply the transitions
      setTimeout(() => {
        item.style.transition = "none";
        if (icon) {
          icon.style.transition = "none";
        }
      }, 10);
    });
  });

  // Make sure all service items are visible at startup with staggered animation
  serviceItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 100 + index * 100); // Staggered delay
  });

  // Adjust body padding based on service grid height
  function adjustBodyPadding() {
    const header = document.querySelector(".header");
    const servicesMenu = document.getElementById("servicesMenu");

    if (header && servicesMenu) {
      const headerHeight = header.offsetHeight;

      // Set the body padding to account for fixed header
      document.body.style.paddingTop = headerHeight + "px";
    }
  }

  // Run on page load and on window resize
  adjustBodyPadding();
  window.addEventListener("resize", adjustBodyPadding);

  // Get elements from the DOM
  const servicesButton = document.getElementById("servicesButton");
  const servicesMenu = document.getElementById("servicesMenu");
  const userProfile = document.getElementById("userProfile");
  const userDropdown = document.getElementById("userDropdown");
  const balanceToggle = document.getElementById("balanceToggle");
  const balancePopup = document.getElementById("balancePopup");

  // Services button functionality
  servicesButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to the services menu
    servicesMenu.scrollIntoView({ behavior: "smooth" });

    // Close other menus
    userDropdown.classList.remove("show");
    balancePopup.classList.remove("show");
    balanceToggle.classList.remove("active");

    // Reset balance toggle icon
    if (balanceToggle.classList.contains("fa-eye-slash")) {
      balanceToggle.classList.remove("fa-eye-slash");
      balanceToggle.classList.add("fa-eye");
    }
  });

  // Toggle user dropdown on profile click
  userProfile.addEventListener("click", function (e) {
    if (e.target !== balanceToggle) {
      e.stopPropagation();
      userDropdown.classList.toggle("show");

      // Close balance popup
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");
    }
  });

  // Balance toggle functionality
  balanceToggle.addEventListener("click", function (e) {
    e.stopPropagation();

    // Toggle balance popup
    balancePopup.classList.toggle("show");
    balanceToggle.classList.toggle("active");

    // Toggle icon with smooth transition
    if (balancePopup.classList.contains("show")) {
      balanceToggle.classList.remove("fa-eye");
      balanceToggle.classList.add("fa-eye-slash");
    } else {
      balanceToggle.classList.remove("fa-eye-slash");
      balanceToggle.classList.add("fa-eye");
    }

    // Close dropdown if open
    userDropdown.classList.remove("show");
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userProfile.contains(event.target) &&
      !userDropdown.contains(event.target) &&
      !balanceToggle.contains(event.target) &&
      !balancePopup.contains(event.target)
    ) {
      userDropdown.classList.remove("show");
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");

      // Reset balance toggle icon
      if (balanceToggle.classList.contains("fa-eye-slash")) {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }
    }
  });

  // Notification bell animation
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("mouseenter", function () {
      const bell = this.querySelector("i");
      bell.style.animation = "bell-shake 0.5s ease";

      setTimeout(() => {
        bell.style.animation = "";
      }, 500);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("show-mobile");
    });
  }

  // SIDEBAR FUNCTIONALITY FOR USER DROPDOWN MENU ITEMS
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
          <img src="/public/images/user-avatar.png" alt="User Profile" class="sidebar-user-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMTAgLTE2IDB6Ii8+PC9zdmc+'">
        </div>
        <span class="sidebar-title">বিকাশ মেনু</span>
        <div class="sidebar-close" id="sidebarClose">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="sidebar-menu" id="menuItems"></div>
    `;

    document.body.appendChild(sidebar);
    console.log("Created sidebar");
  }

  // Create popup container - for all popups
  if (!document.getElementById("bkashPopupContainer")) {
    const popupContainer = document.createElement("div");
    popupContainer.id = "bkashPopupContainer";
    document.body.appendChild(popupContainer);
  }

  // Add sidebar styles to the document head
  function addSidebarStyles() {
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

      /* Profile Styles */
      .profile-container {
        padding: 20px 15px;
      }
      
      .profile-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
      }
      
      .profile-avatar-container {
        position: relative;
        margin-bottom: 15px;
      }
      
      .profile-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      }
      
      .profile-name {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      
      .profile-phone {
        font-size: 16px;
        color: #666;
      }
      
      .profile-balance {
        background-color: #f8f8f8;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .profile-balance-label {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
      
      .profile-balance-amount {
        font-size: 24px;
        font-weight: 600;
        color: #23386a;
      }
      
      .profile-section {
        margin-bottom: 25px;
      }
      
      .profile-section-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
        color: #333;
        padding-bottom: 5px;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .profile-item {
        display: flex;
        margin-bottom: 15px;
      }
      
      .profile-item-label {
        width: 40%;
        font-size: 14px;
        color: #666;
      }
      
      .profile-item-value {
        width: 60%;
        font-size: 14px;
        font-weight: 500;
      }
      
      .profile-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
      }
      
      .profile-action-button {
        padding: 12px 20px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
      }
      
      .edit-profile-btn {
        background-color: #23386a;
        color: white;
        border: none;
        flex: 1;
        margin-right: 10px;
      }
      
      .change-pin-btn {
        background-color: white;
        color: #23386a;
        border: 1px solid #23386a;
        flex: 1;
      }

      /* Photo Upload Styles */
      .photo-upload-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;
      }
      
      .avatar-preview {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
        border: 3px solid #fff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      }
      
      .upload-button {
        position: relative;
        padding: 12px 30px;
        background-color: #23386a;
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }
      
      .upload-button i {
        margin-right: 8px;
      }
      
      .upload-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      
      .upload-hint {
        font-size: 12px;
        color: #666;
        text-align: center;
        margin-top: 10px;
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
      
      @media (min-width: 768px) {
        .bkash-popup {
          width: 400px;
          right: -400px;
        }
      }
    `;
    document.head.appendChild(styleElement);
    console.log("Added sidebar styles with RIGHT side positioning");
  }

  // Add Sidebar Styles to the document
  addSidebarStyles();

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
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
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

  // Add click events to user dropdown menu items
  const userDropdownItems = document.querySelectorAll(".user-dropdown-item");
  userDropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Close user dropdown
      userDropdown.classList.remove("show");

      // Get item text to determine which popup to show
      const itemText = this.textContent.trim();

      if (itemText.includes("প্রোফাইল")) {
        showProfilePopup();
      } else if (itemText.includes("লেনদেন ইতিহাস")) {
        showTransactionHistoryPopup();
      } else if (itemText.includes("সেটিংস")) {
        showSettingsPopup();
      } else if (itemText.includes("হেল্প এবং সাপোর্ট")) {
        showSupportPopup();
      } else if (itemText.includes("লগ আউট")) {
        // Handle logout through existing code
      }
    });
  });

  // Function to show profile popup
  function showProfilePopup() {
    const profileContent = `
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar-container">
            <img src="/public/images/user-avatar.png" alt="প্রোফাইল" class="profile-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNSIvPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAgLTE2IDB6Ii8+PC9zdmc+'">
          </div>
          <h2 class="profile-name">Md. Tanvir Hossain</h2>
          <p class="profile-phone">+880 1712-345678</p>
        </div>
        
        <div class="profile-balance">
          <div class="profile-balance-label">আপনার ব্যালেন্স</div>
          <div class="profile-balance-amount">৳ 15,250.75</div>
        </div>
        
        <div class="profile-section">
          <h3 class="profile-section-title">ব্যক্তিগত তথ্য</h3>
          
          <div class="profile-item">
            <div class="profile-item-label">পুরো নাম</div>
            <div class="profile-item-value">MD. TANVIR HOSSAIN</div>
          </div>
          
          <div class="profile-item">
            <div class="profile-item-label">মোবাইল নম্বর</div>
            <div class="profile-item-value">+880 1712-345678</div>
          </div>
          
          <div class="profile-item">
            <div class="profile-item-label">ইমেইল</div>
            <div class="profile-item-value">tanvir.hossain@example.com</div>
          </div>
          
          <div class="profile-item">
            <div class="profile-item-label">জন্ম তারিখ</div>
            <div class="profile-item-value">15/03/1992</div>
          </div>
        </div>
        
        <div class="profile-section">
          <h3 class="profile-section-title">অ্যাকাউন্ট তথ্য</h3>
          
          <div class="profile-item">
            <div class="profile-item-label">অ্যাকাউন্ট টাইপ</div>
            <div class="profile-item-value">পার্সোনাল</div>
          </div>
          
          <div class="profile-item">
            <div class="profile-item-label">KYC স্ট্যাটাস</div>
            <div class="profile-item-value">সম্পূর্ণ যাচাইকৃত</div>
          </div>
          
          <div class="profile-item">
            <div class="profile-item-label">নিবন্ধনের তারিখ</div>
            <div class="profile-item-value">22/05/2019</div>
          </div>
        </div>
        
        <div class="profile-actions">
          <button class="profile-action-button edit-profile-btn">
            <i class="fas fa-edit"></i> প্রোফাইল এডিট
          </button>
          <button class="profile-action-button change-pin-btn">
            <i class="fas fa-lock"></i> পিন পরিবর্তন
          </button>
        </div>
      </div>
    `;

    const profilePopup = createPopup(
      "profilePopup",
      "প্রোফাইল",
      profileContent
    );

    // Add event listeners for profile buttons
    setTimeout(() => {
      const editProfileBtn = profilePopup.querySelector(".edit-profile-btn");
      if (editProfileBtn) {
        editProfileBtn.addEventListener("click", function () {
          alert("প্রোফাইল এডিট ফিচার সক্রিয় হবে শীঘ্রই।");
        });
      }

      const changePinBtn = profilePopup.querySelector(".change-pin-btn");
      if (changePinBtn) {
        changePinBtn.addEventListener("click", function () {
          alert("পিন পরিবর্তন ফিচার সক্রিয় হবে শীঘ্রই।");
        });
      }
    }, 100);
  }

  // Function to show transaction history popup
  function showTransactionHistoryPopup() {
    const transactionContent = `
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
            <img src="/public/images/icons/image4.png" alt="ক্যাশ আউট">
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
            <img src="/public/images/icons/image1.png" alt="রিসিভড মানি">
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
            <img src="/public/images/icons/image1.png" alt="রিসিভড মানি">
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
            <img src="/public/images/icons/image3.png" alt="সেন্ড মানি">
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
            <img src="/public/images/icons/image10.png" alt="ব্যাংক টু বিকাশ">
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

    const transactionPopup = createPopup(
      "transactionPopup",
      "লেনদেন ইতিহাস",
      transactionContent
    );

    // Setup tabs for transaction history
    setTimeout(() => {
      const tabs = transactionPopup.querySelectorAll(".statement-tab");
      const detailsContent =
        transactionPopup.querySelector(".transaction-list");
      const summaryContent = transactionPopup.querySelector(
        ".statement-summary-tab"
      );

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
    }, 100);
  }

  // Function to show settings popup with photo upload
  function showSettingsPopup() {
    const settingsContent = `
      <div class="settings-container">
        <div class="photo-upload-container">
          <img src="/public/images/user-avatar.png" alt="প্রোফাইল" class="avatar-preview" id="avatarPreview" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNSIvPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAgLTE2IDB6Ii8+PC9zdmc+'">
          
          <div class="upload-button">
            <i class="fas fa-camera"></i> ছবি আপলোড করুন
            <input type="file" class="upload-input" id="photoUpload" accept="image/*">
          </div>
          
          <p class="upload-hint">সর্বোচ্চ আকার 5MB. JPG, PNG গ্রহণযোগ্য।</p>
        </div>
        
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

    const settingsPopup = createPopup(
      "settingsPopup",
      "সেটিংস",
      settingsContent
    );

    // Setup photo upload functionality
    setTimeout(() => {
      const photoUpload = settingsPopup.querySelector("#photoUpload");
      const avatarPreview = settingsPopup.querySelector("#avatarPreview");

      if (photoUpload && avatarPreview) {
        photoUpload.addEventListener("change", function (e) {
          if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
              avatarPreview.src = e.target.result;

              // Update all user avatars across the site
              const allAvatars = document.querySelectorAll(
                ".sidebar-user-img, .user-image img, .dropdown-user-image img"
              );
              allAvatars.forEach((avatar) => {
                avatar.src = e.target.result;
              });

              // Show success message
              alert("ছবি সফলভাবে আপলোড করা হয়েছে!");
            };

            reader.readAsDataURL(this.files[0]);
          }
        });
      }

      // Add click event to settings items
      const settingsItems = settingsPopup.querySelectorAll(".settings-item");
      settingsItems.forEach((item) => {
        item.addEventListener("click", function () {
          const title = this.querySelector(".settings-item-title").textContent;
          alert(`"${title}" ফিচার শীঘ্রই আসছে!`);
        });
      });
    }, 100);
  }

  // Function to show support popup
  function showSupportPopup() {
    const supportContent = `
      <div class="support-container">
        <div class="support-header">
          <div class="support-image">
            <img src="/public/images/icons/support.png" alt="সাপোর্ট" style="width: 80px;">
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
            <div class="faq-answer" style="display: none;">
              <p>আপনার পিন রিসেট করতে, বিকাশ অ্যাপে লগইন করুন এবং "সেটিংস > সিকিউরিটি সেটিংস > পিন পরিবর্তন করুন" এ যান। বর্তমান পিন দিন এবং তারপর নতুন পিন সেট করুন।</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <span>মোবাইল নাম্বার পরিবর্তন করবেন কিভাবে?</span>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" style="display: none;">
              <p>মোবাইল নাম্বার পরিবর্তন করতে আপনাকে নিকটস্থ বিকাশ সেন্টারে যেতে হবে। আপনার জাতীয় পরিচয়পত্র এবং বর্তমান মোবাইল নাম্বার সাথে নিয়ে যান।</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <span>লেনদেন চার্জ কত?</span>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" style="display: none;">
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
      const contactOptions = supportPopup.querySelectorAll(".contact-option");
      contactOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const title = this.querySelector(".contact-title").textContent;
          if (title.includes("লাইভ চ্যাট")) {
            alert("লাইভ চ্যাট শীঘ্রই চালু হবে।");
          } else if (title.includes("কল করুন")) {
            alert("16247 নম্বরে কল করা হচ্ছে...");
          } else if (title.includes("ইমেইল")) {
            alert("ইমেইল ফিচার শীঘ্রই চালু হবে।");
          }
        });
      });
    }, 100);
  }

  // Initialize all the required sidebar and popup functionality
  // Setup close for sidebar overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }
});
