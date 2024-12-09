import React, { useState, useEffect } from "react";
import "./FindUserPage.css"; // Importar o arquivo de estilos CSS

/* Componentes */
import SidebarMenu from "../Profile/SidebarMenu/index";
import { useTranslation } from "react-i18next"; // Importar o hook useTranslation para tradução
import { AiOutlineUser } from "react-icons/ai"; // Importando o ícone de usuário padrão
import { useLanguage } from '../../contexts/LanguageContext';

const FindUserPage = () => {
  const { t } = useTranslation(); // Usar o hook useTranslation para tradução
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const { userLanguage } = useLanguage(); // Usando o contexto

  useEffect(() => {
    const cleanedUsername = username.trim().replace(/\s+/g, " ");

    if (cleanedUsername === "") {
      setUsers([]);
      setError(null);
      return;
    }

    // Aguardar 500ms após o usuário parar de digitar antes de buscar usuários
    const timeout = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            `https://server-repository.onrender.com/find/${cleanedUsername}`
          );
          const userData = await response.json();

          if (!response.ok) {
            throw new Error(t("users_not_found")); // Traduzir a mensagem de erro
          }

          setUsers(userData);
          setError(null);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
          setError(error.message);
          setUsers([]);
        }
      };

      fetchUsers();
    }, 500);

    // Limpar o timeout anterior se o usuário ainda estiver digitando
    return () => clearTimeout(timeout);
  }, [username, t]); // Adicionar t como dependência para atualizar a tradução quando a linguagem for alterada
  document.body.style.position = "fixed";
  return (
    <div className="find-user-container">
      {/* Container principal */}

      <SidebarMenu />
      <div className="find-user-content">
        {/* Conteúdo da página */}
        <h1 className="details-users-details">{t("find_user_title")}</h1>{" "}
        {/* Traduzir o título */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("username_placeholder")} // Traduzir o placeholder
          className="username-input" // Adicionando classe para estilização específica
        />
        {users.length > 0 && (
          <div>
            <div className="user-list">
              {/* Lista de usuários */}
              {users.map((user) => (
                <div key={user._id} className="user-item-user">
                  {/* Item de usuário */}
                  <a href={`/profile/${user._id}`} className="user-link-user">
                    {/* Link para o perfil do usuário */}
                    <div className="user-info">
                      {user.profileImageUrl ? ( // Verifica se há uma imagem de perfil
                        <img
                          src={user.profileImageUrl}
                          alt={`${t("profile_picture_alt")} ${user.username}`} // Traduzir o texto alternativo da imagem
                          className="user-avatar"
                        /> // Mostra a imagem de perfil
                      ) : (
                        <AiOutlineUser className="profile-icon-profile" /> // Mostra a moldura se não houver imagem de perfil
                      )}
                      <div className="username-search">{user.username}</div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {error && (
          <p className="error-message-error">
            {t("error")}: {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FindUserPage;
