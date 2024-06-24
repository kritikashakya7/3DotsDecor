import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within an AuthProvider");
  }
  return context;
};

export default useCartContext;
