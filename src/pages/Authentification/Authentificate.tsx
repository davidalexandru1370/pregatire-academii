import { useRef, useState } from "react";
//@ts-ignore
import Login from "../Login/Login.tsx";
//@ts-ignore
import Register from "../Register/Register.tsx";
//@ts-ignore
import ForgotPassword from "../ForgotPassword/ForgotPassword.tsx";
import "./Authentificate.scss";

interface IElement {
  element: JSX.Element;
  name: string;
}

const Authentificate = () => {
  const forms: IElement[] = [
    { name: "login", element: <Login /> },
    { name: "register", element: <Register /> },
  ];
  const [authentificationForm, setAuthentificationForm] = useState<IElement>({
    element: <Login />,
    name: "login",
  });

  return (
    <div className="d-flex">
      <div
        className="leftSide d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="formItem">{authentificationForm.element}</div>
      </div>
      <div className="buttonsToggle">
        {forms.map((form) => {
          return (
            <button
              className={`${
                authentificationForm.name === form.name
                  ? "formButton"
                  : "formButtonNoAnim"
              }`}
              onClick={() => {
                setAuthentificationForm(form);
              }}
            >
              {form.name[0].toUpperCase() + form.name.substring(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Authentificate;
