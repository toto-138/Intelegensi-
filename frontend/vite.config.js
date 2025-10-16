import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ganti `username` dengan username GitHub kamu
// Ganti `frontend` dengan nama repo kamu
export default defineConfig({
  plugins: [react()],
  base: "/frontend/",
});
