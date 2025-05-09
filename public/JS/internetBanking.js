// internetBanking.js - Enhanced version with professional and attractive interface

document.addEventListener("DOMContentLoaded", function () {
  addInternetBankingFunctionality();
});

function addInternetBankingFunctionality() {
  // Internet Banking specific elements
  const internetBankingOption = document.getElementById(
    "internetBankingOption"
  );
  const bankListSection = document.getElementById("bankListSection");
  const bankToBkashSection = document.getElementById("bankToBkashSection");
  const sourceSelectionSection = document.getElementById(
    "sourceSelectionSection"
  );

  // Internet Banking state
  let currentSection = sourceSelectionSection;
  let previousSection = null;

  // Enhanced Internet Banking banks data
  const internetBanks = [
    {
      id: 1,
      name: "অগ্রণী ব্যাংক লিমিটেড",
      logo: "images/banks/agrani-bank.png",
      type: "agrani",
      hasBadge: true,
      color: "#1a5276",
      gradient: "linear-gradient(135deg, #2980b9, #1a5276)",
      features: ["Quick Transfer", "Secure Banking", "24/7 Service"],
      transferLimit: "৳100,000",
    },
    {
      id: 2,
      name: "ব্যাংক এশিয়া",
      logo: "images/banks/bank-asia.png",
      type: "bankasia",
      hasBadge: false,
      color: "#c0392b",
      gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
      features: ["Online Support", "Instant Transfer", "Mobile Banking"],
      transferLimit: "৳50,000",
    },
    {
      id: 3,
      name: "আল-আরাফাহ ইসলামী ব্যাংক পিএলসি",
      logo: "images/banks/arafah-bank.png",
      type: "alarafah",
      hasBadge: true,
      color: "#27ae60",
      gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
      features: ["Shariah Compliant", "Easy Transfer", "Mobile Alerts"],
      transferLimit: "৳75,000",
    },
    {
      id: 4,
      name: "বাংলাদেশ ডেভেলপমেন্ট ব্যাংক",
      logo: "images/banks/bdbl.png",
      type: "bdbl",
      hasBadge: true,
      color: "#8e44ad",
      gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)",
      features: ["Government Bank", "Secure Transfer", "24/7 Service"],
      transferLimit: "৳200,000",
    },
    {
      id: 5,
      name: "বাংলাদেশ কৃষি ব্যাংক",
      logo: "images/banks/krishi-bank.png",
      type: "krishi",
      hasBadge: true,
      color: "#d35400",
      gradient: "linear-gradient(135deg, #e67e22, #d35400)",
      features: ["Agricultural Banking", "Easy Process", "Mobile Banking"],
      transferLimit: "৳50,000",
    },
    {
      id: 6,
      name: "এবি ব্যাংক পিএলসি",
      logo: "images/banks/ab-bank.png",
      type: "abbank",
      hasBadge: false,
      color: "#16a085",
      gradient: "linear-gradient(135deg, #1abc9c, #16a085)",
      features: ["Digital Banking", "Fast Transfer", "SMS Alerts"],
      transferLimit: "৳100,000",
    },
    {
      id: 7,
      name: "বাংলাদেশ কমার্স ব্যাংক",
      logo: "images/banks/bcb.png",
      type: "bcb",
      hasBadge: true,
      color: "#2c3e50",
      gradient: "linear-gradient(135deg, #34495e, #2c3e50)",
      features: ["Commercial Banking", "Secure Transfer", "24/7 Support"],
      transferLimit: "৳150,000",
    },
    {
      id: 8,
      name: "বেঙ্গল কমার্শিয়াল ব্যাংক",
      logo: "images/banks/bengal-bank.png",
      type: "bengal",
      hasBadge: false,
      color: "#7f8c8d",
      gradient: "linear-gradient(135deg, #95a5a6, #7f8c8d)",
      features: ["Quick Process", "Mobile Banking", "Online Support"],
      transferLimit: "৳75,000",
    },
    {
      id: 9,
      name: "ব্র্যাক ব্যাংক",
      logo: "images/banks/brac-bank.png",
      type: "brac",
      hasBadge: false,
      color: "#f39c12",
      gradient: "linear-gradient(135deg, #f1c40f, #f39c12)",
      features: ["Digital First", "Instant Transfer", "SMS Banking"],
      transferLimit: "৳200,000",
    },
  ];

  // Add Internet Banking click handler
  if (internetBankingOption) {
    internetBankingOption.addEventListener("click", function () {
      showSection(bankListSection);
      previousSection = bankToBkashSection;
      currentSection = bankListSection;
      initializeInternetBankingList();
      addBackButton(bankListSection, bankToBkashSection);
    });
  }

  // Show section function
  function showSection(section) {
    hideAllSections();
    section.style.display = "block";
    section.classList.add("fade-in");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Hide all sections
  function hideAllSections() {
    const sections = [
      sourceSelectionSection,
      bankToBkashSection,
      bankListSection,
      document.getElementById("bankAccountSection"),
      document.getElementById("cardToBkashSection"),
      document.getElementById("cardTypeSection"),
    ];

    sections.forEach((section) => {
      if (section) {
        section.style.display = "none";
        section.classList.remove("fade-in");
      }
    });
  }

  // Initialize Internet Banking List with enhanced design
  function initializeInternetBankingList() {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    bankListContainer.innerHTML = "";

    // Show all banks with improved design
    internetBanks.forEach((bank) => {
      const bankItem = createEnhancedBankItem(bank);
      bankListContainer.appendChild(bankItem);
    });
  }

  // Create Enhanced Bank Item
  function createEnhancedBankItem(bank) {
    const bankItem = document.createElement("div");
    bankItem.className = `bank-item ${bank.hasBadge ? "has-badge" : ""}`;
    bankItem.style.cssText = `
      border-left: 4px solid ${bank.color};
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    `;

    // Create hover effect style
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .bank-item[data-bank-id="${bank.id}"]:hover {
        background: linear-gradient(to right, rgba(${hexToRgb(
          bank.color
        )}, 0.05), transparent);
        transform: translateX(5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      .bank-item[data-bank-id="${bank.id}"]::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${bank.gradient};
        transition: width 0.3s ease;
      }
      .bank-item[data-bank-id="${bank.id}"]:hover::before {
        width: 8px;
      }
      .feature-tag {
        background: ${bank.gradient};
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(styleEl);

    bankItem.setAttribute("data-bank-id", bank.id);

    bankItem.innerHTML = `
      <div class="bank-content">
        <div class="bank-logo-container">
          <img src="${bank.logo}" alt="${bank.name}" class="bank-logo-img">
        </div>
        <div class="bank-info">
          <div class="bank-name">${bank.name}</div>
          <div class="bank-features">
            ${bank.features
              .map((feature) => `<span class="feature-tag">${feature}</span>`)
              .join("")}
          </div>
        </div>
        <div class="transfer-info">
          <div class="transfer-limit">
            <i class="fas fa-exchange-alt"></i>
            <span>Max: ${bank.transferLimit}</span>
          </div>
          <div class="chevron-icon">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    `;

    bankItem.addEventListener("click", function () {
      showBankTransferPage(bank);
    });

    return bankItem;
  }

  // Show Professional Bank Transfer Page
  function showBankTransferPage(bank) {
    const transferSection = document.createElement("div");
    transferSection.className = "bank-transfer-section";
    transferSection.id = `${bank.type}TransferSection`;
    transferSection.style.display = "none";

    // Generate professional bank-specific interface
    let transferInterface = "";
    switch (bank.type) {
      case "agrani":
        transferInterface = createAgraniTransferInterface(bank);
        break;
      case "bankasia":
        transferInterface = createBankAsiaTransferInterface(bank);
        break;
      case "alarafah":
        transferInterface = createAlArafahTransferInterface(bank);
        break;
      case "bdbl":
        transferInterface = createBDBLTransferInterface(bank);
        break;
      case "krishi":
        transferInterface = createKrishiBankTransferInterface(bank);
        break;
      case "abbank":
        transferInterface = createABBankTransferInterface(bank);
        break;
      case "bcb":
        transferInterface = createBCBTransferInterface(bank);
        break;
      case "bengal":
        transferInterface = createBengalBankTransferInterface(bank);
        break;
      case "brac":
        transferInterface = createBracBankTransferInterface(bank);
        break;
      default:
        transferInterface = createProfessionalTransferInterface(bank);
    }

    transferSection.innerHTML = transferInterface;
    document.querySelector(".add-money-form").appendChild(transferSection);

    // Add back button
    addBackButton(transferSection, bankListSection);

    // Show the transfer section
    previousSection = currentSection;
    currentSection = transferSection;
    showSection(transferSection);

    // Setup transfer handlers
    setupEnhancedTransferHandlers(transferSection, bank);
  }

  // Professional Agrani Bank Transfer Interface
  function createAgraniTransferInterface(bank) {
    return `
      <div class="professional-transfer-container" style="background: linear-gradient(to bottom, #f8f9fa, #ffffff);">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div class="transfer-form-container">
          <div class="login-section">
            <h3 class="section-title">Login to Your Account</h3>
            
            <div class="form-group">
              <label class="input-label">User ID</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input type="text" class="professional-input" id="agraniUserId" placeholder="Enter your User ID">
                <span class="input-feedback"></span>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock input-icon"></i>
                <input type="password" class="professional-input" id="agraniPassword" placeholder="Enter your password">
                <button class="password-toggle" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Captcha Verification</label>
              <div class="captcha-container">
                <div class="captcha-display-pro">
                  <span id="agraniCaptchaText">Q78L2#N1</span>
                  <button class="refresh-captcha-btn" type="button">
                    <i class="fas fa-sync-alt"></i>
                  </button>
                </div>
                <input type="text" class="professional-input" id="agraniCaptcha" placeholder="Enter captcha">
              </div>
            </div>

            <div class="remember-forgot">
              <label class="remember-me">
                <input type="checkbox" id="rememberMe">
                <span>Remember Me</span>
              </label>
              <a href="#" class="forgot-link">Forgot Password?</a>
            </div>

            <button class="professional-login-btn" style="background: ${bank.gradient};">
              <i class="fas fa-sign-in-alt"></i>
              <span>Secure Login</span>
            </button>
          </div>

          <!-- Features Section -->
          <div class="features-section">
            <h4>Why Agrani Bank?</h4>
            <div class="features-grid">
              <div class="feature-item">
                <i class="fas fa-shield-alt"></i>
                <span>Enhanced Security</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-bolt"></i>
                <span>Instant Transfer</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-clock"></i>
                <span>24/7 Service</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-headset"></i>
                <span>Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="transfer-footer">
          <div class="security-info">
            <i class="fas fa-lock"></i>
            <span>Your transaction is secured with 256-bit SSL encryption</span>
          </div>
          <div class="contact-info">
            <span>Need help? Call: 16205</span>
          </div>
        </div>
      </div>
    `;
  }

  // Professional Bank Asia Transfer Interface
  function createBankAsiaTransferInterface(bank) {
    return `
      <div class="professional-transfer-container" style="background: #f8f9fa;">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <div class="modern-form-container">
          <div class="form-card">
            <h3 class="card-title">Account Login</h3>
            
            <div class="modern-form-group">
              <div class="modern-input-wrapper">
                <i class="fas fa-user-circle"></i>
                <input type="text" class="modern-input" id="bankasiaUsername" required>
                <label class="modern-label">Username</label>
                <span class="focus-border"></span>
              </div>
            </div>

            <div class="modern-form-group">
              <div class="modern-input-wrapper">
                <i class="fas fa-key"></i>
                <input type="password" class="modern-input" id="bankasiaPassword" required>
                <label class="modern-label">Password</label>
                <button class="modern-password-toggle" type="button">
                  <i class="fas fa-eye"></i>
                </button>
                <span class="focus-border"></span>
              </div>
            </div>

            <div class="modern-form-group">
              <div class="captcha-modern">
                <img src="images/captcha-sample.png" alt="Captcha" class="captcha-img">
                <button class="refresh-captcha-modern" type="button">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </div>
              <div class="modern-input-wrapper">
                <i class="fas fa-shield-alt"></i>
                <input type="text" class="modern-input" id="bankasiaCaptcha" required>
                <label class="modern-label">Enter Captcha</label>
                <span class="focus-border"></span>
              </div>
            </div>

            <button class="modern-login-btn" style="background: ${bank.gradient};">
              <i class="fas fa-sign-in-alt"></i>
              <span>Login to Transfer</span>
            </button>

            <div class="additional-links">
              <a href="#"><i class="fas fa-question-circle"></i> Forgot Password?</a>
              <a href="#"><i class="fas fa-user-plus"></i> Register</a>
            </div>
          </div>

          <!-- Side Info -->
          <div class="info-card">
            <h4>Bank Asia Advantages</h4>
            <ul class="advantages-list">
              <li><i class="fas fa-check-circle"></i> Immediate fund transfer</li>
              <li><i class="fas fa-check-circle"></i> No additional charges</li>
              <li><i class="fas fa-check-circle"></i> SMS & Email notifications</li>
              <li><i class="fas fa-check-circle"></i> 24/7 customer support</li>
            </ul>
            
            <div class="help-section">
              <h5>Need Assistance?</h5>
              <div class="contact-options">
                <a href="tel:16205" class="contact-btn">
                  <i class="fas fa-phone"></i> 16205
                </a>
                <a href="#" class="contact-btn">
                  <i class="fas fa-envelope"></i> Email Support
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="security-badge">
          <img src="images/security-badge.png" alt="Security">
          <span>Protected by Bank Asia Security Protocol</span>
        </div>
      </div>
    `;
  }

  // Professional Al-Arafah Bank Transfer Interface
  function createAlArafahTransferInterface(bank) {
    return `
      <div class="islamic-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-mosque"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="islamic-form-container">
          <div class="bismillah-text">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
          
          <div class="islamic-login-card">
            <h3>Login to Your Account</h3>
            
            <div class="islamic-form-group">
              <div class="islamic-input-wrapper">
                <i class="fas fa-user"></i>
                <input type="text" id="alarafahUsername" placeholder="Enter User ID" required>
              </div>
            </div>

            <div class="islamic-form-group">
              <div class="islamic-input-wrapper">
                <i class="fas fa-lock"></i>
                <input type="password" id="alarafahPassword" placeholder="Enter Password" required>
                <button class="islamic-toggle-password" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <div class="islamic-form-group">
              <div class="islamic-captcha">
                <div class="islamic-captcha-display">A3B9Z</div>
                <button class="islamic-refresh-captcha" type="button">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </div>
              <div class="islamic-input-wrapper">
                <i class="fas fa-shield-alt"></i>
                <input type="text" id="alarafahCaptcha" placeholder="Enter Captcha" required>
              </div>
            </div>

            <button class="islamic-login-btn" style="background: ${bank.gradient};">
              <i class="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </button>
          </div>

          <!-- Islamic Banking Features -->
          <div class="islamic-features">
            <h4>Shariah-Compliant Banking</h4>
            <div class="islamic-feature-grid">
              <div class="islamic-feature">
                <i class="fas fa-mosque"></i>
                <span>100% Halal</span>
              </div>
              <div class="islamic-feature">
                <i class="fas fa-balance-scale"></i>
                <span>No Interest</span>
              </div>
              <div class="islamic-feature">
                <i class="fas fa-check-double"></i>
                <span>Shariah Board Approved</span>
              </div>
              <div class="islamic-feature">
                <i class="fas fa-hand-holding-usd"></i>
                <span>Profit Sharing</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="islamic-footer">
          <p>Supervised by Shariah Supervisory Committee</p>
          <p>Customer Care: 16416</p>
        </div>
      </div>
    `;
  }

  // BDBL Transfer Interface
  function createBDBLTransferInterface(bank) {
    return `
      <div class="professional-transfer-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="login-container-modern">
          <div class="login-card">
            <h3>Secure Login Portal</h3>
            
            <div class="login-form-group">
              <div class="input-container">
                <i class="fas fa-id-card"></i>
                <input type="text" id="bdblUserId" placeholder="Customer ID" required>
                <span class="input-hint">Enter your 8-digit customer ID</span>
              </div>
            </div>

            <div class="login-form-group">
              <div class="input-container">
                <i class="fas fa-lock"></i>
                <input type="password" id="bdblPassword" placeholder="Password" required>
                <button class="toggle-password" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <div class="captcha-section">
              <div class="captcha-image">
                <span>7X9PK</span>
                <button class="refresh-captcha" type="button">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </div>
              <input type="text" id="bdblCaptcha" placeholder="Enter verification code" required>
            </div>

            <div class="login-options">
              <label class="remember-option">
                <input type="checkbox"> Remember User ID
              </label>
              <a href="#" class="forgot-credentials">Forgot Password?</a>
            </div>

            <button class="login-submit-btn" style="background: ${bank.gradient};">
              <i class="fas fa-sign-in-alt"></i> Login Securely
            </button>
          </div>

          <div class="bank-features-card">
            <h4>BDBL Internet Banking</h4>
            <ul class="features-list">
              <li><i class="fas fa-shield-alt"></i> Government Owned Bank</li>
              <li><i class="fas fa-exchange-alt"></i> Instant Fund Transfer</li>
              <li><i class="fas fa-lock"></i> Multi-Level Security</li>
              <li><i class="fas fa-headset"></i> 24/7 Support</li>
            </ul>
            <div class="helpline">
              <p>Helpline: 16467</p>
              <p>Email: support@bdbl.com.bd</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createKrishiBankTransferInterface(bank) {
    return `
      <div class="agricultural-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-tractor"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="agri-login-form">
          <div class="form-card-modern">
            <h3>কৃষি ব্যাংক লগইন</h3>
            
            <div class="form-group-modern">
              <label>Account Number / একাউন্ট নম্বর</label>
              <div class="input-with-icon">
                <i class="fas fa-user-circle"></i>
                <input type="text" id="krishiAccount" placeholder="Enter account number">
              </div>
            </div>

            <div class="form-group-modern">
              <label>Password / পাসওয়ার্ড</label>
              <div class="input-with-icon">
                <i class="fas fa-key"></i>
                <input type="password" id="krishiPassword" placeholder="Enter password">
                <button class="password-view" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <div class="language-toggle">
              <button class="lang-btn active">English</button>
              <button class="lang-btn">বাংলা</button>
            </div>

            <button class="agri-login-btn" style="background: ${bank.gradient};">
              <i class="fas fa-sign-in-alt"></i> Login / লগইন করুন
            </button>
          </div>

          <div class="agri-info-panel">
            <h4>Agricultural Banking Benefits</h4>
            <div class="benefit-items">
              <div class="benefit-item">
                <i class="fas fa-tractor"></i>
                <span>Farmer-Friendly Services</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-seedling"></i>
                <span>Crop Loan Management</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-warehouse"></i>
                <span>Rural Banking Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createABBankTransferInterface(bank) {
    return `
      <div class="digital-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="digital-login-form">
          <div class="login-tabs">
            <button class="tab active">Retail Banking</button>
            <button class="tab">Corporate Banking</button>
          </div>

          <div class="login-panel">
            <div class="animated-input-group">
              <input type="text" id="abUsername" required>
              <label>Username</label>
              <i class="fas fa-user"></i>
            </div>

            <div class="animated-input-group">
              <input type="password" id="abPassword" required>
              <label>Password</label>
              <i class="fas fa-lock"></i>
              <button class="password-toggle" type="button">
                <i class="fas fa-eye"></i>
              </button>
            </div>

            <div class="digital-captcha">
              <canvas id="captchaCanvas" width="120" height="40"></canvas>
              <button class="refresh-canvas" type="button">
                <i class="fas fa-redo"></i>
              </button>
              <input type="text" id="abCaptcha" placeholder="Enter captcha">
            </div>

            <button class="digital-login-btn" style="background: ${bank.gradient};">
              <span>Login</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <div class="digital-features">
            <div class="feature-box">
              <i class="fas fa-bolt"></i>
              <h5>Lightning Fast</h5>
              <p>Instant transfers</p>
            </div>
            <div class="feature-box">
              <i class="fas fa-shield-alt"></i>
              <h5>Secure</h5>
              <p>Bank-grade security</p>
            </div>
            <div class="feature-box">
              <i class="fas fa-mobile-alt"></i>
              <h5>Mobile Ready</h5>
              <p>Access anywhere</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createBCBTransferInterface(bank) {
    return `
      <div class="commerce-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="commerce-login-section">
          <div class="login-panel-commerce">
            <div class="panel-header">
              <h3>Secure Banking Portal</h3>
              <p>Protected by 256-bit encryption</p>
            </div>

            <div class="commerce-form">
              <div class="form-field">
                <div class="field-icon">
                  <i class="fas fa-user-tie"></i>
                </div>
                <input type="text" id="bcbUserId" placeholder="User ID" required>
              </div>

              <div class="form-field">
                <div class="field-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <input type="password" id="bcbPassword" placeholder="Password" required>
                <button class="show-password" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>

              <div class="security-check">
                <div class="security-image">
                  <img src="images/security-code.png" alt="Security Code">
                </div>
                <input type="text" id="bcbSecurity" placeholder="Enter security code">
              </div>

              <button class="commerce-login-btn" style="background: ${bank.gradient};">
                <i class="fas fa-lock"></i> Secure Login
              </button>
            </div>

            <div class="login-help">
              <a href="#"><i class="fas fa-question-circle"></i> Need Help?</a>
              <a href="#"><i class="fas fa-user-plus"></i> Register</a>
            </div>
          </div>

          <div class="commerce-info">
            <h4>Why BCB Internet Banking?</h4>
            <div class="info-cards">
              <div class="info-card">
                <i class="fas fa-history"></i>
                <h5>Transaction History</h5>
                <p>View detailed records</p>
              </div>
              <div class="info-card">
                <i class="fas fa-clock"></i>
                <h5>24/7 Service</h5>
                <p>Banking anytime</p>
              </div>
              <div class="info-card">
                <i class="fas fa-chart-line"></i>
                <h5>Fund Management</h5>
                <p>Track your finances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createBengalBankTransferInterface(bank) {
    return `
      <div class="bengal-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="bengal-login-area">
          <div class="login-card-bengal">
            <div class="card-header">
              <h3>Internet Banking Login</h3>
              <span class="security-badge">🔒 Secured</span>
            </div>

            <div class="bengal-form">
              <div class="input-field">
                <i class="fas fa-id-badge"></i>
                <input type="text" id="bengalCustomerId" placeholder="Customer ID">
                <span class="field-info">Enter your 10-digit ID</span>
              </div>

              <div class="input-field">
                <i class="fas fa-key"></i>
                <input type="password" id="bengalPassword" placeholder="Password">
                <button class="toggle-view" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>

              <div class="captcha-field">
                <div class="captcha-box">3F7X9L</div>
                <button class="regenerate" type="button">
                  <i class="fas fa-sync"></i>
                </button>
                <input type="text" id="bengalCaptcha" placeholder="Enter captcha">
              </div>

              <button class="bengal-login-btn" style="background: ${bank.gradient};">
                Login to Internet Banking
              </button>
            </div>

            <div class="quick-links">
              <a href="#">Forgot Password?</a>
              <a href="#">First Time User?</a>
              <a href="#">Security Tips</a>
            </div>
          </div>

          <div class="bengal-features">
            <h4>Banking Made Simple</h4>
            <div class="feature-grid">
              <div class="feature">
                <i class="fas fa-paper-plane"></i>
                <span>Quick Transfer</span>
              </div>
              <div class="feature">
                <i class="fas fa-mobile-alt"></i>
                <span>Mobile Banking</span>
              </div>
              <div class="feature">
                <i class="fas fa-wallet"></i>
                <span>Digital Wallet</span>
              </div>
              <div class="feature">
                <i class="fas fa-headphones"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function createBracBankTransferInterface(bank) {
    return `
      <div class="brac-banking-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="brac-login-section">
          <div class="modern-login-card">
            <div class="login-header">
              <h3>Welcome Back!</h3>
              <p>Login to your account</p>
            </div>

            <div class="login-form">
              <div class="floating-label-group">
                <input type="text" id="bracUsername" required>
                <label>Username</label>
                <i class="fas fa-user-circle"></i>
              </div>

              <div class="floating-label-group">
                <input type="password" id="bracPassword" required>
                <label>Password</label>
                <i class="fas fa-lock"></i>
                <button class="password-visibility" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>

              <div class="verification-area">
                <div class="math-captcha">
                  <span>7 + 9 = ?</span>
                </div>
                <input type="text" id="bracCaptcha" placeholder="Answer">
              </div>

              <div class="remember-device">
                <label>
                  <input type="checkbox"> Remember this device
                </label>
              </div>

              <button class="brac-login-btn" style="background: ${bank.gradient};">
                <span>Login</span>
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <div class="login-footer">
              <a href="#" class="forgot-link">Forgot Password?</a>
              <a href="#" class="register-link">Register Now</a>
            </div>
          </div>

          <div class="brac-advantages">
            <h4>Why Choose BRAC Bank?</h4>
            <div class="advantage-list">
              <div class="advantage-item">
                <i class="fas fa-rocket"></i>
                <h5>Fastest Growth</h5>
                <p>Leading SME bank</p>
              </div>
              <div class="advantage-item">
                <i class="fas fa-globe"></i>
                <h5>International</h5>
                <p>Global banking solutions</p>
              </div>
              <div class="advantage-item">
                <i class="fas fa-award"></i>
                <h5>Award Winning</h5>
                <p>Best digital bank 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Generic Professional Transfer Interface
  function createProfessionalTransferInterface(bank) {
    return `
      <div class="professional-transfer-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-university"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <div class="transfer-form-container">
          <div class="login-section">
            <h3 class="section-title">Login to Your Account</h3>
            
            <div class="form-group">
              <label class="input-label">User ID / Account Number</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input type="text" class="professional-input" id="${
                  bank.type
                }Username" placeholder="Enter your User ID">
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Password</label>
              <div class="input-wrapper">
                <i class="fas fa-lock input-icon"></i>
                <input type="password" class="professional-input" id="${
                  bank.type
                }Password" placeholder="Enter your password">
                <button class="password-toggle" type="button">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Security Verification</label>
              <div class="captcha-container">
                <div class="captcha-display-pro">
                  <span>${generateRandomCaptcha()}</span>
                  <button class="refresh-captcha-btn" type="button">
                    <i class="fas fa-sync-alt"></i>
                  </button>
                </div>
                <input type="text" class="professional-input" id="${
                  bank.type
                }Captcha" placeholder="Enter verification code">
              </div>
            </div>

            <button class="professional-login-btn" style="background: ${
              bank.gradient
            };">
              <i class="fas fa-sign-in-alt"></i>
              <span>Login Securely</span>
            </button>
          </div>

          <div class="features-section">
            <h4>${bank.name} Features</h4>
            <div class="features-grid">
              ${bank.features
                .map(
                  (feature) => `
                <div class="feature-item">
                  <i class="fas fa-check-circle"></i>
                  <span>${feature}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="transfer-footer">
          <div class="security-info">
            <i class="fas fa-lock"></i>
            <span>Secured by ${bank.name}</span>
          </div>
          <div class="contact-info">
            <span>Support: 16247</span>
          </div>
        </div>
      </div>
    `;
  }

  // Show Transfer Amount Page
  function showTransferAmountPage(bank) {
    const amountSection = document.createElement("div");
    amountSection.className = "transfer-amount-section";
    amountSection.id = `${bank.type}AmountSection`;
    amountSection.style.display = "none";

    const amountContent = `
      <div class="amount-transfer-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- Transfer Form -->
        <div class="amount-form-container">
          <div class="account-info-card">
            <h3>Account Information</h3>
            <div class="account-details">
              <div class="detail-item">
                <span class="detail-label">Account Number:</span>
                <span class="detail-value">****1234</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Account Name:</span>
                <span class="detail-value">MD. KABIR HOSSAIN</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Available Balance:</span>
                <span class="detail-value">৳50,000.00</span>
              </div>
            </div>
          </div>

          <!-- Transfer Input -->
          <div class="transfer-input-card">
            <h3>Transfer Details</h3>
            
            <div class="amount-form-group">
              <label>bKash Account Number</label>
              <div class="amount-input-wrapper">
                <i class="fas fa-mobile-alt"></i>
                <input type="text" value="01616122600" readonly class="amount-input">
              </div>
            </div>

            <div class="amount-form-group">
              <label>Transfer Amount (BDT)</label>
              <div class="amount-input-wrapper">
                <span class="currency-symbol">৳</span>
                <input type="number" id="transferAmount" placeholder="Enter amount" class="amount-input">
              </div>
              <div class="amount-limits">
                <span>Min: ৳50</span>
                <span>Max: ${bank.transferLimit}</span>
              </div>
            </div>

            <div class="amount-form-group">
              <label>Purpose</label>
              <select class="amount-select">
                <option value="">Select purpose</option>
                <option value="family">Family Support</option>
                <option value="business">Business Payment</option>
                <option value="personal">Personal Use</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <!-- Quick Amount Selection -->
          <div class="quick-amount-card">
            <h4>Quick Select</h4>
            <div class="quick-amount-options">
              <button class="quick-amount-btn" data-amount="500">৳500</button>
              <button class="quick-amount-btn" data-amount="1000">৳1,000</button>
              <button class="quick-amount-btn" data-amount="5000">৳5,000</button>
              <button class="quick-amount-btn" data-amount="10000">৳10,000</button>
            </div>
          </div>

          <!-- Continue Button -->
          <button class="continue-transfer-btn" style="background: ${bank.gradient};">
            <span>Continue to Verify</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Footer -->
        <div class="transfer-footer-modern">
          <div class="security-notice">
            <i class="fas fa-lock"></i>
            <span>Transaction is secured with 256-bit encryption</span>
          </div>
          <div class="support-info">
            <a href="#" class="support-link">
              <i class="fas fa-question-circle"></i>
              <span>Help & Support</span>
            </a>
          </div>
        </div>
      </div>
    `;

    amountSection.innerHTML = amountContent;
    document.querySelector(".add-money-form").appendChild(amountSection);

    // Add back button
    const currentLoginSection = document.getElementById(
      `${bank.type}TransferSection`
    );
    addBackButton(amountSection, currentLoginSection);

    // Show the amount section
    previousSection = currentSection;
    currentSection = amountSection;
    showSection(amountSection);

    // Setup amount page handlers
    setupAmountPageHandlers(amountSection, bank);
  }

  // Setup Amount Page Handlers
  function setupAmountPageHandlers(amountSection, bank) {
    const amountInput = amountSection.querySelector("#transferAmount");
    const quickAmountBtns = amountSection.querySelectorAll(".quick-amount-btn");
    const continueBtn = amountSection.querySelector(".continue-transfer-btn");

    // Quick amount selection
    quickAmountBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const amount = this.getAttribute("data-amount");
        amountInput.value = amount;

        // Highlight selected button
        quickAmountBtns.forEach((b) => b.classList.remove("selected"));
        this.classList.add("selected");
      });
    });

    // Amount input validation
    amountInput.addEventListener("input", function () {
      const value = parseInt(this.value);
      const maxAmount = parseInt(bank.transferLimit.replace(/[^0-9]/g, ""));

      if (value < 50 || value > maxAmount) {
        this.classList.add("input-error");
      } else {
        this.classList.remove("input-error");
      }
    });

    // Continue button handler
    if (continueBtn) {
      continueBtn.addEventListener("click", function () {
        const amount = amountInput.value;
        if (!amount || amount < 50) {
          showNotification("Please enter a valid amount");
          return;
        }

        // Show loading
        showLoadingWithAnimation("Processing transfer...", bank.color);

        setTimeout(() => {
          hideLoading();
          showOTPVerificationPage(bank, amount);
        }, 1500);
      });
    }
  }

  // Show OTP Verification Page
  function showOTPVerificationPage(bank, amount) {
    const otpSection = document.createElement("div");
    otpSection.className = "otp-verification-section";
    otpSection.id = `${bank.type}OtpSection`;
    otpSection.style.display = "none";

    const otpContent = `
      <div class="modern-otp-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <button class="back-btn">
                <i class="fas fa-arrow-left"></i>
              </button>
              <div class="title-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- OTP Form -->
        <div class="otp-form-modern">
          <div class="otp-sent-info">
            <i class="fas fa-shield-alt"></i>
            <h3>OTP Sent Successfully</h3>
            <p>We've sent a 6-digit OTP to your registered mobile number</p>
            <p class="phone-number">+880 16XX-XXX600</p>
          </div>

          <div class="otp-input-group">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
          </div>

          <div class="otp-timer">
            <i class="fas fa-clock"></i>
            <span>OTP expires in: <span id="timerCount">02:00</span></span>
          </div>

          <div class="otp-actions">
            <button class="resend-otp-btn" disabled>
              <i class="fas fa-redo"></i>
              <span>Resend OTP</span>
            </button>
            <button class="verify-otp-btn-modern" style="background: ${bank.gradient};">
              <i class="fas fa-check-circle"></i>
              <span>Verify & Transfer</span>
            </button>
          </div>

          <!-- Transaction Summary -->
          <div class="transaction-summary">
            <h4>Transaction Summary</h4>
            <div class="summary-item">
              <span>From:</span>
              <span>${bank.name}</span>
            </div>
            <div class="summary-item">
              <span>To:</span>
              <span>bKash (01616122600)</span>
            </div>
            <div class="summary-item">
              <span>Amount:</span>
              <span>৳${amount}</span>
            </div>
          </div>
        </div>

        <!-- Security Info -->
        <div class="otp-security-info">
          <i class="fas fa-info-circle"></i>
          <span>Never share your OTP with anyone. ${bank.name} representatives will never ask for your OTP.</span>
        </div>
      </div>
    `;

    otpSection.innerHTML = otpContent;
    document.querySelector(".add-money-form").appendChild(otpSection);

    // Add back button
    const currentAmountSection = document.getElementById(
      `${bank.type}AmountSection`
    );
    addBackButton(otpSection, currentAmountSection);

    // Show the OTP section
    previousSection = currentSection;
    currentSection = otpSection;
    showSection(otpSection);

    // Setup OTP handlers
    setupOTPPageHandlers(otpSection, bank, amount);
  }

  // Setup OTP Page Handlers
  function setupOTPPageHandlers(otpSection, bank, amount) {
    const otpInputs = otpSection.querySelectorAll(".otp-digit");
    const verifyBtn = otpSection.querySelector(".verify-otp-btn-modern");
    const resendBtn = otpSection.querySelector(".resend-otp-btn");
    const timerElement = otpSection.querySelector("#timerCount");

    // Start countdown timer
    let timeLeft = 120; // 2 minutes
    const timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        resendBtn.disabled = false;
        timerElement.textContent = "00:00";
      }
    }, 1000);

    // OTP input handling
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      // Add animation on focus
      input.addEventListener("focus", function () {
        this.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        this.classList.remove("focused");
      });
    });

    // Verify OTP
    verifyBtn.addEventListener("click", function () {
      const otp = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");

      if (otp.length !== 6) {
        showNotification("Please enter complete OTP");
        return;
      }

      // Show loading
      showLoadingWithAnimation("Verifying OTP...", bank.color);

      setTimeout(() => {
        hideLoading();
        showSuccessPage(bank, amount);
      }, 2000);
    });

    // Resend OTP
    resendBtn.addEventListener("click", function () {
      this.disabled = true;
      timeLeft = 120;

      // Clear OTP inputs
      otpInputs.forEach((input) => {
        input.value = "";
      });
      otpInputs[0].focus();

      showNotification("OTP sent successfully!");
    });
  }

  // Show Success Page
  function showSuccessPage(bank, amount) {
    const successSection = document.createElement("div");
    successSection.className = "success-section";
    successSection.id = `${bank.type}SuccessSection`;
    successSection.style.display = "none";

    const transactionId = generateTransactionId();
    const successContent = `
      <div class="modern-success-container">
        <!-- Updated Bank Header -->
        <div class="form-header-gradient" style="background: ${bank.gradient};">
          <div class="header-content">
            <div class="header-left">
              <div class="title-icon">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            <div class="header-center">
              <h3>Add Money</h3>
            </div>
            <div class="header-right">
              <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
            </div>
          </div>
        </div>

        <!-- Success Animation -->
        <div class="success-animation">
          <div class="checkmark-circle" style="border-color: ${bank.color};">
            <i class="fas fa-check"></i>
          </div>
          <div class="success-ripple" style="background: ${bank.color};"></div>
          <div class="success-ripple delay" style="background: ${
            bank.color
          };"></div>
        </div>

        <!-- Success Message -->
        <div class="success-message">
          <h2>Transfer Successful!</h2>
          <p class="amount-transferred">৳${amount}</p>
          <p>has been successfully transferred to your bKash account</p>
        </div>

        <!-- Transaction Details -->
        <div class="transaction-details-card" style="border-left: 4px solid ${
          bank.color
        };">
          <h3>Transaction Details</h3>
          <div class="details-grid">
            <div class="detail-row">
              <span>Transaction ID</span>
              <span>${transactionId}</span>
            </div>
            <div class="detail-row">
              <span>From</span>
              <span>${bank.name}</span>
            </div>
            <div class="detail-row">
              <span>To</span>
              <span>bKash (01616122600)</span>
            </div>
            <div class="detail-row">
              <span>Amount</span>
              <span>৳${amount}</span>
            </div>
            <div class="detail-row">
              <span>Date & Time</span>
              <span>${new Date().toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span>Status</span>
              <span class="status-success">Completed</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="success-actions">
          <button class="action-btn download-receipt" style="background: #f5f5f5;">
            <i class="fas fa-download"></i>
            <span>Download Receipt</span>
          </button>
          <button class="action-btn share-receipt" style="background: ${
            bank.gradient
          };">
            <i class="fas fa-share-alt"></i>
            <span>Share Receipt</span>
          </button>
        </div>

        <!-- Additional Options -->
        <div class="additional-options">
          <button class="option-btn" id="newTransfer">
            <i class="fas fa-plus-circle"></i>
            <span>Make Another Transfer</span>
          </button>
          <button class="option-btn" id="viewHistory">
            <i class="fas fa-history"></i>
            <span>View Transaction History</span>
          </button>
          <button class="option-btn done-btn" id="returnHome">
            <i class="fas fa-home"></i>
            <span>Return to Home</span>
          </button>
        </div>

        <!-- Footer -->
        <div class="success-footer">
          <p>Thank you for using ${bank.name} Internet Banking</p>
          <p>Customer Support: ${
            bank.type === "bankasia"
              ? "16205"
              : bank.type === "alarafah"
              ? "16416"
              : "16247"
          }</p>
        </div>
      </div>
    `;

    successSection.innerHTML = successContent;
    document.querySelector(".add-money-form").appendChild(successSection);

    // Show the success section
    previousSection = currentSection;
    currentSection = successSection;
    showSection(successSection);

    // Setup success page handlers
    setupSuccessPageHandlers(successSection, bank, transactionId, amount);
  }

  // Setup Success Page Handlers
  function setupSuccessPageHandlers(
    successSection,
    bank,
    transactionId,
    amount
  ) {
    const downloadBtn = successSection.querySelector(".download-receipt");
    const shareBtn = successSection.querySelector(".share-receipt");
    const newTransferBtn = successSection.querySelector("#newTransfer");
    const viewHistoryBtn = successSection.querySelector("#viewHistory");
    const returnHomeBtn = successSection.querySelector("#returnHome");

    // Download Receipt
    downloadBtn.addEventListener("click", function () {
      downloadEnhancedReceipt(bank, transactionId, amount);
    });

    // Share Receipt
    shareBtn.addEventListener("click", function () {
      shareReceipt(bank, transactionId, amount);
    });

    // New Transfer
    newTransferBtn.addEventListener("click", function () {
      showSection(bankListSection);
      removeDynamicSections();
    });

    // View History (Mock)
    viewHistoryBtn.addEventListener("click", function () {
      showNotification("Transaction history coming soon!");
    });

    // Return Home
    returnHomeBtn.addEventListener("click", function () {
      showSection(sourceSelectionSection);
      removeDynamicSections();
      showNotification("Transaction completed successfully");
    });
  }

  // Enhanced Receipt Download
  function downloadEnhancedReceipt(bank, transactionId, amount) {
    const receiptHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: ${bank.color};">bKash Transaction Receipt</h1>
          <p>Transaction ID: ${transactionId}</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3>Transaction Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">From:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${
                bank.name
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">To:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">bKash (01616122600)</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">Amount:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">৳${amount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">Date & Time:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${new Date().toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px;">Status:</td>
              <td style="padding: 8px; text-align: right; color: #27ae60;">Successful</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p>Thank you for using bKash</p>
          <p style="color: #666; font-size: 12px;">This is a computer generated receipt</p>
        </div>
      </div>
    `;

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification("Receipt downloaded successfully");
  }

  // Share Receipt Function
  function shareReceipt(bank, transactionId, amount) {
    const shareText = `bKash Transfer Receipt\n\nTransaction ID: ${transactionId}\nFrom: ${
      bank.name
    }\nTo: bKash (01616122600)\nAmount: ৳${amount}\nDate: ${new Date().toLocaleString()}\nStatus: Successful`;

    if (navigator.share) {
      navigator
        .share({
          title: "bKash Transfer Receipt",
          text: shareText,
        })
        .then(() => {
          showNotification("Receipt shared successfully");
        })
        .catch(() => {
          fallbackShare(shareText);
        });
    } else {
      fallbackShare(shareText);
    }
  }

  // Fallback share function
  function fallbackShare(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showNotification("Receipt copied to clipboard");
  }

  // Remove Dynamic Sections
  function removeDynamicSections() {
    const dynamicSections = document.querySelectorAll(`
      [id$="TransferSection"], 
      [id$="AmountSection"], 
      [id$="OtpSection"], 
      [id$="SuccessSection"]
    `);

    dynamicSections.forEach((section) => {
      section.remove();
    });
  }

  // Enhanced Loading Animation
  function showLoadingWithAnimation(message, color) {
    const loadingHTML = `
      <div class="enhanced-loading-overlay">
        <div class="enhanced-loading-container">
          <div class="loading-spinner-modern" style="border-color: ${color};">
            <div class="spinner-dot" style="background: ${color};"></div>
            <div class="spinner-dot" style="background: ${color};"></div>
            <div class="spinner-dot" style="background: ${color};"></div>
            <div class="spinner-dot" style="background: ${color};"></div>
          </div>
          <div class="loading-text">${message}</div>
          <div class="loading-progress">
            <div class="progress-bar" style="background: ${color};"></div>
          </div>
        </div>
      </div>
    `;

    const loadingDiv = document.createElement("div");
    loadingDiv.innerHTML = loadingHTML;
    document.body.appendChild(loadingDiv);
  }

  // Add professional styles
  function addProfessionalStyles() {
    const style = document.createElement("style");
    style.textContent = `
      /* Professional Banking Interface Styles */
      .professional-transfer-container {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      /* Updated Header styles */
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

      .transfer-form-container {
        padding: 30px;
      }

      .login-section {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .section-title {
        font-size: 20px;
        color: #333;
        margin-bottom: 25px;
        font-weight: 600;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .input-label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 500;
      }

      .input-wrapper {
        position: relative;
      }

      .input-icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }

      .professional-input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s;
      }

      .professional-input:focus {
        border-color: #e2146c;
        outline: none;
        box-shadow: 0 0 0 4px rgba(226, 20, 108, 0.1);
      }

      .password-toggle {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 5px;
      }

      .captcha-container {
        display: flex;
        gap: 15px;
        align-items: center;
      }

      .captcha-display-pro {
        flex: 1;
        background: #f8f8f8;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .refresh-captcha-btn {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 5px;
        transition: transform 0.3s;
      }

      .refresh-captcha-btn:hover {
        transform: rotate(180deg);
      }

      .remember-forgot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .remember-me {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .forgot-link {
        color: #e2146c;
        text-decoration: none;
        font-size: 14px;
      }

      .professional-login-btn {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
      }

      .professional-login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .features-section {
        margin-top: 30px;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 12px;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 15px;
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
      }

      .feature-item i {
        font-size: 20px;
        color: #e2146c;
      }

      .transfer-footer {
        padding: 20px;
        background: #f8f8f8;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .security-info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #666;
      }

      .contact-info {
        color: #666;
      }

      /* Modern Form Styles */
      .modern-form-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        padding: 30px;
      }

      .form-card {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .card-title {
        font-size: 20px;
        color: #333;
        margin-bottom: 25px;
        font-weight: 600;
      }

      .modern-form-group {
        margin-bottom: 25px;
        position: relative;
      }

      .modern-input-wrapper {
        position: relative;
      }

      .modern-input-wrapper i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        transition: color 0.3s;
      }

      .modern-input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: none;
        border-bottom: 2px solid #e1e1e1;
        font-size: 16px;
        transition: all 0.3s;
        background: transparent;
      }

      .modern-input:focus {
        border-color: #e2146c;
        outline: none;
      }

      .modern-label {
        position: absolute;
        left: 45px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        transition: all 0.3s;
        pointer-events: none;
      }

      .modern-input:focus + .modern-label,
      .modern-input:valid + .modern-label {
        top: -10px;
        font-size: 12px;
        color: #e2146c;
      }

      .focus-border {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #e2146c;
        transition: width 0.3s;
      }

      .modern-input:focus ~ .focus-border {
        width: 100%;
      }

      .captcha-modern {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .captcha-img {
        height: 40px;
        border-radius: 4px;
      }

      .refresh-captcha-modern {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 5px;
      }

      .modern-login-btn {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
      }

      .modern-login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .additional-links {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }

      .additional-links a {
        color: #666;
        text-decoration: none;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .additional-links a:hover {
        color: #e2146c;
      }

      .info-card {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .advantages-list {
        list-style: none;
        padding: 0;
        margin: 15px 0;
      }

      .advantages-list li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        color: #555;
      }

      .advantages-list i {
        color: #27ae60;
      }

      .help-section {
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }

      .contact-options {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }

      .contact-btn {
        flex: 1;
        padding: 10px;
        background: #f8f8f8;
        border: none;
        border-radius: 8px;
        color: #333;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
        font-size: 14px;
      }

      .contact-btn:hover {
        background: #e2146c;
        color: white;
      }

      .security-badge {
        text-align: center;
        padding: 20px;
        background: #f9f9f9;
        border-top: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .security-badge img {
        height: 24px;
      }

      /* Islamic Banking Styles */
      .islamic-banking-container {
        background: #f8f9fa;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .islamic-pattern-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('images/islamic-pattern.png');
        opacity: 0.1;
      }

      .islamic-form-container {
        padding: 30px;
      }

      .bismillah-text {
        text-align: center;
        font-size: 24px;
        color: #27ae60;
        margin-bottom: 25px;
        font-family: 'Arabic Calligraphy', sans-serif;
      }

      .islamic-login-card {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .islamic-form-group {
        margin-bottom: 20px;
      }

      .islamic-input-wrapper {
        position: relative;
      }

      .islamic-input-wrapper i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }

      .islamic-input-wrapper input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s;
      }

      .islamic-input-wrapper input:focus {
        border-color: #27ae60;
        outline: none;
        box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
      }

      .islamic-captcha {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .islamic-captcha-display {
        flex: 1;
        background: #f8f8f8;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        padding: 12px;
        font-family: monospace;
        font-size: 20px;
        letter-spacing: 3px;
        text-align: center;
      }

      .islamic-refresh-captcha {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 5px;
      }

      .islamic-login-btn {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
      }

      .islamic-login-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .islamic-features {
        margin-top: 30px;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .islamic-feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 20px;
      }

      .islamic-feature {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 8px;
      }

      .islamic-feature i {
        font-size: 24px;
        color: #27ae60;
      }

      .islamic-footer {
        text-align: center;
        padding: 20px;
        background: #f9f9f9;
        border-top: 1px solid #eee;
        color: #666;
      }

      /* Amount Transfer Styles */
      .amount-transfer-container {
        background: #f8f9fa;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .amount-form-container {
        padding: 30px;
      }

      .account-info-card,
      .transfer-input-card,
      .quick-amount-card {
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
      }

      .account-details {
        margin-top: 15px;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }

      .detail-item:last-child {
        border-bottom: none;
      }

      .detail-label {
        color: #666;
      }

      .detail-value {
        font-weight: 600;
        color: #333;
      }

      .amount-form-group label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 500;
      }

      .amount-input-wrapper {
        position: relative;
      }

      .amount-input-wrapper i,
      .currency-symbol {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
      }

      .currency-symbol {
        font-size: 18px;
        font-weight: 600;
      }

      .amount-input {
        width: 100%;
        padding: 12px 15px 12px 45px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s;
      }

      .amount-input:focus {
        border-color: #e2146c;
        outline: none;
        box-shadow: 0 0 0 4px rgba(226, 20, 108, 0.1);
      }

      .amount-limits {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 14px;
        color: #666;
      }

      .amount-select {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s;
        background: white;
      }

      .amount-select:focus {
        border-color: #e2146c;
        outline: none;
        box-shadow: 0 0 0 4px rgba(226, 20, 108, 0.1);
      }

      .quick-amount-options {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 15px;
      }

      .quick-amount-btn {
        padding: 12px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        background: white;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        cursor: pointer;
        transition: all 0.3s;
      }

      .quick-amount-btn:hover {
        border-color: #e2146c;
        color: #e2146c;
      }

      .quick-amount-btn.selected {
        background: #e2146c;
        color: white;
        border-color: #e2146c;
      }

      .continue-transfer-btn {
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;
      }

      .continue-transfer-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .transfer-footer-modern {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #f9f9f9;
        border-top: 1px solid #eee;
      }

      .security-notice {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #666;
      }

      .support-link {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        text-decoration: none;
      }

      .support-link:hover {
        color: #e2146c;
      }

      /* OTP Verification Styles */
      .modern-otp-container {
        background: #f8f9fa;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .otp-form-modern {
        padding: 30px;
        background: white;
      }

      .otp-sent-info {
        text-align: center;
        margin-bottom: 30px;
      }

      .otp-sent-info i {
        font-size: 40px;
        color: #27ae60;
        margin-bottom: 15px;
      }

      .otp-sent-info h3 {
        font-size: 22px;
        color: #333;
        margin-bottom: 10px;
      }

      .otp-sent-info p {
        color: #666;
        margin-bottom: 5px;
      }

      .phone-number {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .otp-input-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 30px 0;
      }

      .otp-digit {
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 24px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        transition: all 0.3s;
      }

      .otp-digit:focus {
        border-color: #e2146c;
        outline: none;
        box-shadow: 0 0 0 4px rgba(226, 20, 108, 0.1);
      }

      .otp-digit.focused {
        border-color: #e2146c;
        background: #fff5f8;
      }

      .otp-timer {
        text-align: center;
        margin-bottom: 20px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .otp-timer i {
        color: #e2146c;
      }

      .otp-actions {
        display: flex;
        gap: 15px;
        margin-bottom: 30px;
      }

      .resend-otp-btn {
        flex: 1;
        padding: 14px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        background: white;
        color: #666;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
      }

      .resend-otp-btn:not(:disabled):hover {
        border-color: #e2146c;
        color: #e2146c;
      }

      .resend-otp-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .verify-otp-btn-modern {
        flex: 1;
        padding: 14px;
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
      }

      .verify-otp-btn-modern:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .transaction-summary {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
      }

      .transaction-summary h4 {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
      }

      .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }

      .summary-item:last-child {
        border-bottom: none;
      }

      .summary-item span:first-child {
        color: #666;
      }

      .summary-item span:last-child {
        font-weight: 600;
        color: #333;
      }

      .otp-security-info {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px;
        background: #fff5f5;
        border-top: 1px solid #ffdddd;
        color: #cc0000;
      }

      /* Success Page Styles */
      .modern-success-container {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 40px 30px;
        text-align: center;
      }

      .success-animation {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 30px;
      }

      .checkmark-circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 5px solid #27ae60;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        position: relative;
        z-index: 2;
        animation: scaleIn 0.5s ease;
      }

      .checkmark-circle i {
        font-size: 50px;
        color: #27ae60;
        animation: checkmark 0.5s ease 0.3s forwards;
        opacity: 0;
      }

      .success-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #27ae60;
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 1.5s ease-out infinite;
      }

      .success-ripple.delay {
        animation-delay: 0.5s;
      }

      @keyframes scaleIn {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }

      @keyframes checkmark {
        0% { opacity: 0; transform: scale(0); }
        100% { opacity: 1; transform: scale(1); }
      }

      @keyframes ripple {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.3; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
      }

      .success-message h2 {
        font-size: 28px;
        color: #333;
        margin-bottom: 15px;
      }

      .amount-transferred {
        font-size: 36px;
        font-weight: 700;
        color: #27ae60;
        margin-bottom: 10px;
      }

      .transaction-details-card {
        background: #f9f9f9;
        border-radius: 12px;
        padding: 25px;
        margin: 30px 0;
        text-align: left;
      }

      .details-grid {
        margin-top: 15px;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-row span:first-child {
        color: #666;
      }

      .detail-row span:last-child {
        font-weight: 600;
        color: #333;
      }

      .status-success {
        color: #27ae60;
        font-weight: 600;
      }

      .success-actions {
        display: flex;
        gap: 15px;
        margin: 30px 0;
      }

      .action-btn {
        flex: 1;
        padding: 14px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
      }

      .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .additional-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 30px 0;
      }

      .option-btn {
        padding: 14px;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        background: white;
        color: #333;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
      }

      .option-btn:hover {
        background: #f9f9f9;
        border-color: #e2146c;
        color: #e2146c;
      }

      .success-footer {
        margin-top: 30px;
        color: #666;
        font-size: 14px;
      }

      /* Enhanced Loading Styles */
      .enhanced-loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
      }

      .enhanced-loading-container {
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .loading-spinner-modern {
        width: 60px;
        height: 60px;
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        position: relative;
        margin: 0 auto 20px;
        animation: spin 1s linear infinite;
      }

      .spinner-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        animation: dot-spin 1.5s ease-in-out infinite;
      }

      .spinner-dot:nth-child(1) { top: 0; left: 50%; margin-left: -5px; }
      .spinner-dot:nth-child(2) { right: 0; top: 50%; margin-top: -5px; animation-delay: 0.3s; }
      .spinner-dot:nth-child(3) { bottom: 0; left: 50%; margin-left: -5px; animation-delay: 0.6s; }
      .spinner-dot:nth-child(4) { left: 0; top: 50%; margin-top: -5px; animation-delay: 0.9s; }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes dot-spin {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.5); }
      }

      .loading-text {
        font-size: 18px;
        color: #333;
        margin-bottom: 15px;
      }

      .loading-progress {
        width: 200px;
        height: 4px;
        background: #f3f3f3;
        border-radius: 4px;
        overflow: hidden;
        margin: 0 auto;
      }

      .progress-bar {
        width: 30%;
        height: 100%;
        border-radius: 4px;
        animation: progress 2s linear infinite;
      }

      @keyframes progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }

      /* Responsive Styles */
      @media (max-width: 768px) {
        .modern-form-container {
          grid-template-columns: 1fr;
        }

        .features-grid,
        .islamic-feature-grid {
          grid-template-columns: 1fr;
        }

        .quick-amount-options {
          grid-template-columns: repeat(2, 1fr);
        }

        .otp-digit {
          width: 45px;
          height: 45px;
          font-size: 20px;
        }

        .success-actions {
          flex-direction: column;
        }

        .amount-transferred {
          font-size: 28px;
        }
      }

      @media (max-width: 480px) {
        .professional-transfer-container,
        .modern-success-container {
          border-radius: 0;
        }

        .otp-input-group {
          gap: 5px;
        }

        .otp-digit {
          width: 40px;
          height: 40px;
        }

        .quick-amount-options {
          grid-template-columns: 1fr;
        }

        .success-animation {
          width: 100px;
          height: 100px;
        }

        .checkmark-circle i {
          font-size: 40px;
        }
      }

      /* Bank Item Enhanced Styles */
      .bank-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .bank-logo-container {
        width: 50px;
        height: 50px;
        background: #f9f9f9;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
      }

      .bank-logo-img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }

      .bank-info {
        flex: 1;
      }

      .bank-features {
        display: flex;
        gap: 8px;
        margin-top: 5px;
        flex-wrap: wrap;
      }

      .transfer-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
      }

      .transfer-limit {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: #666;
      }

      .transfer-limit i {
        font-size: 12px;
      }

      /* Error Feedback Styles */
      .input-error {
        border-color: #e74c3c !important;
      }

      .error-feedback {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        display: block;
      }

      .input-wrapper.error .input-icon {
        color: #e74c3c;
      }

      /* Animation Styles */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .fade-in {
        animation: fadeIn 0.3s ease forwards;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize professional styles
  addProfessionalStyles();

  // Add Back Button
  function addBackButton(container, targetSection) {
    const existingBackButton = container.querySelector(".back-button");
    if (existingBackButton) {
      existingBackButton.remove();
    }

    const backButton = document.createElement("div");
    backButton.className = "back-button";
    backButton.innerHTML = `
      <div class="back-button-inner">
        <i class="fas fa-arrow-left"></i>
        <span>Back</span>
      </div>
    `;

    container.insertBefore(backButton, container.firstChild);

    backButton.addEventListener("click", function () {
      showSection(targetSection);
      currentSection = targetSection;
      previousSection = container;
    });
  }

  // Helper function to convert hex to RGB
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  // Generate Transaction ID
  function generateTransactionId() {
    if (typeof window.generateTransactionId === "function") {
      return window.generateTransactionId();
    }
    const now = new Date();
    const datePart = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `TXN-${datePart}-${randomPart}`;
  }

  // Generate Random Captcha
  function generateRandomCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Hide Loading
  function hideLoading() {
    const loadingOverlay = document.querySelector(".enhanced-loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.remove();
    }
  }

  // Show Notification
  function showNotification(message) {
    if (typeof window.showNotification === "function") {
      window.showNotification(message);
      return;
    }

    let notification = document.getElementById("notificationToast");
    if (!notification) {
      notification = document.createElement("div");
      notification.id = "notificationToast";
      notification.className = "notification-toast";
      document.body.appendChild(notification);

      const style = document.createElement("style");
      style.textContent = `
        .notification-toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: white;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 16px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .notification-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(-20px);
        }
      `;
      document.head.appendChild(style);
    }

    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
}
