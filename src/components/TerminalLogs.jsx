import { useState, useEffect, useRef } from 'react';
import './TerminalLogs.css';

function formatTime() {
  const d = new Date();
  return d.toISOString().slice(11, 19);
}

const LOG_LINES = [
  { prefix: '[SRE]', msg: '70+ incidents handled · MTTR reduced ~60%', level: 'OK' },
  { prefix: '[ML]', msg: '500+ training runs/mo · CPU + GPU healthy', level: 'OK' },
  { prefix: '[CD]', msg: '100+ ECS/EC2 deployments/mo · pipelines green', level: 'OK' },
  { prefix: '[TMP]', msg: 'Temporal workflows · retries + recovery active', level: 'OK' },
  { prefix: '[BAT]', msg: 'AWS Batch peak · 20–30 concurrent CPU jobs', level: 'OK' },
  { prefix: '[VPN]', msg: '~20 internal apps moved to private access', level: 'OK' },
  { prefix: '[SEC]', msg: '50–60 repos protected · High/Critical gates active', level: 'OK' },
  { prefix: '[OBS]', msg: 'ELK telemetry · infrastructure visibility online', level: 'OK' },
  { prefix: '[AWS]', msg: 'Infrastructure spend reduced 30–40%', level: 'OK' },
  { prefix: '[OPS]', msg: '15+ engineering tools · automation operational', level: 'OK' },
];

const CYCLE_MS = 2800;
const VISIBLE_LINES = 4;

export default function TerminalLogs() {
  const [lines, setLines] = useState([]);
  const bodyRef = useRef(null);

  useEffect(() => {
    let idx = 0;
    const seed = LOG_LINES.slice(0, VISIBLE_LINES).map((l, i) => ({
      ...l,
      time: formatTime(),
      key: i,
    }));
    setLines(seed);
    idx = VISIBLE_LINES;

    const id = setInterval(() => {
      const log = LOG_LINES[idx % LOG_LINES.length];
      setLines((prev) => {
        const next = [...prev, { ...log, time: formatTime(), key: Date.now() }];
        if (next.length > VISIBLE_LINES) return next.slice(-VISIBLE_LINES);
        return next;
      });
      idx++;
    }, CYCLE_MS);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-logs" aria-live="polite" aria-label="System activity">
      <div className="terminal-logs__bar">
        <div className="terminal-logs__dots">
          <span className="terminal-logs__dot terminal-logs__dot--red" />
          <span className="terminal-logs__dot terminal-logs__dot--yellow" />
          <span className="terminal-logs__dot terminal-logs__dot--green" />
        </div>
        <span className="terminal-logs__title">~/prod.log</span>
        <span className="terminal-logs__badge">DEMO</span>
      </div>
      <div className="terminal-logs__body" ref={bodyRef}>
        {lines.map((line) => (
          <div className="terminal-logs__line" key={line.key}>
            <span className="terminal-logs__time">{line.time}</span>
            <span className="terminal-logs__level">{line.level}</span>
            <span className="terminal-logs__prefix">{line.prefix}</span>
            <span className="terminal-logs__msg">{line.msg}</span>
          </div>
        ))}
        <div className="terminal-logs__prompt">
          <span className="terminal-logs__prompt-symbol">$</span>
          <span className="terminal-logs__cursor" />
        </div>
      </div>
    </div>
  );
}
