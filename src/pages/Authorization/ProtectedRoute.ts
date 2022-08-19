import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
import { User } from "../../Models/User";
import { AuthorizeUser } from "../api/index";

export const ProtectedRoute = async ({
  user,
  children,
  redirectPage = "login",
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  if ((await AuthorizeUser(user)) === true) {
    return navigate(redirectPage);
  }
  return children;
};
