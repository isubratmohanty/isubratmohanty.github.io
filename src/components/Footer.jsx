import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const SOCIALS = [
  { icon: FiGithub, href: 'https://github.com/isubratmohanty', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/subratmohanty', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:mohanty.subrat.sm@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <img src="/sm-logo-nav.png" alt="SM" className="footer__brand-logo" width={24} height={24} />
          <span className="footer__copy">
            &copy; {new Date().getFullYear()} Subrat Mohanty
          </span>
        </div>
        <div className="footer__center">
          <span className="footer__tagline">
            Keeping systems up so teams can ship <FiHeart className="footer__heart" />
          </span>
        </div>
        <div className="footer__right">
          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
