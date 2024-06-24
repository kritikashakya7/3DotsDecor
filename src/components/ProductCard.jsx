import useCartContext from "../hooks/useCartContext";
import CartIcon from "./CartIcon";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, title, desc, price, id }) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ productId: id, name: title, thumbnail: image, price: price });
  };

  return (
    <div
      className="w-full max-w-[300px] shadow-md flex flex-col rounded cursor-pointer hover:scale-[102%] transition-all active:scale-[100%]"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        className="min-h-[280px] max-h-[280px] object-cover rounded-t"
        src={image}
      />
      <div className="p-2">
        <h1 className="text-lg font-bold ">{title}</h1>
        <p className="line-clamp-2 text-ellipsis text-sm min-h-[40px] ">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-bold ">
          Rs {Number(price).toLocaleString()}
        </h1>
        <CartIcon onAddtoCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductCard;
