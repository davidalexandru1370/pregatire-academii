import { useContext, useState } from "react";
//@ts-ignore
import Login from "../Login/Login.tsx";
//@ts-ignore
import Register from "../Register/Register.tsx";
//@ts-ignore
import "./Authentificate.scss";
//@ts-ignore
import { ToastContext } from "../../Context/ToastContext.tsx";
interface IElement {
  element: JSX.Element;
  name: string;
}

const Authentificate = () => {
  const forms: IElement[] = [
    { name: "login", element: <Login /> },
    { name: "register", element: <Register /> },
  ];

  //@ts-ignore
  const { state, dispatch } = useContext(ToastContext);

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
                // dispatch({ corner: "top-right", type: 0 });
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
