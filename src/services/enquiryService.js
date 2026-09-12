import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { withIds } from './normalize';

export async function submitEnquiry(payload) {
  return api.post(ENDPOINTS.enquiries, payload);
}

export async function getMyEnquiries() {
  const data = await api.get(ENDPOINTS.myEnquiries);
  return withIds(data);
}
