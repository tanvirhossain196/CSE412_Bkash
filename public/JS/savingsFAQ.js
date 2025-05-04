document.addEventListener("DOMContentLoaded", function () {
  // Find the specific savings option for FAQ
  const faqOption = Array.from(
    document.querySelectorAll(".savings-option")
  ).find((option) =>
    option
      .querySelector(".option-text p")
      .textContent.includes("সতর্কবলি ও সাধারণ জিজ্ঞাসা")
  );

  if (faqOption) {
    // Replace existing event listener
    faqOption.replaceWith(faqOption.cloneNode(true));
    const newFaqOption = Array.from(
      document.querySelectorAll(".savings-option")
    ).find((option) =>
      option
        .querySelector(".option-text p")
        .textContent.includes("সতর্কবলি ও সাধারণ জিজ্ঞাসা")
    );

    newFaqOption.addEventListener("click", function () {
      showFaqPopup();
    });
  }

  // Function to show FAQ popup
  function showFaqPopup() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.style.zIndex = "1000";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "savings-popup";
    popup.style.height = "90vh";
    popup.style.overflowY = "auto";
    popup.innerHTML = `
      <div class="popup-header">
        <div class="header-content">
          <div class="back-button">
            <button class="back-button-btn"><i class="fas fa-arrow-left"></i></button>
          </div>
          <div class="header-title centered-title">
            <h3>সতর্কবলি ও সাধারণ জিজ্ঞাসা</h3>
          </div>
          <div class="header-icon">
            <img src="images/bkashlogo.png" alt="বিকাশ আইকন">
          </div>
        </div>
      </div>

      <div class="popup-body" style="padding: 0;">
        <div class="faq-container">
          ${getFaqItems()}
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    // Back button functionality
    const backButton = popup.querySelector(".back-button-btn");
    backButton.addEventListener("click", function () {
      closePopup(overlay, popup);
    });

    // FAQ accordion functionality
    const faqQuestions = popup.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentElement;
        const faqAnswer = faqItem.querySelector(".faq-answer");
        const icon = this.querySelector("i");

        // Close all other FAQs
        faqQuestions.forEach((otherQuestion) => {
          if (otherQuestion !== question) {
            const otherItem = otherQuestion.parentElement;
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherQuestion.querySelector("i");
            otherAnswer.style.display = "none";
            otherItem.classList.remove("active");
            otherIcon.classList.remove("fa-chevron-up");
            otherIcon.classList.add("fa-chevron-down");
          }
        });

        // Toggle current FAQ
        if (faqAnswer.style.display === "block") {
          faqAnswer.style.display = "none";
          faqItem.classList.remove("active");
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        } else {
          faqAnswer.style.display = "block";
          faqItem.classList.add("active");
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        }
      });
    });
  }

  // Function to generate FAQ items
  function getFaqItems() {
    const faqs = [
      {
        question: "বিকাশ-এর মাধ্যমে কারা ডিপিএস খুলতে পারবেন?",
        answer:
          "যেসকল বিকাশ গ্রাহক জাতীয় পরিচয়পত্র ব্যবহার করে বিকাশ অ্যাপ অথবা এজেন্ট পয়েন্ট অথবা গ্রাহক সেবা থেকে বিকাশ একাউন্ট ডিজিটাল রেজিস্ট্রেশন করেছেন বা বিকাশ অ্যাপের মাধ্যমে তথ্য হালনাগাদ করেছেন, তারা বিকাশ অ্যাপের মাধ্যমে ডিপিএস খুলতে পারবেন।",
      },
      {
        question: "কীভাবে একটি ডিপিএস খুলবেন?",
        answer:
          "বিকাশ অ্যাপে লগ ইন করে 'সেভিংস' অপশনে যেতে হবে। এরপর 'নতুন সেভিংস খুলুন' বাটনে ক্লিক করে ডিপিএস বা ইসলামিক ডিপিএস বেছে নিন। তারপর ধরন (সাপ্তাহিক/মাসিক), মেয়াদ এবং জমার পরিমাণ সিলেক্ট করে ব্যাংক বাছাই করুন। সবশেষে পিন দিয়ে কনফার্ম করলেই ডিপিএস খোলা হয়ে যাবে।",
      },
      {
        question:
          "২৪ ঘন্টা অতিবাহিত হয়েছে, আমি একটি ডিপিএস খোলার জন্য রিকোয়েস্ট করেছি, কিন্তু আমি এখনও কোনো নোটিফিকেশন পাইনি।",
        answer:
          "সাধারণত ২৪ ঘন্টার মধ্যে ডিপিএস খোলার কনফার্মেশন পাওয়া যায়। তবে কোনো কারিগরি সমস্যার জন্য যদি দেরি হয়, তাহলে দয়া করে বিকাশ হটলাইন ১৬২৪৭ এ যোগাযোগ করুন অথবা আপনার নিকটস্থ বিকাশ এজেন্ট পয়েন্টে যোগাযোগ করুন।",
      },
      {
        question: "আমি কি আমার বিকাশ অ্যাপের মাধ্যমে একাধিক ডিপিএস খুলতে পারি?",
        answer:
          "হ্যাঁ, আপনি বিকাশ অ্যাপের মাধ্যমে একাধিক ডিপিএস খুলতে পারবেন। বিভিন্ন ব্যাংকে বা একই ব্যাংকে ভিন্ন ভিন্ন মেয়াদ ও পরিমাণের একাধিক ডিপিএস খোলা যাবে।",
      },
      {
        question:
          "আমার ডিপিএসে আমি কত টাকা জমা করতে পারব তার কি কোনো লিমিট আছে?",
        answer:
          "হ্যাঁ, ডিপিএসে জমার লিমিট আছে। সাপ্তাহিক ডিপিএসের জন্য ন্যূনতম ৩০০ টাকা এবং সর্বোচ্চ ১০,০০০ টাকা জমা দেওয়া যাবে। মাসিক ডিপিএসের জন্য ন্যূনতম ৫০০ টাকা এবং সর্বোচ্চ ২০,০০০ টাকা জমা দেওয়া যাবে। এছাড়া প্রতিটি ব্যাংকের নিজস্ব লিমিট থাকতে পারে।",
      },
      {
        question: "আমি কি আমার অটো জমার তারিখ বেছে নিতে পারি?",
        answer:
          "হ্যাঁ, আপনি ডিপিএস খোলার সময় অটো জমার তারিখ বেছে নিতে পারবেন। মাসিক ডিপিএসের জন্য মাসের যেকোনো তারিখ এবং সাপ্তাহিক ডিপিএসের জন্য সপ্তাহের যেকোনো দিন নির্ধারণ করা যাবে। তবে নির্দিষ্ট তারিখের পরিবর্তন পরবর্তীতে করা যাবে না।",
      },
      {
        question: "আমি কীভাবে জমার পরিমাণ পরিশোধ করবো?",
        answer:
          "আপনার বিকাশ অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স থাকলে নির্ধারিত তারিখে স্বয়ংক্রিয়ভাবে ডিপিএসের কিস্তি কেটে নেওয়া হবে। আপনাকে আলাদা করে কিছু করতে হবে না। তবে নির্ধারিত তারিখে অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স রাখতে হবে।",
      },
      {
        question: "বিকাশ কখন অটো টাকা কেটে নেবে?",
        answer:
          "অটো ডেবিট বা কিস্তি কাটার তারিখ আপনি ডিপিএস খোলার সময় যে তারিখ নির্ধারণ করবেন, সেই তারিখেই বিকাশ স্বয়ংক্রিয়ভাবে টাকা কেটে নেবে। সাধারণত সকাল ১০টা থেকে রাত ৮টার মধ্যে অটো ডেবিট প্রক্রিয়া সম্পন্ন হয়।",
      },
      {
        question:
          "যদি আমি নির্ধারিত তারিখে জমার পরিমাণ রাখতে ভুলে যাই, তখন কী হবে?",
        answer:
          "নির্ধারিত তারিখে পর্যাপ্ত ব্যালেন্স না থাকলে, সিস্টেম পরবর্তী ৩ দিন পর্যন্ত অটো ডেবিটের চেষ্টা করবে। এই সময়ের মধ্যে অ্যাকাউন্টে টাকা জমা দিলে কিস্তি কেটে নেওয়া হবে। ৩ দিন পরেও টাকা না থাকলে, সেই মাসের/সপ্তাহের কিস্তি মিস হবে এবং ব্যাংকের নিয়ম অনুযায়ী জরিমানা প্রযোজ্য হতে পারে।",
      },
      {
        question: "আমি কি মিস হওয়া জমা পরিশোধ করতে পারবো?",
        answer:
          "হ্যাঁ, মিস হওয়া কিস্তি পরিশোধ করা যাবে। তবে এজন্য ব্যাংকের নিয়ম অনুযায়ী লেট ফি বা জরিমানা প্রযোজ্য হতে পারে। মিস হওয়া কিস্তি জমা দিতে আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স রাখুন এবং পরবর্তী অটো ডেবিটের তারিখে স্বয়ংক্রিয়ভাবে কেটে নেওয়া হবে।",
      },
      {
        question: "আমি কখন মিস হওয়া জমা পরিশোধ করতে পারি?",
        answer:
          "মিস হওয়া কিস্তি পরবর্তী যেকোনো সময় পরিশোধ করা যাবে। তবে পরবর্তী কিস্তির তারিখের আগেই পরিশোধ করা উত্তম। বিলম্বিত পরিশোধের জন্য ব্যাংকের নিয়ম অনুযায়ী জরিমানা প্রযোজ্য হবে। সুতরাং যত তাড়াতাড়ি সম্ভব পরিশোধ করুন।",
      },
      {
        question:
          "যদি আমি মিস হওয়া জমা পরিশোধ করি তাহলে আমার মুনাফা কীভাবে হিসাব করা হবে?",
        answer:
          "মিস হওয়া কিস্তি পরিশোধ করলে, ব্যাংকের নিয়ম অনুযায়ী মুনাফা হিসাব করা হবে। সাধারণত যে তারিখে কিস্তি জমা হবে, সেই তারিখ থেকে মুনাফা গণনা শুরু হবে। তবে বিলম্বিত জমার জন্য মুনাফার হার কম হতে পারে বা জরিমানা কেটে নেওয়া হতে পারে।",
      },
      {
        question: "একটি ডিপিএস খোলার জন্য প্রযোজনীয় তথ্য কী?",
        answer:
          "ডিপিএস খুলতে আপনার প্রয়োজন হবে: ১) বৈধ জাতীয় পরিচয়পত্র, ২) বিকাশ অ্যাকাউন্ট যা NID দিয়ে রেজিস্টার্ড, ৩) কিস্তির পরিমাণ, ৪) মেয়াদকাল, ৫) কিস্তির ধরন (সাপ্তাহিক/মাসিক), ৬) নমিনির তথ্য (ঐচ্ছিক)।",
      },
      {
        question: "আমি কি 'মোট প্রদান' হিসেবে উল্লেখ করা পরিমাণটিই পাবো?",
        answer:
          "না, 'মোট প্রদান' বলতে আপনি যে পরিমাণ টাকা ডিপিএসে জমা দিবেন তার মোট পরিমাণ বোঝায়। আপনি মেয়াদ শেষে পাবেন 'মোট প্রদান' এর সাথে মুনাফা যোগ করে। মুনাফার পরিমাণ নির্ভর করবে ব্যাংকের মুনাফার হার এবং আপনার ডিপিএসের মেয়াদের উপর।",
      },
      {
        question: "আমি কীভাবে আমার টিন তথ্য প্রদান করব?",
        answer:
          "বিকাশ অ্যাপে ডিপিএস খোলার সময় যদি টিন তথ্য প্রয়োজন হয়, তাহলে একটি ফর্ম আসবে। সেখানে আপনার ১২ ডিজিটের টিন নম্বর প্রদান করতে হবে। যদি আপনার টিন না থাকে, তাহলে 'টিন নেই' অপশন সিলেক্ট করতে পারেন। তবে কিছু ব্যাংক টিন ছাড়া ডিপিএস খুলতে নাও দিতে পারে।",
      },
      {
        question: "আমি কীভাবে আমার স্টেটমেন্ট ডাউনলোড করব?",
        answer:
          "বিকাশ অ্যাপে লগ ইন করে 'সেভিংস' অপশনে যান। আপনার ডিপিএস অ্যাকাউন্ট সিলেক্ট করুন। 'স্টেটমেন্ট' অপশনে ক্লিক করুন। তারিখ রেঞ্জ সিলেক্ট করে 'ডাউনলোড' বাটনে ক্লিক করলে পিডিএফ ফরম্যাটে স্টেটমেন্ট ডাউনলোড হবে।",
      },
      {
        question: "আমি কীভাবে আমার রিটার্নের প্রমাণ জমা দেব?",
        answer:
          "রিটার্নের প্রমাণ জমা দিতে বিকাশ অ্যাপে 'সেভিংস' এ যান। 'রিটার্ন ও আয়কর সনদ' অপশনে ক্লিক করুন। আপনার ই-টিন নম্বর দিন এবং প্রয়োজনীয় তথ্য পূরণ করে সাবমিট করুন। সফলভাবে জমা হলে একটি কনফার্মেশন মেসেজ পাবেন।",
      },
      {
        question:
          "আমার ডিপিএস ব্যাতিল করে অগ্রীম টাকা তোলার রিকোয়েস্ট কি করতে পারবো?",
        answer:
          "হ্যাঁ, আপনি মেয়াদপূর্তির আগেই ডিপিএস বাতিল করতে পারবেন। এজন্য বিকাশ অ্যাপের মাধ্যমে রিকোয়েস্ট করতে হবে। তবে মেয়াদপূর্তির আগে বাতিল করলে ব্যাংকের নিয়ম অনুযায়ী মুনাফার হার কম হবে এবং কিছু চার্জ কেটে নেওয়া হতে পারে।",
      },
    ];

    return faqs
      .map(
        (faq) => `
      <div class="faq-item">
        <div class="faq-question">
          <span>${faq.question}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer" style="display: none;">
          <p>${faq.answer}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Close popup function
  function closePopup(overlay, popup) {
    if (overlay && overlay.parentNode) {
      overlay.style.animation = "quickFade 0.15s ease-out reverse";
      setTimeout(() => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
        }
      }, 150);
    }
    if (popup && popup.parentNode) {
      popup.style.animation = "quickSlide 0.15s ease-out reverse";
      setTimeout(() => {
        if (popup.parentNode) {
          document.body.removeChild(popup);
        }
      }, 150);
    }
  }
});

