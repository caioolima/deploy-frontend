import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const MessageList = ({
  messages,
  userId,
  profileImages,
  AiOutlineUser,
  messagesEndRef,
  getUserColorClass,
  formatMessageTime,
}) => {
  const { t } = useTranslation();
  const { countryId, communityId } = useParams();
  return (
    <div className="message-list">
      <div className="chat-message-name-top">
        <h2 className="chat-name">
          {t("Comunidade")} {countryId} - {t("Chat")}{" "}
        </h2>
      </div>

      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.userId === userId ? "right" : "left"}`}
        >
          {index === 0 || messages[index - 1].userId !== message.userId ? (
            <div>
              {/* Renderiza o nome de usuário apenas para mensagens do lado esquerdo */}
              <p className="name-info-chat">
                {message.userId !== userId ? message.username : t("Eu")}
              </p>
              {/* Renderiza a foto do perfil apenas para mensagens do lado esquerdo */}
              {message.userId !== userId && (
                <div>
                  {profileImages[message.userId] ? (
                    <img
                      src={profileImages[message.userId]}
                      alt={t("Profile")}
                      className="rounded-image-message"
                    />
                  ) : (
                    <div className="profile-icon-container">
                      <AiOutlineUser className="profile-icon-profile" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
          <div
            className={`message-content ${
              message.userId === userId ? "right" : "left"
            } ${
              message.userId !== userId
                ? getUserColorClass(message.userId) // Use getUserColorClass aqui
                : ""
            }`}
          >
            {message.media ? (
              message.media.includes("video") ||
              message.media.includes("avi") ? (
                <video src={message.media} controls className="attached-media">
                  <source src={message.media} type="video/mp4" />
                  {t("Seu navegador não suporta o elemento de vídeo.")}
                </video>
              ) : (
                <img
                  src={message.media}
                  alt={t("Mídia anexada")}
                  className="attached-media"
                />
              )
            ) : (
              <p>{message.message}</p>
            )}
          </div>
          <span className="message-time">
            {formatMessageTime(message.timestamp)}
            <span style={{ marginLeft: "5px" }}>
              {message.isSending && message.userId === userId
                ? t("Enviando...")
                : t("Enviado")}
            </span>
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
