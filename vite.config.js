import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

/*
server: {
    proxy: {
      "/api": {
        target: APIInfo.GAMES_ENDPOINT,
        changeOrigin: true,
        secure: false,
      },
    },
    cors: {
      origin: "*",
      methods: "GET,POST",
      preflightContinue: true,
      allowedHeaders: "*",
    },
  },

  */
