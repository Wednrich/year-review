// ================= QUEST DATA =================
const quiz = [{
        type: "start",
        text: "✨ Кішкентай ғана куизді бастайық ",
        button: "Бастау"
    },

    {
        type: "choice",
        text: "🚌 Автобустың есігін 1 сағат ұстап тұра алатын не?",
        options: ["Сумочка", "Телефон", "Мен"],
        correct: ["Сумочка"],
        successText: "Guess-ке әдемі реклама ",
        successImage: "/assets/photo_2025-12-26_08-39-07.jpg"
    },

    {
        type: "choice",
        text: "🎓 Универде қыздардың емшегін ұстау?",
        options: ["Норм", "Стрем"],
        correct: ["Стрем"],
        successText: "кхм кхм 😏",
        successImage: "/assets/sis.jpg"
    },

    {
        type: "input",
        text: "🧠 Рубрика, который напоминает тебя?",
        answer: "LOTD",
        successText: "✨ Этот контент ассацируется с тобой ",
        successImage: "/assets/lotd.jpg"
    },

    {
        type: "multi",
        text: "Кого ты нашла в этом году?",
        options: [
            "Личного фотографа",
            "Личного айтишника",
            "Любимого тренера",
            "Любимое окружение"
        ],
        successText: "Все ответы правильны.",
        successImage: "/assets/it.jpg"
    },

    {
        type: "choice",
        text: "🎫 Алматы мен Астананың сарыаркаларын шатастырып билет алу?",
        options: ["Норм", "Стрем"],
        correct: ["Стрем"],
        successText: "😂 Дұрыс! Бұны ұмыту мүмкін емес",
        successImage: "/assets/kino.jpg"
    },

    {
        type: "input",
        text: "🏃‍♀️ 22 август қанша км жүгірдің?",
        answer: "5,06",
        successText: " Менің зяным мықтығой ",
        successImage: "/assets/august.jpg"
    },

    {
        type: "multi",
        text: "✨ Вещи которые стали частью тебя??",
        options: [
            "Массаж",
            "Лифо тренировка",
            "Я"
        ],
        successText: "Все ответы правильны. Но я больше подхожу",
        successImage: "/assets/limfo.jpg"
    },

    {
        type: "image",
        text: "🎧 Жайна наушнигін жоғалтып алды. Оны табуға көмектесші💛",
        image: "/assets/shirt.png",
        successText: "Маған өткен ең мощный момент",
        successImage: "/assets/shirt.jpg"
    },

    {
        type: "final",
        text: "✨ Кішкентай ғана болсада, Сәлде болсын қуанттым деп ойлаймын. 💛"
    }
];

let step = 0;

const textEl = document.querySelector(".quest-text");
const actionsEl = document.querySelector(".quest-actions");

renderStep();

function renderStep() {
    const q = quiz[step];
    textEl.textContent = q.text;
    actionsEl.innerHTML = "";

    if (q.type === "start") {
        renderButton(q.button);
    }

    if (q.type === "choice") {
        renderChoices(q);
    }

    if (q.type === "multi") {
        renderMulti(q);
    }

    if (q.type === "input") {
        renderInput(q);
    }

    if (q.type === "image") {
        renderImageTask(q);
    }

    if (q.type === "final") {
        // можно включить fireworks 🎆
    }
}

function nextStep() {
    step++;
    renderStep();
}

function renderButton(text) {
    const btn = document.createElement("button");
    btn.className = "quest-btn";
    btn.textContent = text;
    btn.onclick = nextStep;
    actionsEl.appendChild(btn);
}

function renderChoices(q) {
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quest-btn";
        btn.textContent = opt;

        btn.onclick = () => {
            if (q.correct.includes(opt)) {
                showSuccess(q.successText, q.successImage);
            } else {
                btn.style.opacity = 0.4;
            }
        };

        actionsEl.appendChild(btn);
    });
}

function renderInput(q) {
  const input = document.createElement("input");
  input.placeholder = "Жауапты жаз...";
  input.style.padding = "12px";
  input.style.borderRadius = "20px";

  const btn = document.createElement("button");
  btn.className = "quest-btn";
  btn.textContent = "Жіберу";

  btn.onclick = () => {
    const userAnswer = input.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    const correctAnswer = q.answer
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    if (userAnswer === correctAnswer) {
      showSuccess(q.successText, q.successImage);
    } else {
      input.style.border = "2px solid red";
      input.style.animation = "shake 0.3s";
    }
  };

  actionsEl.append(input, btn);
}


function renderMulti(q) {
  let answered = false; // 🔒 қорғаныс

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quest-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      if (answered) return; // ❌ екінші рет басуға болмайды
      answered = true;

      btn.classList.add("active");

      showSuccess(
        q.successText,
        q.successImage
      );
    };

    actionsEl.appendChild(btn);
  });
}


function renderImageTask(q) {
    const wrapper = document.createElement("div");
    wrapper.className = "quest-image-task";

    wrapper.innerHTML = `
    <img src="${q.image}" class="shirt-img">
    <button class="pocket-btn"></button>
  `;

    wrapper.querySelector(".pocket-btn").onclick = () => {
        showSuccess(
            q.successText,
            q.successImage
        );
    };

    actionsEl.appendChild(wrapper);
}

const overlay = document.querySelector(".success-overlay");
const overlayImg = document.querySelector(".success-img");
const overlayText = document.querySelector(".success-text");

function showSuccess(message, image) {
    overlayImg.src = image;
    overlayText.textContent = message;

    overlay.classList.remove("hidden");

    // 🎆 салют
    if (window.launchFireworks) {
        launchFireworks();
    }

    setTimeout(() => {
        overlay.classList.add("hidden");
        nextStep();
    }, 2500);
}
btn.onclick = () => {
    if (q.correct.includes(opt)) {
        showSuccess(
            "💛 Умничка моя! Дұрыс жауап 😌",
            "/assets/moments/1.jpg"
        );
    } else {
        btn.style.opacity = 0.4;
    }
};
btn.onclick = () => {
    if (input.value.trim().toUpperCase() === q.answer.toUpperCase()) {
        showSuccess(
            "✨ Горжусь тобой! Есіңде сақтапсың 🥹",
            "/assets/moments/2.jpg"
        );
    } else {
        input.style.border = "2px solid red";
    }
};
pocket.onclick = () => {
    showSuccess(
        "🎧 Таптың! Сен нағыз внимательная 💛",
        "/assets/moments/3.jpg"
    );
};