import { content } from '../data/content.js';

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="cynx-footer section-padding">
      <div className="footer-container">
        <p className="footer-copyright-text">{footer.copy}</p>

        <nav className="footer-links-row" aria-label="Social & Resume Links">
          {footer.links.map((link) => {
            const resolvedUrl = link.url.startsWith('./')
              ? `${import.meta.env.BASE_URL}${link.url.replace(/^\.\//, '')}`
              : link.url;

            return (
              <a
                key={link.label}
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`footer-link ${link.isPill ? 'pill-resume-link' : ''}`}
                data-cursor="OPEN"
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
