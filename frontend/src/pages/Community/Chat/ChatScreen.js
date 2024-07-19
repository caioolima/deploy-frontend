import "./chat.css";
import SidebarMenu from "../../Profile/SidebarMenu/index";
import { AiOutlineCamera } from "react-icons/ai"; // Importa o ícone de câmera
import { AiOutlineUser } from "react-icons/ai"; // Importando o ícone de usuário padrão


import MessageInput from "./Components/MessageInput";
import MessageList from "./Components/MessageList";
import MediaModal from "./Components/MediaModal";
import { useLanguage } from '../../../contexts/LanguageContext';

import Function from "./function/function";

const ChatScreen = () => {
    const {
    // function
        handleUnreadMessageClick,
        handleKeyPress,
        handleMediaModalClose,
        handleMediaFileChange,
        handleCancel,
        handleDragOver,
        handleDrop,
        formatMessageTime,
        getUserColorClass,

    // state
        userId,
        messages, 
        messageInput, setMessageInput,
        profileImages,
        unreadMessages, 
        lastMessageSeenIndex,
        mediaFile, 
        setSendingMessage,
        mediaUploading, 
        showMediaModal, setShowMediaModal,
    // asyncFunction
        sendMessage,
        handleMediaUpload,

        messagesEndRef,
    } = Function()

  
  return (
    <div className="chat-screen">
      <SidebarMenu />
      <MessageList
          AiOutlineUser={AiOutlineUser}
          formatMessageTime={formatMessageTime}
          getUserColorClass={getUserColorClass}
          messages={messages}
          messagesEndRef={messagesEndRef}
          profileImages={profileImages}
          userId={userId}
      />
      <MessageInput 
          AiOutlineCamera={AiOutlineCamera} 
          handleKeyPress={handleKeyPress}
          handleUnreadMessageClick={handleUnreadMessageClick}
          lastMessageSeenIndex={lastMessageSeenIndex}
          messageInput={messageInput}
          messages={messages}
          sendMessage={sendMessage}
          setMessageInput={setMessageInput}
          unreadMessages={unreadMessages}
          setShowMediaModal={setShowMediaModal}
      />

      <MediaModal
        AiOutlineCamera={AiOutlineCamera}
        handleCancel={handleCancel}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleMediaFileChange={handleMediaFileChange}
        handleMediaModalClose={handleMediaModalClose}
        handleMediaUpload={handleMediaUpload}
        sendMessage={sendMessage}
        setSendingMessage={setSendingMessage}
        mediaFile={mediaFile}
        mediaUploading={mediaUploading}
        messageInput={messageInput}
        showMediaModal={showMediaModal}
      />
    </div>
  );
};
export default ChatScreen;