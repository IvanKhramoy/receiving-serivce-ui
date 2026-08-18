import axios from 'axios';
import {tokenStorage} from "./tokenStorage";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

let authHandlers = {
  getRefreshToken: () => null,
  onRefreshSuccess: (accessToken, refreshToken) => {
  },
  onRefreshFailure: () => {
  },
};

export const setAuthHandlers = (handlers) => { // to implement real handlers
  authHandlers = handlers;
};


// interceptor (triggered before each request, changes the request settings before sent)
httpClient.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url?.includes('/api/auth');

  if (!isAuthEndpoint) {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`; //if there's no token, don't add the header at all
  }
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) { // нужен только для неидемпотентных запросов
    config.headers['X-Idempotency-Key'] = crypto.randomUUID();
  }
  // For each request via HttpClient (including login), new random UUID is generated for the idemp. header.

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
        const refreshToken = authHandlers.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const {data} = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          refreshToken,
          {
            headers: {
              'Content-Type': 'text/plain',
              'X-Idempotency-Key': crypto.randomUUID(),
            }
          }
        );

        // useAuthStore.getState().setTokens(accessToken, newRefreshToken);

        authHandlers.onRefreshSuccess(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return httpClient(originalRequest);

      } catch (refreshError) {
        authHandlers.onRefreshFailure();
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;