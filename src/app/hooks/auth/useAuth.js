import { create } from 'zustand';

const useAuths = create((set) => ({
  isAuthenticated: false,
  setAuthStatus: (isAuthenticated) => set({ isAuthenticated })
}));

export default useAuths;
