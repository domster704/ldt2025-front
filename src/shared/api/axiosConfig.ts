import axios, {AxiosError} from 'axios';
import {$apiUrl} from "@shared/const/constants";

export const $api = axios.create({
  baseURL: $apiUrl,
  headers: {'Content-Type': 'application/json'}
});

// каждый запрос добавляет токен, если он есть
$api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// обработчик ответов
$api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    try {
      const newToken = await login();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return $api(originalRequest);
    } catch (e) {
      return Promise.reject(error);
    }
  }
);

export const login = async (): Promise<string> => {
  const user_id = localStorage.getItem('user_id');
  if (!user_id) return Promise.reject('user_id not found');

  const response = await $api.post(`/auth/custom-login`, {user_id});
  const {jwt} = response.data;

  if (!jwt) return Promise.reject('no jwt in response');

  localStorage.setItem('token', jwt);
  return jwt;
};
