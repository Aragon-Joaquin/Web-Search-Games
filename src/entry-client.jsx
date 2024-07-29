import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GameProvider } from "./hooks/gamesContext.jsx";
import { CookiesProvider } from "react-cookie";

// !React in client inyection === csr.

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <CookiesProvider defaultSetOptions>
      <GameProvider>
        <App />
      </GameProvider>
    </CookiesProvider>
  </React.StrictMode>
);
