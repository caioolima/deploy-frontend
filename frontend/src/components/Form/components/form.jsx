import React from 'react'

const form = ({
        t, style,
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
    return (
        <div className={ style.form || style[loginMessage || registrationMessage ? "error-visible" : ""]} >
            
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

            <div class={style["password-input-container"]}>
                <input
                    type={passwordInputType}
                    className={style.entrada || style[formErrors.password && "input-error"]}
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
                    className={style["toggle-password-button"] || style[formErrors.password && "error-visible"]}
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? eyeClosedIcon : eyeOpenIcon}
                </button>
            </div>

            <button
                id="loginButton"
                value="Sign In"
                className={style.entrada && style.pink}
                onClick={handleLoginButtonClick}
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
    </div>
    )
}

export default form