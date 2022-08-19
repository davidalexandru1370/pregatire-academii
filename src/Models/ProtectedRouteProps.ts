import React, { FC } from "react";
import { User } from "./User";

export interface ProtectedRouteProps {
  user: User;
  children: string;
  redirectPage?: string;
}
