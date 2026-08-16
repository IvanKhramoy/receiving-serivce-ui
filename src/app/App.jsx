// import {useState, useEffect} from 'react';
import Router from './routing/Router.jsx';
import {Toaster} from 'react-hot-toast';
import './styles/index.scss';
// import {useAuthStore} from "@/entities/user/model/index.js";
// import {isTokenExpired} from "@/shared/lib/decodeJwt.js";
// import axios from "axios";
import {useInitAuth} from "@/entities/user/lib/useInitAuth";

const App = () => {
  const isInitializing = useInitAuth();
  if (isInitializing) return null;
  /*const [isInitializing, setIsInitializing] = useState(true);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        logout();
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, [logout]);

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
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, // Полный URL нужен, т.к. чистый axios не знает про твой baseURL
            // JSON.stringify(refreshToken),
            refreshToken,
            {
              headers: {
                'Content-Type': 'text/plain',
                'X-Idempotency-Key': crypto.randomUUID(),
              }
            }
          );
          setTokens(data.accessToken, data.refreshToken);
        } catch (error) {
          // refreshToken expired or server is unavailable
          logout();
        }
      } else if (accessToken && isTokenExpired(accessToken)) {
        logout()
      }
      setIsInitializing(false);
    };
    initAuth();
  }, []);

  if (isInitializing) return null;*/

  return (
    <>
      <Router/>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default App;