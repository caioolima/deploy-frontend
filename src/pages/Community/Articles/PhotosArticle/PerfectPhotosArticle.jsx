import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./PerfectPhotosArticle.module.css";
import SidebarMenu from "../../../Profile/SidebarMenu/index";

const PerfectPhotosArticle = () => {
  const { t } = useTranslation();

  return (
    <div>
      <article className={styles.article}>
        <SidebarMenu /> {/* Menu */}
        <header className={styles.header}>
          <h1 className={styles.title}>{t("title-photo")}</h1>
        </header>
        <div className={styles.imageContainer}>
          <img
            src="https://img.freepik.com/fotos-gratis/homem-tirando-fotos_23-2148579620.jpg?t=st=1719358924~exp=1719362524~hmac=bd7b1530159529c1f220c1ee9a11b1fe9d339d1c1bf6c3f9b6ab2cb94fe622a8&w=1380"
            alt={t("altText")}
            className={styles.image}
          />
          <p className={styles.imageAttribution}>
            {t("photoBy")}{" "}
            <a href="https://unsplash.com/photos/8OyKWQgBsKQ">Freepik</a>
          </p>
        </div>
        <p className={styles.paragraph}>{t("introParagraph")}</p>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section1.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://blog.indimagem.com.br/wp-content/uploads/2018/08/saiba-como-tirar-foto-com-luz-do-sol.jpeg"
              alt={t("altText")}
              className={styles.image}
            />
            <p className={styles.imageAttribution}>
              {t("photoBy")}{" "}
              <a href="https://blog.indimagem.com.br/saiba-como-tirar-foto-com-luz-do-sol/">
                Indimagem
              </a>
            </p>
          </div>
          <p className={styles.paragraph}>{t("section1.content")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section2.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://laisschulz.com/wp-content/uploads/2022/11/regra-dos-tercos-imagem-24.jpg"
              alt={t("altText")}
              className={styles.image}
            />
            <a href="https://laisschulz.com/fotografia/regra-dos-tercos/">
              <p className={styles.imageAttribution}>{t("photoBy")} Laís Schulz</p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("section2.content")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section3.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://herospark.com/blog/wp-content/uploads/sites/6/2021/01/photography-ideas-creative-occupation-design-studi-P4ZWVNP-min-scaled.jpg"
              alt={t("altText")}
              className={styles.image}
            />
            <a href="https://herospark.com/blog/edicao-de-imagem-gratuita-online/">
              <p className={styles.imageAttribution}>{t("photoBy")} Herospark</p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("section3.content")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section4.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://images.pexels.com/photos/4338604/pexels-photo-4338604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={t("altText")}
              className={styles.image}
            />
            <a href="https://www.pexels.com/pt-br/foto/camera-maquina-fotografo-jaqueta-4338604/">
              <p className={styles.imageAttribution}>{t("photoBy")} Pexels</p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("section4.content")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section5.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://images.pexels.com/photos/7205923/pexels-photo-7205923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={t("altText")}
              className={styles.image}
            />
            <a href="https://www.pexels.com/pt-br/foto/natureza-homem-mulher-rochas-7205923/">
              <p className={styles.imageAttribution}>{t("photoBy")} Pexels</p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("section5.content")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("section6.title")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={t("altText")}
              className={styles.image}
            />
            <a href="https://www.pexels.com/pt-br/foto/silhueta-de-homem-em-frente-ao-microfone-3379934/">
              <p className={styles.imageAttribution}>{t("photoBy")} Pexels</p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("section6.content")}</p>
        </section>
        <p className={styles.conclusion}>
          {t("conclusion.quote")}
          <span className={styles.quoteAuthor}>{t("conclusion.author")}</span>
        </p>
      </article>
    </div>
  );
};

export default PerfectPhotosArticle;
