import { useEffect, useState } from "react";
import Button from "../components/Button";
import useProducts from "../hooks/useProducts";
import useAdmin from "../hooks/useAdmin";
import LoadingScreen from "../components/LoadingScreen";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCartContext from "../hooks/useCartContext";
import useCart from "../hooks/useCart";

const Customize = () => {
  const { getProductsByCategory } = useProducts();
  const { getAllCategory } = useAdmin();
  const { addToCart } = useCart();

  const { user } = useAuthContext();
  const { updateCartItems } = useCartContext();

  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState("");
  const [wallColor, setwallColor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await getAllCategory();

    if (response.success) {
      const data = response?.data;

      data.map((c) => {
        if (c.name === "Customizable") {
          setCategory(c._id);
        }
      });
    }
  };

  const fetchProducts = async () => {
    if (category) {
      const response = await getProductsByCategory(category);

      if (response?.success) {
        const data = response?.data;
        setProducts(data);
      }
      setIsLoading(false);
    }
  };

  const onAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedProduct) {
      const products = [
        {
          product: selectedProduct._id,
          quantity: 1,
          itemTotal: selectedProduct.price,
        },
      ];

      const response = await addToCart({ id: user.id, products });

      if (response.success) {
        toast.success(response?.data.message);
        updateCartItems();
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container px-5 py-14 min-height space-y-3">
      <div className="space-y-3">
        <h1 className="text-xl font-bold">Customize Your Own</h1>
        <p className="text-sm text-gray-500">
          Welcome to Customize Your Own! Transform your space with curtains that
          perfectly complement your wall color. Here&apos;s how it works: Select
          Your Wall Color: Choose the color of your wall to get started. Pick
          Your Curtain Color: Explore a variety of curtain colors and see which
          one matches best with your wall. Preview the Perfect Match: Instantly
          see how your chosen curtain color looks against your wall. Order Your
          Custom Curtain: Love the look? Place your order for your custom
          curtain right now! Don&apos;t wait! Discover the perfect color
          combination for your home today. Try it out and create a space you
          love!
        </p>
      </div>

      <div className="flex gap-2">
        <div className="shadow flex items-center gap-2 max-w-[300px] justify-center p-2 rounded">
          <p className="text-sm">Select Wall Color:</p>
          <input
            type="color"
            className="bg-transparent"
            value={wallColor}
            onChange={(e) => setwallColor(e.target.value)}
          />
          {wallColor}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 space-y-3">
          <h1 className="font-bold">Choose Your Option</h1>
          {/* Images */}
          <ul className=" flex  gap-2  flex-wrap ">
            {products.map((p) => (
              <li
                key={p?._id}
                className={`flex p-0.5 rounded ${
                  selectedImage === p?.thumbnail
                    ? "p-0.5 border-2 rounded border-primary"
                    : "border-2 border-transparent"
                }`}
              >
                <button
                  className="size-28 rounded"
                  onClick={() => {
                    setSelectedImage(p?.thumbnail);
                    setSelectedProduct(p);
                  }}
                >
                  <img
                    className="rounded size-full max-w-full max-h-full object-cover"
                    src={p?.thumbnail}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className=" h-[600px] flex justify-center w-[70%] border rounded border-black"
          style={{
            backgroundColor: wallColor,
          }}
        >
          <img src={selectedImage} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onAddToCart} disabled={!selectedProduct}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default Customize;
