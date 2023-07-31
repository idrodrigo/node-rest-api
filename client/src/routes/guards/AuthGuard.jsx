import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { PubblicRoutes } from "../paths";

export function AuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  console.log('isAuthenticated', isAuthenticated, 'loading', loading)
  if (loading) return <h1>Loading...</h1>;
  return isAuthenticated && !loading
    ? <Outlet />
    : <Navigate replace to={PubblicRoutes.LOGIN} />
};
export default AuthGuard;