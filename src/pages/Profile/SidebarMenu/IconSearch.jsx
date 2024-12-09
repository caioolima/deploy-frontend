import SidebarLink from "./SideBarLink.jsx";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const IconSearch = () => {
    const { t } = useTranslation(); // Adicionando a função de tradução

    return (
        <>
            <SidebarLink
                to="/search"
                title={t("search_title")} // Traduzindo o título do ícone
                icon={<FaSearch />}
                label={t("search_label")} // Traduzindo o label do ícone
            />
        </>
    );
};

export default IconSearch;
