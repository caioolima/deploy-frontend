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
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false); // Estado para indicar notificações não lidas
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const checkUnreadNotifications = async () => {
        try {
          const response = await fetch(
            `https://connecter-server-033a278d1512.herokuapp.com/notificationRoutes/${userId}/unread`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.success && data.notifications.length > 0) {
            setHasUnreadNotifications(true);
          } else {
            setHasUnreadNotifications(false);
          }
        } catch (error) {
          console.error("Error checking unread notifications:", error);
          setHasUnreadNotifications(false);
        }
      };

      checkUnreadNotifications();
    }
  }, [userId]);

  const handleNotificationModal = () => {
    setIsModalOpen(true);
    document.body.style.position = "fixed";
    // Marcar notificações como lidas ao abrir o modal
    markNotificationsAsRead();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.position = "static";
  };

  const markNotificationsAsRead = async () => {
    try {
      await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/notificationRoutes/${userId}/unread`,
        { method: "PUT" } // Supondo que você use um método PUT para marcar notificações como lidas
      );
      setHasUnreadNotifications(false); // Após marcar como lidas, atualiza o estado para indicar que não há mais notificações não lidas
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <>
      <div className="notificationIcon">
        <SidebarLink
          title={t("notification_title")}
          icon={<FaBell />}
          label={t("notification_label")}
          onClick={handleNotificationModal}
        />
        {hasUnreadNotifications && <div className="indicator"></div>}
      </div>
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
