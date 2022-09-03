export const baseUrl: string = "https://localhost:7199/";

let userController = "api/User/";

interface Endpoint{
  Register:string,
  Login:string,
  Authorize:string
}

export const Endpoints:Endpoint = {
  Register: userController + "register",
  Login: userController + "authentificate",
  Authorize: userController+"authorize",
};
