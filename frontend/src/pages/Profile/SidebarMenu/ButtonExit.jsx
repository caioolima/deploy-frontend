import { useTranslation } from "react-i18next";
import { FaDoorOpen } from "react-icons/fa";
import useEventsModals from "../Hooks/useEventsModals";

const ButtonExit = () => {
    const { t } = useTranslation();
    const { handleSignOut } = useEventsModals();
    
    return (
        <button
            onClick={handleSignOut}
            title={t("signout_title")}
            className="sidebar-link-out"
        >
            <FaDoorOpen />
            <span>{t("signout_label")}</span>
        </button>
    );
};

export default ButtonExit;
