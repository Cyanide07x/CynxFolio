import { useEffect, useRef } from 'react';
import { useMouse } from '../hooks/useMouse.js';
import { config } from '../config.js';

/**
 * ShardSceneCanvas
 * High-performance, hardware-accelerated 60fps canvas that renders the floating
 * low-poly crimson shards in real-time, reacting smoothly to mouse parallax.
 * Runs with 50% calmer, subtle kinematics and smooth lerped inertia.
 */
function ShardSceneCanvas({ mouse }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef(mouse);

  // Keep mouseRef updated without tearing down the shard simulation
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create low-poly faceted crimson shards with calm drift (50% reduced reactivity)
    const shards = Array.from({ length: 36 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: 0.2 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.25, // 50% calmer drift speed
      vy: (Math.random() - 0.5) * 0.25, // 50% calmer drift speed
      size: 16 + Math.random() * 30,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.009, // 50% calmer rotation
      color:
        i % 8 === 0
          ? config.theme.lightGrayShard
          : i % 3 === 0
          ? config.theme.brightCrimson
          : i % 2 === 0
          ? config.theme.crimson
          : config.theme.deepMaroon,
    }));

    let curMx = 0;
    let curMy = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const inSync = typeof document !== 'undefined' && document.body.classList.contains('in-sync');
      
      // Target parallax reduced by 50% (14px max instead of 28px)
      const targetMx = inSync ? 0 : (mouseRef.current?.normX || 0) * 14;
      const targetMy = inSync ? 0 : -(mouseRef.current?.normY || 0) * 14;

      // Smooth lerp for silky, non-jarring parallax response
      curMx += (targetMx - curMx) * 0.04;
      curMy += (targetMy - curMy) * 0.04;

      shards.forEach((s) => {
        if (!inSync) {
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vrot;

          if (s.x < -60) s.x = canvas.width + 60;
          if (s.x > canvas.width + 60) s.x = -60;
          if (s.y < -60) s.y = canvas.height + 60;
          if (s.y > canvas.height + 60) s.y = -60;
        }

        ctx.save();
        ctx.translate(s.x + curMx * s.z, s.y + curMy * s.z);
        ctx.rotate(inSync ? 0 : s.rot);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.55 * s.z;

        // Draw low-poly shard triangle
        ctx.beginPath();
        ctx.moveTo(0, -s.size * 0.9);
        ctx.lineTo(s.size * 0.65, s.size * 0.75);
        ctx.lineTo(-s.size * 0.65, s.size * 0.75);
        ctx.closePath();
        ctx.fill();

        // Shard facet edge
        ctx.strokeStyle = config.theme.brightCrimson;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.25 * s.z;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed-shard-canvas" aria-hidden="true" />;
}

/**
 * Persistent 3D Scene Root
 */
export default function Scene() {
  const mouse = useMouse();

  return (
    <div className="scene-background-wrapper" aria-hidden="true">
      <ShardSceneCanvas mouse={mouse} />
      <div className="scene-vignette" />
    </div>
  );
}
