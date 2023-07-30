import { Navigate, Outlet,Route, Routes } from "react-router-dom";
import { useAuth } from "./context/authContext";

import { PrivateRoutes, PubblicRoutes } from './models/routes'
import LoginPage from "./pages/public/LoginPage";
import RegisterPage  from "./pages/public/RegisterPage";
import HomePage  from "./pages/public/HomePage";
import TasksPage  from "./pages/private/TodoPage";
import TaskFormPage from "./pages/private/TodoFormPage";
import RoutesWithNotFound  from "./utilities/RoutesWithNotFound";

export function TodoRoutes2() {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<HomePage />} />
      <Route path={PubblicRoutes.LOGIN} element={<LoginPage />} />
      <Route path={PubblicRoutes.REGISTER} element={<RegisterPage />} />
      <Route element={<AuthGuard  privateValidation={true} />} >
        <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
      </Route>
    </RoutesWithNotFound>
  )
}

function TodoRoutes() {
  return (
    <RoutesWithNotFound>
      <Route path='/' element={<TasksPage />} />
      <Route path={PrivateRoutes.NEWTODO} element={<TaskFormPage />} />
      <Route path={PrivateRoutes.EDITTODO} element={<TaskFormPage />} />
    </RoutesWithNotFound>  
  )
}

function Private(){
  return(
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.TODO} />} />
      <Route path={`${PrivateRoutes.TODO}/*`} element={<TodoRoutes />} />
      <Route path={PrivateRoutes.PROFILE} element={<h1>Profile</h1>} />
    </RoutesWithNotFound>
  )
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

function AuthGuard({ privateValidation }) {
  const { isAuthenticated, loading, user } = useAuth();
  console.log('isAuthenticated', isAuthenticated, 'loading', loading)
  if (loading) return <h1>Loading...</h1>;
  return isAuthenticated && !loading
  ? PrivateValidationFragment
  : <Navigate replace to={PubblicRoutes.LOGIN} />
};