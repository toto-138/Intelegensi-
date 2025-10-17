import React from "react";

export default function Deposit() {
  return (
    <div className="page deposit">
      <h2>💰 Deposit Dana</h2>
      <p>Pilih metode pembayaran untuk melakukan deposit:</p>
      <ul>
        <li>DANA</li>
        <li>OVO</li>
        <li>Gopay</li>
        <li>Bank Transfer</li>
      </ul>
      <button>KONFIRMASI DEPOSIT</button>
    </div>
  );
}
