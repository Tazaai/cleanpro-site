import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("🚀 Main.jsx: Starting application initialization...");

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
window.API_BASE = API_BASE; // ✅ make globally available

console.log("🔗 API_BASE configured:", API_BASE);

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

console.log("🗺️ Google Maps API Key status:", GOOGLE_MAPS_API_KEY ? "✅ Present" : "❌ Missing");

if (GOOGLE_MAPS_API_KEY) {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`;
  script.async = true;
  script.defer = true;
  script.onload = () => console.log("✅ Google Maps script loaded successfully");
  script.onerror = () => console.error("❌ Failed to load Google Maps script");
  document.head.appendChild(script);
} else {
  console.warn("⚠️ Missing VITE_GOOGLE_MAPS_API_KEY in environment. Maps functionality will be limited.");
}

console.log("🎯 Creating React root...");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

console.log("✅ React app rendered successfully!");
