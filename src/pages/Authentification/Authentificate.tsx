import { useState } from "react";
import { Button } from "react-bootstrap";
//@ts-ignore
import Login from "../Login/Login.tsx";
import Register from "../Register/Register";
import "./Authentificate.scss"

const Authentificate = () => {
    const [authentificationForm, setAuthentificationForm] = useState<JSX.Element>(<Login />);
    return (
        <div className="d-flex">
            <div className="leftSide d-flex align-items-center" style={{ height: "100vh" }} >
                <div className="formItem">
                    {authentificationForm}
                </div>
            </div>
            <div className="buttonsToggle">
                <button type="button"
                    className="formButton"
                    onClick={() => {
                        setAuthentificationForm(<Login />);
                    }}>
                    Login
                </button>
                <button type="button"
                    className="formButton"
                    onClick={() => {
                        setAuthentificationForm(<Register />)
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Authentificate;