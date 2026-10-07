import { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import './Nav.css';

const LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'AI Systems', href: '#ai-systems' },
  { label: 'Environment', href: '#environment' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll for nav background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on link click
  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close menu on scroll (mobile)
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a href="#top" className="nav__brand" aria-label="Back to top">
          <Logo className="nav__logo" size={32} />
        </a>
        <div className="nav__right">
          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav__link ${activeSection === href.slice(1) ? 'nav__link--active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {/* Mobile overlay */}
      {menuOpen && <div className="nav__overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
