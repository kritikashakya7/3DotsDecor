import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import LoadingScreen from "../components/LoadingScreen";
import NoResults from "../components/NoResults";
import useAdmin from "../hooks/useAdmin";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllProducts } = useAdmin();

  const fetchProducts = async () => {
    const response = await getAllProducts();

    if (response.success) {
      setProducts(response.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container m-auto w-full px-5 py-14">
      <h1 className="text-xl font-bold">Products</h1>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <div className="flex md:flex-row flex-col gap-5 items-center justify-center mb-12">
                <select className="outline-none p-2 bg-hover rounded">
                  <option>Filter</option>
                  <option value="high">Price - High to Low</option>
                  <option value="low">Price - Low to High</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 justify-items-center my-5">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    desc={product.description}
                    price={product.price}
                    image={product.thumbnail}
                  />
                ))}
              </div>
            </>
          ) : (
            <NoResults text={"Oops! There are no products to show."} />
          )}

          {products.length > 20 && (
            <div className="w-full flex justify-center mt-20">
              <Pagination page={1} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
