// Career Page JavaScript - Fixed for proper modal functionality
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const sidebarClose = document.querySelector(".sidebar-close");

  if (mobileMenuToggle && sidebarMenu && sidebarClose) {
    mobileMenuToggle.addEventListener("click", function () {
      sidebarMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    sidebarClose.addEventListener("click", function () {
      sidebarMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  // Testimonial Slider Functionality
  const testimonialSlider = document.querySelector(".testimonial-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  if (testimonialSlider && prevBtn && nextBtn && testimonialCards.length > 0) {
    const cardWidth = testimonialCards[0].offsetWidth + 30; // Card width + gap
    let currentIndex = 0;
    const maxIndex = testimonialCards.length - 1;

    // Initial setup - show only one testimonial at a time on mobile
    function updateSliderVisibility() {
      const isMobile = window.innerWidth <= 768;

      testimonialCards.forEach((card, index) => {
        if (isMobile) {
          card.style.display = index === currentIndex ? "block" : "none";
        } else {
          card.style.display = "block";
        }
      });
    }

    // Scroll to specific testimonial
    function scrollToTestimonial(index) {
      currentIndex = index;

      if (window.innerWidth <= 768) {
        // On mobile, just show/hide cards
        updateSliderVisibility();
      } else {
        // On desktop, smooth scroll
        testimonialSlider.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    }

    // Event listeners for buttons
    prevBtn.addEventListener("click", () => {
      currentIndex = Math.max(0, currentIndex - 1);
      scrollToTestimonial(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      scrollToTestimonial(currentIndex);
    });

    // Update on window resize
    window.addEventListener("resize", updateSliderVisibility);

    // Initial setup
    updateSliderVisibility();

    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialSlider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      false
    );

    testimonialSlider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      false
    );

    function handleSwipe() {
      if (touchEndX < touchStartX) {
        // Swipe left - go to next
        nextBtn.click();
      } else if (touchEndX > touchStartX) {
        // Swipe right - go to previous
        prevBtn.click();
      }
    }
  }

  // Job Search Functionality
  const searchInput = document.querySelector(".search-bar input");
  const departmentSelect = document.querySelector('select[name="department"]');
  const locationSelect = document.querySelector('select[name="location"]');
  const jobTypeSelect = document.querySelector('select[name="job-type"]');
  const jobCards = document.querySelectorAll(".job-card");
  const searchButton = document.querySelector(".search-bar button");

  if (
    searchInput &&
    departmentSelect &&
    locationSelect &&
    jobTypeSelect &&
    jobCards.length > 0
  ) {
    function filterJobs() {
      const searchTerm = searchInput.value.toLowerCase();
      const department = departmentSelect.value.toLowerCase();
      const location = locationSelect.value.toLowerCase();
      const jobType = jobTypeSelect.value.toLowerCase();

      jobCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const cardDepartment = card
          .querySelector(".job-info span:nth-child(2)")
          .textContent.toLowerCase();
        const cardLocation = card
          .querySelector(".job-info span:nth-child(1)")
          .textContent.toLowerCase();
        const cardJobType = card
          .querySelector(".job-type")
          .textContent.toLowerCase();

        const matchesSearch = searchTerm === "" || title.includes(searchTerm);
        const matchesDepartment =
          department === "" || cardDepartment.includes(department);
        const matchesLocation =
          location === "" || cardLocation.includes(location);
        const matchesJobType = jobType === "" || cardJobType.includes(jobType);

        if (
          matchesSearch &&
          matchesDepartment &&
          matchesLocation &&
          matchesJobType
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    // Event listeners for search and filters
    searchInput.addEventListener("input", filterJobs);
    departmentSelect.addEventListener("change", filterJobs);
    locationSelect.addEventListener("change", filterJobs);
    jobTypeSelect.addEventListener("change", filterJobs);

    // Search button click
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        filterJobs();
      });
    }
  }

  // Load More Jobs Functionality - FIXED
  const loadMoreBtn = document.getElementById("load-more-jobs");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Get job listings container
      const jobListings = document.querySelector(".job-listings");

      // Additional job listings to add
      const newJobs = [
        {
          title: "ক্যাস্টমার সাপোর্ট স্পেশালিস্ট",
          type: "full-time",
          location: "ঢাকা",
          department: "কাস্টমার সার্ভিস",
          posted: "২ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন উৎসাহী কাস্টমার সাপোর্ট স্পেশালিস্ট খুঁজছি যিনি আমাদের ব্যবহারকারীদের সর্বোচ্চ সেবা প্রদান করবেন।",
          id: "job5",
        },
        {
          title: "ফিন্যান্সিয়াল অ্যানালিস্ট",
          type: "full-time",
          location: "ঢাকা",
          department: "ফিন্যান্স",
          posted: "৫ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন দক্ষ ফিন্যান্সিয়াল অ্যানালিস্ট খুঁজছি যিনি কোম্পানির ফিন্যান্সিয়াল পারফরম্যান্স বিশ্লেষণ করবেন।",
          id: "job6",
        },
        {
          title: "মার্কেটিং ম্যানেজার",
          type: "full-time",
          location: "ঢাকা",
          department: "মার্কেটিং",
          posted: "৭ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন অভিজ্ঞ মার্কেটিং ম্যানেজার খুঁজছি যিনি আমাদের মার্কেটিং কৌশল বিকাশ এবং বাস্তবায়ন করবেন।",
          id: "job7",
        },
        {
          title: "ফুল স্ট্যাক ডেভেলপার",
          type: "full-time",
          location: "ঢাকা",
          department: "টেকনোলজি",
          posted: "৩ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন দক্ষ ফুল স্ট্যাক ডেভেলপার খুঁজছি যিনি আমাদের ওয়েব অ্যাপ্লিকেশন বিকাশ এবং রক্ষণাবেক্ষণ করবেন।",
          id: "job8",
        },
        {
          title: "এন্টারপ্রাইজ আর্কিটেক্ট",
          type: "full-time",
          location: "ঢাকা",
          department: "টেকনোলজি",
          posted: "৮ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন অভিজ্ঞ এন্টারপ্রাইজ আর্কিটেক্ট খুঁজছি যিনি আমাদের সিস্টেম আর্কিটেকচার ডিজাইন এবং উন্নতি করবেন।",
          id: "job9",
        },
        {
          title: "ডাটা অ্যানালিটিকস স্পেশালিস্ট",
          type: "full-time",
          location: "চট্টগ্রাম",
          department: "ডাটা অ্যানালিটিক্স",
          posted: "১০ দিন আগে পোস্ট করা হয়েছে",
          description:
            "আমরা একজন দক্ষ ডাটা অ্যানালিটিকস স্পেশালিস্ট খুঁজছি যিনি ব্যবহারকারীদের আচরণ বিশ্লেষণ করে সেবার মান উন্নত করবেন।",
          id: "job10",
        },
      ];

      // Create and append new job cards
      newJobs.forEach((job) => {
        const newJobCard = document.createElement("div");
        newJobCard.className = "job-card";
        newJobCard.dataset.jobId = job.id;
        newJobCard.innerHTML = `
          <div class="job-header">
            <h3>${job.title}</h3>
            <span class="job-type ${job.type}">${
          job.type === "full-time" ? "ফুল-টাইম" : job.type
        }</span>
          </div>
          <div class="job-details">
            <div class="job-info">
              <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
              <span><i class="fas fa-building"></i> ${job.department}</span>
              <span><i class="fas fa-calendar-alt"></i> ${job.posted}</span>
            </div>
            <p>${job.description}</p>
            <div class="job-footer">
              <a href="#" class="btn-secondary view-details" data-job-id="${
                job.id
              }">বিস্তারিত দেখুন</a>
              <a href="#" class="btn-primary apply-now" data-job-id="${
                job.id
              }">আবেদন করুন</a>
            </div>
          </div>
        `;

        jobListings.appendChild(newJobCard);

        // Add animation to the new card
        setTimeout(() => {
          newJobCard.classList.add("animate");
        }, 10);
      });

      // Remove load more button after adding all jobs
      loadMoreBtn.parentElement.remove();

      // Reinitialize modal events for new job cards
      initializeModalEvents();
    });
  }
  // Modal Functionality - FIXED
  const jobDetailsModal = document.querySelector(".job-details-modal");
  const jobApplicationModal = document.querySelector(".job-application-modal");
  const applicationSuccessModal = document.querySelector(
    ".application-success-modal"
  );
  const modalCloseBtns = document.querySelectorAll(".modal-close");

  // Job details data (simulated database)
  const jobDetailsData = {
    job1: {
      title: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "টেকনোলজি",
      posted: "১৪ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার খুঁজছি যিনি আমাদের ফিনটেক প্ল্যাটফর্ম বিকাশের জন্য দায়িত্ব নিবেন। এই ভূমিকায়, আপনি আমাদের টেকনিক্যাল টিমের একটি গুরুত্বপূর্ণ অংশ হবেন এবং বিকাশের উদ্ভাবনী প্রোডাক্ট ও সার্ভিসগুলি বিকাশে সহায়তা করবেন।",
      responsibilities: [
        "হাই-পারফরম্যান্স, স্কেলেবল এবং সিকিউর ওয়েব অ্যাপ্লিকেশন ডিজাইন ও ডেভেলপ করা",
        "কোড রিভিউ, পেয়ার প্রোগ্রামিং এবং টেকনিক্যাল মেন্টরিং এর মাধ্যমে টিমের অন্যান্য ডেভেলপারদের সাহায্য করা",
        "প্রোডাক্ট ম্যানেজমেন্ট এবং ইউএক্স টিমের সাথে কাজ করে উৎকৃষ্ট ব্যবহারকারী অভিজ্ঞতা নিশ্চিত করা",
        "সিস্টেম আর্কিটেকচার ডিজাইন এবং উন্নত করা",
        "সমস্যা সমাধান এবং ডিবাগিং",
        "নতুন প্রযুক্তি ও টুল সম্পর্কে জানা এবং প্রয়োজন অনুসারে প্রয়োগ করা",
      ],
      qualifications: [
        "কম্পিউটার সায়েন্স বা সংশ্লিষ্ট ক্ষেত্রে স্নাতক ডিগ্রি",
        "সফটওয়্যার ডেভেলপমেন্টে কমপক্ষে ৫ বছরের অভিজ্ঞতা",
        "জাভা, স্প্রিংবুট, নোড.জেএস, রিয়েক্ট বা এঙ্গুলার সহ আধুনিক ফ্রেমওয়ার্ক ও প্রযুক্তিতে দক্ষতা",
        "ক্লাউড প্ল্যাটফর্ম (AWS, GCP, Azure) এর অভিজ্ঞতা",
        "RESTful API ডিজাইন ও ইমপ্লিমেন্টেশনের অভিজ্ঞতা",
        "ডাটাবেস ডিজাইন এবং SQL/NoSQL ডাটাবেসের অভিজ্ঞতা",
        "মাইক্রোসার্ভিস আর্কিটেকচারের সাথে পরিচিতি",
        "সিআই/সিডি পাইপলাইন এবং কন্টেইনারাইজেশন (ডকার, কুবারনেটিস) এর অভিজ্ঞতা",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "উদ্ভাবনী প্রযুক্তিতে কাজ করার সুযোগ",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    job2: {
      title: "প্রোডাক্ট ম্যানেজার",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "প্রোডাক্ট",
      posted: "৭ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন দক্ষ প্রোডাক্ট ম্যানেজার খুঁজছি যিনি আমাদের ডিজিটাল পেমেন্ট সলিউশনগুলো বিকাশে নেতৃত্ব দিবেন। এই ভূমিকায়, আপনি প্রোডাক্ট স্ট্র্যাটেজি তৈরি, বাস্তবায়ন এবং পরীক্ষা-নিরীক্ষার মাধ্যমে বিকাশের উন্নতিতে গুরুত্বপূর্ণ ভূমিকা পালন করবেন।",
      responsibilities: [
        "প্রোডাক্ট বিজনেস কেস ও রোডম্যাপ তৈরি করা",
        "মার্কেট রিসার্চ ও প্রতিযোগীদের বিশ্লেষণ করা",
        "ইউজার স্টোরি ও প্রোডাক্ট স্পেসিফিকেশন তৈরি করা",
        "টেকনিক্যাল টিম এবং স্টেকহোল্ডারদের সাথে নিয়মিত যোগাযোগ রাখা",
        "প্রোডাক্ট লঞ্চ ও মার্কেটিং ক্যাম্পেইন পরিচালনা করা",
        "প্রোডাক্ট পারফরম্যান্স ট্র্যাক ও রিপোর্ট করা",
      ],
      qualifications: [
        "প্রোডাক্ট ম্যানেজমেন্টে কমপক্ষে ৩ বছরের অভিজ্ঞতা",
        "ফিনটেক বা ডিজিটাল পেমেন্ট সেক্টরে কাজের অভিজ্ঞতা",
        "ডাটা ড্রিভেন ডিসিশন মেকিং ও এনালিটিক্স টুলস ব্যবহারের অভিজ্ঞতা",
        "ব্যবহারকারীদের চাহিদা বুঝতে এবং সমাধান তৈরি করতে সক্ষম",
        "প্রোজেক্ট ম্যানেজমেন্ট টুলস (জিরা, কনফ্লুয়েন্স, ট্রেলো) এর সাথে পরিচিতি",
        "সফল প্রোডাক্ট লঞ্চ ও স্কেল করার ট্র্যাক রেকর্ড",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "ইনোভেটিভ টেকনোলজি ও সার্ভিসের সাথে কাজ করার সুযোগ",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    job3: {
      title: "মার্কেটিং স্পেশালিস্ট",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "মার্কেটিং",
      posted: "১০ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন সৃজনশীল মার্কেটিং স্পেশালিস্ট খুঁজছি যিনি আমাদের ডিজিটাল মার্কেটিং ক্যাম্পেইন পরিচালনা করবেন। এই ভূমিকায়, আপনি বিকাশের ব্র্যান্ড প্রচার ও ডিজিটাল প্রেজেন্স বাড়াতে গুরুত্বপূর্ণ ভূমিকা পালন করবেন।",
      responsibilities: [
        "ডিজিটাল মার্কেটিং স্ট্র্যাটেজি তৈরি ও বাস্তবায়ন করা",
        "সোশ্যাল মিডিয়া ক্যাম্পেইন পরিচালনা করা",
        "ইমেইল মার্কেটিং ক্যাম্পেইন ডিজাইন ও পরিচালনা করা",
        "SEO/SEM ক্যাম্পেইন পরিচালনা করা",
        "মার্কেটিং কনটেন্ট তৈরি করা",
        "মার্কেটিং পারফরম্যান্স অ্যানালাইসিস ও রিপোর্টিং করা",
      ],
      qualifications: [
        "মার্কেটিং বা সংশ্লিষ্ট ক্ষেত্রে স্নাতক ডিগ্রি",
        "ডিজিটাল মার্কেটিংয়ে কমপক্ষে ২ বছরের অভিজ্ঞতা",
        "সোশ্যাল মিডিয়া প্ল্যাটফর্ম (ফেসবুক, ইনস্টাগ্রাম, লিংকডইন) পরিচালনার অভিজ্ঞতা",
        "SEO/SEM টুলস ও টেকনিকের অভিজ্ঞতা",
        "Google Analytics ও অন্যান্য মার্কেটিং অ্যানালিটিক্স টুলস ব্যবহারের অভিজ্ঞতা",
        "সৃজনশীল মার্কেটিং কনটেন্ট তৈরি করতে সক্ষম",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "সৃজনশীল কাজের পরিবেশ",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    job4: {
      title: "ডাটা সায়েন্টিস্ট",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "ডাটা অ্যানালিটিক্স",
      posted: "৫ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন অভিজ্ঞ ডাটা সায়েন্টিস্ট খুঁজছি যিনি ব্যবহারকারীদের আচরণ বিশ্লেষণ করে সেবার মান উন্নত করবেন। এই ভূমিকায়, আপনি বিকাশের ডাটা অ্যানালিটিক্স টিমের একটি গুরুত্বপূর্ণ অংশ হবেন।",
      responsibilities: [
        "ব্যবহারকারীদের আচরণ বিশ্লেষণ করা",
        "প্রেডিক্টিভ মডেল তৈরি করা",
        "ডাটা ভিজ্যুয়ালাইজেশন ও রিপোর্টিং",
        "ফ্রড ডিটেকশন ও প্রিভেনশন সিস্টেম উন্নত করা",
        "মেশিন লার্নিং অ্যালগরিদম তৈরি ও অপটিমাইজ করা",
        "বিজনেস ইনসাইট তৈরি করা",
      ],
      qualifications: [
        "কম্পিউটার সায়েন্স, স্ট্যাটিস্টিক্স বা সংশ্লিষ্ট ক্ষেত্রে স্নাতক ডিগ্রি",
        "ডাটা সায়েন্সে কমপক্ষে ৩ বছরের অভিজ্ঞতা",
        "পাইথন, আর, এসকিউএল এর সাথে দক্ষতা",
        "মেশিন লার্নিং অ্যালগরিদম ও স্ট্যাটিস্টিক্যাল টেকনিকের অভিজ্ঞতা",
        "ডাটা ভিজ্যুয়ালাইজেশন টুলস (টাবলো, পাওয়ার বিআই, ম্যাটপ্লটলিব) এর অভিজ্ঞতা",
        "বিগ ডাটা টেকনোলজি (হাডুপ, স্পার্ক) এর সাথে পরিচিতি",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "বিশাল ডাটাসেট নিয়ে কাজ করার সুযোগ",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    // অতিরিক্ত জব ডিটেইলস
    job5: {
      title: "ক্যাস্টমার সাপোর্ট স্পেশালিস্ট",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "কাস্টমার সার্ভিস",
      posted: "২ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন উৎসাহী কাস্টমার সাপোর্ট স্পেশালিস্ট খুঁজছি যিনি আমাদের ব্যবহারকারীদের সর্বোচ্চ সেবা প্রদান করবেন। এই ভূমিকায়, আপনি বিকাশের কাস্টমার সার্ভিস টিমের একটি গুরুত্বপূর্ণ অংশ হবেন।",
      responsibilities: [
        "গ্রাহকদের প্রশ্ন, সমস্যা ও অভিযোগ সমাধান করা",
        "গ্রাহকদের বিকাশ অ্যাপ ও সেবা ব্যবহারে সহায়তা করা",
        "গ্রাহকদের সমস্যা রেকর্ড করা ও যথাযথ বিভাগে রেফার করা",
        "গ্রাহকদের ফিডব্যাক সংগ্রহ করা ও রিপোর্ট করা",
        "গ্রাহক সেবার মান নিশ্চিত করা",
      ],
      qualifications: [
        "কাস্টমার সার্ভিসে কমপক্ষে ১ বছরের অভিজ্ঞতা",
        "উন্নত যোগাযোগ দক্ষতা (লিখিত ও মৌখিক)",
        "দল হিসেবে কাজ করার ক্ষমতা",
        "সমস্যা সমাধানে দক্ষতা",
        "ধৈর্য ও সহানুভূতি",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    job6: {
      title: "ফিন্যান্সিয়াল অ্যানালিস্ট",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "ফিন্যান্স",
      posted: "৫ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন দক্ষ ফিন্যান্সিয়াল অ্যানালিস্ট খুঁজছি যিনি কোম্পানির ফিন্যান্সিয়াল পারফরম্যান্স বিশ্লেষণ করবেন। এই ভূমিকায়, আপনি বিকাশের ফিন্যান্স টিমের একটি গুরুত্বপূর্ণ অংশ হবেন।",
      responsibilities: [
        "ফিন্যান্সিয়াল মডেল তৈরি ও বিশ্লেষণ করা",
        "বাজেট প্রস্তুত করা ও পর্যালোচনা করা",
        "ফিন্যান্সিয়াল রিপোর্ট তৈরি করা",
        "রেভেনিউ ও ব্যয় বিশ্লেষণ করা",
        "ফিন্যান্সিয়াল ট্রেন্ড ও প্যাটার্ন চিহ্নিত করা",
        "ব্যবসায়িক সিদ্ধান্ত নেওয়ার জন্য ফিন্যান্সিয়াল ইনসাইট প্রদান করা",
      ],
      qualifications: [
        "ফিন্যান্স, অ্যাকাউন্টিং বা সংশ্লিষ্ট ক্ষেত্রে স্নাতক ডিগ্রি",
        "ফিন্যান্সিয়াল অ্যানালিসিসে কমপক্ষে ২ বছরের অভিজ্ঞতা",
        "ফিন্যান্সিয়াল মডেলিং ও ফোরকাস্টিং এর অভিজ্ঞতা",
        "এক্সেল ও ফিন্যান্সিয়াল সফটওয়্যার ব্যবহারে দক্ষতা",
        "বিশ্লেষণাত্মক চিন্তাধারা ও সমস্যা সমাধান দক্ষতা",
        "ডাটা ভিজ্যুয়ালাইজেশন দক্ষতা",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
    job7: {
      title: "মার্কেটিং ম্যানেজার",
      type: "ফুল-টাইম",
      location: "ঢাকা",
      department: "মার্কেটিং",
      posted: "৭ দিন আগে পোস্ট করা হয়েছে",
      description:
        "আমরা একজন অভিজ্ঞ মার্কেটিং ম্যানেজার খুঁজছি যিনি আমাদের মার্কেটিং কৌশল বিকাশ এবং বাস্তবায়ন করবেন।",
      responsibilities: [
        "মার্কেটিং স্ট্র্যাটেজি তৈরি ও বাস্তবায়ন করা",
        "ব্র্যান্ড অ্যাওয়্যারনেস বাড়ানোর জন্য ক্যাম্পেইন ডিজাইন করা",
        "মার্কেটিং টিম পরিচালনা করা",
        "মার্কেটিং বাজেট ম্যানেজ করা",
        "মার্কেটিং ট্রেন্ড ও প্যাটার্ন বিশ্লেষণ করা",
      ],
      qualifications: [
        "মার্কেটিং বা সংশ্লিষ্ট ক্ষেত্রে স্নাতক ডিগ্রি",
        "মার্কেটিং ম্যানেজমেন্টে কমপক্ষে ৫ বছরের অভিজ্ঞতা",
        "ব্র্যান্ড ম্যানেজমেন্ট অভিজ্ঞতা",
        "টিম লিডারশিপ স্কিল",
        "ডিজিটাল মার্কেটিং টুলস ব্যবহারের অভিজ্ঞতা",
      ],
      benefits: [
        "আকর্ষণীয় বেতন ও বেনিফিট প্যাকেজ",
        "প্রতিযোগিতামূলক স্বাস্থ্য বীমা",
        "পেশাদার বিকাশের সুযোগ",
        "অনন্য কর্পোরেট সংস্কৃতি",
        "হাইব্রিড কাজের পরিবেশ",
      ],
    },
  };

  // মোডাল ইভেন্ট ইনিশিয়ালাইজ করার ফাংশন
  function initializeModalEvents() {
    // সব "বিস্তারিত দেখুন" বাটন নিন (নতুন যুক্ত করা বাটনসহ)
    const viewDetailsButtons = document.querySelectorAll(".view-details");
    const applyNowButtons = document.querySelectorAll(".apply-now");
    const applyFromModalBtn = document.querySelector(".apply-from-modal");
    const jobApplicationForm = document.getElementById("job-application-form");
    const closeSuccessModalBtn = document.querySelector(".close-success-modal");
    const fileInput = document.getElementById("applicant-resume");
    const fileName = document.querySelector(".file-name");

    // "বিস্তারিত দেখুন" বাটন
    viewDetailsButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const jobId = this.dataset.jobId;
        showJobDetails(jobId);
      });
    });

    // "আবেদন করুন" বাটন
    applyNowButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const jobId = this.dataset.jobId;
        showJobApplication(jobId);
      });
    });

    // জব ডিটেইলস মোডাল থেকে আবেদন করুন
    if (applyFromModalBtn) {
      applyFromModalBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const jobId = this.dataset.jobId;
        hideModal(jobDetailsModal);
        showJobApplication(jobId);
      });
    }

    // জব আবেদন ফর্ম সাবমিশন
    if (jobApplicationForm) {
      jobApplicationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        hideModal(jobApplicationModal);
        showApplicationSuccess();
      });
    }

    // সাকসেস মোডাল বন্ধ করুন
    if (closeSuccessModalBtn) {
      closeSuccessModalBtn.addEventListener("click", function () {
        hideModal(applicationSuccessModal);
      });
    }

    // ফাইল ইনপুট পরিবর্তন - ফাইলের নাম দেখান
    if (fileInput && fileName) {
      fileInput.addEventListener("change", function () {
        if (this.files.length > 0) {
          fileName.textContent = this.files[0].name;
        } else {
          fileName.textContent = "কোনো ফাইল নির্বাচন করা হয়নি";
        }
      });
    }
  }
  // জব ডিটেইলস মোডাল দেখানোর ফাংশন
  function showJobDetails(jobId) {
    const jobData = jobDetailsData[jobId];
    if (!jobData) return;

    // মোডাল টাইটেল সেট করুন
    document.getElementById("job-modal-title").textContent = jobData.title;

    // জব মেটা ডেটা সেট করুন
    const jobTypeModal = document.querySelector(".job-type-modal");
    const jobLocation = document.querySelector(".job-location");
    const jobDepartment = document.querySelector(".job-department");
    const jobDate = document.querySelector(".job-date");

    jobTypeModal.textContent = jobData.type;
    jobTypeModal.className = `job-type-modal ${
      jobData.type === "ফুল-টাইম" ? "full-time" : jobData.type.toLowerCase()
    }`;
    jobLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${jobData.location}`;
    jobDepartment.innerHTML = `<i class="fas fa-building"></i> ${jobData.department}`;
    jobDate.innerHTML = `<i class="fas fa-calendar-alt"></i> ${jobData.posted}`;

    // জব বর্ণনা সেট করুন
    const jobDescription = document.querySelector(".job-description");

    let responsibilitiesHTML = "";
    if (jobData.responsibilities && jobData.responsibilities.length > 0) {
      responsibilitiesHTML = `
        <h3>দায়িত্ব</h3>
        <ul>
            ${jobData.responsibilities
              .map((item) => `<li>${item}</li>`)
              .join("")}
        </ul>
      `;
    }

    let qualificationsHTML = "";
    if (jobData.qualifications && jobData.qualifications.length > 0) {
      qualificationsHTML = `
        <h3>যোগ্যতা</h3>
        <ul>
            ${jobData.qualifications.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }

    let benefitsHTML = "";
    if (jobData.benefits && jobData.benefits.length > 0) {
      benefitsHTML = `
        <h3>আমরা যা অফার করি</h3>
        <ul>
            ${jobData.benefits.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }

    jobDescription.innerHTML = `
        <h3>চাকরির বিবরণ</h3>
        <p>${jobData.description}</p>
        ${responsibilitiesHTML}
        ${qualificationsHTML}
        ${benefitsHTML}
    `;

    // অ্যাপ্লাই বাটনে জব আইডি সেট করুন
    document.querySelector(".apply-from-modal").dataset.jobId = jobId;

    // মোডাল দেখান
    showModal(jobDetailsModal);
  }

  // আবেদন মোডাল দেখানোর ফাংশন
  function showJobApplication(jobId) {
    const jobData = jobDetailsData[jobId];
    if (!jobData) return;

    // মোডাল টাইটেল সেট করুন
    document.getElementById(
      "application-modal-title"
    ).textContent = `আবেদন করুন - ${jobData.title}`;

    // ফর্ম রিসেট করুন
    const jobApplicationForm = document.getElementById("job-application-form");
    if (jobApplicationForm) {
      jobApplicationForm.reset();
      document.querySelector(".file-name").textContent =
        "কোনো ফাইল নির্বাচন করা হয়নি";
    }

    // মোডাল দেখান
    showModal(jobApplicationModal);
  }

  // আবেদন সফল মোডাল দেখানোর ফাংশন
  function showApplicationSuccess() {
    // র‍্যান্ডম আবেদন আইডি জেনারেট করুন
    const applicationId = `BK-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
    document.getElementById("application-id").textContent = applicationId;

    // মোডাল দেখান
    showModal(applicationSuccessModal);
  }

  // উন্নত মোডাল ফাংশনালিটি - ঠিক করা
  function showModal(modal) {
    if (!modal) return;

    // প্রথমে CSS display:block করুন তবে এখনো অদৃশ্য রাখুন
    modal.style.display = "block";

    // একটি রিফ্লো ফোরস করুন যাতে অ্যানিমেশন কাজ করে
    modal.offsetHeight;

    // তারপর active ক্লাস যোগ করুন অ্যানিমেশন ট্রিগার করতে
    modal.classList.add("active");

    // বডি স্ক্রল বন্ধ করুন
    document.body.style.overflow = "hidden";
  }

  function hideModal(modal) {
    if (!modal) return;

    // active ক্লাস সরিয়ে ফেলুন ফেড আউট অ্যানিমেশন শুরু করতে
    modal.classList.remove("active");

    // অ্যানিমেশন সম্পন্ন হতে অপেক্ষা করুন তারপর মোডাল লুকান
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }, 300);
  }

  // মোডাল বন্ধ বাটন ক্লিক করলে
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      hideModal(modal);
    });
  });

  // মোডাল বাইরে ক্লিক করলে বন্ধ করুন
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      hideModal(e.target);
    }
  });

  // মোডাল ইভেন্ট ইনিশিয়ালাইজ করুন
  initializeModalEvents();

  // উপরে যাওয়ার বাটন
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // নিউজলেটার ফর্ম সাবমিশন
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // সাকসেস মেসেজ দেখান
        const formContainer = this.parentElement;
        formContainer.innerHTML = `
          <div class="success-message">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>সাবস্ক্রিপশন সফল!</h3>
            <p>ধন্যবাদ! আপনি সফলভাবে আমাদের ক্যারিয়ার নিউজলেটারে সাবস্ক্রাইব করেছেন।</p>
          </div>
        `;
      }
    });
  }

  // সেকশন অ্যানিমেশন স্ক্রলের সময়
  const sections = document.querySelectorAll("section");

  function checkSections() {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  }

  // অ্যানিমেশনের জন্য প্রাথমিক স্টাইল প্রয়োগ করুন
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", checkSections);
  window.addEventListener("load", checkSections);
});