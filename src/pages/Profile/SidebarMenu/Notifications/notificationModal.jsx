// components/NotificationModal.js

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./NotificationModal.module.css";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { useLanguage } from "../../../../contexts/LanguageContext"; // Ajuste o caminho conforme necessário
import { AiOutlineUser } from "react-icons/ai";

const NotificationModal = ({ userId, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { userLanguage } = useLanguage(); // Obtém o idioma do contexto
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(
            `https://server-repository.onrender.com/notificationRoutes/${userId}/types-and-users`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.success) {
            setNotifications(data.notifications);
          } else {
            throw new Error("Failed to fetch notifications");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  // Função para formatar a data
  const formatDate = (date) => {
    const locale =
      userLanguage === "pt-BR" ? ptBR : userLanguage === "es" ? es : enUS;
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.titleNotification}>{t("notifications")}</h2>
        {loading && <p>{t("loading")}</p>}
        {error && (
          <p>
            {t("error")}: {error}
          </p>
        )}
        {!loading && !error && (
          <ul className={styles.notificationList}>
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                return (
                  <li
                    key={notification._id}
                    className={styles.notificationItem}
                  >
                    <div className={styles.notificationContent}>
                      {notification.profileImageUrl ? (
                        <img
                          src={notification.profileImageUrl}
                          alt={`${notification.username}'s profile`}
                          className={styles.notificationImage}
                        />
                      ) : (
                        <AiOutlineUser
                          style={{
                            marginLeft: "-1px",
                            width: "40px",
                            height: "40px",
                            color: "var(--color-gray)",
                            borderRadius: "50%", // Corrigido de borderradius para borderRadius
                            marginRight: "15px",
                            display: "inline-block", // Certifica que o ícone se comporte como um bloco inline
                          }}
                        />
                      )}
                      <div>
                        <p>
                          <strong>{notification.username || "User"}</strong>{" "}
                          {t(notification.type)}
                        </p>
                        <p className={styles.notificationTimestamp}>
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className={styles.notificationNo}>{t("no_notifications")}</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
