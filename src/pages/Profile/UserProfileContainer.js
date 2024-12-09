import { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams, Navigate } from "react-router-dom";
import { useMyContext } from "../../contexts/profile-provider";

/* Components */
import SidebarMenu from "./SidebarMenu/index";
import EditModal from "./EditModal/index";
import ChangePhotoModal from "./ChangePhotoModal/index";
import UploadPhotoModal from "./UploadPhotoModal/index";
import Galeria from "./Gallery/index";
import InfoProfile from "./InfoProfile/index";
import PublicationDetailsModal from "./PublicationDetailsModal/index";
import { useAuth } from "../../hooks/use-auth";
import { useLanguage } from '../../contexts/LanguageContext';

/* Functions */
import useGetdata from "./Hooks/useGetdata";

const UserProfileContainer = () => {
  /* Estados necessários */
  const {
    showModal,
    isEditMode,
    showPhotoModal,
    selectedPublicationModalOpen,
    userDataLoaded,
  } = useMyContext();
  const { userLanguage } = useLanguage(); // Usando o contexto
  /* Função que obtem todos os dados do servidor */
  const { getDataUser } = useGetdata();
  const [userId, setUserId] = useState(useParams().userId);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const { user } = useAuth();
  /* Se a aplicação renderizar, busque os dados no servidor */
  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  
  useEffect(() => {
    // Aplica overflow: hidden ao elemento html para remover o scroll
    document.documentElement.style.overflowX = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkValidity = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setProfileNotFound(true);
        }

        const response = await fetch(`https://server-repository.onrender.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setProfileNotFound(true);
          return;
        }

        const userData = await response.json();

        if (!userData) {
          setProfileNotFound(true);
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar a validade do ID do usuário:", error);
        setProfileNotFound(true);
      }
    };

    checkValidity();
  }, [userId, getDataUser]);

  if (profileNotFound) {
    // Se o perfil não for encontrado, podemos renderizar alguma mensagem ou redirecionar o usuário
    return user ? (
      <Navigate to={`/profile/${user.id}`} />
    ) : (
      <Navigate to="/erro" />
    );
  }

  return (
    <>
      {/* Modal que exibe publicações */}
      {selectedPublicationModalOpen && <PublicationDetailsModal />}

      {/* Todo o conteúdo do profile */}
      <main className="profile">
        {userDataLoaded && (
          <section className="profile-container">
            <InfoProfile /> {/* Campo de perfil do usuário */}
            <Galeria /> {/* Galeria de imagens */}
            <SidebarMenu /> {/* Menu */}
            {isEditMode && <EditModal />} {/* Modal de edição do perfil */}
            {showModal && <ChangePhotoModal />}{" "}
            {/* Modal de mudar a foto perfil */}
            {showPhotoModal && <UploadPhotoModal />}{" "}
            {/* Modal de publicar foto na galeria */}
          </section>
        )}
      
      </main>
    </>
  );
};

export default UserProfileContainer;
