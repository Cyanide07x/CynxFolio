import { useState, useEffect } from 'react';
import Scene from './three/Scene.jsx';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import ShardTransition from './components/ShardTransition.jsx';
import Home from './sections/Home.jsx';
import Work from './sections/Work.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './components/Footer.jsx';
import { useLenis } from './hooks/useLenis.js';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [transitionTrigger, setTransitionTrigger] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);

  useLenis();

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easter Egg: Press 'S' to force everything into DEAD SYNC for 3 seconds
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 's' || e.key === 'S') {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
        document.body.classList.add('in-sync');
        setTimeout(() => {
          document.body.classList.remove('in-sync');
        }, 3000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (id) => {
    setPendingTarget(id);
    setTransitionTrigger(true);
  };

  const handleTransitionComplete = () => {
    setTransitionTrigger(false);
    if (pendingTarget) {
      document.getElementById(pendingTarget)?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(pendingTarget);
      setPendingTarget(null);
    }
  };

  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Persistent 3D Shards Canvas (Fixed Background) */}
      <Scene />

      {/* Diagonal Shard Transition Curtain */}
      <ShardTransition trigger={transitionTrigger} onComplete={handleTransitionComplete} />

      <div className="portfolio-app-shell">
        <Nav activeSection={activeSection} onNavigate={handleNavigate} />

        <main id="portfolio-main">
          <Home onNavigate={handleNavigate} />
          <Work />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
