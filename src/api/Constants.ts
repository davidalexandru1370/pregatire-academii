export const baseUrl: string = "https://localhost:7199/";

export const userController = "api/User/";
export const quizController = "http://localhost:5199/api/graphql";
export const roomController = "api/Room/";

interface UserEndpoint {
  Register: string;
  Login: string;
  Authorize: string;
  Logout: string;
  ForgotPassword: string;
  ValidateForgotPasswordPageId: string;
  ChangePassword: string;
}

interface RoomEndpoint {
  StartRoom: string;
}

export const UserEndpoints: UserEndpoint = {
  Register: userController + "register",
  Login: userController + "authentificate",
  Authorize: userController + "authorize",
  Logout: userController + "logout",
  ForgotPassword: userController + "forgot-password",
  ValidateForgotPasswordPageId: userController + "validate-page-id",
  ChangePassword: userController + "change-password",
};

export const RoomEndpoints: RoomEndpoint = {
  StartRoom: roomController + "start-room",
};
