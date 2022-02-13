import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Button,
  Alert,
} from "react-bootstrap";
import React from "react";
function App() {
  //var font_color_style = {"--color": "#f0f0f0"} as React.CSSProperties;
  return (
    <div className="App wrapper">
      <Navbar className="bg-dark">
        <Nav className="ms-auto ">
          <Nav.Item href="#" className="p-3 nav-item">
            Acasa
          </Nav.Item>
          <Nav.Item href="#" className="p-3 nav-item">
            Subiecte
          </Nav.Item>
          <Nav.Item className="p-3 nav-item">
            <img src="" alt="cont utilizator" />
          </Nav.Item>
        </Nav>
      </Navbar>
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <h2 className="hero-title col-4 p-3">
                Te pregatesti pentru admitere la
              </h2>
            </div>
            <div className="col-lg">
              <ul className="flip3 list-group-flush">
                <li className="list-group-item hero-item">politie</li>
                <li className="list-group-item hero-item">jandarmerie</li>
                <li className="list-group-item hero-item">pompieri</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
