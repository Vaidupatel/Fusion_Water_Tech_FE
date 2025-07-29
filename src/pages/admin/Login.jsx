import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useAdminLogin } from "../../lib/hooks/admin/adminLogin.js";
import { useToken } from "../../lib/utils/auth.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const { mutate, isPending } = useAdminLogin();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setToken } = useToken();

  const isDark = theme === "dark";

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        setToken(data?.data?.token);
        showSnackbar(data?.data?.message || "Login successful", "success");
        navigate("/admin");
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Login failed",
          "error"
        );
      },
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={onSubmit}
        className={`p-6 rounded-lg shadow-md w-full max-w-md ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={`w-full p-3 rounded border outline-none transition ${
              isDark
                ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-2 focus:ring-indigo-500"
            }`}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            className={`w-full p-3 rounded border outline-none transition ${
              isDark
                ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-2 focus:ring-indigo-500"
                : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-2 focus:ring-indigo-500"
            }`}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded font-medium transition ${
              isDark
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <span className="flex flex-row items-center justify-center gap-8">
                <p>Logging in…</p>
                <CircularProgress color="inherit" size={25} />
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
