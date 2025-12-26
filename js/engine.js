document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const startScreen = document.getElementById("start-screen");
  const mainScreen = document.getElementById("main-screen");

  if (!startBtn || !startScreen || !mainScreen) {
    console.error("START elements not found");
    return;
  }

  startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    mainScreen.style.display = "block";
  });
});
