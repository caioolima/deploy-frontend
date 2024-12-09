import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 
import styles from './SupportInfo.module.css';
import { FaQuestionCircle, FaUserCircle, FaExclamationCircle } from 'react-icons/fa';
import Footer from '../../../components/Footer/footer.jsx';

const SupportInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };
  
  return (
    <div className={styles.supportInfo}>
      <div className={styles.header}>
        <h2>{t('How Can We Help?')}</h2>
        <p>{t('Welcome to our support center. Here you can find answers to common questions and report any issues you are experiencing.')}</p>
      </div>
      <div className={styles.links}>
        <div className={styles.link} onClick={() => handleNavigate('/support/faq')}>
          <FaQuestionCircle className={styles.icon} />
          <span>{t('FAQ')}</span>
          <p>{t('Find quick answers to common questions.')}</p>
        </div>
        <div className={styles.link} onClick={() => handleNavigate('/support/account')}>
          <FaUserCircle className={styles.icon} />
          <span>{t('Account Support')}</span>
          <p>{t('Need help with your account?')}</p>
        </div>
        <div className={styles.link} onClick={() => handleNavigate('/support/feature-requests')}>
          <FaExclamationCircle className={styles.icon} />
          <span>{t('Report an Issue')}</span>
          <p>{t('Having a problem? Let us know!')}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;
