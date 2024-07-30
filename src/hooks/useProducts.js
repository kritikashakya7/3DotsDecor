import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const useProducts = () => {
  const getProductsByCategory = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products/category/${id}`
      );

      const data = response?.data.products;

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

  const getTopProducts = async (limit) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/top/${limit}`);

      const data = response?.data.topProducts;

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

  return { getProductsByCategory, getTopProducts };
};

export default useProducts;
