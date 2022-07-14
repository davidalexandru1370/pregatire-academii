import React from 'react';
import {connectionUserLogo} from '../Utilities/index.js'
import {Navbar, Nav, NavDropdown } from 'react-bootstrap'
import "./ProfileCard.scss"
const ProfileCard = () => {
    return (
        <div className='d-flex'>
            <img src={`${connectionUserLogo}`} width="35px" onClick={() => document.getElementById('item').click()}/>
            {/*Aici trebuie schimbat in numele utilizatorului in loc de "Contul meu"*/}
            <NavDropdown title="Contul meu" className="text-decoration-none " id="item">
                <NavDropdown.Item >
                    Contul meu
                </NavDropdown.Item>
                <NavDropdown.Item >
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}

export default ProfileCard;
