import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Button from "../../components/Button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const Customer = () => {
  const { getAllCustomer, deleteCustomer } = useAdmin();

  const [customers, setCustomers] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCustomers = async () => {
    const response = await getAllCustomer();

    if (response.success) {
      setCustomers(response.data.customers);
    }
  };

  const onDeleteCustomer = async (id) => {
    setIsSubmitting(true);

    const response = await deleteCustomer(id);

    if (response.success) {
      toast.success(response?.data.message);
      fetchCustomers();
    } else {
      toast.error(response?.data.message);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-md bg-secondary text-white space-y-5">
        <h1 className="text-xl font-bold">Customers</h1>

        <table className="w-full text-left table-auto">
          <tr className="border-b">
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th className="max-w-20">Actions</th>
          </tr>

          <br />

          <tbody>
            {customers.map((customer) => (
              <>
                <tr key={customer?._id}>
                  <td>{customer?._id}</td>
                  <td className="capitalize">
                    {customer?.firstName} {customer?.lastName}
                  </td>
                  <td>{customer?.email}</td>
                  <td>
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => onDeleteCustomer(customer?._id)}
                      disabled={isSubmitting}
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

export default Customer;
