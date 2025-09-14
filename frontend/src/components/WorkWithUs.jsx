// ~/cleanpro-site/frontend/src/components/WorkWithUs.jsx
import React, { useState } from "react";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function WorkWithUs() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      await addDoc(collection(db, "workers"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending", // you can update later to 'approved' or 'hired'
      });
      setStatus("✅ Thank you, we will contact you soon!");
      setFormData({ name: "", age: "", phone: "", email: "", address: "" });
    } catch (error) {
      console.error("Error saving worker request:", error);
      setStatus("❌ Something went wrong, try again.");
    }
  };

  return (
    <section className="bg-gray-50 py-12 w-full">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Work With Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            value={formData.age}
            placeholder="Age"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <input
            name="address"
            value={formData.address}
            placeholder="Address"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </section>
  );
}
