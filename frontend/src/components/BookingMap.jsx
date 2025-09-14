// ~/cleanpro-site/frontend/src/components/BookingForm.jsx
import React, { useState } from "react";
import BookingSummary from "./BookingSummary";
import BookingMap from "./BookingMap";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ORIGIN = "Van Nuys, CA"; // HQ / starting point

export default function BookingForm() {
  const [name, setName] = useState("");
  const [service, setService] = useState("standard_cleaning");
  const [area, setArea] = useState(0);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [frequency, setFrequency] = useState("one_time");
  const [lastCleaningDate, setLastCleaningDate] = useState("");
  const [warning, setWarning] = useState("");

  // --- Pricing model ---
  const servicePricing = {
    standard_cleaning: { pricePerM2: 2.0, pricePerMile: 2.5 },
    deep_cleaning: { pricePerM2: 3.0, pricePerMile: 2.5 },
    office_cleaning: { pricePerM2: 2.5, pricePerMile: 2.0 },
  };

  const { pricePerM2, pricePerMile } = servicePricing[service] || {};

  // --- Frequency discount mapping ---
  const frequencyDiscountRate = {
    one_time: 0,
    weekly: 0.1,
    monthly: 0.08,
  }[frequency];

  // 📍 Fetch distance from Google Maps
  const fetchDistance = async () => {
    if (!address) return;

    if (!GOOGLE_MAPS_API_KEY) {
      setWarning("⚠️ Missing Google Maps API key, using manual distance.");
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      ORIGIN
    )}&destinations=${encodeURIComponent(address)}&units=imperial&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
        const miles = data.rows[0].elements[0].distance.value / 1609.34;
        setDistance(miles.toFixed(1));
        setWarning("");
      } else {
        setWarning("⚠️ Could not fetch distance. Enter manually.");
      }
    } catch (err) {
      console.error("Distance API error:", err);
      setWarning("⚠️ Error with Google Maps API. Enter distance manually.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted! (backend integration goes here)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-lg font-bold">Create a Booking</h2>

      {warning && <div className="text-red-600 text-sm">{warning}</div>}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      {/* Service */}
      <div>
        <label className="block text-sm font-medium">Service</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="standard_cleaning">Residential Cleaning</option>
          <option value="deep_cleaning">Deep Cleaning</option>
          <option value="office_cleaning">Office Cleaning</option>
        </select>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium">Area (m²)</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium">Customer Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={fetchDistance}
          className="mt-1 w-full border rounded p-2"
          required
        />
        <p className="text-xs text-gray-500">
          Distance is calculated from Van Nuys city center.
        </p>
      </div>

      {/* Distance (fallback / manual override) */}
      <div>
        <label className="block text-sm font-medium">Distance (miles)</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="one_time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Last Cleaning Date */}
      <div>
        <label className="block text-sm font-medium">
          Date of Last Professional Cleaning (optional)
        </label>
        <input
          type="date"
          value={lastCleaningDate}
          onChange={(e) => setLastCleaningDate(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
        <p className="text-xs text-gray-500">
          If cleaned within last 14 days, you’ll get an extra 5% discount.
        </p>
      </div>

      {/* Booking Summary */}
      <BookingSummary
        area={area}
        distance={distance}
        pricePerM2={pricePerM2}
        pricePerMile={pricePerMile}
        frequencyDiscountRate={frequencyDiscountRate}
        lastCleaningDate={lastCleaningDate}
        serviceType={service}
      />

      {/* Booking Map */}
      <BookingMap address={address} />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Submit Booking
      </button>
    </form>
  );
}
