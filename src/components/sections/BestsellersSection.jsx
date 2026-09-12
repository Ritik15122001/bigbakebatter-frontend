import { useMemo, useRef } from 'react';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import ProductCard from '../product/ProductCard';
import { useProductStore } from '../../store/productStore';

export default function BestsellersSection() {
  const products = useProductStore((s) => s.products);
  const best = useMemo(() => [...products].sort((a, b) => b.sold - a.sold).slice(0, 6), [products]);
  const railRef = useRef(null);

  const scroll = (dir) => {
    const r = railRef.current;
    if (r) r.scrollBy({ left: dir * Math.min(560, r.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div className="st">
            <span className="kicker kicker-script">Loved most</span>
            <h2 className="display-md">Bestsellers this month</h2>
            <p className="lede">Ranked by what actually left the kitchen.</p>
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
          {best.map((p) => (
            <ProductCard key={p.id} product={p} className="pcard-rail" />
          ))}
        </div>
      </div>
    </section>
  );
}
