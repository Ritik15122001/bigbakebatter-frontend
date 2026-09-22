import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import { money } from '../../utils/format';
import { fmtDateTime } from './OrdersTab';

const FILTERS = ['All', 'Paid', 'Refunded'];
const METHOD_ICON = { UPI: 'phone', Card: 'gift', 'Net Banking': 'home' };

export default function TransactionsTab({ transactions, loaded }) {
  const [filter, setFilter] = useState('All');

  const shown = useMemo(
    () => (filter === 'All' ? transactions : transactions.filter((t) => t.status === filter)),
    [transactions, filter]
  );

  const totals = useMemo(() => {
    const paid = transactions.filter((t) => t.status === 'Paid');
    const refunded = transactions.filter((t) => t.status === 'Refunded');
    return {
      spent: paid.reduce((sum, t) => sum + t.amount, 0),
      refunded: refunded.reduce((sum, t) => sum + t.amount, 0),
      count: transactions.length,
    };
  }, [transactions]);

  if (!loaded) {
    return <div className="skel" style={{ height: 260, borderRadius: 'var(--r-lg)' }} />;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon="card"
        title="No payments yet"
        text="Every payment you make shows up here with its receipt, reference id and exact time."
        action={{ to: '/shop', label: 'Browse cakes' }}
      />
    );
  }

  return (
    <div className="stack gap-5">
      <div className="acct-hero" style={{ marginBottom: 0 }}>
        <div className="acct-stat">
          <b>{money(totals.spent)}</b>
          <span>Total paid</span>
        </div>
        <div className="acct-stat">
          <b>{totals.count}</b>
          <span>Transaction{totals.count === 1 ? '' : 's'}</span>
        </div>
        {totals.refunded > 0 && (
          <div className="acct-stat">
            <b style={{ color: 'var(--c-warning)' }}>{money(totals.refunded)}</b>
            <span>Refunded</span>
          </div>
        )}
      </div>

      <div className="row gap-2 wrap">
        {FILTERS.map((f) => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="muted small" style={{ padding: 'var(--s-6) 0' }}>No {filter.toLowerCase()} transactions.</p>
      ) : (
        <div className="txn-list">
          {shown.map((t) => (
            <div className="txn-row" key={t.id}>
              <span className={`txn-ico ${t.status.toLowerCase()}`}>
                <Icon name={t.status === 'Paid' ? 'check' : t.status === 'Refunded' ? 'refresh' : 'alert'} className="icon icon-sm" />
              </span>
              <span className="stack gap-1" style={{ minWidth: 0 }}>
                <b className="small">
                  {t.orderCode ? `Order ${t.orderCode}` : 'Payment'}
                  {t.status === 'Refunded' && <span className="badge warn" style={{ marginLeft: 8 }}>Refunded</span>}
                </b>
                <span className="tiny muted">{fmtDateTime(t.paidAt)}</span>
              </span>
              <span className="stack gap-1 txn-mid" style={{ minWidth: 0 }}>
                <span className="tiny muted">
                  <Icon name={METHOD_ICON[t.method] || 'card'} className="icon icon-sm" /> {t.method}
                </span>
                <span className="txn-mono" title={t.razorpayPaymentId}>{t.txnId}</span>
              </span>
              <span className="stack gap-1" style={{ alignItems: 'flex-end' }}>
                <span className={`amt ${t.status === 'Refunded' ? 'refunded' : ''}`}>{money(t.amount)}</span>
                {t.orderCode && (
                  <Link className="tiny link-underline" to={`/track?order=${encodeURIComponent(t.orderCode)}`}>
                    View order
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
