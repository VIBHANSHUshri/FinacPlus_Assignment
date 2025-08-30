import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mainApp",
      remotes: {
        musicLibraryApp: "https://finac-plus-assignment-pi.vercel.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5000,
    cors: true,
  },
});
