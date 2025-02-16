import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("zudioToken");
    if (token) {
      setIsAuthenticated(!!token);
      // Decode the token or use the data directly (if it's already in JSON format)
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token if needed
      setUser(decodedToken);
    }
  }, []);

  const login = (token) => {
    // Save token to localStorage
    localStorage.setItem("zudioToken", token);
    // Decode and store user data
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT to extract user info
    setUser(decodedToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zudioToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
