import { useState, useEffect } from 'react';

/**
 * useSectionProgress
 * Tracks which section is currently in view and the overall scroll progress (0 to 1).
 */
export function useSectionProgress() {
  const [state, setState] = useState({
    activeSection: 'home',
    progress: 0,
    sectionIndex: 0,
  });

  useEffect(() => {
    const sections = ['home', 'work', 'about', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      let activeSection = 'home';
      let sectionIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            activeSection = sections[i];
            sectionIndex = i;
          }
        }
      }

      setState({ activeSection, progress, sectionIndex });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return state;
}
