import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
export const Home = () => {
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
          <ProductCard
            id="1"
            title={"White Curtains"}
            desc={
              "This is very good curtain This is very good curtain This is very good curtain "
            }
            image={
              "https://imgs.search.brave.com/-sVdSuIQcMDR4hdVl2Y6TWs5WW4VyvCt3aotQuIlArU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xOC8wNC9j/dXJ0YWlucy0xODU0/MTEwXzY0MC5qcGc"
            }
            price={"4000"}
          />
          <ProductCard
            id="2"
            title={"Grey Curtains"}
            desc={"This is very good curtain"}
            image={
              "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn"
            }
            price={"3000"}
          />
          <ProductCard
            id="3"
            title={"White Curtains"}
            desc={
              "This is very good curtain This is very good curtain This is very good curtain "
            }
            image={
              "https://imgs.search.brave.com/-sVdSuIQcMDR4hdVl2Y6TWs5WW4VyvCt3aotQuIlArU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xOC8wNC9j/dXJ0YWlucy0xODU0/MTEwXzY0MC5qcGc"
            }
            price={"3500"}
          />
          <ProductCard
            id="4"
            title={"Grey Curtains"}
            desc={"This is very good curtain"}
            image={
              "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn"
            }
            price={"2800"}
          />
        </div>
      </div>
    </div>
  );
};
