import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector.jsx";
import ButtonExit from "./ButtonExit.jsx";
import "./styles/style.css";

const SettingsModal = ({ isOpen, onClose, onChangeView, view }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null); // Referência ao contêiner do modal

  useEffect(() => {
    const handleOpenModal = () => {
      document.body.style.position = "fixed";
    };

    const handleCloseModal = () => {
      document.body.style.position = "static";
    };

    if (isOpen) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }

    return () => {
      handleCloseModal(); // Garante que o scroll seja restaurado ao desmontar o componente
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Fecha o modal se o clique for fora do modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={handleClickOutside}>
      <div className="settings-modal" ref={modalRef}>
        <div className="settings-modal-content">
          {/* Renderiza o botão de fechamento apenas na visualização do menu */}
          {view === "menu" && (
            <button className="close-icon" onClick={onClose}>
              &times;
            </button>
          )}
          <div className="options-menu-dropdown">
            {view === "menu" ? (
              <>
                <Link to="/terms" onClick={() => onChangeView("terms")}>
                  {t("terms_of_service")}
                </Link>
                <Link to="/support-page" onClick={() => onChangeView("help")}>
                  {t("help")}
                </Link>
                <Link
                  to="/support/feature-requests"
                  onClick={() => onChangeView("report")}
                >
                  {t("Report an Issue")}
                </Link>
                <button
                  className="language-button-settings"
                  onClick={() => onChangeView("language")}
                >
                  {t("language")}
                </button>
                <ButtonExit />
              </>
            ) : (
              <div className="details-view">
                <button
                  className="back-icon-config"
                  onClick={() => onChangeView("menu")}
                >
                  &lt;
                </button>
                {view === "terms" && <div>{t("terms_content")}</div>}
                {view === "help" && <div>{t("help_content")}</div>}
                {view === "report" && <div>{t("report_content")}</div>}
                {view === "language" && (
                  <LanguageSelector closeMenu={() => onChangeView("menu")} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
