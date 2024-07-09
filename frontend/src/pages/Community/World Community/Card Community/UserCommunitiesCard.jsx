import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./UserCommunitiesCard.module.css"; // Arquivo CSS Modules para estilização
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { defaultSliderSettings } from "../sliderConfig";

const UserCommunitiesCard = ({
  comunidadesUsuario,
  flagMappings,
  numeroMembros,
  t,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false); // Novo estado para controlar carregamento completo
  const [sliderLoaded, setSliderLoaded] = useState(false); // Estado para controlar carregamento do Slider

  // Função para seta personalizada anterior
  const CustomPrevArrow = ({ onClick }) => (
    <div className={`${styles.customPrevButton} ${styles.sliderArrow}`} onClick={onClick}>
      <FaLongArrowAltLeft />
    </div>
  );

  // Função para seta personalizada seguinte
  const CustomNextArrow = ({ onClick }) => (
    <div className={`${styles.customNextButton} ${styles.sliderArrow}`} onClick={onClick}>
      <FaLongArrowAltRight />
    </div>
  );

  // Configurações do Slider com as setas personalizadas
  const settings = {
    ...defaultSliderSettings,
    infinite: false,
    speed: 500,
    prevArrow: sliderLoaded && <CustomPrevArrow />, // Renderiza seta anterior apenas quando sliderLoaded for true
    nextArrow: sliderLoaded && <CustomNextArrow />, // Renderiza seta seguinte apenas quando sliderLoaded for true
  };

  useEffect(() => {
    // Simulação de carregamento de dados
    const loadData = async () => {
      // Simula o carregamento dos dados
      setTimeout(() => {
        setLoading(false);
        setLoadingComplete(true); // Marca o carregamento como completo
      }, 2000); // Altere este valor para o tempo real de carregamento dos dados
    };

    loadData();
  }, []);

  useEffect(() => {
    // Define sliderLoaded como true após o carregamento completo
    if (!loading) {
      setSliderLoaded(true);
    }
  }, [loading]);

  return (
    <section>
      <div className={styles.userCommunitiesCard}>
        <h2>{t("Your Communities")}</h2>
        <hr className={styles.hrTop} />
        {loading ? (
          <p className={styles.loadingMessage}>{t("loading")}</p>
        ) : loadingComplete ? ( // Verifica se o carregamento está completo
          comunidadesUsuario.length > 0 ? (
            <Slider {...settings}>
              {comunidadesUsuario.map((comunidade) => (
                <div key={comunidade._id} className={styles.cardCommunity}>
                  <div
                    className={styles.imageCountry}
                    style={{
                      backgroundImage: `url(${flagMappings[comunidade.country.toLowerCase()] ||
                        comunidade.image
                        })`,
                    }}
                  ></div>
                  <span>{comunidade.country}</span>
                  <p>
                    {numeroMembros[comunidade._id] !== undefined
                      ? numeroMembros[comunidade._id] === 1
                        ? t("member", { count: numeroMembros[comunidade._id] })
                        : t("members", { count: numeroMembros[comunidade._id] })
                      : t("loading")}
                  </p>{" "}
                  <Link
                    to={`/community/${encodeURIComponent(
                      comunidade.country
                    )}/${comunidade._id}`}
                  >
                    <button className={styles.signButtonSign}>{t("join")}</button>
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <p className={styles.noCommunitiesMessage}>{t("noCommunities")}</p>
          )
        ) : null}
      </div>
    </section>
  );
};

export default UserCommunitiesCard;
