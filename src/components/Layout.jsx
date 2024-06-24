import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-462px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
