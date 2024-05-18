import { INIT_LIMIT, INIT_PAGE_STATE } from 'app/constants/constants';
import { DELETE, GET, POST, PUT } from 'app/helpers/functions/Api';
import toaster, { TOASTER_ERROR, TOASTER_SUCCESS } from 'app/helpers/functions/Toaster';
import { create } from 'zustand';

const useBaseCruds = create((set, get) => ({
  filters: [
    {
      name: 'page',
      value: 1
    },
    {
      name: 'orderBy',
      value: 'id'
    },
    {
      name: 'sortBy',
      value: 'asc'
    },
    {
      name: 'limit',
      value: INIT_LIMIT
    }
  ],
  loading: false,
  error: false,
  message: null,
  data: [],
  pagination: INIT_PAGE_STATE,
  mode: 'add',
  setMode: (values) => set((state) => ({ mode: values })),
  loadBaseCruds: (filters = [], pathUrl = '/base/base-crud?') => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    let params = get().filters;
    const mergedArray = params.map((filter) => {
      const matchingFilter = filters.find((f) => f.name === filter.name);
      return matchingFilter ? matchingFilter : filter;
    });
    const results = mergedArray.concat(
      filters.filter((filter) => !params.find((f) => f.name === filter.name))
    );

    const resultsParams = results.map((t) => `${t.name}=${t.value}`).join('&');
    pathUrl = pathUrl + resultsParams;

    GET(pathUrl)
      .then((response) => {
        set((state) => ({
          ...state,
          data: response.data,
          message: response.message,
          pagination: {
            currentPage: response?.meta.pagination.currentPage,
            selectedPageSize: response?.meta.pagination.perPage,
            totalItemCount: response?.meta.pagination.total,
            totalPage: response?.meta.pagination.total_pages,
            itemCount: response?.meta.pagination.count
          }
        }));
        toaster(get().message, 'info');
      })
      .catch((err) => {
        set((state) => ({
          ...state,
          error: true,
          message: err.response?.data?.error?.message,
          data: []
        }));
      })
      .finally(() => {
        set((state) => ({
          ...state,
          loading: false
        }));
      });
  },
  loadBaseCrud: async (id, pathUrl = '/base/base-crud/') => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await GET(pathUrl + id);
      set((state) => ({
        ...state,
        data: response.data,
        message: response.message
      }));
      toaster(response?.message, TOASTER_SUCCESS);
      return response?.data;
    } catch (err) {
      const messageResponse = err.response?.data?.error?.message;
      set((state) => ({
        ...state,
        error: true,
        message: messageResponse,
        data: []
      }));
      toaster(messageResponse, TOASTER_ERROR);
      return messageResponse;
    } finally {
      set((state) => ({
        ...state,
        loading: false
      }));
    }
  },
  postBaseCrud: async (pathUrl = '/base/base-crud', requestBody = null) => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await POST(pathUrl, requestBody);
      set((state) => ({
        ...state,
        data: response.data,
        message: response.message
      }));
      toaster(response?.message, TOASTER_SUCCESS);
      return response;
    } catch (err) {
      const messageResponse = err.response?.data?.error?.message;
      set((state) => ({
        ...state,
        error: true,
        message: messageResponse,
        data: []
      }));
      toaster(messageResponse, TOASTER_ERROR);
      return messageResponse;
    } finally {
      set((state) => ({
        ...state,
        loading: false
      }));
    }
  },
  updateBaseCrud: async (id, pathUrl = '/base/base-crud/', requestBody = null) => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await PUT(pathUrl + id, requestBody);
      set((state) => ({
        ...state,
        data: response.data,
        message: response.message
      }));
      toaster(response?.message, TOASTER_SUCCESS);
      return response;
    } catch (err) {
      const messageResponse = err.response?.data?.error?.message;
      set((state) => ({
        ...state,
        error: true,
        message: messageResponse,
        data: []
      }));
      toaster(messageResponse, TOASTER_ERROR);
      return messageResponse;
    } finally {
      set((state) => ({
        ...state,
        loading: false
      }));
    }
  },
  deleteBaseCrud: async (id, pathUrl = '/base/base-crud/') => {
    set((state) => ({
      ...state,
      loading: true,
      error: false
    }));

    try {
      const response = await DELETE(pathUrl + id);
      set((state) => ({
        ...state,
        data: response.data,
        message: response.message
      }));
      toaster(response?.message, TOASTER_SUCCESS);
      return response;
    } catch (err) {
      const messageResponse = err.response?.data?.error?.message;
      set((state) => ({
        ...state,
        error: true,
        message: messageResponse,
        data: []
      }));
      toaster(messageResponse, TOASTER_ERROR);
      return messageResponse;
    } finally {
      set((state) => ({
        ...state,
        loading: false
      }));
    }
  }
}));

export default useBaseCruds;
