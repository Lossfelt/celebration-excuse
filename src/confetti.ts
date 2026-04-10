// Lightweight canvas-based confetti animation

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: "rect" | "circle";
  opacity: number;
}

const COLORS = [
  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
  "#9B5DE5", "#F15BB5", "#FF9F1C", "#00F5D4",
];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let animationId: number | null = null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle(): Particle {
  return {
    x: Math.random() * (canvas?.width ?? window.innerWidth),
    y: -10 - Math.random() * 40,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    shape: Math.random() > 0.5 ? "rect" : "circle",
    opacity: 1,
  };
}

function drawParticle(p: Particle) {
  if (!ctx) return;
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.fillStyle = p.color;

  if (p.shape === "rect") {
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function animate() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // gravity
    p.vx *= 0.99; // air resistance
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height + 20) {
      p.opacity -= 0.02;
    }

    if (p.opacity <= 0) {
      particles.splice(i, 1);
      continue;
    }

    drawParticle(p);
  }

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    animationId = null;
  }
}

export function initConfetti(canvasId: string) {
  canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

export function burstConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    particles.push(createParticle());
  }
  if (animationId === null) {
    animate();
  }
}
