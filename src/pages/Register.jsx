import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss";
import { createAPIEndpoint } from "./api";

function Register() {
  const [start_validate, set_start_validate] = useState(false);
  const [name, setname] = useState(false);
  const [password, setPassword] = useState(false);
  const form_ref = useRef(0);
  const pass_ref = useRef({});
  let values = useRef({});
  const passwordRegex = new RegExp("(.*[A-Z]+.*[0-9]+)|(.*[0-9].*[A-Z].*)");
  let name_error_text = "Adresa de email este invalida";

  //check if input name field it is correct
  const nameInputField = () => {
    const my_form = form_ref.current;
    //console.log(String(my_form["name"].value));
    if (String(my_form["name"].value).length < 3) {
      setname(false);
      return;
    }

    setname(true);
    values["name"] = String(my_form["name"].value);
  };

  const passwordInputFields = () => {
    const my_form = form_ref.current;
    const field_caps = pass_ref.current["pass-caps"];
    const field_digit = pass_ref.current["pass-digit"];
    values["password"] = my_form["password"].value;
    if (String(my_form["password"].value).length > 5) {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = "green";
        setPassword(true);
      }
    } else {
      const field = pass_ref.current["pass-length"];
      if (field) {
        field.style.color = "red";
        setPassword(false);
      }
    }

    let has_caps = String(my_form["password"].value).match("[A-Z]");
    if (has_caps !== null) {
      if (field_caps) {
        field_caps.style.color = "green";
        setPassword(true);
      }
    } else {
      if (field_caps) {
        field_caps.style.color = "red";
        setPassword(false);
      }
    }

    let has_digit = String(my_form["password"].value).match("[0-9]");
    if (has_digit !== null) {
      if (field_digit) {
        field_digit.style.color = "green";
        setPassword(true);
      }
    } else {
      if (field_digit) {
        field_digit.style.color = "red";
        setPassword(false);
      }
    }
  };

  const checkInputFields = () => {
    //set_start_validate(true);
    nameInputField();
    console.log("name=" + name + " " + values["name"]);
    console.log("pass=" + password + " " + values["password"]);
    if (name === true && password === true) {
      console.log("merge");
      //let obj = { ...values["name"], ...values["password"], ..."name" };
      let obj = {
        email: values["name"],
        password: values["password"],
        name: "vasile",
      };
      createAPIEndpoint("Users")
        .post(obj)
        .then((obj) => {
          console.log(obj);
        });
    }
    // passwordInputFields();
  };

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
                  : name === true
                  ? "valid-field"
                  : "invalid-field"
              }`}
              id="name"
              placeholder="Email"
              aria-label="email"
              onChange={nameInputField}
            />
            <p
              style={{
                display: ` ${name === true ? "none" : "initial"}`,
              }}
              className={`${
                name === true ? "valid-field-text" : "invalid-field-text"
              }`}
            >
              {name_error_text}
            </p>
          </div>
          <div className="mt-5">
            <label htmlFor="password">Parola:</label>
            <input
              type="password"
              id="password"
              //className="form-control"
              className="form-control"
              placeholder="Parola"
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
            />
          </div>
          <button
            className="register-btn btn mt-3 d-flex justify-content-center "
            type="button"
            onClick={checkInputFields}
          >
            Creeaza cont
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
