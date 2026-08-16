import {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthStore} from '../model';
import {isTokenExpired} from '@/shared/lib/decodeJwt';

export const useInitAuth = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const logout = useAuthStore((state) => state.logout);

  // 1. Синхронизация между вкладками браузера
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  // 2. Инициализация и рефреш при старте
  useEffect(() => {
    const initAuth = async () => {
      const {
        accessToken,
        refreshToken,
        setTokens,
        logout
      } = useAuthStore.getState();

      if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
        try {
          const {data} = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
            refreshToken,
            {
              headers: {
                'Content-Type': 'text/plain',
                'X-Idempotency-Key': crypto.randomUUID(),
              },
            }
          );
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