import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthorizeUser } from "../api/UserAPI.ts";

export const ProtectedRoutes = ({ children }) => {
  if (AuthorizeUser() === false) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
