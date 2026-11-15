import { useState, useEffect } from 'react';

/**
 * useMouse
 * Tracks mouse position, normalized coordinates (-1 to 1), and velocity.
 */
export function useMouse() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    normX: 0, // -1 to 1
    normY: 0, // -1 to 1
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = event.clientX;
      const y = event.clientY;

      setMouse({
        x,
        y,
        normX: (x / innerWidth) * 2 - 1,
        normY: -(y / innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
