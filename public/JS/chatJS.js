// bKash Chat Integration
document.addEventListener("DOMContentLoaded", function () {
  // Chat functionality
  const chatButton = document.getElementById("chat-button");
  const chatOverlay = document.getElementById("bkash-chat-overlay");
  const chatBody = document.getElementById("bkash-chat-body");
  const messageInput = document.getElementById("bkash-message-input");
  const sendButton = document.getElementById("bkash-send-btn");
  const minimizeBtn = document.querySelector(".minimize-btn");
  const closeBtn = document.querySelector(".close-btn");

  // Chat window state
  let chatActive = false;
  let selectedLanguage = "bn"; // Default to Bengali for bKash Bangladesh

  // Initialize chat
  function initializeChat() {
    chatActive = true;
    chatOverlay.classList.remove("hidden");

    // Add initial messages
    addInitialMessages();

    // Focus the input
    setTimeout(() => {
      messageInput.focus();
    }, 500);
  }

  // Close chat
  function closeChat() {
    chatActive = false;
    chatOverlay.classList.add("hidden");
  }

  // Toggle minimize chat
  function toggleMinimize() {
    const chatWindow = document.querySelector(".bkash-chat-window");
    chatWindow.classList.toggle("minimized");

    if (chatWindow.classList.contains("minimized")) {
      minimizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
      minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }
  }

  // Add initial welcome messages
  function addInitialMessages() {
    // Clear existing messages
    chatBody.innerHTML = "";

    // Get current time for messages
    const currentHour = new Date().getHours();
    let greeting = "শুভ সকাল!";
    if (currentHour >= 12 && currentHour < 17) {
      greeting = "শুভ অপরাহ্ন!";
    } else if (currentHour >= 17) {
      greeting = "শুভ সন্ধ্যা!";
    }

    // Add greeting message
    addBotMessage(greeting);

    // Add welcome message
    addBotMessage("বিকাশ কাস্টমার সার্ভিসে আপনাকে স্বাগতম");

    // Add language selection message
    const langMessage = document.createElement("div");
    langMessage.className = "chat-message bot";
    langMessage.innerHTML = `
      <div class="message-container">
        <div class="message-bubble">
          অনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন<br>
          Please select your preferred language
          <div class="language-options">
            <button class="lang-btn selected" data-lang="bn">বাংলা</button>
            <button class="lang-btn" data-lang="en">English</button>
          </div>
        </div>
        <div class="message-time">${getCurrentTime()}</div>
      </div>
    `;

    chatBody.appendChild(langMessage);

    // Add event listeners to language buttons
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        selectedLanguage = this.dataset.lang;

        // Update UI
        langButtons.forEach((b) => b.classList.remove("selected"));
        this.classList.add("selected");

        // Add language confirmation message
        addUserMessage(this.textContent + " selected");

        // Add response based on language
        setTimeout(() => {
          if (selectedLanguage === "bn") {
            addBotMessage(
              "বাংলা নির্বাচন করার জন্য ধন্যবাদ। আপনার বিকাশ সেবা সম্পর্কে আমি কীভাবে সাহায্য করতে পারি?"
            );
          } else {
            addBotMessage(
              "Thank you for choosing English. How may I assist you with your bKash service today?"
            );
          }
        }, 500);
      });
    });

    scrollToBottom();
  }

  // Get current time formatted
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Send message
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      addUserMessage(message);
      messageInput.value = "";

      showTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator();
        const response = getBotResponse(message);
        addBotMessage(response);
      }, 1000 + Math.random() * 1000);
    }
  }

  // Add user message
  function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message user";
    messageElement.innerHTML = `
      <div class="message-container">
        <div class="message-bubble">${message}</div>
        <div class="message-time">${getCurrentTime()}</div>
      </div>
    `;
    chatBody.appendChild(messageElement);
    scrollToBottom();
  }

  // Add bot message
  function addBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "chat-message bot";
    messageElement.innerHTML = `
      <div class="message-container">
        <div class="message-bubble">${message}</div>
        <div class="message-time">${getCurrentTime()}</div>
      </div>
    `;
    chatBody.appendChild(messageElement);
    scrollToBottom();
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.className = "chat-message bot";
    typingElement.id = "typing-indicator";
    typingElement.innerHTML = `
      <div class="message-container">
        <div class="message-bubble">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    chatBody.appendChild(typingElement);
    scrollToBottom();
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Scroll chat to bottom
  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Get bot response
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Bengali responses
    if (selectedLanguage === "bn") {
      if (lowerMessage.includes("হাই") || lowerMessage.includes("হ্যালো")) {
        return "নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?";
      }
      if (lowerMessage.includes("বান্ডেল") || lowerMessage.includes("bundle")) {
        return "বিকাশ বান্ডেল আপনাকে সেন্ড মানি করার সময় টাকা সাশ্রয় করতে সাহায্য করে। আপনি কোন ধরনের বান্ডেল সম্পর্কে জানতে চান?";
      }
      if (
        lowerMessage.includes("সেন্ড মানি") ||
        lowerMessage.includes("টাকা পাঠাতে")
      ) {
        return "বিকাশ দিয়ে টাকা পাঠাতে:<br>১. *২৪৭# ডায়াল করুন<br>২. 'সেন্ড মানি' নির্বাচন করুন<br>৩. প্রাপকের বিকাশ নম্বর দিন<br>৪. টাকার পরিমাণ দিন<br>৫. আপনার পিন নম্বর দিন";
      }
      if (
        lowerMessage.includes("পিন ভুলে গেছি") ||
        lowerMessage.includes("পিন ভুলে গেছি")
      ) {
        return "পিন ভুলে গেলে:<br>১. *২৪৭# ডায়াল করুন<br>২. 'রিসেট পিন' নির্বাচন করুন<br>৩. আপনার NID নম্বর দিন<br>৪. নতুন পিন সেট করুন<br><br>অথবা আপনি নিকটস্থ বিকাশ কাস্টমার কেয়ার সেন্টারে যোগাযোগ করতে পারেন।";
      }
      if (lowerMessage.includes("চার্জ") || lowerMessage.includes("ফি")) {
        return "বিকাশ চার্জ:<br>- সেন্ড মানি: প্রতি ১০০০ টাকায় ৫ টাকা<br>- ক্যাশ আউট: ১.৮৫%<br>- পেমেন্ট: ফ্রি<br>- অ্যাড মানি: ফ্রি<br><br>বিস্তারিত জানতে *২৪৭# ডায়াল করুন।";
      }
      return "দুঃখিত, আমি আপনার প্রশ্নটি বুঝতে পারিনি। আপনি কি বিকাশ বান্ডেল, সেন্ড মানি, পেমেন্ট বা অন্য কোন সেবা সম্পর্কে জানতে চান?";
    }

    // English responses
    if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
      return "Hello! How can I assist you today?";
    }
    if (lowerMessage.includes("bundle")) {
      return "bKash Bundle helps you save money on Send Money transactions. Which bundle would you like to know more about?";
    }
    if (lowerMessage.includes("send money")) {
      return "To send money using bKash:<br>1. Dial *247#<br>2. Select 'Send Money'<br>3. Enter recipient's bKash number<br>4. Enter amount<br>5. Enter your PIN";
    }
    if (
      lowerMessage.includes("forgot pin") ||
      lowerMessage.includes("reset pin")
    ) {
      return "To reset your PIN:<br>1. Dial *247#<br>2. Select 'Reset PIN'<br>3. Enter your NID number<br>4. Set a new PIN<br><br>Or visit your nearest bKash customer care center.";
    }
    if (lowerMessage.includes("charge") || lowerMessage.includes("fee")) {
      return "bKash charges:<br>- Send Money: 5 Tk per 1,000 Tk<br>- Cash Out: 1.85%<br>- Payment: Free<br>- Add Money: Free<br><br>For more details, dial *247#.";
    }
    return "I'm not sure I understand. Would you like to know about bKash Bundle, Send Money, Payments, or other services?";
  }

  // Event listeners for chat
  if (chatButton) {
    chatButton.addEventListener("click", function () {
      if (!chatActive) {
        initializeChat();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeChat);
  }

  if (minimizeBtn) {
    minimizeBtn.addEventListener("click", toggleMinimize);
  }

  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
