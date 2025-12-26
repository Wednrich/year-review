document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".gift-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.gift;
      const screen = document.getElementById(id);

      screen.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll(".gift-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const screen = btn.closest(".gift-modal");
      screen.classList.remove("open");
      document.body.style.overflow = "auto";
    });
  });

});
