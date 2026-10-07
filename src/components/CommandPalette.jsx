import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import './CommandPalette.css';

const SECTIONS = [
  { id: 'experience', label: 'Go to Experience', icon: '>' },
  { id: 'projects', label: 'Go to Projects', icon: '>' },
  { id: 'skills', label: 'Go to Skills', icon: '>' },
  { id: 'ai-systems', label: 'Go to AI Systems', icon: '>' },
  { id: 'environment', label: 'Go to Environment Dashboard', icon: '>' },
  { id: 'contact', label: 'Go to Contact', icon: '>' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const { toggleMode, cycleAccent, mode, accentKey } = useTheme();

  const commands = [
    ...SECTIONS.map((s) => ({
      label: s.label,
      icon: s.icon,
      action: () => {
        const el = document.getElementById(s.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    {
      label: `Toggle theme (${mode === 'dark' ? 'switch to light' : 'switch to dark'})`,
      icon: mode === 'dark' ? '☀' : '☾',
      action: toggleMode,
    },
    {
      label: `Cycle accent (current: ${accentKey})`,
      icon: '◆',
      action: cycleAccent,
    },
    {
      label: 'Download resume',
      icon: '↓',
      action: () => {
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = '';
        a.click();
      },
    },
  ];

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const run = useCallback(
    (cmd) => {
      cmd.action();
      close();
    },
    [close]
  );

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setActive(0);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Arrow keys + enter
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[active]) {
      run(filtered[active]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={close}>
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmd-palette__input-row">
          <span className="cmd-palette__prompt">&gt;</span>
          <input
            ref={inputRef}
            className="cmd-palette__input"
            type="text"
            placeholder="Type a command..."
            role="combobox"
            aria-controls="portfolio-command-list"
            aria-expanded="true"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
          />
          <kbd className="cmd-palette__esc">Esc</kbd>
        </div>
        <ul id="portfolio-command-list" className="cmd-palette__list" role="listbox">
          {filtered.length === 0 && (
            <li className="cmd-palette__empty">No results</li>
          )}
          {filtered.map((cmd, i) => (
            <li
              key={cmd.label}
              className={`cmd-palette__item ${i === active ? 'cmd-palette__item--active' : ''}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(cmd)}
            >
              <span className="cmd-palette__icon">{cmd.icon}</span>
              <span>{cmd.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
