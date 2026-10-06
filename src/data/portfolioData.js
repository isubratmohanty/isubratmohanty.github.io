export const PORTFOLIO_METRICS = [
  { value: '60%', label: 'lower MTTR' },
  { value: '~60', label: 'services owned' },
  { value: '500+', label: 'ML runs per month' },
  { value: '100+', label: 'deployments per month' },
];

const production = {
  label: 'Production',
  summary: {
    health: 'Operational',
    services: 60,
    activeAlerts: 2,
    deployments: 108,
    slo: '99.93%',
  },
  services: [
    { name: 'api-gateway', type: 'API', state: 'healthy', latency: '86 ms' },
    { name: 'training-orchestrator', type: 'Temporal', state: 'healthy', latency: '112 ms' },
    { name: 'model-api', type: 'ECS', state: 'healthy', latency: '143 ms' },
    { name: 'batch-workers', type: 'AWS Batch', state: 'warning', latency: '24 queued' },
    { name: 'postgres-primary', type: 'Database', state: 'healthy', latency: '8 ms' },
    { name: 'artifact-store', type: 'S3', state: 'healthy', latency: '41 ms' },
  ],
  red: {
    requests: [1180, 1260, 1210, 1390, 1450, 1520, 1495, 1630, 1580, 1710, 1680, 1760],
    errors: [0.12, 0.1, 0.14, 0.18, 0.13, 0.11, 0.09, 0.16, 0.12, 0.1, 0.08, 0.1],
    latency: [94, 101, 98, 106, 112, 108, 103, 118, 110, 105, 99, 102],
  },
  use: {
    cpu: [42, 47, 51, 55, 49, 58, 62, 57, 53, 59, 56, 54],
    memory: [61, 63, 64, 66, 67, 68, 69, 70, 69, 68, 67, 66],
    disk: [48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54],
    network: [28, 31, 35, 42, 38, 45, 49, 44, 41, 47, 43, 40],
  },
  ml: {
    monthlyRuns: 528,
    activeTraining: 12,
    batchQueue: 24,
    successRate: '97.8%',
    gpuDuration: '6h–4d',
    temporal: '42 workflows healthy',
  },
  pipelines: [
    { name: 'model-api', target: 'ECS production', status: 'passed', age: '8m ago' },
    { name: 'training-worker', target: 'EC2 GPU', status: 'passed', age: '32m ago' },
    { name: 'batch-runtime', target: 'AWS Batch', status: 'running', age: '3m elapsed' },
    { name: 'security-gate', target: '58 repositories', status: 'passed', age: '1h ago' },
  ],
  insight: {
    severity: 'Watch',
    title: 'Recurring API timeout signature detected',
    detail:
      'The log-analysis agent identified a timeout sequence similar to historical connection-pool saturation incidents.',
    recommendation:
      'Review pool utilization and retry amplification before the next traffic peak.',
    confidence: 'Pattern guidance — not an automated incident declaration',
  },
};

const staging = {
  ...production,
  label: 'Staging',
  summary: { health: 'Operational', services: 24, activeAlerts: 0, deployments: 46, slo: '99.89%' },
  services: production.services.map((service) => ({
    ...service,
    state: 'healthy',
    latency: service.type === 'AWS Batch' ? '6 queued' : service.latency,
  })),
  red: {
    requests: production.red.requests.map((value) => Math.round(value * 0.36)),
    errors: [0.2, 0.16, 0.18, 0.22, 0.15, 0.14, 0.12, 0.19, 0.16, 0.13, 0.11, 0.12],
    latency: production.red.latency.map((value) => Math.round(value * 1.08)),
  },
  use: {
    cpu: production.use.cpu.map((value) => Math.round(value * 0.72)),
    memory: production.use.memory.map((value) => Math.round(value * 0.78)),
    disk: production.use.disk.map((value) => Math.round(value * 0.74)),
    network: production.use.network.map((value) => Math.round(value * 0.58)),
  },
  ml: {
    monthlyRuns: 184,
    activeTraining: 4,
    batchQueue: 6,
    successRate: '96.4%',
    gpuDuration: '1h–18h',
    temporal: '16 workflows healthy',
  },
};

