import React from "react";

function login() {
  return (
    <div>
      <label htmlFor="email">Adresa de email</label>
      <input
        type="text"
        id="email"
        className="form-control"
        aria-label="email"
      />
      <label htmlFor="password">Parola</label>
      <input
        type="password"
        id="password"
        className="form-control"
        aria-label="password"
      />
    </div>
  );
}

export default login;
