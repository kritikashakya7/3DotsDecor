import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NotFound from "../components/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, Star } from "lucide-react";
import Button from "../components/Button";
import useAdmin from "../hooks/useAdmin";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart";
import useCartContext from "../hooks/useCartContext";
import useCheckoutContext from "../hooks/useCheckoutContext";
import useReview from "../hooks/useReview";
import ReactStars from "react-rating-stars-component";
import { format } from "date-fns";

const Product = () => {
  const { user } = useAuthContext();
  const { addToCart } = useCart();
  const { updateCartItems } = useCartContext();
  const { addProductToCheckout } = useCheckoutContext();

  const navigate = useNavigate();
  const { getProductById } = useAdmin();
  const { getReviewsById, addReview } = useReview();
  const [productInfo, setProductInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [reviewMessage, setReviewMessage] = useState("");

  const [reviewStars, setReviewStars] = useState(0);

  const [addQuantity, setAddQuantity] = useState(1);

  const { id } = useParams();

  const fetchProductInfo = async () => {
    const response = await getProductById(id);

    if (response.success) {
      setProductInfo(response.data);
    }

    setIsLoading(false);
  };

  const fetchReviews = async () => {
    const response = await getReviewsById(id);

    if (response.success) {
      const data = response?.data;
      setReviews(data);
    }
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

  const review = async () => {
    const response = await addReview({
      id: user?.id,
      productId: id,
      message: reviewMessage,
      stars: reviewStars,
    });

    if (response.success) {
      const data = response?.data;
      toast.success(data.message);
      setReviewStars(0);
      setReviewMessage("");

      fetchReviews();
    } else {
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    fetchProductInfo();
    fetchReviews();
  }, [id]);

  if (isLoading) return <LoadingScreen />;

  if ((!isLoading && !productInfo) || !id || id === undefined)
    return <NotFound />;

  return (
    <div className="container px-5 py-14 min-height">
      <div className="flex gap-8 flex-col">
        <div className="flex flex-col md:flex-row">
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

        <div className="w-full space-y-3">
          <h1 className="font-bold text-xl">
            Got this product? Drop a review.
          </h1>
          <ReactStars
            count={5}
            onChange={(e) => setReviewStars(e)}
            size={24}
            activeColor="#faca15"
          />

          <textarea
            placeholder="Enter a review"
            className="w-full border rounded p-3 "
            rows={5}
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
          ></textarea>

          <Button onClick={review}>Post</Button>
        </div>

        <div className="space-y-3">
          <h1 className="text-xl font-bold">Reviews</h1>
          <hr />
          {reviews?.map((review) => (
            <div key={review?._id} className="p-5 border rounded-md">
              <div>
                <strong>
                  {review?.user.firstName} {review?.user.lastName}
                </strong>
                <p className="text-gray-600 text-sm">
                  {format(new Date(review?.createdAt), "d MMM yyyy, hh:mm a")}
                </p>
              </div>
              <div className="flex my-2 text-sm items-center">
                {new Array(5).fill().map((_, key) => (
                  <>
                    <Star
                      key={key}
                      className={`text-[#faca15] ${
                        review?.stars > key ? "fill-[#faca15]" : ""
                      }`}
                    />
                  </>
                ))}
                <p className="ml-3">{review?.stars} out of 5</p>
              </div>
              <p className="mt-5">{review?.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
