import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import ProductCard from '../../components/product/ProductCard';
import { money } from '../../utils/format';
import { useOrderStore } from '../../store/orderStore';
import { useUserStore } from '../../store/userStore';
import { useProductStore } from '../../store/productStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';
import { getMyEnquiries } from '../../services/enquiryService';

const TABS = [
  { key: 'orders', label: 'My orders', icon: 'bag' },
  { key: 'enquiries', label: 'Custom enquiries', icon: 'sparkles' },
  { key: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { key: 'profile', label: 'Profile & addresses', icon: 'user' },
];

export default function Account() {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const profile = useUserStore((s) => s.profile);
  const logout = useUserStore((s) => s.logout);
  const updateProfile = useUserStore((s) => s.updateProfile);
  const orders = useOrderStore((s) => s.myOrders);
  const myOrdersLoaded = useOrderStore((s) => s.myOrdersLoaded);
  const fetchMyOrders = useOrderStore((s) => s.fetchMyOrders);
  const products = useProductStore((s) => s.products);
  const wishIds = useWishlistStore((s) => s.ids);
  const pushToast = useUiStore((s) => s.pushToast);

  const [searchParams] = useSearchParams();
  const initialTab = TABS.some((t) => t.key === searchParams.get('tab')) ? searchParams.get('tab') : 'orders';
  const [tab, setTab] = useState(initialTab);
  const [form, setForm] = useState(profile || { name: '', email: '', phone: '', addr: '' });
  const [saving, setSaving] = useState(false);
  const [myEnquiries, setMyEnquiries] = useState([]);
  const [enquiriesLoaded, setEnquiriesLoaded] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  useEffect(() => {
    if (isLoggedIn && !myOrdersLoaded) fetchMyOrders();
  }, [isLoggedIn, myOrdersLoaded, fetchMyOrders]);

  useEffect(() => {
    if (isLoggedIn && tab === 'enquiries' && !enquiriesLoaded) {
      getMyEnquiries()
        .then((data) => setMyEnquiries(data))
        .catch(() => setMyEnquiries([]))
        .finally(() => setEnquiriesLoaded(true));
    }
  }, [isLoggedIn, tab, enquiriesLoaded]);

  const wishedProducts = useMemo(() => products.filter((p) => wishIds.includes(p.id)), [products, wishIds]);

  if (!isLoggedIn) {
    return (
      <div className="container section text-center">
        <EmptyState icon="user" title="Sign in to view your account" text="Track orders, save addresses and reorder favourites." action={{ to: '/login', label: 'Sign in' }} />
      </div>
    );
  }

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      pushToast({ title: 'Profile updated', kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not update profile', subtitle: err.message, kind: 'err' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My account' }]} />
      <h1 className="display-md" style={{ marginBottom: 24 }}>My account</h1>

      <div className="acct-layout">
        <nav className="acct-nav">
          {TABS.map((t) => (
            <button key={t.key} className={tab === t.key ? 'on' : ''} onClick={() => setTab(t.key)}>
              <Icon name={t.icon} className="icon icon-sm" />
              {t.label}
            </button>
          ))}
          <button onClick={handleSignOut}>
            <Icon name="aright" className="icon icon-sm" />
            Sign out
          </button>
        </nav>

        <div>
          {tab === 'orders' && (
            orders.length === 0 ? (
              <EmptyState icon="bag" title="No orders yet" text="Your order history will show up here." action={{ to: '/shop', label: 'Start shopping' }} />
            ) : (
              <div className="stack gap-4">
                {orders.map((o) => (
                  <div className="order-card" key={o.id}>
                    <div className="oc-head">
                      <b>{o.code}</b>
                      <span className="small muted">{new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      <span className={`badge ${o.status === 'Delivered' ? 'success' : o.status === 'Cancelled' ? 'err' : 'warn'}`}>{o.status}</span>
                    </div>
                    <div className="oc-body">
                      <span className="grow small">
                        {o.items.map((it) => `${it.name} × ${it.qty}`).join(', ')}
                      </span>
                      <b>{money(o.amount)}</b>
                      <Link className="btn btn-outline btn-sm" to={`/track?order=${encodeURIComponent(o.code)}`}>
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {tab === 'enquiries' && (
            <div className="stack gap-4">
              {enquiriesLoaded && myEnquiries.length === 0 ? (
                <EmptyState icon="sparkles" title="No custom enquiries yet" text="Send us your custom cake idea and we'll quote it within 24 hours." action={{ to: '/custom', label: 'Start an enquiry' }} />
              ) : (
                myEnquiries.map((e) => (
                  <div className="order-card" key={e.id}>
                    <div className="oc-head">
                      <b>{e.code}</b>
                      <span className="small muted">{new Date(e.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      <span className="badge neutral">{e.status}</span>
                    </div>
                    <div className="oc-body">
                      <span className="grow small">{e.occasion} · {e.guests} guests · {e.budget}</span>
                    </div>
                  </div>
                ))
              )}
              {myEnquiries.length > 0 && (
                <Link className="btn btn-primary" to="/custom" style={{ alignSelf: 'flex-start' }}>
                  New custom cake enquiry
                </Link>
              )}
            </div>
          )}

          {tab === 'wishlist' && (
            wishedProducts.length === 0 ? (
              <EmptyState icon="heart" title="Your wishlist is empty" text="Tap the heart on any cake to save it here." action={{ to: '/shop', label: 'Browse cakes' }} />
            ) : (
              <div className="grid-products">
                {wishedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )
          )}

          {tab === 'profile' && (
            <form className="card pad-6" style={{ maxWidth: 480 }} onSubmit={saveProfile}>
              <div className="stack gap-4">
                <div className="row gap-3 center">
                  <span className="avatar" style={{ width: 48, height: 48, fontSize: '1.1rem' }}>{profile?.name?.[0]}</span>
                  <b>{profile?.name}</b>
                </div>
                <div className="field">
                  <label>Full name</label>
                  <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label>Address</label>
                  <textarea className="textarea" rows={3} value={form.addr} onChange={(e) => setForm({ ...form, addr: e.target.value })} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
