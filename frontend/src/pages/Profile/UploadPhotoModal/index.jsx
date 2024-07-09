import React, { useState, useEffect } from "react";
import styles from "./styles/UploadPhotoModal.module.css"; // Importa o CSS Module
import { useMyContext } from "../../../contexts/profile-provider";
import useUploadModal from "../Hooks/useUploadModal.jsx";
import ButtonClosed from "./ButtonClosed.jsx";
import ButtonPublish from "./ButtonPublish.jsx";
import Loading from "./Loading.jsx";
import { useTranslation } from "react-i18next";

const UploadPhotoModal = () => {
  const { t } = useTranslation(); // Usando o hook useTranslation para tradução
  const { selectedImage, uploadInProgress } = useMyContext();
  const { handleImageUpload } = useUploadModal();
  
  const [caption, setCaption] = useState(""); // Estado para a legenda

  useEffect(() => {
    // Adiciona overflow: hidden ao body quando o modal está aberto
    if (selectedImage || uploadInProgress) {
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
  }, [selectedImage, uploadInProgress]);

  return (
    <main className={`${styles.modal} ${styles.active}`}>
      <article className={styles.publishModal}>
        <ButtonClosed className={styles.closeButtonPublish} />
        {selectedImage && (
          <section className={styles.chosenImageField}>
            <div className={styles.imageWrapper}>
              <img
                src={selectedImage}
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
        {/* Exibir barra de progresso se o upload estiver em andamento */}
        {uploadInProgress && <Loading />}

        {/* Botão para anexar imagem */}
        {!selectedImage && !uploadInProgress && (
          <section className={styles.customFileUpload}>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
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
