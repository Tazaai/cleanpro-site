import { useState } from "react";
import BookingForm from "./components/BookingForm";
import QuotationForm from "./components/QuotationForm";
import Services from "./components/Services";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="mdl-grid" style={{ padding: "20px" }}>
      {/* Hero Image */}
      <header
        className="mdl-cell mdl-cell--12-col"
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src="/cleandeparture.jpg"
            alt="Cleaning Services"
            style={{
              width: "200px",
              borderRadius: "8px",
              marginRight: "20px",
            }}
          />
        </div>
        <h1 className="mdl-typography--headline">🚀 Clean Departure</h1>
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
          style={{ marginLeft: "auto" }}
        >
          {showAdmin ? "Close Admin" : "Admin"}
        </button>
      </header>

      {/* Services Section */}
      <Services />

      {/* Booking Form */}
      <div
        className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <h2 className="mdl-typography--title">Create a Booking</h2>
        <BookingForm />
      </div>

      {/* Quotation Form */}
      <div
        className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <h2 className="mdl-typography--title">Request a Quotation</h2>
        <QuotationForm />
      </div>

      {/* Slide-in Admin Panel */}
      {showAdmin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
            padding: "20px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <AdminLogin />
        </div>
      )}
    </div>
  );
}
