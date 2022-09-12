import React, { FC } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import ProfileCard from "../../Components/ProfileCard.jsx";

const NavigationBar: FC = () => {
    return (
        <div className="d-none d-sm-block">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-5 container-fluid">
                        <Nav.Link className="me-4">Modul de pregatire</Nav.Link>
                        <NavDropdown title="Teste" className="text-decoration-none">
                            <NavDropdown.Item href="/">Politie</NavDropdown.Item>
                            <NavDropdown.Item href="/">Pompieri</NavDropdown.Item>
                            <NavDropdown.Item href="/">Jandarmerie</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item className="ms-auto">
                            <ProfileCard />
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar;