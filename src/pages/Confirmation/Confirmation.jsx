import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import { money } from '../../utils/format';
import { useOrderStore } from '../../store/orderStore';

const CONFETTI_COLORS = ['#ff3d19', '#09090b', '#ffb020', '#15803d', '#1d4ed8'];

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderCode = location.state?.orderCode;
  const lastOrder = useOrderStore((s) => s.lastOrder);
  const order = lastOrder?.code === orderCode ? lastOrder : null;

  useEffect(() => {
    if (!order) navigate('/', { replace: true });
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="container section">
      <div className="confirm-hero">
        <div className="confetti">
          {Array.from({ length: 24 }).map((_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 4.2) % 100}%`,
                background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                animationDelay: `${(i % 8) * 0.15}s`,
              }}
            />
          ))}
        </div>
        <div className="tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="display-md">Order confirmed!</h1>
        <p className="lede">Thank you, {order.customer.split(' ')[0]} — your order {order.code} is now being prepared.</p>
      </div>

      <div className="card pad-6" style={{ maxWidth: 560, margin: '0 auto' }}>
        <div className="row between center" style={{ marginBottom: 14 }}>
          <b>{order.code}</b>
          <span className="badge success">{order.status}</span>
        </div>
        {order.items.map((it, i) => (
          <div className="sum-row" key={i}>
            <span>{it.name} × {it.qty} ({it.weight})</span>
            <span>{money(it.line)}</span>
          </div>
        ))}
        <div className="sum-row total">
          <span>Total paid</span>
          <span>{money(order.amount)}</span>
        </div>
        <div className="sum-row">
          <span>Delivery</span>
          <span>{order.deliver} · {order.slot}</span>
        </div>
        <div className="sum-row">
          <span>Address</span>
          <span style={{ textAlign: 'right', maxWidth: '60%' }}>{order.addr}</span>
        </div>
      </div>

      <div className="row gap-3 center" style={{ justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
        <Link className="btn btn-primary" to={`/track?order=${encodeURIComponent(order.code)}`}>
          <Icon name="truck" className="icon icon-sm" />
          Track this order
        </Link>
        <Link className="btn btn-outline" to="/shop">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
