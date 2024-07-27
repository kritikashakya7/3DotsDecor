import { useState } from "react";
import Button from "../../components/Button";
import { Trash } from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  return (
    <div className="space-y-5">
      <div className="p-5 rounded-md bg-secondary text-white space-y-5">
        <h1 className="text-xl font-bold">Orders</h1>

        <table className="w-full text-left table-auto">
          <tr className="border-b">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th className="max-w-20">Actions</th>
          </tr>

          <br />

          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>
                    {order?.customer.firstName} {order?.customer.lastName}
                    {order?.email}
                  </td>
                  <td>Rs. {order.orderTotal}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <Button
                      className="flex items-center gap-2"
                      // onClick={() => onDeleteOrder(order?._id)}
                      // disabled={isSubmitting}
                    >
                      <Trash />
                      Delete
                    </Button>
                  </td>
                </tr>
                <br />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
