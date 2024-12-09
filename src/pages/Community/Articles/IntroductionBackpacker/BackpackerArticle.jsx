// BackpackerArticle.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./BackpackerArticle.module.css";
import SidebarMenu from "../../../Profile/SidebarMenu/index";

const BackpackerArticle = () => {
  const { t } = useTranslation();

  return (
    <div>
      <article className={styles.article}>
        <SidebarMenu /> {/* Menu */}{" "}
        <div className={styles.imageContainer}>
          <img
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Backpacker"
            className={styles.image}
          />
          <a href="https://unsplash.com/photos/8OyKWQgBsKQ">
            <p className={styles.imageAttribution}>{t("photo_by")} Unsplash</p>
          </a>
        </div>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("The Life of a Backpacker")}</h1>
        </header>
        <section className={styles.section}>
          <p className={styles.paragraph}>{t("backpacker_intro")}</p>
          <p className={styles.paragraph}>{t("backpacker_body")}</p>
          <p className={styles.paragraph}>{t("backpacker_tip_1")}</p>
          <p className={styles.paragraph}>{t("backpacker_tip_2")}</p>
          <p className={styles.paragraph}>{t("backpacker_tip_3")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t("backpacker_heading_2")}</h2>{" "}
          <div className={styles.imageContainer}>
            <img
              src="https://viagemeturismo.abril.com.br/wp-content/uploads/2017/07/gettyimages-490173854.jpg?quality=70&strip=info&w=1024&crop=1"
              alt="Backpacker"
              className={styles.image}
            />
            <a href="https://viagemeturismo.abril.com.br/manual-do-viajante/guia-do-mochileiro-tudo-que-voce-precisa-saber-para-se-tornar-um">
              <p className={styles.imageAttribution}>
                {t("photo_by")} (Voneisenstein/Getty Images)
              </p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("backpacker_body_2")}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.subtitle}>{t("backpacker_heading_3")}</h2>
          <div className={styles.imageContainer}>
            <img
              src="https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/ovh4nihan2fu5ci6ehxh"
              alt="Backpacker"
              className={styles.image}
            />
            <a href="https://www.worldpackers.com/pt-BR/articles/mochileiros-brasileiros">
              <p className={styles.imageAttribution}>
                {t("photo_by")} (worldpackers)
              </p>
            </a>
          </div>
          <p className={styles.paragraph}>{t("backpacker_body_3")}</p>
          <p className={styles.paragraph}>{t("backpacker_tip_4")}</p>
        </section>
      </article>
    </div>
  );
};

export default BackpackerArticle;
