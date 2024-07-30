import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const useOrders = () => {
  const productCheckout = async ({ customerId, products }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/order/create`, {
        customerId,
        products,
      });

      const data = response?.data;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  return {
    productCheckout,
  };
};

export default useOrders;
