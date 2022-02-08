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
    <div className="App">
      <Navbar className="bg-dark">
        <Nav className="ms-auto ">
          <Nav.Item href="#" className="p-3 nav-item">
            Acasa
          </Nav.Item>
          <Nav.Item href="#" className="p-3 nav-item">
            Subiecte
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;
