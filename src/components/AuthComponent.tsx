import React from "react";
import { Navigate } from "react-router-dom";
import { PATH_AUTH } from "../routes/paths.ts";

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  return !!localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to={PATH_AUTH.login} />
  );
};

export default AuthComponent;
