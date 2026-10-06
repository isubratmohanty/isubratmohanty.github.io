import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { FiDatabase, FiShield, FiDollarSign, FiLock, FiLayers } from 'react-icons/fi';
import './Projects.css';

const PROJECTS = [
  {
    title: 'Production MongoDB Migration',
    description:
      'Migrated production MongoDB from an incompatible, unpatched version on an undersized instance to a production-grade setup with io2 volumes. Hardened security, tested, and moved data live. Queries dropped from 2–3 minutes to 15–20 seconds.',
    tags: ['MongoDB', 'AWS', 'Performance', 'Migration'],
    icon: FiDatabase,
    color: '#22c55e',
    status: 'Shipped',
  },
  {
    title: 'Security Incident Response & Hardening',
    description:
      'Responded to malicious traffic affecting a public data endpoint and led containment, network blocking, credential rotation, application configuration updates, and migration to private connectivity with no data loss.',
    tags: ['Incident Response', 'Security', 'Networking', 'AWS'],
    icon: FiShield,
    color: '#f87171',
    status: 'Incident resolved',
  },
  {
    title: 'AWS Cost Optimization — 30–40% cost reduction',
    description:
      'Contributed to a 30–40% reduction in AWS infrastructure expenditure through rightsizing, workload optimization, unused-resource cleanup, and lifecycle controls.',
    tags: ['Cost Optimization', 'EC2', 'S3', 'Jenkins'],
    icon: FiDollarSign,
    color: '#f59e0b',
    status: 'Shipped',
  },
  {
    title: 'Private Application Access with AWS Client VPN',
    description:
      'Implemented AWS Client VPN with Microsoft Entra ID SSO, moving approximately 20 internal applications from public access to controlled VPN/private connectivity while restructuring VPC routing, subnets, Security Groups, load balancing, DNS, and application access.',
    tags: ['AWS Client VPN', 'Entra ID', 'VPC', 'Security'],
    icon: FiLock,
    color: '#a855f7',
    status: 'Shipped',
  },
  {
    title: 'ML Training & Workflow Platform',
    description:
      'Operate 500+ monthly ML training runs across CPU and GPU workloads using SageMaker, Temporal, and AWS Batch. Support durable orchestration, automated retries, failure recovery, and peak concurrency of 10–15 training runs and 20–30 Batch jobs.',
    tags: ['SageMaker', 'Temporal', 'AWS Batch', 'ML Platform'],
    icon: FiLayers,
    color: '#ff3621',
    status: 'Shipped',
  },
];

function ProjectCard({ project, index }) {
  const tiltRef = useTilt();
  const { title, description, tags, icon: Icon, color, status } = project;

  return (
    <li ref={tiltRef} className="projects__card">
      <div className="projects__card-header">
        <div className="projects__icon-wrap" style={{ background: `${color}15`, borderColor: `${color}30` }}>
          <Icon style={{ color }} />
        </div>
        <div className="projects__card-meta">
          {status && (
            <span
              className="projects__status"
              style={status === 'Incident resolved' ? { color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' } : undefined}
            >
              {status}
            </span>
          )}
        </div>
      </div>
      <span className="projects__number">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="projects__title">{title}</h3>
      <p className="projects__desc">{description}</p>
      <ul className="projects__tags">
        {tags.map((tag) => (
          <li key={tag} className="projects__tag">{tag}</li>
        ))}
      </ul>
    </li>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" ref={ref} className={`projects section-reveal ${inView ? 'is-visible' : ''}`}>
      <p className="section-title">Projects</p>
      <h2 className="section-heading">Production problems I've solved</h2>
      <p className="projects__intro">
        Five selected examples of production work across reliability, security, performance,
        cloud efficiency, and ML platform operations.
      </p>
      <ul className="projects__grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
