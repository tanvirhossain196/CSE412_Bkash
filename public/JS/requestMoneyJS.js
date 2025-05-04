// requestMoneyJS.js

document.addEventListener("DOMContentLoaded", function () {
  // Main Elements
  const mainContainer = document.querySelector(".receipt-fee-container");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const contactsList = document.getElementById("contactsList");
  const contactItems = document.querySelectorAll(".contact-item");

  // Initialize the UI state
  let selectedContacts = [];
  let currentPage = "main"; // 'main', 'amount', 'pin', 'success', 'group', 'groupCreate', 'groupName'
  let currentRecipient = null;
  let currentAmount = 0;
  let currentGroup = null;

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
      '<img src="images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">';

    headerContent.appendChild(backButton);
    headerContent.appendChild(headerTitle);
    headerContent.appendChild(logoContainer);
    header.appendChild(headerContent);

    // Add content
    const contentContainer = document.createElement("div");
    contentContainer.className = "receipt-fee-form";
    contentContainer.innerHTML = content;

    container.appendChild(header);
    container.appendChild(contentContainer);
    overlay.appendChild(container);

    // Add animation classes after a small delay to trigger transitions
    setTimeout(() => {
      overlay.classList.add("show");
      container.classList.add("show");

      // Apply blur to main container
      const mainContainer = document.querySelector(".receipt-fee-container");
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
    const mainContainer = document.querySelector(".receipt-fee-container");
    if (mainContainer) {
      mainContainer.classList.remove("blur");
    }
  }

  function validateBangladeshiNumber(number) {
    // Validate Bangladeshi phone numbers
    // Must start with 013, 014, 015, 016, 017, 018, or 019 and be 11 digits
    const cleanNumber = number.replace(/\s+/g, "");
    const regex = /^01[3-9]\d{8}$/;
    return regex.test(cleanNumber);
  }

  // PART 1: CONTACT SELECTION AND SEARCH FUNCTIONALITY

  // Handle contact item click
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      showAmountPopup(name, number);
    });
  });

  // Handle search functionality
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") return;

    // Check if it's a valid phone number
    if (validateBangladeshiNumber(searchTerm)) {
      showAmountPopup("Unknown", searchTerm);
      return;
    }

    // Search through contacts
    let found = false;
    contactItems.forEach((item) => {
      const name = item
        .querySelector(".contact-name")
        .textContent.toLowerCase();
      const number = item.querySelector(".contact-number").textContent;

      if (name.includes(searchTerm) || number.includes(searchTerm)) {
        found = true;
        showAmountPopup(
          item.querySelector(".contact-name").textContent,
          number
        );
        return;
      }
    });

    if (!found) {
      // No matching contact found
      alert("কোন কন্টাক্ট পাওয়া যায়নি। আবার চেষ্টা করুন।");
    }
  });

  // PART 2: AMOUNT INPUT AND TRANSACTION FLOW

  function showAmountPopup(name, number) {
    currentRecipient = { name, number };
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
                <div class="amount-label">পরিমাণ</div>
                <div class="amount-input-wrapper">
                    <span class="currency-symbol">৳</span>
                    <input type="text" class="amount-input" id="amountInput" placeholder="0.00" inputmode="numeric">
                </div>
                <div class="amount-limit">রিকোয়েস্ট লিমিট: ৳50,000.00</div>
            </div>
            <div class="reference-field">
                <div class="reference-label">রেফারেন্স <span class="optional">(ঐচ্ছিক)</span></div>
                <input type="text" class="reference-input" id="referenceInput" placeholder="রেফারেন্স যোগ করুন">
            </div>
            <div class="note-field">
                <div class="note-label">নোট <span class="optional">(ঐচ্ছিক)</span></div>
                <textarea class="note-input" id="noteInput" placeholder="নোট লিখুন" maxlength="50"></textarea>
                <div class="character-count"><span id="charCount">0</span>/50</div>
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

    // Character count for note
    noteInput.addEventListener("input", function () {
      charCount.textContent = this.value.length;
    });

    // Amount input validation
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
    });

    proceedBtn.addEventListener("click", function () {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 50000) {
        alert("রিকোয়েস্ট লিমিট ৳50,000.00 এর বেশি হতে পারবে না।");
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
                    অনুগ্রহ করে আপনার বিকাশ পিন নাম্বার প্রবেশ করুন
                </div>
                <div class="pin-amount" style="text-align: center; margin-bottom: 30px;">
                    <div class="amount-value" style="font-size: 28px; font-weight: 600; color: #e2146c;">৳${currentAmount.toFixed(
                      2
                    )}</div>
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

    const popup = createPopup("পিন এন্ট্রি", content);

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
        this.style.borderColor = "#e2146c";
        this.style.backgroundColor = "#fff";
        this.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
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

    let successContent;

    if (currentGroup) {
      // Group request success
      successContent = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="margin-bottom: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 60px; color: #4CAF50;"></i>
                    </div>
                    <h2 style="color: #333; margin-bottom: 15px;">গ্রুপ রিকোয়েস্ট সফল হয়েছে!</h2>
                    <p style="color: #666; margin-bottom: 10px;">আপনি "${
                      currentGroup.name
                    }" গ্রুপের ${
        currentGroup.contacts.length
      } জন সদস্যকে মোট ৳${currentAmount.toFixed(2)} টাকা রিকোয়েস্ট করেছেন।</p>
                    <p style="color: #666; margin-bottom: 20px;">প্রত্যেক সদস্যকে ৳${(
                      currentAmount / currentGroup.contacts.length
                    ).toFixed(2)} টাকা রিকোয়েস্ট করা হয়েছে।</p>
                    <button class="proceed-btn" id="doneBtn" style="background-color: #4CAF50;">ঠিক আছে</button>
                </div>
            `;
    } else {
      // Individual request success
      successContent = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="margin-bottom: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 60px; color: #4CAF50;"></i>
                    </div>
                    <h2 style="color: #333; margin-bottom: 15px;">রিকোয়েস্ট সফল হয়েছে!</h2>
                    <p style="color: #666; margin-bottom: 10px;">আপনি ${
                      currentRecipient.name
                    } (${currentRecipient.number}) কে ৳${currentAmount.toFixed(
        2
      )} টাকা রিকোয়েস্ট করেছেন।</p>
                    <p style="color: #666; margin-bottom: 20px;">রিকোয়েস্ট আইডি: ${generateRandomRequestId()}</p>
                    <button class="proceed-btn" id="doneBtn" style="background-color: #4CAF50;">ঠিক আছে</button>
                </div>
            `;
    }

    const popup = createPopup("রিকোয়েস্ট সফল", successContent);

    const doneBtn = popup.contentContainer.querySelector("#doneBtn");
    doneBtn.addEventListener("click", function () {
      removePopup();
      resetMainPage();
    });
  }

  // Generate a random request ID for success page
  function generateRandomRequestId() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // PART 3: GROUP FUNCTIONALITY

  function setupGroupButtons() {
    const groupButton = document.querySelector(".option-card:nth-child(2)");
    if (groupButton) {
      groupButton.addEventListener("click", showGroupPage);
    }

    // Request button (first option card)
    const requestButton = document.querySelector(".option-card:nth-child(1)");
    if (requestButton) {
      requestButton.addEventListener("click", showRequestsPage);
    }
  }

  function showGroupPage() {
    currentPage = "group";

    const content = `
    <div class="group-page-container">
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon"><i class="fas fa-search"></i></span>
          <input type="text" placeholder="গ্রুপের নাম খুঁজুন" class="search-input" id="groupSearchInput">
        </div>
      </div>
      
      <!-- Empty state when no groups exist -->
      <div class="empty-state" id="emptyGroupState">
        <img src="images/icons/image11.png" alt="কোনো গ্রুপ নেই">
        <p>একাধিক কন্টাক্টসে রিকোয়েস্ট মানি করতে গ্রুপ তৈরি করুন।</p>
        <button class="proceed-btn" id="createGroupBtn">
          <i class="fas fa-plus"></i> নতুন গ্রুপ তৈরি করুন
        </button>
      </div>
      
      <!-- This would be shown if groups existed -->
      <div class="group-list" id="groupList" style="display: none;">
        <div class="group-item">
          <div class="group-avatar">
            <i class="fas fa-users"></i>
          </div>
          <div class="group-info">
            <div class="group-name">পারিবারিক</div>
            <div class="group-members">৬ জন সদস্য</div>
          </div>
        </div>
        
        <div class="group-item">
          <div class="group-avatar">
            <i class="fas fa-users"></i>
          </div>
          <div class="group-info">
            <div class="group-name">বন্ধুরা</div>
            <div class="group-members">৮ জন সদস্য</div>
          </div>
        </div>
      </div>
      
      <!-- Add group button that appears when groups exist -->
      <div class="popup-footer" id="groupFooter" style="display: none;">
        <button class="proceed-btn" id="createGroupBtnFooter">
          <i class="fas fa-plus"></i> নতুন গ্রুপ তৈরি করুন
        </button>
      </div>
    </div>
  `;

    const popup = createPopup("গ্রুপ রিকোয়েস্ট", content);

    // Event handlers
    const createGroupBtn =
      popup.contentContainer.querySelector("#createGroupBtn");
    const createGroupBtnFooter = popup.contentContainer.querySelector(
      "#createGroupBtnFooter"
    );

    if (createGroupBtn) {
      createGroupBtn.addEventListener("click", function () {
        removePopup();
        showGroupCreatePage();
      });
    }

    if (createGroupBtnFooter) {
      createGroupBtnFooter.addEventListener("click", function () {
        removePopup();
        showGroupCreatePage();
      });
    }

    // Group item click behavior (if they existed)
    const groupItems = popup.contentContainer.querySelectorAll(".group-item");
    groupItems.forEach((item) => {
      item.addEventListener("click", function () {
        const groupName = this.querySelector(".group-name").textContent;
        const memberCount = this.querySelector(".group-members").textContent;

        // In a real app, you'd load the specific group data here
        currentGroup = {
          name: groupName,
          contacts: [], // This would be populated with real contacts
        };

        removePopup();
        showGroupAmountPopup();
      });
    });

    // Search functionality
    const groupSearchInput =
      popup.contentContainer.querySelector("#groupSearchInput");
    if (groupSearchInput) {
      groupSearchInput.addEventListener("input", function () {
        const searchTerm = this.value.trim().toLowerCase();

        // In a real app, you'd filter the groups here
        groupItems.forEach((item) => {
          const groupName = item
            .querySelector(".group-name")
            .textContent.toLowerCase();

          if (groupName.includes(searchTerm) || searchTerm === "") {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    }
  }


  function showGroupCreatePage() {
    currentPage = "groupCreate";
    selectedContacts = []; // Reset selected contacts

    // Create contact list HTML
    let contactListHTML = "";
    contactItems.forEach((item, index) => {
      const name = item.querySelector(".contact-name").textContent;
      const number = item.querySelector(".contact-number").textContent;
      const initial = name.charAt(0);

      // Determine avatar color class
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

      contactListHTML += `
                <div class="contact-select-item" data-name="${name}" data-number="${number}">
                    <div style="display: flex; align-items: center; width: 100%;">
                        <div style="width: 25px; color: #777; font-size: 14px; text-align: right; margin-right: 10px;">
                            ${index + 1}.
                        </div>
                        <div class="contact-avatar ${colorClass}">
                            <span>${initial}</span>
                        </div>
                        <div class="contact-info" style="flex: 1;">
                            <div class="contact-name">${name}</div>
                            <div class="contact-number">${number}</div>
                        </div>
                        <div class="contact-checkbox" style="margin-left: auto;">
                            <input type="checkbox" class="contact-select-checkbox" style="width: 20px; height: 20px;">
                        </div>
                    </div>
                </div>
            `;
    });

    const content = `
            <div class="search-container">
                <div class="search-input-wrapper">
                    <span class="search-icon"><i class="fas fa-search"></i></span>
                    <input type="text" placeholder="নাম বা নাম্বার দিন" class="search-input" id="groupSearchInput">
                </div>
            </div>
            <div class="selected-contacts-info" style="display: flex; justify-content: space-between; padding: 10px 15px; background-color: #f9f9f9; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
                <div style="color: #666; font-size: 14px;">
                    অনুগ্রহ করে কন্টাক্টস সিলেক্ট করুন
                </div>
                <div style="color: #e2146c; font-size: 14px; font-weight: 500;">
                    <span id="selectedCount">0</span>/10 সিলেক্ট হয়েছে
                </div>
            </div>
            <div class="selected-contacts-preview" id="selectedContactsPreview" style="display: none; padding: 10px 15px; background-color: #fff5f8; margin-bottom: 10px;">
                <div style="font-size: 14px; color: #e2146c; margin-bottom: 5px;">সিলেক্টেড কন্টাক্টস:</div>
                <div id="selectedContactsList" style="display: flex; flex-wrap: wrap; gap: 5px;">
                </div>
            </div>
            <div class="contacts-list group-contacts-list" style="max-height: 400px; overflow-y: auto;">
                ${contactListHTML}
            </div>
            <div class="popup-footer">
                <button class="proceed-btn" id="groupNextBtn" disabled>পরবর্তী</button>
            </div>
        `;

    const popup = createPopup("নতুন গ্রুপ", content);

    // Contact selection behavior
    const contactSelectItems = popup.contentContainer.querySelectorAll(
      ".contact-select-item"
    );
    const selectedCountElement =
      popup.contentContainer.querySelector("#selectedCount");
    const selectedContactsPreview = popup.contentContainer.querySelector(
      "#selectedContactsPreview"
    );
    const selectedContactsList = popup.contentContainer.querySelector(
      "#selectedContactsList"
    );
    const groupNextBtn = popup.contentContainer.querySelector("#groupNextBtn");
    const groupSearchInput =
      popup.contentContainer.querySelector("#groupSearchInput");

    // Function to update selected contacts display
    function updateSelectedContactsDisplay() {
      selectedCountElement.textContent = selectedContacts.length;
      groupNextBtn.disabled = selectedContacts.length === 0;

      // Update selected contacts preview
      if (selectedContacts.length > 0) {
        selectedContactsPreview.style.display = "block";
        selectedContactsList.innerHTML = "";

        selectedContacts.forEach((contact) => {
          const contactChip = document.createElement("div");
          contactChip.style.backgroundColor = "#ffe0eb";
          contactChip.style.color = "#e2146c";
          contactChip.style.padding = "5px 10px";
          contactChip.style.borderRadius = "15px";
          contactChip.style.fontSize = "12px";
          contactChip.style.display = "flex";
          contactChip.style.alignItems = "center";
          contactChip.style.gap = "5px";

          contactChip.innerHTML = `
                        <span>${contact.name}</span>
                        <i class="fas fa-times" data-name="${contact.name}" data-number="${contact.number}" style="cursor: pointer;"></i>
                    `;

          selectedContactsList.appendChild(contactChip);
        });

        // Add remove functionality to chips
        const removeIcons = selectedContactsList.querySelectorAll(".fa-times");
        removeIcons.forEach((icon) => {
          icon.addEventListener("click", function (e) {
            e.stopPropagation();
            const name = this.getAttribute("data-name");
            const number = this.getAttribute("data-number");

            // Remove from selected contacts
            selectedContacts = selectedContacts.filter(
              (contact) => contact.name !== name || contact.number !== number
            );

            // Uncheck the corresponding checkbox
            contactSelectItems.forEach((item) => {
              if (
                item.getAttribute("data-name") === name &&
                item.getAttribute("data-number") === number
              ) {
                item.querySelector(".contact-select-checkbox").checked = false;
              }
            });

            updateSelectedContactsDisplay();
          });
        });
      } else {
        selectedContactsPreview.style.display = "none";
      }
    }

    contactSelectItems.forEach((item) => {
      item.addEventListener("click", function () {
        const checkbox = this.querySelector(".contact-select-checkbox");
        checkbox.checked = !checkbox.checked;

        const name = this.getAttribute("data-name");
        const number = this.getAttribute("data-number");

        if (checkbox.checked) {
          // Maximum 10 contacts
          if (selectedContacts.length >= 10) {
            checkbox.checked = false;
            alert("আপনি সর্বাধিক 10টি কন্টাক্ট সিলেক্ট করতে পারবেন।");
            return;
          }

          selectedContacts.push({ name, number });
        } else {
          selectedContacts = selectedContacts.filter(
            (contact) => contact.name !== name || contact.number !== number
          );
        }

        updateSelectedContactsDisplay();
      });
    });

    // Search functionality for group creation
    groupSearchInput.addEventListener("input", function () {
      const searchTerm = this.value.trim().toLowerCase();

      contactSelectItems.forEach((item) => {
        const name = item.getAttribute("data-name").toLowerCase();
        const number = item.getAttribute("data-number");

        if (
          name.includes(searchTerm) ||
          number.includes(searchTerm) ||
          searchTerm === ""
        ) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });

    groupNextBtn.addEventListener("click", function () {
      if (selectedContacts.length > 0) {
        removePopup();
        showGroupNamePage();
      }
    });
  }

  function showGroupNamePage() {
    currentPage = "groupName";

    const content = `
            <div style="padding: 20px;">
                <div style="margin-bottom: 20px;">
                    <label for="groupNameInput" style="display: block; margin-bottom: 10px; color: #333; font-weight: 500;">গ্রুপের নাম</label>
                    <input type="text" id="groupNameInput" placeholder="গ্রুপের নাম লিখুন" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px;">
                    <div class="character-count" style="text-align: right; font-size: 12px; color: #999; margin-top: 5px;">
                        <span id="nameCharCount">0</span>/30
                    </div>
                </div>
                <div style="padding: 10px 0;">
                    <h4 style="margin-bottom: 10px; color: #666;">সিলেক্টেড কন্টাক্টস (${
                      selectedContacts.length
                    })</h4>
                    <div class="selected-contacts-preview" style="max-height: 200px; overflow-y: auto;">
                        ${selectedContacts
                          .map(
                            (contact) => `
                            <div style="display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                                <div style="margin-right: 10px; width: 30px; height: 30px; border-radius: 50%; background-color: #e2146c; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                                    ${contact.name.charAt(0)}
                                </div>
                                <div>
                                    <div style="font-size: 14px; color: #333;">${
                                      contact.name
                                    }</div>
                                    <div style="font-size: 12px; color: #777;">${
                                      contact.number
                                    }</div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            <div class="popup-footer">
                <button class="proceed-btn" id="saveGroupBtn" disabled>সেভ করে এগিয়ে যান</button>
            </div>
        `;

    const popup = createPopup("গ্রুপের নাম সেট করুন", content);

    const groupNameInput =
      popup.contentContainer.querySelector("#groupNameInput");
    const nameCharCount =
      popup.contentContainer.querySelector("#nameCharCount");
    const saveGroupBtn = popup.contentContainer.querySelector("#saveGroupBtn");

    groupNameInput.addEventListener("input", function () {
      nameCharCount.textContent = this.value.length;

      if (this.value.length > 30) {
        this.value = this.value.substring(0, 30);
        nameCharCount.textContent = 30;
      }

      saveGroupBtn.disabled = this.value.trim() === "";
    });

    saveGroupBtn.addEventListener("click", function () {
      const groupName = groupNameInput.value.trim();
      if (groupName === "") {
        alert("দয়া করে গ্রুপের নাম লিখুন।");
        return;
      }

      currentGroup = {
        name: groupName,
        contacts: selectedContacts,
      };

      removePopup();
      showGroupAmountPopup();
    });
  }

  function showGroupAmountPopup() {
    const content = `
            <div class="recipient-info">
                <div class="contact-avatar" style="background-color: #e2146c;">
                    <i class="fas fa-users" style="color: white;"></i>
                </div>
                <div class="contact-info">
                    <div class="contact-name">${currentGroup.name}</div>
                    <div class="contact-number">${currentGroup.contacts.length} কন্টাক্টস</div>
                </div>
            </div>
            <div class="amount-field">
                <div class="amount-label">মোট পরিমাণ</div>
                <div class="amount-input-wrapper">
                    <span class="currency-symbol">৳</span>
                    <input type="text" class="amount-input" id="groupAmountInput" placeholder="0.00" inputmode="numeric">
                </div>
                <div class="amount-limit">রিকোয়েস্ট লিমিট: ৳50,000.00</div>
            </div>
            <div style="padding: 0 15px 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="equalSplitCheck" checked style="margin-right: 10px;">
                    <label for="equalSplitCheck">পরিমাণটি সমান ভাগ করা হবে</label>
                </div>
                <div id="splitInfoText" style="font-size: 14px; color: #666; padding: 5px 0 15px 25px;">
                    সকল কন্টাক্টসকে ৳0.00 রিকোয়েস্ট করা হবে
                </div>
            </div>
            <div class="popup-footer">
                <button class="proceed-btn" id="groupProceedBtn">এগিয়ে যান</button>
            </div>
        `;

    const popup = createPopup("গ্রুপ রিকোয়েস্ট", content);

    const groupAmountInput =
      popup.contentContainer.querySelector("#groupAmountInput");
    const equalSplitCheck =
      popup.contentContainer.querySelector("#equalSplitCheck");
    const splitInfoText =
      popup.contentContainer.querySelector("#splitInfoText");
    const groupProceedBtn =
      popup.contentContainer.querySelector("#groupProceedBtn");

    // Update split info text when amount changes
    function updateSplitInfo() {
      const totalAmount = parseFloat(groupAmountInput.value) || 0;
      const splitAmount = totalAmount / currentGroup.contacts.length;

      splitInfoText.textContent = `সকল কন্টাক্টসকে ৳${splitAmount.toFixed(
        2
      )} রিকোয়েস্ট করা হবে`;
    }

    groupAmountInput.addEventListener("input", function () {
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

      updateSplitInfo();
    });

    equalSplitCheck.addEventListener("change", updateSplitInfo);

    groupProceedBtn.addEventListener("click", function () {
      const amount = parseFloat(groupAmountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 50000) {
        alert("রিকোয়েস্ট লিমিট ৳50,000.00 এর বেশি হতে পারবে না।");
        return;
      }

      currentAmount = amount;
      removePopup();
      showPinPopup();
    });
  }

  // PART 4: REQUEST HISTORY PAGE

  function showRequestsPage() {
    currentPage = "requests";

    const content = `
    <div class="request-history-container">
      <div class="request-tabs">
        <div class="request-tab active" id="sentRequestsTab">
          সেন্ড করা রিকোয়েস্ট
        </div>
        <div class="request-tab" id="receivedRequestsTab">
          রিসিভ করা রিকোয়েস্ট
        </div>
      </div>
      
      <div class="request-list" id="requestsList">
        <!-- Empty state shown when no requests exist -->
        <div class="empty-state">
          <img src="images/icons/image11.png" alt="No Requests">
          <p>সম্প্রতি আপনি কোনো রিকোয়েস্ট মানি করেননি।</p>
        </div>
        
        <!-- The following items will be hidden initially but would be shown if there were requests -->
        <div class="request-item" style="display: none;">
          <div class="request-icon">
            <i class="fas fa-paper-plane"></i>
          </div>
          <div class="request-details">
            <div class="request-name">Abbu</div>
            <div class="request-info">
              <div class="request-date">১৮ এপ্রিল, ২০২৫</div>
              <div class="request-amount">৳ ১,০০০.০০</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    const popup = createPopup("রিকোয়েস্টসমূহ", content);

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


  // PART 5: UTILITY FUNCTIONS AND INITIALIZATION

  function resetMainPage() {
    currentPage = "main";
    searchInput.value = "";
    currentRecipient = null;
    currentAmount = 0;
    currentGroup = null;
    selectedContacts = [];
  }

  // Initialize event listeners
  function init() {
    setupGroupButtons();

    // Handle back button
    document.addEventListener("click", function (e) {
      if (e.target.closest(".back-button")) {
        handleBackButton();
      }
    });

    // Handle Enter key on search
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  }

  function handleBackButton() {
    switch (currentPage) {
      case "amount":
        removePopup();
        resetMainPage();
        break;
      case "pin":
        removePopup();
        if (currentGroup) {
          showGroupAmountPopup();
        } else {
          showAmountPopup(currentRecipient.name, currentRecipient.number);
        }
        break;
      case "group":
        removePopup();
        resetMainPage();
        break;
      case "groupCreate":
        removePopup();
        showGroupPage();
        break;
      case "groupName":
        removePopup();
        showGroupCreatePage();
        break;
      case "requests":
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
