import { createContext, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) setUser(token);

    setUser({
      id: 1,
    });

    setIsLoading(false);
  }, []);

  const login = () => {
    setUser({
      id: 1,
    });
  };

  const logout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
