import { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react';

const ACCENTS = {
  cyan:   { accent: '#22d3ee', dim: '#06b6d4', r: 34, g: 211, b: 238 },
  teal:   { accent: '#14b8a6', dim: '#0d9488', r: 20, g: 184, b: 166 },
  green:  { accent: '#22c55e', dim: '#16a34a', r: 34, g: 197, b: 94 },
  blue:   { accent: '#3b82f6', dim: '#2563eb', r: 59, g: 130, b: 246 },
  amber:  { accent: '#f59e0b', dim: '#d97706', r: 245, g: 158, b: 11 },
  purple: { accent: '#a855f7', dim: '#9333ea', r: 168, g: 85, b: 247 },
};

const ACCENT_KEYS = Object.keys(ACCENTS);

const ThemeContext = createContext();

function applyTheme(mode, accentKey) {
  const root = document.documentElement;
  const a = ACCENTS[accentKey] || ACCENTS.amber;

  if (mode === 'light') {
    root.style.setProperty('--bg-deep', '#f8fafc');
    root.style.setProperty('--bg-card', '#ffffff');
    root.style.setProperty('--bg-elevated', '#f1f5f9');
    root.style.setProperty('--text', '#0f172a');
    root.style.setProperty('--text-muted', '#475569');
    root.style.setProperty('--success', '#16a34a');
    root.style.setProperty('--card-shadow', '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)');
    root.style.setProperty('--card-shadow-hover', '0 4px 12px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.06)');
    root.style.setProperty('--grid-opacity', '0.07');
    root.style.setProperty('--nav-bg', 'rgba(248, 250, 252, 0.88)');
  } else {
    root.style.setProperty('--bg-deep', '#0a0e14');
    root.style.setProperty('--bg-card', '#111820');
    root.style.setProperty('--bg-elevated', '#161d28');
    root.style.setProperty('--text', '#e2e8f0');
    root.style.setProperty('--text-muted', '#94a3b8');
    root.style.setProperty('--success', '#22c55e');
    root.style.setProperty('--card-shadow', 'none');
    root.style.setProperty('--card-shadow-hover', '0 8px 32px rgba(0,0,0,0.3)');
    root.style.setProperty('--grid-opacity', '0.03');
    root.style.setProperty('--nav-bg', 'rgba(10, 14, 20, 0.85)');
  }

  // Accent
  root.style.setProperty('--accent', a.accent);
  root.style.setProperty('--accent-dim', a.dim);
  root.style.setProperty('--border', `rgba(${a.r}, ${a.g}, ${a.b}, ${mode === 'light' ? 0.15 : 0.2})`);
  root.style.setProperty('--accent-glow', `rgba(${a.r}, ${a.g}, ${a.b}, ${mode === 'light' ? 0.1 : 0.15})`);
  root.style.setProperty('--accent-border-hover', `rgba(${a.r}, ${a.g}, ${a.b}, ${mode === 'light' ? 0.3 : 0.35})`);
  root.style.setProperty('--accent-border-strong', `rgba(${a.r}, ${a.g}, ${a.b}, 0.4)`);
  root.style.setProperty('--accent-bg-badge', `rgba(${a.r}, ${a.g}, ${a.b}, ${mode === 'light' ? 0.1 : 0.15})`);
  root.style.setProperty('--accent-dot-half', `rgba(${a.r}, ${a.g}, ${a.b}, 0.5)`);

  document.body.classList.toggle('light', mode === 'light');
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('sm-mode') || 'light');
  const [accentKey, setAccentKey] = useState(() => localStorage.getItem('sm-accent') || 'amber');

  useLayoutEffect(() => {
    applyTheme(mode, accentKey);
    localStorage.setItem('sm-mode', mode);
    localStorage.setItem('sm-accent', accentKey);
  }, [mode, accentKey]);

  const toggleMode = useCallback(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')), []);
  const cycleAccent = useCallback(
    () => setAccentKey((k) => ACCENT_KEYS[(ACCENT_KEYS.indexOf(k) + 1) % ACCENT_KEYS.length]),
    []
  );

  return (
    <ThemeContext.Provider value={{ mode, accentKey, toggleMode, cycleAccent, ACCENT_KEYS, ACCENTS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
