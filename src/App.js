import "./App.css";
import AcademyEntity from "./ObjectsTemplates/AcademyEntity.js";
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
import Changabletext from "./Components/ChangableText";

function App() {
  //var  font_color_style = {"--color": "#f0f0f0"} as React.CSSProperties;
  const police = new AcademyEntity("politie", "#f0f0f0");
  const firefighters = new AcademyEntity("pompieri", "#f0f0f0");
  const special_forces = new AcademyEntity("jandarmerie", "#f0f0f0");
  var academies = [police, firefighters, special_forces];

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
          <div className="row ">
            <div className="col-lg">
              <h2 className="hero-title col-4 p-3">
                Te pregatesti pentru admitere la
              </h2>
              <div className="col col-md">
                <Changabletext text_choices={academies} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
