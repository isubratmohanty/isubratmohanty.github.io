import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { FiShield, FiCloud, FiTerminal, FiClock, FiZap, FiMapPin } from 'react-icons/fi';
import './About.css';

function AnimatedCounter({ end, suffix = '', prefix = '', active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const isFloat = !Number.isInteger(end);
    const steps = 50;
    const inc = end / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.round(start));
      }
    }, 30);
    return () => clearInterval(id);
  }, [active, end]);

  return (
    <span className="about__stat-number">
      {prefix}{count}{suffix}
    </span>
  );
}

const STATS = [
  { icon: FiShield, value: 70, suffix: '+', prefix: '', label: 'Incidents handled' },
  { icon: FiCloud, value: 500, suffix: '+/mo', prefix: '', label: 'ML training runs' },
  { icon: FiZap, value: 100, suffix: '+/mo', prefix: '', label: 'Deployments supported' },
  { icon: FiClock, value: 60, suffix: '%', prefix: '', label: 'MTTR reduced' },
];

function TiltCard({ Icon, title, children }) {
  const tiltRef = useTilt();
  return (
    <div className="about__card" ref={tiltRef}>
      <div className="about__icon-wrap">
        <Icon className="about__icon" />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" ref={ref} className={`about section-reveal ${inView ? 'is-visible' : ''}`}>
      <p className="section-title">About</p>
      <h2 className="section-heading">Availability, reliability, automation & security</h2>

      <div className="about__intro">
        <div className="about__photo">
          <img
            src="/photo.jpg"
            alt="Subrat Mohanty"
            className="about__photo-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="about__photo-placeholder" aria-hidden>SM</div>
        </div>
        <div className="about__intro-text">
          <p>
            I'm <strong>Subrat Mohanty</strong>, a Site Reliability Engineer with <strong>6+ years</strong>
            of AWS production experience. At <strong>DataPoem</strong>, I own reliability across four
            environments and approximately 60 services while leading 4–5 engineers through technical
            planning, delivery, mentoring, performance reviews, and hiring.
          </p>
          <p>
            I operate platforms handling 500+ ML training runs and 100+ deployments each month,
            and have reduced MTTR by approximately 60% through SLOs, observability, RCA, runbooks,
            and process improvement. Previously: independent cloud consulting, <strong>Cognizant</strong>,
            and <strong>IBM</strong>.
          </p>
          <div className="about__meta">
            <span className="about__location">
              <FiMapPin /> Bengaluru, India
            </span>
            <span className="about__availability">
              <span className="about__avail-dot" /> Open to SRE & DevOps roles
            </span>
          </div>
        </div>
      </div>

      <div className="about__stats">
        {STATS.map(({ icon: Icon, value, suffix, prefix, label }) => (
          <div key={label} className="about__stat">
            <Icon className="about__stat-icon" />
            <AnimatedCounter end={value} suffix={suffix} prefix={prefix || ''} active={inView} />
            <span className="about__stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="about__grid">
        <TiltCard Icon={FiShield} title="Reliability & Incident Leadership">
          Own SLI/SLO monitoring and primary production escalation. Handled 70+ incidents
          and escalations, reducing MTTR by approximately 60% through RCA, postmortems,
          alerting, runbooks, and operational improvements.
        </TiltCard>
        <TiltCard Icon={FiCloud} title="ML & Cloud Platform Operations">
          Operate CPU/GPU training with SageMaker, Temporal, and AWS Batch at 500+ runs
          per month. Support 100+ ECS/EC2 deployments monthly with Jenkins, GitHub Actions,
          Lambda guardrails, and secure container delivery.
        </TiltCard>
        <TiltCard Icon={FiTerminal} title="Automation, Security & Efficiency">
          Built 15+ engineering tools, including AI log analysis, CI security gates,
          and database comparison automation. Operated ELK and Site24x7 for observability,
          and moved approximately 20 internal applications behind AWS Client VPN.
        </TiltCard>
      </div>
    </section>
  );
}
