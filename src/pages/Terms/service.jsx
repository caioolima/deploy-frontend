import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/footer.jsx";
import styles from "./service.module.css"; // Importando o CSS Module

function TermosDeServico() {
  const { t } = useTranslation();
  const userDataLoaded = true; // ou qualquer outra maneira de verificar se os dados do usuário foram carregados

  useEffect(() => {
    // Aplica overflow: hidden ao elemento html para remover o scroll
    document.documentElement.style.overflowX = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <>
      {userDataLoaded && (
        <div>
          <div className={styles.logoTerm}>
            <Link to="/home">ConnecterLife</Link>
          </div>
          <hr />
          <div className={styles.highlight}>
            <p className={styles.paragraph}>{t("terms_of_service")}</p>

            <h1 className={styles.descriptionText}>
              <p>{t("description-text")}</p>
            </h1>
            {/* Seção 1 */}
            <div className={styles.section}>
              <h2>1. {t("servicesoffered")}</h2>
              <p>{t("mission")}</p>
            </div>

            {/* Seção 2 */}
            <div className={styles.section}>
              <h2>2. {t("tecnologies")}</h2>
              <p>{t("offerservices")}</p>
            </div>

            {/* Seção 3 */}
            <div className={styles.section}>
              <h2>3. {t("permissions")}</h2>
              <p>{t("sharingcontent")}</p>
            </div>

            {/* Seção 4 */}
            <div className={styles.section}>
              <h2>4. {t("reportingchannel")}</h2>
              <p>{t("userreport")}</p>
            </div>

            {/* Seção 5 */}
            <div className={styles.section}>
              <h2>5. {t("accountdeletion")}</h2>
              <p>{t("personaldeletion")}</p>
            </div>

            {/* Rodapé */}
            <p className={styles.acknowledgment}>{t("revisedterms")}</p>
            <p className={styles.acknowledgment}>{t("favoritecommunity")}</p>
          </div>
    
          <Footer />
        </div>
      )}
    </>
  );
}

export default TermosDeServico;
