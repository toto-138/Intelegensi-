import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdrawal from "./pages/Withdrawal";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🎰 SLOT GACOR ONLINE</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdrawal">Withdrawal</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
