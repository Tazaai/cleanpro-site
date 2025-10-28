import React, { useRef, useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";
import CPRegistrationForm from "./components/CPRegistrationForm";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FaFacebook, FaInstagram, FaWhatsapp, FaShareAlt, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

function AppContent() {
  const bookingRef = useRef(null);
  const mapRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCPRegistration, setShowCPRegistration] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  // ✅ Initialize map safely with better error handling
  useEffect(() => {
    const initMap = () => {
      try {
        if (window.google && window.google.maps && mapRef.current) {
          console.log("🗺️ Initializing Google Maps...");
          new window.google.maps.Map(mapRef.current, {
            center: { lat: 55.6761, lng: 12.5683 }, // Copenhagen
            zoom: 10,
          });
          console.log("✅ Google Maps initialized successfully");
        } else {
          console.error("❌ Google Maps script not loaded properly or map element not found");
          console.log("Debug info:", {
            google: !!window.google,
            googleMaps: !!window.google?.maps,
            mapElement: !!mapRef.current
          });
        }
      } catch (error) {
        console.error("❌ Error initializing Google Maps:", error);
      }
    };

    // Wait for Google Maps to be fully loaded
    const waitForGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        console.log("⏳ Waiting for Google Maps to load...");
        setTimeout(waitForGoogleMaps, 100);
      }
    };

    if (document.readyState === "complete") {
      waitForGoogleMaps();
    } else {
      window.addEventListener("load", waitForGoogleMaps);
    }

    return () => window.removeEventListener("load", waitForGoogleMaps);
  }, []);

  const scrollToBooking = () =>
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Clean Departure",
        text: "Connect with verified cleaning professionals through Clean Departure's trusted marketplace!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleAuthSwitch = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const services = [
    { key: "standard_cleaning", icon: "🏠", title: "Residential Cleaning", desc: "Keep your home spotless and fresh." },
    { key: "deep_cleaning", icon: "🧼", title: "Deep Cleaning", desc: "Thorough cleaning for every corner." },
    { key: "office_cleaning", icon: "🏢", title: "Office Cleaning", desc: "Reliable cleaning for your workplace." },
    { key: "move_cleaning", icon: "📦", title: "Move In/Out Cleaning", desc: "Stress-free cleaning when moving." },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Auth Modals */}
      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)} 
          switchToRegister={() => handleAuthSwitch()}
        />
      )}
      {showRegister && (
        <RegisterForm 
          onClose={() => setShowRegister(false)} 
          switchToLogin={() => handleAuthSwitch()}
        />
      )}
      {showAdmin && isAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
      {showCPRegistration && (
        <CPRegistrationForm onClose={() => setShowCPRegistration(false)} />
      )}

      {/* Hero */}
      <header className="relative mb-8 text-center text-white">
        {/* User Menu */}
        <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg px-3 py-2">
              <FaUser className="text-white" />
              <span className="text-white text-sm">{user?.name}</span>
              {isAdmin && (
                <button
                  onClick={() => setShowAdmin(true)}
                  className="text-yellow-300 hover:text-yellow-100"
                  title="Admin Dashboard"
                >
                  <FaCog />
                </button>
              )}
              <button
                onClick={logout}
                className="text-red-300 hover:text-red-100"
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        <img src="/cleandeparture.jpg" alt="Cleaning Services" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-black/30 px-4">
          <h1 className="text-3xl md:text-5xl font-bold">🚀 Clean Departure</h1>
          <p className="mt-2 text-lg md:text-xl">Your trusted platform for safe, verified cleaning services</p>
          <button
            onClick={scrollToBooking}
            className="mt-4 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow mr-4"
          >
            Book Now
          </button>
          <button
            onClick={() => setShowCPRegistration(true)}
            className="mt-4 px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white shadow"
          >
            Become a Provider
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center gap-6 px-4">
        <section ref={bookingRef} className="w-full max-w-5xl bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">🧹 Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {services.map((s) => (
              <div
                key={s.key}
                onClick={() => {
                  const serviceSelect = document.querySelector("select[name='service']");
                  if (serviceSelect) serviceSelect.value = s.key;
                }}
                className="cursor-pointer p-4 border rounded-lg bg-gray-50 hover:shadow-md transition"
              >
                <h4 className="font-medium text-lg">
                  {s.icon} {s.title}
                </h4>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">✨ Why Choose Clean Departure?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-gray-700">
            <li>✅ Identity-verified cleaning professionals</li>
            <li>✅ Secure escrow payment protection</li>
            <li>✅ Transparent platform with fair pricing</li>
            <li>✅ Safe coordination and dispute resolution</li>
          </ul>

          {/* Google Map */}
          <div
            ref={mapRef}
            id="map"
            style={{
              width: "100%",
              height: "400px",
              marginTop: "2rem",
              borderRadius: "10px",
            }}
          ></div>

          {/* Booking Form */}
          <div className="mt-8" id="booking-form">
            <BookingForm />
          </div>
        </section>

        {/* Contact */}
        <section className="w-full max-w-lg bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">📞 Get in Touch</h2>
          <p>
            📱 Call us:{" "}
            <a href="tel:+123456789" className="text-blue-600 hover:underline">
              +1 234 567 89
            </a>
          </p>
          <p>
            ✉️ Email:{" "}
            <a href="mailto:info@cleandeparture.com" className="text-blue-600 hover:underline">
              info@cleandeparture.com
            </a>
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" className="text-green-500">
              <FaWhatsapp className="text-3xl hover:scale-110 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="text-blue-600 text-3xl hover:scale-110 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-pink-500 text-3xl hover:scale-110 transition" />
            </a>
            <button onClick={handleShare} className="text-gray-600" title="Share">
              <FaShareAlt className="text-2xl hover:scale-110 transition" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-100 bg-gray-900 mt-6">
        <p>📞 +1 234 567 89 | ✉️ info@cleandeparture.com</p>
        <p className="mt-2">
          © {new Date().getFullYear()} Clean Departure. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
