// Loan Application JavaScript
let currentStep = 1;
let loanData = {};

// Show loan modal
function showLoanModal() {
  const modal = document.getElementById("loanModal");
  modal.style.display = "flex";

  // Make sure background isn't blurred
  modal.style.backdropFilter = "none";
  modal.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background

  // Reset to first step
  currentStep = 1;
  showStep(currentStep);
  updateStepIndicator();

  // Do NOT change the navbar/header styles
}

// Close loan modal
function closeLoanModal() {
  const modal = document.getElementById("loanModal");
  modal.style.display = "none";
  resetForm();
}

// Reset form
function resetForm() {
  document.querySelectorAll("form").forEach((form) => form.reset());
  loanData = {};
  currentStep = 1;
  showStep(currentStep);
  updateStepIndicator();
}

// Show specific step
function showStep(step) {
  // Hide all steps
  document.querySelectorAll(".step-content").forEach((el) => {
    el.classList.remove("active");
  });

  // Show current step
  document.getElementById(`step${step}`).classList.add("active");

  // Update modal title
  const modalTitle = document.querySelector(".modal-title");
  const stepTitles = {
    1: "ব্যক্তিগত তথ্য",
    2: "লোনের তথ্য",
    3: "চাকরির তথ্য",
    4: "পিন নম্বর",
    5: "আবেদন সফল",
  };
  modalTitle.textContent = stepTitles[step];
}

// Update step indicator
function updateStepIndicator() {
  const dots = document.querySelectorAll(".step-dot");
  dots.forEach((dot, index) => {
    if (index + 1 < currentStep) {
      dot.classList.add("completed");
      dot.classList.remove("active");
    } else if (index + 1 === currentStep) {
      dot.classList.add("active");
      dot.classList.remove("completed");
    } else {
      dot.classList.remove("active", "completed");
    }
  });
}

// Go to specific step
function goToStep(step) {
  if (validateCurrentStep()) {
    currentStep = step;
    showStep(step);
    updateStepIndicator();
  }
}

// Go back to previous step
function goBack() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepIndicator();
  } else {
    // If on first step, close the modal
    closeLoanModal();
  }
}

// Validate current step
function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      return validateBasicInfo();
    case 2:
      return validateLoanDetails();
    case 3:
      return validateEmploymentInfo();
    case 4:
      return validatePin();
    default:
      return true;
  }
}

// Validate basic information
function validateBasicInfo() {
  const fullName = document.getElementById("fullName").value.trim();
  const mobileNumber = document.getElementById("mobileNumber").value.trim();
  const nidNumber = document.getElementById("nidNumber").value.trim();

  if (!fullName) {
    alert("দয়া করে আপনার নাম লিখুন");
    return false;
  }

  // Updated mobile number validation for 11 digits and specific prefixes
  if (!mobileNumber.match(/^01[3-9]\d{8}$/)) {
    alert("দয়া করে সঠিক মোবাইল নম্বর লিখুন (১১ ডিজিট)");
    return false;
  }

  // Updated NID validation for 13 digits
  if (!nidNumber || nidNumber.length !== 13) {
    alert("দয়া করে সঠিক NID নম্বর লিখুন (১৩ ডিজিট)");
    return false;
  }

  loanData.fullName = fullName;
  loanData.mobileNumber = mobileNumber;
  loanData.nidNumber = nidNumber;
  return true;
}

// Validate loan details
function validateLoanDetails() {
  const loanAmount = parseInt(document.getElementById("loanAmount").value);
  const loanDuration = document.getElementById("loanDuration").value;

  if (!loanAmount || loanAmount < 1000 || loanAmount > 50000) {
    alert("লোনের পরিমাণ ১,০০০ থেকে ৫০,০০০ টাকার মধ্যে হতে হবে");
    return false;
  }

  loanData.loanAmount = loanAmount;
  loanData.loanDuration = loanDuration;
  return true;
}

// Validate employment information
function validateEmploymentInfo() {
  const occupation = document.getElementById("occupation").value;
  const monthlyIncome = parseInt(
    document.getElementById("monthlyIncome").value
  );
  const companyName = document.getElementById("companyName").value.trim();

  if (!occupation) {
    alert("দয়া করে আপনার পেশা নির্বাচন করুন");
    return false;
  }

  if (!monthlyIncome || monthlyIncome < 5000) {
    alert("মাসিক আয় কমপক্ষে ৫,০০০ টাকা হতে হবে");
    return false;
  }

  if (!companyName) {
    alert("দয়া করে প্রতিষ্ঠানের নাম লিখুন");
    return false;
  }

  loanData.occupation = occupation;
  loanData.monthlyIncome = monthlyIncome;
  loanData.companyName = companyName;
  return true;
}

