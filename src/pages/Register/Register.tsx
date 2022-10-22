import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useRef, useState } from "react";
import "./Register.scss";
//@ts-ignore
import { Navigate, useNavigate } from "react-router-dom";
import pages from "../../Constants/pages.json";
//@ts-ignore
import { Register as RegisterUser } from "../../api/UserAPI.ts";

function Register() {
  const [start_validate, set_start_validate] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const form_ref = useRef<any>(0);
  const pass_ref = useRef({});
  let values = useRef({});
  const navigate = useNavigate();
  const passwordRegex = new RegExp("(.*[A-Z]+.*[0-9]+)|(.*[0-9].*[A-Z].*)");

  const nameInputField = () => {
    const my_form = form_ref.current;
    if (String(my_form["name"].value).length < 3) {
      setEmail(false);
      return;
    }

    var email_regex = new RegExp(
      /([a-zA-Z])[a-zA-Z0-9.-]+@[a-zA-Z0-9](.[a-zA-Z0-9]+)*[.][a-zA-Z]{2,3}$/
    );

    let is_email = email_regex.test(String(my_form["name"].value));
    if (is_email === false) {
      setEmail(false);
      return;
    }

    setEmail(true);
    values["name"] = String(my_form["name"].value);
  };

  async function checkInputFields() {
    nameInputField();
    if (email === true && password === true) {
      let obj = {
        email: values["name"],
        password: passwordValue,
        name: values["name"],
      };
      await RegisterUser(obj)
        .then(async (response) => {
          if (response.status >= 400) {
            throw await response.json();
          }
          document.getElementById("register_error_message_id").innerText = "";
          navigate(pages.mainpage);
        })
        .catch(async (errors) => {
          document.getElementById("register_error_message_id").innerText = "";
          for (const error of errors.errors) {
            document.getElementById("register_error_message_id").innerText +=
              error;
          }
        });
    }
  }

  return (
    <div className="col register">
      <form ref={form_ref}>
        <div className=" form-group">
          <div className="mt-5">
            <label htmlFor="name">Adresa de email:</label>
            <input
              type="text"
              className={`form-control ${
                start_validate === false
                  ? ""
                  : email === true
                  ? "valid-field"
                  : "invalid-field"
              }`}
              id="name"
              placeholder="Email"
              aria-label="email"
              autoComplete="new-password"
              onChange={nameInputField}
              style={{
                borderColor: `${
                  email === true ? "rgb(0, 245, 0)" : "rgb(234, 61, 61)"
                }`,
                borderWidth: "2px",
                backgroundColor: "aliceblue",
              }}
            />
            <li
              style={{
                visibility: `${email === false ? "visible" : "hidden"}`,
              }}
              className={`${
                email === true ? "valid-field-text" : "invalid-field-text"
              }`}
            >
              {email === false ? "Adresa de email este invalida" : ""}
            </li>
          </div>
          <PasswordBulletPoints
            changePassword={setPassword}
            password={setPasswordValue}
            style={{ border: "none" }}
          />
          <button
            className="register-btn btn mt-3 d-flex justify-content-center"
            type="button"
            onClick={checkInputFields}
            disabled={!(!!email && !!password)}
          >
            Creeaza cont
          </button>
          <p
            className="invalid-field-text mt-4"
            id="register_error_message_id"
          ></p>
        </div>
      </form>
    </div>
  );
}

export const PasswordBulletPoints: FC<{
  changePassword: React.Dispatch<React.SetStateAction<boolean>>;
  password?: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}> = ({ changePassword, password, style }) => {
  const pass_ref = useRef({});
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);
  const myForm = useRef<{ [key: string]: HTMLInputElement }>({});

  const validatePasswordInputFields = () => {
    const field_caps = pass_ref.current["pass-caps"];
    const field_digit = pass_ref.current["pass-digit"];
    const field_same_passwords = pass_ref.current["pass-same"];
    let valid_password = true;
    const validField = "rgb(0, 245, 0)";

    if (String(myForm.current["password"].value).length > 5) {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = validField;
      }
    } else {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = "red";
        valid_password = false;
      }
    }

    let has_caps = String(myForm.current["password"].value).match("[A-Z]");
    if (has_caps !== null) {
      if (field_caps) {
        field_caps.style.color = validField;
      }
    } else {
      if (field_caps) {
        field_caps.style.color = "red";
        valid_password = false;
      }
    }

    let has_digit = String(myForm.current["password"].value).match("[0-9]");
    if (has_digit !== null) {
      if (field_digit) {
        field_digit.style.color = validField;
      }
    } else {
      if (field_digit) {
        field_digit.style.color = "red";
        valid_password = false;
      }
    }
    let are_equal =
      String(myForm.current["repeatpassword"].value) ===
        String(myForm.current["password"].value) &&
      String(myForm.current["password"].value).length > 0 &&
      String(myForm.current["repeatpassword"].value).length > 0;
    if (are_equal === false) {
      if (field_same_passwords) {
        field_same_passwords.style.color = "red";
        valid_password = false;
      }
    } else {
      if (field_same_passwords) {
        field_same_passwords.style.color = validField;
      }
    }
    setIsPasswordCorrect(valid_password);
    changePassword(valid_password);
    password(myForm.current["password"].value);
  };

  return (
    <div className="passwordContainer" style={style}>
      <div className="">
        <label htmlFor="password" className="labelPassword">
          Parola:
        </label>
        <input
          type="password"
          id="password"
          className={`form-control`}
          placeholder="Parola"
          ref={(element) => (myForm.current["password"] = element)}
          autoComplete="new-password"
          style={{
            borderColor: `${
              isPasswordCorrect === true ? "rgb(0, 245, 0)" : "rgb(234, 61, 61)"
            }`,
            borderWidth: "2px",
            backgroundColor: "aliceblue",
          }}
          aria-label="password"
          onChange={() => validatePasswordInputFields()}
        />
        <div className={`pass-constr`}>
          <li
            id="pass-length"
            style={{ color: "rgb(234, 61, 61)" }}
            ref={(element) => (pass_ref.current["pass-length"] = element)}
          >
            Parola trebuie sa contina minim 5 caractere!
          </li>
          <li
            id="pass-caps"
            style={{ color: "rgb(234, 61, 61)" }}
            ref={(element) => (pass_ref.current["pass-caps"] = element)}
          >
            Parola trebuie sa contina cel putin o litera mare!
          </li>
          <li
            id="pass-digit"
            style={{ color: "rgb(234, 61, 61)" }}
            ref={(element) => (pass_ref.current["pass-digit"] = element)}
          >
            Parola trebuie sa contina cel putin o cifra!
          </li>
          <li
            id="pass-same"
            style={{ color: "rgb(234, 61, 61)" }}
            ref={(element) => (pass_ref.current["pass-same"] = element)}
          >
            Parolele trebuie sa coincida!
          </li>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="repeatpassword" className="labelPassword">
          Repeta parola:
        </label>
        <input
          type="password"
          id="repeatpassword"
          className="form-control"
          placeholder="Repeta parola"
          ref={(element) => (myForm.current["repeatpassword"] = element)}
          aria-label="password"
          onChange={() => validatePasswordInputFields()}
          style={{
            borderColor: `${
              isPasswordCorrect === true ? "rgb(0, 245, 0)" : "rgb(234, 61, 61)"
            }`,
            borderWidth: "2px",
            backgroundColor: "aliceblue",
          }}
        />
      </div>
    </div>
  );
};

export default Register;
