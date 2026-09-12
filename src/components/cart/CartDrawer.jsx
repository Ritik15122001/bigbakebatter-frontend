import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';
import { money } from '../../utils/format';

export default function CartDrawer() {
  const open = useUiStore((s) => s.cartDrawerOpen);
  const closeCartDrawer = useUiStore((s) => s.closeCartDrawer);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  useEscapeToClose(open, closeCartDrawer);

  return (
    <>
      <div className={`drawer-ov ${open ? 'open' : ''}`} onClick={closeCartDrawer} />
      <aside className={`drawer right ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Cart">
        <div className="drawer-head">
          <h3>
            Your cart {items.length > 0 && <span className="badge neutral">{items.reduce((s, i) => s + i.qty, 0)}</span>}
          </h3>
          <button className="x-btn" aria-label="Close" onClick={closeCartDrawer}>
            <Icon name="x" />
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty">
              <span className="eico">
                <Icon name="bag" className="icon-lg" />
              </span>
              <h3>Your cart is empty</h3>
              <p>Add a cake and it will show up right here.</p>
              <Link className="btn btn-primary" to="/shop" onClick={closeCartDrawer}>
                Browse cakes
              </Link>
            </div>
          ) : (
            <>
              {items.map((i) => (
                <div className="mini-line" key={i.key}>
                  <Link className="mt" to={`/product/${i.pid}`} onClick={closeCartDrawer}>
                    <Pic src={i.image} alt={i.name} ph={i.ph} />
                  </Link>
                  <span className="stack grow gap-1">
                    <b style={{ fontSize: 'var(--fs-sm)' }}>{i.name}</b>
                    <span className="tiny muted">
                      {i.weight}
                      {i.eggless ? ' · Eggless' : ''}
                    </span>
                    <span className="row between center" style={{ marginTop: 6 }}>
                      <span className="qty" style={{ height: 30 }}>
                        <button aria-label="Decrease" onClick={() => updateQty(i.key, -1)}>
                          <Icon name="minus" className="icon icon-sm" />
                        </button>
                        <span>{i.qty}</span>
                        <button aria-label="Increase" onClick={() => updateQty(i.key, 1)}>
                          <Icon name="plus" className="icon icon-sm" />
                        </button>
                      </span>
                      <b className="small">{money(i.unit * i.qty)}</b>
                    </span>
                  </span>
                  <button className="x-btn" aria-label="Remove" onClick={() => removeItem(i.key)}>
                    <Icon name="x" className="icon icon-sm" />
                  </button>
                </div>
              ))}
              {subtotal < 1500 && (
                <div className="card pad-4" style={{ marginTop: 16, background: 'var(--c-gold-soft)' }}>
                  <div className="row gap-3">
                    <Icon name="truck" className="icon icon-sm" />
                    <span className="small">Add {money(1500 - subtotal)} more for free delivery.</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="row between">
              <span className="small muted">Subtotal</span>
              <b className="pricetag">{money(subtotal)}</b>
            </div>
            <Link className="btn btn-primary btn-block" to="/checkout" onClick={closeCartDrawer}>
              Checkout · {money(subtotal)}
            </Link>
            <Link className="btn btn-outline btn-block" to="/cart" onClick={closeCartDrawer}>
              View cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
