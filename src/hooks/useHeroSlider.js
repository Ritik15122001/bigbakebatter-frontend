import { useEffect, useRef, useState } from 'react';

/** Autoplay slider with hover-to-pause, matching the prototype's hero behaviour. */
export function useHeroSlider(slideCount, intervalMs = 7000) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (slideCount <= 1) return undefined;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % slideCount);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slideCount, intervalMs]);

  const goTo = (i) => setIndex(((i % slideCount) + slideCount) % slideCount);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const setPaused = (v) => {
    pausedRef.current = v;
  };

  return { index, goTo, next, prev, setPaused };
}
