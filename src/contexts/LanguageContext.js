import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from '../components/Language/i18n'; // Ajuste o caminho conforme necessário

const LanguageContext = createContext();

const syncLanguageWithBackend = async (language) => {
  try {
    const response = await fetch('https://server-repository.onrender.com/auth/language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language }),
    });
    if (!response.ok) {
      console.error('Failed to sync language with backend');
    }
  } catch (error) {
    console.error('Error syncing language with backend:', error);
  }
};

export const LanguageProvider = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState('en-US');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      setUserLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language) => {
    setUserLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('userLanguage', language);
    syncLanguageWithBackend(language);
  };

  return (
    <LanguageContext.Provider value={{ userLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
