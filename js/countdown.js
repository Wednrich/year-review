const dayBox = document.getElementById("day-box");
const hrBox = document.getElementById("hr-box");
const minBox = document.getElementById("min-box");
const secBox = document.getElementById("sec-box");
const yearEl = document.getElementById("year");

// ближайший Новый год
const now = new Date();
const targetYear = now.getFullYear() + 1;
yearEl.textContent = targetYear;

const endDate = new Date(targetYear, 0, 1, 0, 0, 0).getTime();

function countdown() {
  const now = new Date().getTime();
  const diff = endDate - now;

  if (diff <= 0) return;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  dayBox.textContent = String(Math.floor(diff / day)).padStart(2, "0");
  hrBox.textContent = String(Math.floor((diff % day) / hour)).padStart(2, "0");
  minBox.textContent = String(Math.floor((diff % hour) / minute)).padStart(2, "0");
  secBox.textContent = String(Math.floor((diff % minute) / second)).padStart(2, "0");
}

setInterval(countdown, 1000);
countdown();
