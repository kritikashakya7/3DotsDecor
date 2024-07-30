import {
  Blinds,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  SwatchBook,
  Users,
} from "lucide-react";
import Brand from "./Brand";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import useAuthContext from "../hooks/useAuthContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuthContext();
  return (
    <nav className="sticky left-0 top-0 bottom-0 md:w-[280px] bg-secondary h-screen p-5 text-white space-y-8 flex flex-col justify-between shadow">
      <div className="space-y-5 w-full">
        <img src="/3Dots.png" className="size-8 m-auto md:hidden" />
        <div className="max-md:hidden">
          <Brand />
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation active:scale-95 ${
                pathname === "/admin" && "text-primary bg-hover/10"
              }`}
            >
              <LayoutDashboard />
              <p className="max-md:hidden">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/order"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation active:scale-95 ${
                pathname === "/admin/order" && "text-primary bg-hover/10"
              }`}
            >
              <ListOrdered />
              <p className="max-md:hidden">Orders</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation active:scale-95 ${
                pathname === "/admin/products" && "text-primary bg-hover/10"
              }`}
            >
              <Blinds />
              <p className="max-md:hidden">Products</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation active:scale-95 ${
                pathname === "/admin/category" && "text-primary bg-hover/10"
              }`}
            >
              <SwatchBook />
              <p className="max-md:hidden">Categories</p>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/customer"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation ${
                pathname === "/admin/customer" && "text-primary bg-hover/10"
              }`}
            >
              <Users />
              <p className="max-md:hidden">Customers</p>
            </Link>
          </li>
        </ul>
      </div>

      <Button className="flex items-center justify-center" onClick={logout}>
        <LogOut className="md:hidden" />
        <p className="max-md:hidden">Logout</p>
      </Button>
    </nav>
  );
};

export default Sidebar;
