import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileDrawer from './components/navigation/MobileDrawer';
import CartDrawer from './components/cart/CartDrawer';
import AddonsModal from './components/modals/AddonsModal';
import ToastStack from './components/common/ToastStack';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import TrackOrder from './pages/TrackOrder';
import CustomCake from './pages/CustomCake';
import CorporateCakes from './pages/CorporateCakes';
import Login from './pages/Login';
import Account from './pages/Account';
import Blog from './pages/Blog';
import Article from './pages/Article';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import { Privacy, Terms } from './pages/Legal';
import ComingSoon from './pages/ComingSoon';
import { useUiStore } from './store/uiStore';
import { useProductStore } from './store/productStore';
import { useContentStore } from './store/contentStore';
import { useUserStore } from './store/userStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const closeAllOverlays = useUiStore((s) => s.closeAllOverlays);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const cartDrawerOpen = useUiStore((s) => s.cartDrawerOpen);
  const addonsModalOpen = useUiStore((s) => s.addonsModalOpen);
  const fetchCatalog = useProductStore((s) => s.fetchCatalog);
  const fetchContent = useContentStore((s) => s.fetchContent);
  const hydrateUser = useUserStore((s) => s.hydrate);
  const { pathname } = useLocation();

  useEffect(() => {
    fetchCatalog();
    fetchContent();
    hydrateUser();
  }, [fetchCatalog, fetchContent, hydrateUser]);

  useEffect(() => {
    closeAllOverlays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || cartDrawerOpen || addonsModalOpen ? 'hidden' : '';
  }, [mobileMenuOpen, cartDrawerOpen, addonsModalOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/custom" element={<CustomCake />} />
          <Route path="/corporate-cakes" element={<CorporateCakes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Navigate to="/account?tab=orders" replace />} />
          <Route path="/wishlist" element={<Navigate to="/account?tab=wishlist" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<ComingSoon title="Page not found" />} />
        </Routes>
      </main>
      <Footer />
      <MobileDrawer />
      <CartDrawer />
      <AddonsModal />
      <ToastStack />
    </>
  );
}
