import { useEffect, useRef, useState } from 'react';

/** Mirrors the prototype's IntersectionObserver-driven `.reveal`/`.in` fade-up. */
export function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(node);
        }
      },
      { rootMargin: '0px 0px -70px 0px', threshold: 0.04 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
