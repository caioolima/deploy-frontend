import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imagemTermosServico from "../../assets/imagemTermosServico.jpg";
import imagemPoliticaPrivacidade from "../../assets/imagemPoliticaPrivacidade.jpg";
import imagemRegrasComunidade from "../../assets/imagemRegrasComunidade.jpg";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/footer.jsx";
import styles from "./terms.module.css";

function Terms() {
  const { t } = useTranslation();
  const [imagesLoaded, setImagesLoaded] = useState(false); // Estado para controlar o carregamento das imagens

  useEffect(() => {
    // Verifica se as imagens já foram carregadas no navegador
    const cachedImages = checkCachedImages();

    if (cachedImages) {
      setImagesLoaded(true);
    } else {
      // Se as imagens não estiverem em cache, carrega elas
      preloadImages();
    }

    // Aplica overflow: hidden ao elemento html para remover o scroll horizontal
    document.documentElement.style.overflowX = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  // Verifica se as imagens já estão em cache no navegador
  const checkCachedImages = () => {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.src = imagemTermosServico;
    img2.src = imagemPoliticaPrivacidade;
    img3.src = imagemRegrasComunidade;

    return img1.complete && img2.complete && img3.complete;
  };

  // Carrega as imagens
  const preloadImages = () => {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.src = imagemTermosServico;
    img2.src = imagemPoliticaPrivacidade;
    img3.src = imagemRegrasComunidade;

    img3.onload = () => {
      // Marca as imagens como carregadas após o carregamento completo
      setImagesLoaded(true);
    };
  };

  return (
    <div className={styles.containerTermsContainer}>
      {/* Verifica se todas as imagens estão carregadas */}
      {imagesLoaded ? (
        <>
          <div className={styles.logoTerm}>
            <Link to="/home">ConnecterLife</Link>
          </div>
          <hr />
          <div className={styles.container}>
            <p className={styles.mainParagraph}>{t("main_heading")}</p>
            <h1 className={styles.mainHeading}>{t("sub_heading")}</h1>

            <h1 className={styles.sectionHeading}>{t("section_heading")}</h1>

            <div className={styles.imageContainer}>
              <div className={styles.imageWithText}>
                <Link to="/service">
                  <img
                    src={imagemTermosServico}
                    alt="Termos de Serviço"
                    className={styles.termImage}
                  />
                  <p className={styles.p}>{t("heading")}</p>
                  <p className={styles.subp}>{t("subheading")}</p>
                </Link>
              </div>

              <div className={styles.imageWithText}>
                <Link to="/privacy">
                  <img
                    src={imagemPoliticaPrivacidade}
                    alt="Política de Privacidade"
                    className={styles.privacyImage}
                  />
                  <p className={styles.p}>{t("privacypolicy")}</p>
                  <p className={styles.subp}>{t("informationcollection")}</p>
                </Link>
              </div>

              <div className={styles.imageWithText}>
                <img
                  src={imagemRegrasComunidade}
                  alt="Regras da Comunidade"
                  className={styles.communityImage}
                />
                <p className={styles.p}>{t("communityrules")}</p>
                <p className={styles.subp}>{t("rulesandinstructions")}</p>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : null}
    </div>
  );
}

export default Terms;
