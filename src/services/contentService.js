import { api } from './api';
import { ENDPOINTS } from './endpoints';
import { withIds } from './normalize';

export async function getPublishedBlogs(limit) {
  return withIds(await api.get(limit ? `${ENDPOINTS.blog}?limit=${limit}` : ENDPOINTS.blog));
}

export async function getBlogPostById(id) {
  return api.get(`/blog/${id}`).then((doc) => (doc ? { ...doc, id: doc._id } : null)).catch(() => null);
}

export async function getComments(postId) {
  return withIds(await api.get(`/blog/${postId}/comments`));
}

export async function postComment(postId, payload) {
  const comment = await api.post(`/blog/${postId}/comments`, payload);
  return { ...comment, id: comment._id };
}

export async function getFaqs() {
  return withIds(await api.get(ENDPOINTS.faqs));
}

export async function getReviews() {
  return withIds(await api.get(ENDPOINTS.reviews));
}

export async function getHomeBanners() {
  return withIds(await api.get(ENDPOINTS.banners));
}

export async function getSettings() {
  return api.get(ENDPOINTS.settings);
}

export async function subscribeNewsletter(email) {
  return api.post(ENDPOINTS.newsletter, { email });
}
