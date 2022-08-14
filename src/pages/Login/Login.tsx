import React, { useRef, useState } from "react";
import "./Login.scss";
import { Button } from "react-bootstrap";
import { Axios } from "axios";
//@ts-ignore
import { Login as _Login } from "../api/UserAPI.ts";
import { User } from "../../Models/User";

function Login() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const buttonInputRef = useRef<HTMLButtonElement | null>(null);
  const [loginButton, setLoginButton] = useState(true);

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
    //buttonInputRef.current!.disabled = !buttonState;
  };

  const loginButtonClick = async () => {
    // console.log(emailInputRef.current?.value);
    // console.log(passwordInputRef.current?.value);

    let user: User = {
      Email: emailInputRef.current?.value || "",
      Password: passwordInputRef.current?.value || "",
      Name: "",
    };

    let response = await _Login(user);
    console.log(response);
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-4 d-flex flex-column align-items-center">
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
        </div>
      </div>
    </div>
  );
}

export default Login;
