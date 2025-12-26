const scenes = document.querySelectorAll(".scene");
const hint = document.getElementById("hint");
let current = 0;

/* ===== ENGINE ===== */
function show(index) {
  scenes[current].classList.remove("active");
  scenes[index].classList.add("active");
  current = index;
}

/* ===== CLICK CONTROL ===== */
function wait(callback) {
  hint.style.opacity = 1;

  function handler(e) {
    e.stopPropagation();
    hint.style.opacity = 0;
    document.removeEventListener("click", handler);
    callback();
  }

  document.addEventListener("click", handler);
}

/* ===== TYPEWRITER ===== */
function typeText(element, text, speed = 60, callback) {
  let i = 0;
  element.textContent = "";

  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

/* ===== START ===== */
document.getElementById("startBtn").addEventListener("click", (e) => {
  e.stopPropagation();

  show(1);

  const text = `Before you...
Days were quiet.
Nights were empty.
The world was just... existing.`;

  const el = document.getElementById("beforeText");

  typeText(el, text, 70, () => {
    wait(() => {
      show(2);
      initMeeting();
    });
  });
});

/* ===== MEETING ===== */
function initMeeting() {
  gsap.from("#meeting h2", {
    scale: 0,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  });

  wait(() => {
    show(3);
    initPuzzle();
  });
}

/* ===== PUZZLE ===== */
function initPuzzle() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const symbols = ["❤️","💖","✨","🌙"];
  let cleared = 0;

  symbols.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = symbol;

    card.addEventListener("click", (e) => {
      e.stopPropagation();
      card.style.opacity = 0;
      cleared++;

      if (cleared === symbols.length) {
        wait(() => show(4));
      }
    });

    grid.appendChild(card);
  });
}

/* ===== DIALOGUE ===== */
document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(5);
  });
});

/* ===== FINAL ===== */
document.getElementById("finalBtn").addEventListener("click", () => {
  show(6); // future scene index
});

/* ===== EARPHONE QUEST ===== */
function initEarphoneQuest() {
  const pocket = document.getElementById("pocket");
  const earHint = document.getElementById("hint-text");

  if (!pocket || !earHint) return;

  pocket.addEventListener("click", (e) => {
    e.stopPropagation();

    earHint.textContent = "Ты нашла его ❤️";
    earHint.style.opacity = 1;

    setTimeout(() => {
      show(current + 1); // переход к следующей сцене
    }, 1500);
  });
}
wait(() => {
  show(5);          // сцена с наушником
  initEarphoneQuest();
});

