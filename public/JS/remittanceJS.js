document.addEventListener("DOMContentLoaded", function () {
  // Main elements
  const mainContainer = document.getElementById("mainContainer");
  const countryOperatorsBtn = document.getElementById("countryOperatorsBtn");

  // Country data with flags
  const countries = [
    { name: "বাংলাদেশ", flag: "flag-bd.png", code: "BD" },
    { name: "ভারত", flag: "flag-in.png", code: "IN" },
    { name: "পাকিস্তান", flag: "flag-pk.png", code: "PK" },
    { name: "মালয়েশিয়া", flag: "flag-my.png", code: "MY" },
    { name: "সিঙ্গাপুর", flag: "flag-sg.png", code: "SG" },
    { name: "সৌদি আরব", flag: "flag-sa.png", code: "SA" },
    { name: "আরব আমিরাত", flag: "flag-ae.png", code: "AE" },
    { name: "কাতার", flag: "flag-qa.png", code: "QA" },
    { name: "কুয়েত", flag: "flag-kw.png", code: "KW" },
    { name: "ওমান", flag: "flag-om.png", code: "OM" },
    { name: "যুক্তরাজ্য", flag: "flag-gb.png", code: "GB" },
    { name: "যুক্তরাষ্ট্র", flag: "flag-us.png", code: "US" },
    { name: "কানাডা", flag: "flag-ca.png", code: "CA" },
    { name: "অস্ট্রেলিয়া", flag: "flag-au.png", code: "AU" },
    { name: "জাপান", flag: "flag-jp.png", code: "JP" },
  ];

  // Operators by country
  const operatorsByCountry = {
    BD: [
      { name: "বাংলাদেশ বিকাশ", logo: "/public/images/blogo.png" },
      { name: "রকেট", logo: "rocket-logo.png" },
      { name: "নগদ", logo: "nagad-logo.png" },
    ],
    IN: [
      { name: "পেইটিএম", logo: "paytm-logo.png" },
      { name: "ফোনপে", logo: "phonepe-logo.png" },
    ],
    US: [
      { name: "পেপাল", logo: "paypal-logo.png" },
      { name: "ওয়েস্টার্ন ইউনিয়ন", logo: "wu-logo.png" },
    ],
    // Default for other countries
    default: [
      { name: "ওয়েস্টার্ন ইউনিয়ন", logo: "wu-logo.png" },
      { name: "মানিগ্রাম", logo: "moneygram-logo.png" },
    ],
  };

  // Show country operators page
  function showCountryOperators() {
    // Create the country selection popup
    const popup = document.createElement("div");
    popup.className = "country-popup";
    popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 500px;
            height: 80vh;
            background-color: white;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            overflow: hidden;
        `;

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;

    // Create header
    const header = document.createElement("div");
    header.style.cssText = `
             background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
            padding: 18px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            position: relative;
        `;

    // Add radial gradient to header
    header.innerHTML = `
            <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.15), transparent 70%);"></div>
        `;

    const backButton = document.createElement("div");
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backButton.style.cssText = `
            font-size: 20px;
            cursor: pointer;
            z-index: 1;
        `;
    backButton.addEventListener("click", function () {
      document.body.removeChild(popup);
      document.body.removeChild(overlay);
    });

    const title = document.createElement("div");
    title.innerHTML = "<h3>দেশ অনুযায়ী অপারেটর</h3>";
    title.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            z-index: 1;
        `;
    title.querySelector("h3").style.cssText = `
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 0.5px;
        `;

    const logoContainer = document.createElement("div");
    logoContainer.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">';
    logoContainer.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: flex-end;
            z-index: 1;
        `;

    // Add elements to header
    header.appendChild(backButton);
    header.appendChild(title);
    header.appendChild(logoContainer);

    // Create content
    const content = document.createElement("div");
    content.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        `;

    // Add country label
    const countryLabel = document.createElement("div");
    countryLabel.textContent = "দেশ";
    countryLabel.style.cssText = `
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin-bottom: 10px;
        `;
    content.appendChild(countryLabel);

    // Create country selection button
    const countrySelectBtn = document.createElement("div");
    countrySelectBtn.className = "country-select-btn";
    countrySelectBtn.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ebebeb;
            border-radius: 10px;
            font-size: 16px;
            color: #666;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 15px;
        `;
    countrySelectBtn.innerHTML = `
            <span>দেশ সিলেক্ট করুন</span>
            <i class="fas fa-chevron-down"></i>
        `;
    content.appendChild(countrySelectBtn);

    // Create country list (initially hidden)
    const countrySection = document.createElement("div");
    countrySection.className = "country-section";
    countrySection.style.cssText = `
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #ebebeb;
            display: none;
        `;

    // Add search box
    const searchBox = document.createElement("div");
    searchBox.style.cssText = `
            display: flex;
            align-items: center;
            background-color: #f7f7f7;
            border-radius: 10px;
            padding: 4px 15px;
            border: 1px solid #ebebeb;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
        `;

    const searchIcon = document.createElement("span");
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    searchIcon.style.cssText = `
            color: #999;
            font-size: 14px;
            margin-right: 10px;
        `;

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "দেশের নাম দিন";
    searchInput.style.cssText = `
            flex: 1;
            border: none;
            outline: none;
            padding: 12px 0;
            font-size: 15px;
            background-color: transparent;
        `;

    searchBox.appendChild(searchIcon);
    searchBox.appendChild(searchInput);
    countrySection.appendChild(searchBox);

    // Create scrollable country list with fixed height
    const countryList = document.createElement("div");
    countryList.className = "country-list";
    countryList.style.cssText = `
            max-height: 250px;
            overflow-y: auto;
            margin-top: 15px;
            padding-right: 5px;
        `;

    // Add custom scrollbar styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
            .country-list::-webkit-scrollbar {
                width: 4px;
            }
            .country-list::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            .country-list::-webkit-scrollbar-thumb {
                background: #1c2e58;
                border-radius: 10px;
            }
            .country-list::-webkit-scrollbar-thumb:hover {
                background: #112555;
            }
            .country-item {
                display: flex;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .country-item:hover {
                background-color: #f0f0f0;
            }
            .country-item.selected {
                background-color: #ffecf4;
                border-radius: 6px;
            }
            .country-flag {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 15px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #eee;
                flex-shrink: 0;
            }
            .country-flag img {
                width: 30px;
                height: 30px;
                object-fit: cover;
            }
            .country-name {
                font-size: 16px;
                color: #333;
            }
        `;
    document.head.appendChild(styleSheet);

    // Toggle country list visibility
    countrySelectBtn.addEventListener("click", function () {
      if (countrySection.style.display === "none") {
        // Preload all flag images before showing the list
        const imagePromises = countries.map((country) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = `images/flags/${country.flag}`;
            img.width = 30;
            img.height = 30;
          });
        });

        // Only show the list after preloading images
        Promise.all(imagePromises).then(() => {
          // Clear any existing countries
          countryList.innerHTML = "";

          // Add all countries
          countries.forEach((country) => {
            const countryItem = document.createElement("div");
            countryItem.className = "country-item";
            countryItem.setAttribute("data-code", country.code);

            countryItem.innerHTML = `
                            <div class="country-flag">
                                <img src="images/flags/${country.flag}" alt="${country.name}" width="30" height="30" onerror="this.src='images/flags/flag-placeholder.png'">
                            </div>
                            <div class="country-name">${country.name}</div>
                        `;

            countryItem.addEventListener("click", function () {
              // Remove selection from all countries
              countryList.querySelectorAll(".country-item").forEach((item) => {
                item.classList.remove("selected");
              });

              // Add selection to clicked country
              this.classList.add("selected");

              // Update select button text
              countrySelectBtn.querySelector("span").textContent = country.name;

              // Hide country list
              countrySection.style.display = "none";

              // Update operators section
              const countryCode = this.getAttribute("data-code");
              updateOperatorsList(countryCode, operatorsSection);

              // Scroll to operators section
              operatorsSection.scrollIntoView({ behavior: "smooth" });
            });

            countryList.appendChild(countryItem);
          });

          // Show the country section
          countrySection.style.display = "block";
        });
      } else {
        // Hide the country section
        countrySection.style.display = "none";
      }
    });

    // Add search functionality
    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();

      countryList.querySelectorAll(".country-item").forEach((item) => {
        const countryName = item
          .querySelector(".country-name")
          .textContent.toLowerCase();

        if (countryName.includes(query) || query === "") {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });

    countrySection.appendChild(countryList);
    content.appendChild(countrySection);

    // Add info text
    const infoText = document.createElement("div");
    infoText.style.cssText = `
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        `;
    infoText.innerHTML = `
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
                বিকাশ এর সাথে যুক্ত দেশ অনুযায়ী অপারেটর সম্পর্কে জানতে 
                <a href="#" style="color: #1c2e58; text-decoration: none; font-weight: 500;">ট্যাপ করুন</a>
            </p>
        `;
    content.appendChild(infoText);

    // Create operators section
    const operatorsSection = document.createElement("div");
    operatorsSection.style.cssText = `
            flex: 1;
        `;
    operatorsSection.innerHTML = `
            <div style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #666; border-bottom: 1px solid #f0f0f0; margin-bottom: 10px;">অপারেটরসমূহ</div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <img src="images/globe-icon-large.png" alt="Globe" style="width: 80px; height: 80px; opacity: 0.6;">
                </div>
                <div style="font-size: 16px; color: #999; max-width: 250px; margin: 0 auto;">দেশ সিলেক্ট করে অপারেটরের তালিকা দেখুন</div>
            </div>
        `;
    content.appendChild(operatorsSection);

    // Add elements to popup
    popup.appendChild(header);
    popup.appendChild(content);

    // Add popup and overlay to body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Function to update operators list
    function updateOperatorsList(countryCode, container) {
      let operators =
        operatorsByCountry[countryCode] || operatorsByCountry["default"];

      // Preload operator logos to prevent jumping
      const logoPromises = operators.map((operator) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = `images/operators/${operator.logo}`;
          img.width = 40;
          img.height = 40;
        });
      });

      // Update operators section after preloading images
      Promise.all(logoPromises).then(() => {
        let operatorsHTML = `
                    <div style="padding: 10px 0; font-size: 16px; font-weight: 500; color: #666; border-bottom: 1px solid #f0f0f0; margin-bottom: 10px;">অপারেটরসমূহ</div>
                    <div style="overflow-y: auto;">
                `;

        operators.forEach((operator) => {
          operatorsHTML += `
                        <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #f5f5f5; cursor: pointer;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; overflow: hidden; background-color: #f9f9f9;">
                                <img src="images/operators/${operator.logo}" alt="${operator.name}" width="40" height="40" style="object-fit: contain;" onerror="this.src='images/operators/operator-placeholder.png'">
                            </div>
                            <div style="font-size: 16px; font-weight: 500; color: #333;">${operator.name}</div>
                        </div>
                    `;
        });

        operatorsHTML += `</div>`;

        container.innerHTML = operatorsHTML;
      });
    }
  }

  // Add event listener to country operators button
  countryOperatorsBtn.addEventListener("click", showCountryOperators);
});
