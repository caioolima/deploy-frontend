



const MessageList = ({
    messages,
    userId,
    profileImages,
    AiOutlineUser,
    messagesEndRef,
    getUserColorClass,
    formatMessageTime }) => {
  return (
    <div className="message-list">
       <h2 className="chat-name">Chat</h2>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.userId === userId ? "right" : "left"
            }`}
          >
            {index === 0 || messages[index - 1].userId !== message.userId ? (
              <div>
                {/* Renderiza o nome de usuário apenas para mensagens do lado esquerdo */}
                <p className="name-info-chat">
                  {message.userId !== userId ? message.username : "Eu"}
                </p>
                {/* Renderiza a foto do perfil apenas para mensagens do lado esquerdo */}
                {message.userId !== userId && (
                  <div>
                    {profileImages[message.userId] ? (
                      <img
                        src={profileImages[message.userId]}
                        alt="Profile"
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
                message.media.includes("mp4") ||
                message.media.includes("avi") ? (
                  <video
                    src={message.media}
                    controls
                    className="attached-media"
                  >
                    <source src={message.media} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                ) : (
                  <img
                    src={message.media}
                    alt="Mídia anexada"
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
                  ? "Enviando..."
                  : "Enviado"}
              </span>
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
  )
}

export default MessageList