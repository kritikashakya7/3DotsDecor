import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

export const useAuth = () => {
  const signup = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      const data = response.data;
      return { data, succes: true };
    } catch (error) {
      return { succes: false, error: error.response.data };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = response.data;
      return { data, succes: true };
    } catch (error) {
      return { succes: false, error: error.response.data };
    }
  };

  return { signup, login };
};
