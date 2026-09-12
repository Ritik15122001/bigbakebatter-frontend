import { useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import { useUiStore } from '../../store/uiStore';
import { useContentStore } from '../../store/contentStore';
import { telHref, formatPhone } from '../../utils/format';

export default function Contact() {
  const pushToast = useUiStore((s) => s.pushToast);
  const settings = useContentStore((s) => s.settings);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.message.trim()) {
      pushToast({ title: 'Fill in all fields', kind: 'err' });
      return;
    }
    setSent(true);
    pushToast({ title: 'Message sent', subtitle: "We'll get back to you within a day.", kind: 'ok' });
  };

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <h1 className="display-md" style={{ marginBottom: 6 }}>Get in touch</h1>
      <p className="lede" style={{ marginBottom: 32 }}>Questions about an order, a custom cake, or anything else — we're here.</p>

      <div className="tab-split">
        <form className="card pad-6 contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="text-center" style={{ padding: '20px 0' }}>
              <div className="tick" style={{ width: 60, height: 60 }}>
                <Icon name="check" className="icon icon-lg" />
              </div>
              <h3>Thanks, {form.name.split(' ')[0]}!</h3>
              <p className="muted">We've received your message and will reply soon.</p>
            </div>
          ) : (
            <div className="stack gap-5">
              <div className="row gap-3 center">
                <span className="vico" style={{ marginBottom: 0 }}>
                  <Icon name="msg" className="icon icon-md" />
                </span>
                <span>
                  <h3 style={{ marginBottom: 2 }}>Send us a message</h3>
                  <p className="tiny muted">We usually reply within a few hours.</p>
                </span>
              </div>
              <div className="form-grid two">
                <div className="field">
                  <label>Your name</label>
                  <input className="input" placeholder="Aarti Shah" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input className="input" type="email" placeholder="you@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field span2">
                  <label>Phone (optional)</label>
                  <input className="input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label>Message</label>
                <textarea className="textarea" rows={5} placeholder="Tell us what you need — order help, a custom cake idea, anything." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Send message
                <Icon name="aright" className="icon icon-sm" />
              </button>
            </div>
          )}
        </form>

        <div className="card pad-6">
          <h3 style={{ marginBottom: 14 }}>Our bakehouse</h3>
          <div className="stack gap-3">
            <span className="row gap-3" style={{ alignItems: 'flex-start' }}>
              <Icon name="home" className="icon icon-sm" style={{ marginTop: 3 }} />
              <span className="small">{settings?.addressFull}</span>
            </span>
            <span className="row gap-3" style={{ alignItems: 'flex-start' }}>
              <Icon name="phone" className="icon icon-sm" style={{ marginTop: 3 }} />
              <span className="stack gap-1">
                {(settings?.phones || []).map((p, i) => (
                  <a className="small" key={p} href={telHref(p)}>
                    {formatPhone(p)}
                    {i === 0 && <span className="tiny muted"> (primary)</span>}
                  </a>
                ))}
              </span>
            </span>
            <span className="row gap-3">
              <Icon name="mail" className="icon icon-sm" />
              <a className="small" href={`mailto:${settings?.email}`}>{settings?.email}</a>
            </span>
            <span className="row gap-3">
              <Icon name="clock" className="icon icon-sm" />
              <span className="small">9 AM – 9 PM, all days</span>
            </span>
          </div>
          <a className="btn btn-outline btn-sm" style={{ marginTop: 16 }} href={settings?.mapsLink} target="_blank" rel="noopener noreferrer">
            <Icon name="aupright" className="icon icon-sm" />
            Get directions
          </a>
        </div>
      </div>

      <div className="map-embed map-embed-wide">
        <iframe
          title="BigBakeBatter location"
          src={settings?.mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="tiny muted" style={{ marginTop: 12 }}>We deliver same-day across Greater Noida West, Noida, Delhi and Ghaziabad — order before 2 PM.</p>
    </div>
  );
}
