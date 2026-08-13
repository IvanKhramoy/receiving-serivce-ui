import { Navigate} from "react-router-dom";
import { useAuthStore } from "@/entities/user/model";

const ProtectedRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (!accessToken) return <Navigate to='/login' replace /> //декларативный аналог useNavigate
  // replace заменяет текущую страницу в истории браузера новой, а не добавляет её сверху; кнопка назад не работает
  return children;
}

export default ProtectedRoute;