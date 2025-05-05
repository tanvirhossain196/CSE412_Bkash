document.addEventListener("DOMContentLoaded", function () {
  // Get all service items
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    // Add premium UI elements to each service item

    // 1. Add highlight accent (top right corner triangle)
    const highlightAccent = document.createElement("div");
    highlightAccent.className = "highlight-accent";
    item.appendChild(highlightAccent);

    // 2. Add background gradient
    const bgGradient = document.createElement("div");
    bgGradient.className = "bg-gradient";
    item.appendChild(bgGradient);

    // 3. Add hover line indicator (bottom line)
    const hoverLine = document.createElement("div");
    hoverLine.className = "hover-line-indicator";
    item.appendChild(hoverLine);

    // 4. Add ripple container
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple-container";
    item.appendChild(rippleContainer);

    // 5. Make the service icon 3D
    const serviceIcon = item.querySelector(".service-icon");
    if (serviceIcon) {
      // Create 3D wrapper around icon
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "icon-3d-wrapper";

      // Move icon inside wrapper
      const iconParent = serviceIcon.parentNode;
      iconParent.insertBefore(iconWrapper, serviceIcon);
      iconWrapper.appendChild(serviceIcon);

      // Add glossy overlay to icon
      const glossOverlay = document.createElement("div");
      glossOverlay.className = "icon-gloss-overlay";
      serviceIcon.appendChild(glossOverlay);
    }

    // 6. Add ripple effect on click
    item.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";

      const rect = rippleContainer.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      rippleContainer.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });

    // 7. Add 3D tilt effect based on mouse position
    item.addEventListener("mousemove", function (e) {
      if (!item.matches(":hover")) return;

      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt values (max ±5 degrees)
      const tiltX = (y / rect.height - 0.5) * 10;
      const tiltY = (x / rect.width - 0.5) * -10;

      // Apply 3D transform to item
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px) scale(1.05)`;

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
        icon.style.transform = `rotateX(${iconTiltX}deg) rotateY(${iconTiltY}deg) translateZ(40px) scale(1.4)`;
      }

      // Move glossy overlay based on mouse position
      const glossOverlay = item.querySelector(".icon-gloss-overlay");
      if (glossOverlay) {
        const moveX = (x / rect.width) * 100 - 50;
        const moveY = (y / rect.height) * 100 - 50;
        glossOverlay.style.background = `radial-gradient(
          circle at ${50 + moveX / 2}% ${50 + moveY / 2}%,
          rgba(255, 255, 255, 0.7) 0%,
          rgba(255, 255, 255, 0) 60%
        )`;
      }
    });

    // 8. Reset transform on mouse leave
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

    // 9. Disable transitions during mouse movement for smoothness
    item.addEventListener("mouseenter", function () {
      item.style.transition = "none";

      // Disable icon transition
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transition = "none";
      }

      // Initial transform to avoid jump
      item.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-12px) scale(1.05)";

      // Force browser to apply the transitions
      setTimeout(() => {
        item.style.transition = "none";
        if (icon) {
          icon.style.transition = "none";
        }
      }, 10);
    });
  });

  // Create staggered hover effect when neighboring items are hovered
  serviceItems.forEach((item, index) => {
    item.addEventListener("mouseenter", function () {
      // Calculate row and column in the grid
      const row = Math.floor(index / 4); // Assuming 4 columns
      const col = index % 4;

      // Get neighboring items
      serviceItems.forEach((otherItem, otherIndex) => {
        const otherRow = Math.floor(otherIndex / 4);
        const otherCol = otherIndex % 4;

        // Check if it's a direct neighbor
        const isNeighbor =
          (otherRow === row && Math.abs(otherCol - col) === 1) || // Left or right
          (otherCol === col && Math.abs(otherRow - row) === 1); // Above or below

        if (isNeighbor) {
          // Apply subtle hover effect to neighbors
          otherItem.classList.add("neighbor-hover");

          // Subtle tilt towards the hovered item
          const tiltX = (otherRow - row) * 3;
          const tiltY = (otherCol - col) * 3;

          otherItem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(1.02)`;
          otherItem.style.zIndex = "5";

          // Add relationship indicator
          if (
            !document.querySelector(`.relation-line-${index}-${otherIndex}`)
          ) {
            const relationLine = document.createElement("div");
            relationLine.className = `relation-line relation-line-${index}-${otherIndex}`;
            relationLine.style.position = "absolute";
            relationLine.style.zIndex = "1";
            relationLine.style.pointerEvents = "none";
            relationLine.style.opacity = "0";
            relationLine.style.transition = "opacity 0.3s ease";

            const itemRect = item.getBoundingClientRect();
            const otherRect = otherItem.getBoundingClientRect();

            // Calculate line position
            const x1 = itemRect.left + itemRect.width / 2;
            const y1 = itemRect.top + itemRect.height / 2;
            const x2 = otherRect.left + otherRect.width / 2;
            const y2 = otherRect.top + otherRect.height / 2;

            // Create SVG line
            relationLine.innerHTML = `
              <svg width="100%" height="100%" style="position: fixed; top: 0; left: 0; pointer-events: none;">
                <defs>
                  <linearGradient id="lineGradient-${index}-${otherIndex}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(226, 20, 108, 0.7)" />
                    <stop offset="100%" stop-color="rgba(226, 20, 108, 0.2)" />
                  </linearGradient>
                </defs>
                <line 
                  x1="${x1}" 
                  y1="${y1}" 
                  x2="${x2}" 
                  y2="${y2}" 
                  stroke="url(#lineGradient-${index}-${otherIndex})" 
                  stroke-width="2" 
                  stroke-dasharray="5,5" 
                />
              </svg>
            `;

            document.body.appendChild(relationLine);

            // Fade in the line
            setTimeout(() => {
              relationLine.style.opacity = "1";
            }, 10);
          }
        }
      });
    });

    item.addEventListener("mouseleave", function () {
      // Remove hover effect from neighbors
      document.querySelectorAll(".neighbor-hover").forEach((neighbor) => {
        neighbor.classList.remove("neighbor-hover");
        neighbor.style.transform = "";
        neighbor.style.zIndex = "";
      });

      // Remove relationship lines
      document
        .querySelectorAll(`[class^="relation-line-${index}-"]`)
        .forEach((line) => {
          line.style.opacity = "0";

          // Remove after fade out
          setTimeout(() => {
            if (line.parentNode) {
              line.parentNode.removeChild(line);
            }
          }, 300);
        });

      document
        .querySelectorAll(`[class^="relation-line-"][class$="-${index}"]`)
        .forEach((line) => {
          line.style.opacity = "0";

          // Remove after fade out
          setTimeout(() => {
            if (line.parentNode) {
              line.parentNode.removeChild(line);
            }
          }, 300);
        });
    });
  });

  // Enhanced Service Item Hover Effects
  serviceItems.forEach((item) => {
    // Add hover arrow for the right side arrow effect
    const hoverArrow = document.createElement("div");
    hoverArrow.className = "hover-arrow";
    hoverArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
    item.appendChild(hoverArrow);

    // Create service content wrapper for 3D effect if not already created
    const serviceContent = item.querySelector(".service-content");
    if (!serviceContent) {
      const serviceIcon = item.querySelector(".service-icon");
      const serviceName = item.querySelector(".service-name");

      if (
        serviceIcon &&
        serviceName &&
        !item.querySelector(".service-content")
      ) {
        // Create a wrapper div
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "service-content";

        // Clone the existing elements
        const iconClone = serviceIcon.cloneNode(true);
        const nameClone = serviceName.cloneNode(true);

        // Add the clones to the wrapper
        contentWrapper.appendChild(iconClone);
        contentWrapper.appendChild(nameClone);

        // Replace the original elements with the wrapper
        serviceIcon.parentNode.replaceChild(contentWrapper, serviceIcon);

        // If the name element still exists in the DOM (not removed by the replaceChild)
        if (serviceName.parentNode) {
          serviceName.parentNode.removeChild(serviceName);
        }
      }
    }
  });

  // Make sure all service items are visible at startup
  serviceItems.forEach((item, index) => {
    // Remove staggered animation that might cause some items to be hidden
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";

    // We'll keep a small animation delay for visual interest
    item.style.transitionDelay = index * 0.03 + "s";
  });

  // Adjust body padding based on service grid height
  function adjustBodyPadding() {
    const header = document.querySelector(".header");
    const servicesMenu = document.getElementById("servicesMenu");

    if (header && servicesMenu) {
      const headerHeight = header.offsetHeight;

      // Set the body padding to account for fixed header
      document.body.style.paddingTop = headerHeight + "px";

      // Make sure dropdown menu is properly sized
      servicesMenu.style.height = "auto";
      servicesMenu.style.overflowY = "visible";
    }
  }

  // Run on page load and on window resize
  adjustBodyPadding();
  window.addEventListener("resize", adjustBodyPadding);

  // Show all service items and make sure they're in the right order
  const serviceGrid = document.getElementById("serviceGrid");
  if (serviceGrid) {
    // Make sure grid is fully visible
    serviceGrid.style.display = "grid";
    serviceGrid.style.visibility = "visible";

    // Check if we have all 16 items
    const itemCount = serviceGrid.querySelectorAll(".service-item").length;
    console.log(`Found ${itemCount} service items in the grid`);

    if (itemCount < 16) {
      console.warn("Not all service items are present in the grid!");
    }
  }

  // Get elements from the DOM
  const servicesButton = document.getElementById("servicesButton");
  const servicesMenu = document.getElementById("servicesMenu");
  const userProfile = document.getElementById("userProfile");
  const userDropdown = document.getElementById("userDropdown");
  const balanceToggle = document.getElementById("balanceToggle");
  const balancePopup = document.getElementById("balancePopup");

  // Keep track of active popup
  let activePopup = null;

  // Profile Menu Items
  const profileMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(1)"
  );
  const transactionMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(2)"
  );
  const settingsMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(3)"
  );
  const helpMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(4)"
  );

  // Add premium hover effect to header elements
  const headerButtons = document.querySelectorAll(".nav-item, .app-btn");
  headerButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.3)";
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
      this.style.transform = "";
    });
  });

  // Services button is always in active state and dropdown is always visible
  // No need to toggle its display state on click

  // Instead, clicking the services button will just focus/scroll to the services section
  servicesButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Scroll to the services menu
    servicesMenu.scrollIntoView({ behavior: "smooth" });

    // Close other menus
    userDropdown.classList.remove("show");
    balancePopup.classList.remove("show");
    balanceToggle.classList.remove("active");
    closeAllPopups();

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
      closeAllPopups();
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
    closeAllPopups();
  });

  // Close dropdowns when clicking outside (but don't close services menu)
  document.addEventListener("click", function (event) {
    // Close user dropdown and balance popup when clicking outside
    if (
      !userProfile.contains(event.target) &&
      !userDropdown.contains(event.target) &&
      !balanceToggle.contains(event.target) &&
      !balancePopup.contains(event.target) &&
      !event.target.closest(".popup-page") &&
      !event.target.closest(".settings-popup") &&
      !event.target.closest(".name-change-popup") &&
      !event.target.closest(".photo-change-popup") &&
      !event.target.closest(".transaction-popup") &&
      !event.target.closest(".help-popup")
    ) {
      userDropdown.classList.remove("show");
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");
      closeAllPopups();

      // Reset balance toggle icon
      if (balanceToggle.classList.contains("fa-eye-slash")) {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }
    }
  });

  // Function to create popup overlay
  function createPopupOverlay() {
    if (!document.querySelector(".popup-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);

      // Animate overlay
      setTimeout(() => {
        overlay.classList.add("active");
      }, 10);

      return overlay;
    }
    return document.querySelector(".popup-overlay");
  }

  // Function to close all popups
  function closeAllPopups() {
    if (activePopup) {
      activePopup.classList.remove("show");

      setTimeout(() => {
        const overlay = document.querySelector(".popup-overlay");
        if (overlay) {
          overlay.classList.remove("active");
          setTimeout(() => {
            overlay.remove();
          }, 300);
        }

        if (activePopup.parentNode) {
          activePopup.parentNode.removeChild(activePopup);
        }
        activePopup = null;
      }, 300);
    }
  }

  // Create and show profile popup
  function showProfilePopup() {
    closeAllPopups();

    // Create overlay
    const overlay = createPopupOverlay();

    // Create profile popup
    const profilePopup = document.createElement("div");
    profilePopup.className = "popup-page profile-popup";
    profilePopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">আমার প্রোফাইল</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="profile-container">
          <div class="profile-picture-container">
            <div class="profile-picture">
              <img src="images/user-avatar.png" alt="প্রোফাইল">
            </div>
          </div>
          <div class="profile-info">
            <div class="profile-name">Md. Tanvir Hossain</div>
            <div class="profile-phone">+880 1712-345678</div>
            <div class="profile-email">tanvir.hossain@example.com</div>
            <div class="profile-address">Dhaka, Bangladesh</div>
          </div>
          <div class="profile-actions">
            <button class="action-button">
              <i class="fas fa-pencil-alt"></i> প্রোফাইল সম্পাদনা
            </button>
            <button class="action-button">
              <i class="fas fa-shield-alt"></i> নিরাপত্তা সেটিংস
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(profilePopup);

    // Animate popup
    setTimeout(() => {
      profilePopup.classList.add("show");
    }, 10);

    activePopup = profilePopup;

    // Add event listener for back button
    profilePopup
      .querySelector(".back-button")
      .addEventListener("click", closeAllPopups);

    // Close the dropdown
    userDropdown.classList.remove("show");
  }

  // Create and show transaction history popup
  function showTransactionPopup() {
    closeAllPopups();

    // Create overlay
    const overlay = createPopupOverlay();

    // Sample transaction data
    const transactions = [
      {
        id: "TXN1234567",
        date: "০৩ মে, ২০২৫",
        type: "সেন্ড মানি",
        amount: "৳ ৫০০",
        receiver: "রফিক হাসান",
        status: "সফল",
      },
      {
        id: "TXN7654321",
        date: "০২ মে, ২০২৫",
        type: "মোবাইল রিচার্জ",
        amount: "৳ ১০০",
        receiver: "নিজের নম্বর",
        status: "সফল",
      },
      {
        id: "TXN8765432",
        date: "০১ মে, ২০২৫",
        type: "ক্যাশ আউট",
        amount: "৳ ১,০০০",
        receiver: "এজেন্ট: ৫৫৫৫৫৫",
        status: "সফল",
      },
      {
        id: "TXN9876543",
        date: "৩০ এপ্রিল, ২০২৫",
        type: "অ্যাড মানি",
        amount: "৳ ২,০০০",
        receiver: "নিজের অ্যাকাউন্ট",
        status: "সফল",
      },
      {
        id: "TXN0987654",
        date: "২৮ এপ্রিল, ২০২৫",
        type: "পেমেন্ট",
        amount: "৳ ৭৫০",
        receiver: "আদর্শ রেস্টুরেন্ট",
        status: "সফল",
      },
      {
        id: "TXN1098765",
        date: "২৫ এপ্রিল, ২০২৫",
        type: "সেন্ড মানি",
        amount: "৳ ১,৫০০",
        receiver: "করিম মিয়া",
        status: "সফল",
      },
      {
        id: "TXN2109876",
        date: "২২ এপ্রিল, ২০২৫",
        type: "বিল পেমেন্ট",
        amount: "৳ ৮২৫",
        receiver: "ডেসকো বিদ্যুৎ",
        status: "সফল",
      },
    ];

    // Create transactions HTML
    let transactionsHTML = "";
    transactions.forEach((txn) => {
      let iconClass = "";
      let colorClass = "";

      // Determine icon and color based on transaction type
      switch (txn.type) {
        case "সেন্ড মানি":
          iconClass = "fa-paper-plane";
          colorClass = "send-money";
          break;
        case "মোবাইল রিচার্জ":
          iconClass = "fa-mobile-alt";
          colorClass = "recharge";
          break;
        case "ক্যাশ আউট":
          iconClass = "fa-money-bill-wave";
          colorClass = "cash-out";
          break;
        case "অ্যাড মানি":
          iconClass = "fa-wallet";
          colorClass = "add-money";
          break;
        case "পেমেন্ট":
        case "বিল পেমেন্ট":
          iconClass = "fa-receipt";
          colorClass = "payment";
          break;
        default:
          iconClass = "fa-exchange-alt";
          colorClass = "default";
      }

      transactionsHTML += `
        <div class="transaction-item ${colorClass}">
          <div class="transaction-icon">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="transaction-details">
            <div class="transaction-primary">
              <div class="transaction-type">${txn.type}</div>
              <div class="transaction-amount">${txn.amount}</div>
            </div>
            <div class="transaction-secondary">
              <div class="transaction-info">
                <div class="transaction-receiver">${txn.receiver}</div>
                <div class="transaction-date">${txn.date}</div>
              </div>
              <div class="transaction-status">${txn.status}</div>
            </div>
            <div class="transaction-id">আইডি: ${txn.id}</div>
          </div>
        </div>
      `;
    });

    // Create transaction popup
    const transactionPopup = document.createElement("div");
    transactionPopup.className = "popup-page transaction-popup";
    transactionPopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">লেনদেন ইতিহাস</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="filter-options">
          <button class="filter-button active">সকল</button>
          <button class="filter-button">আয়</button>
          <button class="filter-button">ব্যয়</button>
          <div class="search-container">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="লেনদেন খুঁজুন">
          </div>
        </div>
        <div class="transactions-container">
          ${transactionsHTML}
        </div>
        <div class="load-more">
          <button class="load-more-button">
            <i class="fas fa-sync-alt"></i> আরো দেখুন
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(transactionPopup);

    // Animate popup
    setTimeout(() => {
      transactionPopup.classList.add("show");
    }, 10);

    activePopup = transactionPopup;

    // Add event listener for back button
    transactionPopup
      .querySelector(".back-button")
      .addEventListener("click", closeAllPopups);

    // Add event listeners for filter buttons
    const filterButtons = transactionPopup.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Close the dropdown
    userDropdown.classList.remove("show");
  }

  // Create and show settings popup
  function showSettingsPopup() {
    closeAllPopups();

    // Create overlay
    const overlay = createPopupOverlay();

    // Create settings popup
    const settingsPopup = document.createElement("div");
    settingsPopup.className = "popup-page settings-popup";
    settingsPopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">সেটিংস</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="settings-container">
          <div class="settings-section">
            <h3 class="settings-heading">প্রোফাইল সেটিংস</h3>
            <div class="settings-options">
              <button class="settings-option" id="nameChangeBtn">
                <div class="settings-option-icon">
                  <i class="fas fa-user-edit"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">নাম পরিবর্তন করুন</div>
                  <div class="settings-option-desc">আপনার প্রোফাইলের নাম আপডেট করুন</div>
                </div>
                <div class="settings-option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </button>
              <button class="settings-option" id="photoChangeBtn">
                <div class="settings-option-icon">
                  <i class="fas fa-camera"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">ছবি পরিবর্তন করুন</div>
                  <div class="settings-option-desc">আপনার প্রোফাইল ছবি আপডেট করুন</div>
                </div>
                <div class="settings-option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </button>
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-heading">অ্যাকাউন্ট সেটিংস</h3>
            <div class="settings-options">
              <button class="settings-option">
                <div class="settings-option-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">পাসওয়ার্ড পরিবর্তন</div>
                  <div class="settings-option-desc">আপনার পাসওয়ার্ড আপডেট করুন</div>
                </div>
                <div class="settings-option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </button>
              <button class="settings-option">
                <div class="settings-option-icon">
                  <i class="fas fa-fingerprint"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">বায়োমেট্রিক লগইন</div>
                  <div class="settings-option-desc">ফিঙ্গারপ্রিন্ট লগইন সেট করুন</div>
                </div>
                <div class="settings-option-status">
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
              </button>
            </div>
          </div>
          <div class="settings-section">
            <h3 class="settings-heading">অন্যান্য সেটিংস</h3>
            <div class="settings-options">
              <button class="settings-option">
                <div class="settings-option-icon">
                  <i class="fas fa-bell"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">নোটিফিকেশন সেটিংস</div>
                  <div class="settings-option-desc">নোটিফিকেশন পছন্দসমূহ পরিবর্তন করুন</div>
                </div>
                <div class="settings-option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </button>
              <button class="settings-option">
                <div class="settings-option-icon">
                  <i class="fas fa-language"></i>
                </div>
                <div class="settings-option-text">
                  <div class="settings-option-title">ভাষা নির্বাচন</div>
                  <div class="settings-option-desc">অ্যাপ্লিকেশনের ভাষা পরিবর্তন করুন</div>
                </div>
                <div class="settings-option-arrow">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(settingsPopup);

    // Animate popup
    setTimeout(() => {
      settingsPopup.classList.add("show");
    }, 10);

    activePopup = settingsPopup;

    // Add event listener for back button
    settingsPopup
      .querySelector(".back-button")
      .addEventListener("click", closeAllPopups);

    // Add event listeners for name change and photo change buttons
    settingsPopup
      .querySelector("#nameChangeBtn")
      .addEventListener("click", showNameChangePopup);
    settingsPopup
      .querySelector("#photoChangeBtn")
      .addEventListener("click", showPhotoChangePopup);

    // Close the dropdown
    userDropdown.classList.remove("show");
  }

  // Create and show name change popup
  function showNameChangePopup() {
    const nameChangePopup = document.createElement("div");
    nameChangePopup.className = "popup-page name-change-popup";
    nameChangePopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">নাম পরিবর্তন করুন</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="name-change-container">
          <div class="input-group">
            <label for="nameInput">নতুন নাম লিখুন</label>
            <input type="text" id="nameInput" value="Md. Tanvir Hossain" placeholder="আপনার নাম লিখুন">
          </div>
          <div class="name-change-note">
            <i class="fas fa-info-circle"></i>
            <span>আপনার নাম পরিবর্তন করলে, আপনার সমস্ত বিকাশ লেনদেনে এই নাম প্রদর্শিত হবে।</span>
          </div>
          <button class="primary-button">
            <i class="fas fa-check"></i> নাম আপডেট করুন
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(nameChangePopup);

    // Store current active popup to return to it
    const previousPopup = activePopup;

    // Animate popup
    setTimeout(() => {
      nameChangePopup.classList.add("show");
    }, 10);

    activePopup = nameChangePopup;

    // Add event listener for back button
    nameChangePopup
      .querySelector(".back-button")
      .addEventListener("click", function () {
        // Remove current popup
        nameChangePopup.classList.remove("show");

        setTimeout(() => {
          if (nameChangePopup.parentNode) {
            nameChangePopup.parentNode.removeChild(nameChangePopup);
          }

          // Restore previous popup as active
          activePopup = previousPopup;
        }, 300);
      });

    // Add event listener for update button
    nameChangePopup
      .querySelector(".primary-button")
      .addEventListener("click", function () {
        const newName = nameChangePopup.querySelector("#nameInput").value;

        if (newName.trim() !== "") {
          // Show success message (could add animation here)
          const successMsg = document.createElement("div");
          successMsg.className = "success-message";
          successMsg.innerHTML =
            '<i class="fas fa-check-circle"></i> নাম সফলভাবে আপডেট হয়েছে!';
          nameChangePopup
            .querySelector(".popup-content")
            .appendChild(successMsg);

          // Update name in UI (could update in more places)
          document.querySelector(".dropdown-user-name").textContent = newName;

          // Remove success message after delay
          setTimeout(() => {
            successMsg.remove();

            // Go back
            nameChangePopup.querySelector(".back-button").click();
          }, 1500);
        }
      });
  }

  // Create and show photo change popup
  function showPhotoChangePopup() {
    const photoChangePopup = document.createElement("div");
    photoChangePopup.className = "popup-page photo-change-popup";
    photoChangePopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">ছবি পরিবর্তন করুন</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="photo-change-container">
          <div class="photo-preview-container">
            <div class="photo-preview">
              <img src="images/user-avatar.png" alt="প্রোফাইল">
              <div class="photo-edit-icon">
                <i class="fas fa-pencil-alt"></i>
              </div>
            </div>
          </div>
          <div class="photo-change-note">
            <i class="fas fa-info-circle"></i>
            <span>একটি পরিষ্কার প্রোফাইল ছবি আপলোড করুন যা আপনার মুখ স্পষ্টভাবে দেখায়।</span>
          </div>
          <div class="photo-actions">
            <input type="file" id="photoInput" accept="image/*" style="display: none;">
            <button class="outline-button" id="choosePhotoBtn">
              <i class="fas fa-image"></i> ছবি নির্বাচন করুন
            </button>
            <button class="primary-button" id="savePhotoBtn">
              <i class="fas fa-check"></i> ছবি আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(photoChangePopup);

    // Store current active popup to return to it
    const previousPopup = activePopup;

    // Animate popup
    setTimeout(() => {
      photoChangePopup.classList.add("show");
    }, 10);

    activePopup = photoChangePopup;

    // Add event listener for back button
    photoChangePopup
      .querySelector(".back-button")
      .addEventListener("click", function () {
        // Remove current popup
        photoChangePopup.classList.remove("show");

        setTimeout(() => {
          if (photoChangePopup.parentNode) {
            photoChangePopup.parentNode.removeChild(photoChangePopup);
          }

          // Restore previous popup as active
          activePopup = previousPopup;
        }, 300);
      });

    // Add event listener for photo edit icon and choose photo button
    const photoInput = photoChangePopup.querySelector("#photoInput");
    photoChangePopup
      .querySelector(".photo-preview")
      .addEventListener("click", function () {
        photoInput.click();
      });

    photoChangePopup
      .querySelector("#choosePhotoBtn")
      .addEventListener("click", function () {
        photoInput.click();
      });

    // Preview selected photo
    photoInput.addEventListener("change", function (e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          photoChangePopup.querySelector(".photo-preview img").src =
            e.target.result;
        };

        reader.readAsDataURL(e.target.files[0]);
      }
    });

    // Add event listener for save button
    photoChangePopup
      .querySelector("#savePhotoBtn")
      .addEventListener("click", function () {
        // Get the src of the preview image
        const newPhotoSrc =
          photoChangePopup.querySelector(".photo-preview img").src;

        if (newPhotoSrc) {
          // Update profile images in UI
          document.querySelector(".user-image img").src = newPhotoSrc;
          document.querySelector(".dropdown-user-image img").src = newPhotoSrc;

          // Show success message
          const successMsg = document.createElement("div");
          successMsg.className = "success-message";
          successMsg.innerHTML =
            '<i class="fas fa-check-circle"></i> ছবি সফলভাবে আপডেট হয়েছে!';
          photoChangePopup
            .querySelector(".popup-content")
            .appendChild(successMsg);

          // Remove success message after delay
          setTimeout(() => {
            successMsg.remove();

            // Go back
            photoChangePopup.querySelector(".back-button").click();
          }, 1500);
        }
      });
  }

  // Create and show help and support popup
  function showHelpPopup() {
    closeAllPopups();

    // Create overlay
    const overlay = createPopupOverlay();

    // Create help popup
    const helpPopup = document.createElement("div");
    helpPopup.className = "popup-page help-popup";
    helpPopup.innerHTML = `
      <div class="popup-header">
        <button class="back-button"><i class="fas fa-arrow-left"></i></button>
        <div class="popup-title">হেল্প এবং সাপোর্ট</div>
        <div class="popup-logo">
          <img src="images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        <div class="help-container">
          <div class="help-search">
            <div class="search-container">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="আপনার প্রশ্ন লিখুন...">
            </div>
          </div>
          
          <div class="help-section">
            <h3 class="help-heading">জনপ্রিয় প্রশ্ন</h3>
            <div class="faq-container">
              <div class="faq-item">
                <div class="faq-question">
                  <span>কিভাবে সেন্ড মানি করবেন?</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                  <p>সেন্ড মানি করতে, হোম স্ক্রিনে "সেন্ড মানি" অপশনে ক্লিক করুন। তারপর রিসিভারের মোবাইল নাম্বার, পরিমাণ এবং রেফারেন্স দিয়ে "সেন্ড" বাটনে ক্লিক করুন।</p>
                </div>
              </div>
              <div class="faq-item">
                <div class="faq-question">
                  <span>কিভাবে মোবাইল রিচার্জ করবেন?</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                  <p>মোবাইল রিচার্জ করতে, হোম স্ক্রিনে "মোবাইল রিচার্জ" অপশনে ক্লিক করুন। তারপর মোবাইল নাম্বার, অপারেটর এবং পরিমাণ নির্বাচন করে "রিচার্জ" বাটনে ক্লিক করুন।</p>
                </div>
              </div>
              <div class="faq-item">
                <div class="faq-question">
                  <span>কিভাবে ক্যাশ আউট করবেন?</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                  <p>ক্যাশ আউট করতে, হোম স্ক্রিনে "ক্যাশ আউট" অপশনে ক্লিক করুন। এজেন্টের নাম্বার, পরিমাণ এবং রেফারেন্স দিয়ে "ক্যাশ আউট" বাটনে ক্লিক করুন।</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="help-section">
            <h3 class="help-heading">যোগাযোগ করুন</h3>
            <div class="contact-options">
              <a href="tel:16247" class="contact-option">
                <div class="contact-icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-title">কল করুন</div>
                  <div class="contact-value">16247</div>
                </div>
              </a>
              <a href="mailto:support@bkash.com" class="contact-option">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-title">ইমেইল করুন</div>
                  <div class="contact-value">support@bkash.com</div>
                </div>
              </a>
              <a href="#" class="contact-option">
                <div class="contact-icon">
                  <i class="fab fa-facebook-messenger"></i>
                </div>
                <div class="contact-details">
                  <div class="contact-title">চ্যাট করুন</div>
                  <div class="contact-value">লাইভ চ্যাট</div>
                </div>
              </a>
            </div>
          </div>
          
          <div class="help-footer">
            <button class="outline-button">
              <i class="fas fa-comment-dots"></i> নতুন সাপোর্ট টিকেট
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(helpPopup);

    // Animate popup
    setTimeout(() => {
      helpPopup.classList.add("show");
    }, 10);

    activePopup = helpPopup;

    // Add event listener for back button
    helpPopup
      .querySelector(".back-button")
      .addEventListener("click", closeAllPopups);

    // Add event listeners for FAQ toggles
    const faqQuestions = helpPopup.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentNode;
        faqItem.classList.toggle("active");

        // Rotate chevron icon
        const icon = this.querySelector("i");
        icon.style.transform = faqItem.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      });
    });

    // Close the dropdown
    userDropdown.classList.remove("show");
  }

  // Add event listeners to user dropdown menu items
  if (profileMenuItem) {
    profileMenuItem.addEventListener("click", showProfilePopup);
  }

  if (transactionMenuItem) {
    transactionMenuItem.addEventListener("click", showTransactionPopup);
  }

  if (settingsMenuItem) {
    settingsMenuItem.addEventListener("click", showSettingsPopup);
  }

  if (helpMenuItem) {
    helpMenuItem.addEventListener("click", showHelpPopup);
  }

  // Notification bell animation
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("mouseenter", function () {
      this.classList.add("bell-animated");
      setTimeout(() => {
        this.classList.remove("bell-animated");
      }, 1000);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("show-mobile");

      // Add slide-in animation class
      if (nav.classList.contains("show-mobile")) {
        nav.classList.add("slide-in");
      } else {
        nav.classList.remove("slide-in");
      }
    });
  }

  // Initialize Swiper slider with enhanced effects
  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      effect: "fade", // Smooth fade transition
      fadeEffect: {
        crossFade: true,
      },
      speed: 800, // Transition speed
      navigation: {
        prevEl: ".swiper-custom-prev",
        nextEl: ".swiper-custom-next",
      },
      pagination: {
        el: ".swiper-pagination-bullets",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      on: {
        init: function () {
          // Add animation to first slide
          const activeSlide = document.querySelector(".swiper-slide-active");
          if (activeSlide) {
            activeSlide.classList.add("slide-animated");
          }
        },
        slideChangeTransitionStart: function () {
          // Remove animation class from all slides
          document.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.classList.remove("slide-animated");
          });
        },
        slideChangeTransitionEnd: function () {
          // Add animation class to active slide
          const activeSlide = document.querySelector(".swiper-slide-active");
          if (activeSlide) {
            activeSlide.classList.add("slide-animated");
          }
        },
      },
    });

    // Enhanced pause/play functionality
    const pauseButton = document.querySelector(".swiper-pause");
    let isPaused = false;

    if (pauseButton) {
      pauseButton.addEventListener("click", function () {
        if (isPaused) {
          swiper.autoplay.start();
          pauseButton.textContent = "‖";
          pauseButton.title = "পজ করুন";
          isPaused = false;
        } else {
          swiper.autoplay.stop();
          pauseButton.textContent = "▶";
          pauseButton.title = "চালু করুন";
          isPaused = true;
        }
      });
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Add staggered animation to service categories
  const serviceCategories = document.querySelectorAll(".service-category");
  if (serviceCategories.length > 0) {
    // Set initial styles
    serviceCategories.forEach((category) => {
      category.style.opacity = "0";
      category.style.transform = "translateY(20px)";
      category.style.transition =
        "opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    });

    // Animate when visible in viewport
    const animateOnScroll = () => {
      serviceCategories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.8;

        if (isInViewport) {
          setTimeout(() => {
            category.style.opacity = "1";
            category.style.transform = "translateY(0)";
          }, index * 80); // Staggered delay
        }
      });
    };

    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener("scroll", animateOnScroll);
  }

  // Add parallax effect to banner images
  const handleParallax = () => {
    const bannerImages = document.querySelectorAll(".banner-image");
    bannerImages.forEach((image) => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        // Only apply effect near the top of the page
        const yOffset = scrollPosition * 0.2; // Adjust speed of parallax
        image.style.transform = `translateY(${yOffset}px)`;
      }
    });
  };

  window.addEventListener("scroll", handleParallax);
});
