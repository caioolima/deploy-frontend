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
import LanguageSelector from "./LanguageSelector.jsx";

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
  const [view, setView] = useState("menu"); // Estado para gerenciar a visualização
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef(null);

  const openMenu = () => {
    setIsMenuOpen(true);
    setView("menu"); // Sempre mostrar o menu principal ao abrir
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
        <div className="mobile-menu" ref={menuRef}>
          <div className="icon-notification">
            <IconNotification />
          </div>

          {!isMenuOpen && (
            <button className="menu-icon" onClick={openMenu}>
              ☰
            </button>
          )}
          {isMenuOpen && (
            <div className="menu-dropdown">
              {view === "menu" ? (
                <>
                  <button className="close-icon" onClick={closeMenu}>
                    &lt;
                  </button>
                  <div className="options-menu-dropdown">
                    <a href="#" onClick={() => handleViewChange("terms")}>
                      {t("terms_of_service")}
                    </a>
                    <a href="#" onClick={() => handleViewChange("help")}>
                      {t("help")}
                    </a>
                    <a href="#" onClick={() => handleViewChange("report")}>
                      {t("Report an Issue")}
                    </a>
                    <button
                      className="language-button"
                      onClick={() => handleViewChange("language")}
                    >
                      {t("language")}
                    </button>
                  </div>
                  <button className="button-exit">
                    <ButtonExit />
                  </button>
                </>
              ) : (
                <div>
                  <button
                    className="close-icon"
                    onClick={() => handleViewChange("menu")}
                  >
                    &lt;
                  </button>
                  <div className="details-view">
                    {view === "terms" && <div>{t("terms_content")}</div>}
                    {view === "help" && <div>{t("help_content")}</div>}
                    {view === "report" && <div>{t("report_content")}</div>}
                    {view === "language" && (
                      <LanguageSelector
                        closeMenu={() => handleViewChange("menu")}
                      />
                    )}
                  </div>
                </div>
              )}
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
