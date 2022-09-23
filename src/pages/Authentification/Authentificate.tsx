import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
//@ts-ignore
import Login from "../Login/Login.tsx";
import Register from "../Register/Register";
import "./Authentificate.scss"

interface IElement {
    element: JSX.Element,
    name: string
}

const Authentificate = () => {
    const [authentificationForm, setAuthentificationForm] = useState<IElement>({ element: <Login />, name: "login" });
    const authFormRef = useRef<HTMLDivElement>(null);

    return (
        <div className="d-flex">
            <div className="leftSide d-flex align-items-center" style={{ height: "100vh" }} >
                <div className="formItem">
                    {authentificationForm.element}
                </div>
            </div>
            <div className="buttonsToggle">
                <button type="button"
                    className={`${authentificationForm.name === "login" ? "formButton" : "formButtonNoAnim"} `}
                    onClick={() => {
                        setAuthentificationForm({ element: <Login />, name: "login" });
                    }}>
                    Login
                </button>
                <button type="button"
                    className={`${authentificationForm.name === "register" ? "formButton" : "formButtonNoAnim"}`}
                    onClick={() => {
                        setAuthentificationForm({ element: <Register />, name: "register" })
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Authentificate;