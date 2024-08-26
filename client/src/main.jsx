import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="931653427036-l5ar8cn7ln7g1r90944kblbkoht4gja0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  // </StrictMode>,
);
