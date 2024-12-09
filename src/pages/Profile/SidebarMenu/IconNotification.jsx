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
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
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
            `https://server-repository.onrender.com/notificationRoutes/${userId}/unread`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.success) {
            // Verificar se há notificações não lidas e se são feitas por outros usuários
            const unreadNotifications = data.notifications.filter(notification => notification.username !== user.username);
            setHasUnreadNotifications(unreadNotifications.length > 0);
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
  }, [userId, user?.username]);

  const handleNotificationModal = async () => {
    setIsModalOpen(true);
    document.body.style.position = "fixed";
    await markNotificationsAsRead();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.position = "static";
  };

  const markNotificationsAsRead = async () => {
    try {
      await fetch(
        `https://server-repository.onrender.com/notificationRoutes/${userId}/read`,
        { method: "PUT" }
      );
      setHasUnreadNotifications(false);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return (
    <>
      <div className={`notificationIcon ${hasUnreadNotifications ? 'hasUnread' : ''}`}>
        <SidebarLink
          title={t("notification_title")}
          icon={<FaBell style={{ color: hasUnreadNotifications ? 'var(--color-primary-focus)' : 'inherit' }} />}
          label={
            <span style={{ 
              color: hasUnreadNotifications ? 'var(--color-primary-focus)' : 'inherit',
              marginLeft: '0px'
            }}>
              {t("notification_label")}
            </span>
          }
          onClick={handleNotificationModal}
        />
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
