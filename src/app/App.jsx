import Router from './routing/Router.jsx';
import {Toaster} from 'react-hot-toast';
import { useInitAuth } from './model/useInitAuth';
import './styles/index.scss';

const App = () => {
  const isInitializing = useInitAuth();
  if (isInitializing) return null;

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