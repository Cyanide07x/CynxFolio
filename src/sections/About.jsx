import { useRef } from 'react';
import { content } from '../data/content.js';

function TiltCard({ card }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `perspective(800px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    }
  };

  return (
    <article
      ref={cardRef}
      className="about-capability-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="SHARD"
    >
      <div className="card-light-sweep" aria-hidden="true" />
      <span className="card-numeric-badge">{card.number}</span>
      <h3 className="card-service-title">{card.title}</h3>
      <p className="card-service-description">{card.description}</p>
      {card.tags && (
        <div className="about-card-tags">
          {card.tags.map((tag) => (
            <span key={tag} className="about-card-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function About() {
  const { about } = content;

  return (
    <section id="about" className="about-identity-section page-section" aria-labelledby="about-heading">
      <div className="section-padding about-container">
        <p className="section-label">{about.label}</p>

        <h2 id="about-heading" className="about-headline">
          {about.headlinePrefix} <span className="crimson-highlight">{about.headlineHighlight}</span>
        </h2>

        <p className="about-biography-text">{about.description}</p>

        {about.techStack && (
          <div className="about-tech-stack-strip">
            <span className="tech-stack-label">// CORE TOOLKIT:</span>
            <div className="tech-stack-pills">
              {about.techStack.map((tech) => (
                <span key={tech} className="tech-stack-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="capabilities-card-grid">
          {about.cards.map((card) => (
            <TiltCard key={card.number} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
