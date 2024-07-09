import style from '../form.module.css'
import Modal from './modal';
import Form from './form';
import "react-phone-number-input/style.css";

const Form_Side = (
  {
    t,
    loginMessage,
    loginFormEmail,
    loginFormPassword,
    loginErrorMessage,
    setFormErrors,
    registrationMessage,
    registrationFormEmail,
    registrationFormPassword,
    formErrors,
    formFields,
    passwordInputType,
    setLoginMessage,
    handleLoginEmailChange,
    handleLoginPasswordChange,
    handleLoginButtonClick,
    handleForgotPasswordClick,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleRegistrationEmailChange,
    handleRegistrationPasswordChange,
    handleRegisterButtonClick,
    togglePasswordVisibility,
    togglePasswordVisibility2,
    toggleConfirmPasswordVisibility,
    showPassword,
    showPassword2,
    showConfirmPassword,
    eyeClosedIcon,
    eyeOpenIcon,
    modalIsOpen,
    modalStyle,
  }) => {

  

  return (
    <section className={style["form-side"]}>
      <Form
          t={t} 
          style={style}
          loginMessage={loginMessage}
          loginFormEmail={loginFormEmail}
          loginFormPassword={loginFormPassword}
          loginErrorMessage={loginErrorMessage}
          registrationMessage={registrationMessage}
          formErrors={formErrors}
          passwordInputType={passwordInputType}
          setLoginMessage={setLoginMessage}
          handleLoginEmailChange={handleLoginEmailChange}
          handleLoginPasswordChange={handleLoginPasswordChange}
          handleLoginButtonClick={handleLoginButtonClick}
          handleForgotPasswordClick={handleForgotPasswordClick}
          handleOpenModal={handleOpenModal}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
          eyeClosedIcon={eyeClosedIcon}
          eyeOpenIcon={eyeOpenIcon}
      />

      <div className={style["help"]}>
        <p>
          {t("need_help")}
          <a href="/#"> {t("click_here")}.</a>
        </p>
      </div>

      <Modal
          t={t}
          style={style}
          setFormErrors={setFormErrors}
          registrationMessage={registrationMessage}
          registrationFormEmail={registrationFormEmail}
          registrationFormPassword={registrationFormPassword}
          formErrors={formErrors}
          formFields={formFields}
          handleCloseModal={handleCloseModal}
          handleInputChange={handleInputChange}
          handleRegistrationEmailChange={handleRegistrationEmailChange}
          handleRegistrationPasswordChange={handleRegistrationPasswordChange}
          handleRegisterButtonClick={handleRegisterButtonClick}
          togglePasswordVisibility2={togglePasswordVisibility2}
          toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          showPassword2={showPassword2}
          showConfirmPassword={showConfirmPassword}
          eyeClosedIcon={eyeClosedIcon}
          eyeOpenIcon={eyeOpenIcon}
          modalIsOpen={modalIsOpen}
          modalStyle={modalStyle}
      />
    </section>
  )
}

export default Form_Side