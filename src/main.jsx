import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { CheckoutContextProvider } from "./context/CheckoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <CheckoutContextProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </CheckoutContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
