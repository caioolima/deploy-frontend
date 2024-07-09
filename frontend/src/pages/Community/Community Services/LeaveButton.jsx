// Header.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { checkMembership, leaveCommunity } from "../../Community/Community Services/communityService";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LeaveButton = () => {
  const { user } = useAuth();
  const { communityId } = useParams();
  const [isMember, setIsMember] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      verifyMembership(user.id, communityId);
    }
  }, [user, communityId]);

  const verifyMembership = async (userId, communityId) => {
    try {
      const isUserMember = await checkMembership(userId, communityId);
      setIsMember(isUserMember);
    } catch (error) {
      console.error("Erro ao verificar a associação do usuário com a comunidade:", error);
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      const left = await leaveCommunity(user.id, communityId);
      if (left) {
        setIsMember(false);
        navigate("/worldcommunity"); // Navega para a rota especificada
      }
    } catch (error) {
      console.error("Erro ao sair da comunidade:", error);
    }
  };

  return (
    <header>
      {/* Exibe o botão para sair da comunidade se o usuário for membro */}
      {isMember && (
        <button className="leave-button" onClick={handleLeaveCommunity}>
          {t("leaveCommunity")}
        </button>
      )}
    </header>
  );
};

export default LeaveButton;
