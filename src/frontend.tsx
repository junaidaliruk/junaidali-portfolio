import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

(import.meta.hot.data.root ??= createRoot(elem)).render(app);
