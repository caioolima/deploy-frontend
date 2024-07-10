import React, { useState, useEffect, useRef } from "react";
import "./styles/style.css";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../../assets/icons-backpack.png";
import { useMyContext } from "../../../contexts/profile-provider";
import useGetdata from "../Hooks/useGetdata.jsx";
import ButtonExit from "./ButtonExit.jsx";
import IconHome from "./IconHome.jsx";
import IconSearch from "./IconSearch.jsx";
import IconPublish from "./IconPublish.jsx";
import ButtonProfile from "./ButtonProfile.jsx";
import IconFeed from "./IconFeed.jsx";
import IconNotification from "./IconNotification.jsx";
import IconCreateCommunity from "./IconCreateCommunity.jsx";
import CreateCommunityModal from "../../Community/World Community/Create Community/CreateCommunityModal.jsx";
import { useTranslation } from "react-i18next";

const SidebarMenuItems = () => {
  const { t } = useTranslation();
  const {
    myProfileLink,
    isMyProfilePage,
    isCreateCommunityModalOpen,
    setIsCreateCommunityModalOpen,
  } = useMyContext();
  const { handleProfileClick } = useGetdata();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768; // Definir limite para dispositivos móveis

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuIconClose, setIsMenuIconClose] = useState(false); // Estado para controlar o ícone do menu
  const menuRef = useRef(null); // Referência para o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuIconClose(!isMenuIconClose); // Alterna o ícone entre ☰ e ✕
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    setIsMenuOpen(false); // Fechar o menu hamburguer após o logout
    setIsMenuIconClose(false); // Reverter para o ícone de ☰ após fechar
  };

  const isCommunityPage = location.pathname === "/worldcommunity";

  // Fechar o menu se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMenuIconClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Menu hamburguer para logout */}
      {isMobile && (
        <div className="mobile-menu" ref={menuRef}>
          <p className="icon-notification">
            <IconNotification style={{ fontSize: "30px" }} />{" "}
            {/* Ajuste o tamanho conforme necessário */}
          </p>

          <button className="menu-icon" onClick={toggleMenu}>
            {isMenuIconClose ? "✕" : "☰"}
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <ButtonExit />
            </div>
          )}
        </div>
      )}

      <div className="sidebar">
        <div className="-bar">
          <a href={myProfileLink} onClick={handleProfileClick}>
            <h1 className="desktop-logo">{t("title")}</h1>
            <img
              className="mobile-logo"
              src={logoImage}
              alt="Mobile Logo Icon"
            />
          </a>
        </div>

        {/* Menu principal para dispositivos móveis */}
        {isMobile && (
          <>
            <IconHome />
            <IconFeed />
            <IconSearch />
            {isCommunityPage && <IconCreateCommunity />}
            {isMyProfilePage && <IconPublish />}
            <ButtonProfile />
          </>
        )}

        {/* Menu completo para desktop */}
        {!isMobile && (
          <>
            <IconHome />
            <IconFeed />
            <IconNotification />
            <IconSearch />
            {isCommunityPage && <IconCreateCommunity />}
            {isMyProfilePage && <IconPublish />}
            <ButtonProfile />
            <ButtonExit />
          </>
        )}

        {isCreateCommunityModalOpen && <CreateCommunityModal />}
      </div>
    </div>
  );
};

export default SidebarMenuItems;
