import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { useHeroSlider } from '../../hooks/useHeroSlider';

export default function Hero({ banners }) {
  const { index, goTo, next, prev, setPaused } = useHeroSlider(banners.length, 6000);
  const shellRef = useRef(null);
  const active = banners[index];

  return (
    <section className="hero">
      <div
        className="hero-shell"
        ref={shellRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-slides">
          {banners.map((b, i) => (
            <div key={b.id} className={`hero-slide ${i === index ? 'on' : ''}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${banners.length}`}>
              <div className="hero-bg">
                <Pic src={b.img} alt={b.headline} ph={b.ph} />
              </div>
              <div className="hero-copy">
                <span className="kicker kicker-script">{b.kicker}</span>
                <h1>{b.headline}</h1>
                <p>{b.sub}</p>
                {b.cta && (
                  <div className="hero-cta">
                    <Link className="btn btn-primary btn-lg" to={b.ctaHref || '/shop'}>
                      {b.cta}
                      <Icon name="aright" className="icon icon-sm" />
                    </Link>
                  </div>
                )}
              </div>
              <div className="hero-promo">
                <span className="big">{b.badge[0]}</span>
                <span className="sm">{b.badge[1]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-dots" role="tablist" aria-label="Slides">
          {banners.map((b, i) => (
            <button
              key={b.id}
              className={i === index ? 'on' : ''}
              role="tab"
              aria-label={`Slide ${i + 1}`}
              aria-selected={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="hero-nav">
          <button aria-label="Previous slide" onClick={prev}>
            <Icon name="cleft" />
          </button>
          <button aria-label="Next slide" onClick={next}>
            <Icon name="cright" />
          </button>
        </div>
      </div>
    </section>
  );
}
