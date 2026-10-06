import { useInView } from '../hooks/useInView';
import './Timeline.css';

const MILESTONES = [
  {
    year: '2024 — Present',
    title: 'Site Reliability Engineer',
    company: 'DataPoem',
    description:
      'Own reliability across 4+ AWS environments and approximately 60 services while providing technical leadership to 4–5 engineers. Operate ML training and release platforms, lead production escalations, and contributed to approximately 60% lower MTTR through SLOs, RCA, observability, runbooks, and process improvements. Delivered private application access, security controls, BCP/DR support, and cloud cost optimization.',
    highlights: ['70+ escalations', '500+ ML runs/mo', '100+ deploys/mo', 'AWS cost ↓30–40%'],
  },
  {
    year: '2023 — 2024',
    title: 'Independent Cloud & DevOps Consultant',
    company: 'Freelance',
    description:
      'Delivered cloud hosting, deployment architecture, application and infrastructure configuration, troubleshooting, production support, and reliability improvements for confidential client websites and applications.',
    highlights: ['Cloud hosting', 'Deployments', 'Production support', 'Client delivery'],
  },
  {
    year: '2022 — 2023',
    title: 'Senior Infrastructure Developer',
    company: 'Cognizant',
    description:
      'Maintained shared production infrastructure focused on availability, security, and compliance. Standardized AMI and Docker image pipelines, reducing environment drift by approximately 40%; automated vulnerability patching and improved deployment consistency.',
    highlights: ['Infra drift ↓40%', 'Automated patching', 'Standardized images', 'Sprint Award ×2'],
  },
  {
    year: '2020 — 2021',
    title: 'DevOps Engineer',
    company: 'IBM',
    description:
      'Automated AWS provisioning with Ansible, cutting setup time by approximately 50%. Built Jenkins and Maven pipelines that increased release frequency by approximately 35%, implemented Nagios monitoring for systems operating at 99.9% uptime, and supported Docker/Kubernetes workloads.',
    highlights: ['Setup time ↓50%', '99.9% uptime', 'Release freq ↑35%', 'Docker + K8s'],
  },
];

function MilestoneItem({ year, title, company, description, highlights, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={ref}
      className={`timeline__item timeline__item--${side} ${inView ? 'timeline__item--visible' : ''}`}
    >
      <div className="timeline__dot">
        <div className="timeline__dot-ring" />
      </div>
      <div className="timeline__card">
        <div className="timeline__card-header">
          <span className="timeline__year">{year}</span>
          <span className="timeline__company">{company}</span>
        </div>
        <h3 className="timeline__title">{title}</h3>
        <p className="timeline__desc">{description}</p>
        {highlights && (
          <div className="timeline__highlights">
            {highlights.map((h) => (
              <span key={h} className="timeline__highlight">{h}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const [ref, inView] = useInView();

  return (
    <section id="experience" ref={ref} className={`timeline section-reveal ${inView ? 'is-visible' : ''}`}>
      <p className="section-title">Experience</p>
      <h2 className="section-heading">From DevOps to owning production stability</h2>
      <div className="timeline__track">
        <div className="timeline__line" />
        {MILESTONES.map((m, i) => (
          <MilestoneItem key={m.year + m.title} {...m} index={i} />
        ))}
      </div>
    </section>
  );
}
