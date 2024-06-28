import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

export const useAuth = () => {
  const signup = async ({ firstName, lastName, email, password }) => {
    // console.log(firstName, lastName, email, password);
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
      console.log(error);
      return { succes: false };
    }
  };
  return { signup };
};
