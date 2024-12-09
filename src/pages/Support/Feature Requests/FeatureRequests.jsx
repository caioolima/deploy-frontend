import React, { useState, useEffect } from "react";
import styles from "./FeatureRequests.module.css";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer/footer.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.js";

const FeatureRequests = () => {
  const { t } = useTranslation();
  const { userLanguage } = useLanguage(); // Obtém o idioma do contexto
  const [formData, setFormData] = useState({
    email: "",
    feature: "",
    details: "",
  });
  const [statusMessage, setStatusMessage] = useState(""); // Estado para mensagem de status

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://server-repository.onrender.com/feature-requests/feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, language: userLanguage }), // Envia o idioma com os dados do formulário
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      // Atualiza a mensagem de status com o resultado da requisição
      setStatusMessage(result.message || t("Feature request submitted successfully!"));
      
      // Limpa os campos do formulário após o envio
      setFormData({
        email: "",
        feature: "",
        details: "",
      });

    } catch (error) {
      // Atualiza a mensagem de status com a mensagem de erro
      setStatusMessage(t("Error submitting feature request. Please try again later."));
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Aplica overflow: hidden ao elemento html para remover o scroll
    document.documentElement.style.overflowX = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrap}>
        <div className={styles.logo}>
          <a href="/home">{t("connecterLife")}</a>
        </div>
        <hr />
        <div className={styles.featureRequests}>
          <h2>{t("Feature Requests")}</h2>
          <p>
            {t("We are constantly looking to improve our platform. If you have a feature request, please let us know!")}
          </p>
          <form className={styles.requestForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">{t("Email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="feature">{t("Feature")}</label>
              <input
                type="text"
                id="feature"
                name="feature"
                value={formData.feature}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="details">{t("Details")}</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {t("Submit")}
            </button>
          </form>
          {/* Exibe a mensagem de status */}
          {statusMessage && (
            <div className={styles.statusMessage}>
              {statusMessage}
            </div>
          )}
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default FeatureRequests;
