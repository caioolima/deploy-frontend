// EmptyMessage.js
import React from "react";
import { useTranslation } from "react-i18next";

const EmptyMessage = ({ messageKey }) => {
  const { t } = useTranslation();
  return <p className="empty-message">{t(messageKey)}</p>;
};

export default EmptyMessage;
