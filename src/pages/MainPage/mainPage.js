import React from "react";
import { Route, Routes, NavLink as Nlink, useNavigate } from "react-router-dom";
import Containter from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import "./mainPage.scss";

function MainPage() {
  return (
    <div>
      <div className="d-none d-md-block d-lg-none">
        <Navbar bg="dark" variant="dark">
          <Containter>
            <Nav className="me-5">
              <Nav.Link className="me-4">Modul de pregatire</Nav.Link>
              <NavDropdown title="Teste" className="text-decoration-none">
                <NavDropdown.Item href="\">Politie</NavDropdown.Item>
                <NavDropdown.Item href="\">Pompieri</NavDropdown.Item>
                <NavDropdown.Item href="\">Jandarmerie</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Containter>
        </Navbar>
      </div>

      <div className="d-sm-none">
        <p>telefon</p>
      </div>
    </div>
  );
}

export default MainPage;
