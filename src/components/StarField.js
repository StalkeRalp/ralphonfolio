'use client';
import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    let shootingStars = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = [];
      const count = Math.floor((w * h) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.2,
          alpha: Math.random(),
          speed: Math.random() * 0.003 + 0.001,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function addShootingStar() {
      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * w * 0.7,
          y: Math.random() * h * 0.4,
          len: Math.random() * 150 + 80,
          speed: Math.random() * 10 + 8,
          alpha: 1,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);

      // Nebula glow
      const grad1 = ctx.createRadialGradient(w * 0.25, h * 0.35, 0, w * 0.25, h * 0.35, w * 0.4);
      grad1.addColorStop(0, 'rgba(124,58,237,0.06)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(w * 0.75, h * 0.6, 0, w * 0.75, h * 0.6, w * 0.35);
      grad2.addColorStop(0, 'rgba(0,229,255,0.05)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.speed * 60 + s.phase) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * twinkle})`;
        ctx.fill();
      });

      // Shooting stars
      addShootingStar();
      shootingStars = shootingStars.filter((ss) => ss.alpha > 0.01);
      shootingStars.forEach((ss) => {
        ctx.save();
        ctx.translate(ss.x, ss.y);
        ctx.rotate(ss.angle);
        const grad = ctx.createLinearGradient(0, 0, ss.len, 0);
        grad.addColorStop(0, `rgba(0,229,255,0)`);
        grad.addColorStop(0.4, `rgba(0,229,255,${ss.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(ss.len, 0);
        ctx.stroke();
        ctx.restore();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.018;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', () => { resize(); initStars(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="star-canvas" />;
}
