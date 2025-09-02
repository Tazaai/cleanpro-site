import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // adjust path if needed

const db = getFirestore(app);

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const snapshot = await getDocs(collection(db, "services"));
        setServices(snapshot.docs.map((doc) => doc.data()));
      } catch (err) {
        console.error("❌ Error fetching services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="mdl-grid" style={{ marginBottom: "20px" }}>
      {services.map((s, idx) => (
        <div
          key={idx}
          className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--3-col"
          style={{
            marginBottom: "20px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {s.imageUrl && (
            <img
              src={s.imageUrl}
              alt={s.title || "Service"}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
          )}
          <div style={{ padding: "16px" }}>
            <h4>{s.title || "Untitled Service"}</h4>
            {s.description && <p>{s.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
