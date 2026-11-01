'use client';

import React, { useRef, useEffect } from 'react';

interface AnimatedCanvasPreviewProps {
  theme: string;
  className?: string;
  isHovered?: boolean;
}

export function AnimatedCanvasPreview({ theme, className = "", isHovered = false }: AnimatedCanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 360;
      canvas.height = canvas.parentElement?.clientHeight || 225;
    };
    resize();

    const render = () => {
      t += isHovered ? 0.04 : 0.015;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background Void
      ctx.fillStyle = '#060609';
      ctx.fillRect(0, 0, w, h);

      if (theme === 'shelf-hero') {
        // Floating 3D perspective cards
        const cx = w / 2;
        const cy = h / 2;

        // Radial glow
        const rad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.6);
        rad.addColorStop(0, 'rgba(139, 92, 246, 0.22)');
        rad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
        rad.addColorStop(1, 'transparent');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, w, h);

        // Three angled cards
        [-1, 0, 1].forEach((pos) => {
          const offsetX = pos * (w * 0.26);
          const offsetY = Math.sin(t + pos * 1.5) * 8 + (pos === 0 ? -10 : 10);
          const cardW = w * 0.24;
          const cardH = h * 0.55;

          ctx.save();
          ctx.translate(cx + offsetX, cy + offsetY);
          ctx.rotate((pos * 0.08) + (isHovered ? Math.sin(t) * 0.04 : 0));

          // Card shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(-cardW / 2 + 4, -cardH / 2 + 8, cardW, cardH);

          // Card Body
          ctx.fillStyle = pos === 0 ? 'rgba(20, 20, 32, 0.85)' : 'rgba(14, 14, 22, 0.75)';
          ctx.strokeStyle = pos === 0 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = pos === 0 ? 1.5 : 1;

          ctx.beginPath();
          ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 8);
          ctx.fill();
          ctx.stroke();

          // Card lines (Skeleton UI)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(-cardW / 2 + 10, -cardH / 2 + 15, cardW * 0.5, 4);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillRect(-cardW / 2 + 10, -cardH / 2 + 25, cardW * 0.7, 3);
          ctx.fillRect(-cardW / 2 + 10, -cardH / 2 + 32, cardW * 0.6, 3);

          ctx.restore();
        });
      } else if (theme === 'synaptic-forge') {
        // Neural Lattice Nodes
        const cx = w / 2;
        const cy = h / 2;
        const count = 16;
        const pts: Array<{ x: number; y: number }> = [];

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + t * 0.4;
          const dist = (w * 0.28) + Math.sin(t * 1.5 + i) * 20;
          pts.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * (dist * 0.7),
          });
        }

        // Connections
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            if (Math.hypot(dx, dy) < 110) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }

        // Center Pulsing Core
        const coreGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 40);
        coreGlow.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();

        // Points
        pts.forEach((p) => {
          ctx.fillStyle = '#38BDF8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (theme === 'neon-pulse') {
        // Cyber Tunnel Perspective Lines
        const cx = w / 2;
        const cy = h / 2;
        const numLines = 14;

        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * Math.PI * 2;
          ctx.strokeStyle = i % 2 === 0 ? 'rgba(236, 72, 153, 0.4)' : 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 10);
          ctx.lineTo(cx + Math.cos(angle) * w, cy + Math.sin(angle) * h);
          ctx.stroke();
        }

        // Expanding concentric rings
        for (let r = 0; r < 4; r++) {
          const ringRad = ((t * 40 + r * 50) % (w * 0.6));
          ctx.strokeStyle = `rgba(139, 92, 246, ${Math.max(0, 1 - ringRad / (w * 0.6)) * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, ringRad, ringRad * 0.65, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        // Universal Modern Sleek Geometric Mesh & Ambient Waves
        const cx = w / 2;
        const cy = h / 2;

        const rad = ctx.createRadialGradient(cx, cy, 5, cx, cy, w * 0.5);
        rad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
        rad.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
        rad.addColorStop(1, 'transparent');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, w, h);

        // Sinusoidal flowing ribbons
        for (let line = 0; line < 3; line++) {
          ctx.beginPath();
          ctx.strokeStyle = line === 0 ? 'rgba(139, 92, 246, 0.5)' : line === 1 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1.5;

          for (let x = 0; x < w; x += 10) {
            const y = cy + Math.sin(x * 0.02 + t + line) * (20 + line * 8) + (line - 1) * 20;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [theme, isHovered]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
