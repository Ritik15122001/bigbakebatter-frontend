import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { withId, withIds } from './normalize';

export async function getProducts() {
  return withIds(await api.get(ENDPOINTS.products));
}

export async function getProductById(id) {
  try {
    return withId(await api.get(ENDPOINTS.productById(id)));
  } catch {
    return null;
  }
}

export async function getCategories() {
  return withIds(await api.get(ENDPOINTS.categories));
}

export async function getFlavours() {
  return withIds(await api.get(ENDPOINTS.flavours));
}

export async function getOccasions() {
  return withIds(await api.get(ENDPOINTS.occasions));
}

export async function getAddons() {
  return withIds(await api.get(ENDPOINTS.addons));
}
