// ~/cleanpro-site/frontend/src/components/Services.jsx
import React from "react";

export default function Services() {
  const services = [
    {
      name: "Standard Cleaning",
      img: "/services/standard.jpg",
      desc: "Basic cleaning for home or office, ensuring freshness.",
    },
    {
      name: "Deep Cleaning",
      img: "/services/deep.jpg",
      desc: "Thorough cleaning for tough dirt and hidden spots.",
    },
    {
      name: "Move In/Out Cleaning",
      img: "/services/move.jpg",
      desc: "Perfect for moving — leave your old or new place spotless.",
    },
    {
      name: "Office Cleaning",
      img: "/services/office.jpg",
      desc: "Professional cleaning for workplaces and offices.",
    },
    {
      name: "Residential Cleaning",
      img: "/services/home.jpg",
      desc: "Regular or one-time cleaning for your living space.",
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>🧹 Our Services</h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card">
            <img src={s.img} alt={s.name} />
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
