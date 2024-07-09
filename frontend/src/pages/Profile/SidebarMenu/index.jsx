import "./styles/style.css";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../../assets/icons-backpack.png";
import { useMyContext } from "../../../contexts/profile-provider";
import useGetdata from "../Hooks/useGetdata.jsx";
import ButtonExit from "./ButtonExit.jsx";
import IconHome from "./IconHome.jsx";
import IconSearch from "./IconSearch.jsx";
import IconPublish from "./IconPublish.jsx";
import ButtonProfile from "./ButtonProfile.jsx";
import IconFeed from "./IconFeed.jsx";
import IconCreateCommunity from "./IconCreateCommunity.jsx"; // Importe o novo ícone
import CreateCommunityModal from "../../Community/World Community/Create Community/CreateCommunityModal.jsx"; // Importe o modal
import { useTranslation } from "react-i18next";

const SidebarMenuItems = () => {
    const { t } = useTranslation();
    const { myProfileLink, isMyProfilePage, isCreateCommunityModalOpen, setIsCreateCommunityModalOpen } = useMyContext();
    const { handleProfileClick } = useGetdata();
    const location = useLocation(); // Obter a localização atual da rota

    // Verificar se a rota atual é a página de comunidade
    const isCommunityPage = location.pathname === "/worldcommunity";

    return (
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
            <>
                <IconHome />
                <IconFeed />
                <IconSearch />
                {isCommunityPage && <IconCreateCommunity />}
                {isMyProfilePage && <IconPublish />}
                <ButtonProfile />
                <ButtonExit />
            </>
            {isCreateCommunityModalOpen && <CreateCommunityModal />}
        </div>
    );
};

export default SidebarMenuItems;
