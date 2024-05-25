import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>This is Nav</nav>
      <div>
        <Outlet />
      </div>
      <footer>This is Foot</footer>
    </>
  );
};

export default Layout;
