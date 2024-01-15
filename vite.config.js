import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/frontend-mentor-age-calculator/",
  plugins: [react()],
});
