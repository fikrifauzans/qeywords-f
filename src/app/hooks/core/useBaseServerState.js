import {
  INIT_LIMIT,
  INIT_ORDER_BY,
  INIT_PAGE,
  INIT_PAGE_STATE,
  INIT_SORT_BY
} from 'app/constants/constants';
import {
  DELETE_SERVER,
  GET_BY_ID_SERVER,
  GET_SERVER,
  POST_SERVER,
  PUT_SERVER
} from 'app/server/Api';
import { create } from 'zustand';

const DEFAULT_FILTER = {};
const DEFAULT_DATA = [];
const DEFAULT_LOADING = false;

export const useBaseServerState = create((set, get) => ({
  limit: INIT_LIMIT,
  page: INIT_PAGE_STATE,
  sortBy: INIT_SORT_BY,
  orderBy: INIT_ORDER_BY,
  filters: DEFAULT_FILTER,
  data: DEFAULT_DATA,
  loading: DEFAULT_LOADING,
  pagination: INIT_PAGE,
  status: 200,
  message: 'Data Found',
  errror: false,

  getList: (url, params) => {
    set((state) => ({ ...state, loading: true, limit: params.limit }));
    return GET_SERVER(
      url,
      {
        limit: get().pagination.rowsPerPage,
        page: get().pagination.page,
        ...params
      },
      (res) => {
        const [data, status, message, meta] = [
          res.data.data,
          res.data.status,
          res.data.message,
          res.data.meta
        ];
        const paging = {
          rowsPerPage: meta.pagination.perPage,
          currentPage: meta.pagination.currentPage === 1 ? 1 : meta.pagination.currentPage,
          count: meta.pagination.total
        };

        set((state) => ({
          ...state,
          data,
          status,
          message,
          loading: false,
          pagination: { ...state.pagination, ...paging }
        }));
      },
      (err) => {
        const [status, message] = [
          err?.response?.data?.error?.status,
          err?.response?.data?.error?.message ?? err?.message
        ];
        set((state) => ({ ...state, status, loading: false, error: true, message: message }));
      }
    );
  },
  destroyById: (url, id, response, error) => {
    set((state) => ({ ...state, loading: true }));
    return DELETE_SERVER(
      url,
      id,
      (res) => {
        const [data, status, message, meta] = [
          res.data.data,
          res.data.status,
          res.data.message,
          res.data.meta
        ];
        response(status, message, data, meta);
        set((state) => ({ ...state, status, loading: false, error: false, message: message }));
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        error(status, message);
        set((state) => ({ ...state, status, loading: false, error: true, message: message }));
      }
    );
  },
  getOne: (url, id, response, error) => {
    set((state) => ({ ...state, loading: true }));
    return GET_BY_ID_SERVER(
      url,
      id,
      (res) => {
        const [data, status, message, meta] = [
          res.data.data,
          res.data.status,
          res.data.message,
          res.data.meta
        ];
        response(status, message, data, meta);
        set((state) => ({ ...state, status, loading: false, error: false, message: message }));
      },
      (err) => {
        console.log(err);
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        error(status, message);
        set((state) => ({ ...state, status, loading: false, error: true, message: message }));
      }
    );
  },
  updateData: (url, id, payload, response, error) => {
    set((state) => ({ ...state, loading: true }));
    return PUT_SERVER(
      url,
      id,
      payload,
      (res) => {
        const [data, status, message, meta] = [
          res.data.data,
          res.data.status,
          res.data.message,
          res.data.meta
        ];
        response(status, message, data, meta);
        set((state) => ({ ...state, status, loading: false, error: false, message: message }));
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        error(status, message);
        set((state) => ({ ...state, status, loading: false, error: true, message: message }));
      }
    );
  },
  postData: (url, payload, response, error) => {
    set((state) => ({ ...state, loading: true }));
    return POST_SERVER(
      url,
      payload,
      (res) => {
        const [data, status, message, meta] = [
          res.data.data,
          res.data.status,
          res.data.message,
          res.data.meta
        ];
        response(status, message, data, meta);
        set((state) => ({ ...state, status, loading: false, error: false, message: message }));
      },
      (err) => {
        const [status, message] = [err.response.data.error.status, err.response.data.error.message];
        error(status, message);
        set((state) => ({ ...state, status, loading: false, error: true, message: message }));
      }
    );
  }
}));
