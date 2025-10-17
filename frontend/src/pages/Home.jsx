import React from "react";

export default function Home() {
  return (
    <div className="page home">
      <h2>🔥 Game Slot Terpopuler</h2>
      <p>
        Nikmati berbagai permainan slot terbaik — dari Pragmatic Play, PG Soft,
        Habanero, dan lainnya! 💰
      </p>
      <div className="slots-grid">
        {[...Array(9)].map((_, i) => (
          <div className="slot-card" key={i}>
            <img src={`https://picsum.photos/200/200?random=${i}`} alt="slot" />
            <h3>Slot #{i + 1}</h3>
            <button>MAIN SEKARANG</button>
          </div>
        ))}
      </div>
    </div>
  );
}
