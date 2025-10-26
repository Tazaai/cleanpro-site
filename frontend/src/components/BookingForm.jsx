import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast, { Toaster } from "react-hot-toast";
import PaymentModal from "./PaymentModal";
import { useAuth } from "../contexts/AuthContext";

// ✅ Correct base URL with fallback
const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

// Custom calendar styles
const calendarStyles = `
  .react-calendar {
    width: 100% !important;
    max-width: 100% !important;
    background: white !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 12px !important;
    font-family: inherit !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  .react-calendar__navigation {
    height: 44px !important;
    margin-bottom: 1em !important;
    background: #f8fafc !important;
    border-bottom: 1px solid #e5e7eb !important;
  }
  .react-calendar__navigation button {
    color: #374151 !important;
    font-weight: 600 !important;
    font-size: 16px !important;
  }
  .react-calendar__navigation button:hover {
    background-color: #e5e7eb !important;
  }
  .react-calendar__month-view__weekdays {
    text-align: center !important;
    text-transform: uppercase !important;
    font-weight: bold !important;
    font-size: 12px !important;
    color: #6b7280 !important;
    padding: 8px 0 !important;
  }
  .react-calendar__tile {
    max-width: 100% !important;
    padding: 12px 6px !important;
    background: none !important;
    text-align: center !important;
    line-height: 16px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #374151 !important;
    border: 1px solid transparent !important;
    border-radius: 6px !important;
    margin: 2px !important;
  }
  .react-calendar__tile:hover {
    background-color: #f3f4f6 !important;
    color: #1f2937 !important;
  }
  .react-calendar__tile--active {
    background: #3b82f6 !important;
    color: white !important;
    font-weight: bold !important;
  }
  .react-calendar__tile--active:hover {
    background: #2563eb !important;
  }
  .react-calendar__tile--now {
    background: #fef3c7 !important;
    color: #92400e !important;
    font-weight: bold !important;
  }
  .react-calendar__tile--now:hover {
    background: #fde68a !important;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dc2626 !important;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9ca3af !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = calendarStyles;
  document.head.appendChild(styleElement);
}

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
        if (fullAddress) {
          fetchDistance(fullAddress);
        }
        
        console.log("Selected address:", fullAddress);
      });
    };
    
    // Initialize Google Maps autocomplete
    initAutocomplete();
  }, []); // Initialize once on component mount

  // Second useEffect to reinitialize when HQs are loaded (for distance calculation)
  useEffect(() => {
    // No need to reinitialize autocomplete when HQs change
    // The autocomplete should work independently
  }, [hqs]);

  // 🌍 Distance - Updated to use coordination points API
  const fetchDistance = async (dest) => {
    if (!dest) return;
    
    setWarning(""); // Clear previous warnings
    setWaitlist(false);
    
    try {
      const response = await fetch(
        `${API_BASE}/api/distance/nearest?address=${encodeURIComponent(dest)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.ok && data.nearest) {
        const distance = data.nearest.distance.miles;
        setDistance(distance);
        setNearestHQ(data.nearest.coordinationPoint);
        
        if (!data.isServiceable) {
          setWarning(data.serviceableMessage);
          setWaitlist(true);
        } else {
          setWarning("");
          setWaitlist(false);
          toast.success(`✅ Service available from ${data.nearest.coordinationPoint.name} (${distance} miles away)`);
        }
      } else {
        throw new Error(data.error || "Unable to calculate distance");
      }
    } catch (error) {
      console.error("Distance calculation error:", error.message);
      setWarning("Unable to verify service area. Please contact us for availability.");
    }
  };

  // 💰 Price preview - Enhanced with better validation
  useEffect(() => {
    // Clear preview if essential data is missing
    if (!area || !service) {
      setPreview(null);
      return;
    }
    
    // Only fetch if we have minimum required data
    if (Number(area) > 0 && service && distance >= 0) {
      console.log('Fetching price preview with:', { area, service, distance, frequency, isFirstTime, lastCleaning });
      
      fetch(`${API_BASE}/api/bookings/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "guest",
          service,
          sqMeters: Number(area),
          distance: Number(distance) || 0,
          frequency,
          isFirstTime,
          lastCleaning,
        }),
      })
        .then((r) => r.json())
        .then((d) => {
          console.log('Price preview response:', d);
          if (d.ok && d.breakdown) {
            setPreview({ ...d.breakdown, nearestHQ });
          } else {
            console.error('Price preview failed:', d);
            setPreview(null);
          }
        })
        .catch((error) => {
          console.error('Price preview error:', error);
          setPreview(null);
        });
    }
  }, [area, service, distance, frequency, nearestHQ, isFirstTime, lastCleaning]);

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (waitlist) return toast("📋 Added to waitlist.");
    if (!date || !timeSlot)
      return toast.error("Please select both a date and time slot.");
    setSubmitting(true);
    try {
      const headers = {
        "Content-Type": "application/json"
      };
      
      // Add auth token if available
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers,
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
          totalPrice: preview?.finalPrice || 0
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setBookingId(data.bookingId || data.id);
        // Show approval workflow success message
        setSuccessMsg("📧 Booking request submitted! We'll contact you soon by phone, SMS, or email for final approval.");
        toast.success("Booking request submitted! Check your email.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.message || "Booking failed");
      }
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

            <div className="text-center bg-gray-50 p-4 rounded-lg">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          📅 Choose Date & Time
        </label>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <Calendar
            locale="en-US"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 86400000)}
            onChange={setDate}
            value={date}
            className="mx-auto border-0"
            tileClassName={({ date: tileDate, view }) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              tileDate.setHours(0, 0, 0, 0);
              
              if (tileDate.getTime() === today.getTime()) {
                return 'react-calendar__tile--today';
              }
              return '';
            }}
          />
        </div>
        {date && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium mb-2">
              Selected: {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="flex justify-center gap-4">
              {(() => {
                const avail = getAvailabilityForDate(date);
                if (!avail)
                  return <p className="text-sm text-gray-500">⚠️ No availability data</p>;
                if (avail.closed)
                  return <p className="text-sm text-red-600">🚫 Closed on this date</p>;
                return (
                  <>
                    <button
                      type="button"
                      onClick={() => avail.AM.available > 0 && setTimeSlot("AM")}
                      disabled={avail.AM.available <= 0}
                      className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                        timeSlot === 'AM' 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : getSlotClass(avail.AM)
                      }`}
                    >
                      ☀️ Morning ({avail.AM.available} slots)
                    </button>
                    <button
                      type="button"
                      onClick={() => avail.PM.available > 0 && setTimeSlot("PM")}
                      disabled={avail.PM.available <= 0}
                      className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                        timeSlot === 'PM' 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : getSlotClass(avail.PM)
                      }`}
                    >
                      🌙 Afternoon ({avail.PM.available} slots)
                    </button>
                  </>
                );
              })()
              }
            </div>
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

      {/* Price Preview Section */}
      {area && service && Number(area) > 0 && (
        <div className="mt-6">
          {preview ? (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-3">💰 Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Base rate ({area} sq ft × ${preview.baseRatePerSqFt || '0.15'}/sq ft):</span>
                  <span className="font-medium">${preview.basePrice || '0.00'}</span>
                </div>
                
                {distance > 40 && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Distance fee ({(distance - 40).toFixed(1)} miles × ${preview.pricePerMile || '1.50'}/mile):</span>
                    <span className="font-medium">${preview.distanceFee || '0.00'}</span>
                  </div>
                )}
                
                {distance <= 40 && distance > 0 && (
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
                
                {!isFirstTime && frequency !== "one_time" && preview.discount > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-green-700">
                      <span>🎁 {frequency === 'weekly' ? 'Weekly' : 'Monthly'} discount ({preview.discountPercent || 0}%):</span>
                      <span>-${preview.discount || '0.00'}</span>
                    </div>
                  </div>
                )}

                {/* Campaign Discount Display */}
                {preview.campaignDiscount > 0 && preview.campaignDiscountActive && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-red-700 bg-red-50 px-2 py-1 rounded">
                      <span>🎯 Campaign Discount ({preview.campaignDiscount}%):</span>
                      <span>-${preview.campaignDiscountAmount || '0.00'}</span>
                    </div>
                    {preview.campaignDescription && (
                      <div className="text-xs text-red-600 px-2">
                        {preview.campaignDescription}
                      </div>
                    )}
                  </div>
                )}
                
                {isFirstTime && frequency !== "one_time" && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <div className="text-amber-800 text-sm">
                      <h4 className="font-medium mb-1">💡 First-Time Customer - No Discount Today</h4>
                      <p className="text-xs mb-2">This is your first cleaning with us, so no discount applies to this booking.</p>
                      <div className="bg-green-50 border border-green-200 p-2 rounded text-green-800">
                        <p className="font-medium text-xs">🎁 Future Savings Promise:</p>
                        <p className="text-xs">
                          Starting from your 2nd booking: <strong>{preview.futureDiscountPercent || (frequency === 'weekly' ? 15 : 8)}% discount</strong> on all {frequency.replace('_', ' ')} cleanings!
                        </p>
                      </div>
                    </div>
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
                {nearestHQ && <p>• Distance: {distance} miles from {nearestHQ?.name}</p>}
                <p>• Frequency: {frequency.replace(/_/g, ' ')}</p>
                <p>• Last cleaning: {lastCleaning === 'never' ? 'First time' : lastCleaning.replace(/_/g, ' ')}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⏳ Calculating Price...</h3>
              <p className="text-yellow-700 text-sm">
                {!nearestHQ ? 'Please enter a valid address to calculate pricing' : 'Fetching price breakdown...'}
              </p>
            </div>
          )}
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
