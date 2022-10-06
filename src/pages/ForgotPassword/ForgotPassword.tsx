import { useState } from "react";
import "./ForgotPassword.scss";
//@ts-ignore
import { PasswordBulletPoints } from "../Register/Register.tsx";
const ForgotPassword = () => {
  const [password, setPassword] = useState<boolean>(false);
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
};

export default ForgotPassword;
