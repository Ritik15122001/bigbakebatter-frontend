import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import Stars from '../../components/common/Stars';
import PureVegMark from '../../components/common/PureVegMark';
import Reveal from '../../components/common/Reveal';
import SectionHead from '../../components/common/SectionHead';
import ProductGrid from '../../components/product/ProductGrid';
import QuantitySelector from '../../components/cart/QuantitySelector';
import DeliveryCalendarModal from '../../components/product/DeliveryCalendarModal';
import { weightsFor } from '../../data/products';
import { money, fmtDateShort } from '../../utils/format';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';
import { useProductStore } from '../../store/productStore';
import { shareProduct } from '../../utils/share';

const TABS = ['Description', 'Ingredients & care', 'Delivery', 'Reviews'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useProductStore((s) => s.products);
  const product = products.find((p) => p.id === id);

  const addItem = useCartStore((s) => s.addItem);
  const isWished = useWishlistStore((s) => s.isWished(id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const pushToast = useUiStore((s) => s.pushToast);
  const openAddonsModal = useUiStore((s) => s.openAddonsModal);

  const [activeImg, setActiveImg] = useState(0);
  const [weightIdx, setWeightIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [calOpen, setCalOpen] = useState(false);
  const [tab, setTab] = useState(TABS[0]);

  const related = useMemo(
    () => (product ? products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4) : []),
    [product, products]
  );

  if (!product) {
    return (
      <div className="container section text-center">
        <h1>Cake not found</h1>
        <p className="lede">That one may have sold out for good. Have a look at the rest of the menu.</p>
        <Link className="btn btn-primary" to="/shop">
          Back to shop
        </Link>
      </div>
    );
  }

  const weights = weightsFor(product.base);
  const price = weights[weightIdx].amount;
  const out = product.stock === 'Out of stock';

  const buildOpts = () => ({ eggless: true, msg });

  const handleAdd = () => {
    addItem(product, weightIdx, qty, buildOpts());
    pushToast({ title: 'Added to cart', subtitle: `${product.name} · ${weights[weightIdx].w}`, kind: 'ok' });
  };

  const handleBuyNow = () => {
    addItem(product, weightIdx, qty, buildOpts());
    openAddonsModal();
  };

  const handleWish = () => {
    toggleWish(product.id);
    pushToast({ title: isWished ? 'Removed from wishlist' : 'Added to wishlist', kind: isWished ? 'info' : 'ok' });
  };

  const handleShare = () => shareProduct(product, pushToast);

  return (
    <div className="container section">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: product.cat, to: `/shop?category=${encodeURIComponent(product.cat)}` },
          { label: product.name },
        ]}
      />

      <div className="pdp">
        <div className="gallery">
          <div className="gal-main">
            <Pic src={product.img[activeImg]} alt={product.name} ph={product.ph} />
          </div>
          <div className="gal-thumbs">
            {product.img.map((src, i) => (
              <button key={src} className={i === activeImg ? 'on' : ''} onClick={() => setActiveImg(i)} aria-label={`Photo ${i + 1}`}>
                <Pic src={src} alt="" ph={product.ph} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="row gap-2 center" style={{ marginBottom: 6 }}>
            <PureVegMark label="100% Pure Veg" />
            {product.tag && <span className="badge">{product.tag}</span>}
          </span>
          <h1 className="pdp-title">{product.name}</h1>
          <p className="muted" style={{ marginBottom: 10 }}>{product.flavour}</p>
          <span className="row gap-2 center" style={{ marginBottom: 18 }}>
            <Stars rating={product.rating} />
            <b className="small">{product.rating}</b>
            <span className="small muted">({product.reviews} reviews) · {product.sold} sold</span>
          </span>

          <div className="price-block" style={{ marginBottom: 20 }}>
            <span className="now">{money(price)}</span>
            {product.stock === 'Low stock' && <span className="badge warn">Only {product.qty} left</span>}
            {out && <span className="badge err">Sold out</span>}
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Weight</label>
            <div className="opt-row">
              {weights.map((w, i) => (
                <button key={w.w} className={`opt ${i === weightIdx ? 'on' : ''}`} onClick={() => setWeightIdx(i)}>
                  {w.w}
                  <small>{money(w.amount)}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label htmlFor="cakemsg">Message on cake (free, optional)</label>
            <input
              id="cakemsg"
              className="input"
              placeholder="e.g. Happy Birthday Aanya!"
              maxLength={30}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Delivery</label>
            <button className="field" style={{ border: '1.5px solid var(--c-border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left' }} onClick={() => setCalOpen(true)}>
              <Icon name="cal" className="icon icon-sm" />
              <span className="grow small">
                {date ? `${fmtDateShort(date)}${slot ? ' · ' + slot : ''}` : 'Choose a delivery date & slot'}
              </span>
              <Icon name="cright" className="icon icon-sm" />
            </button>
          </div>

          <div className="row gap-3 center" style={{ marginBottom: 20 }}>
            <QuantitySelector qty={qty} onChange={(v) => setQty(Math.max(1, v))} />
            <button className={`btn-icon ${isWished ? 'on' : ''}`} aria-label="Wishlist" onClick={handleWish} style={isWished ? { color: 'var(--c-accent)' } : undefined}>
              <Icon name="heart" />
            </button>
            <button className="btn-icon" aria-label="Share this cake" onClick={handleShare}>
              <Icon name="share" />
            </button>
          </div>

          <div className="pdp-actions">
            <button className="btn btn-outline" disabled={out} onClick={handleAdd}>
              <Icon name="bag" className="icon icon-sm" />
              Add to cart
            </button>
            <button className="btn btn-primary" disabled={out} onClick={handleBuyNow}>
              Buy now
            </button>
          </div>

          <dl className="spec-list" style={{ marginTop: 20 }}>
            <div>
              <dt>Category</dt>
              <dd>{product.cat}</dd>
            </div>
            <div>
              <dt>Dietary</dt>
              <dd>Eggless · Pure veg</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>Same-day before 2 PM</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{product.stock}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="pdp-tabbody">
        <div className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'Description' && (
          <div style={{ paddingTop: 24, maxWidth: '70ch' }}>
            <p>{product.desc}</p>
          </div>
        )}

        {tab === 'Ingredients & care' && (
          <div style={{ paddingTop: 24, maxWidth: '70ch' }}>
            <p>Made with refined flour, dairy cream, sugar and natural flavouring — completely eggless. Baked without preservatives.</p>
            <p>Refrigerate until an hour before serving. Best enjoyed within 24 hours of delivery.</p>
          </div>
        )}

        {tab === 'Delivery' && (
          <div style={{ paddingTop: 24, maxWidth: '70ch' }}>
            <p>Order before 2 PM for same-day delivery in serviceable areas. Pick a slot at checkout — we'll text you when the rider is on the way.</p>
            <p>Cash on delivery is not available; pay securely online via UPI, card or net banking.</p>
          </div>
        )}

        {tab === 'Reviews' && (
          <div style={{ paddingTop: 24 }} className="tab-split">
            <div className="review-grid">
              {[1, 2].map((i) => (
                <div className="review" key={i}>
                  <p className="quote">Delicious and delivered right on time. Will order again for sure.</p>
                  <div className="who">
                    <span className="avatar">R</span>
                    <span>
                      <b style={{ display: 'block', fontSize: 'var(--fs-sm)' }}>Reviewer {i}</b>
                    </span>
                    <Stars rating={5} />
                  </div>
                </div>
              ))}
            </div>
            <div className="rate-summary" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
              <span className="rate-big">{product.rating}</span>
              <Stars rating={product.rating} />
              <span className="small muted">{product.reviews} reviews</span>
              {[5, 4, 3, 2, 1].map((n) => (
                <span key={n} className="row gap-3 center" style={{ width: '100%' }}>
                  <span className="tiny muted" style={{ width: 12 }}>{n}</span>
                  <span className="bar">
                    <i style={{ width: `${n === Math.round(product.rating) ? 70 : 20 / n}%` }} />
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 'var(--s-9)' }}>
          <Reveal>
            <SectionHead kicker="You may also like" title="More from this category" />
          </Reveal>
          <ProductGrid products={related} />
        </div>
      )}

      <div className="pdp-sticky">
        <span className="grow">
          <b className="pricetag">{money(price)}</b>
        </span>
        <button className="btn btn-outline" disabled={out} onClick={handleAdd} style={{ flex: 1 }}>
          Add to cart
        </button>
        <button className="btn btn-primary" disabled={out} onClick={handleBuyNow} style={{ flex: 1 }}>
          Buy now
        </button>
      </div>

      <DeliveryCalendarModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        date={date}
        slot={slot}
        onPick={(d, s) => {
          setDate(d);
          setSlot(s);
          setCalOpen(false);
        }}
      />
    </div>
  );
}
