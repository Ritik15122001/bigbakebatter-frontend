import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { addonCategories } from '../../data/addons';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { useProductStore } from '../../store/productStore';
import { useEscapeToClose } from '../../hooks/useEscapeToClose';
import { money } from '../../utils/format';

/**
 * "Add more fun to celebration" upsell shown right after Add to cart / Buy
 * now — Bakingo-style category-tabbed addon picker with a Continue action.
 */
export default function AddonsModal() {
  const navigate = useNavigate();
  const open = useUiStore((s) => s.addonsModalOpen);
  const closeAddonsModal = useUiStore((s) => s.closeAddonsModal);
  const items = useCartStore((s) => s.items);
  const addAddon = useCartStore((s) => s.addAddon);
  const addons = useProductStore((s) => s.addons);
  const [tab, setTab] = useState('popular');

  useEscapeToClose(open, closeAddonsModal);

  const shown = useMemo(
    () => (tab === 'popular' ? addons.filter((a) => a.popular) : addons.filter((a) => a.cat === tab)),
    [tab, addons]
  );

  if (!open) return null;

  const isAdded = (id) => items.some((i) => i.key === 'addon-' + id);

  const handleContinue = () => {
    closeAddonsModal();
    navigate('/cart');
  };

  return (
    <div className="overlay open" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && closeAddonsModal()}>
      <div className="modal addon-modal" style={{ width: 'min(880px, 100%)' }}>
        <div className="addon-banner row between center">
          <h3>Add More Fun To Celebration</h3>
          <button className="x-btn" aria-label="Close" onClick={closeAddonsModal}>
            <Icon name="x" />
          </button>
        </div>

        <div className="addon-tabs">
          {addonCategories.map((c) => (
            <button key={c.key} className={`addon-tab ${tab === c.key ? 'on' : ''}`} onClick={() => setTab(c.key)}>
              <span className="ico">
                <Icon name={c.icon} className="icon icon-md" />
              </span>
              {c.label}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="addon-empty">No addons in this category yet.</p>
        ) : (
          <div className="addon-grid">
            {shown.map((a) => {
              const added = isAdded(a.id);
              return (
                <div className="addon-card" key={a.id}>
                  <span className="thumb">
                    <Pic src={a.img} alt={a.name} ph={a.ph} />
                  </span>
                  <span className="name">{a.name}</span>
                  <span className="row-price">
                    <span className="pricetag" style={{ fontSize: '0.95rem' }}>
                      {money(a.price)}
                      {a.unit && <small style={{ fontWeight: 500 }}> {a.unit}</small>}
                    </span>
                    <button className={`addon-add-btn ${added ? 'on' : ''}`} onClick={() => !added && addAddon(a)} disabled={added}>
                      {added ? 'Added' : 'Add'}
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="modal-foot" style={{ justifyContent: 'stretch' }}>
          <button className="btn btn-primary btn-block" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
