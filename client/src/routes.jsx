import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from './pages/TasksPage'

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { Route, Routes } from 'react-router-dom'


export function TodoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtecRoutes />}>
        <Route path="/todo" element={<TasksPage />} />
        <Route path="/todo/new" element={<TaskFormPage />} />
        <Route path="/todo/:id" element={<TaskFormPage />} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  )
}

function ProtecRoutes() {
  const { isAuthenticated, loading } = useAuth();
  // console.log('isAuthenticated', isAuthenticated, 'loading', loading)

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};