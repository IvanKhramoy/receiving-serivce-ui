// // app/routing/PublicRoute.jsx
// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '@/entities/user/model';
//
// const PublicRoute = ({ children }) => {
//   const accessToken = useAuthStore((state) => state.accessToken);
//
//   // Если юзер УЖЕ залогинен, не пускаем его на страницу логина, кидаем на главную
//   if (accessToken) {
//     return <Navigate to="/" replace />;
//   }
//
//   return children;
// };
//
// export default PublicRoute;



// app/routing/CatchAllRoute.jsx
/*
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/user/model';
import NotFoundPage from '@/pages/NotFoundPage';

const CatchAllRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return accessToken ? <NotFoundPage /> : <Navigate to="/login" replace />;
};

export default CatchAllRoute;
jsx
<Route path="*" element={<CatchAllRoute />} />*/
