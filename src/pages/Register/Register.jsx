import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { Route, Routes } from "react-router-dom";

function Register() {
  const [start_validate, set_start_validate] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const form_ref = useRef(0);
  const pass_ref = useRef({});
  let values = useRef({});
  const passwordRegex = new RegExp("(.*[A-Z]+.*[0-9]+)|(.*[0-9].*[A-Z].*)");

  //check if input name field it is correct
  const nameInputField = () => {
    const my_form = form_ref.current;
    //console.log(String(my_form["name"].value));
    if (String(my_form["name"].value).length < 3) {
      setEmail(false);
      return;
    }

    var email_regex = new RegExp(
      /([a-zA-Z])[a-zA-Z0-9.-]+@[a-zA-Z0-9](.[a-zA-Z0-9]+)*[.][a-zA-Z]{2,3}/
    );
    let is_email = email_regex.test(String(my_form["name"].value));
    if (is_email === false) {
      setEmail(false);
      return;
    }

    setEmail(true);
    values["name"] = String(my_form["name"].value);
  };

  const passwordInputFields = () => {
    const my_form = form_ref.current;
    const field_caps = pass_ref.current["pass-caps"];
    const field_digit = pass_ref.current["pass-digit"];
    const field_same_passwords = pass_ref.current["pass-same"];
    values["password"] = my_form["password"].value;
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
  };

  function checkInputFields() {
    nameInputField();
    if (email === true && password === true) {
      let obj = {
        email: values["name"],
        password: values["password"],
        name: values["name"],
      };
      createAPIEndpoint(ENDPOINTS.Register)
        .post(obj)
        .then((token) => {
          return (
            <Routes>
              <Route exact path="\mainPage" />
            </Routes>
          );
        })
        .catch((error) => {
          if (error.response) {
            document.getElementById("register_error_message_id").innerText =
              error.response.data.errors[0];
          } else {
            document.getElementById("register_error_message_id").innerText = "";
          }
          console.clear();
        });
    }
    // passwordInputFields();
  }

  return (
    <div className="col-sm register">
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
              onChange={nameInputField}
              style={{ borderColor: `${email === true ? "green" : "red"}` }}
            />
            <li
              style={{
                listStyleType: ` ${email === true ? "none" : "initial"}`,
              }}
              className={`${
                email === true ? "valid-field-text" : "invalid-field-text"
              }`}
            >
              {email === false ? "Adresa de email este invalida" : ""}
            </li>
          </div>
          <div className="mt-5">
            <label htmlFor="password">Parola:</label>
            <input
              type="password"
              id="password"
              className={`form-control`}
              placeholder="Parola"
              style={{
                borderColor: `${password === true ? "green" : "red"}`,
              }}
              aria-label="password"
              onChange={() => passwordInputFields()}
            />
            <div className={`pass-constr`}>
              <li
                id="pass-length"
                style={{ color: "red" }}
                ref={(element) => (pass_ref.current["pass-length"] = element)}
              >
                Parola trebuie sa contina minim 5 caractere!
              </li>
              <li
                id="pass-caps"
                style={{ color: "red" }}
                ref={(element) => (pass_ref.current["pass-caps"] = element)}
              >
                Parola trebuie sa contina cel putin o litera mare!
              </li>
              <li
                id="pass-digit"
                style={{ color: "red" }}
                ref={(element) => (pass_ref.current["pass-digit"] = element)}
              >
                Parola trebuie sa contina cel putin o cifra!
              </li>
              <li
                id="pass-same"
                style={{ color: "red" }}
                ref={(element) => (pass_ref.current["pass-same"] = element)}
              >
                Parolele trebuie sa coincida!
              </li>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="repeatpassword">Repeta parola:</label>
            <input
              type="password"
              id="repeatpassword"
              className="form-control"
              placeholder="Repeta parola"
              aria-label="password"
              onChange={() => passwordInputFields()}
              style={{
                borderColor: `${password === true ? "green" : "red"}`,
              }}
            />
          </div>
          <button
            className="register-btn btn mt-3 d-flex justify-content-center "
            type="button"
            onClick={checkInputFields}
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

export default Register;
