import {useState} from 'react'

const UseState = () => {
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [ws, setWs] = useState(null);
    const [profileImages, setProfileImages] = useState({});
    const [currentUserProfileImage, setCurrentUserProfileImage] = useState("");
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [scrollToBottomNeeded, setScrollToBottomNeeded] = useState(false);
    const [lastMessageSeenIndex, setLastMessageSeenIndex] = useState(null); // Novo estado para armazenar o índice da última mensagem vista pelo usuário
    const [videoPlayed, setVideoPlayed] = useState(false);
    const [mediaFile, setMediaFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(""); // Novo estado para armazenar o nome do arquivo selecionado
    const [usernames, setUsernames] = useState({});
    const [sendingMessage, setSendingMessage] = useState(false);
    const [firstUnreadMessageIndex, setFirstUnreadMessageIndex] = useState(null);
    const [mediaUploading, setMediaUploading] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

  return {
    userId, setUserId,
    messages, setMessages,
    messageInput, setMessageInput,
    ws, setWs,
    profileImages, setProfileImages,
    currentUserProfileImage, setCurrentUserProfileImage,
    unreadMessages, setUnreadMessages,
    scrollToBottomNeeded, setScrollToBottomNeeded,
    lastMessageSeenIndex, setLastMessageSeenIndex,
    videoPlayed, setVideoPlayed,
    mediaFile, setMediaFile,
    selectedFileName, setSelectedFileName,
    usernames, setUsernames,
    sendingMessage, setSendingMessage,
    firstUnreadMessageIndex, setFirstUnreadMessageIndex,
    mediaUploading, setMediaUploading,
    showMediaModal, setShowMediaModal,
    useState
  }
}

export default UseState