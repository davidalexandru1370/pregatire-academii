import { FC } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../Components/ProfileCard.jsx";

const NavigationBar: FC = () => {
    const navigate = useNavigate();
    return (
        <div className="d-none d-sm-block">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-5 container-fluid">
                        <Nav.Link className="me-4" onClick={() => navigate("mainpage", { replace: true })}>Acasa</Nav.Link>
                        <NavDropdown title="Teste" className="text-decoration-none">
                            <NavDropdown.Item onClick={() => navigate("teste", { replace: true })}>Politie</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("teste", { replace: true })}>Pompieri</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate("teste", { replace: true })}>Jandarmerie</NavDropdown.Item>
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