import axios, { AxiosHeaders } from 'axios';
import { store } from '@/store';

export const api = axios.create({
  baseURL: 'http://localhost:4000/v1',
  headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers = new AxiosHeaders(config.headers);
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});
