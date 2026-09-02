import Router from './routing/Router.jsx';
import {Toaster} from 'react-hot-toast';
import { useInitAuth } from './model/useInitAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './providers/queryClient';
import useAuthStore from '@/entities/user/model/authStore.js';
import { useEffect } from 'react';
import './styles/index.scss';

const App = () => {
  const isInitializing = useInitAuth();

  useEffect(() => {
    const unsub = useAuthStore.subscribe((state) => {  // subscribe — отреагировать на изменение без ререндера
      if (!state.accessToken) {
        queryClient.clear();
      }
    });
    return unsub;
  }, []);


  if (isInitializing) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
      <Toaster position="top-right" reverseOrder={false}
      />
    </QueryClientProvider>
  )
}

export default App;