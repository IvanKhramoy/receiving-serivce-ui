import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import HomePage from '@/pages/HomePage';
import ProtectedRoute from "./ProtectedRouting";

const Router = () => {
  return (
    // следит за адресной строкой через HistoryAPI; Routes - контейнер, смотрит на текущий URL
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/*<Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />*/}

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;