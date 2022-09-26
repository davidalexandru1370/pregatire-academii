import "./ForgotPassword.scss";

const ForgotPassword = () => {
  return (
    <div className="forgotPasswordContent">
      <div className="field">
        <label htmlFor="password" className="passwordLabel">
          Parola
        </label>
        <input
          type="text"
          placeholder="Parola"
          className="passwordInput"
        ></input>
      </div>
      <div className="field">
        <label htmlFor="password" className="passwordLabel">
          Repeta Parola
        </label>
        <input
          type="text"
          placeholder="Repeta Parola"
          className="passwordInput"
        ></input>
      </div>
    </div>
  );
};

export default ForgotPassword;
