import { createContext, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { decodeToken } from "../lib/decodeToken";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) setUser(JSON.parse(token));

    setIsLoading(false);
  }, []);

  const loginUser = (token) => {
    const decodedToken = decodeToken(token);
    localStorage.setItem("token", JSON.stringify(decodedToken));
    setUser(decodedToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("token", null);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
