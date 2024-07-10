// TabButton.js
import React from "react";
import { useTranslation } from "react-i18next";

const TabButton = ({ active, onClick, children }) => {
  const { t } = useTranslation();
  return (
    <button className={active ? "active-tab" : ""} onClick={onClick}>
      {t(children)}
    </button>
  );
};

export default TabButton;
