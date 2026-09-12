import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import { money } from '../../utils/format';
import { useOrderStore } from '../../store/orderStore';

const STEPS = ['New', 'Baking', 'Out for delivery', 'Delivered'];
const STEP_LABEL = {
  New: 'Order placed',
  Baking: 'In the kitchen',
  'Out for delivery': 'Out for delivery',
  Delivered: 'Delivered',
};
const STEP_TEXT = {
  New: 'We have received your order and it is queued for baking.',
  Baking: 'Your cake is being freshly baked and decorated.',
  'Out for delivery': 'Your rider has picked up the order and is on the way.',
  Delivered: 'Delivered — enjoy!',
};

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const trackByCode = useOrderStore((s) => s.trackByCode);
  const [query, setQuery] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const runSearch = (code) => {
    if (!code.trim()) return;
    setLoading(true);
    setSearched(true);
    trackByCode(code.trim())
      .then(setOrder)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchParams.get('order')) runSearch(searchParams.get('order'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepIndex = order ? (order.status === 'Cancelled' ? -1 : STEPS.indexOf(order.status)) : -1;

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Track order' }]} />
      <h1 className="display-md" style={{ marginBottom: 8 }}>Track your order</h1>
      <p className="lede" style={{ marginBottom: 24 }}>Enter your order ID to see live status.</p>

      <form className="row gap-3" style={{ maxWidth: 460, marginBottom: 32 }} onSubmit={handleSearch}>
        <input
          className="input"
          placeholder="e.g. #BB1048"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          <Icon name="search" className="icon icon-sm" />
          {loading ? 'Searching…' : 'Track'}
        </button>
      </form>

      {searched && !loading && !order && (
        <EmptyState icon="search" title="Order not found" text="Double check the order ID and try again." />
      )}

      {order && (
        <div className="tab-split">
          <div>
            <div className="row between center" style={{ marginBottom: 20 }}>
              <div>
                <b style={{ fontSize: '1.2rem' }}>{order.code}</b>
                <p className="small muted">Placed {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
              </div>
              <span className={`badge ${order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'err' : 'warn'}`}>
                {order.status}
              </span>
            </div>

            {order.status !== 'Cancelled' ? (
              <div className="map-fake" style={{ marginBottom: 28 }}>
                <span className="road" style={{ left: 0, top: '48%', width: '100%', height: 10 }} />
                <span className="road" style={{ left: '38%', top: 0, width: 10, height: '100%' }} />
                <span className="van" style={{ left: stepIndex >= 2 ? '60%' : '20%', top: '40%' }}>
                  <Icon name="truck" className="icon icon-lg" />
                </span>
                <span className="pin" style={{ right: '10%', bottom: '18%' }}>
                  <span>
                    <Icon name="home" className="icon icon-sm" />
                  </span>
                </span>
              </div>
            ) : null}

            <div className="timeline">
              {STEPS.map((s, i) => {
                const done = order.status === 'Cancelled' ? false : i < stepIndex;
                const current = order.status !== 'Cancelled' && i === stepIndex;
                return (
                  <div className={`tl-item ${done ? 'done' : current ? 'current' : 'upcoming'}`} key={s}>
                    <span className="tl-dot">
                      <Icon name={done ? 'check' : current ? 'clock' : 'cal'} className="icon icon-sm" />
                    </span>
                    <h4>{STEP_LABEL[s]}</h4>
                    <p>{STEP_TEXT[s]}</p>
                  </div>
                );
              })}
              {order.status === 'Cancelled' && (
                <div className="tl-item done">
                  <span className="tl-dot" style={{ background: 'var(--c-error)', borderColor: 'var(--c-error)' }}>
                    <Icon name="x" className="icon icon-sm" />
                  </span>
                  <h4>Order cancelled</h4>
                </div>
              )}
            </div>
          </div>

          <aside className="card pad-6">
            <h3 style={{ marginBottom: 14 }}>Delivery details</h3>
            <div className="sum-row">
              <span>Deliver by</span>
              <span>{order.deliver}</span>
            </div>
            <div className="sum-row">
              <span>Slot</span>
              <span>{order.slot}</span>
            </div>
            <div className="sum-row">
              <span>Address</span>
              <span style={{ textAlign: 'right', maxWidth: '60%' }}>{order.addr}</span>
            </div>
            <div className="sum-row total">
              <span>Amount</span>
              <span>{money(order.amount)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
