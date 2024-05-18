// import { getToken } from 'app/helpers/functions/LocalStorageServices';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_TIMEOUT = 10000;

// # Initial Instance

const createRequest = (method, url, paramsOrData, res, err) => {
  // const token = getToken()
  const config = {
    url,
    method,
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      common: {}
    }
  };

  // # If Token Exist
  config.headers['Content-Type'] = 'application/json';

  // # Validate Method
  if (method === 'GET' || method === 'DELETE') config.params = paramsOrData;
  else config.data = paramsOrData;

  axios(config)
    .then((response) => res(response))
    .catch((error) => err(error));
};

export const GET_SERVER = (url, params, res, err) => createRequest('GET', url, params, res, err);
export const POST_SERVER = (url, data, res, err) => createRequest('POST', url, data, res, err);
export const PUT_SERVER = (url, id, data, res, err) =>
  createRequest('PUT', `${url}/${id}`, data, res, err);
export const DELETE_SERVER = (url, id, res, err) =>
  createRequest('DELETE', `${url}/${id}`, null, res, err);
export const GET_BY_ID_SERVER = (url, id, res, err) =>
  createRequest('GET', `${url}/${id}`, null, res, err);
