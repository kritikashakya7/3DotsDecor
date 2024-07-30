import useCheckoutContext from "../hooks/useCheckoutContext";
import useAuthContext from "../hooks/useAuthContext";
import useOrders from "../hooks/useOrders";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { checkoutItems } = useCheckoutContext();
  const [isDisabled, setIsDisabled] = useState(true);

  const { user } = useAuthContext();
  const { productCheckout } = useOrders();

  const [grandTotal, setGrandTotal] = useState(0);

  const onCheckout = async () => {
    const response = await productCheckout({
      customerId: user?.id,
      products: checkoutItems,
    });

    if (response.success) {
      const data = response?.data;
      console.log("🚀 ~ data:", data);

      window.location.replace(data?.paymentUrl);
    } else {
      toast.error(response?.message);
    }
  };

  const calculateTotal = async () => {
    setGrandTotal(
      checkoutItems.reduce((total, curr) => {
        return total + curr.itemTotal;
      }, 0)
    );
  };

  useEffect(() => {
    calculateTotal();
  }, [checkoutItems]);

  useEffect(() => {
    if (checkoutItems.length < 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [checkoutItems]);

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="bg-hover p-5 rounded-md space-y-5 max-w-[450px] w-full">
        <h1 className="text-xl font-bold text-primary">Order Summary</h1>
        <ul className="text-lg w-full space-y-3">
          {checkoutItems?.map((item) => (
            <li key={item?.productId} className="flex justify-between">
              <div>
                {item.title}
                <p className="text-base text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <h1>Rs. {item.itemTotal}</h1>
            </li>
          ))}

          <li className="flex justify-between mt-8 border-y-2  py-5">
            <h1 className="font-bold text-xl">Total Due</h1>
            <h1 className="font-bold text-xl">
              Rs. {grandTotal.toLocaleString()}
            </h1>
          </li>
        </ul>

        <Button className="w-full" onClick={onCheckout} disabled={isDisabled}>
          Pay Rs. {grandTotal.toLocaleString()}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
