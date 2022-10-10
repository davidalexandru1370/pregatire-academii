import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import ForgotPasswordModal from "../../Components/ForgotPasswordModal/forgotPasswordModal.tsx";
import redirects from "../../Constants/pages.json";
import { AuthResult } from "../../Models/AuthResult";
import { User } from "../../Models/User";
//@ts-ignore
import { Login as _Login } from "../api/UserAPI.ts";
//@ts-ignore
import ButtonWithLoading from "../../Components/ButtonWithLoading/ButtonWithLoading.tsx";

function Login() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const buttonInputRef = useRef<HTMLButtonElement | null>(null);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [loginButton, setLoginButton] = useState(true);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const IsNullOrWhitespace = (text: string) => {
    if (text === null) {
      return true;
    }
    if (text?.trim().length === 0) {
      return true;
    }
    return false;
  };

  const checkEmailField = (): boolean => {
    let value = emailInputRef.current?.value;
    return !IsNullOrWhitespace(value!);
  };

  const checkPasswordField = (): boolean => {
    let value = passwordInputRef.current?.value;
    return !IsNullOrWhitespace(value!);
  };

  const checkInputFields = (): boolean => {
    return checkEmailField() && checkPasswordField();
  };

  const loginButtonState = () => {
    let buttonState = checkInputFields();
    setLoginButton(!buttonState);
  };

  const loginButtonClick = async () => {
    let user: User = {
      Email: emailInputRef.current?.value || "",
      Password: passwordInputRef.current?.value || "",
      Name: "",
    };

    let data: AuthResult = await _Login(user);

    if (data.errors.length > 0) {
      let allErrors: string = "";
      for (let error of data.errors) {
        allErrors += error;
        allErrors += "\n";
      }
      setErrorMessages(allErrors);
    } else {
      navigate(redirects.mainpage);
      setErrorMessages("");
    }
  };

  return (
    <div className="loginForm">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        className="form-control input"
        id="text"
        onChange={() => {
          loginButtonState();
        }}
        ref={emailInputRef}
        placeholder="Email"
      />
      <label htmlFor="password">Parola</label>
      <input
        type="password"
        className="form-control input"
        id="password"
        ref={passwordInputRef}
        placeholder="Parola"
        onChange={() => {
          loginButtonState();
        }}
      />
      <span
        className="forgotPasswordText"
        onClick={() => {
          setIsForgotPasswordModalVisible(true);
        }}
      >
        Am uitat parola
      </span>
      {isForgotPasswordModalVisible && (
        <ForgotPasswordModal
          isOpen={true}
          onClose={() => {
            setIsForgotPasswordModalVisible(false);
          }}
        />
      )}
      <ButtonWithLoading
        className="mt-3"
        disabled={loginButton}
        ref={buttonInputRef}
        waitingText="Se trimite..."
        onClick={async () => {
          await loginButtonClick();
        }}
      >
        Intra in cont
      </ButtonWithLoading>
      <p className="LoginError">{errorMessages}</p>
    </div>
  );
}

export default Login;
