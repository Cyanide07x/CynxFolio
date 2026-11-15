import { useState, useEffect } from 'react';

/**
 * useDeviceTier
 * Determines device performance tier, WebGL availability, and motion preferences.
 * Returns: { tier: 'high' | 'medium' | 'low', isMobile, isWebGLAvailable, prefersReducedMotion }
 */
export function useDeviceTier() {
  const [deviceInfo, setDeviceInfo] = useState(() => {
    const isClient = typeof window !== 'undefined';
    const isMobile = isClient ? window.innerWidth <= 768 || /Android|iPhone|iPad/i.test(navigator.userAgent) : false;
    const prefersReducedMotion = isClient ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    // Check WebGL support
    let isWebGLAvailable = false;
    if (isClient) {
      try {
        const canvas = document.createElement('canvas');
        isWebGLAvailable = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        isWebGLAvailable = false;
      }
    }

    // Determine performance tier
    let tier = 'high';
    if (!isWebGLAvailable || prefersReducedMotion) {
      tier = 'low';
    } else if (isMobile) {
      tier = 'medium';
    } else if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      tier = 'medium';
    }

    return {
      tier,
      isMobile,
      isWebGLAvailable,
      prefersReducedMotion,
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setDeviceInfo((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
        tier: e.matches ? 'low' : prev.tier,
      }));
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setDeviceInfo((prev) => ({
        ...prev,
        isMobile,
      }));
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
}
