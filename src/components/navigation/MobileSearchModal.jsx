import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { weightsFor } from '../../data/products';
import { useProductStore } from '../../store/productStore';
import { useUiStore } from '../../store/uiStore';
import { money } from '../../utils/format';

export default function MobileSearchModal() {
  const open = useUiStore((s) => s.searchOpen);
  const closeSearch = useUiStore((s) => s.closeSearch);
  const products = useProductStore((s) => s.products);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const hits = query.trim()
    ? products
        .filter((p) => `${p.name} ${p.flavour} ${p.cat}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8)
    : [];

  const goToProduct = (id) => {
    setQuery('');
    closeSearch();
    navigate(`/product/${id}`);
  };

  const goToShop = () => {
    setQuery('');
    closeSearch();
    navigate('/shop');
  };

  return (
    <Modal open={open} onClose={() => { setQuery(''); closeSearch(); }} title="Search cakes">
      <div className="input-icon">
        <Icon name="search" className="icon icon-sm" />
        <input
          className="input"
          type="search"
          autoFocus
          placeholder="Search cakes, flavours…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goToShop()}
        />
      </div>

      {query.trim() && (
        <div className="stack gap-2" style={{ marginTop: 14 }}>
          {hits.length ? (
            <>
              {hits.map((p) => (
                <a
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={(e) => { e.preventDefault(); goToProduct(p.id); }}
                  style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 8, borderRadius: 'var(--r-sm)' }}
                >
                  <span className="th" style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', overflow: 'hidden', flex: 'none', background: 'var(--c-bg-warm)' }}>
                    <Pic src={p.img[0]} alt={p.name} ph={p.ph} />
                  </span>
                  <span className="stack grow">
                    <b style={{ fontSize: 'var(--fs-sm)' }}>{p.name}</b>
                    <span className="tiny muted">
                      {p.cat} · from {money(weightsFor(p.base)[0].amount)}
                    </span>
                  </span>
                </a>
              ))}
              <button className="btn btn-outline btn-block btn-sm" onClick={goToShop}>
                See all results
              </button>
            </>
          ) : (
            <p className="small muted text-center" style={{ padding: '16px 0' }}>
              No cakes match &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
