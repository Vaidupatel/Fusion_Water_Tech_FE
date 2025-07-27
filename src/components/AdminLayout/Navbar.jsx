import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ title, collapsed, toggleCollapse }) {
  const { theme } = useTheme();

  return (
    <header
      className={` ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-gray-50 border-gray-200"
      } border-b h-16 flex items-center justify-between px-4 md:px-6`}
    >
      <h1
        className={`text-xl font-semibold ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }  `}
      >
        {title}
      </h1>
      <ThemeToggle />
    </header>
  );
}
