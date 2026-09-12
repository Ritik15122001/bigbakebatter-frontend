import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import Reveal from '../../components/common/Reveal';
import SectionHead from '../../components/common/SectionHead';
import ProductGrid from '../../components/product/ProductGrid';
import { money } from '../../utils/format';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { useProductStore } from '../../store/productStore';

export default function Cart() {
  const navigate = useNavigate();
  const products = useProductStore((s) => s.products);
  const items = useCartStore((s) => s.items);
  const savedLater = useCartStore((s) => s.savedLater);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const saveForLater = useCartStore((s) => s.saveForLater);
  const moveToCart = useCartStore((s) => s.moveToCart);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);
  const promo = useCartStore((s) => s.promo);
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discount());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());
  const pushToast = useUiStore((s) => s.pushToast);

  const [promoInput, setPromoInput] = useState('');
  const suggestions = products.slice(0, 4);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    pushToast(ok ? { title: 'Promo applied', subtitle: '20% off your order', kind: 'ok' } : { title: 'Invalid promo code', kind: 'err' });
    if (ok) setPromoInput('');
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="display-md" style={{ marginBottom: 24 }}>Your cart</h1>

      {items.length === 0 ? (
        <EmptyState icon="bag" title="Your cart is empty" text="Add a cake and it will show up right here." action={{ to: '/shop', label: 'Browse cakes' }} />
      ) : (
        <div className="cart-layout">
          <div>
            {items.map((i) => (
              <div className="cart-line" key={i.key}>
                <Link className="cart-thumb" to={i.isAddon ? '/shop' : `/product/${i.pid}`}>
                  <Pic src={i.image} alt={i.name} ph={i.ph} />
                </Link>
                <div className="stack gap-1">
                  <b>{i.name}</b>
                  <span className="small muted">
                    {i.weight}
                    {i.eggless ? ' · Eggless' : ''}
                    {i.msg ? ` · "${i.msg}"` : ''}
                  </span>
                  <span className="row gap-3 center" style={{ marginTop: 6 }}>
                    <span className="qty">
                      <button aria-label="Decrease" onClick={() => updateQty(i.key, -1)}>
                        <Icon name="minus" className="icon icon-sm" />
                      </button>
                      <span>{i.qty}</span>
                      <button aria-label="Increase" onClick={() => updateQty(i.key, 1)}>
                        <Icon name="plus" className="icon icon-sm" />
                      </button>
                    </span>
                    {!i.isAddon && (
                      <button className="btn btn-ghost btn-sm" onClick={() => saveForLater(i.key)}>
                        Save for later
                      </button>
                    )}
                  </span>
                </div>
                <span className="stack" style={{ alignItems: 'flex-end', gap: 10 }}>
                  <b className="pricetag">{money(i.unit * i.qty)}</b>
                  <button className="x-btn" aria-label="Remove" onClick={() => removeItem(i.key)}>
                    <Icon name="x" className="icon icon-sm" />
                  </button>
                </span>
              </div>
            ))}

            {savedLater.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ marginBottom: 14 }}>Saved for later</h3>
                <div className="saved-strip">
                  {savedLater.map((i) => (
                    <div className="cart-line" key={i.key} style={{ minWidth: 260, border: '1px solid var(--c-border)', borderRadius: 'var(--r-md)', padding: 12 }}>
                      <span className="cart-thumb">
                        <Pic src={i.image} alt={i.name} ph={i.ph} />
                      </span>
                      <div className="stack gap-1">
                        <b className="small">{i.name}</b>
                        <span className="tiny muted">{i.weight}</span>
                        <button className="btn btn-outline btn-sm" style={{ marginTop: 6 }} onClick={() => moveToCart(i.key)}>
                          Move to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="summary">
            <h3 style={{ marginBottom: 14 }}>Order summary</h3>
            <div className="promo-row">
              <input
                className="input"
                placeholder="Promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button className="btn btn-outline" onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
            {promo && (
              <div className="row between center" style={{ marginBottom: 8 }}>
                <span className="badge success">{promo.code} applied</span>
                <button className="tiny muted" onClick={clearPromo}>Remove</button>
              </div>
            )}
            <div className="sum-row">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="sum-row">
                <span>Discount</span>
                <span>-{money(discount)}</span>
              </div>
            )}
            <div className="sum-row">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'Free' : money(deliveryFee)}</span>
            </div>
            <div className="sum-row total">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
            {subtotal < 1500 && (
              <p className="tiny muted" style={{ marginBottom: 14 }}>
                Add {money(1500 - subtotal)} more for free delivery.
              </p>
            )}
            <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
              Proceed to checkout
              <Icon name="aright" className="icon icon-sm" />
            </button>
          </aside>
        </div>
      )}

      <div style={{ marginTop: 'var(--s-9)' }}>
        <Reveal>
          <SectionHead kicker="Goes well together" title="You may also like" />
        </Reveal>
        <ProductGrid products={suggestions} />
      </div>
    </div>
  );
}
