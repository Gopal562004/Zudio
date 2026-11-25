import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};

const getInitialUser = () => {
  const token = localStorage.getItem("zudioToken");
  if (!token) return null;
  const decoded = decodeJwtPayload(token);
  if (!decoded) {
    localStorage.removeItem("zudioToken");
    return null;
  }
  return decoded;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => getInitialUser() !== null
  );

  const login = (token) => {
    if (!token) return;
    localStorage.setItem("zudioToken", token);
    const decodedToken = decodeJwtPayload(token);
    if (decodedToken) {
      setUser(decodedToken);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("zudioToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
