// Переход со стартового экрана
function goHome() {
  window.location.href = "home.html";
}
// ===== Mark return to home =====
document.addEventListener("click", (e) => {
  const homeLink = e.target.closest("a[data-home]");
  if (homeLink) {
    localStorage.setItem("returnToHome", "true");
  }
});
// ===== Page fade-in =====
window.addEventListener("load", () => {
  document.body.classList.add("page-visible");
});

// ===== Page fade-out on link click =====
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link || link.target === "_blank") return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;

  e.preventDefault();

  document.body.classList.remove("page-visible");

  setTimeout(() => {
    window.location.href = href;
  }, 600); // должно совпадать с transition
});
// ===== Play return animation =====
window.addEventListener("load", () => {
  if (localStorage.getItem("returnToHome")) {
    document.querySelector(".home")?.classList.add("returning");
    localStorage.removeItem("returnToHome");
  }
});
