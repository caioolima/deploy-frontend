// src/pages/Profile/SidebarMenu/MobileMenu.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector.jsx";
import ButtonExit from "./ButtonExit.jsx";
import IconNotification from "./IconNotification.jsx";

const MobileMenu = ({ isMenuOpen, closeMenu, handleViewChange, view, setIsMenuOpen }) => {
  const { t } = useTranslation();
  useEffect(() => {
    // Aplica overflow: hidden ao elemento html para remover o scroll
    document.documentElement.style.overflow = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
  return (
    <div className="mobile-menu">
      <div className="icon-notification">
      <IconNotification />
      </div>
      {!isMenuOpen && (
        <button className="menu-icon" onClick={() => setIsMenuOpen(true)}>
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
                <Link to="/terms" onClick={() => handleViewChange("terms")}>
                  {t("terms_of_service")}
                </Link>
                <Link to="/support-page" onClick={() => handleViewChange("help")}>
                  {t("help")}
                </Link>
                <Link to="/support/feature-requests" onClick={() => handleViewChange("report")}>
                  {t("Report an Issue")}
                </Link>
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
                  <LanguageSelector closeMenu={() => handleViewChange("menu")} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
