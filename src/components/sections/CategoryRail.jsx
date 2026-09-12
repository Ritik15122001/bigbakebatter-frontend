import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import { useProductStore } from '../../store/productStore';

export default function CategoryRail() {
  const categories = useProductStore((s) => s.categories);
  const products = useProductStore((s) => s.products);
  const railRef = useRef(null);
  const active = categories.filter((c) => c.active);

  const scroll = (dir) => {
    const r = railRef.current;
    if (r) r.scrollBy({ left: dir * Math.min(560, r.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="section-head">
          <div className="st">
            <span className="kicker kicker-script">Browse</span>
            <h2 className="display-sm">Shop by category</h2>
          </div>
          <div className="rail-btns">
            <button aria-label="Scroll left" onClick={() => scroll(-1)}>
              <Icon name="cleft" className="icon icon-sm" />
            </button>
            <button aria-label="Scroll right" onClick={() => scroll(1)}>
              <Icon name="cright" className="icon icon-sm" />
            </button>
          </div>
        </Reveal>
        <div className="rail" ref={railRef}>
          {active.map((c) => {
            const n = products.filter((p) => p.cat === c.name).length;
            return (
              <Link key={c.name} className="cat-card" to={`/shop?category=${encodeURIComponent(c.name)}`}>
                <span className="cico">
                  <Icon name={c.icon} className="icon icon-lg" />
                </span>
                <b>{c.name}</b>
                <span>
                  {n} cake{n === 1 ? '' : 's'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
