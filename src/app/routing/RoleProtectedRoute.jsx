import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "@/entities/user/model/index.js";

const RoleProtectedRoute = ({allowedRoles}) => {
  const user = useAuthStore((state) => state.user);
  const hasRole = user?.authorities?.some((role) => allowedRoles.includes(role))

  // Пока нет user (bootstrap идёт) — рендерим Outlet, чтобы не было мигания
  // if (!user) return <Outlet/>;
  // if (!user) return <Navigate to="/" replace />;

  if (!hasRole || !user) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default RoleProtectedRoute;

// const RoleProtectedRoute = () => {
//   const isAllowed = useAuthStore((state) => selectIsManager(state) || selectIsAdmin(state));
//   if (!isAllowed) return <Navigate to="/" replace />;
//   return <Outlet />;
// };