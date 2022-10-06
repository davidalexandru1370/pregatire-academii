import { useEffect, useState } from "react";
import "./ForgotPassword.scss";
//@ts-ignore
import { PasswordBulletPoints } from "../Register/Register.tsx";
import { useParams } from "react-router-dom";
//@ts-ignore
import { ValidateForgotPasswordPageId } from "../api/UserAPI.ts";
const ForgotPassword = () => {
  const pageId = useParams()["pageId"];
  const [password, setPassword] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    try {
      const response = async () => {
        if ((await ValidateForgotPasswordPageId(pageId)) === undefined) {
          setIsValid(true);
        }
      };
      response();
    } catch (error) {
      console.log(error);
    }
    return () => {};
  }, []);

  if (isValid === true) {
    return (
      <div className="forgotPasswordContent">
        <PasswordBulletPoints changePassword={setPassword} />
        <button
          type="button"
          className="changePasswordButton"
          disabled={!password}
        >
          Schimba parola
        </button>
      </div>
    );
  }
};

export default ForgotPassword;
