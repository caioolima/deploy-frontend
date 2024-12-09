import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/use-auth.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SidebarMenu from "../../Profile/SidebarMenu/index.jsx";
import Articles from "./Card Community/ImageField.jsx";
import TopFollowedUsers from "./TopFollows/TopFollowedUsers.jsx";
import TopLikedPosts from "./TopLikes/TopLikedPosts.jsx";
import UserCommunitiesCard from "./Card Community/UserCommunitiesCard.jsx";
import OtherCommunityCard from "./Card Community/OtherCommunityCard.jsx";
import {
  fetchComunidades,
  fetchNumeroMembros,
  fetchTopFollowedUsers,
  fetchTopLikedPosts,
  fetchComunidadesDoUsuario,
} from "./Card Community/communityService.jsx";
import BrasilFlag from "../Community Services/flags/brasil.jpeg";
import AlemanhaFlag from "../Community Services/flags/alemanha.png";
import JapaoFlag from "../Community Services/flags/japao.png";
import ItaliaFlag from "../Community Services/flags/itália.jpg";
import ChinaFlag from "../Community Services/flags/china.jpg";
import "./FirstWorldCountries.css";
import { defaultSliderSettings } from "./sliderConfig";
import styles from "./FirstWorld.module.css"; // Importa o CSS Module
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const FirstWorldCountries = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [_user, setUserId] = useState(null);
  const [comunidades, setComunidades] = useState([]);
  const [comunidadesUsuario, setComunidadesUsuario] = useState([]);
  const [topFollowedUsers, setTopFollowedUsers] = useState([]);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [numeroMembros, setNumeroMembros] = useState({});
  const flagMappings = {
    brasil: BrasilFlag,
    alemanha: AlemanhaFlag,
    japão: JapaoFlag,
    itália: ItaliaFlag,
    china: ChinaFlag,
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true); // Indica que o carregamento está em andamento
    if (user) {
      const fetchData = async () => {
        const fetchedComunidades = await fetchComunidades();
        setComunidades(fetchedComunidades);
        const fetchedComunidadesDoUsuario = await fetchComunidadesDoUsuario(
          user.id
        );
        setComunidadesUsuario(fetchedComunidadesDoUsuario);
        const fetchedTopFollowedUsers = await fetchTopFollowedUsers();
        setTopFollowedUsers(fetchedTopFollowedUsers);
        const fetchedTopLikedPosts = await fetchTopLikedPosts();
        setTopLikedPosts(fetchedTopLikedPosts);
        setLoading(false); // Indica que o carregamento está completo
        setLoadingComplete(true); // Marca o carregamento como completo
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    const fetchNumeroMembrosForAllComunidades = async () => {
      const promises = comunidades.map(async (comunidade) => {
        const numMembros = await fetchNumeroMembros(comunidade._id);
        return { id: comunidade._id, numMembros };
      });
      const results = await Promise.all(promises);
      const numMembrosMap = results.reduce((acc, { id, numMembros }) => {
        acc[id] = numMembros;
        return acc;
      }, {});
      setNumeroMembros(numMembrosMap);
    };

    fetchNumeroMembrosForAllComunidades();
  }, [comunidades]);

  // Filtrando as comunidades que não estão na lista fixa
  const filteredComunidades = comunidades.filter(
    (comunidade) =>
      !["alemanha", "brasil", "japão", "itália", "china"].includes(
        comunidade.country.toLowerCase()
      )
  );

  // Filtrando as comunidades que não estão na lista fixa
  const filterComunidades = comunidades.filter((comunidade) =>
    ["alemanha", "brasil", "japão", "itália", "china"].includes(
      comunidade.country.toLowerCase()
    )
  );

  // Componente para seta personalizada anterior
  const CustomPrevArrow = ({ onClick }) => (
    <div className={`${styles.customArrow} ${styles.prev}`} onClick={onClick}>
      <FaLongArrowAltLeft />
    </div>
  );

  // Componente para seta personalizada seguinte
  const CustomNextArrow = ({ onClick }) => {
    return (
      <div className={`${styles.customArrow} ${styles.next}`} onClick={onClick}>
        <FaLongArrowAltRight />
      </div>
    );
  };
  const sliderSettings = {
    ...defaultSliderSettings,
    infinite: false, // Exemplo de personalização local
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <main>
      <SidebarMenu />
      <div className="main-content">
        <section className="images-field-top">
          <Articles />
        </section>

        <article className="container-cards">
          <section>
            <h2 className={styles.CommunityTitle}>{t("Countries List")}</h2>
            <hr className={styles.hrTop} />
            <div className={styles.customSlider}>
              {loading && (
                <p className={styles.loadingMessage}>{t("loading")}</p>
              )}
              {loadingComplete && !loading && (
                <Slider {...sliderSettings}>
                  {filterComunidades.map((comunidade) => (
                    <OtherCommunityCard
                      key={comunidade._id}
                      comunidade={comunidade}
                      numeroMembros={numeroMembros}
                      flagMappings={flagMappings}
                      t={t}
                    />
                  ))}
                </Slider>
              )}
            </div>
          </section>
          <section>
            <h2 className={styles.CommunityTitle}>
              {t("communities_interests")}
            </h2>
            <hr className={styles.hrTop} />
            <div className={styles.customSlider}>
              {loading && (
                <p className={styles.loadingMessage}>{t("loading")}</p>
              )}
              {loadingComplete && !loading && (
                <Slider {...sliderSettings}>
                  {filteredComunidades.map((comunidade) => (
                    <OtherCommunityCard
                      key={comunidade._id}
                      comunidade={comunidade}
                      numeroMembros={numeroMembros}
                      flagMappings={flagMappings}
                      t={t}
                    />
                  ))}
                </Slider>
              )}
            </div>
          </section>
          <UserCommunitiesCard
            comunidadesUsuario={comunidadesUsuario}
            flagMappings={flagMappings}
            numeroMembros={numeroMembros}
            t={t}
          />
          <TopFollowedUsers topFollowedUsers={topFollowedUsers} t={t} />
          <TopLikedPosts topLikedPosts={topLikedPosts} t={t} />{" "}
          <div className="footer-world"></div>
        </article>
      </div>
    </main>
  );
};

export default FirstWorldCountries;
