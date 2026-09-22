import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import ProductCard from '../../components/product/ProductCard';
import { useOrderStore } from '../../store/orderStore';
import { useUserStore } from '../../store/userStore';
import { useProductStore } from '../../store/productStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { getMyEnquiries } from '../../services/enquiryService';
import OrdersTab, { fmtDateTime, statusTone } from './OrdersTab';
import TransactionsTab from './TransactionsTab';
import ProfileTab from './ProfileTab';

const TABS = [
  { key: 'orders', label: 'My orders', icon: 'bag' },
  { key: 'transactions', label: 'Payments', icon: 'card' },
  { key: 'enquiries', label: 'Custom enquiries', icon: 'sparkles' },
  { key: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { key: 'profile', label: 'Profile & addresses', icon: 'user' },
];

export default function Account() {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const profile = useUserStore((s) => s.profile);
  const logout = useUserStore((s) => s.logout);

  const orders = useOrderStore((s) => s.myOrders);
  const myOrdersLoaded = useOrderStore((s) => s.myOrdersLoaded);
  const fetchMyOrders = useOrderStore((s) => s.fetchMyOrders);
  const transactions = useOrderStore((s) => s.myTransactions);
  const myTransactionsLoaded = useOrderStore((s) => s.myTransactionsLoaded);
  const fetchMyTransactions = useOrderStore((s) => s.fetchMyTransactions);

  const products = useProductStore((s) => s.products);
  const wishIds = useWishlistStore((s) => s.ids);

  const [searchParams] = useSearchParams();
  const initialTab = TABS.some((t) => t.key === searchParams.get('tab')) ? searchParams.get('tab') : 'orders';
  const [tab, setTab] = useState(initialTab);
  const [myEnquiries, setMyEnquiries] = useState([]);
  const [enquiriesLoaded, setEnquiriesLoaded] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (!myOrdersLoaded) fetchMyOrders();
    if (!myTransactionsLoaded) fetchMyTransactions();
  }, [isLoggedIn, myOrdersLoaded, fetchMyOrders, myTransactionsLoaded, fetchMyTransactions]);

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
        <EmptyState icon="user" title="Sign in to view your account" text="Track orders, manage payments, save addresses and reorder favourites." action={{ to: '/login', label: 'Sign in' }} />
      </div>
    );
  }

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    : null;
  const totalSpent = transactions.filter((t) => t.status === 'Paid').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'My account' }]} />

      <div className="acct-hero">
        <span className="acct-hero-av">{profile?.name?.[0]?.toUpperCase()}</span>
        <div>
          <h1>{profile?.name}</h1>
          <p className="small muted">{profile?.email}{memberSince ? ` · Member since ${memberSince}` : ''}</p>
        </div>
        <div className="acct-hero-stats">
          <div className="acct-stat">
            <b>{orders.length}</b>
            <span>Order{orders.length === 1 ? '' : 's'}</span>
          </div>
          <div className="acct-stat">
            <b>₹{totalSpent.toLocaleString('en-IN')}</b>
            <span>Total spent</span>
          </div>
          <div className="acct-stat">
            <b>{wishedProducts.length}</b>
            <span>Wishlisted</span>
          </div>
        </div>
      </div>

      <div className="acct-layout">
        <nav className="acct-nav">
          {TABS.map((t) => (
            <button key={t.key} className={tab === t.key ? 'on' : ''} onClick={() => setTab(t.key)}>
              <Icon name={t.icon} className="icon icon-sm" />
              {t.label}
              {t.key === 'wishlist' && wishedProducts.length > 0 && <span className="n">{wishedProducts.length}</span>}
            </button>
          ))}
          <span className="sep" />
          <button className="danger" onClick={handleSignOut}>
            <Icon name="aright" className="icon icon-sm" />
            Sign out
          </button>
        </nav>

        <div>
          {tab === 'orders' && (
            <>
              <div className="sec-head">
                <div>
                  <h2>My orders</h2>
                  <p>Every order you&rsquo;ve placed, with live status and delivery details.</p>
                </div>
              </div>
              <OrdersTab orders={orders} loaded={myOrdersLoaded} />
            </>
          )}

          {tab === 'transactions' && (
            <>
              <div className="sec-head">
                <div>
                  <h2>Payments</h2>
                  <p>Every payment you&rsquo;ve made, with the exact date, time and reference id.</p>
                </div>
              </div>
              <TransactionsTab transactions={transactions} loaded={myTransactionsLoaded} />
            </>
          )}

          {tab === 'enquiries' && (
            <>
              <div className="sec-head">
                <div>
                  <h2>Custom cake enquiries</h2>
                  <p>Track the design and quote for every custom cake you&rsquo;ve asked about.</p>
                </div>
                {myEnquiries.length > 0 && (
                  <Link className="btn btn-primary btn-sm" to="/custom">
                    <Icon name="plus" className="icon icon-sm" />
                    New enquiry
                  </Link>
                )}
              </div>
              {!enquiriesLoaded ? (
                <div className="skel" style={{ height: 160, borderRadius: 'var(--r-lg)' }} />
              ) : myEnquiries.length === 0 ? (
                <EmptyState icon="sparkles" title="No custom enquiries yet" text="Send us your custom cake idea and we'll quote it within 24 hours." action={{ to: '/custom', label: 'Start an enquiry' }} />
              ) : (
                <div className="stack gap-4">
                  {myEnquiries.map((e) => (
                    <div className="order-card" key={e.id}>
                      <div className="oc-head">
                        <span className="row gap-3 center wrap">
                          <span className="oc-code">{e.code}</span>
                          <span className="tiny muted">{fmtDateTime(e.createdAt)}</span>
                        </span>
                        <span className={`badge ${e.status === 'Quoted' ? 'gold' : e.status === 'Closed' ? 'success' : 'warn'}`}>{e.status}</span>
                      </div>
                      <div className="oc-body">
                        <span className="grow small">{e.occasion} · {e.guests} guests · {e.budget}</span>
                      </div>
                      {e.note && (
                        <div className="row gap-2" style={{ padding: '0 var(--s-5) var(--s-4)', alignItems: 'flex-start' }}>
                          <Icon name="quote" className="icon icon-sm" style={{ color: 'var(--c-faint)', marginTop: 2, flex: 'none' }} />
                          <span className="tiny muted">{e.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'wishlist' && (
            <>
              <div className="sec-head">
                <div>
                  <h2>Wishlist</h2>
                  <p>Cakes you&rsquo;ve saved for later.</p>
                </div>
              </div>
              {wishedProducts.length === 0 ? (
                <EmptyState icon="heart" title="Your wishlist is empty" text="Tap the heart on any cake to save it here." action={{ to: '/shop', label: 'Browse cakes' }} />
              ) : (
                <div className="grid-products">
                  {wishedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'profile' && (
            <>
              <div className="sec-head">
                <div>
                  <h2>Profile &amp; addresses</h2>
                  <p>Keep your details and delivery addresses up to date.</p>
                </div>
              </div>
              <ProfileTab profile={profile} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { statusTone };
