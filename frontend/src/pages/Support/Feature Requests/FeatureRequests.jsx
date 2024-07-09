import React from "react";
import styles from "./FeatureRequests.module.css";
import { useTranslation } from "react-i18next"; // Importe o hook useTranslation
import Footer from "../../../components/Footer/footer.jsx";

const FeatureRequests = () => {
  const { t } = useTranslation(); // Use o hook useTranslation para obter a função t()
  
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
            {t(
              "We are constantly looking to improve our platform. If you have a feature request, please let us know!"
            )}
          </p>
          <form className={styles.requestForm}>
            <div className={styles.formGroup}>
              <label htmlFor="feature">{t("Feature")}</label>
              <input type="text" id="feature" name="feature" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="details">{t("Details")}</label>
              <textarea id="details" name="details" required />
            </div>
            <button type="submit" className={styles.submitButton}>
              {t("Submit")}
            </button>
          </form>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default FeatureRequests;
