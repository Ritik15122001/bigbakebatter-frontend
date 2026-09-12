import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon';
import Pic from '../../components/common/Pic';
import { IMG, QL } from '../../data/products';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';

const PERKS = ['Track orders in real time', 'Save addresses for faster checkout', 'Reorder favourites in one tap'];

export default function Login() {
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);
  const register = useUserStore((s) => s.register);
  const pushToast = useUiStore((s) => s.pushToast);

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

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
      if (mode === 'signin') {
        await login(email, password);
      } else {
        await register({ name, email, password });
      }
      setOtpStage(true);
    } catch (err) {
      pushToast({ title: mode === 'signin' ? 'Sign in failed' : 'Could not create account', subtitle: err.message, kind: 'err' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length !== 6) {
      pushToast({ title: 'Enter the full 6-digit code', kind: 'err' });
      return;
    }
    pushToast({ title: `Welcome${name ? ', ' + name.split(' ')[0] : ''}!`, kind: 'ok' });
    navigate('/account');
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
          {!otpStage ? (
            <>
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
                    <input className="input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                  </div>
                )}
                <div className="field">
                  <label>Email</label>
                  <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input className="input" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
                </div>
                <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                  {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
                  <Icon name="aright" className="icon icon-sm" />
                </button>
              </form>

              <div className="auth-divider">or</div>
              <button className="btn btn-outline btn-block" type="button" onClick={() => pushToast({ title: 'Demo only', subtitle: 'Social sign-in is not wired up in this preview.', kind: 'info' })}>
                Continue with Google
              </button>
            </>
          ) : (
            <>
              <div className="auth-head">
                <h1>Verify it's you</h1>
                <p className="muted">We sent a 6-digit code to {email}.</p>
              </div>
              <form onSubmit={verifyOtp} className="stack gap-5">
                <div className="otp-row">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                    />
                  ))}
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Verify &amp; continue
                </button>
                <button className="btn btn-ghost btn-block" type="button" onClick={() => setOtpStage(false)}>
                  Back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
