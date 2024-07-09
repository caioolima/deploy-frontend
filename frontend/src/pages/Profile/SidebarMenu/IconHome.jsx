import SidebarLink from "./SideBarLink.jsx";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const IconHome = () => {
    const { t } = useTranslation();

    return (
        <>
            <SidebarLink
                to="/worldcommunity"
                title={t("home_title")}
                icon={<FaHome />}
                label={t("home_label")}
            />
        </>
    );
};

export default IconHome;
