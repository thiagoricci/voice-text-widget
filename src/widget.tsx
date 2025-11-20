import React from "react";
import ReactDOM from "react-dom/client";
import WidgetApp from "./WidgetApp.tsx";
import "./index.css";

function injectWidget() {
  // Prevent multiple mounts
  if (document.getElementById("ai-assistant-widget-root")) return;

  // Inject CSS if needed (for production builds)
  if (import.meta.env.PROD) {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "./widget.css";
    document.head.appendChild(cssLink);
  }

  // Create container div
  const container = document.createElement("div");
  container.id = "ai-assistant-widget-root";
  document.body.appendChild(container);

  // Mount React app into it
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <WidgetApp />
    </React.StrictMode>
  );
}

// Auto-run when script loads
injectWidget();