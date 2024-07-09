import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./privacy.module.css";
import Footer from "../../components/Footer/footer.jsx";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
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
    <div>
      <div className={styles.logoTerm}>
        <Link to="/home">{t("connecterLife")}</Link>
      </div>
      <hr />

      <div className={styles.privacyContainer}>
        <div className={styles.privacyPolicyContainer}>
          <h1>{t("policyTitle")}</h1>

          <p className={styles.date}>{t("effectiveDate")}</p>

          <p>{t("introText")}</p>

          <button className={styles.privacyQuestion} onClick={toggleAnswer}>
            {t("question1")}{" "}
            <span
              className={`${styles.arrow} ${
                showAnswer ? styles.up : styles.down
              }`}
            >
              ➔
            </span>
          </button>

          {showAnswer && <p className={styles.privacyAnswer}>{t("answer")}</p>}

          <h2 className={styles.privacySection}>{t("sectionOne")}</h2>
          <p className={styles.privacyContent}>{t("sectionOneContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionTwo")}</h2>
          <p className={styles.privacyContent}>{t("sectionTwoContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionThree")}</h2>
          <p className={styles.privacyContent}>{t("sectionThreeContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionFour")}</h2>
          <p className={styles.privacyContent}>{t("sectionFourContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionFive")}</h2>
          <p className={styles.privacyContent}>{t("sectionFiveContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionSix")}</h2>
          <p className={styles.privacyContent}>{t("sectionSixContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionSeven")}</h2>
          <p className={styles.privacyContent}>{t("sectionSevenContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionEight")}</h2>
          <p className={styles.privacyContent}>{t("sectionEightContent")}</p>

          <h2 className={styles.privacySection}>{t("sectionNine")}</h2>
          <p className={styles.privacyContent}>{t("sectionNineContent")}</p>

          <p className={styles.privacyContent}>{t("contactEmail")}</p>
          <p className={styles.privacyContent}>{t("supportEmail")}</p>

          <h2 className={styles.privacySection}>{t("brazilPrivacyNotice")}</h2>
          <p className={styles.privacyContent}>
            {t("brazilPrivacyNoticeContent")}
          </p>

          <p className={styles.privacyContent}>{t("dataController")}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
