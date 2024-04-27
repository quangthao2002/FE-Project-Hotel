import React, { createContext, useState } from "react";
import  jwtDecode  from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", decodedToken.sub);
    localStorage.setItem("userRole", decodedToken.roles.join(","));
    setUser(decodedToken);
    console.log(decodedToken, "decodedToken")
    console.log(user, "user")
  };
  const handleLogout = (token) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
