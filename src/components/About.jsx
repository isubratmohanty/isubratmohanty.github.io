import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { FiShield, FiCloud, FiTerminal, FiMapPin } from 'react-icons/fi';
import './About.css';

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
            of AWS production experience. At <strong>DataPoem</strong>, I own platform reliability
            and provide technical leadership to 4–5 engineers through planning, delivery, mentoring,
            incident response, and hands-on troubleshooting.
          </p>
          <p>
            My focus is dependable cloud and ML infrastructure, measurable reliability, secure
            delivery, and replacing recurring operational work with practical automation. Previously:
            independent cloud consulting, <strong>Cognizant</strong>, and <strong>IBM</strong>.
          </p>
          <div className="about__meta">
            <span className="about__location">
              <FiMapPin /> Bengaluru, India
            </span>
            <span className="about__availability">
              <span className="about__avail-dot" /> Open to SRE, DevOps & Cloud Platform roles
            </span>
          </div>
        </div>
      </div>

      <div className="about__grid">
        <TiltCard Icon={FiShield} title="Reliability & Incident Leadership">
          Define SLI/SLO monitoring, lead production escalations, and improve response through
          RCA, postmortems, observability, runbooks, and operational follow-through.
        </TiltCard>
        <TiltCard Icon={FiCloud} title="ML & Cloud Platform Operations">
          Operate CPU/GPU training with SageMaker, Temporal, and AWS Batch, alongside ECS/EC2
          delivery using Jenkins, GitHub Actions, Lambda guardrails, and secure containers.
        </TiltCard>
        <TiltCard Icon={FiTerminal} title="Automation, Security & Efficiency">
          Build engineering tools for log analysis, CI security gates, database operations,
          and repeatable delivery while operating ELK and Site24x7 for observability.
        </TiltCard>
      </div>
    </section>
  );
}
