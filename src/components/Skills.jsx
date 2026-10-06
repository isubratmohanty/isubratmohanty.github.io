import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  SiAmazonwebservices,
  SiAmazons3,
  SiAmazonec2,
  SiTerraform,
  SiAnsible,
  SiGit,
  SiJenkins,
  SiGithubactions,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiGnubash,
  SiDatadog,
  SiLinux,
  SiAmazonroute53,
} from 'react-icons/si';
import { FiShield, FiServer, FiActivity, FiDatabase, FiBox, FiUsers, FiCpu, FiCloud, FiGitBranch } from 'react-icons/fi';
import './Skills.css';

const CATEGORIES = ['All', 'Cloud', 'AI/ML Platform', 'Reliability', 'CI/CD', 'Monitoring', 'Security', 'Automation', 'Scripting', 'Databases'];

const SKILLS = [
  { name: 'AWS', category: 'Cloud', Icon: SiAmazonwebservices },
  { name: 'EC2 / VPC / ALB', category: 'Cloud', Icon: SiAmazonec2 },
  { name: 'S3', category: 'Cloud', Icon: SiAmazons3 },
  { name: 'Route53', category: 'Cloud', Icon: SiAmazonroute53 },
  { name: 'ECS / ECR', category: 'Cloud', Icon: FiBox },
  { name: 'RDS / DynamoDB', category: 'Cloud', Icon: FiDatabase },
  { name: 'Lambda', category: 'Cloud', Icon: FiCloud },
  { name: 'AWS Client VPN', category: 'Cloud', Icon: FiShield },
  { name: 'SageMaker', category: 'AI/ML Platform', Icon: FiCpu },
  { name: 'AWS Batch', category: 'AI/ML Platform', Icon: FiServer },
  { name: 'Temporal', category: 'AI/ML Platform', Icon: FiActivity },
  { name: 'Bedrock / AgentCore', category: 'AI/ML Platform', Icon: FiCpu },
  { name: 'SLI / SLO / SLA', category: 'Reliability', Icon: FiActivity },
  { name: 'Incident Response / RCA', category: 'Reliability', Icon: FiShield },
  { name: 'On-call / Postmortems', category: 'Reliability', Icon: FiActivity },
  { name: 'BCP / DR', category: 'Reliability', Icon: FiShield },
  { name: 'Entra ID / SSO / MFA', category: 'Security', Icon: FiUsers },
  { name: 'Least-Privilege IAM', category: 'Security', Icon: FiShield },
  { name: 'TLS / Vulnerability Mgmt', category: 'Security', Icon: FiShield },
  { name: 'Jenkins', category: 'CI/CD', Icon: SiJenkins },
  { name: 'GitHub Actions', category: 'CI/CD', Icon: SiGithubactions },
  { name: 'Docker / Secure Builds', category: 'CI/CD', Icon: SiDocker },
  { name: 'Kubernetes', category: 'CI/CD', Icon: SiKubernetes },
  { name: 'Release Engineering', category: 'CI/CD', Icon: FiGitBranch },
  { name: 'CloudWatch', category: 'Monitoring', Icon: FiActivity },
  { name: 'ELK', category: 'Monitoring', Icon: FiActivity },
  { name: 'Datadog', category: 'Monitoring', Icon: SiDatadog },
  { name: 'Site24x7', category: 'Monitoring', Icon: FiActivity },
  { name: 'Nagios', category: 'Monitoring', Icon: FiActivity },
  { name: 'CloudFormation', category: 'Automation', Icon: SiAmazonwebservices },
  { name: 'Terraform', category: 'Automation', Icon: SiTerraform },
  { name: 'Ansible', category: 'Automation', Icon: SiAnsible },
  { name: 'Git', category: 'Automation', Icon: SiGit },
  { name: 'Python', category: 'Scripting', Icon: SiPython },
  { name: 'Bash', category: 'Scripting', Icon: SiGnubash },
  { name: 'Linux', category: 'Scripting', Icon: SiLinux },
  { name: 'PostgreSQL / MongoDB', category: 'Databases', Icon: FiDatabase },
];

export default function Skills() {
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" ref={ref} className={`skills section-reveal ${inView ? 'is-visible' : ''}`}>
      <div className="skills__inner">
        <p className="section-title">Skills</p>
        <h2 className="section-heading">The stack behind reliable production platforms</h2>

        <div className="skills__filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`skills__filter ${activeFilter === cat ? 'skills__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
              {activeFilter === cat && (
                <span className="skills__filter-count">
                  {cat === 'All' ? SKILLS.length : SKILLS.filter((s) => s.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <ul className="skills__list">
          {filtered.map(({ name, category, Icon }) => (
            <li
              key={name}
              className="skills__item"
            >
              <span className="skills__icon" aria-hidden>
                <Icon />
              </span>
              <div className="skills__info">
                <span className="skills__name">{name}</span>
                <span className="skills__category">{category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
