import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { useProductStore } from '../../store/productStore';

function MerchThumb({ product, label }) {
  return (
    <Link to={`/product/${product.id}`} aria-label={product.name}>
      <Pic src={product.img[0]} alt={product.name} ph={product.ph} />
      <span className="cap">{label || product.name}</span>
    </Link>
  );
}

export default function MerchGrid() {
  const products = useProductStore((s) => s.products);

  const cards = useMemo(() => {
    if (!products.length) return [];
    const byCat = (name) => products.filter((p) => p.cat === name);
    const cheap = products.filter((p) => p.base < 650).slice(0, 4);
    const egg = products.filter((p) => p.eggless).slice(0, 4);
    const best = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
    const occ = [byCat('Birthday')[0], byCat('Anniversary')[0], byCat('Cupcakes')[0], byCat('Cheesecakes')[0]].filter(Boolean);

    return [
      { title: 'Shop by occasion', items: occ, labels: ['Birthday', 'Anniversary', 'Cupcakes', 'Cheesecakes'], link: 'Browse all occasions' },
      { title: 'Bestsellers this week', items: best, labels: null, link: 'See all bestsellers' },
      { title: 'Under ₹650 · everyday bakes', items: cheap, labels: null, link: 'See more value picks' },
      { title: '100% pure veg, no exceptions', items: egg, labels: null, link: 'Explore the full menu' },
    ];
  }, [products]);

  if (!cards.length) return null;

  return (
    <div className="merch-grid">
      {cards.map((c) => (
        <article className="merch-card" key={c.title}>
          <h3>{c.title}</h3>
          <div className="merch-thumbs">
            {c.items.map((p, i) => (
              <MerchThumb key={p.id} product={p} label={c.labels ? c.labels[i] : null} />
            ))}
          </div>
          <Link className="mlink" to="/shop">
            {c.link}
            <Icon name="aright" className="icon icon-sm" />
          </Link>
        </article>
      ))}
    </div>
  );
}
