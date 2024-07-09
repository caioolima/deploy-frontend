import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./resets_password.module.css";
import Footer from "../../components/Footer/footer.jsx";

const ResetPassword = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [email, code]);

  const handleErrors = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(t(data.error) || t("unknown_error"));
    }
    return data;
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setSendingEmail(true);

    try {
      const response = await fetch(
        "https://connecter-server-033a278d1512.herokuapp.com/auth/requestPasswordReset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await handleErrors(response);
      setValidCode(true);
      setMessage(t("email_sent_successfully"));
    } catch (error) {
      setMessage(t("user_not_found"));
    } finally {
      setSendingEmail(false);
    }
  };

  const verifyCode = async () => {
    setVerifyingCode(true);

    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/auth/verifyCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: code.join("") }),
        }
      );

      const data = await handleErrors(response);
      if (data.success) {
        setShowPasswordFields(true);
        setMessage("");
      } else {
        setMessage(t("unknown_error"));
      }
    } catch (error) {
      setMessage(t("code_invalid"));
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResettingPassword(true);

    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/auth/resetPassword/${code.join(
          ""
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await handleErrors(response);
      setMessage(t("password_changed"));
      setValidCode(false);

      setEmail("");
      setCode(Array(6).fill(""));
      setPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);
      navigate("/home");
    } catch (error) {
      setMessage(t("error_resetting_password"));
    } finally {
      setResettingPassword(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.match(/[0-9]/) || value === "") {
      const newCode = [...code];
      newCode[index] = value;

      if (code[index] !== value) {
        setCode(newCode);

        if (value !== "" && index < 5) {
          setTimeout(() => {
            document.getElementById(`code-input-${index + 1}`).focus();
          }, 0);
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        if (index > 0) {
          document.getElementById(`code-input-${index - 1}`).focus();
        }
      }
    } else if (e.key.length === 1 && e.key.match(/[0-9]/)) {
      handleCodeChange(index, e.key);
    }
  };

  const checkPasswordsMatch = () => {
    // Verifica se ambas as senhas coincidem e se o campo de confirmação foi tocado
    if (confirmPasswordTouched) {
      setPasswordsMatch(password === confirmPassword);
    }
  };

  useEffect(() => {
    checkPasswordsMatch();
  }, [password, confirmPassword]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.logoTerm}>
          <Link to="/home">Connecter Life</Link>
        </div>
        <hr />
        <div className={styles.containerForm}>
          {!validCode && (
            <>
              <h1 className={styles.title}>{t("reset_password_title")}</h1>
              <p className={styles.description}>
                {t("reset_password_description")}
              </p>
            </>
          )}

          {!validCode && (
            <form onSubmit={resetPassword}>
              <input
                className={styles.emailInput}
                type="email"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className={styles.submitButton}
                type="submit"
                disabled={sendingEmail}
              >
                {sendingEmail ? t("sending_email") : t("send_recovery_email")}
              </button>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          )}

          {validCode && !showPasswordFields && (
            <form onSubmit={handleResetPassword} className={styles.codeForm}>
              <p className={styles.codeInstruction}>
                {t("enter_received_code")}
              </p>
              <div className={styles.codeInputs}>
                {code.map((value, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    className={styles.codeInput}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    required
                  />
                ))}
              </div>

              <button
                className={styles.verifyButton}
                type="button"
                onClick={verifyCode}
                disabled={verifyingCode}
              >
                {verifyingCode ? t("verifying_code") : t("verify_code")}
              </button>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          )}

          {showPasswordFields && (
            <form
              onSubmit={handleResetPassword}
              className={styles.passwordForm}
            >
              <p className={styles.passwordInstruction}>
                {t("enter_new_password")}
              </p>
              <input
                className={styles.passwordInput}
                type="password"
                placeholder={t("new_password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className={styles.passwordInput}
                type="password"
                placeholder={t("confirm_password_placeholder")}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordTouched(true); // Marcar o campo como tocado
                }}
                onBlur={() => setConfirmPasswordTouched(true)} // Marcar o campo como tocado se perder o foco
                required
              />
              <button
                className={styles.verifyButton}
                type="submit"
                disabled={resettingPassword || !passwordsMatch}
              >
                {resettingPassword
                  ? t("resetting_password")
                  : t("reset_password")}
              </button>
              {!passwordsMatch && confirmPasswordTouched && (
                <p className={styles.message}>{t("passwords_do_not_match")}</p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ResetPassword;
