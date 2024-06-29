import {
  Blinds,
  LayoutDashboard,
  ListOrdered,
  SwatchBook,
  Users,
} from "lucide-react";
import Brand from "./Brand";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="sticky left-0 top-0 w-[280px] bg-secondary h-screen p-5 text-white space-y-8 flex flex-col justify-between">
      <div className="space-y-5 w-full">
        <Brand />
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-2 py-3 text-lg hover:bg-hover/10 hover:text-primary w-full rounded animation active:scale-95 ${
                pathname === "/admin" && "text-primary bg-hover/10"
              }`}
            >
              <LayoutDashboard />
              Dashboard
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
              Orders
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
              Products
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
              Categories
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
              Customers
            </Link>
          </li>
        </ul>
      </div>

      <Button>Logout</Button>
    </nav>
  );
};

export default Sidebar;
