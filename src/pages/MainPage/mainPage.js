import React from "react";
import { Route, Routes, NavLink as Nlink, useNavigate } from "react-router-dom";
import Containter from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Card, NavDropdown } from "react-bootstrap";
import "./mainPage.scss";
import ProfileCard from "../../Components/ProfileCard";
import { connectionTestLogo } from "../../Utilities/index";
import { Button } from "react-bootstrap";
import FlipBox from "../../Components/FlipBox";

function MainPage() {
  let txt = ["text1,", "text2", "text3"];
  return (
    <div>
      <div className="d-none d-md-block d-lg-block d-xl-block d-xxl-block">
        <Navbar bg="dark" variant="dark">
          <Containter>
            <Nav className="me-5 container-fluid">
              <Nav.Link className="me-4">Modul de pregatire</Nav.Link>
              <NavDropdown title="Teste" className="text-decoration-none">
                <NavDropdown.Item href="\">Politie</NavDropdown.Item>
                <NavDropdown.Item href="\">Pompieri</NavDropdown.Item>
                <NavDropdown.Item href="\">Jandarmerie</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item className="ms-auto">
                <ProfileCard />
              </Nav.Item>
            </Nav>
          </Containter>
        </Navbar>
      </div>
      <div className="col mt-4 d-flex ">
        <div className="card row-md bg-dark text-light p-3 border">
          <div className="card-title ms-4">
            <b>Bine ai venit, @cont</b>
          </div>
          <div className="card-body ms-2 me-2">
            <p>Din data crearii contului si pana acum ai obtinut:</p>
            <p className="mt-2">
              <span>
                <img
                  src={`${connectionTestLogo}`}
                  width="24px"
                  className="bg-white"
                ></img>
                <span>x teste completate</span>
              </span>
            </p>
            <p className="mt-2">
              <span>
                <img />
                <span>y exercitii rezolvate</span>
              </span>
            </p>
            <Button variant="primary" className="mt-3 border">
              Incepe un nou test!
            </Button>
          </div>
        </div>
      </div>
      <div className="col d-flex  flex-column align-items-center p-3 mt-4">
        <p className="fs" style={{ color: "blueviolet" }}>
          Alege categoria pentru care vrei sa te pregatesti
        </p>
        <div className="row d-flex justify-content-between">
          <FlipBox />
        </div>
      </div>

      {/*mobile navbar */}
      <div className="d-sm-none">
        <p>telefon</p>
      </div>
    </div>
  );
}

export default MainPage;
