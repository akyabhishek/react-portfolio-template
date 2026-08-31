import { useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const DARK_BG = "#0a0a0a";
const LIGHT_BG = "#e8e8e8";
const MAX_PARTICLES = 100;
const CONNECTION_RADIUS = 120;
const CONNECTION_RADIUS_SQ = CONNECTION_RADIUS * CONNECTION_RADIUS;

const THEME = {
  dark: {
    particle: "rgba(255, 255, 255, 0.5)",
    line: (o: number) => `rgba(255, 255, 255, ${o * 0.3})`,
    lineHover: (o: number) => `rgba(52, 211, 153, ${o * 0.7})`,
    bg: DARK_BG,
  },
  light: {
    particle: "rgba(0, 0, 0, 0.35)",
    line: (o: number) => `rgba(0, 0, 0, ${o * 0.15})`,
    lineHover: (o: number) => `rgba(5, 150, 105, ${o * 0.6})`,
    bg: LIGHT_BG,
  },
};

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    mouse: { x: number | null; y: number | null; radius: number },
  ) {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0)
      this.directionY = -this.directionY;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (dx / distance) * force * 5;
        this.y -= (dy / distance) * force * 5;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

export default function AetherFlowBackground({
  enabled,
}: {
  enabled: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const themeRef = useRef(isDark);
  themeRef.current = isDark;

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 140,
    };

    function init() {
      particles = [];
      const count = Math.min(
        (canvas!.height * canvas!.width) / 12000,
        MAX_PARTICLES,
      );
      const colors = themeRef.current ? THEME.dark : THEME.light;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const speed = 0.1 + (size / 3) * 0.15;
        const directionX = (Math.random() - 0.5) * speed * 2;
        const directionY = (Math.random() - 0.5) * speed * 2;
        particles.push(
          new Particle(x, y, directionX, directionY, size, colors.particle),
        );
      }
    }

    const resizeCanvas = () => {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      init();
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const connect = () => {
      const colors = themeRef.current ? THEME.dark : THEME.light;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_RADIUS_SQ) {
            const opacity = 1 - distSq / CONNECTION_RADIUS_SQ;
            const dxM = particles[a].x - (mouse.x ?? 0);
            const dyM = particles[a].y - (mouse.y ?? 0);
            const distMouse = Math.sqrt(dxM * dxM + dyM * dyM);

            ctx!.strokeStyle =
              mouse.x !== null && distMouse < mouse.radius
                ? colors.lineHover(opacity)
                : colors.line(opacity);
            ctx!.lineWidth = 0.5 + opacity * 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const colors = themeRef.current ? THEME.dark : THEME.light;
      ctx!.fillStyle = colors.bg;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Live-update particle colors on theme change
      for (const p of particles) {
        p.color = colors.particle;
        p.update(canvas!, ctx!, mouse);
      }
      connect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 0, background: isDark ? DARK_BG : LIGHT_BG }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
