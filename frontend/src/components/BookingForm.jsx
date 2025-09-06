import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [prices, setPrices] = useState({});
  const [form, setForm] = useState({
    name: "",
    service: "standard_cleaning",
    sqMeters: "",
    address: "",
    distance: "",
    frequency: "one-time",
    lastCleaningDate: "",
  });
  const [calc, setCalc] = useState({
    basePrice: 0,
    distanceFee: 0,
    discount: 0,
    total: 0,
    transportDiscount: false,
  });

  // 🔹 Fetch merged docs from Firestore
  useEffect(() => {
    async function fetchPrices() {
      const services = ["standard_cleaning", "deep_cleaning", "office_cleaning"];
      const data = {};
      for (const s of services) {
        const snap = await getDoc(doc(db, "services", s));
        if (snap.exists()) data[s] = snap.data();
      }
      setPrices(data);
    }
    fetchPrices();
  }, []);

  // 🔹 Live calculation
  useEffect(() => {
    if (!form.sqMeters || !prices[form.service]) return;

    const { basePrice, distanceFee, weeklyDiscount, monthlyDiscount } =
      prices[form.service];

    let total =
      form.sqMeters * basePrice + (Number(form.distance) || 0) * distanceFee;
    let discount = 0;

    if (form.frequency === "weekly") discount = weeklyDiscount || 0;
    if (form.frequency === "monthly") discount = monthlyDiscount || 0;

    total = total - total * discount;

    const transportDiscount = (Number(form.distance) || 0) < 40;

    setCalc({
      basePrice,
      distanceFee,
      discount: discount * 100,
      total: total.toFixed(2),
      transportDiscount,
    });
  }, [form, prices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/createBooking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setStatus({ success: true, data });
      setForm({
        name: "",
        service: "standard_cleaning",
        sqMeters: "",
        address: "",
        distance: "",
        frequency: "one-time",
        lastCleaningDate: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: "Failed to create booking." });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mdl-grid">
      <h3 className="mdl-cell mdl-cell--12-col">Create a Booking</h3>

      {/* Name */}
      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
        <input
          className="mdl-textfield__input"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label className="mdl-textfield__label">Name</label>
      </div>

      {/* Service */}
      <div className="mdl-cell mdl-cell--12-col">
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="mdl-textfield__input"
          required
        >
          <option value="standard_cleaning">
            {prices.standard_cleaning?.title || "Standard Cleaning"}
          </option>
          <option value="deep_cleaning">
            {prices.deep_cleaning?.title || "Deep Cleaning"}
          </option>
          <option value="office_cleaning">
            {prices.office_cleaning?.title || "Office Cleaning"}
          </option>
        </select>
      </div>

      {/* SqM */}
      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
        <input
          className="mdl-textfield__input"
          type="number"
          name="sqMeters"
          value={form.sqMeters}
          onChange={handleChange}
          required
        />
        <label className="mdl-textfield__label">Square meters</label>
      </div>

      {/* Distance */}
      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
        <input
          className="mdl-textfield__input"
          type="number"
          name="distance"
          value={form.distance}
          onChange={handleChange}
        />
        <label className="mdl-textfield__label">Distance (miles)</label>
      </div>

      {/* Frequency */}
      <div className="mdl-cell mdl-cell--6-col">
        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="mdl-textfield__input"
        >
          <option value="one-time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Last Cleaning Date */}
      <div className="mdl-cell mdl-cell--6-col">
        <input
          className="mdl-textfield__input"
          type="date"
          name="lastCleaningDate"
          value={form.lastCleaningDate}
          onChange={handleChange}
        />
        <label className="mdl-textfield__label">Date of Last Cleaning</label>
      </div>

      {/* Booking Summary */}
      {form.sqMeters && prices[form.service] && (
        <div className="mdl-cell mdl-cell--12-col">
          <h5>Booking Summary</h5>
          <p>🧹 Service: {prices[form.service]?.title}</p>
          <p>📐 Area: {form.sqMeters} m²</p>
          <p>🚚 Distance: {form.distance || 0} miles</p>
          {calc.transportDiscount && (
            <p style={{ color: "green" }}>🚐 Free transport discount applied!</p>
          )}
          <p>💵 Price per m²: ${calc.basePrice}</p>
          <p>🚚 Price per mile: ${calc.distanceFee}</p>
          <p>📊 Discount: {calc.discount}%</p>
          <p>
            <strong>💰 Total Price: ${calc.total}</strong>
          </p>
          <p>🗓️ Last Cleaning: {form.lastCleaningDate || "Not provided"}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mdl-cell mdl-cell--12-col">
        <button
          type="submit"
          disabled={loading}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </div>

      {/* Status messages */}
      {status?.success && (
        <p style={{ color: "green" }}>
          ✅ Thanks for your booking! We’ll contact you by phone or email for
          confirmation. (Booking ID: {status.data.id})
        </p>
      )}
      {status?.success === false && (
        <p style={{ color: "red" }}>❌ {status.message}</p>
      )}
    </form>
  );
}
