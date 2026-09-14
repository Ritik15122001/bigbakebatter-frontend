import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import PureVegMark from '../common/PureVegMark';
import NavSearch from '../navigation/NavSearch';
import ShopDropdown from '../navigation/ShopDropdown';
import AnnouncementBar from './AnnouncementBar';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';

const NAV_LINKS_BEFORE = [{ to: '/', label: 'Home', end: true }];
const NAV_LINKS_AFTER = [
  { to: '/custom', label: 'Custom Cakes' },
  { to: '/corporate-cakes', label: 'Corporate' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const wishCount = useWishlistStore((s) => s.count());
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const profile = useUserStore((s) => s.profile);
  const openMobileMenu = useUiStore((s) => s.openMobileMenu);
  const openCartDrawer = useUiStore((s) => s.openCartDrawer);
  const openSearch = useUiStore((s) => s.openSearch);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className={`site-header ${stuck ? 'stuck' : ''}`}>
        <div className="container">
          <nav className="nav">
            <button className="btn-icon burger" aria-label="Open menu" onClick={openMobileMenu}>
              <Icon name="menu" className="icon icon-lg" />
            </button>
            <Link className="brand" to="/" aria-label="BigBakeBatter home">
              <span className="brand-mark-wrap">
                <span className="brand-mark">
                  <img src="/brand/logo-icon.png" alt="" />
                </span>
                <PureVegMark size={11} className="brand-veg-badge" />
              </span>
              <span>
                <span className="brand-name">
                  BIG<span>BAKE</span>BATTER
                </span>
                <span className="brand-tag-row row gap-1 center" style={{ marginTop: 1 }}>
                  <span className="brand-tag" style={{ marginTop: 0 }}>Homemade Cake</span>
                </span>
              </span>
            </Link>
            <div className="nav-links">
              {NAV_LINKS_BEFORE.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {l.label}
                </NavLink>
              ))}
              <ShopDropdown />
              {NAV_LINKS_AFTER.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {l.label}
                </NavLink>
              ))}
            </div>
            <NavSearch />
            <div className="nav-actions">
              <button className="btn-icon only-mobile" aria-label="Search" onClick={openSearch}>
                <Icon name="search" />
              </button>
              <Link className="btn-icon d-none-sm" to="/wishlist" aria-label="Wishlist" title="Wishlist">
                <Icon name="heart" />
                {wishCount > 0 && <span className="count-dot">{wishCount}</span>}
              </Link>
              <button className="btn-icon" aria-label="Cart" title="Cart" onClick={openCartDrawer}>
                <Icon name="bag" />
                {cartCount > 0 && <span className="count-dot">{cartCount}</span>}
              </button>
              {isLoggedIn ? (
                <Link className="acct-chip d-none-sm" to="/account" title="My account">
                  <span className="avatar">{profile.name[0]}</span>
                  <span className="stack">
                    <span className="tiny muted">Hello,</span>
                    <b>{profile.name.split(' ')[0]}</b>
                  </span>
                </Link>
              ) : (
                <Link className="btn btn-dark btn-sm d-none-sm" to="/login" style={{ marginLeft: 8 }}>
                  <Icon name="user" className="icon icon-sm" />
                  Sign in
                </Link>
              )}
              <Link className="btn-icon only-mobile" to={isLoggedIn ? '/account' : '/login'} aria-label="Account">
                <Icon name="user" />
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
