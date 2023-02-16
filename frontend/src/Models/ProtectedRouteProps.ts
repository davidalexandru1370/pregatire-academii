import React from "react";

export interface ProtectedRouteProps {
  page: NonNullable<React.ReactNode>;
  redirectPage: string;
}
