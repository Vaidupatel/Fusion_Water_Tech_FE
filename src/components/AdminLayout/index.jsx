import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { ProtectedRoute } from "./ProtectedRoutes.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const { theme } = useTheme();
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <ProtectedRoute redirectPath="/admin/login">
      <div
        className={`flex h-screen  ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        } `}
      >
        <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <Navbar
            title="Admin Panel"
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
          />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
