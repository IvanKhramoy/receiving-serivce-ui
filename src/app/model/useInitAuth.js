import { useState, useEffect } from 'react';
import { useAuthStore } from '@/entities/user/model';
import { refreshTokensRequest } from '@/entities/user/api/auth';
import { isTokenExpired } from '@/shared/lib/decodeJwt';

export const useInitAuth = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const logout = useAuthStore((state) => state.logout);

  // синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  // инициализация и рефреш при старте
  useEffect(() => {
    const initAuth = async () => {
      const { accessToken, refreshToken, setTokens,  } = useAuthStore.getState();

      if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
        try {
          const data = await refreshTokensRequest(refreshToken);
          setTokens(data.accessToken, data.refreshToken);
        } catch (error) {
          logout();
        }
      } else if (accessToken && isTokenExpired(accessToken)) {
        logout();
      }

      setIsInitializing(false);
    };

    initAuth();
  }, []);

  return isInitializing;
};