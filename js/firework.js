/* =================================================
   FIREWORKS — REALISTIC ROCKET + LINE EXPLOSION
   ================================================= */

const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
let animationStarted = false;

/* ================= RESIZE ================= */
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const rand = (min, max) => Math.random() * (max - min) + min;

/* ================= COLORS ================= */
const FIREWORK_COLORS = [
    "rgba(149, 7, 147, 1)",
    "rgba(193, 106, 0, 1)", // 🔴 тёмно-красный
    "rgba(208, 39, 39, 1)" // 🔴 тёмно-красный
];

function getFireworkColor() {
    return FIREWORK_COLORS[
        Math.floor(Math.random() * FIREWORK_COLORS.length)
    ];
}

/* ================= FLASH ================= */
let flashes = [];

function flash(x, y, color) {
    flashes.push({
        x,
        y,
        r: 0,
        alpha: 1,
        color
    });
}

/* ================= ROCKET ================= */
class Rocket {
    constructor() {
        this.x = rand(canvas.width * 0.2, canvas.width * 0.8);
        this.y = canvas.height;

        // скорость старта (быстро)
        this.vy = rand(-14, -18);

        this.color = getFireworkColor();
        this.exploded = false;

        // ГАРАНТИРОВАННАЯ ВИДИМАЯ ВЫСОТА ВЗРЫВА
        this.explodeY = rand(canvas.height * 0.25, canvas.height * 0.4);
    }

    update() {
        this.y += this.vy;
        this.vy += 0.08; // гравитация

        if (this.y <= this.explodeY && !this.exploded) {
            this.exploded = true;
            flash(this.x, this.y, this.color);
            explode(this.x, this.y, this.color);
        }
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 30); // длинный след
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
}

/* ================= PARTICLE (LINE) ================= */
class Particle {
    constructor(x, y, color, depth) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(3, 8) * depth;

        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.alpha = 1;
        this.fade = rand(0.01, 0.02);
        this.gravity = 0.04 * depth;

        this.color = color;
        this.width = rand(1, 2) * depth;
    }

    update() {
        this.px = this.x;
        this.py = this.y;

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        this.alpha -= this.fade;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

/* ================= EXPLOSION ================= */
let particles = [];

function explode(x, y, color) {
    const layers = 3;

    for (let l = 1; l <= layers; l++) {
        for (let i = 0; i < 180 * l; i++) {
            particles.push(
                new Particle(x, y, color, l * 0.6)
            );
        }
    }
}

/* ================= SCENE ================= */
let rockets = [];
let running = false;

function animate() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ракеты
    rockets.forEach((r, i) => {
        r.update();
        r.draw();
        if (r.exploded) rockets.splice(i, 1);
    });

    // Вспышки (РИСУЕМ ПЕРВЫМИ)
    flashes.forEach((f, i) => {
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = f.color;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        f.r += 6;
        f.alpha -= 0.08;

        if (f.alpha <= 0) flashes.splice(i, 1);
    });

    // Частицы
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

/* ================= BUTTON ================= */
document.getElementById("firework-btn").addEventListener("click", () => {
    canvas.style.display = "block";
    running = true;

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            rockets.push(new Rocket());
        }, i * 300); // задержка между выстрелами
    }

    if (!animationStarted) {
        animationStarted = true;
        animate();
    }
});