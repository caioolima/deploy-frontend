import { useMyContext } from "../../../contexts/profile-provider";
import { useParams } from "react-router-dom";
import useEventsModals from "./useEventsModals";

const useProfileEdit = () => {
  const {
    newUsername,
    newBiography,
    setBiography,
    setUsername,
    setUsernameError,
    setEditMode,
    setNewPhone,
    setSelectedImage,
    setShowModal,
  } = useMyContext();

  const { userId } = useParams();
  const { handleSignOut } = useEventsModals();

  // Função para verificar se o usuário possui uma biografia
  const checkBiographyExists = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://server-repository.onrender.com/users/${userId}/check-biography`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Verifica se o servidor retornou 'success: true'
        if (data.success) {
          // Verifica se a biografia existe na resposta
          if (data.hasBiography !== undefined) {
            return data.hasBiography; // Retorna true se a biografia existir, false caso contrário
          } else {
            console.log(
              "O servidor não retornou a informação sobre a existência da biografia."
            );
            return false; // Retorna false se não houver informação sobre a biografia
          }
        } else {
          console.error(
            "Erro ao verificar a existência da biografia:",
            data.message
          );
          return false; // Retorna false em caso de erro na requisição
        }
      } else {
        console.error(`Erro ${response.status}: ${response.statusText}`);
        return false; // Retorna false em caso de erro na requisição
      }
    } catch (error) {
      console.error("Erro ao verificar a existência da biografia:", error);
      return false; // Retorna false em caso de erro na requisição
    }
  };

  // Função para salvar as edições do perfil
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://server-repository.onrender.com/users/${userId}/edit`;

      if (!newUsername) {
        setUsernameError("Por favor, insira um nome de usuário.");
        return;
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newUsername, newBiography }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setBiography(newBiography);
          setUsername(newUsername);
          setEditMode(false);
          setUsernameError("");
          console.log("Perfil atualizado com sucesso!");
        } else {
          setUsernameError(data.message);
        }
      } else if (response.status === 400) {
        setUsernameError("Usuário não disponível");
      } else {
        setUsernameError(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  };

  // Função para excluir a biografia do usuário
  const handleDeleteBiography = async () => {
    try {
      const biographyExists = await checkBiographyExists();
      if (!biographyExists) {
        console.log("O usuário não possui uma biografia para deletar.");
        return;
      }

      const token = localStorage.getItem("token");
      const url = `https://server-repository.onrender.com/users/${userId}/biography`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setBiography("");
          setEditMode(false);
          setShowModal(false);
          console.log("Biografia excluída com sucesso!");
        } else {
          console.error("Erro ao excluir a biografia:", data.message);
        }
      } else {
        console.error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao excluir a biografia:", error);
    }
  };

  // Função para atualizar o novo número de telefone
  const handleChangePhoneNumber = (newPhoneNumber) => {
    setNewPhone(newPhoneNumber);
  };

  // Função para deletar a conta do usuário
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://server-repository.onrender.com/auth/requestAccountDeletion`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Conta agendada para exclusão com sucesso!");
          handleSignOut();
        } else {
          console.error("Erro ao excluir conta:", data.message);
        }
      } else {
        console.error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
    setShowModal(false);
  };

  return {
    setUsernameError,
    handleSaveEdit,
    handleChangePhoneNumber,
    handleCloseModal,
    handleDeleteBiography,
    handleDeleteAccount,
  };
};

export default useProfileEdit;
