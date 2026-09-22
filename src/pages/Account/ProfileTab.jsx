import { useEffect, useState } from 'react';
import Icon from '../../components/common/Icon';
import Modal from '../../components/common/Modal';
import { useUserStore } from '../../store/userStore';
import { useUiStore } from '../../store/uiStore';

const EMPTY_ADDRESS = { label: 'Home', line: '', city: '', pin: '' };

export default function ProfileTab({ profile }) {
  const updateProfile = useUserStore((s) => s.updateProfile);
  const changePassword = useUserStore((s) => s.changePassword);
  const addAddress = useUserStore((s) => s.addAddress);
  const editAddress = useUserStore((s) => s.editAddress);
  const makeAddressDefault = useUserStore((s) => s.makeAddressDefault);
  const removeAddress = useUserStore((s) => s.removeAddress);
  const pushToast = useUiStore((s) => s.pushToast);

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const [addrModal, setAddrModal] = useState(null); // null | { editingId, values }
  const [addrSaving, setAddrSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    if (profile) setForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '' });
  }, [profile]);

  const addresses = profile?.addresses || [];

  const saveProfile = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      pushToast({ title: 'Enter your full name', kind: 'err' });
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
      pushToast({ title: 'Profile updated', kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not update profile', subtitle: err.message, kind: 'err' });
    } finally {
      setSaving(false);
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    const values = addrModal.values;
    if (values.line.trim().length < 4) {
      pushToast({ title: 'Enter the full street address', kind: 'err' });
      return;
    }
    setAddrSaving(true);
    try {
      if (addrModal.editingId) await editAddress(addrModal.editingId, values);
      else await addAddress(values);
      pushToast({ title: addrModal.editingId ? 'Address updated' : 'Address saved', kind: 'ok' });
      setAddrModal(null);
    } catch (err) {
      pushToast({ title: 'Could not save address', subtitle: err.message, kind: 'err' });
    } finally {
      setAddrSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await removeAddress(deleting._id);
      pushToast({ title: 'Address removed', kind: 'info' });
    } catch (err) {
      pushToast({ title: 'Could not remove address', subtitle: err.message, kind: 'err' });
    } finally {
      setDeleting(null);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword.length < 6) {
      pushToast({ title: 'New password must be at least 6 characters', kind: 'err' });
      return;
    }
    if (pw.newPassword !== pw.confirm) {
      pushToast({ title: 'New passwords do not match', kind: 'err' });
      return;
    }
    setPwSaving(true);
    try {
      await changePassword(pw.currentPassword, pw.newPassword);
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
      pushToast({ title: 'Password updated', subtitle: 'Use your new password next time you sign in.', kind: 'ok' });
    } catch (err) {
      pushToast({ title: 'Could not update password', subtitle: err.message, kind: 'err' });
    } finally {
      setPwSaving(false);
    }
  };

  return (
    <div className="stack gap-6">
      <section>
        <div className="sec-head">
          <div>
            <h2>Profile details</h2>
            <p>The name and number our bakers and riders use to reach you.</p>
          </div>
        </div>
        <form className="card pad-6" onSubmit={saveProfile}>
          <div className="form-grid two">
            <div className="field">
              <label>Full name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
            </div>
            <div className="field">
              <label>Phone</label>
              <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
            </div>
            <div className="field span2">
              <label>Email</label>
              <input className="input" value={form.email} disabled placeholder="you@example.com" />
              <span className="field-hint">Email is used to sign in and can&rsquo;t be changed here.</span>
            </div>
          </div>
          <button className="btn btn-primary" type="submit" disabled={saving} style={{ marginTop: 'var(--s-5)' }}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </section>

      <section>
        <div className="sec-head">
          <div>
            <h2>Saved addresses</h2>
            <p>Pick any of these at checkout. Your default is used automatically.</p>
          </div>
          {addresses.length > 0 && (
            <button className="btn btn-outline btn-sm" onClick={() => setAddrModal({ editingId: null, values: { ...EMPTY_ADDRESS } })}>
              <Icon name="plus" className="icon icon-sm" />
              Add address
            </button>
          )}
        </div>

        <div className="addr-grid">
          {addresses.map((a) => (
            <div className={`addr-card ${a.isDefault ? 'on' : ''}`} key={a._id}>
              <div className="row between center gap-3">
                <span className="row gap-2 center">
                  <Icon name="pin" className="icon icon-sm" style={{ color: 'var(--c-accent)' }} />
                  <b className="small">{a.label}</b>
                </span>
                {a.isDefault && <span className="badge success">Default</span>}
              </div>
              <p className="small muted" style={{ lineHeight: 1.5 }}>
                {[a.line, a.city, a.pin].filter(Boolean).join(', ')}
              </p>
              <div className="addr-acts">
                <button className="btn btn-ghost btn-sm" onClick={() => setAddrModal({ editingId: a._id, values: { label: a.label, line: a.line, city: a.city, pin: a.pin } })}>
                  <Icon name="edit" className="icon icon-sm" />
                  Edit
                </button>
                {!a.isDefault && (
                  <button className="btn btn-ghost btn-sm" onClick={() => makeAddressDefault(a._id)}>
                    <Icon name="check" className="icon icon-sm" />
                    Set default
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" style={{ color: 'var(--c-error)', marginLeft: 'auto' }} onClick={() => setDeleting(a)}>
                  <Icon name="trash" className="icon icon-sm" />
                </button>
              </div>
            </div>
          ))}

          <button className="addr-add" onClick={() => setAddrModal({ editingId: null, values: { ...EMPTY_ADDRESS } })}>
            <Icon name="plus" className="icon icon-lg" />
            {addresses.length === 0 ? 'Add your first delivery address' : 'Add another address'}
          </button>
        </div>
      </section>

      <section>
        <div className="sec-head">
          <div>
            <h2>Password</h2>
            <p>Change the password you use to sign in.</p>
          </div>
        </div>
        <form className="card pad-6" onSubmit={savePassword}>
          <div className="form-grid two">
            <div className="field span2">
              <label>Current password</label>
              <input className="input" type="password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} placeholder="Your current password" autoComplete="current-password" />
            </div>
            <div className="field">
              <label>New password</label>
              <input className="input" type="password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} placeholder="At least 6 characters" autoComplete="new-password" />
            </div>
            <div className="field">
              <label>Confirm new password</label>
              <input className="input" type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} placeholder="Repeat new password" autoComplete="new-password" />
            </div>
          </div>
          <button className="btn btn-dark" type="submit" disabled={pwSaving} style={{ marginTop: 'var(--s-5)' }}>
            <Icon name="lock" className="icon icon-sm" />
            {pwSaving ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>

      <Modal
        open={!!addrModal}
        onClose={() => setAddrModal(null)}
        kicker="Delivery"
        title={addrModal?.editingId ? 'Edit address' : 'Add a new address'}
      >
        {addrModal && (
          <form className="stack gap-4" onSubmit={saveAddress}>
            <div className="field">
              <label>Label</label>
              <div className="opt-row">
                {['Home', 'Office', 'Other'].map((l) => (
                  <button
                    type="button"
                    key={l}
                    className={`opt ${addrModal.values.label === l ? 'on' : ''}`}
                    onClick={() => setAddrModal({ ...addrModal, values: { ...addrModal.values, label: l } })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Street address</label>
              <textarea
                className="textarea"
                rows={2}
                value={addrModal.values.line}
                placeholder="Flat / house no, building, street, area"
                onChange={(e) => setAddrModal({ ...addrModal, values: { ...addrModal.values, line: e.target.value } })}
              />
            </div>
            <div className="form-grid two">
              <div className="field">
                <label>City</label>
                <input
                  className="input"
                  value={addrModal.values.city}
                  placeholder="e.g. Greater Noida"
                  onChange={(e) => setAddrModal({ ...addrModal, values: { ...addrModal.values, city: e.target.value } })}
                />
              </div>
              <div className="field">
                <label>PIN code</label>
                <input
                  className="input"
                  value={addrModal.values.pin}
                  placeholder="6-digit PIN"
                  onChange={(e) => setAddrModal({ ...addrModal, values: { ...addrModal.values, pin: e.target.value } })}
                />
              </div>
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={addrSaving}>
              {addrSaving ? 'Saving…' : addrModal.editingId ? 'Save address' : 'Add address'}
            </button>
          </form>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        kicker="Confirm"
        title="Remove this address?"
        foot={
          <>
            <button className="btn btn-ghost" onClick={() => setDeleting(null)}>Cancel</button>
            <button className="btn btn-primary" style={{ background: 'var(--c-error)' }} onClick={confirmDelete}>Remove</button>
          </>
        }
      >
        <p className="muted">
          {deleting && [deleting.line, deleting.city, deleting.pin].filter(Boolean).join(', ')}
        </p>
      </Modal>
    </div>
  );
}
