import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./BackpackingArticle.module.css";
import LocationCard from "./LocationCard";
import DetailedInfo from "./DetailedInfo";
import TipsSection from "./TipsSection";
import SidebarMenu from "../../../Profile/SidebarMenu/index";

const BackpackingArticle = () => {
  const { t } = useTranslation(); // Importe o hook useTranslation

  const locations = [
    {
      name: t("locations.patagonia.name"),
      description: t("locations.patagonia.description"),
      image:
        "https://s2.static.brasilescola.uol.com.br/be/2023/01/parque-nacional-patagonia.jpg",
      bestTime: t("locations.patagonia.bestTime"),
      tips: [
        t("locations.patagonia.tips.0"),
        t("locations.patagonia.tips.1"),
        t("locations.patagonia.tips.2"),
      ],
      details: {
        whyVisit: t("locations.patagonia.details.whyVisit"),
        whatToDo: [
          t("locations.patagonia.details.whatToDo.0"),
          t("locations.patagonia.details.whatToDo.1"),
          t("locations.patagonia.details.whatToDo.2"),
        ],
        culture: t("locations.patagonia.details.culture"),
      },
    },
    {
      name: t("locations.santiago.name"),
      description: t("locations.santiago.description"),
      image:
        "https://www.dicasbarcelona.com.br/wp-content/plugins/seox-image-magick/imagick_convert.php?width=800&height=600&format=.jpg&quality=91&imagick=/wp-content/uploads/sites/15/2017/09/Caminho-Portugues-ate-Santiago-de-Compostela.jpg",
      bestTime: t("locations.santiago.bestTime"),
      tips: [
        t("locations.santiago.tips.0"),
        t("locations.santiago.tips.1"),
        t("locations.santiago.tips.2"),
      ],
      details: {
        whyVisit: t("locations.santiago.details.whyVisit"),
        whatToDo: [
          t("locations.santiago.details.whatToDo.0"),
          t("locations.santiago.details.whatToDo.1"),
          t("locations.santiago.details.whatToDo.2"),
        ],
        culture: t("locations.santiago.details.culture"),
      },
    },
    {
      name: t("locations.gili.name"),
      description: t("locations.gili.description"),
      image:
        "https://www.maladeaventuras.com/wp-content/uploads/2024/02/ilhas-gili-Estatuas-Gili-Meno.jpg",
      bestTime: t("locations.gili.bestTime"),
      tips: [
        t("locations.gili.tips.0"),
        t("locations.gili.tips.1"),
        t("locations.gili.tips.2"),
      ],
      details: {
        whyVisit: t("locations.gili.details.whyVisit"),
        whatToDo: [
          t("locations.gili.details.whatToDo.0"),
          t("locations.gili.details.whatToDo.1"),
          t("locations.gili.details.whatToDo.2"),
        ],
        culture: t("locations.gili.details.culture"),
      },
    },
    {
      name: t("locations.machuPicchu.name"),
      description: t("locations.machuPicchu.description"),
      image:
        "https://i.natgeofe.com/n/819ea774-aa80-435e-af5a-ae56efee7ce3/92491.jpg?w=718&h=538",
      bestTime: t("locations.machuPicchu.bestTime"),
      tips: [
        t("locations.machuPicchu.tips.0"),
        t("locations.machuPicchu.tips.1"),
        t("locations.machuPicchu.tips.2"),
      ],
      details: {
        whyVisit: t("locations.machuPicchu.details.whyVisit"),
        whatToDo: [
          t("locations.machuPicchu.details.whatToDo.0"),
          t("locations.machuPicchu.details.whatToDo.1"),
          t("locations.machuPicchu.details.whatToDo.2"),
        ],
        culture: t("locations.machuPicchu.details.culture"),
      },
    },
    {
      name: t("locations.newZealand.name"),
      description: t("locations.newZealand.description"),
      image:
        "https://www.egali.com.br/wp-content/uploads/2015/12/new-zealand-g8cdf0f7ab_1920.jpg",
      bestTime: t("locations.newZealand.bestTime"),
      tips: [
        t("locations.newZealand.tips.0"),
        t("locations.newZealand.tips.1"),
        t("locations.newZealand.tips.2"),
      ],
      details: {
        whyVisit: t("locations.newZealand.details.whyVisit"),
        whatToDo: [
          t("locations.newZealand.details.whatToDo.0"),
          t("locations.newZealand.details.whatToDo.1"),
          t("locations.newZealand.details.whatToDo.2"),
        ],
        culture: t("locations.newZealand.details.culture"),
      },
    },
    {
      name: t("locations.iceland.name"),
      description: t("locations.iceland.description"),
      image: "https://live.staticflickr.com/65535/51852951385_4c7d8d4bd7_z.jpg",
      bestTime: t("locations.iceland.bestTime"),
      tips: [
        t("locations.iceland.tips.0"),
        t("locations.iceland.tips.1"),
        t("locations.iceland.tips.2"),
      ],
      details: {
        whyVisit: t("locations.iceland.details.whyVisit"),
        whatToDo: [
          t("locations.iceland.details.whatToDo.0"),
          t("locations.iceland.details.whatToDo.1"),
          t("locations.iceland.details.whatToDo.2"),
        ],
        culture: t("locations.iceland.details.culture"),
      },
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <SidebarMenu /> {/* Menu */}
      <div className={styles.articleContainer}>
        <h1 className={styles.title}>
          {t("backpackingArticle.title")}
        </h1>
        <div className={styles.locationsGrid}>
          {locations.map((location, index) => (
            <LocationCard key={index} location={location} index={index} />
          ))}
        </div>
        {locations.map((location, index) => (
          <div
            id={`locationDetail${index}`}
            key={index}
            className={styles.detailsSection}
          >
            <DetailedInfo location={location} />
          </div>
        ))}
        <TipsSection tips={locations.flatMap((location) => location.tips)} />
      </div>
    </div>
  );
};

export default BackpackingArticle;
