import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const JoinButton = ({
  isMember,
  countryId,
  communityId,
  handleJoinCommunity,
}) => {
  const { t } = useTranslation();
  return isMember ? (
    <Link
      to={`/comunidade/${countryId}/${communityId}/chat`}
      className="join-button"
    >
      {t("join")}
    </Link>
  ) : (
    <button className="join-button" onClick={handleJoinCommunity}>
      {t("joinCommunity")}
    </button>
  );
};

export default JoinButton;
