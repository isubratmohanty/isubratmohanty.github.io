import { useState, useEffect } from 'react';

/**
 * Types and deletes through an array of strings with a blinking cursor feel.
 */
export function useTypingEffect(strings, { typeSpeed = 60, deleteSpeed = 35, pauseMs = 2000 } = {}) {
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [text, setText] = useState(() => (reducedMotion ? strings[0] : ''));
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const current = strings[stringIndex];

    if (!isDeleting && charIndex <= current.length) {
      const id = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, typeSpeed);
      return () => clearTimeout(id);
    }

    if (!isDeleting && charIndex > current.length) {
      const id = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(id);
    }

    if (isDeleting && charIndex > 0) {
      const id = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, deleteSpeed);
      return () => clearTimeout(id);
    }

    if (isDeleting && charIndex === 0) {
      const id = setTimeout(() => {
        setIsDeleting(false);
        setStringIndex((i) => (i + 1) % strings.length);
      }, deleteSpeed);
      return () => clearTimeout(id);
    }
  }, [strings, stringIndex, charIndex, isDeleting, typeSpeed, deleteSpeed, pauseMs, reducedMotion]);

  return text;
}
