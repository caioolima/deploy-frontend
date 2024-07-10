import React, { useState, useEffect } from "react";
import SidebarLink from "./SideBarLink.jsx";
import { FaBell } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import NotificationModal from "./Notifications/notificationModal.jsx";
import { useAuth } from "../../../hooks/use-auth.js";

const IconNotification = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handleNotificationModal = () => {
    setIsModalOpen(true);
    document.body.style.position = "fixed";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.position = "static";
  };

  return (
    <>
      <SidebarLink
        title={t("notification_title")}
        icon={<FaBell />}
        label={t("notification_label")}
        onClick={handleNotificationModal}
      />
      {userId && (
        <NotificationModal
          userId={userId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default IconNotification;
