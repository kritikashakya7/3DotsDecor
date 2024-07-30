import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NotFound from "../components/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import Button from "../components/Button";
import useAdmin from "../hooks/useAdmin";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart";
import useCartContext from "../hooks/useCartContext";
import useCheckoutContext from "../hooks/useCheckoutContext";

const Product = () => {
  const { user } = useAuthContext();
  const { addToCart } = useCart();
  const { updateCartItems } = useCartContext();
  const { addProductToCheckout } = useCheckoutContext();

  const navigate = useNavigate();
  const { getProductById } = useAdmin();
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [addQuantity, setAddQuantity] = useState(1);

  const { id } = useParams();

  const fetchProductInfo = async () => {
    const response = await getProductById(id);

    if (response.success) {
      setProductInfo(response.data);
    }

    setIsLoading(false);
  };

  const handleQuantityChange = ({ type }) => {
    if (type === "increase") {
      setAddQuantity(addQuantity + 1);
    } else {
      if (addQuantity > 1) setAddQuantity(addQuantity - 1);
    }
  };

  const onAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const products = [
      {
        product: productInfo._id,
        quantity: addQuantity,
        itemTotal: productInfo.price * addQuantity,
      },
    ];

    const response = await addToCart({ id: user.id, products });

    if (response.success) {
      toast.success(response?.data.message);
      updateCartItems();
    } else {
      toast.error(response.message);
    }
  };

  const onBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addProductToCheckout({
      id: id,
      quantity: addQuantity,
      itemTotal: productInfo.price * addQuantity,
      title: productInfo.title,
      price: productInfo.price,
    });

    navigate("/checkout");
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  if (isLoading) return <LoadingScreen />;

  if ((!isLoading && !productInfo) || !id || id === undefined)
    return <NotFound />;

  return (
    <div className="container px-5 py-14 min-height">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="rounded flex items-center justify-center lg:min-w-[500px] min-h-[500px] overflow-x-auto">
          <img
            className="size-96 aspect-square rounded-md"
            src={productInfo.thumbnail}
          />
        </div>
        {/* Product Information */}
        <div className="flex flex-1 flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-xl font-bold mb-5">{productInfo.title}</h1>

            <div className="flex justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-4">
                Price:{" "}
                <span className="text-primary">
                  Rs {Number(productInfo.price).toLocaleString()}
                </span>
              </h2>
              {Number(productInfo.stock) > 0 ? (
                <p className="text-green-500">In Stock</p>
              ) : (
                <p className="text-red-500">Out of Stock</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Quantity:</h2>
              <div className="flex items-center">
                <Button
                  onClick={() => handleQuantityChange({ type: "decrease" })}
                  className="p-0.5"
                >
                  <Minus />
                </Button>
                <h1 className="min-w-[40px] text-center">{addQuantity}</h1>
                <Button
                  onClick={() => handleQuantityChange({ type: "increase" })}
                  className="p-0.5"
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center gap-4">
            <Button className="flex-1" onClick={onAddToCart}>
              Add to Cart
            </Button>
            <Button className="flex-1" onClick={onBuyNow}>
              Buy Now
            </Button>
          </div>

          <div className="space-y-5">
            <h1 className="text-lg font-semibold">Description</h1>
            <p className="text-sm">{productInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
