import React from "react";
import { To } from "react-router-dom";

export interface ProtectedRouteProps {
  page: NonNullable<React.ReactNode>;
  redirectPage: string;
}
