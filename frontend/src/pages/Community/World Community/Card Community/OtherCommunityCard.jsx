import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./OtherCommunityCard.module.css";

const OtherCommunityCard = ({ comunidade, numeroMembros, flagMappings, t }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Altere este valor para o tempo real de carregamento dos dados
  }, []);

  const flagUrl =
    flagMappings[comunidade.country.toLowerCase()] || comunidade.image;

  return (
    <div className={styles.otherCommunityCard}>
      {loading ? (
        <p className={styles.loadingMessage}>{t("loading")}</p>
      ) : (
        <div className={styles.card}>
          <div
            className={styles.carousel}
            style={{
              backgroundImage: `url(${flagUrl})`,
            }}
          >
            <div className={styles.overlay}>
              <span className={styles.countryName}>
                {t(`${comunidade.country}`)}
              </span>
            </div>
          </div>
          <div className={styles.cardContent}>
            {numeroMembros[comunidade._id] !== undefined ? (
              <p className={styles.memberCount}>
                {t("members", { count: numeroMembros[comunidade._id] })}
              </p>
            ) : (
              <p className={styles.memberCount}>{t("noCommunitiesUser")}</p>
            )}
            <Link
              to={`/community/${encodeURIComponent(comunidade.country)}/${
                comunidade._id
              }`}
            >
              <div className={styles.buttonContainer}>
                <button className={styles.joinButton}>{t("join")}</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherCommunityCard;
