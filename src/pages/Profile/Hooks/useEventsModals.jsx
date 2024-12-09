import { useState, useEffect } from "react";
import { useMyContext } from "../../../contexts/profile-provider.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth.js";

const useEventsModals = () => {
  const {
    setShowPhotoModal,
    setSelectedPublicationModalOpen,
    setSelectedImage,
    setUploadInProgress,
    username,
    fullName,
    modalDateOfBirth,
    setModalFullName,
    setModalDateOfBirth,
    userPhotos,
    setCurrentImageIndex,
    setSelectedImageLoaded,
    setShowModal,
    setEditMode,
    setNewUsername,
    setNewBiography,
    biography,
    setUsernameError,
    setPhoneError,
    setFadeState,
    setNumberOfFollowers,
    selectedImage,
    selectedPublicationModalOpen,
    setSelectedPhotoPosition,
    currentImageIndex,
  } = useMyContext();

  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const handleClosePhotoModal = () => {
    setShowPhotoModal(false); // Fecha o modal
    setSelectedPublicationModalOpen(false); // Fecha o modal da publicação selecionada
    setSelectedImageLoaded(false);
    setSelectedImage(null); // Limpa a imagem selecionada
    setUploadInProgress(false); // Define uploadInProgress como false
    document.body.style.overflow = "auto"; // Restaura a barra de rolagem quando o modal é fechado
    setCurrentImageIndex(0); // Redefinir o índice da imagem selecionada para o primeiro ao fechar o setSelectedPublicationModalOpen
  };

  const handlePublicationClick = (index, event) => {
    setCurrentImageIndex(index); // Definir o índice da imagem clicada
    setSelectedPublicationModalOpen(true);
    setSelectedImage(userPhotos[index].url); // Definir a URL da imagem selecionada
    document.body.style.overflow = "hidden"; // Impedir que a página role enquanto o modal estiver aberto
  };

  // Função para ir para a imagem anterior na galeria
  const goToPreviousImage = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? userPhotos.length - 1 : prevIndex - 1
      );
      setFadeState("fade-in");
      checkLikeStatus();
    }, 50);
  };

  const goToNextImage = () => {
    setFadeState("fade-out");
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % userPhotos.length);
      setFadeState("fade-in");
      checkLikeStatus();
    }, 50);
  };

  const openModal = () => {
    setShowModal(true);

    document.documentElement.style.overflowX = "hidden";
  };

  const openModalTwo = () => {
    setShowPhotoModal(true);
  };

  const handlePublishClick = () => {
    openModalTwo(user && user.id);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleEditClick = () => {
    setEditMode(true);
    setNewUsername(username);
    setModalFullName(fullName);
    setModalDateOfBirth(modalDateOfBirth);
    setNewBiography(biography); // Define a biografia atual no campo de edição
    setUsernameError(""); // Limpa o estado de erro de nome de usuário
    setPhoneError("");
    document.body.style.position = "fixed";
  };

  useEffect(() => {
    if (selectedPublicationModalOpen && selectedImage) {
      setSelectedPhotoPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      setSelectedImageLoaded(false); // Definir como falso ao iniciar o carregamento

      const img = new Image();
      img.onload = () => {
        setSelectedImageLoaded(true); // Definir como verdadeiro quando a imagem estiver carregada
      };
      img.src = selectedImage;
    }
  }, [
    selectedPublicationModalOpen,
    selectedImage,
    setSelectedImageLoaded,
    setSelectedPhotoPosition,
  ]);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await fetch(
          `https://server-repository.onrender.com/relationship/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setNumberOfFollowers(data.numberOfFollowers);
        } else {
          console.error(
            "Erro ao obter o número de seguidores:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro ao obter o número de seguidores:", error);
      }
    };

    fetchFollowersCount();
  }, [userId, setNumberOfFollowers]);

  // const checkLikeStatus = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(
  //       `http://localhost:3001/${userId}/gallery-image/${encodeURIComponent(
  //         userPhotos[currentImageIndex].url
  //       )}/check-like/${user.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setIsLiked(data.userLiked); // Atualize o estado com base na resposta da API
  //     } else {
  //       setIsLiked(false);
  //       console.error("Erro ao verificar status do like:", response.statusText);
  //     }
  //   } catch (error) {
  //     setIsLiked(false);
  //     console.error("Erro ao verificar status do like:", error);
  //   }
  // };

  const checkLikeStatus = async (index = currentImageIndex) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server-repository.onrender.com/gallery/check-likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageUrl: userPhotos[index].url,
            targetUserId: user.id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLikedByUser);
      } else {
        console.error(
          "Erro ao verificar status de curtida:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao verificar status de curtida:", error);
    }
  };

  return {
    handleClosePhotoModal,
    handlePublicationClick,
    handleEditClick,
    openModal,
    goToPreviousImage,
    goToNextImage,
    openModalTwo,
    handleSignOut,
    handlePublishClick,
    checkLikeStatus,
  };
};

export default useEventsModals;
