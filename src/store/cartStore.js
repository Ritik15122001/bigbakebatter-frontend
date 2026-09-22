import { create } from 'zustand';
import { weightsForProduct, isBox } from '../data/products';

function lineKey(pid, weightIndex, eggless, msg) {
  return `${pid}|${weightIndex}|${eggless ? 1 : 0}|${msg || ''}`;
}

export const useCartStore = create((set, get) => ({
  items: [],
  savedLater: [],
  promo: null,

  addItem: (product, weightIndex = 0, qty = 1, opts = {}) => {
    const wIdx = isBox(product) ? 0 : weightIndex;
    const weights = weightsForProduct(product);
    const key = lineKey(product.id, wIdx, opts.eggless, opts.msg);
    set((state) => {
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          items: state.items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)),
        };
      }
      return {
        items: [
          ...state.items,
          {
            key,
            pid: product.id,
            name: product.name,
            image: product.img[0],
            ph: product.ph,
            weight: weights[wIdx].w,
            unit: weights[wIdx].amount,
            qty,
            eggless: !!opts.eggless,
            msg: opts.msg || '',
          },
        ],
      };
    });
    return get().items.find((i) => i.key === key);
  },

  updateQty: (key, delta) => {
    set((state) => {
      const items = state.items
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      return { items };
    });
  },

  removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

  saveForLater: (key) => {
    set((state) => {
      const item = state.items.find((i) => i.key === key);
      if (!item) return state;
      return { items: state.items.filter((i) => i.key !== key), savedLater: [...state.savedLater, item] };
    });
  },
  moveToCart: (key) => {
    set((state) => {
      const item = state.savedLater.find((i) => i.key === key);
      if (!item) return state;
      return { savedLater: state.savedLater.filter((i) => i.key !== key), items: [...state.items, item] };
    });
  },

  addAddon: (addon) => {
    const key = 'addon-' + addon.id;
    set((state) => {
      if (state.items.some((i) => i.key === key)) return state;
      return {
        items: [
          ...state.items,
          { key, pid: addon.id, name: addon.name, image: addon.img, ph: addon.ph, weight: '', unit: addon.price, qty: 1, isAddon: true },
        ],
      };
    });
  },

  applyPromo: (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'FIRST20') {
      set({ promo: { code: normalized, pct: 20 } });
      return true;
    }
    set({ promo: null });
    return false;
  },
  clearPromo: () => set({ promo: null }),

  clearCart: () => set({ items: [], promo: null }),

  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  subtotal: () => get().items.reduce((sum, i) => sum + i.unit * i.qty, 0),
  discount: () => {
    const { promo } = get();
    if (!promo) return 0;
    return Math.round(get().subtotal() * (promo.pct / 100));
  },
  deliveryFee: () => {
    const sub = get().subtotal();
    if (sub === 0) return 0;
    return sub >= 1500 ? 0 : 49;
  },
  total: () => Math.max(0, get().subtotal() - get().discount()) + get().deliveryFee(),
}));
