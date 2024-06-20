import React from "react";
import CartIcon from "./CartIcon";

const ProductCard = ({ image, title, desc, price, id }) => {
  return (
    <div className="w-[250px] h-[400px]  shadow-md flex flex-col rounded cursor-pointer hover:scale-[103%] transition-all">
      <img
        className="max-h-[265px] h-[265px] object-cover rounded-t"
        src={image}
      />
      <div className="p-2">
        <h1 className="text-lg font-bold ">{title}</h1>
        <p className="line-clamp-2 text-ellipsis text-sm min-h-[40px] ">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-bold ">Rs {price}</h1>
        <CartIcon />
      </div>
    </div>
  );
};

export default ProductCard;
