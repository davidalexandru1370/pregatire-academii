import { useEffect, useState } from "react";
import "./ForgotPassword.scss";
//@ts-ignore
import { PasswordBulletPoints } from "../Register/Register.tsx";
import { useNavigate, useParams } from "react-router-dom";

import {
  ValidateForgotPasswordPageId,
  ChangePassword,
  //@ts-ignore
} from "../../api/UserAPI.ts";
//@ts-ignore
import LoadingCircle from "../../Components/LoadingCircle/LoadingCircle.tsx";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const pageId = useParams()["pageId"];
  const navigate = useNavigate();
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChangePasswordClick = async () => {
    if (isPasswordCorrect === true) {
      try {
        await ChangePassword(pageId, password);
        navigate("/authentificate", { replace: true });
      } catch {}
    }
  };

  useEffect(() => {
    const response = async () => {
      if ((await ValidateForgotPasswordPageId(pageId)) === undefined) {
        setIsValid(true);
      }
    };
    response().catch((error) => {
      toast("Link-ul este invalid!", {
        type: "error",
      });
      navigate("/authentificate", { replace: true });
    });
  }, []);

  if (isValid === true) {
    return (
      <div className="forgotPasswordContent">
        <PasswordBulletPoints
          changePassword={setIsPasswordCorrect}
          password={setPassword}
        />
        <button
          type="button"
          className="changePasswordButton"
          disabled={!isPasswordCorrect}
          onClick={handleChangePasswordClick}
        >
          Schimba parola
        </button>
      </div>
    );
  }
  return <></>;
};

export default ForgotPassword;
