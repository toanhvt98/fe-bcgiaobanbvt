import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AcountPage from "../pages/AccountPage";

import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";

import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import BCKhoaPage from "../pages/BCKhoaPage";
import AdminPage from "../pages/AdminPage";

function Router() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          {/* <Route path ="/" element ={<><MainLayout/></>}> */}
          <Route index element={<HomePage />} />
          <Route path="/account" element={<AcountPage />} />
          <Route path="khoa/:khoaId" element={<BCKhoaPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
