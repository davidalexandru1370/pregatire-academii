import "./ForgotPassword.scss";

const ForgotPassword = () => {
  return (
    <div className="forgotPasswordContent">
      <div className="field">
        <label htmlFor="password" className="passwordLabel">
          Parola
        </label>
        <input
          type="password"
          placeholder="Parola"
          className="passwordInput"
        ></input>
      </div>
      <div className="field">
        <label htmlFor="password" className="passwordLabel">
          Repeta parola
        </label>
        <input
          type="password"
          placeholder="Repeta parola"
          className="passwordInput"
        ></input>
      </div>
      <button type="button" className="changePasswordButton">
        Schimba parola
      </button>
    </div>
  );
};

export default ForgotPassword;
