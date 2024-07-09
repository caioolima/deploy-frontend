import SidebarLink from "./SideBarLink.jsx";
import { FaCompass } from "react-icons/fa"; // Ícone de bússola do pacote react-icons/fa
import { useTranslation } from "react-i18next";
import { useMyContext } from "../../../contexts/profile-provider";

const ExploreIcon = () => {
    const { t } = useTranslation();
    const { feedLink } = useMyContext();
    return (
        <>
            <SidebarLink
               to={feedLink}
                title={t("feed_title")}
                icon={<FaCompass />} 
                label={t("feed_label")}
            />
        </>
    );
};

export default ExploreIcon;
