// TipsSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TipsSection.module.css';

const TipsSection = ({ tips }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tipsContainer}>
      <h2 className={styles.tipsTitle}>{t('GeneralTipsForBackpackers')}</h2>
      <ul className={styles.tipsList}>
        {tips.map((tip, index) => (
          <li key={index} className={styles.tipItem}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default TipsSection;
