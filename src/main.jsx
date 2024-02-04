import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthProvider.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_ID }}>
          <App />
        </PayPalScriptProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
