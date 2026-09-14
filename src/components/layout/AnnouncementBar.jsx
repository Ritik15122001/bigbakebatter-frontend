import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import PureVegMark from '../common/PureVegMark';
import { useContentStore } from '../../store/contentStore';
import { formatPhone, telHref } from '../../utils/format';

const MESSAGES = [
  { icon: 'sparkles', text: 'Freshly baked today · Same-day delivery available' },
  { icon: 'percent', text: 'FIRST20 — 20% off your first order' },
  { veg: true, text: '100% Pure Veg & Eggless — every single cake' },
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);
  const phone = useContentStore((s) => s.settings?.phones?.[0]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % MESSAGES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="announce">
      <div className="container">
        <div className="announce-side">
          <Icon name="phone" className="icon icon-sm" />
          {phone && <a href={telHref(phone)}>{formatPhone(phone)}</a>}
        </div>
        <div className="announce-mid">
          {MESSAGES.map((m, i) => (
            <span key={m.text} className={`a-item ${i === active ? 'on' : ''}`}>
              {m.veg ? <PureVegMark size={14} tone="#4ADE80" /> : <Icon name={m.icon} className="icon icon-sm" />}
              {m.text}
            </span>
          ))}
        </div>
        <div className="announce-side">
          <Link to="/track">Track order</Link>
        </div>
      </div>
    </div>
  );
}
