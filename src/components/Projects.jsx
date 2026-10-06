import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { FiDatabase, FiShield, FiServer, FiDollarSign, FiLock, FiHardDrive, FiGitBranch, FiLayers } from 'react-icons/fi';
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
    title: 'DOS Attack Response & Security Hardening',
    description:
      'Responded to a live attack on public-facing databases. Overnight: blocked malicious network ranges, migrated databases to private subnets, updated all application configs, rotated credentials. Documented as security incident. Zero data loss.',
    tags: ['Incident Response', 'Security', 'Networking', 'AWS'],
    icon: FiShield,
    color: '#f87171',
    status: 'Incident resolved',
  },
  {
    title: 'BCP/DR Strategy & Automated Testing',
    description:
      'Designed the full BCP/DR structure for DataPoem. Built Jenkins jobs with parameters to test both BCP and DR on demand. Created AMI backups of all critical servers with cross-region replication. Achieved 100% audit pass rate for ISO 27001 & SOC2.',
    tags: ['BCP/DR', 'Jenkins', 'ISO 27001', 'SOC2'],
    icon: FiServer,
    color: '#3b82f6',
    status: 'Shipped',
  },
  {
    title: 'AWS Cost Optimization — 30–40% cost reduction',
    description:
      'Reduced AWS infrastructure expenditure by 30–40% through rightsizing, workload optimization, unused-resource cleanup, and lifecycle controls. Negotiated commercial terms providing approximately 15% overall AWS discount.',
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
    title: '35TB Cross-Account Data Migration',
    description:
      'Migrated 35TB from client S3 buckets to DataPoem infrastructure. Built Python scripts for fast, secure, parallel transfers. Optimized for cost and throughput. Handled multiple data movement tasks across client engagements.',
    tags: ['Python', 'S3', 'Data Migration', 'AWS'],
    icon: FiHardDrive,
    color: '#14b8a6',
    status: 'Shipped',
  },
  {
    title: 'Environment Stabilization & Branching Strategy',
    description:
      'When I joined, something broke almost daily. Segregated environments, separated database connections, tuned CPU/memory, protected branches with approval gates. Standardized branching: qa → integration → preproduction → production across all repos.',
    tags: ['DevOps', 'Git', 'ECS', 'CI/CD'],
    icon: FiGitBranch,
    color: '#06b6d4',
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
        Each project addressed a real production challenge -- security incidents,
        cost overruns, broken environments, manual processes -- with measurable outcomes.
      </p>
      <ul className="projects__grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
