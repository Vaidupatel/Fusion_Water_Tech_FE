import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SnackbarProvider } from "./context/SnackbarContext";
import "./index.css";
import { QueryProvider } from "./lib/providers/QueryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
