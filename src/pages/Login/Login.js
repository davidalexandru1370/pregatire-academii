import React from "react";
import "./Login.scss";
import { Button } from "react-bootstrap";
function login() {
  return (
    <div className="container-fluid">
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control input"
            id="text"
            placeholder="Email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control input"
            id="password"
            placeholder="Password"
          />
          <Button className="mt-3">Intra in cont</Button>
        </div>
      </div>
    </div>
  );
}

export default login;
