import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  ids: [],

  toggle: (productId) => {
    set((state) => ({
      ids: state.ids.includes(productId)
        ? state.ids.filter((id) => id !== productId)
        : [...state.ids, productId],
    }));
    return get().ids.includes(productId);
  },

  isWished: (productId) => get().ids.includes(productId),
  count: () => get().ids.length,
}));
