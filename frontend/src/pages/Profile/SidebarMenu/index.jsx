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
  const [isMenuIconClose, setIsMenuIconClose] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuIconClose(!isMenuIconClose);
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    setIsMenuOpen(false);
    setIsMenuIconClose(false);
  };

  // Verifica se a URL corresponde aos padrões /feed/:userId ou /profile/:userId
  const isProfileOrFeedPage = Boolean(
    matchPath("/feed/:userId", location.pathname) ||
      matchPath("/profile/:userId", location.pathname)
  );

  const isCommunityPage = location.pathname === "/worldcommunity";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsMenuIconClose(false);
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
  }, []);

  return (
    <div>
      {isMobile && isProfileOrFeedPage && (
        <div className="mobile-menu" ref={menuRef}>
          <p className="icon-notification">
            <IconNotification style={{ fontSize: "30px" }} />
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
          (
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
          )
        )}

        {isCreateCommunityModalOpen && <CreateCommunityModal />}
      </div>
    </div>
  );
};

export default SidebarMenuItems;
