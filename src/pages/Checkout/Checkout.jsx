import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import DeliveryCalendarModal from '../../components/product/DeliveryCalendarModal';
import { money, fmtDateShort } from '../../utils/format';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';

const PAY_OPTS = [
  { key: 'upi', label: 'UPI', value: 'UPI', sub: 'Google Pay, PhonePe, Paytm & more', icon: 'phone' },
  { key: 'card', label: 'Credit / Debit card', value: 'Card', sub: 'Visa, Mastercard, Rupay', icon: 'gift' },
  { key: 'netbanking', label: 'Net banking', value: 'Net Banking', sub: 'All major Indian banks', icon: 'home' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discount());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());
  const promo = useCartStore((s) => s.promo);
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const profile = useUserStore((s) => s.profile);
  const pushToast = useUiStore((s) => s.pushToast);

  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [addr, setAddr] = useState(profile?.addr || '');
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [calOpen, setCalOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [notes, setNotes] = useState('');
  const [pay, setPay] = useState('upi');
  const [placing, setPlacing] = useState(false);
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) navigate('/cart', { replace: true });
  }, [items.length, navigate]);

  if (items.length === 0) {
    return null;
  }

  const valid = name.trim() && email.includes('@') && phone.trim().length >= 8 && addr.trim() && date && slot;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!valid) {
      pushToast({ title: 'Fill in all required fields', subtitle: 'Address, delivery date and slot are required.', kind: 'err' });
      return;
    }
    setPlacing(true);
    try {
      const order = await placeOrder({
        customer: name,
        email,
        phone,
        addr,
        items: items.map((i) => ({ name: i.name, weight: i.weight, qty: i.qty, line: i.unit * i.qty, pid: i.pid })),
        amount: total,
        deliver: `${fmtDateShort(date)} 2026`,
        slot,
        msg,
        notes,
        pay: PAY_OPTS.find((p) => p.key === pay)?.value,
      });
      orderPlacedRef.current = true;
      clearCart();
      navigate('/confirmation', { state: { orderCode: order.code } });
    } catch (err) {
      pushToast({ title: 'Could not place order', subtitle: err.message, kind: 'err' });
      setPlacing(false);
    }
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="display-md" style={{ marginBottom: 24 }}>Checkout</h1>

      <form className="co-layout" onSubmit={handlePlaceOrder}>
        <div>
          <div className="co-step">
            <h3><span className="sn">1</span>Contact details</h3>
            <div className="form-grid two">
              <div className="field">
                <label>Full name</label>
                <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label>Phone</label>
                <input className="input" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="field span2">
                <label>Email</label>
                <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="co-step">
            <h3><span className="sn">2</span>Delivery address</h3>
            <div className="field">
              <label>Full address</label>
              <textarea className="textarea" rows={3} required value={addr} onChange={(e) => setAddr(e.target.value)} />
            </div>
          </div>

          <div className="co-step">
            <h3><span className="sn">3</span>Date &amp; slot</h3>
            <button type="button" className="field" style={{ border: '1.5px solid var(--c-border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left' }} onClick={() => setCalOpen(true)}>
              <Icon name="cal" className="icon icon-sm" />
              <span className="grow small">
                {date ? `${fmtDateShort(date)}${slot ? ' · ' + slot : ''}` : 'Choose a delivery date & slot'}
              </span>
              <Icon name="cright" className="icon icon-sm" />
            </button>
          </div>

          <div className="co-step">
            <h3><span className="sn">4</span>Cake message &amp; notes</h3>
            <div className="form-grid">
              <div className="field">
                <label>Message on cake (optional)</label>
                <input className="input" maxLength={30} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="e.g. Happy Birthday Aanya!" />
              </div>
              <div className="field">
                <label>Delivery notes (optional)</label>
                <textarea className="textarea" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Landmark, gate code, anything the rider should know" />
              </div>
            </div>
          </div>

          <div className="co-step">
            <h3><span className="sn">5</span>Payment</h3>
            <div className="stack gap-3">
              {PAY_OPTS.map((p) => (
                <label key={p.key} className={`pay-opt ${pay === p.key ? 'on' : ''}`}>
                  <span className="pico">
                    <Icon name={p.icon} className="icon icon-sm" />
                  </span>
                  <span className="grow">
                    <b>{p.label}</b>
                    <span>{p.sub}</span>
                  </span>
                  <span className="check radio">
                    <input type="radio" name="pay" checked={pay === p.key} onChange={() => setPay(p.key)} />
                  </span>
                </label>
              ))}
            </div>
            <p className="tiny muted" style={{ marginTop: 12 }}>We do not offer cash on delivery — all orders are prepaid online.</p>
          </div>
        </div>

        <aside className="summary">
          <h3 style={{ marginBottom: 14 }}>Order summary</h3>
          {items.map((i) => (
            <div className="sum-row" key={i.key}>
              <span>{i.name} × {i.qty}</span>
              <span>{money(i.unit * i.qty)}</span>
            </div>
          ))}
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="sum-row">
              <span>Discount {promo ? `(${promo.code})` : ''}</span>
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
          <button className="btn btn-primary btn-block" type="submit" disabled={placing}>
            Place order · {money(total)}
          </button>
        </aside>
      </form>

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
