import { ShoppingCart } from "lucide-react";
import React from "react";

const CartIcon = () => {
  return (
    <div className="border border-primary rounded-full p-1.5 ">
      <ShoppingCart className="text-primary size-4" />
    </div>
  );
};

export default CartIcon;
