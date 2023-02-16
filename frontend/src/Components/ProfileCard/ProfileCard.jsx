import React from "react";
import { NavDropdown } from "react-bootstrap";
import { connectionPolitistLogo } from "../../Utilities/index.js";
import "./ProfileCard.scss";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { Logout } from "../../api/UserAPI.ts";

const ProfileCard = () => {
  const navigate = useNavigate();
  async function logout() {
    await Logout();
  }

  return (
    <div className="d-flex ">
      <img
        src={`${connectionPolitistLogo}`}
        width="45px"
        height="25px"
        onClick={() => document.getElementById("item").click()}
        className="userIcon"
      />
      {/*Aici trebuie schimbat in numele utilizatorului in loc de "Contul meu"*/}
      <NavDropdown
        title="Contul meu"
        className="text-decoration-none "
        id="item"
      >
        <NavDropdown.Item className="navDropDownItem">
          <span>Contul meu</span>
          <span class="material-symbols-outlined">person</span>
        </NavDropdown.Item>
        <NavDropdown.Item
          className="navDropDownItem"
          onClick={async () => {
            await logout();
            navigate("authentificate", { replace: true });
          }}
          style={{ color: "#F64462" }}
        >
          <span>Logout</span>
          <span class="material-symbols-outlined">logout</span>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default ProfileCard;
