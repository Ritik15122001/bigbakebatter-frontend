import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { setAuthToken } from './api';

export async function loginUser(email, password) {
  const data = await api.post(ENDPOINTS.login, { email, password });
  setAuthToken(data.token);
  return data;
}

export async function registerUser({ name, email, password, phone, addr }) {
  const data = await api.post(ENDPOINTS.register, { name, email, password, phone, addr });
  setAuthToken(data.token);
  return data;
}

export async function fetchMe() {
  return api.get(ENDPOINTS.me);
}

export async function updateMe(payload) {
  return api.patch(ENDPOINTS.me, payload);
}

export async function changePassword(currentPassword, newPassword) {
  return api.patch(ENDPOINTS.changePassword, { currentPassword, newPassword });
}

export async function addAddress(payload) {
  return api.post(ENDPOINTS.addresses, payload);
}

export async function updateAddress(id, payload) {
  return api.patch(ENDPOINTS.addressById(id), payload);
}

export async function setDefaultAddress(id) {
  return api.patch(ENDPOINTS.addressDefault(id));
}

export async function deleteAddress(id) {
  return api.del(ENDPOINTS.addressById(id));
}
