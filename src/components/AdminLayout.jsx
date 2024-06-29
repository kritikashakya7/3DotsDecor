import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { format } from "date-fns";

const AdminLayout = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="sticky top-0 w-full shadow bg-white admin-container flex justify-between items-center text-xl">
          <h1 className="font-bold">Welcome, Gaurang!</h1>
          <p className="font-bold">{format(time, "hh:mm a")}</p>
        </div>
        <div className="admin-container h-[calc(100vh-68px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
