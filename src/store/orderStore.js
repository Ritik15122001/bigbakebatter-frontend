import { create } from 'zustand';
import {
  createOrder, getMyOrders, getMyOrder, getMyTransactions, trackOrder, SLOTS,
} from '../services/orderService';

export const useOrderStore = create((set, get) => ({
  lastOrder: null,
  myOrders: [],
  myOrdersLoaded: false,
  myTransactions: [],
  myTransactionsLoaded: false,
  checkout: { pay: 'upi', date: null, slot: null, msg: '' },

  setCheckoutField: (field, value) => set((state) => ({ checkout: { ...state.checkout, [field]: value } })),
  resetCheckout: () => set({ checkout: { pay: 'upi', date: null, slot: null, msg: '' } }),

  placeOrder: async (payload) => {
    const order = await createOrder(payload);
    // Invalidate cached account data so the next visit to My Orders / Payments
    // refetches instead of showing the list as it was before this order.
    set({ lastOrder: order, myOrdersLoaded: false, myTransactionsLoaded: false });
    return order;
  },

  fetchMyOrders: async () => {
    const orders = await getMyOrders();
    set({ myOrders: orders, myOrdersLoaded: true });
    return orders;
  },

  fetchMyTransactions: async () => {
    const transactions = await getMyTransactions();
    set({ myTransactions: transactions, myTransactionsLoaded: true });
    return transactions;
  },

  fetchMyOrder: (code) => getMyOrder(code),

  trackByCode: (code) => trackOrder(code),

  getOrder: (code) => get().myOrders.find((o) => o.code === code) || get().lastOrder,

  resetAccountData: () => set({
    myOrders: [], myOrdersLoaded: false, myTransactions: [], myTransactionsLoaded: false,
  }),
}));

export { SLOTS };
