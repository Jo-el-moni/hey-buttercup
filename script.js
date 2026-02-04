// CHANGE THIS PASSWORD
const correctPassword = "Buttercup";

const verifyBtn = document.getElementById("verifyBtn");
const passwordInput = document.getElementById("password");

const verifyScreen = document.getElementById("verifyScreen");
const messageScreen = document.getElementById("messageScreen");

const messagesContainer = document.getElementById("messages");
const proposalCard = document.getElementById("proposalCard");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resultText = document.getElementById("resultText");

const bgMusic = document.getElementById("bgMusic");



const lines = [
  "Hey, Buttercup ✨",
  "So, you know I've got this feeling",
  "A feeling that we were meant to be together",
  "Cos my day is never complete without you",
  "Your joy has become my ecstasy, and your pain my misery",
  "And I would really be a damn fool if I let you slip",
  "So..."
];

let yesGlowLevel = 0;

let noClickCount = 0;

const noTexts = [
  "Are you sure?",
  "Think about it. No?",
  'You mean "yes", no?',
  "Certain it's no?",
  "100% No?"
];

// Password verification
verifyBtn.addEventListener("click", () => {
  if (
    password.value.trim().toLowerCase() ===
    correctPassword.toLowerCase()
  ) {
    verifyScreen.classList.remove("active");
    messageScreen.classList.add("active");

      bgMusic.volume = 0.4;
  bgMusic.play().catch(() => {});

    startMessages();
  } else {
    alert("Hmm… that’s not quite right 💭");
  }
});

// Display messages one by one
function startMessages() {
  lines.forEach((text, index) => {
    setTimeout(() => {
      const message = document.createElement("div");
      message.classList.add("message");
      message.textContent = text;
      messagesContainer.appendChild(message);
    }, index * 1800);
  });

  setTimeout(() => {
    proposalCard.style.display = "block";
  }, lines.length * 1800 + 500);
}

// Button responses
yesBtn.addEventListener("click", () => {
  launchConfetti();

  resultText.style.display = "block";
  resultText.textContent =
    "You just made me the happiest man alive 🖤";

      setTimeout(() => {
    sendToWhatsApp("YES 🎉");
  }, 3000);

  yesBtn.disabled = true;
  noBtn.disabled = true;
});

noBtn.addEventListener("click", () => {
  if (noClickCount < noTexts.length) {
    // Change text
    noBtn.textContent = noTexts[noClickCount];
    noClickCount++;

    // Shake effect
    noBtn.classList.add("shake");
    setTimeout(() => noBtn.classList.remove("shake"), 400);

    // Increase Yes glow
    yesGlowLevel++;
    yesBtn.classList.add("glow");
    yesBtn.style.boxShadow = `
      0 0 ${12 + yesGlowLevel * 6}px rgba(6, 214, 160, 0.7),
      0 0 ${25 + yesGlowLevel * 10}px rgba(6, 214, 160, 0.5)
    `;
  } else {
    resultText.style.display = "block";
    resultText.textContent =
      "I respect your honesty… still glad I asked 💫";

      
   setTimeout(() => {
    sendToWhatsApp("NO 💫");
  }, 2000);

    noBtn.disabled = true;
    yesBtn.disabled = true;
  }
});

function launchConfetti() {
  const colors = ["#ffd166", "#06d6a0", "#ef476f", "#ffffff"];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.3 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1300);
  }
}

function sendToWhatsApp(answer) {
  const phoneNumber = "2349034532296"; // <-- YOUR WhatsApp number (Nigeria format)
  const message = encodeURIComponent(
    `My answer is: ${answer} `
  );

  window.open(
    `https://wa.me/${phoneNumber}?text=${message}`,
    "_blank" 
  );
}
