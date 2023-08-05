import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { PubblicRoutes } from "../paths";
import { Loader } from "../../components/ui";


export function AuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  // console.log('isAuthenticated', isAuthenticated, 'loading', loading)
  if (loading) return <Loader />;
  return isAuthenticated && !loading
    ? <Outlet />
    : <Navigate replace to={PubblicRoutes.LOGIN} />
};
export default AuthGuard;