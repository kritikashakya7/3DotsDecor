import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { format } from "date-fns";

const Order = () => {
  const { getAllOrders } = useAdmin();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await getAllOrders();

    if (response.success) {
      setOrders(response?.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-md bg-secondary text-white space-y-5">
        <h1 className="text-xl font-bold">Orders</h1>

        <table className="w-full text-left table-fixed">
          <tr className="border-b">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>

          <br />

          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>
                    {order.customer ? (
                      <>
                        {order?.customer?.firstName} {order?.customer?.lastName}
                      </>
                    ) : (
                      <>N/A</>
                    )}
                    {order?.email}
                  </td>
                  <td>
                    {order.products.map((item) => (
                      <div key={item._id}>
                        {item.productId ? (
                          <p>
                            {item?.productId?.title} x {item?.quantity}
                          </p>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    ))}
                  </td>
                  <td>Rs. {order.orderTotal}</td>
                  <td>{order.status}</td>
                  <td>{format(order.createdAt, "dd-MM-yyyy")}</td>
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
