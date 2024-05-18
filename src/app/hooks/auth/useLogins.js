import { saveToken } from 'app/helpers/functions/LocalStorageServices';
import { create } from 'zustand';

const useLogins = create((set) => ({
  loading: false,
  error: false,
  message: null,
  token: null,

  fetchLogin: async (pathUrl = `${process.env.REACT_APP_BACKEND_URL}/login`, bodyData = null) => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await fetch(pathUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      set((state) => ({
        ...state,
        token: data
      }));

      saveToken(data);

      return data;
    } catch (err) {
      set((state) => ({
        ...state,
        error: true,
        message: err.message,
        token: null
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

export default useLogins;
