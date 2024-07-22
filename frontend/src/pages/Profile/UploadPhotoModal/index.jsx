import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/UploadPhotoModal.module.css"; // Importa o CSS Module
import { useMyContext } from "../../../contexts/profile-provider";
import useUploadModal from "../Hooks/useUploadModal.jsx";
import ButtonClosed from "./ButtonClosed.jsx";
import ButtonPublish from "./ButtonPublish.jsx";
import Loading from "./Loading.jsx";
import { useTranslation } from "react-i18next";

const UploadPhotoModal = () => {
  const { t } = useTranslation();
  const { uploadInProgress, setSelectedImage } = useMyContext();
  const { handleImageUpload } = useUploadModal();

  const [caption, setCaption] = useState(""); // Estado para a legenda
  const [localSelectedImage, setLocalSelectedImage] = useState(null); // Estado local para a imagem
  const fileInputRef = useRef(null); // Referência ao campo de input

  useEffect(() => {
    // Adiciona overflow: hidden ao body quando o modal está aberto
    if (localSelectedImage || uploadInProgress) {
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.bottom = "0";
      document.body.style.overflow = "hidden";
    }

    // Cleanup: Remove overflow: hidden ao desmontar o modal
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.bottom = "";
      document.body.style.overflow = "";
    };
  }, [localSelectedImage, uploadInProgress]);

  const clearImage = () => {
    setLocalSelectedImage(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpa o campo de input de arquivo
    }
  };

  return (
    <main className={`${styles.modal} ${styles.active}`}>
      <article className={styles.publishModal}>
        <ButtonClosed className={styles.closeButtonPublish} onClick={clearImage} />
        {localSelectedImage && (
          <section className={styles.chosenImageField}>
            <div className={styles.imageWrapper}>
              <img
                src={localSelectedImage}
                alt={t("Selected")}
                className={styles.chosenImage}
              />
            </div>
            <div className={styles.captionInput}>
              <input
                type="text"
                placeholder={t("Enter caption")}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <ButtonPublish caption={caption} className={styles.publishButton} /> {/* Passa a legenda para ButtonPublish */}
          </section>
        )}
        {!localSelectedImage && !uploadInProgress && (
          <section className={styles.customFileUpload}>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleImageUpload(event);
                  setLocalSelectedImage(URL.createObjectURL(event.target.files[0]));
                }}
                ref={fileInputRef} // Atribui a referência ao input de arquivo
              />
              {t("Add photo")}
            </label>
          </section>
        )}
      </article>
    </main>
  );
};

export default UploadPhotoModal;
