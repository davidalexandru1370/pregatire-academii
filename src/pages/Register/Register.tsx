import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useRef, useState } from "react";
import "./Register.scss";
//@ts-ignore
import { Navigate, useNavigate } from "react-router-dom";
import pages from "../../Constants/pages.json";
//@ts-ignore
import { Register as RegisterUser } from "../api/UserAPI.ts";

function Register() {
  const [start_validate, set_start_validate] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const form_ref = useRef(0);
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
        password: values["password"],
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
      <form>
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
          <PasswordBulletPoints onChange={setPassword} />
          <button
            className="register-btn btn mt-3 d-flex justify-content-center "
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

const PasswordBulletPoints: FC<{
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}> = (onChange) => {
  const pass_ref = useRef({});
  const [password, setPassword] = useState<boolean>(false);
  const my_form = useRef({});

  const validatePasswordInputFields = () => {
    const field_caps = pass_ref.current["pass-caps"];
    const field_digit = pass_ref.current["pass-digit"];
    const field_same_passwords = pass_ref.current["pass-same"];
    let valid_password = true;

    if (String(my_form["password"].value).length > 5) {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = "green";
      }
    } else {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = "red";
        valid_password = false;
      }
    }

    let has_caps = String(my_form["password"].value).match("[A-Z]");
    if (has_caps !== null) {
      if (field_caps) {
        field_caps.style.color = "green";
      }
    } else {
      if (field_caps) {
        field_caps.style.color = "red";
        valid_password = false;
      }
    }

    let has_digit = String(my_form["password"].value).match("[0-9]");
    if (has_digit !== null) {
      if (field_digit) {
        field_digit.style.color = "green";
      }
    } else {
      if (field_digit) {
        field_digit.style.color = "red";
        valid_password = false;
      }
    }
    let are_equal =
      String(my_form["repeatpassword"].value) ===
        String(my_form["password"].value) &&
      String(my_form["password"].value).length > 0 &&
      String(my_form["repeatpassword"].value).length > 0;
    if (are_equal === false) {
      if (field_same_passwords) {
        field_same_passwords.style.color = "red";
        valid_password = false;
      }
    } else {
      if (field_same_passwords) {
        field_same_passwords.style.color = "green";
      }
    }
    setPassword(valid_password);
    //@ts-ignore
    onChange(valid_password);
  };

  return (
    <div>
      <div className="mt-5">
        <label htmlFor="password">Parola:</label>
        <input
          type="password"
          id="password"
          className={`form-control`}
          placeholder="Parola"
          autoComplete="new-password"
          style={{
            borderColor: `${password === true ? "green" : "rgb(234, 61, 61)"}`,
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
    </div>
  );
};

export default Register;