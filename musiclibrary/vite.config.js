import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musicLibraryApp",
      filename: "remoteEntry.js", // this will be generated
      exposes: {
        "./musiclibrary": "./src/MusicLibrary.jsx", // adjust path
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5001,
  },
build: {
  modulePreload: false,
  target: 'esnext',
  minify: false,
  cssCodeSplit: false
},

});
