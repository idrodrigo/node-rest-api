import { Route, Routes } from "react-router-dom";

import Profile from "../pages/private/Profile";
import TodoFormPage from "../pages/private/TodoFormPage";
import TodoPage from "../pages/private/TodoPage";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import Page404 from "../pages/public/Page404";

import { PrivateRoutes, PubblicRoutes } from "../routes/paths.js";
import AuthGuard from "./guards/AuthGuard";



export function TodoRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path={PubblicRoutes.LOGIN}
        element={<LoginPage />}
      />
      <Route
        path={PubblicRoutes.REGISTER}
        element={<RegisterPage />}
      />
      <Route element={<AuthGuard />} >
        <Route
          path={PrivateRoutes.TODO}
          element={<TodoPage />}
        >
          <Route
            path={PrivateRoutes.NEWTODO}
            element={<TodoFormPage />}
          />
          <Route
            path={PrivateRoutes.EDITTODO}
            element={<TodoFormPage />}
          />
        </Route>

        <Route
          path={PrivateRoutes.PROFILE}
          element={<Profile />}
        />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

