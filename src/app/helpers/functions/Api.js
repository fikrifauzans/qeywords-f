import axios from 'axios';

export const GET = (url, resp) =>
  axios({
    url,
    method: 'GET'
  }).then((response) => response.data);

export const POST = (url, reqBody, resp) =>
  axios({
    url,
    method: 'POST',
    data: reqBody
  }).then((response) => response.data);

export const PUT = (url, reqBody, resp) =>
  axios({
    url,
    method: 'PUT',
    data: reqBody
  }).then((response) => response.data, resp);

export const DELETE = (url, resp) =>
  axios({
    url,
    method: 'DELETE'
  }).then((response) => response.data);
