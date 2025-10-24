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
  const [lastCleaning, setLastCleaning] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);

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

  // 📍 Google Autocomplete - Improved implementation
  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google?.maps?.places) {
        // Retry after a short delay if Google Maps isn't loaded yet
        setTimeout(initAutocomplete, 500);
        return;
      }
      
      const input = document.getElementById("address-input");
      if (!input) return;
      
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["address"],
        componentRestrictions: { country: ["us", "ca"] }, // Restrict to US and Canada
        fields: ["formatted_address", "geometry", "place_id", "address_components"]
      });
      
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) {
          toast.error("Please select a valid address from the dropdown");
          return;
        }
        
        const fullAddress = place.formatted_address;
        setAddress(fullAddress);
        
        // Auto-fetch distance when address is selected
        if (fullAddress && hqs.length > 0) {
          fetchDistance(fullAddress);
        }
        
        console.log("Selected address:", fullAddress);
      });
    };
    
    // Initialize when HQs are loaded
    if (hqs.length > 0) {
      initAutocomplete();
    }
  }, [hqs]); // Re-run when HQs change

  // 🌍 Distance - Improved with better error handling
  const fetchDistance = async (dest) => {
    if (!dest || !hqs.length) return;
    
    setWarning(""); // Clear previous warnings
    setWaitlist(false);
    
    try {
      let nearest = { miles: Infinity, hq: null };
      
      for (const HQ of hqs.filter(hq => hq.active)) { // Only check active HQs
        try {
          const response = await fetch(
            `${API_BASE}/api/maps/distance?origin=${encodeURIComponent(
              HQ.address
            )}&destination=${encodeURIComponent(dest)}`
          );
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          if (data?.rows?.[0]?.elements?.[0]?.status === "OK") {
            const distanceData = data.rows[0].elements[0].distance;
            const miles = distanceData.value / 1609.34; // Convert meters to miles
            
            if (miles < nearest.miles) {
              nearest = { 
                miles: Number(miles.toFixed(1)), 
                hq: HQ,
                readableDistance: distanceData.text
              };
            }
          }
        } catch (error) {
          console.warn(`Distance calculation failed for HQ ${HQ.name}:`, error);
        }
      }
      
      if (nearest.miles === Infinity) {
        setWarning("⚠️ Could not calculate distance. Please check your address.");
        return;
      }
      
      if (nearest.miles > 150) {
        setWarning("❌ Service not available in your area yet. Join our waitlist!");
        setWaitlist(true);
        return;
      }
      
      setDistance(nearest.miles);
      setNearestHQ(nearest.hq);
      setWarning("");
      setWaitlist(false);
      
      // Show success feedback
      toast.success(`✅ Found nearest location: ${nearest.hq.name} (${nearest.miles} miles away)`);
      
    } catch (error) {
      console.error("Distance calculation error:", error);
      setWarning("⚠️ Unable to calculate distance. Please try again.");
    }
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
        isFirstTime,
        lastCleaning,
      }),
    })
      .then((r) => r.json())
      .then((d) => d.ok && setPreview({ ...d.breakdown, nearestHQ }))
      .catch(() => {});
  }, [name, service, area, distance, frequency, nearestHQ, isFirstTime, lastCleaning]);

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
          lastCleaning,
          isFirstTime,
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            📍 Service Address
          </label>
          <div className="relative">
            <input
              id="address-input"
              type="text"
              placeholder="Start typing your address... (e.g., 123 Main St, City, State)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoComplete="off"
            />
            {address && !nearestHQ && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
          
          {address && address.length > 5 && !nearestHQ && (
            <button
              type="button"
              onClick={() => fetchDistance(address)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              📍 Calculate distance manually
            </button>
          )}
          
          <p className="text-xs text-gray-500">
            💡 Select an address from the dropdown for automatic distance calculation
          </p>
        </div>

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="one_time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            When was your last professional cleaning?
          </label>
          <select
            value={lastCleaning}
            onChange={(e) => {
              setLastCleaning(e.target.value);
              setIsFirstTime(e.target.value === "never");
            }}
            className="w-full border p-3 rounded-lg"
          >
            <option value="never">Never (First Time)</option>
            <option value="1-3_months">1-3 months ago</option>
            <option value="3-6_months">3-6 months ago</option>
            <option value="6-12_months">6-12 months ago</option>
            <option value="over_year">Over a year ago</option>
          </select>
        </div>
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
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <h3 className="font-semibold text-blue-800 mb-3">💰 Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Base rate ({area} sq ft × ${preview.baseRatePerSqFt || '0.00'}/sq ft):</span>
              <span className="font-medium">${preview.basePrice || '0.00'}</span>
            </div>
            
            {distance > 40 && (
              <div className="flex justify-between">
                <span className="text-gray-700">Distance fee ({(distance - 40).toFixed(1)} miles × ${preview.pricePerMile || '0.00'}/mile):</span>
                <span className="font-medium">${preview.distanceFee || '0.00'}</span>
              </div>
            )}
            
            {distance <= 40 && (
              <div className="flex justify-between">
                <span className="text-green-600">🚗 Distance (FREE up to 40 miles):</span>
                <span className="font-medium text-green-600">$0.00</span>
              </div>
            )}
            
            <div className="border-t pt-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${((preview.basePrice || 0) + (preview.distanceFee || 0)).toFixed(2)}</span>
              </div>
            </div>
            
            {!isFirstTime && frequency !== "one_time" && (
              <div className="space-y-1">
                <div className="flex justify-between text-green-700">
                  <span>🎁 {frequency === 'weekly' ? 'Weekly' : 'Monthly'} discount ({preview.discountPercent || 0}%):</span>
                  <span>-${preview.discount || '0.00'}</span>
                </div>
                {isFirstTime && (
                  <p className="text-xs text-gray-500 italic">Note: Discounts start from 2nd booking</p>
                )}
              </div>
            )}
            
            {isFirstTime && frequency !== "one_time" && (
              <div className="text-amber-600 text-xs bg-amber-50 p-2 rounded">
                💡 This is your first cleaning, so no discount applies. Future bookings will include {frequency === 'weekly' ? '10-20%' : '5-10%'} discount!
              </div>
            )}
            
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-bold text-blue-800">
                <span>Total Price:</span>
                <span>${preview.finalPrice || '0.00'}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <p>📋 <strong>Service Details:</strong></p>
            <p>• Service: {service.replace(/_/g, ' ').toUpperCase()}</p>
            <p>• Area: {area} sq ft</p>
            <p>• Distance: {distance} miles from {nearestHQ?.name}</p>
            <p>• Frequency: {frequency.replace(/_/g, ' ')}</p>
            <p>• Last cleaning: {lastCleaning === 'never' ? 'First time' : lastCleaning.replace(/_/g, ' ')}</p>
          </div>
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
