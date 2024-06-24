import useCartContext from "../hooks/useCartContext";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, cartTotal, updateCartQuantity, removeFromCart } =
    useCartContext();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    if (quantity > 50) return;
    updateCartQuantity(productId, parseInt(quantity));
  };

  const handleRemove = ({ productId }) => {
    removeFromCart({ productId });
  };

  return (
    <div className="container w-full m-auto px-5 py-14 space-y-5">
      <h1 className="text-xl font-semibold">Cart</h1>

      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:max-w-[800px]">
          {cart.length > 0 && (
            <div className="max-h-[600px] overflow-y-auto">
              <ul className="space-y-3">
                {cart &&
                  cart?.map((item) => (
                    <li key={item.productId} className="w-full">
                      <div className="bg-hover p-5 rounded flex gap-5 flex-col lg:flex-row">
                        <img
                          src={item.thumbnail}
                          className="min-w-32 min-h-32 max-h-32 max-w-32 rounded object-cover self-center lg:self-start"
                        />
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-5">
                            <h1 className="text-xl font-bold">{item.name}</h1>
                            <button
                              onClick={() =>
                                handleRemove({ productId: item.productId })
                              }
                              className="text-red-500 max-w-[122px] active:scale-95 animation hover:bg-gray-950/10 rounded p-1 text-sm flex items-center gap-1"
                            >
                              <Trash2 />
                              Remove Item
                            </button>
                          </div>
                          <p className="text-lg">
                            Price:{" "}
                            <span className="text-primary font-bold">
                              Rs {item.price}
                            </span>
                          </p>

                          <div className="flex items-center gap-2">
                            <p>Quantity:</p>
                            <input
                              type="number"
                              className="max-w-[80px] text-center p-2 rounded outline-none"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.productId,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="w-full lg:max-w-[450px] rounded bg-hover flex flex-col p-5 gap-2 justify-between">
            <div className="space-y-2">
              <h1 className="font-bold text-xl">Summary</h1>
              <ul className="space-y-1">
                {cart.map((item) => (
                  <li key={item.productId} className="flex justify-between">
                    <div>
                      {item.name} - {item.quantity} x Rs{" "}
                      {item.price.toLocaleString()}
                    </div>
                    <p>
                      Rs. {Number(item.quantity * item.price).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center text-xl font-bold">
              <h1>Grand Total</h1>
              <h1 className="text-primary">Rs. {cartTotal.toLocaleString()}</h1>
            </div>
          </div>
        )}
      </div>

      {cart.length < 1 && (
        <h1 className="text-center">Oops! Your cart is empty.</h1>
      )}
    </div>
  );
};

export default Cart;
