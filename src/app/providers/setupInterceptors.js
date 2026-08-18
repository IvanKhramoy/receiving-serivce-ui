import { setAuthHandlers } from '@/shared/api/httpClient';
import { useAuthStore } from '@/entities/user/model';

// connects httpClient to zustand-store
export const setupInterceptors = () => {
  setAuthHandlers({
    getRefreshToken: () => useAuthStore.getState().refreshToken,

    onRefreshSuccess: (accessToken, refreshToken) => { // save to zustand
      useAuthStore.getState().setTokens(accessToken, refreshToken);
    },

    onRefreshFailure: () => {
      useAuthStore.getState().logout();
    },
  });
};