import { useState } from "react";
//@ts-ignore
import Login from "../Login/Login.tsx";
import Register from "../Register/Register";

const Authentificate = () => {
    const [authentificationForm, setAuthentificationForm] = useState<JSX.Element>(<Login />);
    return (
        <div className="container-fluid">
            <div className="row align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-4 d-flex flex-column align-items-center">
                    {authentificationForm}
                </div>
            </div>
        </div>
    )
}

export default Authentificate;