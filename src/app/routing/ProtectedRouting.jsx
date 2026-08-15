import { Navigate, Outlet} from "react-router-dom";
import { useAuthStore } from "@/entities/user/model";
import { isTokenExpired} from "@/shared/lib/decodeJwt";
import {useEffect} from "react";

const ProtectedRoute = ({ children }) => {
  // const { accessToken, logout } = useAuthStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const isExpired = !accessToken || isTokenExpired(accessToken);

  useEffect(() => {
    if (isExpired && accessToken) logout();
  }, [isExpired, accessToken, logout]);
  // return children;
  if (isExpired) return <Navigate to="/login" replace />;
  // replace заменяет текущую страницу в истории браузера новой, а не добавляет её сверху; кнопка назад не работает
  return <Outlet />;
}

export default ProtectedRoute;