// Validate PIN
function validatePin() {
  const pinDigits = document.querySelectorAll(".pin-digit");
  let pin = "";

  pinDigits.forEach((digit) => {
    pin += digit.value;
  });

  if (pin.length !== 5) {
    alert("দয়া করে ৫ সংখ্যার পিন প্রদান করুন");
    return false;
  }

  loanData.pin = pin;
  return true;
}

// Move focus in PIN input
function moveFocus(current, event) {
  const pinDigits = document.querySelectorAll(".pin-digit");
  const currentIndex = Array.from(pinDigits).indexOf(current);

  if (event.key === "Backspace" && currentIndex > 0 && !current.value) {
    pinDigits[currentIndex - 1].focus();
  } else if (current.value && currentIndex < pinDigits.length - 1) {
    pinDigits[currentIndex + 1].focus();
  }
}

// Calculate loan details
function calculateLoan() {
  const loanAmount = parseInt(document.getElementById("loanAmount").value) || 0;
  const duration = parseInt(document.getElementById("loanDuration").value) || 3;

  const serviceCharge = loanAmount * 0.1; // 10% service charge
  const totalPayment = loanAmount + serviceCharge;
  const monthlyInstallment = totalPayment / duration;

  document.getElementById(
    "monthlyInstallment"
  ).textContent = `৳${monthlyInstallment.toFixed(2)}`;
  document.getElementById(
    "serviceCharge"
  ).textContent = `৳${serviceCharge.toFixed(2)}`;
  document.getElementById(
    "totalPayment"
  ).textContent = `৳${totalPayment.toFixed(2)}`;
}

// Submit loan application
function submitLoanApplication() {
  if (validatePin()) {
    // Generate reference number
    const reference = "BKL" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString("bn-BD");

    // Update success details
    document.getElementById("loanReference").textContent = reference;
    document.getElementById(
      "confirmedAmount"
    ).textContent = `৳${loanData.loanAmount}`;
    document.getElementById("confirmedInstallment").textContent =
      document.getElementById("monthlyInstallment").textContent;
    document.getElementById("dateApproved").textContent = date;

    loanData.reference = reference;
    loanData.date = date;

    // Show success message
    currentStep = 5;
    showStep(5);
    updateStepIndicator();
  }
}

