// বিকাশ হেল্প ড্রপডাউন মেনু - ৫টি রো সহ JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // একাধিক nav-dropdown থাকতে পারে, তাই আমরা শুধু ঐটাই সিলেক্ট করছি যেটার ভিতরে helpButton আছে
  const helpDropdown = document.querySelector(".nav-dropdown:has(#helpButton)");
  const helpButton = document.getElementById("helpButton");

  if (helpButton && helpDropdown) {
    // ড্রপডাউন মেনু ইলিমেন্ট
    const dropdownMenu = helpDropdown.querySelector(".help-dropdown-menu");

    if (dropdownMenu) {
      // হোভার ইভেন্ট হ্যান্ডলিং
      helpDropdown.addEventListener("mouseenter", function () {
        dropdownMenu.style.display = "flex";
      });

      helpDropdown.addEventListener("mouseleave", function () {
        dropdownMenu.style.display = "none";
      });

      // এছাড়াও, টাচস্ক্রিন ডিভাইসের জন্য ক্লিক ইভেন্ট হ্যান্ডলিং
      helpButton.addEventListener("click", function (e) {
        e.preventDefault();

        if (dropdownMenu.style.display === "flex") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "flex";
        }
      });
    }
  }

  // যদি ড্রপডাউন না থাকে তবে ডায়নামিক্যালি তৈরি করুন
  if (helpButton && !helpDropdown.querySelector(".help-dropdown-menu")) {
    // ড্রপডাউন তৈরির কোড আগের মতই থাকবে
    // মেনু আইটেম ডাটা
    const helpMenuRows = [
      // ১ম রো - ৪টি আইটেম
      [
        { text: "গ্রাহক সেবা কেন্দ্র", url: "#" },
        { text: "সাধারণ জিজ্ঞাসা", url: "#" },
        { text: "রিসেন্ট শিপ", url: "#" },
        { text: "রিওয়ার্ডস", url: "#" },
      ],
      // ২য় রো - ৪টি আইটেম
      [
        { text: "ডিসকন্টিনিউড এজেন্ট", url: "#" },
        { text: "চার্জ এবং লিমিট", url: "#" },
        { text: "তথ্য হালনাগাদ", url: "#" },
        { text: "নিরাপত্তা পরামর্শ", url: "#" },
      ],
      // ৩য় রো - ৪টি আইটেম
      [
        { text: "ডিসকন্টিনিউড ডিস্ট্রিবিউটর", url: "#" },
        { text: "একাউন্ট ম্যানেজ", url: "#" },
        { text: "জমানো টাকার উপর ইন্টারেস্ট", url: "#" },
        { text: "কমপ্লাইন্ট সেল", url: "#" },
      ],
      // ৪র্থ রো - ৪টি আইটেম
      [
        { text: "যোগাযোগ করুন", url: "#" },
        { text: "এইচএসবিসি কার্ড", url: "#" },
        { text: "প্রতারণা এড়িয়ে চলুন", url: "#" },
        { text: "বিকাশ টু ব্যাংক", url: "#" },
      ],
      // ৫ম রো - ৩টি আইটেম
      [
        { text: "সিকিউরিটি ইডেনটিফিকেশন", url: "#" },
        { text: "ব্যাংক টু বিকাশ", url: "#" },
        { text: "ভিডিও টিউটোরিয়াল", url: "#" },
      ],
    ];

    // ডান দিকের কুইক লিংক
    const quickLinks = [
      { icon: "far fa-comment-dots", text: "লাইভ চ্যাট", url: "#" },
      { icon: "fas fa-phone-alt", text: "হেল্প লাইন ১৬২৪৭", url: "tel:16247" },
      { icon: "far fa-calendar-alt", text: "ই-অ্যাপয়েন্টমেন্ট", url: "#" },
      { icon: "fas fa-map-marker-alt", text: "বিকাশ ম্যাপ", url: "#" },
    ];

    // ড্রপডাউন মেনু তৈরি
    const newDropdownMenu = document.createElement("div");
    newDropdownMenu.className = "help-dropdown-menu";

    const container = document.createElement("div");
    container.className = "help-dropdown-container";

    // বাম দিকের মেনু কলাম
    const menuColumn = document.createElement("div");
    menuColumn.className = "help-menu-column";

    // সব রো যুক্ত করা
    helpMenuRows.forEach((rowItems) => {
      const row = document.createElement("div");
      row.className = "help-menu-row";

      // রো-তে সব আইটেম যুক্ত করা
      rowItems.forEach((item) => {
        const menuItem = document.createElement("a");
        menuItem.href = item.url;
        menuItem.className = "help-menu-item";
        menuItem.innerHTML = `<span>${item.text}</span>`;
        row.appendChild(menuItem);
      });

      menuColumn.appendChild(row);
    });

    // ডান দিকের কুইক লিংক কলাম
    const quickLinksColumn = document.createElement("div");
    quickLinksColumn.className = "help-quick-links-column";

    // কুইক লিংক যুক্ত করা
    quickLinks.forEach((link) => {
      const quickLink = document.createElement("a");
      quickLink.href = link.url;
      quickLink.className = "help-quick-link";
      quickLink.innerHTML = `<i class="${link.icon}"></i><span>${link.text}</span>`;
      quickLinksColumn.appendChild(quickLink);
    });

    // ড্রপডাউন একত্রিত করা
    container.appendChild(menuColumn);
    container.appendChild(quickLinksColumn);
    newDropdownMenu.appendChild(container);

    // ড্রপডাউন যুক্ত করা
    helpDropdown.appendChild(newDropdownMenu);

    // ইভেন্ট হ্যান্ডলার যুক্ত করা
    helpDropdown.addEventListener("mouseenter", function () {
      newDropdownMenu.style.display = "flex";
    });

    helpDropdown.addEventListener("mouseleave", function () {
      newDropdownMenu.style.display = "none";
    });

    // টাচস্ক্রিন ডিভাইসের জন্য ক্লিক ইভেন্ট হ্যান্ডলিং
    helpButton.addEventListener("click", function (e) {
      e.preventDefault();

      if (newDropdownMenu.style.display === "flex") {
        newDropdownMenu.style.display = "none";
      } else {
        newDropdownMenu.style.display = "flex";
      }
    });
  }
});
