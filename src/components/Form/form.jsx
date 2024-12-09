import FormSide from "./components/formSide";
import Function from "./function/function";

function LoginForm() {
  const {
    // function
        handleLoginEmailChange,
        handleLoginPasswordChange,
        handleRegistrationEmailChange,
        handleRegistrationPasswordChange,
   
        handleOpenModal,
        handleInputChange,
        handleCloseModal,
        handleForgotPasswordClick,
      
        togglePasswordVisibility,
        togglePasswordVisibility2,
        toggleConfirmPasswordVisibility,
        passwordInputType,
        handleRegisterButtonClick,
        handleLoginButtonClick,
      

    // state
        t,
        modalIsOpen, 
        registrationMessage,
        loginMessage, setLoginMessage,
        formFields, 
        formErrors, setFormErrors,
        loginFormEmail,
        loginFormPassword, 
        registrationFormEmail, 
        registrationFormPassword, 
        modalStyle, 
        showPassword,
        showPassword2, 
        showConfirmPassword, 
        loginErrorMessage, 
        eyeClosedIcon,
        eyeOpenIcon
  } = Function()

  return (
  <FormSide 
      t={t}
      loginMessage={loginMessage}
      loginFormEmail={loginFormEmail}
      loginFormPassword={loginFormPassword}
      loginErrorMessage={loginErrorMessage}
      setFormErrors={setFormErrors}
      registrationMessage={registrationMessage}
      registrationFormEmail={registrationFormEmail}
      registrationFormPassword={registrationFormPassword}
      formErrors={formErrors}
      formFields={formFields}
      passwordInputType={passwordInputType}
      setLoginMessage={setLoginMessage}
      handleLoginEmailChange={handleLoginEmailChange}
      handleLoginPasswordChange={handleLoginPasswordChange}
      handleLoginButtonClick={handleLoginButtonClick}
      handleForgotPasswordClick={ handleForgotPasswordClick}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleInputChange={handleInputChange}
      handleRegistrationEmailChange={handleRegistrationEmailChange}
      handleRegistrationPasswordChange={handleRegistrationPasswordChange}
      handleRegisterButtonClick={handleRegisterButtonClick}
      togglePasswordVisibility={togglePasswordVisibility}
      togglePasswordVisibility2={togglePasswordVisibility2}
      toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
      showPassword={showPassword}
      showPassword2={showPassword2}
      showConfirmPassword={showConfirmPassword}
      eyeClosedIcon={eyeClosedIcon}
      eyeOpenIcon={eyeOpenIcon}
      modalIsOpen={modalIsOpen}
      modalStyle={modalStyle}
  />
)
}

export default LoginForm;