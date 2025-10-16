import { Link } from "react-router-dom";

export default function Home() {
  const links = [
    { label: "Daftar Sekarang", url: "/register" },
    { label: "Dashboard", url: "/dashboard" },
    { label: "Deposit", url: "/deposit" },
    { label: "Withdraw", url: "/withdrawal" },
    { label: "Promo", url: "#" },
    { label: "Game Terbaru", url: "#" },
    { label: "Live Chat", url: "#" },
    { label: "Panduan Bermain", url: "#" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-8">🎰 Situs Slot Online GACOR</h1>
      <div className="space-y-4 w-full max-w-md">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.url}
            className="block bg-gradient-to-r from-pink-500 to-yellow-500 py-3 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="mt-6 text-gray-300 text-sm">© 2025 SlotMania. All rights reserved.</p>
    </div>
  );
        }
