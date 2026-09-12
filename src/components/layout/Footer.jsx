import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import PureVegMark from '../common/PureVegMark';
import { useProductStore } from '../../store/productStore';
import { useContentStore } from '../../store/contentStore';
import { formatPhone, telHref } from '../../utils/format';

export default function Footer() {
  const categories = useProductStore((s) => s.categories);
  const settings = useContentStore((s) => s.settings);
  const phone = settings?.phones?.[0];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <Link className="brand" to="/">
              <span className="brand-mark-wrap">
                <span className="brand-mark">
                  <img src="/brand/logo-icon.png" alt="" />
                </span>
                <PureVegMark size={11} tone="#4ADE80" className="brand-veg-badge" />
              </span>
              <span>
                <span className="brand-name">
                  BIG<span>BAKE</span>BATTER
                </span>
                <span className="row gap-1 center" style={{ marginTop: 1 }}>
                  <span className="brand-tag" style={{ marginTop: 0 }}>Homemade Cake</span>
                </span>
              </span>
            </Link>
            <p>
              Delhi-NCR's homemade cake specialists since {settings?.since || 2017} — design-led birthday cakes,
              muffins and more, baked hot-n-fresh and delivered with 100% freshness intact.
            </p>
            <div className="stack gap-2" style={{ marginTop: 14 }}>
              {phone && (
                <a className="row gap-2 center small" style={{ whiteSpace: 'nowrap' }} href={telHref(phone)}>
                  <Icon name="phone" className="icon icon-sm" />
                  {formatPhone(phone)}
                </a>
              )}
              <span className="row gap-2 small" style={{ alignItems: 'flex-start' }}>
                <Icon name="home" className="icon icon-sm" style={{ marginTop: 2 }} />
                <span>Bisrakh Jalalpur, Greater Noida West, UP 201306</span>
              </span>
            </div>
            <div className="socials" style={{ marginTop: 20 }}>
              <a href={settings?.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="insta" className="icon icon-sm" />
              </a>
              <a href={settings?.social?.facebook || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="fb" className="icon icon-sm" />
              </a>
              <a href={settings?.social?.twitter || '#'} target="_blank" rel="noopener noreferrer" aria-label="X">
                <Icon name="tw" className="icon icon-sm" />
              </a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            {categories.slice(0, 5).map((c) => (
              <Link key={c.name} to={`/shop?category=${encodeURIComponent(c.name)}`}>
                {c.name}
              </Link>
            ))}
            <Link to="/shop">All cakes</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/custom">Custom cakes</Link>
            <Link to="/corporate-cakes">Corporate cakes</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <h4>Help</h4>
            <Link to="/track">Track your order</Link>
            <Link to="/orders">My orders</Link>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms &amp; conditions</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 BigBakeBatter. All rights reserved.</span>
          <div className="pay-marks">
            <span>UPI</span>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
