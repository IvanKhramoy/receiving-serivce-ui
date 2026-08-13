import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import HomePage from '@/pages/HomePage';
import ProtectedRoute from "./ProtectedRouting";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        {/*<Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />*/}

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;