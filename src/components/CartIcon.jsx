import { ShoppingCart } from "lucide-react";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CartIcon = ({ onAddtoCart }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <button
      onClick={user ? onAddtoCart : () => navigate("/login")}
      className="border border-primary rounded-full p-1.5 hover:bg-primary hover:text-white text-primary animation"
    >
      <ShoppingCart className="size-4" />
    </button>
  );
};

export default CartIcon;
