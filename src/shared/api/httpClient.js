import axios from 'axios';
import {tokenStorage} from "./tokenStorage";
import {useAuthStore} from '@/entities/user/model';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// interceptor (triggered before each request, changes the request settings before sent)
httpClient.interceptors.request.use((config) => {
  // const isAuthEndpoint = config.url?.startsWith('/api/auth');
  const isAuthEndpoint = config.url?.includes('/api/auth');

  if (!isAuthEndpoint) {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`; //if there's no token, don't add the header at all
  }
  // config.headers['X-Idempotency-Key'] = crypto.randomUUID();
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) { // нужен только для неидемпотентных запросов
    config.headers['X-Idempotency-Key'] = crypto.randomUUID();
  }
  // For each request via HttpClient (including login), new random UUID is generated for the idemp. header.
  // const methodsWithIdempotency = ['post', 'put', 'patch'];
  // if (config.method && methodsWithIdempotency.includes(config.method)) {
  //   config.headers['X-Idempotency-Key'] = crypto.randomUUID();
  // }
  return config;
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest.url?.includes('api/auth/login') ||
      originalRequest.url?.includes('api/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        // const { accessToken, refreshToken: newRefreshToken } = await httpClient
        //   .post('/api/auth/refresh', {refreshToken})
        //   .then((res) => res.data);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, // Полный URL нужен, т.к. чистый axios не знает про твой baseURL
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = data;

        useAuthStore.getState().setTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return httpClient(originalRequest);
      } catch(refreshError) {
        useAuthStore.getState().logout();
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;