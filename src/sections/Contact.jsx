import { useState } from 'react';
import { content } from '../data/content.js';
import MagneticButton from '../components/MagneticButton.jsx';

export default function Contact() {
  const { contact } = content;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [shardBurst, setShardBurst] = useState(false);
  const [discordNotice, setDiscordNotice] = useState('');
  const [emailNotice, setEmailNotice] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShardBurst(true);

    setTimeout(() => {
      setSubmitted(true);
      setShardBurst(false);
    }, 450);
  };

  const copyDiscord = () => {
    navigator.clipboard?.writeText(contact.discordUser);
    setDiscordNotice('Copied username!');
    setTimeout(() => setDiscordNotice(''), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(contact.email);
    setEmailNotice('Copied email!');
    setTimeout(() => setEmailNotice(''), 3000);
  };

  return (
    <section id="contact" className="contact-interaction-section page-section section-padding" aria-labelledby="contact-heading">
      <div className="contact-two-column-layout">
        {/* Left Column: Direct Info */}
        <div className="contact-narrative-column">
          <p className="section-label">{contact.label}</p>

          <h2 id="contact-heading" className="contact-converging-headline">
            {contact.headlinePrefix} <br />
            <span className="crimson-highlight">{contact.headlineHighlight}</span>
          </h2>

          <p className="contact-intro-text">{contact.text}</p>

          <dl className="contact-metadata-list">
            <div className="metadata-item">
              <dt>EMAIL</dt>
              <dd className="contact-copyable-field">
                <a href={`mailto:${contact.email}`} data-cursor="EMAIL">
                  {contact.email}
                </a>
                <button
                  type="button"
                  className="inline-copy-btn"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                  data-cursor="COPY"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="1" ry="1"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>{emailNotice ? 'Copied!' : 'Copy'}</span>
                </button>
                {emailNotice && <span className="copy-confirmation">{emailNotice}</span>}
              </dd>
            </div>

            <div className="metadata-item">
              <dt>LOCATION</dt>
              <dd>{contact.location}</dd>
            </div>

            <div className="metadata-item">
              <dt>ELSEWHERE</dt>
              <dd>
                <button type="button" className="discord-copy-btn" onClick={copyDiscord} data-cursor="COPY">
                  {contact.elsewhere} <span className="user-handle">({contact.discordUser})</span>
                </button>
                {discordNotice && <span className="copy-confirmation">{discordNotice}</span>}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="contact-form-column">
          {submitted ? (
            <div className="submission-success-banner" role="status">
              <span className="success-shard-icon">◆</span>
              <h3>BACK IN SYNC</h3>
              <p>{contact.form.successMessage}</p>
              <MagneticButton
                className="reset-form-btn"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
              >
                Send another message
              </MagneticButton>
            </div>
          ) : (
            <form className={`cynx-contact-form ${shardBurst ? 'shard-burst-active' : ''}`} onSubmit={handleSubmit}>
              <div className="form-field-group">
                <label htmlFor="user-name">NAME</label>
                <input
                  id="user-name"
                  name="name"
                  type="text"
                  required
                  placeholder={contact.form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="user-email">EMAIL</label>
                <input
                  id="user-email"
                  name="email"
                  type="email"
                  required
                  placeholder={contact.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="user-message">MESSAGE</label>
                <textarea
                  id="user-message"
                  name="message"
                  rows="5"
                  required
                  placeholder={contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <MagneticButton type="submit" className="form-submit-btn" data-cursor="SEND">
                {contact.form.submitButton}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
