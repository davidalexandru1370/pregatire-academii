import { To } from "react-router-dom";

export interface ProtectedRouteProps {
  page: To;
  redirectPage?: string;
}
