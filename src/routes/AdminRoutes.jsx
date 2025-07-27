import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../lib/utils/auth.js";

export default function AdminRoutes() {
  const { hasToken } = useToken();
  return hasToken() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
