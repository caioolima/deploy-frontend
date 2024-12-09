// Header.js
import React from "react";
import "../Header/header.css"; // Supondo que seus estilos estejam em um arquivo chamado Header.css

import { useTranslation } from "react-i18next"; // Importa useTranslation do react-i18next

function Header() {
    const { t } = useTranslation();
    return (
        <header className="face-infos">
            <h1>{t("app_title")}</h1>
            <p>{t("connect_travelers")}</p>
            <p>{t("share_experiences")}</p>
        </header>
    );
}

export default Header;
