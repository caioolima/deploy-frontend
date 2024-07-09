import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer/footer.jsx";

const FAQ = () => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedItem(index === expandedItem ? null : index);
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/home">{t("connecterLife")}</a>
      </div>
      <hr />
      <div className={styles.faqContainer}>
        <div className={styles.faq}>
          <h2>{t("Frequently Asked Questions")}</h2>
          <div className={styles.faqItem}>
            <button
              aria-expanded={expandedItem === 0}
              onClick={() => toggleAnswer(0)}
            >
              <h3>{t("How do I create an account?")}</h3>
              <span className={expandedItem === 0 ? styles.rotated : ""}>➔</span>
            </button>
            {expandedItem === 0 && (
              <p>
                {t(
                  "To create an account, click the sign up button on the home page and fill out the registration form."
                )}
              </p>
            )}
          </div>
          <div className={styles.faqItem}>
            <button
              aria-expanded={expandedItem === 1}
              onClick={() => toggleAnswer(1)}
            >
              <h3>{t("How can I change my password?")}</h3>
              <span className={expandedItem === 1 ? styles.rotated : ""}>➔</span>
            </button>
            {expandedItem === 1 && (
              <p>
                {t(
                  "On the home page, you will find the option to change your password, after that you will fill out the form by entering your account email and following the step by step instructions that will be shown."
                )}
              </p>
            )}
          </div>
          <div className={styles.faqItem}>
            <button
              aria-expanded={expandedItem === 2}
              onClick={() => toggleAnswer(2)}
            >
              <h3>{t("Where can I find the privacy policy?")}</h3>
              <span className={expandedItem === 2 ? styles.rotated : ""}>➔</span>
            </button>
            {expandedItem === 2 && (
              <p>
                {t(
                  "Our privacy policy is available at the bottom of every page, just click on the link 'Policy of Privacy'."
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default FAQ;
