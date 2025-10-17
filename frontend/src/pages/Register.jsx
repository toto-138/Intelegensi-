import React from "react";

export default function Register() {
  return (
    <div className="page register">
      <h2>📝 Daftar Akun Baru</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Nomor WhatsApp" />
        <button>DAFTAR</button>
      </form>
    </div>
  );
}
