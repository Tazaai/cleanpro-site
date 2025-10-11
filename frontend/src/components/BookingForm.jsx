import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Loader } from "@googlemaps/js-api-loader";

const API_BASE = import.meta.env.VITE_API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("standard_cleaning");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [nearestHQ, setNearestHQ] = useState(null);
  const [frequency, setFrequency] = useState("one_time");
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [availability, setAvailability] = useState([]);
  const [warning, setWarning] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [hqs, setHqs] = useState([]);
  const [waitlist, setWaitlist] = useState(false);

  // 📅 Fetch calendar availability
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/calendar?days=30`);
        const data = await res.json();
        if (data.ok && Array.isArray(data.availability)) {
          setAvailability(data.availability);
        }
      } catch (err) {
        console.error("Calendar fetch error:", err);
      }
    };
    fetchCalendar();
  }, []);

  // 📍 Fetch HQs dynamically
  useEffect(() => {
    const fetchHQs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/coordination_points`);
        const data = await res.json();
        if (data.ok) {
          setHqs(data.hqs);
        }
      } catch (err) {
        console.error("Error fetching HQs:", err);
      }
    };
    fetchHQs();
  }, []);

  // 📍 Initialize Google Autocomplete
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    loader.load().then(() => {
      const input = document.getElementById("address-input");
      if (input) {
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          types: ["address"],
          componentRestrictions: { country: "us" }, // 🇺🇸 restrict if needed
        });
        autocomplete.setFields(["formatted_address", "geometry"]);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            setAddress(place.formatted_address);
            fetchDistance(place.formatted_address);
          }
        });
      }
    });
  }, [hqs]);

  // 🌍 Distance (multi-HQ nearest check)
  const fetchDistance = async (dest) => {
    if (!dest || hqs.length === 0) return;
    try {
      let nearest = { miles: Infinity, hq: null };

      for (const HQ of hqs) {
        const res = await fetch(
          `${API_BASE}/api/maps/distance?origin=${encodeURIComponent(
            HQ.address
          )}&destination=${encodeURIComponent(dest)}`
        );
        const data = await res.json();
        if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
          let miles = data.rows[0].elements[0].distance.value / 1609.34;
          if (miles < nearest.miles) {
            nearest = { miles: Number(miles.toFixed(1)), hq: HQ };
          }
        }
      }

      if (nearest.miles === Infinity) {
        setWarning("⚠️ Could not fetch distance.");
        return;
      }

      if (nearest.miles > 150) {
        setWarning("❌ Sorry, service not available in your area yet.");
        setDistance(0);
        setNearestHQ(null);
        setWaitlist(true);
        return;
      }

      setDistance(nearest.miles);
      setNearestHQ(nearest.hq);
      setWarning("");
      setWaitlist(false);
    } catch (err) {
      console.error("Distance API error:", err);
      setWarning("⚠️ Error with Google Maps API.");
    }
  };

  // 🧾 Live price preview
  useEffect(() => {
    const fetchPreview = async () => {
      if (!area || !service || !nearestHQ) return;
      try {
        const res = await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || "guest",
            service,
            sqMeters: Number(area),
            distance,
            frequency,
          }),
        });
        const data = await res.json();
        if (data.ok) setPreview({ ...data.breakdown, nearestHQ });
      } catch (err) {
        console.error("Preview fetch error:", err);
      }
    };
    fetchPreview();
  }, [name, service, area, distance, frequency, nearestHQ]);

  // ✅ Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (waitlist) {
      alert("📋 You have been added to our waiting list. We’ll contact you when we expand!");
      return;
    }
    setSubmitting(true);
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          sqMeters: Number(area),
          frequency,
          date,
          timeSlot,
          address,
          nearestHQ: nearestHQ ? nearestHQ.name : null,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccessMsg(
          `✅ Thank you, ${name}! Your booking is confirmed.\n\n` +
            `Nearest coordination point: ${nearestHQ?.name} (${distance} miles)\n\n` +
            `Total price: $${data.breakdown.finalPrice}.\n\n` +
            `Breakdown: Base $${data.breakdown.basePrice} + Distance $${data.breakdown.distanceFee} - Discount $${data.breakdown.discount}\n\n` +
            `We will contact you shortly via SMS, call, or email.`
        );
      } else {
        setWarning(`❌ Booking failed: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setWarning("❌ Error submitting booking");
    } finally {
      setSubmitting(false);
    }
  };

  const getSlotClass = (slot) =>
    slot.available > 0
      ? "bg-green-200 hover:bg-green-300"
      : "bg-red-200 cursor-not-allowed";

  const getAvailabilityForDate = (dateObj) => {
    const isoDate = dateObj.toISOString().split("T")[0];
    return availability.find((d) => d.date === isoDate);
  };

  if (successMsg) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <h2 className="text-xl font-bold text-green-700">Booking Confirmed</h2>
        <p className="whitespace-pre-line text-gray-700">{successMsg}</p>
        <p className="text-sm text-gray-500">
          🔒 Your details are private. We never share your contact information.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-lg font-bold">Create a Booking</h2>
      {warning && <div className="text-red-600 text-sm">{warning}</div>}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="standard_cleaning">Residential Cleaning</option>
        <option value="deep_cleaning">Deep Cleaning</option>
        <option value="office_cleaning">Office Cleaning</option>
        <option value="move_cleaning">Move In/Out Cleaning</option>
      </select>

      <input
        type="number"
        placeholder="Area in sq ft"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      {/* Google Places Autocomplete */}
      <input
        id="address-input"
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="one_time">One-time</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <div>
        <label className="block text-sm font-medium">Choose Date & Time</label>
        <Calendar
          locale="en-US"
          minDate={new Date()}
          onChange={setDate}
          value={date}
        />
        {date && (
          <div className="mt-3 flex gap-4">
            {(() => {
              const avail = getAvailabilityForDate(date);
              if (!avail) return <p className="text-sm text-gray-500">No availability</p>;
              if (avail.closed) {
                return <p className="text-sm text-red-600">🚫 Closed</p>;
              }
              return (
                <>
                  <button
                    type="button"
                    onClick={() => avail.AM.available > 0 && setTimeSlot("AM")}
                    disabled={avail.AM.available <= 0}
                    className={`px-4 py-2 rounded ${getSlotClass(avail.AM)}`}
                  >
                    ☀️ AM ({avail.AM.available} left)
                  </button>
                  <button
                    type="button"
                    onClick={() => avail.PM.available > 0 && setTimeSlot("PM")}
                    disabled={avail.PM.available <= 0}
                    className={`px-4 py-2 rounded ${getSlotClass(avail.PM)}`}
                  >
                    🌙 PM ({avail.PM.available} left)
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {nearestHQ && (
        <div className="p-3 bg-gray-50 rounded text-sm">
          <p>📍 Nearest coordination point: <b>{nearestHQ.name}</b></p>
          <p>📏 Distance: {distance} miles</p>
        </div>
      )}

      {preview && (
        <div className="p-3 bg-gray-100 rounded text-sm">
          <p>🧾 Estimated Price: ${preview.finalPrice}</p>
          <p>
            Base: ${preview.basePrice} | Distance: ${preview.distanceFee} | Discount: -${preview.discount}
          </p>
          <p className="text-xs text-gray-600">
            ℹ️ Policy: up to 40 miles free, thereafter managed via admin settings.
          </p>
        </div>
      )}

      {waitlist ? (
        <button
          type="button"
          onClick={() => alert("📋 Added to waiting list!")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Join Waiting List
        </button>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit Booking"}
        </button>
      )}
    </form>
  );
}
