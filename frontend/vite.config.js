import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ganti "Intelegensi-" sesuai nama repo GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: "/Intelegensi-/"
});
