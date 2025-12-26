const snowContainer = document.getElementById("snow");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = "❄";

  // случайная позиция и размер
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
  snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
  snowflake.style.opacity = Math.random();

  snowContainer.appendChild(snowflake);

  // удаляем после падения
  setTimeout(() => {
    snowflake.remove();
  }, 10000);
}

// создаём снег постоянно
setInterval(createSnowflake, 200);
