import React from "react";
import { Navigate } from "react-router-dom";

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  console.log(`isAuthenticated: ${!!localStorage.getItem("token")}`);

  return !!localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

export default AuthComponent;
