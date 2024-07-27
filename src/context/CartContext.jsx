import { createContext, useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import useAuthContext from "../hooks/useAuthContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0);
  const { getCartItems } = useCart();
  const { user } = useAuthContext();

  const fetchCartItems = async () => {
    const response = await getCartItems(user.id);

    if (response.success) {
      const data = response?.data;

      setCartItems(data.orderItems.length);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateCartItems = () => {
    fetchCartItems();
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
