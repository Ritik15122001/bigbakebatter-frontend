import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import { money } from '../../utils/format';
import { useProductStore } from '../../store/productStore';

const FLOW = ['New', 'Baking', 'Out for delivery', 'Delivered'];

export function statusTone(status) {
  if (status === 'Delivered') return 'success';
  if (status === 'Cancelled') return 'err';
  if (status === 'Out for delivery') return 'gold';
  return 'warn';
}

export function fmtDateTime(value) {
  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function OrdersTab({ orders, loaded }) {
  const products = useProductStore((s) => s.products);

  if (!loaded) {
    return (
      <div className="stack gap-4">
        {[1, 2, 3].map((i) => (
          <div className="order-card" key={i} style={{ height: 150 }}>
            <div className="skel" style={{ height: '100%' }} />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="No orders yet"
        text="Once you place an order it shows up here with live status, delivery details and your invoice."
        action={{ to: '/shop', label: 'Start shopping' }}
      />
    );
  }

  const imgFor = (item) => products.find((p) => p.id === item.pid || p.name === item.name)?.img?.[0];
  const phFor = (item) => products.find((p) => p.id === item.pid || p.name === item.name)?.ph;

  return (
    <div className="stack gap-4">
      {orders.map((o) => {
        const stepIdx = o.status === 'Cancelled' ? FLOW.length : FLOW.indexOf(o.status);
        const shown = o.items.slice(0, 3);
        const extra = o.items.length - shown.length;
        return (
          <article className="order-card" key={o.id}>
            <div className="oc-head">
              <span className="row gap-3 center wrap">
                <span className="oc-code">{o.code}</span>
                <span className="tiny muted">{fmtDateTime(o.createdAt)}</span>
              </span>
              <span className={`badge ${statusTone(o.status)}`}>{o.status}</span>
            </div>

            <div className="oc-body">
              <span className="oc-thumbs">
                {shown.map((it, i) => (
                  <span className="oc-thumb" key={`${it.name}-${i}`}>
                    <Pic src={imgFor(it)} alt={it.name} ph={phFor(it)} />
                    {i === shown.length - 1 && extra > 0 && <span className="more">+{extra}</span>}
                  </span>
                ))}
              </span>
              <span className="stack gap-2 grow" style={{ minWidth: 180 }}>
                <span className="small" style={{ color: 'var(--c-ink)', fontWeight: 500 }}>
                  {o.items.map((it) => `${it.name} × ${it.qty}`).join(', ')}
                </span>
                <span className={`oc-steps ${o.status === 'Cancelled' ? 'cancelled' : ''}`} aria-hidden="true">
                  {FLOW.map((s, i) => (
                    <i key={s} className={i <= stepIdx ? 'on' : ''} />
                  ))}
                </span>
              </span>
              <span className="stack gap-2" style={{ alignItems: 'flex-end' }}>
                <b style={{ fontSize: '1.1rem' }}>{money(o.amount)}</b>
                <Link className="btn btn-dark btn-sm" to={`/track?order=${encodeURIComponent(o.code)}`}>
                  <Icon name="truck" className="icon icon-sm" />
                  {o.status === 'Delivered' || o.status === 'Cancelled' ? 'View details' : 'Track order'}
                </Link>
              </span>
            </div>

            <dl className="oc-meta">
              <div>
                <dt>Deliver by</dt>
                <dd>{o.deliver || '—'}</dd>
              </div>
              <div>
                <dt>Slot</dt>
                <dd>{o.slot || '—'}</dd>
              </div>
              <div>
                <dt>Paid via</dt>
                <dd>{o.pay}</dd>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <dt>Delivery address</dt>
                <dd>{o.addr}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
