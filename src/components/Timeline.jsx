import { useInView } from '../hooks/useInView';
import './Timeline.css';

const MILESTONES = [
  {
    year: '2024 — Present',
    title: 'Site Reliability & Engineering Leadership',
    company: 'DataPoem',
    description:
      'Own reliability across 4+ AWS environments and approximately 60 services while leading 4–5 engineers. Define SLI/SLO monitoring, lead critical escalations, and drive RCA, postmortems, runbooks, mentoring, performance reviews, and hiring.',
    highlights: ['70+ escalations', 'MTTR ↓60%', '~60 services', 'Lead 4–5 engineers'],
  },
  {
    year: '2024 — Present',
    title: 'ML Platform & Release Engineering',
    company: 'DataPoem',
    description:
      'Operate 500+ monthly ML training runs across SageMaker, Temporal, and AWS Batch. Support 100+ ECS/EC2 deployments per month using Jenkins, GitHub Actions, Lambda guardrails, and secure multi-stage, non-root containers.',
    highlights: ['500+ ML runs/mo', '100+ deploys/mo', 'SageMaker + Batch', 'Temporal workflows'],
  },
  {
    year: '2024 — Present',
    title: 'Private Cloud Access, Security & Cost',
    company: 'DataPoem',
    description:
      'Implemented AWS Client VPN with Entra ID SSO and moved approximately 20 internal applications from public access to private connectivity. Reduced AWS infrastructure costs by 30–40%, negotiated approximately 15% overall commercial discount, and own BCP/DR and compliance support.',
    highlights: ['~20 apps privatized', 'AWS cost ↓30–40%', '~15% AWS discount', 'BCP/DR'],
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
      'Maintained shared production infrastructure with high availability and compliance. Standardized AMI & Docker image pipelines, reducing environment drift by 40%. Automated vulnerability patching. Improved CI/CD reliability by 30%.',
    highlights: ['Infra drift ↓40%', 'CI/CD ↑30%', '100% security compliance', 'Sprint Award ×2'],
  },
  {
    year: '2020 — 2021',
    title: 'DevOps Engineer',
    company: 'IBM',
    description:
      'Automated AWS provisioning with Ansible, cutting setup time by 50%. Built Jenkins + Maven pipelines, increasing release frequency by 35%. Implemented Nagios monitoring achieving 99.9% uptime. Containerized workloads with Docker and K8s.',
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
