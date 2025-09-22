import axios, {AxiosError} from 'axios';
import {$apiUrl} from "@shared/const/constants";

let isRefreshing = false;
let failedQueue: any[] = [];

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // если уже идёт обновление токена => ждём, когда оно закончится
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return $api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await login();
        processQueue(null, newToken);

        // пробуем выполнить запрос снова с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return $api(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
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

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};