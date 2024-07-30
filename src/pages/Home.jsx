import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
export const Home = () => {
  const { getTopProducts } = useProducts();
  const [topProducts, setTopProducts] = useState([]);

  const fetchTopProducts = async () => {
    const response = await getTopProducts(4);

    if (response.success) {
      setTopProducts(response?.data);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative flex min-h-screen items-center pt-32 lg:px-32 px-3">
        <div className="z-10 w-full">
          <div className="bg-black/45 p-5 rounded space-y-5 w-full max-w-[800px] text-center md:text-left">
            <h1 className="text-4xl font-bold text-white ">
              Gift for your room
            </h1>
            <p className=" text-white">
              The right curtains are the final touch that turns a house into a
              home. Carefully chosen curtains reflect personal style, creating a
              sense of comfort and belonging. They complete the design, making
              the space feel inviting.
            </p>
            <Link to="/shop">
              <Button className="mt-5">Shop Now</Button>
            </Link>
          </div>
        </div>
        <img
          src={hero}
          className="object-cover h-[calc(100vh-100px)] w-full absolute top-0 left-0 right-0"
        />
      </div>

      <div className="flex gap-7 min-h-[800px] items-center justify-center flex-col p-5">
        <h1 className="font-bold text-2xl text-center">Our Top Products</h1>
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
          {topProducts.map((product) => (
            <ProductCard
              key={product?.productDetails._id}
              id={product?.productDetails._id}
              title={product?.productDetails.title}
              desc={product?.productDetails.description}
              image={product?.productDetails.thumbnail}
              price={product?.productDetails.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
