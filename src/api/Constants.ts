export const baseUrl: string = "https://localhost:7199/";

const userController = "api/User/";
const quizController = "api/graphql/quiz";

interface UserEndpoint {
  Register: string;
  Login: string;
  Authorize: string;
  Logout: string;
  ForgotPassword: string;
  ValidateForgotPasswordPageId: string;
  ChangePassword: string;
}

interface QuizEndpoints {
  GraphQL: string;
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

export const QuizEndpoints: QuizEndpoints = {
  GraphQL: quizController,
};