const development = {
  ...staging,
  label: 'Development',
  summary: { health: 'Operational', services: 18, activeAlerts: 1, deployments: 72, slo: '99.72%' },
  services: staging.services.map((service, index) => ({
    ...service,
    state: index === 2 ? 'warning' : 'healthy',
  })),
  red: {
    requests: production.red.requests.map((value) => Math.round(value * 0.17)),
    errors: [0.42, 0.38, 0.36, 0.51, 0.44, 0.39, 0.34, 0.47, 0.4, 0.36, 0.31, 0.33],
    latency: production.red.latency.map((value) => Math.round(value * 1.22)),
  },
  use: {
    cpu: production.use.cpu.map((value) => Math.round(value * 0.48)),
    memory: production.use.memory.map((value) => Math.round(value * 0.62)),
    disk: production.use.disk.map((value) => Math.round(value * 0.55)),
    network: production.use.network.map((value) => Math.round(value * 0.34)),
  },
  ml: {
    monthlyRuns: 92,
    activeTraining: 3,
    batchQueue: 8,
    successRate: '94.9%',
    gpuDuration: '24m–8h',
    temporal: '11 workflows healthy',
  },
};

export const ENVIRONMENTS = { production, staging, development };

export const TOPOLOGY = [
  { id: 'edge', label: 'Route 53 / ALB', type: 'edge' },
  { id: 'api', label: 'ECS APIs', type: 'service' },
  { id: 'workflow', label: 'Temporal', type: 'orchestration' },
  { id: 'training', label: 'SageMaker GPU', type: 'compute' },
  { id: 'batch', label: 'AWS Batch CPU', type: 'compute' },
  { id: 'data', label: 'RDS / S3', type: 'data' },
];

export const AI_SYSTEMS = [
  {
    id: 'log-agent',
    eyebrow: 'Operations intelligence',
    title: 'AI-agent log analysis',
    description:
      'Built a separate AI-agent tool that analyzes application and container logs and produces timely API-failure notifications for responders.',
    architecture: ['Container logs', 'Secure ingestion', 'Bedrock agent', 'Failure notification'],
    proof: 'Operational outcome: faster awareness of API failures and clearer visibility into what is happening.',
    stack: ['Amazon Bedrock', 'Python', 'Container logs', 'Notifications'],
  },
  {
    id: 'incident-rag',
    eyebrow: 'Predictive guidance',
    title: 'RAG incident pattern system',
    description:
      'Developed a RAG system that retrieves similar historical incidents and identifies recurring patterns to support proactive operational response.',
    architecture: ['Incident history', 'Embeddings', 'Relevant retrieval', 'Risk guidance'],
    proof: 'Prediction is presented as operator guidance, not as a guaranteed automated incident decision.',
    stack: ['RAG', 'Vector retrieval', 'LLM', 'Incident history'],
  },
  {
    id: 'security-agent',
    eyebrow: 'DevSecOps at scale',
    title: 'AI security & code-quality platform',
    description:
      'Built an AI-assisted platform covering approximately 50–60 GitHub repositories with High/Critical release gates and automated API documentation.',
    architecture: ['Pull request', 'GitHub Actions', 'AI analysis', 'Release gate'],
    proof: 'Production scale: approximately 50–60 repositories protected through CI/CD.',
    stack: ['GitHub Actions', 'CI/CD', 'Security gates', 'API docs'],
  },
  {
    id: 'database-agent',
    eyebrow: 'Data operations',
    title: 'Database comparison & replication',
    description:
      'Developed an AI-assisted PostgreSQL and MongoDB platform for fast data/schema validation and controlled database, table, and collection mirroring.',
    architecture: ['Five environments', 'Schema/data diff', 'AI-assisted review', 'Controlled mirror'],
    proof: 'Production scope: PostgreSQL and MongoDB workflows across five environments.',
    stack: ['PostgreSQL', 'MongoDB', 'Python', 'Five environments'],
  },
];
