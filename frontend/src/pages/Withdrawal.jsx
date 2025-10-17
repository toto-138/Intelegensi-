import React from "react";

export default function Withdrawal() {
  return (
    <div className="page withdrawal">
      <h2>🏦 Penarikan Dana</h2>
      <form>
        <input type="text" placeholder="Nomor Rekening / E-Wallet" />
        <input type="number" placeholder="Jumlah Penarikan" />
        <button>TARIK DANA</button>
      </form>
    </div>
  );
}
