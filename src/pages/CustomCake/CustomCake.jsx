import { useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Icon from '../../components/common/Icon';
import { useUiStore } from '../../store/uiStore';
import { submitEnquiry } from '../../services/enquiryService';

const STEPS = ['Occasion', 'Date', 'Guests', 'Budget', 'Requirements', 'Inspiration', 'Review'];
const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'Baby Shower', 'Corporate', 'Other'];
const BUDGETS = ['Under ₹1,500', '₹1,500 – ₹3,000', '₹3,000 – ₹5,000', '₹5,000 – ₹8,000', '₹8,000+'];
const GUEST_RANGES = ['Under 10', '10–20', '20–40', '40–60', '60+'];

export default function CustomCake() {
  const pushToast = useUiStore((s) => s.pushToast);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    occasion: '',
    date: '',
    guests: '',
    budget: '',
    brief: '',
    files: [],
    name: '',
    email: '',
    phone: '',
  });

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const canNext = () => {
    switch (step) {
      case 0: return !!form.occasion;
      case 1: return !!form.date;
      case 2: return !!form.guests;
      case 3: return !!form.budget;
      case 4: return form.brief.trim().length > 0;
      default: return true;
    }
  };

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const addFiles = (e) => {
    const names = Array.from(e.target.files || []).map((f) => f.name);
    set({ files: [...form.files, ...names] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || form.phone.trim().length < 8) {
      pushToast({ title: 'Fill in your contact details', kind: 'err' });
      return;
    }
    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        occasion: form.occasion,
        date: form.date,
        guests: form.guests,
        budget: form.budget,
        note: form.brief,
        files: form.files.length,
      });
      setSubmitted(true);
      pushToast({ title: 'Enquiry sent!', subtitle: "We'll reply with a design and quote within 24 hours.", kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not send enquiry', subtitle: err.message, kind: 'err' });
    }
  };

  if (submitted) {
    return (
      <div className="container section text-center">
        <div className="tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="display-md">Thanks, {form.name.split(' ')[0]}!</h1>
        <p className="lede" style={{ maxWidth: 480, margin: '0 auto' }}>
          Your custom cake enquiry has been sent. Our bakers will get back to you with a design and a quote within 24 hours.
        </p>
      </div>
    );
  }

  const progressPct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="container section">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Custom cake' }]} />
      <h1 className="display-md" style={{ marginBottom: 6 }}>Create your custom cake</h1>
      <p className="lede" style={{ marginBottom: 28 }}>Tell us your idea — our bakers design and quote it within 24 hours.</p>

      <div className="wiz-steps">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            className={`wiz-pill ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => i < step && setStep(i)}
          >
            <span className="n">{i < step ? <Icon name="check" className="icon icon-sm" /> : i + 1}</span>
            {s}
          </button>
        ))}
      </div>
      <div className="wiz-progress">
        <i style={{ width: `${progressPct}%` }} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="wiz-panel" style={{ maxWidth: 640 }}>
          {step === 0 && (
            <div className="field">
              <label>What's the occasion?</label>
              <div className="opt-row">
                {OCCASIONS.map((o) => (
                  <button key={o} type="button" className={`opt ${form.occasion === o ? 'on' : ''}`} onClick={() => set({ occasion: o })}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="field">
              <label>When do you need it delivered?</label>
              <input className="input" type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />
            </div>
          )}

          {step === 2 && (
            <div className="field">
              <label>How many guests?</label>
              <div className="opt-row">
                {GUEST_RANGES.map((g) => (
                  <button key={g} type="button" className={`opt ${form.guests === g ? 'on' : ''}`} onClick={() => set({ guests: g })}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="field">
              <label>What's your budget?</label>
              <div className="opt-row">
                {BUDGETS.map((b) => (
                  <button key={b} type="button" className={`opt ${form.budget === b ? 'on' : ''}`} onClick={() => set({ budget: b })}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="field">
              <label>Describe what you have in mind</label>
              <textarea
                className="textarea"
                rows={5}
                placeholder="Flavour, size, theme, colours, message on the cake..."
                value={form.brief}
                onChange={(e) => set({ brief: e.target.value })}
              />
            </div>
          )}

          {step === 5 && (
            <div className="field">
              <label>Inspiration photos (optional)</label>
              <label className="dropzone" style={{ display: 'block' }}>
                <Icon name="camera" className="icon icon-lg" />
                <p style={{ marginTop: 10 }}>Click to upload reference photos</p>
                <input type="file" accept="image/*" multiple className="sr-only" onChange={addFiles} />
              </label>
              {form.files.length > 0 && (
                <div className="upload-grid">
                  {form.files.map((f, i) => (
                    <div className="upload-item" key={i} style={{ display: 'grid', placeItems: 'center', background: 'var(--c-bg-warm)' }}>
                      <span className="tiny muted" style={{ padding: 6, textAlign: 'center' }}>{f}</span>
                      <button
                        type="button"
                        className="rm"
                        onClick={() => set({ files: form.files.filter((_, fi) => fi !== i) })}
                      >
                        <Icon name="x" className="icon icon-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <>
              <dl className="review-list" style={{ marginBottom: 20 }}>
                <dt>Occasion</dt>
                <dd>{form.occasion}</dd>
                <dt>Delivery date</dt>
                <dd>{form.date}</dd>
                <dt>Guests</dt>
                <dd>{form.guests}</dd>
                <dt>Budget</dt>
                <dd>{form.budget}</dd>
                <dt>Requirements</dt>
                <dd>{form.brief}</dd>
                <dt>Reference photos</dt>
                <dd>{form.files.length ? form.files.join(', ') : 'None'}</dd>
              </dl>
              <div className="form-grid two">
                <div className="field">
                  <label>Your name</label>
                  <input className="input" required value={form.name} onChange={(e) => set({ name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input className="input" required value={form.phone} onChange={(e) => set({ phone: e.target.value })} />
                </div>
                <div className="field span2">
                  <label>Email</label>
                  <input className="input" type="email" required value={form.email} onChange={(e) => set({ email: e.target.value })} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="row gap-3" style={{ marginTop: 28 }}>
          {step > 0 && (
            <button type="button" className="btn btn-outline" onClick={back}>
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn-primary" disabled={!canNext()} onClick={next}>
              Continue
              <Icon name="aright" className="icon icon-sm" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Send enquiry
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
