import {
  GET_BY_ID_SERVER,
  GET_SERVER,
  POST_SERVER,
  PUT_SERVER,
  DELETE_SERVER
} from 'app/server/Api';
import { create } from 'zustand';

export const useServer = create((set, get) => ({
  loading: false,
  status: 200,
  message: 'Success',
  data: [],

  getStatus: () => get().status,
  getLoading: () => get().loading,
  getMessage: () => get().message,

  post: (url, params, response, error) => {
    set((state) => ({ ...state, loading: true }));
    POST_SERVER(
      url,
      params,
      (res) => {
        const [data, status, message] = [res.data.data, res.data.status, res.data.message];
        set((state) => ({ ...state, status, message, data, loading: false }));
        response(data, status, message);
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        set((state) => ({ ...state, status, message, loading: false }));
        error(err.response.data.error, status, message);
      }
    );
  },

  get: (url, params, response, error) => {
    set((state) => ({ ...state, loading: true }));
    GET_SERVER(
      url,
      params,
      (res) => {
        const [data, status, message] = [res.data.data, res.data.status, res.data.message];
        set((state) => ({ ...state, status, message, data, loading: false }));
        response(data, status, message);
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        set((state) => ({ ...state, status, message, loading: false }));
        error(err.response.data.error, status, message);
      }
    );
  },

  getById: (url, id, response, error) => {
    set((state) => ({ ...state, loading: true }));
    GET_BY_ID_SERVER(
      url,
      id,
      (res) => {
        const [data, status, message] = [res.data.data, res.data.status, res.data.message];
        set((state) => ({ ...state, status, message, data, loading: false }));
        response(data, status, message);
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        set((state) => ({ ...state, status, message, loading: false }));
        error(err.response.data.error, status, message);
      }
    );
  },

  put: (url, data, response, error) => {
    set((state) => ({ ...state, loading: true }));
    PUT_SERVER(
      url,
      data,
      (res) => {
        const [status, message] = [res.data.status, res.data.message];
        set((state) => ({ ...state, status, message, loading: false }));
        response(status, message);
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        set((state) => ({ ...state, status, message, loading: false }));
        error(err.response.data.error, status, message);
      }
    );
  },

  delete: (url, response, error) => {
    set((state) => ({ ...state, loading: true }));
    DELETE_SERVER(
      url,
      (res) => {
        const [status, message] = [res.data.status, res.data.message];
        set((state) => ({ ...state, status, message, loading: false }));
        response(status, message);
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        set((state) => ({ ...state, status, message, loading: false }));
        error(err.response.data.error, status, message);
      }
    );
  }
}));
