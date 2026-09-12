import { create } from 'zustand';

let toastSeq = 0;

export const useUiStore = create((set) => ({
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  searchOpen: false,
  addonsModalOpen: false,
  toasts: [],

  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),

  openAddonsModal: () => set({ addonsModalOpen: true }),
  closeAddonsModal: () => set({ addonsModalOpen: false }),

  closeAllOverlays: () => set({ mobileMenuOpen: false, cartDrawerOpen: false, searchOpen: false, addonsModalOpen: false }),

  pushToast: (toast) => {
    const id = ++toastSeq;
    set((state) => ({ toasts: [...state.toasts, { id, kind: 'ok', ...toast }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3600);
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
