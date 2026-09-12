import { useState } from 'react';
import Icon from '../common/Icon';
import { subscribeNewsletter } from '../../services/contentService';
import { useUiStore } from '../../store/uiStore';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const pushToast = useUiStore((s) => s.pushToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      pushToast({ title: 'Enter a valid email', kind: 'err' });
      return;
    }
    setSubmitting(true);
    await subscribeNewsletter(email);
    setSubmitting(false);
    setEmail('');
    pushToast({ title: "You're subscribed", subtitle: "We'll email you when something new comes out of the oven.", kind: 'ok' });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="nlmail">
        Email address
      </label>
      <input
        className="input"
        id="nlmail"
        type="email"
        placeholder="you@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-dark" type="submit" disabled={submitting}>
        Subscribe
        <Icon name="aright" className="icon icon-sm" />
      </button>
      <p className="tiny muted" style={{ width: '100%' }}>
        By subscribing you agree to our{' '}
        <a className="mn-underline" href="/privacy">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
