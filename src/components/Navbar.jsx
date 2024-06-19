import React, { useState } from "react";
import Brand from "./Brand";
import { Menu, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between p-4 container m-auto w-full">
        <div className="flex gap-5 items-center">
          <Brand />
          <ul className="sm:flex gap-1 text-sm hidden">
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation">
              Shop
            </li>
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation">
              Customize
            </li>
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation">
              About Us
            </li>
          </ul>
        </div>

        <div className="sm:flex gap-5 items-center hidden ">
          <div className="flex gap-2 items-center p-2 rounded hover:bg-hover cursor-pointer animation">
            <ShoppingCart />
            <p className="text-sm">Cart (0)</p>
          </div>
          <div className="p-2 rounded hover:bg-hover cursor-pointer animation">
            <User />
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-hover cursor-pointer animation sm:hidden"
        >
          <Menu />
        </button>
      </div>
      {open && (
        <div className="sm:hidden">
          <ul className="flex flex-col">
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation text-center">
              Shop
            </li>
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation text-center">
              Customize
            </li>
            <li className="p-2 rounded hover:bg-hover cursor-pointer animation text-center">
              About Us
            </li>
            <li>
              <div className="flex gap-2 items-center p-2 rounded hover:bg-hover cursor-pointer animation text-center">
                <ShoppingCart />
                <p className="text-sm">Cart (0)</p>
              </div>
            </li>
            <li>
              <div className="p-2 rounded hover:bg-hover cursor-pointer animation flex gap-2 items-center text-center">
                <User />
                <p className="text-sm">Profile</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
