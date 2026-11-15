import { useState, useEffect } from 'react';
import { content } from '../data/content.js';
import MagneticButton from './MagneticButton.jsx';
import CynxLogo from './CynxLogo.jsx';

export default function Nav({ activeSection, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top of the page
      if (currentScrollY < 60) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY = currentScrollY;
        return;
      }

      setIsScrolled(true);

      // Keep visible if mobile drawer is currently open
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      // Threshold of 8px to prevent micro jitter
      if (Math.abs(delta) > 8) {
        if (delta > 0) {
          // Scrolling down -> hide
          setIsVisible(false);
        } else {
          // Scrolling up -> show
          setIsVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`cynx-navbar ${isScrolled ? 'is-scrolled' : ''} ${!isVisible ? 'is-hidden' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="brand-link"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="CYNX Home"
          data-cursor="HOME"
        >
          <CynxLogo width={64} height={36} className="cynx-logo-svg" />
        </a>

        {/* Center Menu */}
        <nav className={`nav-pill-menu ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main Navigation">
          {content.nav.links.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-item ${isActive ? 'is-active' : ''}`}
                onClick={(e) => handleLinkClick(e, id)}
                data-cursor="NAV"
              >
                <span className="nav-text">{label}</span>
                {isActive && <span className="active-shard-line" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="nav-right-controls">
          <MagneticButton
            href="#contact"
            className="nav-cta-btn"
            onClick={(e) => handleLinkClick(e, 'contact')}
            data-cursor="SYNC"
          >
            {content.nav.cta} <span aria-hidden="true">→</span>
          </MagneticButton>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
