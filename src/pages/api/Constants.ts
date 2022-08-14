export const baseUrl: string = "https://localhost:7199/";

let userController = "api/User/";

export const Endpoints = {
  Register: userController + "register",
  Login: userController + "authentificate",
};