// Download receipt
function downloadReceipt() {
  const receiptContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <title>বিকাশ লোন রসিদ - ${loanData.reference}</title>
    <style>
        body { 
            font-family: 'Hind Siliguri', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .receipt { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            padding: 30px; 
            border-radius: 15px; 
            box-shadow: 0 0 20px rgba(0,0,0,0.1); 
            position: relative;
            overflow: hidden;
        }
        .receipt::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #1c2e58; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .logo { 
            width: 120px; 
            margin-bottom: 15px; 
        }
        .title { 
            color: #1c2e58; 
            font-size: 28px; 
            margin: 15px 0; 
            font-weight: 700;
        }
        .info-row { 
            display: flex; 
            justify-content: space-between; 
            margin: 12px 0; 
            padding: 15px; 
            background: #f9f9f9; 
            border-radius: 8px; 
            transition: transform 0.2s;
        }
        .info-row:hover {
            transform: translateX(5px);
        }
        .label { 
            font-weight: 600; 
            color: #666; 
        }
        .value { 
            color: #333; 
            font-weight: 600;
        }
        .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #eee; 
            color: #666; 
            font-size: 14px; 
        }
        .success-icon { 
            color: #4CAF50; 
            font-size: 50px; 
            margin-bottom: 15px; 
        }
        .status-badge {
            background: #4CAF50;
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 20px;
        }
        .qr-code {
            width: 100px;
            height: 100px;
            margin: 20px auto;
            background: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3crect width='100' height='100' fill='%23f0f0f0'/%3e%3cpath d='M10 10h20v20H10zm60 0h20v20H70zm0 60h20v20H70zM10 70h20v20H10zm30-60h10v10H40zm0 20h10v10H40zm20 0h10v10H60zm-20 20h10v10H40zm20 0h10v10H60zm-20 20h10v10H40zm20 0h10v10H60zM20 40h10v10H20zm40 0h10v10H60zM20 60h10v10H20z' fill='%23333'/%3e%3c/svg%3e");
            background-size: cover;
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            color: rgba(226, 20, 108, 0.05);
            font-weight: bold;
            pointer-events: none;
            z-index: 0;
        }
        .content-wrapper {
            position: relative;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="watermark">bKash</div>
        <div class="content-wrapper">
            <div class="header">
                <img src="data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='120' height='50' viewBox='0 0 120 50'%3e%3crect width='120' height='50' fill='%23e2146c' rx='8'/%3e%3ctext x='60' y='30' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold' font-size='20'%3ebKash%3c/text%3e%3c/svg%3e" alt="bKash Logo" class="logo">
                <h1 class="title">লোন রসিদ</h1>
                <div class="success-icon">✓</div>
                <div class="status-badge">অনুমোদিত</div>
                <p>আপনার লোন আবেদন সফলভাবে গৃহীত হয়েছে</p>
            </div>
            
            <div class="info-row">
                <span class="label">রেফারেন্স নম্বর:</span>
                <span class="value">${loanData.reference}</span>
            </div>
            
            <div class="info-row">
                <span class="label">আবেদনকারীর নাম:</span>
                <span class="value">${loanData.fullName}</span>
            </div>
            
            <div class="info-row">
                <span class="label">মোবাইল নম্বর:</span>
                <span class="value">${loanData.mobileNumber}</span>
            </div>
            
            <div class="info-row">
                <span class="label">NID নম্বর:</span>
                <span class="value">${loanData.nidNumber}</span>
            </div>
            
            <div class="info-row">
                <span class="label">পেশা:</span>
                <span class="value">${
                  loanData.occupation === "salaried"
                    ? "চাকরিজীবী"
                    : loanData.occupation === "business"
                    ? "ব্যবসায়ী"
                    : loanData.occupation === "freelancer"
                    ? "ফ্রিল্যান্সার"
                    : "অন্যান্য"
                }</span>
            </div>
            
            <div class="info-row">
                <span class="label">প্রতিষ্ঠানের নাম:</span>
                <span class="value">${loanData.companyName}</span>
            </div>
            
            <div class="info-row">
                <span class="label">মাসিক আয়:</span>
                <span class="value">৳${loanData.monthlyIncome}</span>
            </div>
            
            <div class="info-row">
                <span class="label">লোনের পরিমাণ:</span>
                <span class="value">৳${loanData.loanAmount}</span>
            </div>
            
            <div class="info-row">
                <span class="label">লোনের মেয়াদ:</span>
                <span class="value">${loanData.loanDuration} মাস</span>
            </div>
            
            <div class="info-row">
                <span class="label">মাসিক কিস্তি:</span>
                <span class="value">${
                  document.getElementById("confirmedInstallment").textContent
                }</span>
            </div>
            
            <div class="info-row">
                <span class="label">প্রাপ্তির তারিখ:</span>
                <span class="value">${loanData.date}</span>
            </div>
            
            <div class="qr-code"></div>
            
            <div class="footer">
                <p>এই রসিদটি আপনার লোন আবেদনের প্রমাণপত্র হিসেবে রাখুন</p>
                <p>হেল্পলাইন: 16247 | ইমেইল: support@bkash.com</p>
                <p>© ${new Date().getFullYear()} বিকাশ লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

  const blob = new Blob([receiptContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bKash_Loan_Receipt_${loanData.reference}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Make back button work from anywhere
document.addEventListener("DOMContentLoaded", function () {
  // Modal back button
  const modalBackButton = document.querySelector(".modal-back-button");
  if (modalBackButton) {
    modalBackButton.addEventListener("click", function () {
      goBack();
    });
  }
});

// Initialize and setup when window loads
window.addEventListener("load", function () {
  // Add CSS for modal styling
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Modal Styles - Updated */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      justify-content: center;
      align-items: flex-start;
      backdrop-filter: none; /* Removed blur effect */
      transition: opacity 0.2s ease-out;
      padding-top: 70px; /* Add space at top for header */
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      animation: modalSlide 0.2s ease-out;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    /* Adjust modal animation */
    @keyframes modalSlide {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* Fixed Header Styling in modal only */
    .modal-header {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
       background: linear-gradient(135deg, #1c2e58 0%, #112555 100%);
      border-radius: 15px 15px 0 0;
      color: white;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* Content area with scroll */
    .step-content {
      max-height: calc(80vh - 120px);
      overflow-y: auto;
      padding: 25px;
    }

    /* Step indicators should also be sticky */
    .step-indicator {
      position: sticky;
      top: 0;
      background: white;
      padding: 15px 0;
      z-index: 5;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    /* Make scrollbar more visible and nicer */
    .step-content::-webkit-scrollbar {
      width: 8px;
    }

    .step-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    .step-content::-webkit-scrollbar-thumb {
      background: #1c2e58;
      border-radius: 10px;
    }

    .step-content::-webkit-scrollbar-thumb:hover {
      background: #1c2e58;
    }
  `;
  document.head.appendChild(styleElement);
});
