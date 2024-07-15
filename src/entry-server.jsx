import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";

//! REACT SSR INJECTION

export function render() {
  const html = renderToString(
    <CookiesProvider defaultSetOptions>
      <App />
    </CookiesProvider>
  );
  return { html };
}
