import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);
const ORIGIN = "Van Nuys, Los Angeles, CA"; // 🚐 Center

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({});
  const [service, setService] = useState("standard_cleaning");
  const [sqMeters, setSqMeters] = useState(0);
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [calcPrice, setCalcPrice] = useState(0);

  // 🔹 Fetch dynamic prices from Firestore
  useEffect(() => {
    async function fetchPrices() {
      const services = ["standard_cleaning", "deep_cleaning", "office_cleaning"];
      const priceData = {};
      for (const s of services) {
        const snap = await getDoc(doc(db, "services", s));
        if (snap.exists()) priceData[s] = snap.data();
      }
      setPrices(priceData);
    }
    fetchPrices();
  }, []);

  // 🔹 Google Maps API distance fetch
  async function fetchDistance(addr) {
    if (!addr) return;
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        ORIGIN
      )}&destinations=${encodeURIComponent(addr)}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_KEY
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.rows[0].elements[0].status === "OK") {
        const km = data.rows[0].elements[0].distance.value / 1000;
        setDistance(km);
      }
    } catch (err) {
      console.error("Distance API error", err);
    }
  }

  // 🔹 Live price calculation
  useEffect(() => {
    if (!prices[service]) return;
    const base = prices[service].basePrice || 0;
    const perKm = prices[service].distanceFee || 0;
    const total = sqMeters * base + distance * perKm;
    setCalcPrice(total.toFixed(2));
  }, [sqMeters, distance, service, prices]);

  // 🔹 Handle booking submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const booking = {
      name: formData.name,
      service,
      sqMeters,
      address,
      distance: Number(distance.toFixed(2)),
      price: Number(calcPrice),
      status: "pending",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "bookings"), booking);
      alert("✅ Booking saved!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("❌ Failed to save booking.");
    }

    setLoading(false);
    e.target.reset();
    setAddress("");
    setSqMeters(0);
    setDistance(0);
    setCalcPrice(0);
  }

  return (
    <form onSubmit={handleSubmit} className="mdl-grid">
      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">
        <input className="mdl-textfield__input" type="text" name="name" required />
        <label className="mdl-textfield__label">Name</label>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="mdl-textfield__input"
          required
        >
          <option value="standard_cleaning">Standard Cleaning</option>
          <option value="deep_cleaning">Deep Cleaning</option>
          <option value="office_cleaning">Office Cleaning</option>
        </select>
      </div>

      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
        <input
          className="mdl-textfield__input"
          type="number"
          name="sqMeters"
          value={sqMeters}
          onChange={(e) => setSqMeters(Number(e.target.value))}
          required
        />
        <label className="mdl-textfield__label">Square meters</label>
      </div>

      <div className="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--6-col">
        <input
          className="mdl-textfield__input"
          type="text"
          name="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            fetchDistance(e.target.value);
          }}
          required
        />
        <label className="mdl-textfield__label">Customer Address</label>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <strong>📍 Distance: {distance.toFixed(2)} km</strong>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <strong>💰 Estimated Price: ${calcPrice}</strong>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <button
          type="submit"
          disabled={loading}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </form>
  );
}
