import { useState } from "react";

const API_BASE = "https://us-central1-cleanpro-site.cloudfunctions.net";

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchBookings() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/listBookings`);
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <button
          onClick={fetchBookings}
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">SqM</th>
            <th className="border p-2">Distance</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Discount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="border p-2">{b.name}</td>
              <td className="border p-2">{b.service}</td>
              <td className="border p-2">{b.sqMeters}</td>
              <td className="border p-2">{b.distance}</td>
              <td className="border p-2">{b.price}</td>
              <td className="border p-2">{b.discountNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
