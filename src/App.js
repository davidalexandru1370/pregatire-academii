import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Nav,
  Navbar
} from "react-bootstrap";
import "react-bootstrap-icons";
import {
  ChevronDown,
  EmojiSmileUpsideDown
} from "react-bootstrap-icons";
import "./App.css";
import TextCard from "./Components/TextCard";
import AcademyEntity from "./ObjectsTemplates/AcademyEntity.js";
import Register from './pages/Register'
import {BrowserRouter, BrowserRouter as Router,Route, Routes} from 'react-router-dom'

function App() {
  //var  font_color_style = {"--color": "#f0f0f0"} as React.CSSProperties;
  const police = new AcademyEntity("politie", "#f0f0f0");
  const firefighters = new AcademyEntity("pompieri", "#f0f0f0");
  const special_forces = new AcademyEntity("jandarmerie", "#f0f0f0");
  var academies = [police, firefighters, special_forces];
  let connection_politie = "http://172.22.0.1:8080/militist.png";
  let connection_pompier = "http://172.22.0.1:8080/pomper.png";
  let connection_jandarmerie = "http://172.22.0.1:8080/jendar.png";
   
  return (
    <Router>
      <Navbar className="bg-dark sticky-top">
        <Nav className="ms-auto position-sticky">
          <Nav.Item href="#" className="p-3 nav-item me-5">
            Acasa
          </Nav.Item>
          <Nav.Item href="#" className="p-3 nav-item me-5">
            Contact
          </Nav.Item>
        </Nav>
      </Navbar>
    <Routes>
      
      <Route path='/acasa' exact element={
        <>
      
      <section className="hero-section">
        <div className="container">
          <div className="col-lg">
            <h2 className="hero-title  text-center p-3">
              Te pregatesti pentru admitere la
            </h2>
          </div>
          <div className="row">
            <div className="row-lg col d-flex justify-content-center">
              <div className="col-sm d-flex flex-column " style={{marginLeft: "-5px"}}>
                <img
                  src={`${connection_pompier}`}
                  alt="pompier"
                  className="avatar border-end"
                />
                <h2 className="hero-item">Pompieri</h2>
              </div>

              <div className="col-sm d-flex flex-column ">
                <img
                  src={`${connection_politie}`}
                  alt="politie"
                  className="avatar border-end "
                />
                <h2 className="hero-item">Politie</h2>
              </div>
              <div className="col-sm d-flex flex-column element">
                <img
                  src={`${connection_jandarmerie}`}
                  alt="jandarmerie"
                  className=" avatar"
                />
                <h2 className="hero-item">Jandarmerie</h2>
              </div>
            </div>
          </div>
          <div className="row-sm">
            <div className="hero-title"></div>
          </div>
        </div>
        <div className="d-flex align-items-center flex-column mt-5">
          <ChevronDown size={24} className="changeColorAnim"/>
          <ChevronDown size={24} className="changeColorAnim delay1"/>
          <ChevronDown size={24} className="changeColorAnim delay2"/>
        </div>
      </section>
      <section className="bg-dark border-tb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-4">
              <div className="text-center">
                <h3 className="text-white text-uppercase ">
                  ce iti putem oferi?
                </h3>
              </div>
            </div>
            <div className="col-lg-12 mt-5 pb-5">
              <div className="card-deck">
                <TextCard text="Subiecte romana" />
                <TextCard text="Subiecte matematica" />
                
              </div>
              <div className="card-deck mt-5">
                <TextCard text="Subiecte istorie"/>
                <TextCard text="Rezolvari la probleme" />
              </div>
                <div className="card-deck mt-5">
                <TextCard text="Explicatii ale raspunsurilor" />
                <TextCard text="Support live" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-dark pb-2">
        
        <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex flex-row justify-content-between">
              <div className="d-flex flex-column align-items-left">
                <h3 className="text-white fs-1" style={{paddingTop: "5rem"}}>
            Incepe prin a-ti crea <br/>
            propriul cont.  <br/>
          </h3>
          <h3 className="text-white fs-1 mt-4">
            Este complet gratis
            <EmojiSmileUpsideDown size={24} style={{ color: "#FFCB4C" }} className=" ms-2"/>
          </h3>
            </div>
            <div className="d-grip my-auto">  
            <button type="button" className="btn btn-primary btn-lg col-12 mt-5" style={{borderRadius: "50px"}}>Creeaza cont</button>
            </div>
            </div>
          </div>
        </div>
      </section>
      </>}/>

    <Route exact path='Register' element={<Register/>}/>

    </Routes>
    </Router>
  );
}

export default App;
