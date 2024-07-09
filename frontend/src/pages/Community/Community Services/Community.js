import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { checkMembership, joinCommunity } from "../../Community/Community Services/communityService";
import Flag from "./Flag";
import CommunityRules from "./CommunityRules";
import JoinButton from "./JoinButton";
import SidebarMenu from "../../Profile/SidebarMenu/index";
import BrasilFlag from "./flags/brasil.jpeg";
import AlemanhaFlag from "./flags/alemanha.png";
import JapaoFlag from "./flags/japao.png";
import "./community.css";
import { useTranslation } from "react-i18next";
import LeaveButton from "./LeaveButton";

const CountryDetails = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const { countryId, communityId } = useParams();
  const normalizedCountryId = countryId.toLowerCase();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      verifyMembership(user.id, communityId);
    }
  }, [user, communityId]);

  useEffect(() => {
    if (userId) {
      verifyMembership(userId, communityId);
    }
  }, [userId, communityId]);

  const verifyMembership = async (userId, communityId) => {
    try {
      const isUserMember = await checkMembership(userId, communityId);
      setIsMember(isUserMember);
    } catch (error) {
      console.error("Erro ao verificar a associação do usuário com a comunidade:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCommunity = async () => {
    try {
      const joined = await joinCommunity(userId, communityId);
      if (joined) setIsMember(true);
    } catch (error) {
      console.error("Erro ao entrar na comunidade:", error);
    }
  };

  const flagMappings = {
    brasil: BrasilFlag,
    alemanha: AlemanhaFlag,
    japao: JapaoFlag,
  };

  const countryFlag = flagMappings[normalizedCountryId];

  return (
    <div>
      {!loading && (
        <Flag countryFlag={countryFlag}>
          <SidebarMenu />
          {isMember && (
            <LeaveButton/>
          )}
          <div className="country-details-container">
            <h2 className="country-details-title">
              {t("details-community-title")}
            </h2>
            <p className="country-id">{countryId}</p>
            <CommunityRules />
            {/* Sempre exibe o botão para entrar na comunidade */}
            <JoinButton
              isMember={isMember}
              countryId={countryId}
              communityId={communityId}
              handleJoinCommunity={handleJoinCommunity}
            />
          </div>
        </Flag>
      )}
    </div>
  );
};

export default CountryDetails;
