import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    // const dummy = [
    //   {
    //     productId: 1,
    //     name: "Grey Curtain",
    //     quantity: 2,
    //     price: 3000,
    //     thumbnail:
    //       "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn",
    //   },
    //   {
    //     productId: 2,
    //     name: "Blue Curtain",
    //     quantity: 1,
    //     price: 2400,
    //     thumbnail:
    //       "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn",
    //   },
    //   {
    //     productId: 3,
    //     name: "Light Blue Curtain",
    //     quantity: 4,
    //     price: 4000,
    //     thumbnail:
    //       "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn",
    //   },
    // ];

    if (storedCart && JSON.parse(storedCart).length > 0) {
      const parsedCart = JSON.parse(storedCart);

      calculateCartTotal({ cart: parsedCart });
      setCart(parsedCart);
    } else {
      // localStorage.setItem("cart", JSON.stringify(dummy));
    }
  }, []);

  useEffect(() => {
    calculateCartTotal({ cart });
  }, [cart]);

  const addToCart = ({ productId, name, thumbnail, price, quantity = 1 }) => {
    if (!productId || !name || !thumbnail || !price) return;

    const existingProduct = cart.find((item) => item.productId === productId);

    if (!existingProduct) {
      const parsedPrice = parseFloat(price);

      const newProduct = {
        productId,
        name,
        quantity,
        price: parsedPrice,
        thumbnail,
      };

      setCart((prev) => {
        const newCart = [...prev, newProduct];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });

      toast.success("Added to cart.");
    } else {
      toast.error("Already in cart.");
    }
  };

  const removeFromCart = ({ productId }) => {
    const productToRemove = cart.find((item) => item.productId === productId);

    if (productToRemove) {
      const newCart = cart.filter((item) => item.productId !== productId);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Removed from cart.");
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const calculateCartTotal = ({ cart }) => {
    const total = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setCartTotal(total);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartTotal, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
