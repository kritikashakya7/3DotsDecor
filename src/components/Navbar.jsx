import { useState } from "react";
import Brand from "./Brand";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { cart } = useCartContext();

  return (
    <div className="bg-white shadow-md md-10 sticky top-0 z-50">
      <div className="flex justify-between p-4 container m-auto w-full">
        <div className="flex gap-5 items-center">
          <Link to="/">
            <Brand />
          </Link>
          <ul className="sm:flex gap-1 text-sm hidden">
            <li>
              <Link
                className="p-2 rounded hover:bg-hover cursor-pointer animation"
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className="p-2 rounded hover:bg-hover cursor-pointer animation"
                to="/customize"
              >
                Customize
              </Link>
            </li>
            <li>
              <Link
                className="p-2 rounded hover:bg-hover cursor-pointer animation"
                to="/aboutus"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="sm:flex gap-5 items-center hidden ">
          <Link
            to={"/cart"}
            className="flex gap-2 items-center p-2 rounded hover:bg-hover cursor-pointer animation"
          >
            <ShoppingCart />
            <p className="text-sm">Cart ({cart.length})</p>
          </Link>
          <Link
            to={user ? "/profile" : "/login"}
            className="p-2 rounded hover:bg-hover cursor-pointer animation"
          >
            <User />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-hover cursor-pointer animation sm:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="absolute z-40 bg-white w-full shadow-md">
          <ul>
            <li>
              <Link
                className="flex items-center justify-center p-5 rounded hover:bg-hover cursor-pointer animation text-center"
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/customize"
                className="flex items-center justify-center p-5 rounded hover:bg-hover cursor-pointer animation text-center"
              >
                Customize
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="flex items-center justify-center p-5 rounded hover:bg-hover cursor-pointer animation text-center"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex gap-2 items-center justify-center p-5 rounded hover:bg-hover cursor-pointer animation text-center"
              >
                <ShoppingCart />
                <p className="text-sm">Cart ({cart.length})</p>
              </Link>
            </li>
            <li>
              <Link
                to={user ? "/profile" : "login"}
                className="p-5 rounded hover:bg-hover cursor-pointer animation flex gap-2 items-center justify-center text-center"
              >
                <User />
                <p className="text-sm">Profile</p>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
