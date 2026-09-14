import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';
import Stars from '../common/Stars';
import Pic from '../common/Pic';
import PureVegMark from '../common/PureVegMark';
import { weightsFor } from '../../data/products';
import { money } from '../../utils/format';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { shareProduct } from '../../utils/share';

export default function ProductCard({ product, className = '' }) {
  const navigate = useNavigate();
  const isWished = useWishlistStore((s) => s.isWished(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useUiStore((s) => s.pushToast);

  const weights = weightsFor(product.base);
  const out = product.stock === 'Out of stock';

  const handleOpen = () => navigate(`/product/${product.id}`);

  const handleWish = (e) => {
    e.stopPropagation();
    toggleWish(product.id);
    pushToast({
      title: isWished ? 'Removed from wishlist' : 'Added to wishlist',
      subtitle: isWished ? '' : product.name,
      kind: isWished ? 'info' : 'ok',
    });
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(product, 0, 1, {});
    pushToast({ title: 'Added to cart', subtitle: `${product.name} · 0.5 KG`, kind: 'ok' });
    useUiStore.getState().openAddonsModal();
  };

  const handleShare = (e) => {
    e.stopPropagation();
    shareProduct(product, pushToast);
  };

  return (
    <article
      className={`pcard ${out ? 'out' : ''} ${className}`.trim()}
      onClick={handleOpen}
      onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      tabIndex={0}
      role="link"
      aria-label={product.name}
    >
      <div className="pcard-media">
        <Pic src={product.img[0]} alt={product.name} ph={product.ph} />
        <div className="pcard-badges">
          {product.tag && <span className={`badge ${product.tag === 'Seasonal' ? 'gold' : ''}`}>{product.tag}</span>}
          {product.stock === 'Low stock' && <span className="badge warn">Only {product.qty} left</span>}
        </div>
        <button className="pcard-share" aria-label="Share this cake" onClick={handleShare}>
          <Icon name="share" className="icon icon-sm" />
        </button>
        <button
          className={`pcard-wish ${isWished ? 'on' : ''}`}
          aria-label="Add to wishlist"
          aria-pressed={isWished}
          onClick={handleWish}
        >
          <Icon name="heart" className="icon icon-sm" />
        </button>
        {out ? (
          <div className="pcard-out-tag">
            <span>Sold out</span>
          </div>
        ) : (
          <div className="pcard-quick">
            <button className="btn btn-dark btn-sm btn-block" onClick={handleQuickAdd}>
              <Icon name="bag" className="icon icon-sm" />
              Quick add · {money(weights[0].amount)}
            </button>
          </div>
        )}
      </div>
      <div className="pcard-body">
        <span className="row gap-2" style={{ marginBottom: 2, alignItems: 'flex-start' }}>
          <PureVegMark size={13} className="pcard-veg" />
          <h3 style={{ margin: 0 }}>{product.name}</h3>
        </span>
        <span className="pcard-flav">{product.flavour}</span>
        <span className="pcard-rate">
          <Stars rating={product.rating} />
          <b style={{ color: 'var(--c-ink)' }}>{product.rating}</b>
          <span>({product.reviews})</span>
        </span>
        <div className="pcard-foot">
          <span className="pcard-price">
            <small>Starting at</small>
            <span className="pricetag">{money(weights[0].amount)}</span>
          </span>
          {out ? <span className="badge err">Sold out</span> : <span className="badge neutral">{product.cat}</span>}
        </div>
      </div>
    </article>
  );
}
