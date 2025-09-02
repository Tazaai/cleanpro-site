import { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

export default function QuotationForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target).entries());
    const quotation = {
      name: formData.name,
      email: formData.email,
      details: formData.details,
      status: "pending",           // ✅ always pending
      createdAt: serverTimestamp() // ✅ timestamp
    };

    try {
      await addDoc(collection(db, "quotations"), quotation);
      alert("✅ Quotation saved!");
    } catch (err) {
      console.error("Error saving quotation:", err);
      alert("❌ Failed to save quotation.");
    }

    setLoading(false);
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mdl-grid">
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
        <input
          className="mdl-textfield__input"
          type="text"
          name="name"
          required
        />
        <label className="mdl-textfield__label">Name</label>
      </div>

      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
        <input
          className="mdl-textfield__input"
          type="email"
          name="email"
          required
        />
        <label className="mdl-textfield__label">Email</label>
      </div>

      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
        <textarea
          className="mdl-textfield__input"
          name="details"
          rows="3"
          required
        ></textarea>
        <label className="mdl-textfield__label">Details</label>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <button
          type="submit"
          disabled={loading}
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        >
          {loading ? "Submitting..." : "Submit Quotation"}
        </button>
      </div>
    </form>
  );
}
