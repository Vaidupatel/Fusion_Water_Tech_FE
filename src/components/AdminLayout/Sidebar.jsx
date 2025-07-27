import { AiFillProduct } from "react-icons/ai";
import { FaClock, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { FcDataConfiguration } from "react-icons/fc";
import { HiChevronLeft, HiChevronRight, HiLogout } from "react-icons/hi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useToken } from "../../lib/utils/auth";
import { clearLocalStorage } from "../../lib/utils/localStorage";
export default function Sidebar({ collapsed, toggleCollapse }) {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { removeToken } = useToken();

  const navItems = [
    { path: "", name: "Dashboard", icon: FaTachometerAlt },
    { path: "customers", name: "Customers", icon: FaUsers },
    { path: "due-services", name: "Due Services", icon: FaClock },
    { path: "customer-type", name: "Customer Type", icon: FcDataConfiguration },
    { path: "products", name: "Product", icon: AiFillProduct },
    // { path: "config", name: "Config", icon: FcDataConfiguration },
  ];

  const selectedIndex = navItems.findIndex((item) => pathname === item.path);

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-50"}  ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-gray-50 border-gray-200"
      } border-r flex flex-col h-screen`}
    >
      <div
        className={`flex items-center justify-between p-4 h-16 border-b   ${
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              Fusion
            </span>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className={`${collapsed ? "mx-auto" : "ml-auto"} p-1 rounded-full   ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }    focus:outline-none cursor-pointer`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <HiChevronRight
              className={`size-5 ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-white"
                  : "hover:bg-gray-100 text-black"
              }`}
            />
          ) : (
            <HiChevronLeft
              className={`size-5 ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-white"
                  : "hover:bg-gray-100 text-black"
              }`}
            />
          )}
        </button>
      </div>

      <nav className="flex flex-col justify-between flex-1 overflow-y-auto py-10">
        <ul className="space-y-2 px-2">
          {navItems.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            const bgClass = isSelected
              ? theme === "dark"
                ? "bg-purple-900/30 text-purple-400"
                : "bg-purple-100 text-purple-700"
              : theme === "dark"
              ? "hover:bg-gray-800 text-gray-300"
              : "hover:bg-gray-100 text-gray-700";

            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <div
                    className={`
                      flex items-center p-2 rounded-lg transition-colors
                      ${bgClass}
                    `}
                  >
                    <item.icon
                      className={`${collapsed ? "mx-auto" : "mr-3"} text-xl`}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-2 px-2">
          <NavLink
            onClick={() => {
              clearLocalStorage();
              removeToken();
              navigate("/admin/login");
              showSnackbar("Logout successful", "success");
              window.location.reload();
            }}
            className={() =>
              `flex items-center p-2 rounded-lg transition-colors  ${
                theme === "dark"
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700 "
              }`
            }
          >
            <HiLogout
              className={`${
                collapsed ? "mx-auto" : "mr-3"
              } text-xl text-red-600`}
            />
            {!collapsed && <span className="text-red-600">Sign out</span>}
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
