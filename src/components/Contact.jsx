import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { FiMail, FiLinkedin, FiGithub, FiDownload, FiArrowRight, FiSend, FiPhone } from 'react-icons/fi';
import './Contact.css';

const LINKS = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'mohanty.subrat.sm@gmail.com',
    href: 'mailto:mohanty.subrat.sm@gmail.com',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91-7008683350',
    href: 'tel:+917008683350',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/subratmohanty',
    href: 'https://linkedin.com/in/subratmohanty',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/isubratmohanty',
    href: 'https://github.com/isubratmohanty',
  },
];

export default function Contact() {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Subrat,\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`
    );
    window.open(`mailto:mohanty.subrat.sm@gmail.com?subject=${subject}&body=${body}`, '_self');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={ref} className={`contact section-reveal ${inView ? 'is-visible' : ''}`}>
      <p className="section-title">Contact</p>
      <h2 className="section-heading">Need someone who owns production reliability?</h2>

      <div className="contact__layout">
        <div className="contact__form-side">
          <p className="contact__intro">
            Looking for an SRE who can own your production reliability? Need DevOps
            automation or cloud cost optimization? Drop me a message.
          </p>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name" className="contact__label">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="contact__input"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="contact__input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message" className="contact__label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="contact__input contact__textarea"
                placeholder="Tell me about the role or project..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="contact__submit" disabled={sent}>
              {sent ? (
                <>Sent! Check your mail client</>
              ) : (
                <>
                  <FiSend /> Send message
                </>
              )}
            </button>
          </form>
        </div>

        <div className="contact__links-side">
          <div className="contact__cards">
            {LINKS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__card"
              >
                <div className="contact__card-icon">
                  <Icon />
                </div>
                <div className="contact__card-info">
                  <span className="contact__card-label">{label}</span>
                  <span className="contact__card-value">{value}</span>
                </div>
                <FiArrowRight className="contact__card-arrow" />
              </a>
            ))}
          </div>
          <a href="/resume.pdf" download className="contact__resume-btn">
            <FiDownload />
            <span>Download resume</span>
            <FiArrowRight className="contact__resume-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