// Add necessary CSS styles
const faqStyles = document.createElement("style");
faqStyles.textContent = `
  .faq-container {
    padding: 10px 0;
  }

  .faq-item {
    background-color: white;
    margin: 8px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .faq-item.active {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .faq-question {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }

  .faq-question:hover {
    background-color: #f9f9f9;
  }

  .faq-question i {
    color: #999;
    transition: transform 0.3s ease;
    font-size: 14px;
    flex-shrink: 0;
    margin-left: 10px;
  }

  .faq-question i.fa-chevron-up {
    transform: rotate(180deg);
  }

  .faq-answer {
    padding: 0 20px;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
    max-height: 0;
    overflow: hidden;
  }

  .faq-answer[style*="display: block"] {
    padding: 20px;
    max-height: 1000px;
  }

  .faq-answer p {
    font-size: 15px;
    line-height: 1.8;
    color: #555;
    margin: 0;
  }

  /* Professional Back Button Styles */
  .back-button-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }

  .back-button-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .back-button-btn:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.15);
  }

  .back-button-btn i {
    font-size: 18px;
    transition: transform 0.3s ease;
  }

  .back-button-btn:hover i {
    transform: translateX(-2px);
  }

  /* Update popup styles for FAQ */
  .savings-popup {
    max-height: 90vh !important;
    overflow-y: auto !important;
  }

  .popup-body::-webkit-scrollbar {
    width: 5px;
  }

  .popup-body::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .popup-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  .popup-body::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
document.head.appendChild(faqStyles);
