import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Dynamically load Google Maps JS (Places + Geocoding)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
if (GOOGLE_MAPS_API_KEY) {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?v=1760979623?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
} else {
  console.warn("⚠️ Missing VITE_GOOGLE_MAPS_API_KEY in environment.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);