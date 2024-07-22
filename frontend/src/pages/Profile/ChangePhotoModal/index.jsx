import "./style.css";
import React, { useState, useRef } from "react";
import { useMyContext } from "../../../contexts/profile-provider";
import usePhotoModal from "../Hooks/usePhotoModal";
import { useTranslation } from "react-i18next";

const ChangePhotoModal = () => {
  const { t } = useTranslation();
  const { profileImage, uploadProgress, isEditMode } = useMyContext();

  const { closeModal, removeImage, handleImageChange, changeImage } =
    usePhotoModal();

  const [tempSelectedImage, setTempSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Referência ao campo de input

  const handleBackButtonClick = () => {
    if (tempSelectedImage) {
      setTempSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Limpa o campo de input de arquivo
      }
    } else {
      closeModal();
    }
  };

  const handleConfirmButtonClick = async () => {
    if (tempSelectedImage) {
      await changeImage(); // Aguarda a conclusão do upload da imagem
      setTempSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Limpa o campo de input de arquivo
      }
      closeModal();
    }
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        {tempSelectedImage && (
          <div className="selected-image-preview">
            <img src={tempSelectedImage} alt="Selected" />
            <div className="modal-buttons">
              <button
                className="custom-modal-button"
                onClick={handleConfirmButtonClick}
              >
                {t("confirm_change")}
              </button>
              <button
                className="custom-modal-button"
                onClick={handleBackButtonClick}
              >
                {t("back")}
              </button>
            </div>
          </div>
        )}
        {!tempSelectedImage && (
          <div className="custom-file-upload">
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleImageChange(event);
                  setTempSelectedImage(
                    URL.createObjectURL(event.target.files[0])
                  );
                }}
                ref={fileInputRef} // Atribui a referência ao input de arquivo
              />
              {profileImage ? t("change_photo") : t("add_photo")}
            </label>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                >
                  {Math.round(uploadProgress)}%
                </div>
              </div>
            )}
          </div>
        )}
        {!isEditMode && profileImage && !tempSelectedImage && (
          <div className="custom-file-upload">
            <button className="custom-remove-image" onClick={removeImage}>
              {t("remove_image")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePhotoModal;
