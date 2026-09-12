import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import { useProductStore } from '../../store/productStore';

export default function ShopDropdown() {
  const categories = useProductStore((s) => s.categories);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="shop-dd" onMouseEnter={show} onMouseLeave={hide}>
      <NavLink
        to="/shop"
        className={({ isActive }) => `shop-dd-trigger ${isActive ? 'active' : ''}`}
        onClick={() => setOpen(false)}
      >
        Shop
        <Icon name="cdown" className="icon icon-sm" />
      </NavLink>
      <div className={`shop-dd-panel ${open ? 'open' : ''}`}>
        <div className="shop-dd-grid">
          {categories
            .filter((c) => c.active)
            .map((c) => (
              <Link key={c.name} to={`/shop?category=${encodeURIComponent(c.name)}`} onClick={() => setOpen(false)}>
                <Icon name={c.icon} className="icon icon-sm" />
                {c.name}
              </Link>
            ))}
        </div>
        <Link className="shop-dd-all" to="/shop" onClick={() => setOpen(false)}>
          View all cakes
          <Icon name="aright" className="icon icon-sm" />
        </Link>
      </div>
    </div>
  );
}
