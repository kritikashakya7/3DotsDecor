import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NotFound from "../components/NotFound";
import { useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import Button from "../components/Button";

const Product = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [addQuantity, setAddQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    "https://m.media-amazon.com/images/I/61nBFYivYNL._SX300_SY300_QL70_FMwebp_.jpg"
  );

  const { id } = useParams();

  const handleQuantityChange = ({ type }) => {
    if (type === "increase") {
      setAddQuantity(addQuantity + 1);
    } else {
      if (addQuantity > 1) setAddQuantity(addQuantity - 1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  // if (isLoading) return <LoadingScreen />;

  // if ((!isLoading && !productInfo) || !id || id === undefined)
  //   return <NotFound />;

  return (
    <div className="container px-5 py-14 min-height">
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Images */}
        <ul className="lg:space-y-5 flex items-center gap-2 lg:flex-col flex-wrap justify-center">
          <li
            className={`flex items-center justify-center p-0.5 rounded ${
              selectedImage ===
              "https://m.media-amazon.com/images/I/61nBFYivYNL._SX300_SY300_QL70_FMwebp_.jpg"
                ? "p-0.5 border-2 rounded border-primary"
                : "border-2 border-transparent"
            }`}
          >
            <button
              className="size-28 rounded"
              onClick={() =>
                setSelectedImage(
                  "https://m.media-amazon.com/images/I/61nBFYivYNL._SX300_SY300_QL70_FMwebp_.jpg"
                )
              }
            >
              <img
                className="rounded size-full max-w-full max-h-full object-cover"
                src="https://m.media-amazon.com/images/I/61nBFYivYNL._SX300_SY300_QL70_FMwebp_.jpg"
              />
            </button>
          </li>
          <li
            className={`flex items-center justify-center p-0.5 rounded ${
              selectedImage ===
              "https://m.media-amazon.com/images/I/61CPkHQtr5L._SY879_.jpg"
                ? "p-0.5 border-2 rounded border-primary"
                : "border-2 border-transparent"
            }`}
          >
            <button
              className="size-28 rounded"
              onClick={() =>
                setSelectedImage(
                  "https://m.media-amazon.com/images/I/61CPkHQtr5L._SY879_.jpg"
                )
              }
            >
              <img
                className="rounded size-full max-w-full max-h-full object-cover"
                src="https://m.media-amazon.com/images/I/61CPkHQtr5L._SY879_.jpg"
              />
            </button>
          </li>
          <li
            className={`flex items-center justify-center p-0.5 rounded ${
              selectedImage ===
              "https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
                ? "p-0.5 border-2 rounded border-primary"
                : "border-2 border-transparent"
            }`}
          >
            <button
              className="size-28 rounded"
              onClick={() =>
                setSelectedImage(
                  "https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
                )
              }
            >
              <img
                className="rounded size-full max-w-full max-h-full object-cover"
                src="https://m.media-amazon.com/images/I/91ysdt4QetL._SY879_.jpg"
              />
            </button>
          </li>
        </ul>

        {/* Selected Image */}
        <div className="rounded flex items-center justify-center lg:min-w-[500px] min-h-[500px] overflow-x-auto">
          <img
            className="max-h-[500px] max-w-[500px] rounded object-contain"
            src={selectedImage}
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-xl font-bold mb-5">Product Title</h1>

            <div className="flex justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-4">
                Price: <span className="text-primary">Rs 5,000</span>
              </h2>
              <p className="text-green-500">In Stock</p>
              {/* <p className="text-red-500">Out of Stock</p> */}
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

          <Button>Add to Cart</Button>

          <div className="space-y-5">
            <h1 className="text-lg font-semibold">Description</h1>
            <p className="text-sm">
              Material: Polyester, Transparency: Semi - Transparent, Product
              Quality: 150 GSM Color: Brown, Size: Window - 5 feet Package
              Contents: 2 Window Curtains Dimension of Each Curtain: Width 46
              inches X Length 60 inches (116CM X 152CM) Normal Hand Wash or
              Machine Wash
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
