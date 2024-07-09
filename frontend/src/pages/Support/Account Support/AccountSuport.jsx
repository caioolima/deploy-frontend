import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AccountSupport.module.css";
import Footer from "../../../components/Footer/footer.jsx";

const AccountSupport = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logo}>
          <a href="/home">{t("connecterLife")}</a>
        </div>
        <hr />
        <h2 className={styles.TitleSupport}>{t("Account Support")}</h2>
        <div className={styles.accountSupport}>
          <p>
            {t(
              "If you have issues with your account, please refer to the following resources:"
            )}
          </p>
          <ul>
            <li>
              <a href="/reset">{t("Reset your password")}</a>
            </li>
            <li>
              <a href="/support/faq">
                {t(
                  "Visit our FAQs to get answers to your questions, if you still have questions, don't hesitate to get in touch."
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default AccountSupport;
