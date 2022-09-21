import { User } from "../../Models/User";
//@ts-ignore
import { baseUrl, Endpoints } from "./Constants.ts";

enum Methods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
}

const createHeader = (method: Methods, entity?: any) => {
  let headerOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(entity),
    credentials: "include",
  };
  return headerOptions;
};

export const AuthorizeUser = async () => {
  let url = baseUrl + Endpoints.Authorize;
  let header = createHeader(Methods.POST);
  let response: Response = await fetch(url, header);
  if (response.status >= 400) {
    return false;
  }
  let data = await response.json();
  sessionStorage.setItem("email", data.email);
  sessionStorage.setItem("name", data.name);
  return true;
};

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
  let response = await fetch(url, header);
  return await response;
};

export const Login = async (user: User) => {
  let url = baseUrl + Endpoints.Login;
  return await (await fetch(url, createHeader(Methods.POST, user))).json();
};

export const Logout = async () => {
  let url = baseUrl + Endpoints.Logout;
  console.log("m,ere");
  return await fetch(url, createHeader(Methods.POST));
};
