import { GET } from 'app/helpers/functions/Api';
import { create } from 'zustand';

const useCurrentUsers = create((set) => ({
  loading: false,
  error: false,
  message: null,
  user: null,
  fetchUser: async (pathUrl = `${process.env.REACT_APP_BACKEND_URL}/profile`) => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await GET(pathUrl);
      if (!response) {
        throw new Error('Empty response received.');
      }
      const data = response.data;

      set((state) => ({
        ...state,
        user: data
      }));

      return data;
    } catch (err) {
      set((state) => ({
        ...state,
        error: true,
        message: err.message,
        user: null
      }));

      return err;
    } finally {
      set((state) => ({
        ...state,
        loading: false
      }));
    }
  }
}));

export default useCurrentUsers;
