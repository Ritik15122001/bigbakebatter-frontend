import { useState } from 'react';

/**
 * Image with a warm gradient placeholder underneath (from the product's `ph`
 * colour pair) that fades out once the real photo loads — a simplified stand-in
 * for the source prototype's generated cake-illustration fallback.
 */
export default function Pic({ src, alt = '', ph, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const style = ph ? { '--ph1': ph[0], '--ph2': ph[1] } : undefined;

  return (
    <span className={`pic ${className}`} style={style}>
      <span className="imgph" aria-hidden="true" />
      {src && !errored && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={loaded ? 'ready' : ''}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      )}
    </span>
  );
}
