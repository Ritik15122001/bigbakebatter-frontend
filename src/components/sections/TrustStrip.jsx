import Icon from '../common/Icon';
import PureVegMark from '../common/PureVegMark';

const ITEMS = [
  { icon: 'truck', title: 'Same-day delivery', sub: 'Order before 2 PM' },
  { icon: 'sparkles', title: 'Baked fresh daily', sub: 'No preservatives, ever' },
  { veg: true, title: '100% Pure Veg & Eggless', sub: 'Every single cake, always' },
  { icon: 'star', title: '4.9 average rating', sub: 'From 2,400+ orders' },
];

export default function TrustStrip() {
  return (
    <div className="trust">
      <div className="trust-grid">
        {ITEMS.map((t) => (
          <div className="trust-cell" key={t.title}>
            <span className="tico" style={t.veg ? { background: '#ECFDF3' } : undefined}>
              {t.veg ? <PureVegMark size={20} /> : <Icon name={t.icon} />}
            </span>
            <span>
              <b style={t.veg ? { color: '#15803D' } : undefined}>{t.title}</b>
              <span>{t.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
