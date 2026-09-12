import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';
import Pic from '../common/Pic';
import { weightsFor } from '../../data/products';
import { useProductStore } from '../../store/productStore';
import { money } from '../../utils/format';

export default function NavSearch() {
  const products = useProductStore((s) => s.products);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const hits = query.trim()
    ? products
        .filter((p) => `${p.name} ${p.flavour} ${p.cat}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 5)
    : [];

  const goToProduct = (id) => {
    setOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  return (
    <div className="nav-search" ref={boxRef}>
      <label className="sr-only" htmlFor="navq">
        Search cakes
      </label>
      <Icon name="search" className="icon icon-sm" />
      <input
        id="navq"
        type="search"
        placeholder="Search cakes, flavours…"
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && query.trim() && (
        <div className="nav-search-pop">
          {hits.length ? (
            <>
              {hits.map((p) => (
                <a key={p.id} href={`/product/${p.id}`} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.preventDefault(); goToProduct(p.id); }}>
                  <span className="th">
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
              <a href="/shop" style={{ justifyContent: 'center' }} onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.preventDefault(); setOpen(false); navigate('/shop'); }}>
                <b className="small">See all results</b>
              </a>
            </>
          ) : (
            <p className="small muted" style={{ padding: 14, textAlign: 'center' }}>
              No cakes match “{query}”
            </p>
          )}
        </div>
      )}
    </div>
  );
}
