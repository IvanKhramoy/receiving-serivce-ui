import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRouting";
import {useAuthStore} from "@/entities/user/model";
import {isTokenExpired} from "@/shared/lib/decodeJwt";

import LoginPage from "@/pages/LoginPage";
import HomePage from '@/pages/HomePage';

import BaseLayout from "@/app/layouts/BaseLayout/BaseLayout.jsx";
import HomeLayout from "@/app/layouts/HomeLayout/HomeLayout.jsx";
import ListLayout from "@/app/layouts/ListLayout/ListLayout.jsx";
import AsnListPage from "@/pages/AsnListPage/AsnListPage.jsx";
import ReceiptPage from "@/pages/ReceiptPage/index.js";
import CreateAsnPage from "@/pages/CreateAsnPage/index.js";

const Router = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = accessToken && !isTokenExpired(accessToken);
  return (
    // следит за адресной строкой через HistoryAPI; Routes - контейнер, смотрит на текущий URL
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<BaseLayout />}>

            <Route element={<HomeLayout />}>
              <Route path="/" element={<HomePage />}/>
            </Route>

            <Route element={<ListLayout />}>
              <Route path="/asn" element={<AsnListPage />} />
              <Route path="/receipt" element={<ReceiptPage />} />
              {/*<Route path="/receipts" element={<ReceiptListPage />} />*/}
            </Route>
            <Route path="/asn/create" element={<CreateAsnPage />} />

          </Route>
        </Route>

        <Route path="*" element={isLoggedIn? <div>404 Page not found</div> : <LoginPage />} />


        {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;