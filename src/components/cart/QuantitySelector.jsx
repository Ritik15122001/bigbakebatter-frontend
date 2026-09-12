import Icon from '../common/Icon';

export default function QuantitySelector({ qty, onChange, min = 1 }) {
  return (
    <div className="qty">
      <button aria-label="Decrease" disabled={qty <= min} onClick={() => onChange(qty - 1)}>
        <Icon name="minus" className="icon icon-sm" />
      </button>
      <span>{qty}</span>
      <button aria-label="Increase" onClick={() => onChange(qty + 1)}>
        <Icon name="plus" className="icon icon-sm" />
      </button>
    </div>
  );
}
