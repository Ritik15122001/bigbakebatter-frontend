import { create } from 'zustand';
import { createOrder, getMyOrders, trackOrder, SLOTS } from '../services/orderService';

export const useOrderStore = create((set, get) => ({
  lastOrder: null,
  myOrders: [],
  myOrdersLoaded: false,
  checkout: { pay: 'upi', date: null, slot: null, msg: '' },

  setCheckoutField: (field, value) => set((state) => ({ checkout: { ...state.checkout, [field]: value } })),
  resetCheckout: () => set({ checkout: { pay: 'upi', date: null, slot: null, msg: '' } }),

  placeOrder: async (payload) => {
    const order = await createOrder(payload);
    set({ lastOrder: order });
    return order;
  },

  fetchMyOrders: async () => {
    const orders = await getMyOrders();
    set({ myOrders: orders, myOrdersLoaded: true });
    return orders;
  },

  trackByCode: (code) => trackOrder(code),

  getOrder: (code) => get().myOrders.find((o) => o.code === code) || get().lastOrder,
}));

export { SLOTS };
