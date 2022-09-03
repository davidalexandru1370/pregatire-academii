import { Navigate, useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../Models/ProtectedRouteProps";
//@ts-ignore
import { AuthorizeUser } from "../api/UserAPI.ts";

export const ProtectedRoute = async ({ page, redirectPage }: ProtectedRouteProps) => {
  let authorized: boolean = await AuthorizeUser();
  console.log(authorized);

  if (authorized === true) {
    return <Navigate to={redirectPage!.toString()} replace />
  }
  return <Navigate to={page!.toString()} replace />;
};