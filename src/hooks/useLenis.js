import { useEffect, useRef } from 'react';

/**
 * useLenis
 * Smooth inertia scroll manager.
 * Uses native smooth interpolation by default, and optionally attaches Lenis if installed in node_modules.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function initLenis() {
      try {
        // Use @vite-ignore to prevent Vite from failing compilation if lenis is not yet installed in node_modules
        const lenisPackage = 'lenis';
        const LenisModule = await import(/* @vite-ignore */ lenisPackage);
        const Lenis = LenisModule.default || LenisModule;

        if (!active || !Lenis) return;

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time) {
          if (!active) return;
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch {
        // Fallback: lenis package is not yet installed in node_modules.
        // Enable smooth scrolling natively without crashing.
        if (typeof document !== 'undefined') {
          document.documentElement.style.scrollBehavior = 'smooth';
        }
      }
    }

    initLenis();

    return () => {
      active = false;
      lenisRef.current?.destroy?.();
    };
  }, []);

  return lenisRef;
}
