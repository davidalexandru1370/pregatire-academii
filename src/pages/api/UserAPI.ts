import { User } from "../../Models/User";
//@ts-ignore
import { baseUrl, Endpoints } from "./Constants.ts";

export const Register = async (user: User) => {
  let url = baseUrl + Endpoints.Register;
  let header: RequestInit = {
    body: JSON.stringify(user),
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    mode: "cors",
  };
  return await fetch(url, header);
};

export const Login = async (user: User) => {
  let url = baseUrl + Endpoints.Login;
  let header: RequestInit = {
    body: JSON.stringify(user),
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    mode: "cors",
  };
  return await fetch(url, header);
};
