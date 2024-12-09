import React from "react";
import SupportInfo from "../Support Info/SupportInfo";
import { useTranslation } from "react-i18next";
import styles from "./SupportPage.module.css";
import Footer from "../../../components/Footer/footer.jsx";

const SupportPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/home">{t("connecterLife")}</a>
      </div>
      <hr />
      <div className={styles.supportPage}>
        <header className={styles.header}>
          <h1>{t("Support Center")}</h1>
        </header>
        <main className={styles.main}>
          <SupportInfo />
        </main>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default SupportPage;
