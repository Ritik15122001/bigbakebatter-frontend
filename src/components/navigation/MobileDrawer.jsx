import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import { useUiStore } from '../../store/uiStore';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';
import { useProductStore } from '../../store/productStore';
import { useContentStore } from '../../store/contentStore';
import { formatPhone, telHref } from '../../utils/format';

const LINKS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/shop', label: 'Shop', icon: 'bag' },
  { to: '/custom', label: 'Custom Cakes', icon: 'sparkles' },
  { to: '/corporate-cakes', label: 'Corporate Cakes', icon: 'pkg' },
  { to: '/about', label: 'About', icon: 'info' },
  { to: '/blog', label: 'Blog', icon: 'news' },
  { to: '/account', label: 'Account', icon: 'user' },
  { to: '/wishlist', label: 'Wishlist', icon: 'heart' },
  { to: '/faq', label: 'FAQ', icon: 'msg' },
  { to: '/contact', label: 'Contact', icon: 'phone' },
];

export default function MobileDrawer() {
  const open = useUiStore((s) => s.mobileMenuOpen);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const categories = useProductStore((s) => s.categories);
  const phone = useContentStore((s) => s.settings?.phones?.[0]);

  useEscapeToClose(open, closeMobileMenu);

  return (
    <>
      <div className={`drawer-ov ${open ? 'open' : ''}`} onClick={closeMobileMenu} />
      <aside className={`drawer left ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head">
          <Link className="brand" to="/" onClick={closeMobileMenu}>
            <span className="brand-mark">
              <img src="/brand/logo-icon.png" alt="" />
            </span>
            <span>
              <span className="brand-name">
                BIG<span>BAKE</span>BATTER
              </span>
              <span className="brand-tag">Homemade Cake</span>
            </span>
          </Link>
          <button className="x-btn" aria-label="Close menu" onClick={closeMobileMenu}>
            <Icon name="x" />
          </button>
        </div>
        <div className="drawer-body">
          <nav className="mnav">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={closeMobileMenu}>
                <span className="row gap-3 center">
                  <Icon name={l.icon} className="icon icon-sm" />
                  {l.label}
                </span>
                <Icon name="aright" className="icon icon-sm" />
              </Link>
            ))}
          </nav>
          <div className="stack gap-3" style={{ marginTop: 28 }}>
            <span className="kicker muted">Shop by category</span>
            <div className="row gap-2 wrap">
              {categories
                .filter((c) => c.active)
                .map((c) => (
                  <Link key={c.name} className="chip" to={`/shop?category=${encodeURIComponent(c.name)}`} onClick={closeMobileMenu}>
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="drawer-foot">
          <Link className="btn btn-primary btn-block" to="/shop" onClick={closeMobileMenu}>
            Shop all cakes
          </Link>
          {phone && (
            <a className="row gap-2 center" style={{ justifyContent: 'center' }} href={telHref(phone)}>
              <Icon name="phone" className="icon icon-sm" />
              <span className="small muted">{formatPhone(phone)}</span>
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
