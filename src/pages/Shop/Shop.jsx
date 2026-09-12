import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../components/common/Icon';
import ProductGrid from '../../components/product/ProductGrid';
import { useProductStore, filterProducts, PRICE_BANDS } from '../../store/productStore';

const SORTS = [
  { key: 'pop', label: 'Most popular' },
  { key: 'new', label: 'Newest' },
  { key: 'lo', label: 'Price: Low to high' },
  { key: 'hi', label: 'Price: High to low' },
  { key: 'rating', label: 'Rating' },
];

function FilterGroups({ filters, toggleFilter, categories, flavours, products }) {
  return (
    <>
      <div className="fgroup">
        <h4>Category</h4>
        <div className="fopts">
          {categories.map((c) => (
            <label className="check" key={c.name}>
              <input type="checkbox" checked={filters.cats.includes(c.name)} onChange={() => toggleFilter('cats', c.name)} />
              <span className="row between grow">
                {c.name}
                <span className="cnt">{products.filter((p) => p.cat === c.name).length}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="fgroup">
        <h4>Flavour</h4>
        <div className="fopts">
          {flavours.map((f) => (
            <label className="check" key={f.name}>
              <input type="checkbox" checked={filters.flavs.includes(f.name)} onChange={() => toggleFilter('flavs', f.name)} />
              <span>{f.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="fgroup">
        <h4>Price</h4>
        <div className="fopts">
          {PRICE_BANDS.map((b) => (
            <label className="check" key={b.key}>
              <input type="checkbox" checked={filters.price.includes(b.key)} onChange={() => toggleFilter('price', b.key)} />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="fgroup">
        <h4>Availability</h4>
        <div className="fopts">
          <label className="check">
            <input type="checkbox" checked={filters.avail.includes('in')} onChange={() => toggleFilter('avail', 'in')} />
            <span>In stock only</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={filters.avail.includes('eggless')} onChange={() => toggleFilter('avail', 'eggless')} />
            <span>Eggless</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useProductStore((s) => s.products);
  const categories = useProductStore((s) => s.categories);
  const flavours = useProductStore((s) => s.flavours);
  const filters = useProductStore((s) => s.filters);
  const sort = useProductStore((s) => s.sort);
  const setQuery = useProductStore((s) => s.setQuery);
  const setCategory = useProductStore((s) => s.setCategory);
  const setFlavour = useProductStore((s) => s.setFlavour);
  const toggleFilter = useProductStore((s) => s.toggleFilter);
  const removeFilter = useProductStore((s) => s.removeFilter);
  const clearFilters = useProductStore((s) => s.clearFilters);
  const setSort = useProductStore((s) => s.setSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const flav = searchParams.get('flavour');
    if (cat) setCategory(cat);
    if (flav) setFlavour(flav);
    if (cat || flav) setSearchParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = useMemo(() => filterProducts(products, filters, sort), [products, filters, sort]);

  const chips = [
    ...filters.cats.map((v) => ({ group: 'cats', value: v, label: v })),
    ...filters.flavs.map((v) => ({ group: 'flavs', value: v, label: v })),
    ...filters.price.map((v) => ({ group: 'price', value: v, label: PRICE_BANDS.find((b) => b.key === v)?.label })),
    ...filters.avail.map((v) => ({ group: 'avail', value: v, label: v === 'in' ? 'In stock' : 'Eggless' })),
    ...(filters.q ? [{ group: 'q', value: filters.q, label: `"${filters.q}"` }] : []),
  ];

  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
          <h1 className="display-md">All cakes &amp; desserts</h1>
          <p className="lede">100% pure veg, always eggless — {products.length} bakes to choose from.</p>
        </div>
      </div>

      <div className="container section">
        <div className="shop-layout">
          <aside className="filters-panel">
            <FilterGroups filters={filters} toggleFilter={toggleFilter} categories={categories} flavours={flavours} products={products} />
            {chips.length > 0 && (
              <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 16 }} onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </aside>

          <div>
            <div className="shop-toolbar">
              <div className="field grow">
                <Icon name="search" className="icon icon-sm" />
                <input
                  type="search"
                  placeholder="Search cakes, flavours..."
                  value={filters.q}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
              <button className="btn btn-outline btn-sm only-mobile" onClick={() => setMobileFiltersOpen(true)}>
                <Icon name="menu" className="icon icon-sm" />
                Filters
              </button>
            </div>

            {chips.length > 0 && (
              <div className="active-filters">
                {chips.map((c) => (
                  <span className="af" key={`${c.group}-${c.value}`}>
                    {c.label}
                    <button aria-label={`Remove ${c.label}`} onClick={() => removeFilter(c.group, c.value)}>
                      <Icon name="x" className="icon icon-sm" />
                    </button>
                  </span>
                ))}
                <button className="af" onClick={clearFilters} style={{ background: 'var(--c-bg-warm)', color: 'var(--c-muted)' }}>
                  Clear all
                </button>
              </div>
            )}

            <p className="small muted" style={{ marginBottom: 16 }}>
              {list.length} {list.length === 1 ? 'result' : 'results'}
            </p>

            {list.length === 0 ? (
              <EmptyState
                icon="search"
                title="No cakes match those filters"
                text="Try clearing a few filters or searching for something else."
                action={{ to: '/shop', label: 'Clear filters' }}
              />
            ) : (
              <ProductGrid products={list} />
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="overlay open" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setMobileFiltersOpen(false)}>
          <div className="modal">
            <div className="modal-head">
              <h3>Filters</h3>
              <button className="x-btn" aria-label="Close" onClick={() => setMobileFiltersOpen(false)}>
                <Icon name="x" />
              </button>
            </div>
            <div className="modal-body">
              <FilterGroups filters={filters} toggleFilter={toggleFilter} categories={categories} flavours={flavours} products={products} />
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={clearFilters}>
                Clear all
              </button>
              <button className="btn btn-primary" onClick={() => setMobileFiltersOpen(false)}>
                Show {list.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="filters-mobile-bar">
        <button className="btn btn-outline btn-block" onClick={() => setMobileFiltersOpen(true)}>
          <Icon name="menu" className="icon icon-sm" />
          Filters {chips.length > 0 && `(${chips.length})`}
        </button>
      </div>
    </>
  );
}
