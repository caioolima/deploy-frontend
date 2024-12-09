import "./style.css";
import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMyContext } from "../../../contexts/profile-provider";
import useEventsModals from "../Hooks/useEventsModals";
import { useAuth } from "../../../hooks/use-auth";
import {
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
  FaEllipsisH,
} from "react-icons/fa";
import { AiFillFire, AiOutlineFire, AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "react-i18next"; // Importa o hook useTranslation

const PublicationDetailsModal = () => {
  const { t } = useTranslation(); // Usa o hook useTranslation para tradução
  const { userId } = useParams();
  const {
    previousButtonDisabled,
    selectedImageLoaded,
    userPhotos,
    currentImageIndex,
    nextButtonDisabled,
    profileImage,
    username,
    fadeState,
    setDeleting,
    showDeleteModal,
    setShowDeleteModal,
  } = useMyContext();

  const { handleClosePhotoModal, goToPreviousImage, goToNextImage } =
    useEventsModals();

  const [postTime, setPostTime] = useState(""); // Estado para armazenar o tempo de postagem formatado
  const { user } = useAuth();
  const isOwner = user && user.id === userId;
  const [isLiked, setIsLiked] = useState(); // Estado para indicar se a imagem foi curtida pelo usuário
  const [isModalLoaded, setIsModalLoaded] = useState(); // Estado para indicar se o modal está carregado

  useEffect(() => {
    setIsModalLoaded(true); // Altera o estado para indicar que o modal está carregado
    calculatePostTime(); // Chama a função para calcular o tempo de postagem formatado
    checkLikeStatus(); // Verifica o status de curtida quando o modal é aberto
  }, [currentImageIndex]); // Chama checkLikeStatus sempre que currentImageIndex mudar

  const calculatePostTime = () => {
    const postedAt = new Date(userPhotos[currentImageIndex].postedAt).getTime();
    const currentTime = new Date().getTime();
    const difference = currentTime - postedAt;
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      setPostTime(
        `${seconds} ${t(seconds === 1 ? "second" : "seconds", {
          count: seconds,
        })} ${t("ago")}`
      );
      return;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      setPostTime(
        `${minutes} ${t(minutes === 1 ? "minute" : "minutes", {
          count: minutes,
        })} ${t("ago")}`
      );
      return;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      setPostTime(
        `${hours} ${t(hours === 1 ? "hour" : "hours", { count: hours })} ${t(
          "ago"
        )}`
      );
      return;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      setPostTime(
        `${days} ${t(days === 1 ? "day" : "days", { count: days })} ${t("ago")}`
      );
      return;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      setPostTime(
        `${months} ${t(months === 1 ? "month" : "months", {
          count: months,
        })} ${t("ago")}`
      );
      return;
    }

    const years = Math.floor(months / 12);
    setPostTime(
      `${years} ${t(years === 1 ? "year" : "years", { count: years })} ${t(
        "ago"
      )}`
    );
  };

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const imageRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const difference = touchEndX.current - touchStartX.current;
      if (Math.abs(difference) > 50) {
        // Se o movimento for maior que 50 pixels
        if (difference > 0) {
          // Arrastado para a direita
          if (!showDeleteModal) {
            goToNextImage();
            checkLikeStatus();
          }
        } else {
          // Arrastado para a esquerda
          if (!showDeleteModal) {
            goToPreviousImage();
            checkLikeStatus();
          }
        }
      }
    }
    touchStartX.current = null; // Reseta a posição inicial do toque
    touchEndX.current = null; // Reseta a posição final do toque
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true); // Define o estado para mostrar o modal de exclusão ao clicar no botão
  };

  const handleDeleteImage = async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      const url = `https://server-repository.onrender.com/${userId}/gallery`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: userPhotos[currentImageIndex].url,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir imagem");
      }

      console.log("Imagem excluída com sucesso!");
      handleClosePhotoModal();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleOverlayClick = () => {
    // Fecha o modal de publicação apenas se o modal de exclusão não estiver aberto
    if (!showDeleteModal) {
      handleClosePhotoModal();
    }
  };

  const handleCloseButtonClick = () => {
    // Fecha o modal de publicação apenas se o modal de exclusão não estiver aberto
    if (!showDeleteModal) {
      handleClosePhotoModal();
    }
  };

  const handleLikeImage = async () => {
    try {
      if (isLiked) {
        console.log("Você já curtiu esta imagem.");
        return; // Não faz nada se ousuário já curtiu a imagem
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server-repository.onrender.com/${userId}/gallery/like`, // Ajuste a URL para corresponder à rota correta
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url: userPhotos[currentImageIndex].url,
            likerId: user.id,
          }), // Envie a URL da imagem e o ID do usuário que curtiu
        }
      );
      if (response.ok) {
        setIsLiked(true); // Atualize o estado para refletir que o usuário curtiu a imagem
      } else {
        const data = await response.json();
        console.error("Erro ao curtir imagem:", data.message);
      }
    } catch (error) {
      console.error("Erro ao curtir imagem:", error);
    }
  };

  const handleUnlikeImage = async () => {
    try {
      if (!isLiked) {
        console.log("Você não curtiu esta imagem.");
        return; // Não faz nada se o usuário não curtiu a imagem
      }
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server-repository.onrender.com/${userId}/gallery/unlike`, // Ajuste a URL para corresponder à rota correta
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrigido aqui
          },
          body: JSON.stringify({
            url: userPhotos[currentImageIndex].url,
            likerId: user.id,
          }), // Envie a URL da imagem e o ID do usuário que descurtiu
        }
      );
      if (response.ok) {
        setIsLiked(false); // Atualize o estado para refletir que o usuário descurtiu a imagem
      } else {
        const data = await response.json();
        console.error("Erro ao descurtir imagem:", data.message);
      }
    } catch (error) {
      console.error("Erro ao descurtir imagem:", error);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://server-repository.onrender.com/gallery/check-likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrigido aqui
          },
          body: JSON.stringify({
            imageUrl: userPhotos[currentImageIndex].url,
            targetUserId: user.id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLikedByUser); // Define o estado isLiked com base na resposta
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

  useEffect(() => {
    // Aplica overflow-x: hidden ao elemento html para remover o scroll horizontal
    document.documentElement.style.overflow = "hidden";

    // Cleanup: remove overflow-x: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.overflowY = "hidden";
    };
  }, []);

  return (
    <>
      <div className="overlay" onClick={handleOverlayClick}></div>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        {isModalLoaded && (
          <div className="modal-image-container">
            <div className="content-post">
              <div className="image-contain">
                <button
                  className="modal-close"
                  onClick={handleCloseButtonClick}
                >
                  &times;
                </button>
                <button
                  className={`nav-button left ${
                    previousButtonDisabled || showDeleteModal ? "disabled" : ""
                  }`}
                  onClick={!showDeleteModal ? goToPreviousImage : undefined}
                  disabled={previousButtonDisabled || showDeleteModal}
                >
                  <FaArrowAltCircleLeft className="arrows" />
                </button>
                {selectedImageLoaded ? (
                  <img
                    src={userPhotos[currentImageIndex].url}
                    alt="Imagem selecionada"
                    className={`selected-publication-photo ${fadeState}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onLoad={() => console.log("Imagem carregada com sucesso!")}
                  />
                ) : (
                  <div className="loading-text"> {t("Loading")}</div>
                )}
                <button
                  className={`nav-button right ${
                    nextButtonDisabled || showDeleteModal ? "disabled" : ""
                  }`}
                  onClick={!showDeleteModal ? goToNextImage : undefined}
                  disabled={nextButtonDisabled || showDeleteModal}
                >
                  <FaArrowAltCircleRight className="arrows" />
                </button>
              </div>
              <div className="user-details">
                <Link to={`/profile/${userId}`}>
                  {profileImage ? (
                    <img
                      className="rounded-image"
                      src={profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <AiOutlineUser className="photo-modal-profile-icon" /> // Ícone de usuário padrão
                  )}
                </Link>
                <div className="text-content">
                  <p className="details-user">
                    <Link to={`/profile/${userId}`}>{username}</Link>
                  </p>
                  <p className="post-time">{postTime}</p>
                </div>
                <div className="contain-like">
                  {isModalLoaded && (
                    <button
                      onClick={isLiked ? handleUnlikeImage : handleLikeImage}
                    >
                      {isLiked ? (
                        <AiFillFire className="like filled" />
                      ) : (
                        <AiOutlineFire className="like" />
                      )}
                    </button>
                  )}
                </div>
                {isOwner && (
                  <div className="delete-menu">
                    <button
                      className="delete-menu-button"
                      onClick={handleOpenDeleteModal}
                    >
                      <FaEllipsisH />
                    </button>
                    {showDeleteModal && (
                      <div className="modal-modal">
                        <div className="modal-content-modal">
                          <p className="text-delete-modal">
                            {t("delete_modal_message")}
                          </p>
                          <div className="modal-buttons-modal">
                            <button onClick={handleDeleteImage}>
                              {t("delete_modal_yes")}
                            </button>
                            <button onClick={() => setShowDeleteModal(false)}>
                              {t("delete_modal_no")}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PublicationDetailsModal;
