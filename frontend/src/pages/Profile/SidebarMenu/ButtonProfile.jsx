import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from "./SideBarLink.jsx";
import { useMyContext } from "../../../contexts/profile-provider";
import useGetdata from "../Hooks/useGetdata.jsx";

const ButtonProfile = () => {
    const { t } = useTranslation();
    const { myProfileLink } = useMyContext();
    const { handleProfileClick } = useGetdata();
    
    return (
        <div className="myprofile-link">
            <SidebarLink
                to={myProfileLink}
                title={t("profile_title")}
                icon={<FontAwesomeIcon icon={faUser} />}
                label={t("profile_label")}
                onClick={handleProfileClick}
            />
        </div>
    );
};

export default ButtonProfile;
