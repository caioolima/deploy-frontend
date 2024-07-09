import React from 'react';
import styles from './LocationCard.module.css';
import { useTranslation } from 'react-i18next';

const LocationCard = ({ location, index }) => {
  const { t } = useTranslation();
  const scrollToDetail = () => {
    const detailSectionId = `locationDetail${index}`;
    const detailSection = document.getElementById(detailSectionId);
    if (detailSection) {
      const yOffset = detailSection.getBoundingClientRect().top + window.pageYOffset;
      const yCenterOffset = yOffset - (window.innerHeight / 2) + (detailSection.clientHeight / 2);
      window.scrollTo({ top: yCenterOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.card} onClick={scrollToDetail}>
      <img src={location.image} alt={location.name} className={styles.image} />
      <h2 className={styles.name}>{location.name}</h2>
      <p className={styles.description}>{location.description}</p>
      <p className={styles.bestTime}><strong>{t('bestTimeToVisit')}</strong> {location.bestTime}</p>
    </div>
  );
};

export default LocationCard;
