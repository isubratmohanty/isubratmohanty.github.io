import { FiActivity, FiDatabase, FiGitBranch, FiSearch } from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { AI_SYSTEMS } from '../data/portfolioData';
import './AIAchievements.css';

const ICONS = {
  'log-agent': FiActivity,
  'incident-rag': FiSearch,
  'security-agent': FiGitBranch,
  'database-agent': FiDatabase,
};

function AISystemCard({ system, index }) {
  const tiltRef = useTilt();
  const Icon = ICONS[system.id];

  return (
    <article className="ai-system" ref={tiltRef}>
      <div className="ai-system__topline">
        <div className="ai-system__icon"><Icon aria-hidden /></div>
        <span className="ai-system__status">
          <span /> {system.status}
        </span>
      </div>
      <span className="ai-system__number">{String(index + 1).padStart(2, '0')}</span>
      <p className="ai-system__eyebrow">{system.eyebrow}</p>
      <h3>{system.title}</h3>
      <p className="ai-system__description">{system.description}</p>

      <div className="ai-system__architecture" aria-label={`${system.title} architecture`}>
        {system.architecture.map((step, stepIndex) => (
          <div className="ai-system__architecture-step" key={step}>
            <span>{step}</span>
            {stepIndex < system.architecture.length - 1 && <b aria-hidden>→</b>}
          </div>
        ))}
      </div>

      <div className="ai-system__proof">
        <span>Scope / outcome</span>
        <p>{system.proof}</p>
      </div>

      <ul className="ai-system__tags" aria-label={`${system.title} technologies`}>
        {system.stack.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

export default function AIAchievements() {
  const [ref, inView] = useInView();

  return (
    <section
      id="ai-systems"
      ref={ref}
      className={`ai-achievements section-reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="ai-achievements__heading">
        <div>
          <p className="section-title">Operational AI engineering</p>
          <h2 className="section-heading">AI systems built for operational outcomes</h2>
        </div>
        <p>
          These are separate applications I built. ELK and Site24x7 are monitoring products I
          operated; they are not represented as systems I created.
        </p>
      </div>

      <div className="ai-achievements__notice">
        <strong>Sanitized architecture</strong>
        <span>
          Proprietary code, customer data, credentials, internal hostnames, and employer-specific
          implementation details are intentionally excluded.
        </span>
      </div>

      <div className="ai-achievements__grid">
        {AI_SYSTEMS.map((system, index) => (
          <AISystemCard key={system.id} system={system} index={index} />
        ))}
      </div>
    </section>
  );
}
