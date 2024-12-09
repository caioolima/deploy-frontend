import { useMyContext } from "../../../contexts/profile-provider.jsx";
import { useParams } from "react-router-dom";
import { storage } from "../../../components/Firebase/storage.js";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useUploadModal = () => {
  const {
    setUploadInProgress,
    selectedImage,
    setSelectedImage,
    setShowPhotoModal,
    setCaption,
    caption
  } = useMyContext();
  const { userId } = useParams();

  const changeImage2 = async (caption) => {
    try {
      if (selectedImage) {
        const token = localStorage.getItem("token");

        // Enviar a URL da imagem e a legenda para o backend
        const response = await fetch(
          `https://server-repository.onrender.com/${userId}/gallery`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              url: selectedImage,
              caption: caption,
            }),
          }
        );

        if (response.ok) {
          console.log("Imagem da galeria enviada com sucesso!");
          window.location.reload();
        } else {
          console.error("Falha ao enviar a imagem da galeria:", response.status);
        }
      }

      setSelectedImage(null);
      setCaption(""); // Limpar a legenda
      setShowPhotoModal(false);
    } catch (error) {
      console.error("Erro ao enviar a imagem da galeria:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadInProgress(true); // Indica que o upload está em andamento

      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, `users/${userId}/photos/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Atualize o progresso do upload aqui
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progresso do upload:", progress);
        },
        (error) => {
          console.error("Erro ao fazer upload da imagem:", error);
          setUploadInProgress(false); // Reinicia o estado do upload em caso de erro
        },
        async () => {
          // Upload concluído com sucesso
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadInProgress(false); // Reinicia o estado do upload após o upload bem-sucedido
            setSelectedImage(downloadURL); // Define a imagem selecionada
          } catch (error) {
            console.error("Erro ao obter a URL da imagem:", error);
            setUploadInProgress(false); // Reinicia o estado do upload em caso de erro
          }
        }
      );
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setUploadInProgress(false); // Reinicia o estado do upload em caso de erro
    }
  };

  return { handleImageUpload, changeImage2 };
};

export default useUploadModal;
