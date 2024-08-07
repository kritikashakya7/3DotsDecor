import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const useReview = () => {
  const getReviewsById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/review/${id}`);

      const data = response?.data;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.resposne?.data.message,
      };
    }
  };

  const addReview = async ({ id, productId, message, stars }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/review/${id}`, {
        productId,
        message,
        stars,
      });

      const data = response?.data;
      console.log("🚀 ~ data:", data);

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error.response.data.message);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  return { getReviewsById, addReview };
};

export default useReview;
