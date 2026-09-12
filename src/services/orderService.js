import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { withId, withIds } from './normalize';

export const SLOTS = ['10 AM – 12 PM', '12 PM – 2 PM', '2 PM – 4 PM', '4 PM – 6 PM', '6 PM – 8 PM'];

export async function createOrder(payload) {
  return withId(await api.post(ENDPOINTS.orders, payload));
}

export async function getMyOrders() {
  return withIds(await api.get(ENDPOINTS.myOrders));
}

export async function trackOrder(code) {
  try {
    return withId(await api.get(ENDPOINTS.orderByCode(code)));
  } catch {
    return null;
  }
}
