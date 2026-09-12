import { create } from 'zustand';
import { getProducts, getCategories, getFlavours, getOccasions, getAddons } from '../services/productService';

export const PRICE_BANDS = [
  { key: 'lt600', label: 'Under ₹600', test: (p) => p.base < 600 },
  { key: 'mid', label: '₹600 – ₹750', test: (p) => p.base >= 600 && p.base <= 750 },
  { key: 'gt750', label: '₹750 and above', test: (p) => p.base > 750 },
];
export const WEIGHT_OPTS = ['0.5 KG', '1 KG', '1.5 KG', '2 KG'];

const EMPTY_FILTERS = { q: '', cats: [], flavs: [], price: [], weights: [], avail: [] };

/**
 * Cross-page product browsing state (search, filters, sort). Read by the
 * header search box and the Shop page; kept independent from cart/wishlist.
 */
export const useProductStore = create((set, get) => ({
  filters: { ...EMPTY_FILTERS },
  sort: 'pop',

  products: [],
  categories: [],
  flavours: [],
  occasions: [],
  addons: [],
  catalogLoaded: false,
  catalogError: null,

  fetchCatalog: async () => {
    if (get().catalogLoaded) return;
    try {
      const [products, categories, flavours, occasions, addons] = await Promise.all([
        getProducts(), getCategories(), getFlavours(), getOccasions(), getAddons(),
      ]);
      set({ products, categories, flavours, occasions, addons, catalogLoaded: true, catalogError: null });
    } catch (err) {
      set({ catalogError: err.message });
    }
  },

  setQuery: (q) => set((state) => ({ filters: { ...state.filters, q } })),
  setCategory: (name) => set((state) => ({ filters: { ...state.filters, cats: name ? [name] : [] } })),
  setFlavour: (name) => set((state) => ({ filters: { ...state.filters, flavs: name ? [name] : [] } })),
  toggleFilter: (group, value) =>
    set((state) => {
      const arr = state.filters[group] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { filters: { ...state.filters, [group]: next } };
    }),
  removeFilter: (group, value) =>
    set((state) => ({
      filters: group === 'q' ? { ...state.filters, q: '' } : { ...state.filters, [group]: state.filters[group].filter((v) => v !== value) },
    })),
  clearFilters: () => set((state) => ({ filters: { ...EMPTY_FILTERS } })),
  setSort: (sort) => set({ sort }),
}));

export function filterProducts(products, filters, sort) {
  let list = products.filter((p) => {
    if (filters.q) {
      const q = filters.q.toLowerCase();
      if (!`${p.name} ${p.flavour} ${p.cat} ${p.desc}`.toLowerCase().includes(q)) return false;
    }
    if (filters.cats.length && !filters.cats.includes(p.cat)) return false;
    if (filters.flavs.length && !filters.flavs.some((fl) => p.flavour.toLowerCase().includes(fl.toLowerCase()))) return false;
    if (filters.price.length && !filters.price.some((k) => (PRICE_BANDS.find((b) => b.key === k) || { test: () => false }).test(p))) return false;
    if (filters.avail.includes('in') && p.stock === 'Out of stock') return false;
    if (filters.avail.includes('eggless') && !p.eggless) return false;
    return true;
  });
  if (sort === 'lo') list = [...list].sort((a, b) => a.base - b.base);
  else if (sort === 'hi') list = [...list].sort((a, b) => b.base - a.base);
  else if (sort === 'new') list = [...list].reverse();
  else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
  else list = [...list].sort((a, b) => b.sold - a.sold);
  return list;
}
