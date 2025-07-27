import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative rounded-full w-12 h-6 flex items-center transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 rounded-full ${
          theme === "dark" ? "bg-gray-700" : "bg-purple-100"
        } transition-colors duration-300`}
      ></div>

      <div
        className={`absolute w-5 h-5 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
          theme === "dark"
            ? "translate-x-6 bg-purple-600"
            : "translate-x-1 bg-white shadow-md"
        }`}
      >
        {theme === "dark" ? (
          <HiMoon className="text-white text-xs" />
        ) : (
          <HiSun className="text-yellow-500 text-xs" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
