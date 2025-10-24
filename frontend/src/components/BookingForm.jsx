import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast, { Toaster } from "react-hot-toast";
import PaymentModal from "./PaymentModal";

// ✅ Correct base URL
const API_BASE = import.meta.env.VITE_API_BASE;

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
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  // 🗓 Load availability
  useEffect(() => {
    fetch(`${API_BASE}/api/calendar?days=30`)
      .then((r) => r.json())
      .then((d) => d.ok && setAvailability(d.availability || []))
      .catch(() => {});
  }, []);

  // 🏢 Load HQs
  useEffect(() => {
    fetch(`${API_BASE}/api/coordination_points`)
      .then((r) => r.json())
      .then((d) => d.ok && setHqs(d.hqs))
      .catch(() => {});
  }, []);

  // 📍 Google Autocomplete
  useEffect(() => {
    if (!window.google?.maps?.places) return;
    const input = document.getElementById("address-input");
    if (!input) return;
    const ac = new window.google.maps.places.Autocomplete(input, {
      types: ["address"],
    });
    ac.addListener("place_changed", () => {
      const p = ac.getPlace();
      if (p.formatted_address) {
        setAddress(p.formatted_address);
        fetchDistance(p.formatted_address);
      }
    });
  }, [hqs]);

  // 🌍 Distance
  const fetchDistance = async (dest) => {
    if (!dest || !hqs.length) return;
    let nearest = { miles: Infinity, hq: null };
    for (const HQ of hqs) {
      const r = await fetch(
        `${API_BASE}/api/maps/distance?origin=${encodeURIComponent(
          HQ.address
        )}&destination=${encodeURIComponent(dest)}`
      );
      const d = await r.json();
      if (d?.rows?.[0]?.elements?.[0]?.status === "OK") {
        const miles = d.rows[0].elements[0].distance.value / 1609.34;
        if (miles < nearest.miles)
          nearest = { miles: Number(miles.toFixed(1)), hq: HQ };
      }
    }
    if (nearest.miles === Infinity)
      return setWarning("⚠️ Could not fetch distance.");
    if (nearest.miles > 150) {
      setWarning("❌ Service not available in your area yet.");
      setWaitlist(true);
      return;
    }
    setDistance(nearest.miles);
    setNearestHQ(nearest.hq);
    setWarning("");
    setWaitlist(false);
  };

  // 💰 Price preview
  useEffect(() => {
    if (!area || !service || !nearestHQ) return;
    fetch(`${API_BASE}/api/bookings/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || "guest",
        service,
        sqMeters: Number(area),
        distance,
        frequency,
      }),
    })
      .then((r) => r.json())
      .then((d) => d.ok && setPreview({ ...d.breakdown, nearestHQ }))
      .catch(() => {});
  }, [name, service, area, distance, frequency, nearestHQ]);

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (waitlist) return toast("📋 Added to waitlist.");
    if (!date || !timeSlot)
      return toast.error("Please select both a date and time slot.");
    setSubmitting(true);
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
          date: date.toISOString().split("T")[0],
          timeSlot,
          address,
          nearestHQ: nearestHQ?.name || "",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setBookingId(data.bookingId || data.id);
        // Show payment modal instead of immediate success
        if (preview?.finalPrice > 0) {
          setShowPayment(true);
        } else {
          setSuccessMsg("✅ Booking confirmed!");
          toast.success("Booking confirmed!");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else toast.error(data.message || "Booking failed");
    } catch {
      toast.error("Network error submitting booking.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSuccessMsg("✅ Booking confirmed and payment completed!");
    toast.success("Booking confirmed and payment completed!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSlotClass = (slot) =>
    slot.available > 0
      ? "bg-green-200 hover:bg-green-300"
      : "bg-red-200 cursor-not-allowed";

  const getAvailabilityForDate = (dateObj) => {
    const iso = dateObj.toISOString().split("T")[0];
    return availability.find((d) => d.date === iso);
  };

  if (successMsg)
    return (
      <div className="p-6 bg-white rounded-xl shadow-md text-center space-y-4">
        <Toaster position="top-center" />
        <h2 className="text-xl font-bold text-green-700">{successMsg}</h2>
        <p className="text-sm text-gray-500">
          🔒 We never share your contact info.
        </p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto border border-gray-100"
    >
      <Toaster position="top-center" />
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={preview?.finalPrice || 0}
        bookingData={{
          id: bookingId,
          name,
          email,
          service,
          address
        }}
        onSuccess={handlePaymentSuccess}
      />
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create Your Booking
      </h2>

      {warning && (
        <div className="text-red-600 text-sm text-center">{warning}</div>
      )}

      <div className="grid grid-cols-1 gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full border p-3 rounded-lg"
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
          className="w-full border p-3 rounded-lg"
        />

        <input
          id="address-input"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="one_time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="text-center">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Choose Date & Time
        </label>
        <Calendar
          locale="en-US"
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 86400000)}
          onChange={setDate}
          value={date}
          className="mx-auto"
        />
        {date && (
          <div className="mt-3 flex justify-center gap-4">
            {(() => {
              const avail = getAvailabilityForDate(date);
              if (!avail)
                return <p className="text-sm text-gray-500">No availability</p>;
              if (avail.closed)
                return <p className="text-sm text-red-600">🚫 Closed</p>;
              return (
                <>
                  <button
                    type="button"
                    onClick={() => avail.AM.available > 0 && setTimeSlot("AM")}
                    disabled={avail.AM.available <= 0}
                    className={`px-4 py-2 rounded-lg font-medium ${getSlotClass(
                      avail.AM
                    )}`}
                  >
                    ☀️ AM ({avail.AM.available})
                  </button>
                  <button
                    type="button"
                    onClick={() => avail.PM.available > 0 && setTimeSlot("PM")}
                    disabled={avail.PM.available <= 0}
                    className={`px-4 py-2 rounded-lg font-medium ${getSlotClass(
                      avail.PM
                    )}`}
                  >
                    🌙 PM ({avail.PM.available})
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {nearestHQ && (
        <div className="p-3 bg-gray-50 rounded text-sm text-center">
          <p>
            📍 Nearest HQ: <b>{nearestHQ.name}</b>
          </p>
          <p>🚗 Distance: {distance} miles</p>
        </div>
      )}

      {preview && (
        <div className="p-3 bg-gray-100 rounded text-sm text-center">
          <p>🧾 Estimated Price: ${preview.finalPrice}</p>
          <p>
            Base: ${preview.basePrice} | Distance: ${preview.distanceFee} |
            Discount: -${preview.discount}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            ℹ️ Up to 40 miles free. Extra handled by admin.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {submitting ? "Submitting..." : preview?.finalPrice > 0 ? "Book & Pay Now" : "Submit Booking"}
      </button>

      {preview && (
        <p className="text-center text-gray-700 text-sm">
          💰 Estimated total: <b>${preview.finalPrice}</b>
        </p>
      )}
      <p className="text-center text-xs text-gray-500 mt-1">
        {preview?.finalPrice > 0 ? "💳 Secure payment powered by Stripe" : "💬 Free quote — no payment required now."}
      </p>
    </form>
  );
}

// load script (in your HTML) or dynamically load with your frontend toolchain
// <script src="https://maps.googleapis.com/maps/api/js?key=VITE_GOOGLE_MAPS_API_KEY&libraries=places&callback=initAutocomplete" async defer></script>

function initAutocomplete() {
  const input = document.getElementById("address");
  if (!input || !window.google) return;
  const ac = new google.maps.places.Autocomplete(input, { types: ["geocode"] });
  ac.setFields(["address_components", "formatted_address", "geometry"]);
  ac.addListener("place_changed", () => {
    const place = ac.getPlace();
    if (!place || !place.address_components) return;
    input.value = place.formatted_address || input.value;
    // optional: parse components and set separate fields (city, postal, etc.)
    // e.g. document.getElementById('city').value = getComponent(place, 'locality');
  });
}
