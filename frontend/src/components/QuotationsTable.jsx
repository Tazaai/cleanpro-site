import { useState } from "react";

const API_BASE = "https://us-central1-cleanpro-site.cloudfunctions.net";

export default function QuotationsTable() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchQuotations() {
    setLoading(true);
    // ❗ You don’t yet have a backend endpoint for listing quotations.
    // For now, this will just mock empty results.
    setQuotations([]);
    setLoading(false);
    alert("Quotation listing not implemented yet in backend");
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <button
          onClick={fetchQuotations}
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((q, i) => (
            <tr key={i}>
              <td className="border p-2">{q.name}</td>
              <td className="border p-2">{q.email}</td>
              <td className="border p-2">{q.details}</td>
              <td className="border p-2">{q.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
