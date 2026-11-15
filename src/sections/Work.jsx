import { content } from '../data/content.js';
import PhoneMockup from '../components/PhoneMockup.jsx';
import CynxKageMockup from '../components/CynxKageMockup.jsx';

export default function Work() {
  const { work } = content;

  return (
    <section id="work" className="work-showcase-section page-section" aria-labelledby="work-heading">
      <div className="section-padding work-header-block">
        <p className="section-label">{work.label}</p>
        <h2 id="work-heading">{work.headline}</h2>
        <p className="work-sub-copy">{work.sub}</p>
      </div>

      <div className="section-padding projects-list">
        {work.projects.map((project) => (
          <article key={project.id} className="project-feature-card" aria-labelledby={`title-${project.id}`}>
            {/* Left Content Column */}
            <div className="project-details-column">
              <div className="project-index-badge">
                <span className="badge-bullet">◆</span>
                <span className="badge-text">{project.index}</span>
              </div>

              <h3 id={`title-${project.id}`} className="project-title-heading">
                {project.name}
              </h3>

              <p className="project-summary-copy">{project.summary}</p>

              <ul className="project-bullet-list">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span className="crimson-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="project-tags-row" aria-label="Project technologies">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <div className="project-actions-row">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github-btn"
                    data-cursor="REPO"
                  >
                    <span>View on GitHub</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              )}
            </div>

            {/* Right Media Column - Interactive Code-Rendered Mockups */}
            <div className="project-mockup-column">
              {project.id === 'cynx-kage' ? (
                <CynxKageMockup />
              ) : (
                <PhoneMockup project={project} />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
