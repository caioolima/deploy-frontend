import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({ closeMenu }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    localStorage.setItem("userLanguage", language); // Optional: Save language preference in local storage
  };

  return (
    <div className="language-selector">
      <h3>{t("select_language")}</h3>
      <button
        onClick={() => changeLanguage("pt-BR")}
        className={selectedLanguage === "pt-BR" ? "active" : ""}
      >
        {t("portuguese")}
      </button>
      <button
        onClick={() => changeLanguage("en-US")}
        className={selectedLanguage === "en-US" ? "active" : ""}
      >
        {t("english")}
      </button>
      <button
        onClick={() => changeLanguage("es-ES")}
        className={selectedLanguage === "es-ES" ? "active" : ""}
      >
        {t("spanish")}
      </button>
    </div>
  );
};

export default LanguageSelector;
