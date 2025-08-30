import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musicLibraryApp",
      filename: "remoteEntry.js",
      exposes: {
        "./musiclibrary": "./src/musiclibrary",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5001,
    cors: true,
  },
 build: {
  modulePreload: false,
  target: 'esnext',
  minify: false,
  cssCodeSplit: false
}

});
