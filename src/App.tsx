import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import "react-bootstrap-icons";
import { ChevronDown, EmojiSmileUpsideDown } from "react-bootstrap-icons";
import { NavLink as NLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  connectionJandarmLogo,
  connectionPolitistLogo,
  connectionPompierLogo,
} from "./Utilities/index.js";
import TextCard from "./Components/TextCard";
import MainPage from "./pages/MainPage/mainPage";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
// @ts-ignore
import Login from "./pages/Login/Login.tsx";
// @ts-ignore
import { ProtectedRoute } from "./pages/Authorization/ProtectedRoute.tsx";
//@ts-ignore
import BaseRouter from "./BaseRouter/BaseRouter.tsx";
//@ts-ignore
import { Teste } from "./pages/Teste/Teste.tsx";

function App() {
  let navigation = useNavigate();

  const onRegisterClick = () => {
    navigation("Register");
  };

  return (
    <Routes>
      <Route
        path="/acasa"
        element={
          <>
            <Navbar className="bg-dark sticky-top">
              <Nav className="ms-auto position-sticky">
                <Nav.Item className="p-2  me-5 ">
                  <NLink
                    to="/acasa"
                    className={({ isActive }) =>
                      (isActive
                        ? "selected fw-bold"
                        : "nav-item  fw-light white-text") +
                      " h5 text-decoration-none"
                    }
                  >
                    Acasa
                  </NLink>
                </Nav.Item>
                <Nav.Item className="p-2 me-5">
                  <NLink
                    to="/contact"
                    className={({ isActive }) =>
                      (isActive
                        ? "selected fw-bold"
                        : "nav-item fw-light white-text") +
                      "   h5 text-decoration-none"
                    }
                  >
                    Contact
                  </NLink>
                </Nav.Item>
              </Nav>
            </Navbar>
            <section className="hero-section">
              <div className="container">
                <div className="col-lg">
                  <h2 className="hero-title  text-center p-3">
                    Te pregatesti pentru admitere la
                  </h2>
                </div>
                <div className="row">
                  <div className="avatars">
                    <div
                      className="avatar">
                      <img
                        src={`${connectionPompierLogo}`}
                        alt="pompier"
                      />
                      <h2 className="hero-item">Pompieri</h2>
                    </div>
                    <div className="avatar">
                      <img
                        src={`${connectionPolitistLogo}`}
                        alt="politie"
                      />
                      <h2 className="hero-item">Politie</h2>
                    </div>
                    <div className="avatar">
                      <img
                        src={`${connectionJandarmLogo}`}
                        alt="jandarmerie"
                        className=" "
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
                <ChevronDown size={24} className="changeColorAnim" />
                <ChevronDown size={24} className="changeColorAnim delay1" />
                <ChevronDown size={24} className="changeColorAnim delay2" />
              </div>
            </section>
            <section className="bg-dark border-tb">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mt-4">
                    <div className="text-center ">
                      <h3 className="text-white text-uppercase ">
                        ce iti putem oferi?
                      </h3>
                    </div>
                  </div>
                  <div className="mt-5 pb-5 cardsMainPage">
                    <div className="card-deck">
                      <TextCard text="Subiecte romana" className="cardStyle" />
                      <TextCard text="Subiecte matematica" className="cardStyle" />
                    </div>
                    <div className="card-deck mt-5">
                      <TextCard text="Subiecte istorie" className="cardStyle" />
                      <TextCard text="Rezolvari la probleme" className="cardStyle" />
                    </div>
                    <div className="card-deck mt-5">
                      <TextCard text="Explicatii ale raspunsurilor" className="cardStyle" />
                      <TextCard text="Support live" className="cardStyle" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="footerApp">
              <span
                className="text-white"
              >
                Incepe prin a-ti crea
                propriul cont.
              </span>
              <div className="my-auto">
                <button
                  type="button"
                  className="btn btn-primary btn-lg createAccountButton"
                  onClick={() => onRegisterClick()}
                >
                  Creeaza cont
                </button>
              </div>
            </div>
          </>
        }
      />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route element={<BaseRouter />}>
        <Route
          path="mainpage"
          element={<ProtectedRoute page={<MainPage />} redirectPage={"/login"} />} />
        <Route
          path="teste"
          element={<ProtectedRoute page={<Teste />} redirectPage={"/login"} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
