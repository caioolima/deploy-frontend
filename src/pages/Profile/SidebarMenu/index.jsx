// src/pages/Profile/SidebarMenu/index.jsx

import React, { useState, useEffect, useRef } from "react";
import "./styles/style.css";
import { useLocation, matchPath } from "react-router-dom";
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
import SettingsModal from "./SettingsModal.jsx";
import SettingsButton from "./IconsSettings";
import MobileMenu from "./MobileMenu.jsx";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState("menu");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => {
    setIsMenuOpen(true);
    setView("menu");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    setIsMenuOpen(false);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const isProfileOrFeedPage = Boolean(
    matchPath("/profile/:userId", location.pathname)
  );

  const isCommunityPage = location.pathname === "/worldcommunity";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <div>
      {isMobile && isProfileOrFeedPage && (
        <MobileMenu
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          handleViewChange={handleViewChange}
          view={view}
          setIsMenuOpen={setIsMenuOpen}
        />
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

        {isMobile ? (
          <>
            <IconHome />
            <IconFeed />
            <IconSearch />
            {isCommunityPage && <IconCreateCommunity />}
            {isMyProfilePage && <IconPublish />}
            <ButtonProfile />
          </>
        ) : (
          <>
            <IconHome />
            <IconFeed />
            <IconNotification />
            <IconSearch />
            {isCommunityPage && <IconCreateCommunity />}
            {isMyProfilePage && <IconPublish />}
            <ButtonProfile />
            <SettingsButton onClick={() => setIsSettingsModalOpen(true)} />
            <ButtonExit /> {/* Renderize diretamente o ButtonExit */}
          </>
        )}

        {isCreateCommunityModalOpen && <CreateCommunityModal />}
      </div>

      {!isMobile && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          onChangeView={handleViewChange}
          view={view}
        />
      )}
    </div>
  );
};

export default SidebarMenuItems;
