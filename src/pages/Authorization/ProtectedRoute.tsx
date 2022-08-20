//@ts-ignore
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
//@ts-ignore
import { AuthorizeUser } from "../api/UserAPI.ts";

export const ProtectedRoutes = ({
  page,
  redirectPage,
}: ProtectedRouteProps) => {
  if (AuthorizeUser() === false) {
    return <Navigate to={redirectPage!} replace />;
  }

  return page!;
};
