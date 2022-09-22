import React, { useRef, useState } from "react";
import "./Login.scss";
import { Button } from "react-bootstrap";
import { Axios } from "axios";
//@ts-ignore
import { Login as _Login } from "../api/UserAPI.ts";
import { User } from "../../Models/User";
import { AuthResult } from "../../Models/AuthResult";
import { useNavigate } from "react-router-dom";
import redirects from "../../Constants/pages.json";

function Login() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const buttonInputRef = useRef<HTMLButtonElement | null>(null);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [loginButton, setLoginButton] = useState(true);
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
    <>
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
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="form-control input"
        id="password"
        ref={passwordInputRef}
        placeholder="Password"
        onChange={() => {
          loginButtonState();
        }}
      />
      <Button
        className="mt-3"
        disabled={loginButton}
        ref={buttonInputRef}
        onClick={() => {
          loginButtonClick();
        }}
      >
        Intra in cont
      </Button>
      <p className="LoginError">{errorMessages}</p>


    </>
  );
}

export default Login;
