import { useContext } from "react";
import { CheckoutContext } from "../context/CheckoutContext";

const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckoutContext must be used within an AuthProvider");
  }
  return context;
};

export default useCheckoutContext;
