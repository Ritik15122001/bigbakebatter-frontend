import { create } from 'zustand';
import { getHomeBanners, getPublishedBlogs, getFaqs, getReviews, getSettings } from '../services/contentService';

/** Marketing/site content fetched once at startup — banners, blog, FAQs, reviews, business info. */
export const useContentStore = create((set, get) => ({
  banners: [],
  blogs: [],
  faqs: [],
  reviews: [],
  settings: null,
  contentLoaded: false,
  contentError: null,

  fetchContent: async () => {
    if (get().contentLoaded) return;
    try {
      const [banners, blogs, faqs, reviews, settings] = await Promise.all([
        getHomeBanners(), getPublishedBlogs(), getFaqs(), getReviews(), getSettings(),
      ]);
      set({ banners, blogs, faqs, reviews, settings, contentLoaded: true, contentError: null });
    } catch (err) {
      set({ contentError: err.message });
    }
  },
}));
