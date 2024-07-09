import React from "react";
import style from "./introduction.module.css";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import i18n from "../../components/Language/i18n"; // Ajuste o caminho conforme a estrutura real
import "../../components/Footer/footer.css";
import Footer from "../../components/Footer/footer";


const Introduction = () => {
  const { t } = useTranslation();
  return (
    <div className={style.abc}>
      <h1 className={style.abcd}>{t("title")}</h1>
      <div className={style.backgroundImage}>
        <div className={style.introContent}>
          <div className={style.introInfo}>
            <h2 className={style.introH2}>
              {t("question")}
            </h2>

            <p className={style.introP}>
              {t("description")}
            </p>
            <Link to="/home">
              <button className={style.vamosNessaButton}>
                {t("button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.exploreInfo}>
        <h2 className={style.mainTitle}>
          {t("explore_title")}
        </h2>
        <h2 className={style.subTitle}>
          {t("how_it_works")}
        </h2>
        <div className={style.stepsContainer}>
          <div className={style.step}>
            <div className={style.stepNumber}>#1</div>
            <div className={style.stepText}>
              {t("step1")}
            </div>
          </div>
          <div className={style.step}>
            <div className={style.stepNumber}>#2</div>
            <div className={style.stepText}>
              {t("step2")}
            </div>
          </div>
          <div className={style.step}>
            <div className={style.stepNumber}>#3</div>
            <div className={style.stepText}>
              {t("step3")}
            </div>
          </div>
          <div className={style.step}>
            <div className={style.stepNumber}>#4</div>
            <div className={style.stepText}>
              {t("step4")}
            </div>
          </div>
          <div className={style.lines}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
          </div>
        </div>
      </div>
      <div className={style.connectWithTravelers}>
        <div className={style.backgroundImage2}></div>
        <h2 className={style.connectTextH2}>{t("connect_with_travelers")}</h2>
        <p className={style.connectTextP}>
          {t("connect_text")}
        </p>
      </div>
      <div className={style.ctaSection}>
        <div className={style.ctaContent}>
          <p>{t("cta_text")}</p>
        </div>
        <Link to="/home">
          <button className={style.vamoComigoButton}>
            {t("button")}
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Introduction;