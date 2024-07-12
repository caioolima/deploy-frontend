// src/components/iconSettings.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import SidebarLink from "./SideBarLink.jsx";

const SettingsButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <SidebarLink
      title={t("settings_title")}
      icon={<FaCog />} // Adiciona o ícone de configurações aqui
      label={t("settings_label")}
      onClick={onClick}
    />
  );
};

export default SettingsButton;
