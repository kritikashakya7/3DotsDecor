import { ListOrdered, ShoppingBasket, SwatchBook, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { dashboardCounts } = useAdmin();

  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [catgoryCount, setCatgoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const fetchCounts = async () => {
    const response = await dashboardCounts();

    if (response.success) {
      const data = response.data;

      setCustomerCount(data?.customerCount || 0);
      setOrderCount(data?.orderCount || 0);
      setCatgoryCount(data?.categoryCount || 0);
      setProductCount(data?.productCount || 0);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="space-y-8 mt-3">
      <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-5">
        <div className="shadow rounded p-5 flex gap-5">
          <div className="bg-blue-500 flex items-center p-4 rounded">
            <User className="fill-white text-white" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Customers</p>
            <h1 className="font-bold text-xl">
              {customerCount?.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="shadow rounded p-5 flex gap-5">
          <div className="bg-orange-500 flex items-center p-4 rounded">
            <ListOrdered className="fill-white text-white" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Orders</p>
            <h1 className="font-bold text-xl">
              {orderCount?.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="shadow rounded p-5 flex gap-5">
          <div className="bg-yellow-400 flex items-center p-4 rounded">
            <SwatchBook className="fill-white text-yellow-400" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Categories</p>
            <h1 className="font-bold text-xl">
              {catgoryCount?.toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="shadow rounded p-5 flex gap-5">
          <div className="bg-green-500 flex items-center p-4 rounded">
            <ShoppingBasket className=" text-white" />
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Products</p>
            <h1 className="font-bold text-xl">
              {productCount?.toLocaleString()}
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Recent Orders</h1>
          <Link to="/admin/order" className="underline text-primary">
            View All
          </Link>
        </div>

        <table className="table-auto w-full shadow">
          <thead>
            <tr>
              <th className="px-3 py-2 w-[100px]">Order ID</th>
              <th className="px-3 py-2">Customer Name</th>
              <th className="px-3 py-2">Order Date</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-x-auto">
            <tr className="text-center">
              <td className="px-3 py-4">1</td>
              <td className="px-3 py-4">Gaurang Kansakar</td>
              <td className="px-3 py-4">20 July 2024</td>
              <td className="px-3 py-4">Rs. 2,400</td>
              <td className="px-3 py-4">
                <button className="underline text-primary">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex max-lg:flex-col gap-8">
        <div className="flex-1 space-y-3">
          <h1 className="text-xl font-bold">Recent Transactions</h1>
          <div className="shadow p-5">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-3 py-2 w-[100px]">Order ID</th>
                  <th className="px-3 py-2">Customer Name</th>
                  <th className="px-3 py-2">Order Date</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto">
                <tr className="text-center">
                  <td className="px-3 py-4">1</td>
                  <td className="px-3 py-4">Gaurang Kansakar</td>
                  <td className="px-3 py-4">20 July 2024</td>
                  <td className="px-3 py-4">Rs. 2,400</td>
                  <td className="px-3 py-4">
                    <button className="underline text-primary">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
