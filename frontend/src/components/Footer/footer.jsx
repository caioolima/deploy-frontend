import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../Language/i18n"; // Adjust the path as necessary
import { Link } from "react-router-dom";
import "../Footer/footer.css";
import "../css/main.css";
import "../css/resets.css";

function Footer({ userId }) {
  const { t } = useTranslation();
  const [userLanguage, setUserLanguage] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("userLanguage");
    if (savedLanguage) {
      setUserLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      getUserLanguage();
    }
  }, []);

  const changeLanguage = async (language) => {
    setUserLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("userLanguage", language);
    syncLanguageWithBackend(language);
  };

  const getUserLanguage = async () => {
    try {
      const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/auth/${userId}/language`);
      if (response.ok) {
        const data = await response.json();
        setUserLanguage(data.language);
        i18n.changeLanguage(data.language);
        localStorage.setItem("userLanguage", data.language);
      } else {
        console.error("Failed to get user language");
      }
    } catch (error) {
      console.error("Error fetching user language:", error);
    }
  };

  const syncLanguageWithBackend = async (language) => {
    if (userId && navigator.onLine) {
      try {
        const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/auth/language`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, language }),
        });
        if (!response.ok) {
          console.error("Failed to sync language with backend");
        }
      } catch (error) {
        console.error("Error syncing language with backend:", error);
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-terms">
        <Link to="/terms">{t("terms_of_service")}</Link>
        <a href="/support-page">{t("help")}</a>
        <a href="/#">{t("about")}</a>
      </div>
      <div className="language-buttons">
        <button
          className={userLanguage === "pt-BR" ? "active" : ""}
          onClick={() => changeLanguage("pt-BR")}
        >
          {t("portuguese")}
        </button>
        <button
          className={userLanguage === "en-US" ? "active" : ""}
          onClick={() => changeLanguage("en-US")}
        >
          {t("english")}
        </button>
        <button
          className={userLanguage === "es-ES" ? "active" : ""}
          onClick={() => changeLanguage("es-ES")}
        >
          {t("spanish")}
        </button>
      </div>
      <div className="footer-info">
        <p className="footer-copy">&copy; 2023 ConnecterLife</p>
      </div>
    </footer>
  );
}

export default Footer;
