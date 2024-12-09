import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useMyContext } from "../../../contexts/profile-provider";
import useModalEdit from "../Hooks/useModalEdit.jsx";
import { useTranslation } from "react-i18next";

const EditModal = () => {
  const {
    newUsername,
    setNewUsername,
    usernameError,
    newBiography,
    setNewBiography,
    isTextFieldFocused,
    setIsTextFieldFocused,
    modalFullName,
    setModalFullName,
    modalDateOfBirth,
    phoneNumber,
    setPhoneNumber,
    countryCode,
    phoneError,
    setEditMode,
  } = useMyContext();

  const {
    handleSaveEdit,
    handleChangePhoneNumber,
    handleCloseModal,
    handleDeleteBiography,
    handleDeleteAccount,
  } = useModalEdit();

  const [initialState, setInitialState] = useState({
    initialUsername: newUsername,
    initialBiography: newBiography,
    initialPhoneNumber: phoneNumber,
  });

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showConfirmDeleteAccountModal, setShowConfirmDeleteAccountModal] =
    useState(false);

  const openConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

  const closeConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const openConfirmDeleteAccountModal = () => {
    setShowConfirmDeleteAccountModal(true);
  };

  const closeConfirmDeleteAccountModal = () => {
    setShowConfirmDeleteAccountModal(false);
  };

  const handleSaveEdits = () => {
    // Verifica se a biografia foi alterada
    const biographyChanged = newBiography !== initialState.initialBiography;

    // Se a biografia foi alterada e está vazia, mostra o modal de confirmação de exclusão
    if (biographyChanged && newBiography === "") {
      openConfirmDeleteModal();
    } else {
      handleSaveEdit();
    }
  };

  const handleChange = (e) => {
    setNewBiography(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleInputChange = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    const hasChanges =
      newUsername !== initialState.initialUsername ||
      newBiography !== initialState.initialBiography ||
      phoneNumber !== initialState.initialPhoneNumber;

    // Habilita ou desabilita o botão de salvar com base nas alterações nos campos
    const saveButton = document.getElementById("save-button");
    if (saveButton) {
      saveButton.disabled = !hasChanges;
    }
  }, [newUsername, newBiography, phoneNumber]);

  document.body.style.overflow = "hidden";

  const { t } = useTranslation();

  return (
    <div className={styles["modal-edit"]}>
      <div className={styles["modal-content-edit"]}>
        <button
          className={styles["modal-close-edit-button"]}
          onClick={() => {
            setEditMode(false);
            handleCloseModal();
          }}
        >
          {t("close_button")}
        </button>

        <div className={styles["text-edit"]}>
          <label>{t("username_label")}</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className={styles["edit-input"]}
          />
          {usernameError && (
            <p className={styles["error_message"]}>{usernameError}</p>
          )}
        </div>
        <div className={styles.bio_text_edit}>
          <label htmlFor="biography">{t("bio_label")}</label>
          <textarea
            id="biography"
            rows={4}
            value={newBiography}
            onChange={handleChange}
            className={styles["edit-input"]}
            style={{ marginTop: "10px" }}
          />
        </div>

        <div className={styles["text-edit"]}>
          <label>{t("full_name_label")}</label>
          <input
            type="text"
            value={modalFullName}
            onChange={(e) => setModalFullName(e.target.value)}
            className={styles["edit-input"]}
            disabled
          />
        </div>
        <div className={styles["text-edit"]}>
          <label>{t("dob_label")}</label>
          <p className={styles["black-text"]}>
            {new Date(modalDateOfBirth).toLocaleDateString()}
          </p>
        </div>
        <div className={styles["text-edit"]}>
          <label>{t("phone_number_label")}</label>
          <PhoneInput
            placeholder={t("phone_placeholder")}
            value={phoneNumber}
            onChange={handleInputChange}
            inputClassName={`${styles["phone-input"]} ${
              phoneError ? styles["error_message"] : ""
            }`}
          />
          {phoneError && (
            <p className={styles["error_message"]}>{phoneError}</p>
          )}
        </div>

        <div className={styles["delete-account"]}>
          <button
            className={styles["delete-account-button"]}
            onClick={openConfirmDeleteAccountModal}
          >
            {t("delete_account_button")}
          </button>
        </div>

        <div className={styles["save-button-container"]}>
          <button
            id="save-button"
            className={`${styles["save-button"]} ${
              !newUsername ||
              (newUsername === initialState.initialUsername &&
                newBiography === initialState.initialBiography &&
                phoneNumber === initialState.initialPhoneNumber)
                ? styles["disabled"]
                : ""
            }`}
            onClick={handleSaveEdits}
            disabled={
              !newUsername ||
              (newUsername === initialState.initialUsername &&
                newBiography === initialState.initialBiography &&
                phoneNumber === initialState.initialPhoneNumber)
            }
          >
            {t("save_button")}
          </button>
        </div>

        {/* Modal de confirmação de exclusão de biografia */}
        {showConfirmDeleteModal && (
          <div className={styles["confirm-delete-modal"]}>
            <p>{t("confirm_delete_bio")}</p>
            <button
              className={styles["confirm-delete-button"]}
              onClick={handleDeleteBiography}
            >
              {t("yes")}
            </button>
            <button
              onClick={closeConfirmDeleteModal}
              className={styles["cancel-button-bio"]}
            >
              {t("cancel")}
            </button>
          </div>
        )}
        {showConfirmDeleteAccountModal && (
          <div className={styles["confirm-delete-modal"]}>
            <p className={styles["text-delete-modal"]}>
              {t("confirm_delete_account")}
            </p>
            <button
              onClick={handleDeleteAccount}
              className={styles["confirm-delete-button"]}
            >
              {t("yes")}
            </button>
            <button
              onClick={closeConfirmDeleteAccountModal}
              className={styles["cancel-button-bio"]}
            >
              {t("cancel")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditModal;
