import React from "react";
import { useTranslation } from "react-i18next";
import { FaDoorOpen } from "react-icons/fa";
import useEventsModals from "../Hooks/useEventsModals";

const ButtonExit = () => {
    const { t } = useTranslation();
    const { handleSignOut } = useEventsModals();

    const handleRedirect = () => {
        // Redireciona diretamente sem usar navigate
        window.location.href = "/home";
    };

    return (
        <button
            onClick={handleSignOut}
            title={t("signout_title")}
            className="sidebar-link-out"
        >
            <FaDoorOpen />
            <span onClick={handleRedirect}>{t("signout_label")}</span>
        </button>
    );
};

export default ButtonExit;
