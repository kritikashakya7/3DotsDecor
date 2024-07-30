import { createContext, useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import toast from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";

export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const { user } = useAuthContext();

  const { getCartItems } = useCart();

  useEffect(() => {
    const items = localStorage.getItem("checkout");

    if (items) {
      setCheckoutItems(JSON.parse(items));
    }
  }, []);

  const addProductToCheckout = ({ id, quantity, itemTotal, title, price }) => {
    const items = [
      {
        productId: id,
        quantity,
        itemTotal,
        title,
        price,
      },
    ];

    setCheckoutItems(items);
    localStorage.setItem("checkout", JSON.stringify(items));
  };

  const addCartToCheckout = async () => {
    const response = await getCartItems(user?.id);

    if (response.success) {
      const data = response?.data;
      const cartItems = data.orderItems;
      let products = [];
      cartItems.map((item) => {
        products.push({
          itemTotal: item.itemTotal,
          price: item?.product.price,
          productId: item?.product._id,
          quantity: item?.quantity,
          title: item?.product.title,
        });
      });
      setCheckoutItems(products);
      localStorage.setItem("checkout", JSON.stringify(products));
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ checkoutItems, addProductToCheckout, addCartToCheckout }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
