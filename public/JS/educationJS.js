// Education Fee Payment System
document.addEventListener("DOMContentLoaded", function () {
  // Main sections
  const mainSelectionSection = document.getElementById("mainSelectionSection");
  const schoolListSection = document.getElementById("schoolListSection");
  const collegeListSection = document.getElementById("collegeListSection");
  const universityListSection = document.getElementById(
    "universityListSection"
  );
  const trainingListSection = document.getElementById("trainingListSection");
  const otherListSection = document.getElementById("otherListSection");

  // Options
  const schoolOption = document.getElementById("schoolOption");
  const collegeOption = document.getElementById("collegeOption");
  const universityOption = document.getElementById("universityOption");
  const trainingOption = document.getElementById("trainingOption");
  const otherOption = document.getElementById("otherOption");
  const receiptOption = document.querySelector(".receipt-option");

  // Main search input
  const mainSearchInput = document.querySelector(".search-input");
  const mainSearchBtn = document.querySelector(".search-btn");

  // Lists containers
  const institutesList = document.getElementById("institutesList");

  // Main container to apply blur effect
  const educationFeeContainer = document.querySelector(
    ".education-fee-container"
  );
  if (educationFeeContainer) {
    educationFeeContainer.style.margin = "0 auto";
    educationFeeContainer.style.maxWidth = "500px";
  }

  // Center the education fee section on the page
  const container = document.querySelector(".container");
  if (container) {
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100%";
  }

  const educationFeeSection = document.querySelector(".education-fee-section");
  if (educationFeeSection) {
    educationFeeSection.style.display = "flex";
    educationFeeSection.style.alignItems = "center";
    educationFeeSection.style.justifyContent = "center";
    educationFeeSection.style.height = "100vh";
  }

  // Education data
  const institutions = {
    schools: [
      {
        id: 1,
        name: "Viqarunnisa Noon School & College",
        logo: "images/schools/vns.png",
        type: "স্কুল",
      },
      {
        id: 2,
        name: "Monipur Uchcha Vidyalaya & College",
        logo: "images/schools/muvc.png",
        type: "স্কুল",
      },
      {
        id: 3,
        name: "Rajshahi Cantonment Public School & College",
        logo: "images/schools/rcpsc.png",
        type: "স্কুল",
      },
      {
        id: 4,
        name: "Ispahani Girls School & College",
        logo: "images/schools/igsc.png",
        type: "স্কুল",
      },
      {
        id: 5,
        name: "Barishal Zilla School",
        logo: "images/schools/bzs.png",
        type: "স্কুল",
      },
      {
        id: 6,
        name: "Government Mohammadpur Model School and College",
        logo: "images/schools/gmmsc.png",
        type: "স্কুল",
      },
      {
        id: 7,
        name: "Mohammadpur Govt High School",
        logo: "images/schools/mghs.png",
        type: "স্কুল",
      },
      {
        id: 8,
        name: "International Hope School Bangladesh",
        logo: "images/schools/ihsb.png",
        type: "স্কুল",
      },
      {
        id: 9,
        name: "Nirjhor Cantonment Public School & College",
        logo: "images/schools/ncpsc.png",
        type: "স্কুল",
      },
      {
        id: 10,
        name: "GPCPSC",
        logo: "images/schools/gpcpsc.png",
        type: "স্কুল",
      },
    ],
    colleges: [
      {
        id: 11,
        name: "Dhaka College",
        logo: "images/colleges/dhaka-college.png",
        type: "কলেজ",
      },
      {
        id: 12,
        name: "Eden Mohila College",
        logo: "images/colleges/eden.png",
        type: "কলেজ",
      },
      {
        id: 13,
        name: "Chittagong College",
        logo: "images/colleges/chittagong.png",
        type: "কলেজ",
      },
      {
        id: 14,
        name: "Govt Shahid Suhrawardy College",
        logo: "images/colleges/suhrawardy.png",
        type: "কলেজ",
      },
      {
        id: 15,
        name: "Gurudayal Government College",
        logo: "images/colleges/gurudayal.png",
        type: "কলেজ",
      },
      {
        id: 16,
        name: "Sher E Bangla Nagar Adarsha Mohila Mohabiddaloy",
        logo: "images/colleges/sher-e-bangla.png",
        type: "কলেজ",
      },
      {
        id: 17,
        name: "Brindaban Govt College Habiganj",
        logo: "images/colleges/brindaban.png",
        type: "কলেজ",
      },
      {
        id: 18,
        name: "Lalmatia Mohila College",
        logo: "images/colleges/lalmatia.png",
        type: "কলেজ",
      },
      {
        id: 19,
        name: "Adamjee Cantonment College",
        logo: "images/colleges/adamjee.png",
        type: "কলেজ",
      },
      {
        id: 20,
        name: "SOS Hermann Gmeinar College",
        logo: "images/colleges/sos.png",
        type: "কলেজ",
      },
    ],
    universities: [
      {
        id: 21,
        name: "BUET",
        logo: "images/universities/buet.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 22,
        name: "BUET Admission",
        logo: "images/universities/buet.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 23,
        name: "Daffodil International University",
        logo: "images/universities/diu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 24,
        name: "World University of Bangladesh",
        logo: "images/universities/wub.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 25,
        name: "Uttara University",
        logo: "images/universities/uu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 26,
        name: "Bangladesh University of Business & Technology (BUBT)",
        logo: "images/universities/bubt.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 27,
        name: "Varendra University",
        logo: "images/universities/vu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 28,
        name: "Atish Dipankar University of Science & Technology",
        logo: "images/universities/adust.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 29,
        name: "University of South Asia",
        logo: "images/universities/usa.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 30,
        name: "Manarat International University (MIU)",
        logo: "images/universities/miu.png",
        type: "ইউনিভার্সিটি",
      },
    ],
    training: [
      {
        id: 31,
        name: "BMET",
        logo: "images/training/bmet.png",
        type: "ট্রেনিং",
      },
      {
        id: 32,
        name: "Eduman",
        logo: "images/training/eduman.png",
        type: "ট্রেনিং",
      },
      {
        id: 33,
        name: "BOESL",
        logo: "images/training/boesl.png",
        type: "ট্রেনিং",
      },
      {
        id: 34,
        name: "eShiksa",
        logo: "images/training/eshiksa.png",
        type: "ট্রেনিং",
      },
    ],
    others: [
      {
        id: 35,
        name: "BTEB",
        logo: "images/others/bteb.png",
        type: "অন্যান্য",
      },
      {
        id: 36,
        name: "MCPSC",
        logo: "images/others/mcpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 37,
        name: "DCGPSC",
        logo: "images/others/dcgpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 38,
        name: "RCPSC",
        logo: "images/others/rcpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 39,
        name: "BCPSC-Bogura",
        logo: "images/others/bcpsc.png",
        type: "অন্যান্য",
      },
    ],
  };

  // Get all institutions in a single array
  const allInstitutions = [
    ...institutions.schools,
    ...institutions.colleges,
    ...institutions.universities,
    ...institutions.training,
    ...institutions.others,
  ];

  // State
  let currentInstitution = null;

  // Clear the institution names from main section
  if (institutesList) {
    institutesList.innerHTML = "";
  }

  // Function to apply blur effect to main container
  function applyBlurEffect() {
    if (educationFeeContainer) {
      educationFeeContainer.classList.add("blur");
    }
  }

  // Function to remove blur effect from main container
  function removeBlurEffect() {
    if (educationFeeContainer) {
      educationFeeContainer.classList.remove("blur");
    }
  }

  // Add global CSS styles to ensure all popups are fixed and centered
  function addGlobalStyles() {
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .popup {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) scale(0.95) !important;
        width: 90% !important;
        max-width: 500px !important;
        height: 80vh !important;
        max-height: 650px !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        z-index: 3000 !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        background-color: white !important;
        border-radius: 16px !important;
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease !important;
      }
      
      .popup.show {
        opacity: 1 !important;
        transform: translate(-50%, -50%) scale(1) !important;
      }
      
      .popup-content {
        flex: 1 !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        padding: 20px !important;
      }
      
      .education-fee-container {
        max-width: 500px !important;
        margin: 0 auto !important;
      }
      
      .container {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        height: 100% !important;
      }
      
      .education-fee-section {
        height: 100vh !important;
        padding: 60px 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      body {
        overflow: hidden !important;
      }
      
      .blur {
        filter: blur(5px);
        transition: filter 0.3s ease;
      }
      
      .institutions-list {
        max-height: none !important;
        overflow-y: visible !important;
      }
    `;
    document.head.appendChild(styleTag);
  }

  // Function to hide all sections
  function hideAllSections() {
    const allSections = [
      mainSelectionSection,
      schoolListSection,
      collegeListSection,
      universityListSection,
      trainingListSection,
      otherListSection,
    ];

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });
  }

  // Show section with popup style for category sections
  function showSection(section) {
    // For main section, show it directly
    if (section === mainSelectionSection) {
      hideAllSections();
      section.style.display = "block";
      return;
    }
  }

  // Close all popups
  function closeAllPopups() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }

  // Close popup
  function closePopup(popup) {
    if (!popup) return;

    popup.classList.remove("show");
    setTimeout(() => {
      popup.remove();

      // Check if there are other popups visible
      const remainingPopups = document.querySelectorAll(".popup.show");
      if (remainingPopups.length === 0) {
        // Only remove blur if no other popups are showing
        removeBlurEffect();
      }
    }, 300);
  }

  // Implement main search functionality
  if (mainSearchInput && mainSearchBtn) {
    mainSearchBtn.addEventListener("click", function () {
      performMainSearch();
    });

    mainSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performMainSearch();
      }
    });
  }

  // Function to perform main search
  function performMainSearch() {
    const searchQuery = mainSearchInput.value.toLowerCase().trim();

    if (searchQuery.length === 0) {
      return;
    }

    // Search across all institutions
    const searchResults = allInstitutions.filter(
      (institution) =>
        institution.name.toLowerCase().includes(searchQuery) ||
        institution.type.toLowerCase().includes(searchQuery)
    );

    // Show search results popup
    showSearchResultsPopup(searchResults, searchQuery);
  }

  // Function to show search results
  function showSearchResultsPopup(results, query) {
    // Close any existing popups first
    closeAllPopups();

    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "searchResultsPopup";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="back-arrow" id="backFromSearch">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">Search Results</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content">
        <div class="search-container">
          <div class="search-input-wrapper">
            <span class="search-icon"><i class="fas fa-search"></i></span>
            <input type="text" value="${query}" placeholder="Search institution..." class="search-input popup-search">
            <button class="search-btn popup-search-btn">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div class="institutions-list" id="searchResultsList"></div>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Populate the search results list
    const resultsList = popup.querySelector("#searchResultsList");

    if (results.length === 0) {
      resultsList.innerHTML = `
        <div style="text-align: center; padding: 20px; color: #666;">
          No institutions found for "${query}"
        </div>
      `;
    } else {
      populateInstitutionList(resultsList, results);
    }

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromSearch");
    backBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    // Setup search in popup
    const searchInput = popup.querySelector(".popup-search");
    const searchBtn = popup.querySelector(".popup-search-btn");

    if (searchInput && searchBtn) {
      // Handle search button click
      searchBtn.addEventListener("click", function () {
        const newQuery = searchInput.value.toLowerCase().trim();

        if (newQuery.length === 0) {
          resultsList.innerHTML = "";
          return;
        }

        const newResults = allInstitutions.filter(
          (institution) =>
            institution.name.toLowerCase().includes(newQuery) ||
            institution.type.toLowerCase().includes(newQuery)
        );

        if (newResults.length === 0) {
          resultsList.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
              No institutions found for "${newQuery}"
            </div>
          `;
        } else {
          populateInstitutionList(resultsList, newResults);
        }
      });

      // Handle Enter key press
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          searchBtn.click();
        }
      });

      // Focus the search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }

  // Create category popup
  function createCategoryPopup(category) {
    // Close any existing popups first
    closeAllPopups();

    // Apply blur effect to main container
    applyBlurEffect();

    // Determine the title and data based on the category
    let title = "";
    let institutionData = [];

    switch (category) {
      case "স্কুল":
        title = "স্কুল";
        institutionData = institutions.schools;
        break;
      case "কলেজ":
        title = "কলেজ";
        institutionData = institutions.colleges;
        break;
      case "ইউনিভার্সিটি":
        title = "ইউনিভার্সিটি";
        institutionData = institutions.universities;
        break;
      case "ট্রেনিং":
        title = "ট্রেনিং";
        institutionData = institutions.training;
        break;
      case "অন্যান্য":
        title = "অন্যান্য";
        institutionData = institutions.others;
        break;
      default:
        return;
    }

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "categoryPopup";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="back-arrow" id="backFromCategory">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">${title}</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content">
        <div class="search-container">
          <div class="search-input-wrapper">
            <span class="search-icon"><i class="fas fa-search"></i></span>
            <input type="text" placeholder="Search institution..." class="search-input popup-search">
            <button class="search-btn">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div class="institutions-list" id="popupList"></div>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Populate the institution list
    const popupList = popup.querySelector("#popupList");
    populateInstitutionList(popupList, institutionData);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromCategory");
    backBtn.addEventListener("click", function () {
      closePopup(popup);
      // Remove blur effect when returning to main screen
      removeBlurEffect();
    });

    // Setup search in popup
    const searchInput = popup.querySelector(".popup-search");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        if (query.length === 0) {
          populateInstitutionList(popupList, institutionData);
          return;
        }

        const searchResults = institutionData.filter((institution) =>
          institution.name.toLowerCase().includes(query)
        );

        populateInstitutionList(popupList, searchResults);
      });

      // Focus the search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }
  // Function to populate institution list
  function populateInstitutionList(container, institutions) {
    if (!container) return;

    container.innerHTML = "";

    institutions.forEach((institution) => {
      const instituteItem = document.createElement("div");
      instituteItem.className = "institute-item";
      instituteItem.setAttribute("data-id", institution.id);
      instituteItem.setAttribute("data-type", institution.type);

      instituteItem.innerHTML = `
        <div class="institute-logo">
          <img src="${institution.logo}" alt="${institution.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4='">
        </div>
        <div class="institute-details">
          <div class="institute-name">${institution.name}</div>
          <div class="institute-type">${institution.type}</div>
        </div>
      `;

      instituteItem.addEventListener("click", function () {
        showInstitutionPaymentForm(institution);
      });

      container.appendChild(instituteItem);
    });
  }

  // Function to generate fields based on institution type
  function generateFieldsHTML(institutionType) {
    let fieldsHTML = "";

    // Common fields
    fieldsHTML += `
      <div class="form-group">
        <label class="form-label">Student ID (9 digits)</label>
        <input type="text" class="form-input" id="field_student_id" maxlength="9" pattern="[0-9]{9}" placeholder="Enter your 9-digit student ID">
      </div>
    `;

    // Institution-specific fields
    if (institutionType === "স্কুল" || institutionType === "কলেজ") {
      fieldsHTML += `
        <div class="form-group">
          <label class="form-label">Bill Period</label>
          <div style="display: flex; gap: 10px;">
            <select class="form-select" id="field_month" style="flex: 1;">
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select class="form-select" id="field_year" style="flex: 1;">
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      `;
    } else if (institutionType === "ইউনিভার্সিটি") {
      fieldsHTML += `
        <div class="form-group">
          <label class="form-label">Payment Type</label>
          <select class="form-select" id="field_payment_type">
            <option value="">Select payment type</option>
            <option value="Hall Fee">Hall Fee</option>
            <option value="Registration Fee">Registration Fee</option>
            <option value="Dining Fee">Dining Fee</option>
            <option value="Certificate Fee">Certificate Fee</option>
            <option value="Job Fee">Job Fee</option>
          </select>
        </div>
      `;
    } else if (institutionType === "ট্রেনিং") {
      fieldsHTML += `
        <div class="form-group">
          <label class="form-label">Passport Number</label>
          <input type="text" class="form-input" id="field_passport_number" placeholder="Enter your passport number">
        </div>
        <div class="form-group">
          <label class="form-label">Bill Period</label>
          <div style="display: flex; gap: 10px;">
            <select class="form-select" id="field_month" style="flex: 1;">
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select class="form-select" id="field_year" style="flex: 1;">
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      `;
    } else {
      // For other institution types
      fieldsHTML += `
        <div class="form-group">
          <label class="form-label">Bill Period</label>
          <div style="display: flex; gap: 10px;">
            <select class="form-select" id="field_month" style="flex: 1;">
              <option value="">Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
            <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select class="form-select" id="field_year" style="flex: 1;">
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      `;
    }

    // Amount field for all types
    fieldsHTML += `
      <div class="form-group">
        <label class="form-label">Amount</label>
        <input type="number" class="form-input" id="paymentAmount" placeholder="Enter amount">
        <div class="info-text">Minimum payment amount: ৳10</div>
      </div>
    `;

    return fieldsHTML;
  }

  // Function to show institution payment form
  function showInstitutionPaymentForm(institution) {
    currentInstitution = institution;

    // Close any existing popups
    closeAllPopups();

    // Make sure blur effect is applied
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "paymentFormPopup";

    // Get fields HTML based on institution type
    const fieldsHTML = generateFieldsHTML(institution.type);

    popup.innerHTML = `
      <div class="popup-header">
        <div class="back-arrow" id="backFromPaymentForm">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">এডুকেশন ফি</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content">
        <div class="institute-item" style="margin-bottom: 20px;">
          <div class="institute-logo">
            <img src="${institution.logo}" alt="${institution.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4='">
          </div>
          <div class="institute-details">
            <div class="institute-name">${institution.name}</div>
            <div class="institute-type">${institution.type}</div>
          </div>
        </div>
        
        <div class="popup-form">
          ${fieldsHTML}
        </div>
      </div>
      
      <div class="popup-action">
        <button class="cancel-btn" id="cancelPayment">Cancel</button>
        <button class="proceed-btn" id="proceedPayment">Pay</button>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromPaymentForm");
    const cancelBtn = popup.querySelector("#cancelPayment");
    const proceedBtn = popup.querySelector("#proceedPayment");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      // Open the category popup again
      createCategoryPopup(institution.type);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    proceedBtn.addEventListener("click", function () {
      processPayment();
    });

    // Add input validation
    const paymentAmount = popup.querySelector("#paymentAmount");
    const studentIdField = document.getElementById("field_student_id");

    // Validate 9-digit student ID
    if (studentIdField) {
      studentIdField.addEventListener("input", function () {
        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Limit to 9 digits
        if (this.value.length > 9) {
          this.value = this.value.slice(0, 9);
        }
      });
    }

    if (paymentAmount) {
      paymentAmount.addEventListener("input", function () {
        const amount = parseFloat(this.value);
        proceedBtn.disabled = isNaN(amount) || amount < 10;
      });
    }

    // Set initial state of proceed button
    proceedBtn.disabled = true;
  }

  // Process payment
  function processPayment() {
    // Get payment amount
    const amountInput = document.getElementById("paymentAmount");
    if (!amountInput) return;

    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount < 10) {
      showNotification("Please enter a valid amount (minimum ৳10)");
      return;
    }

    // Get all fields values
    const formData = {};

    // Student ID
    const studentIdField = document.getElementById("field_student_id");
    if (studentIdField && !studentIdField.value) {
      showNotification("Please enter your Student ID");
      return;
    } else if (studentIdField) {
      // Validate 9-digit student ID
      if (
        studentIdField.value.length !== 9 ||
        !/^\d{9}$/.test(studentIdField.value)
      ) {
        showNotification("Please enter a valid 9-digit Student ID");
        return;
      }
      formData.student_id = studentIdField.value;
    }

    // Payment type for university
    if (currentInstitution.type === "ইউনিভার্সিটি") {
      const paymentTypeField = document.getElementById("field_payment_type");
      if (paymentTypeField && !paymentTypeField.value) {
        showNotification("Please select a payment type");
        return;
      } else if (paymentTypeField) {
        formData.payment_type = paymentTypeField.value;
      }
    }

    // Passport number for training
    if (currentInstitution.type === "ট্রেনিং") {
      const passportField = document.getElementById("field_passport_number");
      if (passportField && !passportField.value) {
        showNotification("Please enter your passport number");
        return;
      } else if (passportField) {
        formData.passport_number = passportField.value;
      }
    }

    // Bill period for all except university
    if (currentInstitution.type !== "ইউনিভার্সিটি") {
      const monthField = document.getElementById("field_month");
      const yearField = document.getElementById("field_year");

      if (monthField && !monthField.value) {
        showNotification("Please select a month");
        return;
      } else if (monthField) {
        formData.month = monthField.value;
      }

      if (yearField && !yearField.value) {
        showNotification("Please select a year");
        return;
      } else if (yearField) {
        formData.year = yearField.value;
      }
    }

    // Add amount to form data
    formData.amount = amount;

    // Close payment form
    const paymentFormPopup = document.getElementById("paymentFormPopup");
    if (paymentFormPopup) {
      closePopup(paymentFormPopup);
    }

    // Show confirmation popup
    showConfirmationPopup(amount, formData);
  }

  // Show confirmation popup
  function showConfirmationPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "confirmationPopup";

    // Prepare details HTML based on institution type
    let detailsHTML = `
      <div class="detail-row">
        <div class="detail-label">Institution</div>
        <div class="detail-value">${currentInstitution.name}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Student ID</div>
        <div class="detail-value">${formData.student_id || "N/A"}</div>
      </div>
    `;

    if (currentInstitution.type === "ইউনিভার্সিটি") {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Payment Type</div>
          <div class="detail-value">${formData.payment_type || "N/A"}</div>
        </div>
      `;
    } else if (currentInstitution.type === "ট্রেনিং") {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Passport Number</div>
          <div class="detail-value">${formData.passport_number || "N/A"}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Bill Period</div>
          <div class="detail-value">${formData.month || ""} ${
        formData.year || ""
      }</div>
        </div>
      `;
    } else {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Bill Period</div>
          <div class="detail-value">${formData.month || ""} ${
        formData.year || ""
      }</div>
        </div>
      `;
    }

    detailsHTML += `
      <div class="detail-row">
        <div class="detail-label">Amount</div>
        <div class="detail-value">৳${amount.toFixed(2)}</div>
      </div>
    `;

    popup.innerHTML = `
      <div class="popup-header">
        <div class="back-arrow" id="backFromConfirmation">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">Confirmation</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content">
        <div class="institute-item" style="margin-bottom: 20px;">
          <div class="institute-logo">
            <img src="${currentInstitution.logo}" alt="${currentInstitution.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4='">
          </div>
        </div>
        
        <div class="transaction-details">
          ${detailsHTML}
        </div>
        
        <div class="info-text" style="text-align: center; margin: 20px 0;">
          Please confirm the details above to proceed with payment.
        </div>
      </div>
      
      <div class="popup-action">
        <button class="cancel-btn" id="cancelConfirmation">Cancel</button>
        <button class="proceed-btn" id="confirmPayment">Confirm</button>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromConfirmation");
    const cancelBtn = popup.querySelector("#cancelConfirmation");
    const confirmBtn = popup.querySelector("#confirmPayment");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      showInstitutionPaymentForm(currentInstitution);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    confirmBtn.addEventListener("click", function () {
      closePopup(popup);
      showPinEntryPopup(amount, formData);
    });
  }

  // Show PIN entry popup
  function showPinEntryPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "pinEntryPopup";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="back-arrow" id="backFromPin">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">Enter PIN</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content" style="display: flex; flex-direction: column; justify-content: center;">
        <div class="institute-item" style="margin-bottom: 20px; justify-content: center;">
          <div class="institute-logo">
            <img src="${currentInstitution.logo}" alt="${
      currentInstitution.name
    }" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4='">
          </div>
        </div>
      
        <div class="pin-container">
          <div class="pin-title">Enter bKash PIN</div>
          <div class="pin-subtitle">Please enter your 5-digit PIN to complete the payment of ৳${amount.toFixed(
            2
          )} to ${currentInstitution.name}</div>
          
          <div class="pin-input-container">
            <input type="password" maxlength="1" class="pin-input">
            <input type="password" maxlength="1" class="pin-input">
            <input type="password" maxlength="1" class="pin-input">
            <input type="password" maxlength="1" class="pin-input">
            <input type="password" maxlength="1" class="pin-input">
          </div>
        </div>
      </div>
      
      <div class="popup-action">
        <button class="cancel-btn" id="cancelPin">Cancel</button>
        <button class="proceed-btn" id="confirmPin" disabled>Confirm</button>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");

      // Focus on first input
      const pinInputs = popup.querySelectorAll(".pin-input");
      if (pinInputs.length > 0) {
        pinInputs[0].focus();
      }
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromPin");
    const cancelBtn = popup.querySelector("#cancelPin");
    const confirmBtn = popup.querySelector("#confirmPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      showConfirmationPopup(amount, formData);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    confirmBtn.addEventListener("click", function () {
      processPin(amount, formData);
    });

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }

        // Check if all inputs are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;
      });

      input.addEventListener("keydown", function (e) {
        // Move to previous input on backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });
  }

  // Process PIN
  function processPin(amount, formData) {
    // Close PIN entry
    const pinPopup = document.getElementById("pinEntryPopup");
    if (pinPopup) {
      closePopup(pinPopup);
    }

    // Show loading
    showLoading("Processing payment...");

    // Show success popup after a delay
    setTimeout(() => {
      hideLoading();
      showSuccessPopup(amount, formData);
    }, 1000);
  }

  // Show success popup
  function showSuccessPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Generate transaction ID
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "successPopup";

    // Format details HTML based on institution type
    let detailsHTML = `
      <div class="detail-row">
        <div class="detail-label">Transaction ID</div>
        <div class="detail-value">${transactionId}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Institution</div>
        <div class="detail-value">${currentInstitution.name}</div>
      </div>
    `;

    // Add relevant fields based on institution type
    if (formData.student_id) {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Student ID</div>
          <div class="detail-value">${formData.student_id}</div>
        </div>
      `;
    }

    if (formData.payment_type) {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Payment Type</div>
          <div class="detail-value">${formData.payment_type}</div>
        </div>
      `;
    }

    if (formData.passport_number) {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Passport Number</div>
          <div class="detail-value">${formData.passport_number}</div>
        </div>
      `;
    }

    if (formData.month && formData.year) {
      detailsHTML += `
        <div class="detail-row">
          <div class="detail-label">Bill Period</div>
          <div class="detail-value">${formData.month} ${formData.year}</div>
        </div>
      `;
    }

    detailsHTML += `
      <div class="detail-row">
        <div class="detail-label">Amount</div>
        <div class="detail-value">৳${amount.toFixed(2)}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Time</div>
        <div class="detail-value">${currentTime}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Status</div>
        <div class="detail-value success">Completed</div>
      </div>
    `;

    popup.innerHTML = `
      <div class="popup-header" style="background-color: #4CAF50;">
        <div class="back-arrow" style="visibility: hidden;">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">Payment Successful</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      
      <div class="popup-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <div class="success-amount">৳${amount.toFixed(2)}</div>
        <div class="success-message">has been paid successfully to ${
          currentInstitution.name
        }</div>
        
        <div class="transaction-details">
          ${detailsHTML}
        </div>
        
        <button class="download-receipt-btn" id="downloadReceipt">
          <i class="fas fa-download"></i> Download Receipt
        </button>
      </div>
      
      <div class="popup-action">
        <button class="proceed-btn" id="done">Done</button>
      </div>
    `;

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const doneBtn = popup.querySelector("#done");
    const downloadBtn = popup.querySelector("#downloadReceipt");

    doneBtn.addEventListener("click", function () {
      closePopup(popup);
      removeBlurEffect();
      showSection(mainSelectionSection);
    });

    downloadBtn.addEventListener("click", function () {
      downloadReceipt(transactionId, amount, formData, currentTime);
    });
  }

  // Download receipt
  function downloadReceipt(transactionId, amount, formData, time) {
    // Format receipt content based on institution type
    let details = `Student ID: ${formData.student_id || "N/A"}\n`;

    if (currentInstitution.type === "ইউনিভার্সিটি" && formData.payment_type) {
      details += `Payment Type: ${formData.payment_type}\n`;
    } else if (
      currentInstitution.type === "ট্রেনিং" &&
      formData.passport_number
    ) {
      details += `Passport Number: ${formData.passport_number}\n`;
      if (formData.month && formData.year) {
        details += `Bill Period: ${formData.month} ${formData.year}\n`;
      }
    } else if (formData.month && formData.year) {
      details += `Bill Period: ${formData.month} ${formData.year}\n`;
    }

    // Create receipt content
    const receiptContent = `
bKash Education Fee Receipt
========================

Transaction ID: ${transactionId}
Institution: ${currentInstitution.name}
${details}
Amount: ৳${amount.toFixed(2)}
Time: ${time}
Status: Successful

Thank you for using bKash!
    `;

    // Create download link
    const blob = new Blob([receiptContent.trim()], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Show loading
  function showLoading(message) {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-overlay";
    loadingDiv.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(loadingDiv);
  }

  // Hide loading
  function hideLoading() {
    const loadingDiv = document.querySelector(".loading-overlay");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  // Show notification
  function showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Setup category options click handlers
  if (schoolOption) {
    schoolOption.addEventListener("click", function () {
      createCategoryPopup("স্কুল");
    });
  }

  if (collegeOption) {
    collegeOption.addEventListener("click", function () {
      createCategoryPopup("কলেজ");
    });
  }

  if (universityOption) {
    universityOption.addEventListener("click", function () {
      createCategoryPopup("ইউনিভার্সিটি");
    });
  }

  if (trainingOption) {
    trainingOption.addEventListener("click", function () {
      createCategoryPopup("ট্রেনিং");
    });
  }

  if (otherOption) {
    otherOption.addEventListener("click", function () {
      createCategoryPopup("অন্যান্য");
    });
  }

  // Setup receipt option
  if (receiptOption) {
    receiptOption.addEventListener("click", function () {
      showNotification("Transaction history feature is coming soon!");
    });
  }

  // Add global styles
  addGlobalStyles();

  // Show main section initially
  showSection(mainSelectionSection);
});
