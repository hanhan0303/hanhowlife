import axios from 'axios';
import { LOCALSTORAGE_KEY } from '../constants';

export const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}`,
});

apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LOCALSTORAGE_KEY);
  config.headers['Authorization'] = token;
  return config;
});

export const apiLogin = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v2`,
});

apiLogin.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LOCALSTORAGE_KEY);
  config.headers['Authorization'] = token;
  return config;
});
