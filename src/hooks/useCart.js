import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const useCart = () => {
  const addToCart = async ({ id, products }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add/${id}`, {
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

  const getCartItems = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart/${id}`);

      const data = response?.data;

      return {
        success: true,
        data: data.cart,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);

      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const updateCartItem = async ({ id, productId, quantity }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cart/update-quantity/${id}/${productId}/${quantity}`
      );

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

  const removeCartItem = async ({ id, productId }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/delete-item/${id}/${productId}`
      );

      const data = response.data;

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

  return { addToCart, getCartItems, updateCartItem, removeCartItem };
};

export default useCart;
