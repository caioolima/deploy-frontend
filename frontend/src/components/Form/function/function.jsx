import { useEffect} from 'react';
import axios from 'axios';
import UseState from './useState';

const Function = () => {
  const {    
        t, initialState,
        modalIsOpen, setIsOpen,
        registrationMessage, setRegistrationMessage,
        loginMessage, setLoginMessage,
        formFields, setFormFields,
        formErrors, setFormErrors,
        loginFormEmail, setLoginFormEmail,
        loginFormPassword, setLoginFormPassword,
        registrationFormEmail, setRegistrationFormEmail,
        registrationFormPassword, setRegistrationFormPassword,
        shouldCloseModal, setShouldCloseModal,
        modalStyle, setModalStyle,
        showPassword, setShowPassword,
        showPassword2, setShowPassword2,
        showConfirmPassword, setShowConfirmPassword,
        loginErrorMessage, setLoginErrorMessage,
        navigate,
        signIn,
        eyeClosedIcon,
        eyeOpenIcon
    } = UseState()
  
  const handleLoginEmailChange = (event) => {
    setLoginFormEmail(event.target.value);
    setLoginErrorMessage(""); // Limpar a mensagem de erro ao digitar no campo de e-mail
  };

  const handleLoginPasswordChange = (event) => {
    setLoginFormPassword(event.target.value);
    setLoginErrorMessage(""); // Limpar a mensagem de erro ao digitar no campo de senha
  };

  const handleRegistrationEmailChange = (event) => {
    setRegistrationFormEmail(event.target.value);
  };

  const handleRegistrationPasswordChange = (event) => {
    setRegistrationFormPassword(event.target.value);
  };

  // Função para redefinir os campos do formulário para os valores iniciais
  const resetFormFields = () => {
    setFormFields(initialState);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setShowConfirmPassword(false); // Definir showConfirmPassword como false ao abrir o modal
  };

  const handleInputChange = (field, value) => {
    console.log(`Updating ${field} with value: ${value}`);

    if (typeof value === "object" && value.phone) {
      setFormFields({
        ...formFields,
        phone: value.phone,
        country: value.country || formFields.country,
      });
    } else {
      setFormFields({ ...formFields, [field]: value });
    }

    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setRegistrationFormEmail("");
    setRegistrationFormPassword("");
    setFormFields({ ...formFields, confirmPassword: "" }); // Limpar o campo de confirmação de senha
    setShowConfirmPassword(false); // Atualizar o estado do olho para fechado ao fechar o modal
    setShowPassword2(false); // Atualizar o estado do olho para fechado ao fechar o modal
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 480;
      const modalWidth = isMobile
        ? "100%"
        : window.innerWidth <= 600
        ? "88%"
        : "70%";
      const modalHeight = isMobile
        ? "100%"
        : window.innerWidth >= 480
        ? "88%"
        : "100%";

      setModalStyle({
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: modalWidth,
        height: modalHeight,
        borderRadius: "10px",
        padding: "20px",
        overflow: "auto",
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Verifique se shouldCloseModal está definido antes de utilizá-lo
    if (shouldCloseModal !== undefined && shouldCloseModal) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
      setShouldCloseModal(false);
    }
  }, [shouldCloseModal]);

  const handleForgotPasswordClick = () => {
    navigate("/reset");
  };

  const validateAge = () => {
    const today = new Date();
    const dobDate = new Date(formFields.dob);
    let age = today.getFullYear() - dobDate.getFullYear();

    if (age < 18) {
      return t("age_restriction_error");
    }

    return null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  // No JSX, você pode definir o tipo de entrada com base no estado showPassword2
  <input
    type={showPassword2 ? "text" : "password"}
    className={`entrada ${formErrors.password && "input-error"}`}
    id="password"
    placeholder={t("password")}
    value={registrationFormPassword}
    onChange={handleRegistrationPasswordChange}
    required
  />;

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";

  const handleRegisterButtonClick = async () => {
    setRegistrationMessage("");
    setFormErrors({});
    setShouldCloseModal(false);
    const errors = {};

    const validateEmail = () => {
      const validEmailDomains = ["outlook.com", "gmail.com", "hotmail.com"];
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      const ageError = !formFields.dob
        ? t("dob_required_error")
        : validateAge();
      if (ageError) {
        errors.dob = ageError;
      }

      if (!emailRegex.test(registrationFormEmail)) {
        return t("invalid_email_error");
      }

      const [, emailDomain] = registrationFormEmail.split("@");

      if (!validEmailDomains.includes(emailDomain.toLowerCase())) {
        return t("valid_email_domains_error");
      }

      return null;
    };

    errors.username =
      formFields.username.length < 3 ? t("username_length_error") : null;
    errors.firstName =
      formFields.firstName.length < 3 ? t("first_name_length_error") : null;
    errors.lastName =
      formFields.lastName.length < 3 ? t("last_name_length_error") : null;

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    errors.password = !registrationFormPassword
      ? t("password_required_error")
      : !passwordRegex.test(registrationFormPassword)
      ? t("password_complexity_error")
      : null;

    errors.confirmPassword = !formFields.confirmPassword
      ? t("confirm_password_required_error")
      : registrationFormPassword !== formFields.confirmPassword
      ? t("password_mismatch_error")
      : null;

    errors.phone = !formFields.phone
      ? t("phone_required_error")
      : formFields.phone.length < 3
      ? t("phone_length_error")
      : null;

    const emailError = validateEmail();
    if (emailError) {
      errors.email = emailError;
    }

    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      return;
    }

    try {
      if (formFields.username !== initialState.username) {
        const userAvailability = await checkFieldAvailability(
          "username",
          formFields.username
        );
        if (!userAvailability.available) {
          setRegistrationMessage(t("username_not_available_error"));
          return;
        }
      }

      if (formFields.phone !== initialState.phone) {
        const phoneAvailability = await checkFieldAvailability(
          "phone",
          formFields.phone
        );
        if (!phoneAvailability.available) {
          setRegistrationMessage(t("phone_not_available_error"));
          return;
        }
      }

      if (registrationFormEmail !== initialState.email) {
        const emailAvailability = await checkFieldAvailability(
          "email",
          registrationFormEmail
        );
        if (!emailAvailability.available) {
          setRegistrationMessage(t("email_not_available_error"));
          return;
        }
      }

      const response = await axios.post("https://connecter-server-033a278d1512.herokuapp.com/auth/register", {
        username: formFields.username,
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        phone: formFields.phone,
        email: registrationFormEmail,
        password: registrationFormPassword,
        confirmPassword: formFields.confirmPassword,
        dob: formFields.dob,
        gender: formFields.gender,
      });

      if (response.data.success) {
        console.log("Cadastro bem-sucedido!");
        setRegistrationMessage(t("registration_success_message"));

        // Limpar os campos de email e senha
        setRegistrationFormEmail("");
        setRegistrationFormPassword("");

        // Aguarda 2 segundos antes de limpar a mensagem
        setTimeout(() => {
          setRegistrationMessage("");
        }, 3000); // 2000 milissegundos = 2 segundos

        // Aguarda mais 2 segundos antes de fechar o modal
        setTimeout(() => {
          setShouldCloseModal(true);
          resetFormFields(); // Atualize o estado para indicar que o modal deve ser fechado
        }, 4000); // 4000 milissegundos = 4 segundos (2 segundos para a mensagem + 2 segundos para fechar o modal)

        return;
      } else {
        setRegistrationMessage(t("registration_error_message"));
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationMessage(t("registration_error_message"));
    }
  };

  const handleLoginButtonClick = async () => {
    setRegistrationMessage("");
    setFormErrors({});
    setLoginErrorMessage("");

    try {
      if (!loginFormEmail || !loginFormPassword) {
        throw new Error(t("required_fields_error"));
      }

      const response = await signIn({
        email: loginFormEmail,
        password: loginFormPassword,
      });

      navigate(`/profile/${response.userId}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setLoginErrorMessage(error.response.data.error);
      } else if (error.message) {
        // Se um erro customizado foi lançado (por exemplo, campos obrigatórios não preenchidos)
        setLoginErrorMessage(error.message);
      } else {
        console.error("Erro durante o login:", error);
        setLoginErrorMessage(t("internal_server_error"));
      }
    }
  };

  // Função para verificar a disponibilidade de um campo específico
  const checkFieldAvailability = async (fieldName, value, t) => {
    try {
      const response = await axios.post(
        `https://connecter-server-033a278d1512.herokuapp.com/auth/checkAvailability`,
        {
          fieldName,
          value,
        }
      );

      return response.data; // Deve conter uma propriedade "available" indicando se está disponível ou não
    } catch (error) {
      console.error(t(`Error checking availability of ${fieldName}:`), error);
      return { available: false }; // Em caso de erro, considerar como não disponível
    }
  };
  
  return {
    // function
        handleLoginEmailChange,
        handleLoginPasswordChange,
        handleRegistrationEmailChange,
        handleRegistrationPasswordChange,
        resetFormFields,
        handleOpenModal,
        handleInputChange,
        handleCloseModal,
        handleForgotPasswordClick,
        validateAge,
        togglePasswordVisibility,
        togglePasswordVisibility2,
        toggleConfirmPasswordVisibility,
        passwordInputType,
        handleRegisterButtonClick,
        handleLoginButtonClick,
        checkFieldAvailability,
  
    // state
        t, initialState,
        modalIsOpen, setIsOpen,
        registrationMessage, setRegistrationMessage,
        loginMessage, setLoginMessage,
        formFields, setFormFields,
        formErrors, setFormErrors,
        loginFormEmail, setLoginFormEmail,
        loginFormPassword, setLoginFormPassword,
        registrationFormEmail, setRegistrationFormEmail,
        registrationFormPassword, setRegistrationFormPassword,
        shouldCloseModal, setShouldCloseModal,
        modalStyle, setModalStyle,
        showPassword, setShowPassword,
        showPassword2, setShowPassword2,
        showConfirmPassword, setShowConfirmPassword,
        loginErrorMessage, setLoginErrorMessage,
        navigate,
        signIn,
        eyeClosedIcon,
        eyeOpenIcon
    }
}

export default Function