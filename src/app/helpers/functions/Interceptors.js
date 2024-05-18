import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getToken, saveToken, removeToken } from './LocalStorageServices';
import toaster from './Toaster';
import history from 'app/history';

// Add a request interceptor
axios.interceptors.request.use(
  async (conf) => {
    const localStorageService = getToken();
    const config = {
      ...conf,
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        ...conf.headers,
        Accept: 'application/json',
        Authorization: `Bearer ${localStorageService?.access_token}`
      }
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle refresh token
const requestToken = axios.create();
// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) => {
  const token = getToken();

  return requestToken
    .post(`${process.env.REACT_APP_BACKEND_URL}/refresh-token`, {
      refresh_token: token ? token.refresh_token : ''
    })
    .then((tokenRefreshResponse) => {
      saveToken(tokenRefreshResponse);
      failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse?.access_token}`;
      return Promise.resolve();
    })
    .catch((refreshError) => {
      removeToken();
      // history.push('/login');
      toaster('Token Refresh Failed', 'error');
      return Promise.reject(refreshError);
    });
};

// axios-auth-refresh
createAuthRefreshInterceptor(axios, refreshAuthLogic, {
  statusCodes: [401]
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.headers['content-type']) {
        if (error.response.headers['content-type'].indexOf('application/json') >= 0) {
          if (error.response.data.message) {
            return Promise.reject(Error(error.response.data.message));
          }

          if (error.response.status === 422) {
            return Promise.reject(error);
          }
        } else if (
          error.response.headers['content-type'].indexOf('text/html') >= 0 &&
          error.response.status !== 401
        ) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);
