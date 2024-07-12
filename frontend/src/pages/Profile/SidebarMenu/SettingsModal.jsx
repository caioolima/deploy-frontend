// src/pages/Profile/SidebarMenu/SettingsModal.jsx

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
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Fecha o modal se o clique for fora do modal
      }
    };

    if (isOpen) {
      // Desativa a rolagem vertical quando o modal está aberto
      document.documentElement.style.overflowY = "hidden";
      // Garante que a rolagem horizontal seja mantida (se necessário)
      document.documentElement.style.overflowX = "hidden";
      // Adiciona o manipulador de eventos para cliques fora do modal
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Restaura a rolagem vertical quando o modal está fechado
      document.documentElement.style.overflowY = "auto";
    }

    // Limpeza: remove o manipulador de eventos e restaura a rolagem vertical
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.documentElement.style.overflowY = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
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
