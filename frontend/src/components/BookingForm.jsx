// ~/cleanpro-site/frontend/src/components/BookingForm.jsx
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const ORIGIN = "14410 Sylvan St, Van Nuys, CA 91401"; // HQ (City Hall)

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("standard_cleaning");
  const [area, setArea] = useState(0);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [frequency, setFrequency] = useState("one_time");
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [availability, setAvailability] = useState([]);
  const [warning, setWarning] = useState("");
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // 📅 Fetch calendar availability (30 days by default)
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

  // 📍 Load Google Maps script dynamically
  useEffect(() => {
    if (!window.google?.maps?.places) {
      if (!document.querySelector("#google-maps-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initAutocomplete();
        document.head.appendChild(script);
      }
    } else {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (!addressInputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      { fields: ["formatted_address"] }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        setAddress(place.formatted_address);
        fetchDistance(place.formatted_address);
      }
    });
  };

  // �� Fetch distance via backend proxy
  const fetchDistance = async (customAddress) => {
    const dest = customAddress || address;
    if (!dest) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/maps/distance?origin=${encodeURIComponent(
          ORIGIN
        )}&destination=${encodeURIComponent(dest)}`
      );
      const data = await res.json();
      if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
        let miles = data.rows[0].elements[0].distance.value / 1609.34;
        setDistance(Number(miles.toFixed(1)));
        setWarning("");
      } else {
        setWarning("⚠️ Could not fetch distance.");
      }
    } catch (err) {
      console.error("Distance API error:", err);
      setWarning("⚠️ Error with Google Maps API.");
    }
  };

  // 🧾 Live price preview
  useEffect(() => {
    const fetchPreview = async () => {
      if (!area || !service) return;
      try {
        const res = await fetch(`${API_BASE}/api/previewBooking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || "guest",
            service,
            sqMeters: area,
            distance,
            frequency,
          }),
        });
        const data = await res.json();
        if (data.ok) setPreview(data.breakdown);
      } catch (err) {
        console.error("Preview fetch error:", err);
      }
    };
    fetchPreview();
  }, [name, service, area, distance, frequency]);

  // ✅ Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/createBooking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          sqMeters: area,
          frequency,
          date,
          timeSlot,
          address,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccessMsg(
          `✅ Thank you, ${name}! Your booking is confirmed.\n\n` +
            `Total price: $${data.breakdown.finalPrice}.\n\n` +
            `Distance: ${data.distance || distance} miles.\n\n` +
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

  // 🎨 Helpers
  const getSlotClass = (slot) =>
    slot.booked < slot.capacity
      ? "bg-green-200 hover:bg-green-300"
      : "bg-red-200 cursor-not-allowed";

  const getAvailabilityForDate = (dateObj) => {
    const isoDate = dateObj.toISOString().split("T")[0];
    return availability.find((d) => d.date === isoDate);
  };

  // ✅ Success message
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

  // ✅ Form
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-lg font-bold">Create a Booking</h2>
      {warning && <div className="text-red-600 text-sm">{warning}</div>}

      {/* ... Name, Phone, Email, Service, Area, Address, Distance, Frequency ... */}

      {/* Calendar */}
      <div>
        <label className="block text-sm font-medium">Choose Date & Time Slot</label>
        <Calendar
          locale="en-US" // 👈 Force English language
          onChange={setDate}
          value={date}
          tileClassName={({ date: d }) => {
            const isoDate = d.toISOString().split("T")[0];
            const avail = availability.find((a) => a.date === isoDate);
            if (avail?.closed) return "bg-red-100 text-gray-400"; // closed days
            if (isoDate === new Date().toISOString().split("T")[0]) {
              return "bg-yellow-100"; // highlight today
            }
            return "";
          }}
        />
        {date && (
          <div className="mt-3 flex gap-4">
            {(() => {
              const avail = getAvailabilityForDate(date);
              if (!avail) return <p className="text-sm text-gray-500">No availability data</p>;
              if (avail.closed) {
                return (
                  <p className="text-sm text-red-600 font-semibold">
                    🚫 This day is closed for bookings
                  </p>
                );
              }
              return (
                <>
                  <button
                    type="button"
                    onClick={() => avail.AM.booked < avail.AM.capacity && setTimeSlot("AM")}
                    disabled={avail.AM.booked >= avail.AM.capacity}
                    className={`px-4 py-2 rounded ${getSlotClass(avail.AM)}`}
                  >
                    ☀️ AM ({avail.AM.booked}/{avail.AM.capacity})
                  </button>
                  <button
                    type="button"
                    onClick={() => avail.PM.booked < avail.PM.capacity && setTimeSlot("PM")}
                    disabled={avail.PM.booked >= avail.PM.capacity}
                    className={`px-4 py-2 rounded ${getSlotClass(avail.PM)}`}
                  >
                    🌙 PM ({avail.PM.booked}/{avail.PM.capacity})
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* ... Preview + Submit remain unchanged ... */}
    </form>
  );
}
