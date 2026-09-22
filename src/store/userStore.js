import { create } from 'zustand';
import {
  loginUser, registerUser, fetchMe, updateMe, changePassword,
  addAddress, updateAddress, setDefaultAddress, deleteAddress,
} from '../services/userService';
import { setAuthToken } from '../services/api';

const STORAGE_KEY = 'bbb_token';
const savedToken = localStorage.getItem(STORAGE_KEY);
if (savedToken) setAuthToken(savedToken);

export const useUserStore = create((set) => ({
  isLoggedIn: false,
  profile: null,
  authChecked: false,

  login: async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem(STORAGE_KEY, data.token);
    set({ isLoggedIn: true, profile: data.user, authChecked: true });
    return data.user;
  },

  register: async (payload) => {
    const data = await registerUser(payload);
    localStorage.setItem(STORAGE_KEY, data.token);
    set({ isLoggedIn: true, profile: data.user, authChecked: true });
    return data.user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthToken(null);
    set({ isLoggedIn: false, profile: null });
  },

  hydrate: async () => {
    if (!savedToken) {
      set({ authChecked: true });
      return;
    }
    try {
      const user = await fetchMe();
      set({ isLoggedIn: true, profile: user, authChecked: true });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setAuthToken(null);
      set({ isLoggedIn: false, profile: null, authChecked: true });
    }
  },

  updateProfile: async (patch) => {
    const user = await updateMe(patch);
    set({ profile: user });
    return user;
  },

  changePassword: (currentPassword, newPassword) => changePassword(currentPassword, newPassword),

  addAddress: async (payload) => {
    const user = await addAddress(payload);
    set({ profile: user });
    return user;
  },

  editAddress: async (id, payload) => {
    const user = await updateAddress(id, payload);
    set({ profile: user });
    return user;
  },

  makeAddressDefault: async (id) => {
    const user = await setDefaultAddress(id);
    set({ profile: user });
    return user;
  },

  removeAddress: async (id) => {
    const user = await deleteAddress(id);
    set({ profile: user });
    return user;
  },
}));
