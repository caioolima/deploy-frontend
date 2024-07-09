import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

const initialState = {
  username: "",
  firstName: "",
  lastName: "",
  country: "BR",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  gender: "masculino",
};

const modalStyleObj = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "90%", // Define a largura máxima como uma porcentagem
  maxHeight: "90%", // Define a altura máxima como uma porcentagem
  overflow: "auto", // Permite rolagem se o conteúdo exceder o tamanho do modal
};

const UseState = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [formFields, setFormFields] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [loginFormEmail, setLoginFormEmail] = useState("");
  const [loginFormPassword, setLoginFormPassword] = useState("");
  const [registrationFormEmail, setRegistrationFormEmail] = useState("");
  const [registrationFormPassword, setRegistrationFormPassword] = useState("");
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const [modalStyle, setModalStyle] = useState(modalStyleObj);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const eyeClosedIcon = "\u{1F441}\u{FE0F}";
  const eyeOpenIcon = "\u{1F441}\u{FE0F}\u{200D}\u{1F5E8}\u{FE0F}";

  // Function to handle registration success
  const handleRegistrationSuccess = () => {
    setRegistrationMessage("Cadastro concluído com sucesso");
    setRegistrationSuccess(true);
  };

  // Example function to handle registration
  const handleRegistration = async () => {
    try {
      // Registration logic here
      handleRegistrationSuccess();
    } catch (error) {
      setRegistrationMessage("Erro ao cadastrar");
    }
  };

  // Close modal if registration is successful
  if (registrationSuccess && shouldCloseModal) {
    setIsOpen(false);
    setShouldCloseModal(false);
  }

  return {
    t,
    initialState,
    modalIsOpen,
    setIsOpen,
    registrationMessage,
    setRegistrationMessage,
    loginMessage,
    setLoginMessage,
    formFields,
    setFormFields,
    formErrors,
    setFormErrors,
    loginFormEmail,
    setLoginFormEmail,
    loginFormPassword,
    setLoginFormPassword,
    registrationFormEmail,
    setRegistrationFormEmail,
    registrationFormPassword,
    setRegistrationFormPassword,
    shouldCloseModal,
    setShouldCloseModal,
    modalStyle,
    setModalStyle,
    showPassword,
    setShowPassword,
    showPassword2,
    setShowPassword2,
    showConfirmPassword,
    setShowConfirmPassword,
    loginErrorMessage,
    setLoginErrorMessage,
    navigate,
    signIn,
    eyeClosedIcon,
    eyeOpenIcon,
  };
};

export default UseState;
