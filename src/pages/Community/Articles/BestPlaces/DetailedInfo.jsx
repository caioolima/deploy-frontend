// DetailedInfo.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DetailedInfo.module.css';

const DetailedInfo = ({ location }) => {
  const { t } = useTranslation();
  const { details } = location;

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.detailsTitle}>{location.name}</h2>
      <p className={styles.detailsText}><strong>{t('Why visit:')}</strong> {details.whyVisit}</p>
      <p className={styles.detailsText}><strong>{t('What to do:')}</strong> {details.whatToDo.join(', ')}</p>
      <p className={styles.detailsText}><strong>{t('culture :')}</strong> {details.culture}</p>
    </div>
  );
};

export default DetailedInfo;
