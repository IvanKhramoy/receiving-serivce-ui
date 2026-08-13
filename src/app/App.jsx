import Router from './routing/Router.jsx';
import { Toaster } from 'react-hot-toast';
import './styles/index.scss';
import {useAuthStore} from "@/entities/user/model/index.js";
import {useEffect} from "react";

const App = () => {
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

  return (
    <>
      <Router/>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
  // return <LoginPage/>
}

export default App;