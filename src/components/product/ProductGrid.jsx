import ProductCard from './ProductCard';

export default function ProductGrid({ products, className = '' }) {
  return (
    <div className={`grid-products ${className}`.trim()}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
