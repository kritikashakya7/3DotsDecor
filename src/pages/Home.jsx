import React from "react";
import hero from "../assets/hero.jpg";
import ProductCard from "../components/ProductCard";
export const Home = () => {
  return (
    <div className="space-y-10">
      <div className="relative">
        <img src={hero} className="object-cover h-[calc(100vh-72px)] w-full" />
        <div className="absolute top-1/2 left-24 md:w-[680px] w-[380px] bg-black/45 p-5 rounded space-y-5 transform -translate-y-[20%]">
          <h1 className="text-4xl font-bold text-white ">Gift for your room</h1>
          <p className=" text-white">
            The right curtains are the final touch that turns a house into a
            home. Carefully chosen curtains reflect personal style, creating a
            sense of comfort and belonging. They complete the design, making the
            space feel inviting.
          </p>
          <button className="bg-primary rounded text-white py-2 px-5">
            Shop Now
          </button>
        </div>
      </div>

      <div className="flex gap-7 min-h-screen items-center justify-center flex-col">
        <h1 className="font-bold text-2xl">Our Top Products</h1>
        <div className="flex gap-7 flex-wrap items-center justify-center">
          <ProductCard
            title={"White Curtains"}
            desc={
              "This is very good curtain This is very good curtain This is very good curtain "
            }
            image={
              "https://imgs.search.brave.com/-sVdSuIQcMDR4hdVl2Y6TWs5WW4VyvCt3aotQuIlArU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xOC8wNC9j/dXJ0YWlucy0xODU0/MTEwXzY0MC5qcGc"
            }
            price={"10,000"}
          />
          <ProductCard
            title={"Grey Curtains"}
            desc={"This is very good curtain"}
            image={
              "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn"
            }
            price={"10,000"}
          />
          <ProductCard
            title={"White Curtains"}
            desc={
              "This is very good curtain This is very good curtain This is very good curtain "
            }
            image={
              "https://imgs.search.brave.com/-sVdSuIQcMDR4hdVl2Y6TWs5WW4VyvCt3aotQuIlArU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xOC8wNC9j/dXJ0YWlucy0xODU0/MTEwXzY0MC5qcGc"
            }
            price={"10,000"}
          />
          <ProductCard
            title={"Grey Curtains"}
            desc={"This is very good curtain"}
            image={
              "https://imgs.search.brave.com/GZRCMS7qq9OF5E8Mzms9BLF94z6-z51r1imOZcPFO0c/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YWNhY2hlLmhvbWVp/bXByb3ZlbWVudHBh/Z2VzLmNvbS5hdS9j/cmVhdGl2ZS9nYWxs/ZXJpZXMvMjM1MDAx/XzI0MDAwMC8yMzc1/OTYvNTU3eDQxOC80/MDU5MDAuanBn"
            }
            price={"10,000"}
          />
        </div>
      </div>
    </div>
  );
};
