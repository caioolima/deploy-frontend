// ButtonPublish.jsx
import useUploadModal from "../Hooks/useUploadModal";
import { useTranslation } from "react-i18next"; // Importe o hook useTranslation
import styles from "./styles/UploadPhotoModal.module.css"
const ButtonPublish = ({ caption }) => {
  const { t } = useTranslation(); // Usa o hook useTranslation para tradução
  const { changeImage2 } = useUploadModal();
  
  const handleClick = () => {
    changeImage2(caption); // Passa a legenda para a função changeImage2
  };

  return (
    <>
      <button className={styles.publishButton} onClick={handleClick}>
        {t("Publish")}
      </button>
    </>
  );
};

export default ButtonPublish;
