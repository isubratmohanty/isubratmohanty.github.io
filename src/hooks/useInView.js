import { useState, useEffect, useRef } from 'react';

/**
 * Returns true when the ref element enters (or is about to enter) the viewport.
 * rootMargin of 200px bottom means sections trigger 200px BEFORE they scroll into view,
 * so animations are already done by the time the user sees them.
 */
export function useInView(options = {}) {
  const { threshold = 0, rootMargin = '0px 0px 200px 0px' } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
