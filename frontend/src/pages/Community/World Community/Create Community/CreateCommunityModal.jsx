import React, { useState, useEffect } from "react";
import { useMyContext } from "../../../../contexts/profile-provider.jsx";
import { useTranslation } from "react-i18next";
import styles from "./ModalCreate.module.css";
import { useAuth } from "../../../../hooks/use-auth.js";
import { storage } from "../../../../components/Firebase/storage.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaPlus } from "react-icons/fa";

const CreateCommunityModal = () => {
  const { t } = useTranslation();
  const { isCreateCommunityModalOpen, setIsCreateCommunityModalOpen } =
    useMyContext();
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [nomeError, setNomeError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    setNomeError(""); // Limpar o erro quando o usuário digitar algo novo
  };

  const handleImagemChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Arquivo selecionado:", selectedFile);
    if (selectedFile) {
      setImagem(selectedFile);
      setUploadedImageName(selectedFile.name);
      setImagemCarregada(true);
    }
  };

  const handleCloseModal = () => {
    setIsCreateCommunityModalOpen(false);
  };

  const verificarExistenciaComunidade = async (nomeComunidade) => {
    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/verificarExistencia/${encodeURIComponent(
          nomeComunidade
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        return data.message === "Já existe uma comunidade com este nome";
      } else {
        throw new Error("Erro ao verificar a existência da comunidade");
      }
    } catch (error) {
      console.error(
        "Erro ao verificar a existência da comunidade:",
        error.message
      );
      return false; // Retorna false em caso de erro para não impedir a criação da comunidade erroneamente
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    let imageUrl = null;

    // Verificar se o nome da comunidade já existe
    const nomeExiste = await verificarExistenciaComunidade(nome);
    if (nomeExiste) {
      setNomeError("Já existe uma comunidade com este nome.");
      setIsLoading(false);
      return;
    }

    if (imagem) {
      const storageRef = ref(storage, `imagens/${imagem.name}`);
      try {
        const snapshot = await uploadBytesResumable(storageRef, imagem);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("URL da imagem:", imageUrl);
        setImagemCarregada(true);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error.message);
        setIsLoading(false);
        setLoadingText("");
        return;
      }
    }

    const formData = {
      country: nome,
      image: imageUrl,
      userId: userId,
    };

    try {
      const response = await fetch(
        "https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/criar/" +
          encodeURIComponent(nome),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Comunidade criada com sucesso.");
        handleCloseModal();
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        if (response.status === 409) {
          console.error("Erro ao criar comunidade:", errorMessage);
          setNomeError("Já existe uma comunidade com este nome.");
        } else {
          console.error("Erro ao criar comunidade:", response.statusText);
          // Se necessário, lidar com outros tipos de erros aqui
        }
      }
    } catch (error) {
      console.error("Erro ao criar comunidade:", error.message);
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  if (!isCreateCommunityModalOpen) return null;

  return (
    <div className={styles.modalOverlayCreate}>
      <div className={styles.modalContentCreate}>
        <h2>{t("create_community_title")}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            {t("community_name")}
            <input
              type="text"
              value={nome}
              onChange={handleNomeChange}
              required
            />
          </label>
          {nomeError && (
            <p className={`${styles.error} ${styles.errorMessage}`}>
              {nomeError}
            </p>
          )}
          {imagemCarregada ? (
            <p>Imagem carregada: {uploadedImageName}</p>
          ) : (
            <div>
              <label>{t("community_image")}</label>
              <label htmlFor="fileInput" className={styles.fileInputLabel}>
                <FaPlus className={styles.fileInputIcon} />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleImagemChange}
                accept="image/*"
                className={styles.fileInput}
              />
            </div>
          )}

          {isLoading && <p>{loadingText}</p>}
          <div className={styles.modalButtonsCreate}>
            <button type="button" onClick={handleCloseModal}>
              {t("cancel")}
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? t("creating") : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
