import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
window.API_BASE = API_BASE; // ✅ make globally available

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
if (MAPS_KEY) {
  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
} else {
  console.warn("⚠️ Missing VITE_GOOGLE_MAPS_API_KEY in environment.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
