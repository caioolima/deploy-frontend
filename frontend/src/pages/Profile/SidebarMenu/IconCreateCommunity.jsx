// IconCreateCommunity.jsx
import React from "react";
import SidebarLink from "./SideBarLink.jsx";
import { useMyContext } from "../../../contexts/profile-provider";
import { FaUsers } from "react-icons/fa"; // Importe o ícone FaUsers
import { useTranslation } from "react-i18next";
import "./styles/style.css"; // Certifique-se de que os estilos estão sendo importados

const IconCreateCommunity = () => {
  const { t } = useTranslation();
  const { setIsCreateCommunityModalOpen } = useMyContext();

  const handleClick = () => {
    setIsCreateCommunityModalOpen(true);
  };

  return (
    <SidebarLink
      title={t("create_community_title")}
      icon={<FaUsers />} // Use o ícone FaUsers
      label={t("create_community_title")}
      onClick={handleClick}
    />
  );
};

export default IconCreateCommunity;
