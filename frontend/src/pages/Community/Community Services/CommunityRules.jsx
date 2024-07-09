import React from "react";
import { useTranslation } from "react-i18next";

const CommunityRules = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className="community-rules-title">{t("communityRulesTitle")}</h3>
      <ul className="community-rules-list">
        <li>{t("rule1")}</li>
        <li>{t("rule2")}</li>
        <li>{t("rule3")}</li>
        <li>{t("rule4")}</li>
      </ul>
    </div>
  );
};

export default CommunityRules;
