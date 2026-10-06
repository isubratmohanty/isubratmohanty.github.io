import { useRef, useEffect } from 'react';
import './GridBackground.css';

const CELL = 48;
const MOUSE_RADIUS = 160;
const MOUSE_PUSH = 10;
const WAVE_AMP = 1.8;
const WAVE_SPEED = 0.008;
const WAVE_FREQ = 0.05;
const CONNECT_DIST = 55;
const COLOR_REFRESH_MS = 1000;

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId;
    let w, h, cols, rows;
    let frame = 0;

    let accentRgb = [34, 211, 238];
    let lastColorRefresh = 0;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function refreshAccentColor() {
      const now = performance.now();
      if (now - lastColorRefresh < COLOR_REFRESH_MS) return;
      lastColorRefresh = now;
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#22d3ee';
      const m = hex.replace('#', '').match(/.{2}/g);
      accentRgb = m ? m.map((c) => parseInt(c, 16)) : [34, 211, 238];
    }

    function dist(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMouseMove(e) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    }

    function onMouseLeave() {
      mouse.tx = -9999;
      mouse.ty = -9999;
    }

    function draw() {
      frame++;
      // Skip every other frame for performance
      if (frame % 2 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      refreshAccentColor();
      const [r, g, b] = accentRgb;

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      // Grid lines
      ctx.strokeStyle = `rgba(${r},${g},${b},0.025)`;
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let rw = 0; rw <= rows; rw++) {
        const y = rw * CELL;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Grid dots with wave + mouse
      const activeDots = [];
      const time = frame * 0.5;

      for (let c = 0; c <= cols; c++) {
        for (let rw = 0; rw <= rows; rw++) {
          const baseX = c * CELL;
          const baseY = rw * CELL;

          let dx = 0, dy = 0;
          if (!reducedMotion) {
            dx = Math.sin(baseY * WAVE_FREQ + time * WAVE_SPEED) * WAVE_AMP;
            dy = Math.cos(baseX * WAVE_FREQ + time * WAVE_SPEED * 0.7) * WAVE_AMP;
          }

          const d = dist(baseX, baseY, mouse.x, mouse.y);
          let influence = 0;

          if (d < MOUSE_RADIUS) {
            influence = 1 - d / MOUSE_RADIUS;
            const power = influence * influence;
            const angle = Math.atan2(baseY - mouse.y, baseX - mouse.x);
            dx += Math.cos(angle) * MOUSE_PUSH * power;
            dy += Math.sin(angle) * MOUSE_PUSH * power;
          }

          const finalX = baseX + dx;
          const finalY = baseY + dy;
          const alpha = 0.06 + influence * 0.4;
          const radius = 0.8 + influence * 2.5;

          if (influence > 0.15) {
            activeDots.push({ x: finalX, y: finalY, influence });
          }

          ctx.beginPath();
          ctx.arc(finalX, finalY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }

      // Connection lines (only near mouse)
      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const a = activeDots[i];
          const bDot = activeDots[j];
          const d = dist(a.x, a.y, bDot.x, bDot.y);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * Math.min(a.influence, bDot.influence) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bDot.x, bDot.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Subtle mouse glow
      if (mouse.x > -1000) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.04)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - MOUSE_RADIUS, mouse.y - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="grid-bg" aria-hidden />;
}
