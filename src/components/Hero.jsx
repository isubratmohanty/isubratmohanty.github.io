import { useTypingEffect } from '../hooks/useTypingEffect';
import { PORTFOLIO_METRICS } from '../data/portfolioData';
import TerminalLogs from './TerminalLogs';
import ParticleNetwork from './ParticleNetwork';
import './Hero.css';

const ROLES = [
  'Site Reliability Engineer',
  'Senior DevOps Engineer',
  'ML Platform Reliability Engineer',
  'Cloud Platform Engineer',
  'DevSecOps Engineer',
  'Cloud Infrastructure Engineer',
];

export default function Hero() {
  const typedRole = useTypingEffect(ROLES, { typeSpeed: 55, deleteSpeed: 30, pauseMs: 2200 });

  return (
    <header id="top" className="hero">
      <ParticleNetwork />
      <div className="hero__bg" aria-hidden />
      <div className="hero__content">
        <div className="hero__badge hero__anim hero__anim--1">
          <span className="hero__badge-dot" />
          Available for opportunities
        </div>
        <h1 className="hero__name hero__anim hero__anim--2">
          <span className="hero__greeting-text">Hi, I'm </span>
          <span className="hero__name-gradient">Subrat Mohanty</span>
        </h1>
        <p className="hero__typed hero__anim hero__anim--3">
          <span className="hero__typed-label">&gt; </span>
          <span className="hero__typed-text">{typedRole}</span>
          <span className="hero__typed-cursor">|</span>
        </p>
        <p className="hero__tagline hero__anim hero__anim--4">
          6+ years building and operating <em>production platforms</em> on AWS —
          reliability, ML infrastructure, automation, security & cost efficiency.
          70+ incidents handled. 500+ ML training runs and 100+ deployments each month.
        </p>
        <div className="hero__pill-strip hero__anim hero__anim--4b" aria-label="Key metrics">
          {PORTFOLIO_METRICS.map((metric, index) => (
            <span className="hero__pill" key={metric.label}>
              <span className={`hero__pill-dot hero__pill-dot--${index % 3 === 0 ? 'ok' : index % 3 === 1 ? 'run' : 'mon'}`} />
              {metric.value} {metric.label}
            </span>
          ))}
        </div>
        <div className="hero__cta hero__anim hero__anim--5">
          <a href="#projects" className="btn btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View my work
          </a>
          <a href="#contact" className="btn btn--outline">
            Get in touch
          </a>
          <a href="/resume.pdf" download="Subrat_Mohanty_Resume.pdf" className="btn btn--ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.35rem' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>
        <p className="hero__hint hero__anim hero__anim--6">
          Press <kbd>{typeof navigator !== 'undefined' && /Mac|iPad|iPhone/i.test(navigator.platform) ? '⌘' : 'Ctrl'}</kbd> + <kbd>K</kbd> to navigate
        </p>
        <TerminalLogs />
      </div>
    </header>
  );
}
