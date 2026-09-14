import { useMemo, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import ProductCard from '../../components/product/ProductCard';
import { IMG, QL } from '../../data/products';
import { useProductStore } from '../../store/productStore';
import { useUiStore } from '../../store/uiStore';
import { useHeroSlider } from '../../hooks/useHeroSlider';
import { submitEnquiry } from '../../services/enquiryService';

const HERO_IMAGES = [
  { src: IMG + 'photo-1733119673501-20e57711ef84' + QL, alt: 'Office team celebrating with cake', ph: ['#5A3B27', '#2F1B10', '#7A5334'] },
  { src: IMG + 'photo-1733119673475-c7a31c393d42' + QL, alt: 'Colleagues gathered around a birthday cake', ph: ['#5A3B27', '#2F1B10', '#7A5334'] },
  { src: IMG + 'photo-1758520144658-c87be518b87e' + QL, alt: 'Office workers celebrating with cake and gifts', ph: ['#5A3B27', '#2F1B10', '#7A5334'] },
];

const PERKS = [
  { icon: 'pkg', text: 'Bulk & recurring orders' },
  { icon: 'gem', text: 'Branded & custom toppers' },
  { icon: 'user', text: 'A dedicated account manager' },
  { icon: 'news', text: 'GST invoicing on every order' },
];

const FEATURES = [
  { icon: 'pkg', title: 'Bulk & recurring orders', text: 'From a dozen desk-side cupcakes to a 200-box festive hamper drop — scaled without compromising on freshness.' },
  { icon: 'gem', title: 'Branded & custom toppers', text: 'Company logo toppers, branded packaging and personalised messaging for launches, milestones and client gifting.' },
  { icon: 'user', title: 'A dedicated account manager', text: 'One point of contact for every order, quote and delivery — no re-explaining your requirement each time.' },
  { icon: 'news', title: 'GST invoicing', text: 'Proper GST-compliant invoices for every order, so your finance team never has to chase paperwork.' },
];

const BUDGETS = ['Under ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000+'];

export default function CorporateCakes() {
  const products = useProductStore((s) => s.products);
  const pushToast = useUiStore((s) => s.pushToast);
  const corporateProducts = useMemo(() => products.filter((p) => p.corporate).slice(0, 8), [products]);
  const { index: heroIdx, goTo: goToHero, setPaused: setHeroPaused } = useHeroSlider(HERO_IMAGES.length, 3500);

  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', quantity: '', date: '', budget: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.name.trim() || !form.email.includes('@') || form.phone.trim().length < 8) {
      pushToast({ title: 'Fill in your company and contact details', kind: 'err' });
      return;
    }
    setSubmitting(true);
    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        occasion: 'Corporate',
        date: form.date,
        guests: form.quantity,
        budget: form.budget,
        note: `Company: ${form.company}. ${form.message}`.trim(),
        files: 0,
      });
      setSubmitted(true);
      pushToast({ title: 'Enquiry sent!', subtitle: "Our corporate gifting team will reach out within one business day.", kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not send enquiry', subtitle: err.message, kind: 'err' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Corporate cakes' }]} />

      <div className="auth-wrap" style={{ marginBottom: 'var(--s-9)' }}>
        <div className="auth-side" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)}>
          {HERO_IMAGES.map((img, i) => (
            <div key={img.src} className={`auth-side-slide ${i === heroIdx ? 'on' : ''}`}>
              <Pic src={img.src} alt={img.alt} ph={img.ph} />
            </div>
          ))}
          {HERO_IMAGES.length > 1 && (
            <div className="auth-side-dots" role="tablist" aria-label="Slides">
              {HERO_IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  className={i === heroIdx ? 'on' : ''}
                  role="tab"
                  aria-label={`Slide ${i + 1}`}
                  aria-selected={i === heroIdx}
                  onClick={() => goToHero(i)}
                />
              ))}
            </div>
          )}
          <div className="ov">
            <div>
              <span className="kicker kicker-script" style={{ color: 'var(--c-accent)' }}>For teams &amp; businesses</span>
              <h1 className="display-md" style={{ color: '#fff', margin: '10px 0 8px' }}>Corporate cakes &amp; bulk gifting, done properly</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '40ch' }}>
                Office birthdays, festive hampers, launches and client thank-yous — ordered in bulk, branded, and
                delivered across Delhi-NCR on your schedule.
              </p>
              <div className="perks">
                {PERKS.map((p) => (
                  <span key={p.text}>
                    <Icon name={p.icon} className="icon icon-sm" />
                    {p.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          {submitted ? (
            <div className="text-center" style={{ padding: '24px 0' }}>
              <div className="tick">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="display-sm">Thanks, {form.name.split(' ')[0]}!</h2>
              <p className="lede">
                Your corporate enquiry has been sent. Our team will reach out with options and a quote within one
                business day.
              </p>
            </div>
          ) : (
            <>
              <div className="auth-head">
                <h1>Get a bulk quote</h1>
                <p className="muted">Share a rough brief — we&rsquo;ll come back with pricing within one business day.</p>
              </div>
              <form onSubmit={handleSubmit} className="stack gap-4">
                <div className="form-grid two">
                  <div className="field">
                    <label>Company name</label>
                    <input className="input" value={form.company} onChange={(e) => set({ company: e.target.value })} placeholder="e.g. Wishgeek Techserve Pvt. Ltd." />
                  </div>
                  <div className="field">
                    <label>Contact person</label>
                    <input className="input" value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your full name" />
                  </div>
                  <div className="field">
                    <label>Work email</label>
                    <input className="input" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@company.com" />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input className="input" value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="10-digit mobile number" />
                  </div>
                  <div className="field">
                    <label>Approx. quantity</label>
                    <input className="input" value={form.quantity} onChange={(e) => set({ quantity: e.target.value })} placeholder="e.g. 40 boxes" />
                  </div>
                  <div className="field">
                    <label>Needed by</label>
                    <input className="input" type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />
                  </div>
                  <div className="field span2">
                    <label>Budget range</label>
                    <div className="opt-row">
                      {BUDGETS.map((b) => (
                        <button type="button" key={b} className={`opt ${form.budget === b ? 'on' : ''}`} onClick={() => set({ budget: b })}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field span2">
                    <label>Tell us more <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
                    <textarea
                      className="textarea"
                      rows={3}
                      placeholder="Branding needs, delivery address, dietary requirements…"
                      value={form.message}
                      onChange={(e) => set({ message: e.target.value })}
                    />
                  </div>
                </div>
                <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send enquiry'}
                  <Icon name="aright" className="icon icon-sm" />
                </button>
                <p className="tiny muted text-center">No obligation — we reply with a quote, you decide after.</p>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="section-tight" style={{ paddingTop: 0 }}>
        <div className="steps corp-features">
          {FEATURES.map((f) => (
            <div className="step" key={f.title}>
              <span className="corp-feat-ico">
                <Icon name={f.icon} className="icon icon-md" />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {corporateProducts.length > 0 && (
        <div className="section-tight" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div className="st">
              <span className="kicker kicker-script">Popular for offices</span>
              <h2 className="display-md">Built for sharing</h2>
              <p className="lede">Boxes, jars and towers that travel well and split cleanly for a desk or a boardroom.</p>
            </div>
          </div>
          <div className="grid-products">
            {corporateProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
