import { useMemo, useState } from 'react';
import {
  FiActivity,
  FiAlertTriangle,
  FiBox,
  FiCheckCircle,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiServer,
} from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import { ENVIRONMENTS, TOPOLOGY } from '../data/portfolioData';
import './EnvironmentDashboard.css';

const ENVIRONMENT_KEYS = Object.keys(ENVIRONMENTS);
const WINDOW_POINTS = { '1h': 6, '6h': 9, '24h': 12 };

function MiniChart({ values, label, unit = '', tone = 'accent' }) {
  const width = 260;
  const height = 72;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - 6 - ((value - min) / range) * (height - 12);
      return `${x},${y}`;
    })
    .join(' ');
  const current = values[values.length - 1];

  return (
    <figure className={`env-chart env-chart--${tone}`}>
      <figcaption>
        <span>{label}</span>
        <strong>{current}{unit}</strong>
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${label}: current value ${current}${unit}; range ${min}${unit} to ${max}${unit}`}
        preserveAspectRatio="none"
      >
        <polygon points={`0,${height} ${points} ${width},${height}`} />
        <polyline points={points} />
      </svg>
    </figure>
  );
}

function SummaryCard({ icon: Icon, label, value, note, status }) {
  return (
    <article className="env-summary-card">
      <div className="env-summary-card__top">
        <Icon aria-hidden />
        {status && <span className={`env-status env-status--${status}`}>{status}</span>}
      </div>
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{note}</small>
    </article>
  );
}

function EnvironmentControls({ environment, setEnvironment, timeWindow, setTimeWindow }) {
  return (
    <div className="env-controls" aria-label="Dashboard filters">
      <div className="env-control-group">
        <span className="env-control-label">Environment</span>
        <div className="env-segmented">
          {ENVIRONMENT_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={environment === key}
              onClick={() => setEnvironment(key)}
            >
              <span className={`env-dot env-dot--${key}`} />
              {ENVIRONMENTS[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="env-control-group">
        <span className="env-control-label">Window</span>
        <div className="env-segmented env-segmented--compact">
          {Object.keys(WINDOW_POINTS).map((window) => (
            <button
              key={window}
              type="button"
              aria-pressed={timeWindow === window}
              onClick={() => setTimeWindow(window)}
            >
              {window}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EnvironmentDashboard() {
  const [ref, inView] = useInView();
  const [environment, setEnvironment] = useState('production');
  const [timeWindow, setTimeWindow] = useState('24h');
  const data = ENVIRONMENTS[environment];
  const points = WINDOW_POINTS[timeWindow];

  const charts = useMemo(
    () => ({
      requests: data.red.requests.slice(-points),
      errors: data.red.errors.slice(-points),
      latency: data.red.latency.slice(-points),
      cpu: data.use.cpu.slice(-points),
      memory: data.use.memory.slice(-points),
      disk: data.use.disk.slice(-points),
      network: data.use.network.slice(-points),
    }),
    [data, points]
  );

  return (
    <section
      id="environment"
      ref={ref}
      className={`environment section-reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="environment__heading">
        <div>
          <p className="section-title">SRE dashboard design exercise</p>
          <h2 className="section-heading">How I reason about production health</h2>
          <p className="environment__intro">
            An illustrative interface showing how I organize RED, USE, delivery, ML operations,
            and incident-response signals. It is not production telemetry.
          </p>
        </div>
      </div>

      <EnvironmentControls
        environment={environment}
        setEnvironment={setEnvironment}
        timeWindow={timeWindow}
        setTimeWindow={setTimeWindow}
      />

      <div className="env-summary">
        <SummaryCard
          icon={FiCheckCircle}
          label="Environment health"
          value={data.summary.health}
          note="Representative service checks"
          status="healthy"
        />
        <SummaryCard
          icon={FiLayers}
          label="Services represented"
          value={data.summary.services}
          note="APIs, workflows, compute and data"
        />
        <SummaryCard
          icon={FiAlertTriangle}
          label="Active alerts"
          value={data.summary.activeAlerts}
          note="Warning-level demo signals"
          status={data.summary.activeAlerts > 0 ? 'warning' : 'healthy'}
        />
        <SummaryCard
          icon={FiGitBranch}
          label="Monthly deployments"
          value={data.summary.deployments}
          note="ECS and EC2 release activity"
        />
        <SummaryCard
          icon={FiActivity}
          label="SLO snapshot"
          value={data.summary.slo}
          note="Synthetic compliance indicator"
        />
      </div>

      <div className="env-grid env-grid--signals">
        <article className="env-panel env-panel--wide">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">RED method</span>
              <h3>Service experience signals</h3>
            </div>
            <span className="env-panel__meta">{data.label} · {timeWindow}</span>
          </div>
          <div className="env-chart-grid env-chart-grid--three">
            <MiniChart values={charts.requests} label="Request rate" unit="/s" />
            <MiniChart values={charts.errors} label="Error rate" unit="%" tone="warning" />
            <MiniChart values={charts.latency} label="Latency p99" unit=" ms" tone="info" />
          </div>
        </article>

        <article className="env-panel">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">NOC view</span>
              <h3>Service health</h3>
            </div>
            <span className="env-panel__meta">6 representative monitors</span>
          </div>
          <div className="env-service-grid">
            {data.services.map((service) => (
              <div key={service.name} className={`env-service env-service--${service.state}`}>
                <span className="env-service__state" />
                <strong>{service.name}</strong>
                <span>{service.type}</span>
                <small>{service.latency}</small>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="env-grid env-grid--signals">
        <article className="env-panel env-panel--wide">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">USE method</span>
              <h3>Infrastructure resource signals</h3>
            </div>
            <span className="env-panel__meta">Utilization · saturation · errors</span>
          </div>
          <div className="env-chart-grid">
            <MiniChart values={charts.cpu} label="CPU utilization" unit="%" />
            <MiniChart values={charts.memory} label="Memory utilization" unit="%" tone="info" />
            <MiniChart values={charts.disk} label="Disk utilization" unit="%" tone="warning" />
            <MiniChart values={charts.network} label="Network throughput" unit=" Mbps" />
          </div>
        </article>

        <article className="env-panel env-panel--ml">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">ML operations</span>
              <h3>Training & orchestration</h3>
            </div>
            <FiCpu aria-hidden />
          </div>
          <dl className="env-facts">
            <div><dt>Runs / month</dt><dd>{data.ml.monthlyRuns}</dd></div>
            <div><dt>Active training</dt><dd>{data.ml.activeTraining}</dd></div>
            <div><dt>Batch queue</dt><dd>{data.ml.batchQueue}</dd></div>
            <div><dt>Success rate</dt><dd>{data.ml.successRate}</dd></div>
            <div><dt>GPU duration</dt><dd>{data.ml.gpuDuration}</dd></div>
            <div><dt>Temporal</dt><dd>{data.ml.temporal}</dd></div>
          </dl>
        </article>
      </div>

      <div className="env-grid env-grid--bottom">
        <article className="env-panel">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">Delivery</span>
              <h3>Recent pipelines</h3>
            </div>
            <FiBox aria-hidden />
          </div>
          <div className="env-pipelines">
            {data.pipelines.map((pipeline) => (
              <div key={pipeline.name} className="env-pipeline">
                <span className={`env-pipeline__status env-pipeline__status--${pipeline.status}`} />
                <div><strong>{pipeline.name}</strong><span>{pipeline.target}</span></div>
                <span>{pipeline.status}</span>
                <small>{pipeline.age}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="env-panel env-panel--insight">
          <div className="env-panel__header">
            <div>
              <span className="env-panel__eyebrow">AI incident intelligence</span>
              <h3>{data.insight.title}</h3>
            </div>
            <span className="env-status env-status--warning">{data.insight.severity}</span>
          </div>
          <p>{data.insight.detail}</p>
          <div className="env-insight__recommendation">
            <FiActivity aria-hidden />
            <span>{data.insight.recommendation}</span>
          </div>
          <small>{data.insight.confidence}</small>
        </article>
      </div>

      <article className="env-panel env-topology">
        <div className="env-panel__header">
          <div>
            <span className="env-panel__eyebrow">Representative production topology</span>
            <h3>Request-to-training dependency path</h3>
          </div>
          <FiServer aria-hidden />
        </div>
        <div className="env-topology__flow" role="img" aria-label="Traffic flows from Route 53 and ALB to ECS APIs, Temporal orchestration, SageMaker GPU and AWS Batch CPU compute, then RDS and S3 data systems.">
          {TOPOLOGY.map((node, index) => (
            <div className="env-topology__step" key={node.id}>
              <div className={`env-topology__node env-topology__node--${node.type}`}>
                <span>{node.label}</span>
                <small>{node.type}</small>
              </div>
              {index < TOPOLOGY.length - 1 && <span className="env-topology__arrow" aria-hidden>→</span>}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
