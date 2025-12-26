const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;

// громкость
music.volume = 0.15;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    musicBtn.textContent = "🔈";
  } else {
    music.pause();
    musicBtn.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});
