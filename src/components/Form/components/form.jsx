import React from "react";

const Form = ({
  t,
  style,
  loginMessage,
  loginFormEmail,
  loginFormPassword,
  loginErrorMessage,
  registrationMessage,
  formErrors,
  passwordInputType,
  setLoginMessage,
  handleLoginEmailChange,
  handleLoginPasswordChange,
  handleLoginButtonClick,
  handleForgotPasswordClick,
  handleOpenModal,
  togglePasswordVisibility,
  showPassword,
  eyeClosedIcon,
  eyeOpenIcon,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginButtonClick();
  };

  return (
    <form
      className={
        style.form ||
        style[loginMessage || registrationMessage ? "error-visible" : ""]
      }
      onSubmit={handleSubmit}
    >
      <input
        id="email-login"
        type="text"
        className={style.entrada || style[formErrors.email && "input-error"]}
        placeholder={t("enter_email")}
        value={loginFormEmail}
        onChange={(e) => {
          handleLoginEmailChange(e);
          setLoginMessage("");
        }}
        required
      />

      <div className={style["password-input-container"]}>
        <input
          type={passwordInputType}
          className={
            style.entrada || style[formErrors.password && "input-error"]
          }
          id="password-login"
          placeholder={t("enter_password")}
          value={loginFormPassword}
          onChange={(e) => {
            handleLoginPasswordChange(e);
            setLoginMessage("");
          }}
          required
        />
        <button
          type="button"
          className={
            style["toggle-password-button"] ||
            style[formErrors.password && "error-visible"]
          }
          onClick={togglePasswordVisibility}
        >
          {showPassword ? eyeClosedIcon : eyeOpenIcon}
        </button>
      </div>

      <button
        type="submit"
        id="loginButton"
        className={style.entrada && style.pink}
      >
        {t("login")}
      </button>

      {loginErrorMessage && (
        <p className={style["login-message"]}>{loginErrorMessage}</p>
      )}

      <span
        onClick={handleForgotPasswordClick}
        className={style["forgot-password-link"]}
      >
        {t("forgot_password")}
      </span>

      <div className={style["line"]}></div>
      <button
        id="create-account-button"
        type="button"
        className={style["white-btn"]}
        onClick={handleOpenModal}
      >
        {t("create_account")}
      </button>
    </form>
  );
};

export default Form;
