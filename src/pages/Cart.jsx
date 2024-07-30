import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCart from "../hooks/useCart";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCartContext from "../hooks/useCartContext";
import LoadingScreen from "../components/LoadingScreen";
import Button from "../components/Button";
import useCheckoutContext from "../hooks/useCheckoutContext";

const Cart = () => {
  const { getCartItems, updateCartItem, removeCartItem } = useCart();
  const { user } = useAuthContext();
  const { updateCartItems } = useCartContext();
  const { addCartToCheckout } = useCheckoutContext();

  const navigate = useNavigate();

  const [cartItems, setcartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    if (quantity > 50) return;

    const response = await updateCartItem({
      id: user?.id,
      productId,
      quantity,
    });

    if (response.success) {
      setcartItems(response.data.cart);
    }
  };

  const handleRemove = async ({ productId }) => {
    const response = await removeCartItem({ id: user.id, productId });

    if (response.success) {
      toast.success(response?.data.message);
      getUserCartItems();
      updateCartItems();
    } else {
      toast.error(response?.message);
    }
  };

  const getUserCartItems = async () => {
    const response = await getCartItems(user?.id);

    if (response.success) {
      setcartItems(response?.data);
    }

    setIsLoading(false);
  };

  const onBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addCartToCheckout();

    navigate("/checkout");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getUserCartItems();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container w-full m-auto px-5 py-14 space-y-5">
      <h1 className="text-xl font-semibold"></h1>

      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:max-w-[800px]">
          {cartItems && (
            <div className="max-h-[600px] overflow-y-auto">
              <ul className="space-y-3">
                {cartItems.orderItems.length > 0 ? (
                  cartItems?.orderItems.map((orderItem) => (
                    <li key={orderItem?.product._id} className="w-full">
                      <div className="bg-hover p-5 rounded flex gap-5 flex-col lg:flex-row">
                        <img
                          src={orderItem?.product.thumbnail}
                          className="min-w-32 min-h-32 max-h-32 max-w-32 rounded object-cover self-center lg:self-start"
                        />
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-5">
                            <h1 className="text-xl font-bold">
                              {orderItem?.product.title}
                            </h1>
                            <button
                              onClick={() =>
                                handleRemove({
                                  productId: orderItem?.product._id,
                                })
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
                              Rs {orderItem?.product.price}
                            </span>
                          </p>

                          <div className="flex items-center gap-2">
                            <p>Quantity:</p>
                            <input
                              type="number"
                              className="max-w-[80px] text-center p-2 rounded outline-none"
                              value={orderItem?.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  orderItem?.product._id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1 className="text-center">Oops! Your cart is empty.</h1>
                )}
              </ul>
            </div>
          )}
        </div>
        {cartItems && (
          <div className="w-full lg:max-w-[450px] rounded bg-hover flex flex-col p-5 gap-2 justify-between">
            <div className="space-y-2">
              <h1 className="font-bold text-xl">Summary</h1>
              <ul className="space-y-1 flex flex-col gap-5">
                <div>
                  {cartItems?.orderItems.map((orderItem) => (
                    <li
                      key={orderItem.product?.productId}
                      className="flex justify-between"
                    >
                      <div>
                        {orderItem.product?.title} - {orderItem?.quantity} x Rs{" "}
                        {orderItem.product?.price.toLocaleString()}
                      </div>
                      <p>
                        Rs.{" "}
                        {Number(
                          orderItem?.quantity * orderItem.product?.price
                        ).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </div>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center text-xl font-bold">
                <h1>Grand Total</h1>
                <h1 className="text-primary">
                  Rs. {cartItems?.orderTotal.toLocaleString()}
                </h1>
              </div>
              <Button onClick={onBuyNow}>Buy Now</Button>
            </div>
          </div>
        )}
      </div>

      {/* {cartItems?.length > 1 && cartItems?.orderItems.length < 1 && (
        <h1 className="text-center">Oops! Your cart is empty.</h1>
      )} */}
    </div>
  );
};

export default Cart;
