import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss";

function Register() {
  const [start_validate, set_start_validate] = useState(false);
  const [name, setname] = useState(false);
  const form_ref = useRef(null);
  let name_error_text = "Adresa de email este invalida";

  //check if input name field it is correct
  const nameInputField = () => {
    const my_form = form_ref.current;
    if (String(my_form["name"].value).length < 3) {
      setname(false);
      return;
    }

    setname(true);
  };

  const checkInputFields = () => {
    set_start_validate(true);
    nameInputField();
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
              onChange={start_validate === true ? nameInputField : null}
            />
            <p
              style={{
                display: ` ${
                  start_validate === false
                    ? "none"
                    : name === true
                    ? "none"
                    : "initial"
                }`,
              }}
              className={`${
                start_validate === false
                  ? null
                  : name === true
                  ? "valid-field-text"
                  : "invalid-field-text"
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
              className="form-control"
              placeholder="Parola"
              aria-label="password"
            />
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
            onClick={checkInputFields}
            type="button"
          >
            Creeaza cont
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
