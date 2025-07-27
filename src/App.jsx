import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const smoothScrollTo = (element) => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => smoothScrollTo(element), 100);
      }
    }
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
