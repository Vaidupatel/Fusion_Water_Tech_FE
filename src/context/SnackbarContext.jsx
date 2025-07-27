import { createContext, useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
  HiInformationCircle,
  HiX,
} from "react-icons/hi";

// Create context
const SnackbarContext = createContext();

// Custom hook for using the snackbar
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

// Snackbar component
const Snackbar = ({ message, severity, onClose }) => {
  const [progress, setProgress] = useState(0);
  const autoHideDuration = 3000;

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + autoHideDuration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = 100 - (remaining / autoHideDuration) * 100;

      if (remaining <= 0) {
        onClose();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [onClose, autoHideDuration]);

  // Icons for different severity levels
  const icons = {
    success: <HiCheckCircle className="h-5 w-5" />,
    error: <HiXCircle className="h-5 w-5" />,
    warning: <HiExclamation className="h-5 w-5" />,
    info: <HiInformationCircle className="h-5 w-5" />,
  };

  // Colors for different severity levels
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm transform transition-all duration-300 ease-in-out animate-slide-in-from-right">
      <div className={`rounded-lg shadow-lg overflow-hidden`}>
        <div className={`${colors[severity]} text-white p-3 flex items-center`}>
          <span className="mr-2">{icons[severity]}</span>
          <p className="flex-1">{message}</p>
          <button onClick={onClose} className="ml-2 focus:outline-none">
            <HiX className="h-5 w-5" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="bg-gray-300 dark:bg-gray-700 h-1 w-full">
          <div
            className={`h-full ${colors[severity]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Provider component
export const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);
  const [counter, setCounter] = useState(0);

  const showSnackbar = (message, severity = "success") => {
    const id = counter;
    setCounter((prev) => prev + 1);

    setSnackbars((prev) => [...prev, { id, message, severity }]);

    // Auto dismiss after duration
    setTimeout(() => {
      dismissSnackbar(id);
    }, 3000);
  };

  const dismissSnackbar = (id) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  // Create portal for snackbars
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div className="snackbar-container">
            {snackbars.map((snackbar) => (
              <Snackbar
                key={snackbar.id}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => dismissSnackbar(snackbar.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </SnackbarContext.Provider>
  );
};
