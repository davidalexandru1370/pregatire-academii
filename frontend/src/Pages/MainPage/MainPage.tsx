import { Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import FlipBox from "../../Components/FlipBox/FlipBox";
import {
  connectionJandarmLogo,
  connectionPolitistLogo,
  connectionPompierLogo,
  connectionTestLogo,
} from "../../Utilities/index";
import "./MainPage.scss";

function MainPage() {
  let currentYear: Date = new Date();
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className="mainPageContent">
      <div className="col p-3 d-flex " style={{ backgroundColor: "#2a2d2f" }}>
        <div className="card row-md bg-dark text-light p-3 border">
          <div className="card-title ms-4">
            <b>Bine ai venit, {sessionStorage.getItem("name")}</b>
          </div>
          <div className="card-body ms-2 me-2">
            <p>Din data crearii contului si pana acum ai obtinut:</p>
            <p className="mt-2">
              <span className="material-symbols-outlined">quiz</span>{" "}
              <span>
                <span>x teste completate</span>
              </span>
            </p>
            <p className="mt-2">
              <span>
                <img />
                <span>y exercitii rezolvate</span>
              </span>
            </p>
            <p>Continua sa te pregatesti!</p>
            <Button
              variant="primary"
              className="mt-3 border"
              onClick={() => {
                navigate("/teste");
              }}
            >
              Incepe un nou test!
            </Button>
          </div>
        </div>
      </div>
      <div className="col d-flex  flex-column align-items-center p-3  mainPageHeroSection">
        <p className="fs" style={{ color: "blueviolet" }}>
          Alege categoria pentru care vrei sa te pregatesti
        </p>
        <div
          className="row d-flex justify-content-around"
          style={{ width: "100%" }}
        >
          <FlipBox
            width="300"
            height="450"
            frontText={[
              <img src={connectionPolitistLogo} style={{ width: "200px" }} />,
              <span className="text-primary fs fw-bold">POLITIE</span>,
            ]}
            rearText={[<Button>Incepe!</Button>]}
          />
          <FlipBox
            width="300"
            height="450"
            className=""
            frontText={[
              <img src={connectionPompierLogo} style={{ width: "200px" }} />,
              <span className="text-danger fs fw-bold">POMPIERI</span>,
            ]}
            rearText={[<Button>Incepe!</Button>]}
          />
          <FlipBox
            width="300"
            height="450"
            className=""
            frontText={[
              <img src={connectionJandarmLogo} style={{ width: "200px" }} />,
              <span className="text-primary fs fw-bold">JANDARMERIE</span>,
            ]}
            rearText={[
              <img
                src={connectionTestLogo}
                style={{ width: "150px", marginLeft: "30px" }}
              />,
              <Button>Incepe!</Button>,
            ]}
          />
        </div>
      </div>
      <div className="bg-dark d-flex justify-content-center">
        <p className="text-white mt-2">
          {" "}
          © Copyright {currentYear.getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default MainPage;
