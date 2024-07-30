import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const useAdmin = () => {
  const getAllProducts = async (query) => {
    console.log("🚀 ~ query:", query);

    try {
      let reqUrl;
      if (query) {
        reqUrl = `${API_BASE_URL}/products?filter=${query}`;
      } else {
        reqUrl = `${API_BASE_URL}/products`;
      }
      const response = await axios.get(reqUrl);

      const data = response?.data.products;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response.data?.message,
      };
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);

      const data = response?.data.product;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response.data?.message,
      };
    }
  };

  const addProduct = async ({
    title,
    description,
    price,
    category,
    stock,
    thumbnail,
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/add-product`,
        {
          title,
          description,
          price,
          category,
          stock,
          thumbnail,
        }
      );

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/products/delete-product/${id}`
      );

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const editProduct = async ({
    id,
    title,
    description,
    price,
    category,
    stock,
    thumbnail,
  }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, {
        title,
        description,
        price,
        category,
        stock,
        thumbnail,
      });

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const addCategory = async ({ name, description }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category/add-category`,
        {
          name,
          description,
        }
      );

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);

      const data = response?.data.category;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response.data?.message,
      };
    }
  };

  const editCategory = async ({ id, name, description }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/category/${id}`, {
        id,
        name,
        description,
      });

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`);

      const data = response.data;

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
  };

  const dashboardCounts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/dashboard/counts`
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

  const getAllCustomer = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer`);

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

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/customer/${id}`);

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

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order`);

      const data = response?.data.orders;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        success: false,
        message: error.response?.data.error,
      };
    }
  };

  const getRecentCompletedOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order/recent`);

      const data = response?.data.orders;

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
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    editProduct,
    addCategory,
    getAllCategory,
    editCategory,
    deleteCategory,
    dashboardCounts,
    getAllCustomer,
    deleteCustomer,
    getAllOrders,
    getRecentCompletedOrders,
  };
};

export default useAdmin;
