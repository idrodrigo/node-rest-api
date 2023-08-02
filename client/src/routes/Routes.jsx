import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const LazyProfile = lazy(() => import("../pages/private/Profile"))
const LazyTodoFormPage = lazy(() => import("../pages/private/TodoFormPage"))
const LazyTodoPage = lazy(() => import("../pages/private/TodoPage"))

const LazyHomePage = lazy(() => import("../pages/public/HomePage"))
const LazyLoginPage = lazy(() => import("../pages/public/LoginPage"))
const LazyRegisterPage = lazy(() => import("../pages/public/RegisterPage"))
const LazyPage404 = lazy(() => import("../pages/public/Page404"))

import { PrivateRoutes, PubblicRoutes } from "../routes/paths.js";
import AuthGuard from "./guards/AuthGuard";

export function TodoRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<LazyHomePage />}
      />
      <Route
        path={PubblicRoutes.LOGIN}
        element={<LazyLoginPage />}
      />
      <Route
        path={PubblicRoutes.REGISTER}
        element={<LazyRegisterPage />}
      />
      <Route element={<AuthGuard />} >
        <Route
          path={PrivateRoutes.TODO}
          element={<LazyTodoPage />}
        >
          <Route
            path={PrivateRoutes.NEWTODO}
            element={<LazyTodoFormPage />}
          />
          <Route
            path={PrivateRoutes.EDITTODO}
            element={<LazyTodoFormPage />}
          />
        </Route>

        <Route
          path={PrivateRoutes.PROFILE}
          element={<LazyProfile />}
        />
      </Route>
      <Route path="*" element={<LazyPage404 />} />
    </Routes>
  )
}

