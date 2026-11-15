import { content } from '../data/content.js';
import MagneticButton from '../components/MagneticButton.jsx';
import Marquee from '../components/Marquee.jsx';
import SplitText from '../components/SplitText.jsx';

export default function Home({ onNavigate }) {
  const { home } = content;

  return (
    <section id="home" className="home-hero-section" aria-labelledby="home-headline">
      <div className="home-content-container section-padding">
        <div className="hero-text-block">
          <div className="hero-status-row">
            <p className="section-label typing-label">{home.label}</p>
            {home.availability && (
              <div className="hero-availability-pill" title="Currently open to opportunities">
                <span className="availability-dot" aria-hidden="true"></span>
                <span className="availability-text">{home.availability}</span>
              </div>
            )}
          </div>

          <h1 id="home-headline" className="hero-split-headline">
            <span className="headline-row">{home.headline.line1}</span>
            <SplitText text={home.headline.line2} tag="span" className="headline-row phase-row" isHeadline={true} />
            <SplitText text={home.headline.line3} tag="span" className="headline-row phase-row" isHeadline={true} />
          </h1>

          <p className="hero-lead-text">{home.description}</p>

          <div className="hero-button-group">
            <MagneticButton
              href="#work"
              className="primary-action-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('work');
              }}
              data-cursor="SYNC"
            >
              {home.ctaPrimary}
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="secondary-action-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              data-cursor="TALK"
            >
              {home.ctaSecondary}
            </MagneticButton>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
