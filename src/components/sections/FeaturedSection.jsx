import { useMemo } from 'react';
import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';
import ProductCard from '../product/ProductCard';
import { useProductStore } from '../../store/productStore';

export default function FeaturedSection() {
  const products = useProductStore((s) => s.products);
  const featured = useMemo(
    () => [...products.filter((p) => p.tag), ...products.filter((p) => !p.tag)].slice(0, 4),
    [products]
  );

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHead
            kicker="Handpicked"
            title="This week's featured cakes"
            sub="Four bakes our kitchen is particularly proud of right now."
            link={{ to: '/shop', label: 'View all cakes' }}
          />
        </Reveal>
        <Reveal className="grid-products">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
