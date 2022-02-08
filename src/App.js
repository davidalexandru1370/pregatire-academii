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
function App() {
  return (
    <div className="App">
      <Navbar>
        <Nav>
          <Nav.Item href="#">Acasa</Nav.Item>
          <Nav.Item href="#">Subiecte</Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;
