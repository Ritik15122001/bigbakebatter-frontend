import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import { IMG, QL } from '../../data/products';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';

const PERKS = ['Track orders in real time', 'Save addresses for faster checkout', 'Reorder favourites in one tap'];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const login = useUserStore((s) => s.login);
  const register = useUserStore((s) => s.register);
  const pushToast = useUiStore((s) => s.pushToast);

  const redirectTo = searchParams.get('redirect') || '/account';
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate(redirectTo, { replace: true });
  }, [isLoggedIn, redirectTo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      pushToast({ title: 'Check your details', subtitle: 'Enter a valid email and a password of 6+ characters.', kind: 'err' });
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      pushToast({ title: 'Enter your name', kind: 'err' });
      return;
    }
    setSubmitting(true);
    try {
      const user = mode === 'signin' ? await login(email, password) : await register({ name, email, password });
      pushToast({ title: `Welcome${user?.name ? ', ' + user.name.split(' ')[0] : ''}!`, subtitle: mode === 'signin' ? 'Signed in successfully.' : 'Your account is ready.', kind: 'ok' });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      pushToast({ title: mode === 'signin' ? 'Sign in failed' : 'Could not create account', subtitle: err.message, kind: 'err' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section">
      <div className="auth-wrap">
        <div className="auth-side">
          <Pic src={IMG + 'photo-1578985545062-69928b1d9587' + QL} alt="Fresh cakes" ph={['#6B4A34', '#3E2519']} />
          <div className="ov">
            <div>
              <h3 style={{ color: '#fff', marginBottom: 8 }}>Fresh cakes, delivered right</h3>
              <div className="perks">
                {PERKS.map((p) => (
                  <span key={p}>
                    <Icon name="check" className="icon icon-sm" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-head">
            <div className="seg" style={{ display: 'flex', gap: 4, background: 'var(--c-bg-warm)', padding: 4, borderRadius: 'var(--r-md)' }}>
              <button
                type="button"
                className={`btn btn-sm ${mode === 'signin' ? 'btn-dark' : 'btn-ghost'}`}
                onClick={() => setMode('signin')}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`btn btn-sm ${mode === 'signup' ? 'btn-dark' : 'btn-ghost'}`}
                onClick={() => setMode('signup')}
              >
                Create account
              </button>
            </div>
            <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="muted">{mode === 'signin' ? 'Sign in to track orders and checkout faster.' : 'Join to save addresses and track your orders.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="stack gap-4">
            {mode === 'signup' && (
              <div className="field">
                <label>Full name</label>
                <input className="input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="pw-field">
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button type="button" className="pw-eye" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} tabIndex={-1}>
                  <Icon name={showPassword ? 'eyeoff' : 'eye'} className="icon icon-sm" />
                </button>
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
              <Icon name="aright" className="icon icon-sm" />
            </button>
          </form>

          <p className="tiny muted" style={{ textAlign: 'center', marginTop: 'var(--s-5)' }}>
            {mode === 'signin' ? (
              <>New here? <button type="button" className="link-underline" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', color: 'var(--c-accent)' }} onClick={() => setMode('signup')}>Create an account</button></>
            ) : (
              <>Already have an account? <button type="button" className="link-underline" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', color: 'var(--c-accent)' }} onClick={() => setMode('signin')}>Sign in</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
