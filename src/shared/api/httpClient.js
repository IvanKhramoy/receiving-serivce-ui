import axios from 'axios';
import {tokenStorage} from "./tokenStorage";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// interceptor (triggered before each request, changes the request settings before sent)
httpClient.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url?.startsWith('/api/auth');
  if (!isAuthEndpoint) {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    //if there's no token, dont add the header at all
  }
  config.headers['X-Idempotency-Key'] = crypto.randomUUID();
  // For each request via HttpClient (including login), new random UUID is generated for the idemp. header.
  return config;
})

export default httpClient;