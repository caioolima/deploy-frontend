import { useRef, useEffect } from "react";
import { useAuth } from "../../../../hooks/use-auth";
import { useParams } from "react-router-dom";
import { storage } from "../../../../components/Firebase/storage";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  list,
} from "firebase/storage";

import UseState from "./UseState";

const Function = () => {
  const { user } = useAuth();
  const { countryId, communityId } = useParams();
  const messagesEndRef = useRef(null);

  // Estados
  const {
    userId,
    setUserId,
    messages,
    setMessages,
    messageInput,
    setMessageInput,
    ws,
    setWs,
    profileImages,
    setProfileImages,
    currentUserProfileImage,
    setCurrentUserProfileImage,
    unreadMessages,
    setUnreadMessages,
    scrollToBottomNeeded,
    setScrollToBottomNeeded,
    lastMessageSeenIndex,
    setLastMessageSeenIndex,
    videoPlayed,
    setVideoPlayed,
    mediaFile,
    setMediaFile,
    selectedFileName,
    setSelectedFileName,
    usernames,
    setUsernames,
    sendingMessage,
    setSendingMessage,
    firstUnreadMessageIndex,
    setFirstUnreadMessageIndex,
    mediaUploading,
    setMediaUploading,
    showMediaModal,
    setShowMediaModal,
    useState,
  } = UseState();
  useState(false);

  // Function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUnreadMessageClick = () => {
    if (unreadMessages > 0) {
      setUnreadMessages(0);
      setLastMessageSeenIndex(messages.length - 1);
      setScrollToBottomNeeded(true); // Adicione esta linha para garantir que a rolagem ocorra após marcar as mensagens como lidas
    }
  };

  const scrollToBottomIfNeeded = () => {
    if (scrollToBottomNeeded) {
      scrollToBottom();
      setScrollToBottomNeeded(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
      setMessageInput("");
    }
  };

  const scrollToLastMessageSeen = () => {
    if (lastMessageSeenIndex !== null) {
      const lastMessageRef = document.querySelector(
        `.message-list .message:nth-child(${lastMessageSeenIndex + 1})`
      );
      if (lastMessageRef) {
        lastMessageRef.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      scrollToBottom();
    }
  };

  const handleMediaModalClose = () => {
    setShowMediaModal(false);
  };

  const handleMediaFileChange = (event) => {
    const file = event.target.files[0];
    setMediaFile(file);
    setSelectedFileName(file.name); // Define o nome do arquivo selecionado
  };

  const handleCancel = () => {
    // Limpa a mídia selecionada e o nome do arquivo
    setMediaFile(null);
    setSelectedFileName("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setMediaFile(file);
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Garante que os minutos tenham dois dígitos
    return `${hours}:${minutes}`;
  };

  const getUserColorClass = (userId) => {
    // Verifica se a cor do usuário está armazenada no localStorage
    const storedColor = localStorage.getItem(`userColor_${userId}`);

    if (storedColor) {
      return storedColor; // Retorna a cor armazenada se estiver disponível
    } else {
      // Caso contrário, gera uma nova cor
      const randomNumber = Math.floor(Math.random() * 7) + 1;
      const colorClass = `user-color-random-${randomNumber}`;

      // Armazena a cor gerada no localStorage para o usuário
      localStorage.setItem(`userColor_${userId}`, colorClass);

      return colorClass;
    }
  };
  // Async Function
  // No useEffect que carrega as mensagens da comunidade
  const loadCommunityMessages = async () => {
    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/message/mensagens/${communityId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar mensagens da comunidade");
      }

      const data = await response.json();

      // Atualize a função para buscar nome de usuário
      const fetchUsernames = async () => {
        const userIds = data.map((message) => message.userId);
        const uniqueUserIds = [...new Set(userIds)];
        const fetchedUsernames = {};
        for (const userId of uniqueUserIds) {
          const response = await fetch(
            `https://connecter-server-033a278d1512.herokuapp.com/auth/user/${userId}/username`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const userData = await response.json();
            fetchedUsernames[userId] = userData.username;
          }
        }
        return fetchedUsernames;
      };

      const usernames = await fetchUsernames();

      const newMessages = data.map((message, index) => ({
        ...message,
        username: usernames[message.userId] || "",
      }));

      setMessages(newMessages);
      setFirstUnreadMessageIndex(
        newMessages.findIndex(
          (message) => !message.isSending && !message.userId && !message.media
        )
      ); // Encontra o índice da primeira mensagem não lida

      scrollToLastMessageSeen();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  // Função para enviar mensagens pendentes
  const sendPendingMessages = async () => {
    // Verifica se há conexão de internet
    if (navigator.onLine) {
      // Obter mensagens pendentes do armazenamento local
      const pendingMessages =
        JSON.parse(localStorage.getItem("pendingMessages")) || [];
      // Limpa as mensagens pendentes do armazenamento local
      localStorage.removeItem("pendingMessages");
      // Envie cada mensagem pendente
      for (const pendingMessage of pendingMessages) {
        await sendMessage(pendingMessage);
      }
    }
  };

  const sendMessage = async () => {
    setSendingMessage(true);

    const fetchUsernames = async (userIds) => {
      const uniqueUserIds = [...new Set(userIds)];
      const fetchedUsernames = {};

      for (const userId of uniqueUserIds) {
        const response = await fetch(
          `https://connecter-server-033a278d1512.herokuapp.com/auth/user/${userId}/username`,
          { method: "GET" }
        );
        if (response.ok) {
          const userData = await response.json();
          fetchedUsernames[userId] = userData.username;
        } else {
          console.error(`Erro ao buscar username para o userId: ${userId}`);
        }
      }
      return fetchedUsernames;
    };

    const usernames = await fetchUsernames([userId]);

    if (messageInput.trim() !== "" && ws.readyState === WebSocket.OPEN) {
      const newMessage = {
        userId: userId,
        message: messageInput,
        username: usernames[userId] || "",
        profileImage: currentUserProfileImage || "",
        timestamp: new Date(),
        media: mediaFile ? URL.createObjectURL(mediaFile) : null,
        isSending: true,
      };

      if (!navigator.onLine) {
        const pendingMessages =
          JSON.parse(localStorage.getItem("pendingMessages")) || [];
        localStorage.setItem(
          "pendingMessages",
          JSON.stringify([...pendingMessages, newMessage])
        );
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageInput("");
        setMediaFile(null);
        setSelectedFileName("");
        setSendingMessage(false);
        return;
      }

      ws.send(JSON.stringify(newMessage));

      try {
        const response = await fetch(
          `https://connecter-server-033a278d1512.herokuapp.com/message/enviar-mensagem/${userId}/${communityId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao enviar mensagem");
        }
        newMessage.isSending = false;
        setSendingMessage(false);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setScrollToBottomNeeded(true);
        setMessageInput("");
        setMediaFile(null);
        setSelectedFileName("");
        await loadCommunityMessages();
      } catch (error) {
        console.error("Erro:", error.message);
        setSendingMessage(false);
      }
    } else {
      setSendingMessage(false);
    }
  };

  const fetchAllUserProfileImages = async () => {
    try {
      const userIds = messages.map((message) => message.userId);
      const uniqueUserIds = [...new Set(userIds)];
      for (const userId of uniqueUserIds) {
        if (!profileImages[userId]) {
          const response = await fetch(
            `https://connecter-server-033a278d1512.herokuapp.com/users/${userId}/profile-images`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao obter a imagem de perfil do usuário");
          }

          const data = await response.json();
          setProfileImages((prevProfileImages) => ({
            ...prevProfileImages,
            [userId]: data.profileImageUrl,
          }));
        }
      }
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const fetchUserProfileImage = async (userId) => {
    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/users/${userId}/profile-images`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter a imagem de perfil do usuário");
      }

      const data = await response.json();
      setProfileImages((prevProfileImages) => ({
        ...prevProfileImages,
        [userId]: data.profileImageUrl,
      }));
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const handleMediaUpload = async () => {
    if (mediaFile) {
      // Verifica se o arquivo é uma imagem ou um vídeo
      const mediaType = mediaFile.type.startsWith("video/") ? "video" : "image";
      const fileName = `${mediaType}_${mediaFile.name}`;
      setMediaUploading(true);
      // Crie uma referência para o local de armazenamento da mídia
      const storageRef = ref(storage, `media/${fileName}`);

      try {
        // Faça o upload do arquivo para o Firebase Storage
        await uploadBytesResumable(storageRef, mediaFile);

        // Obtenha a URL da mídia após o upload
        const url = await getDownloadURL(storageRef);

        // Enviar a URL da mídia para o backend
        await enviarUrlParaBackEnd(url);
        // Inicialize o objeto newMessage antes de usá-lo
        const newMessage = {
          userId: userId,
          message: messageInput,
          media: url, // Adiciona a URL da mídia à mensagem
          profileImage: currentUserProfileImage || "",
          timestamp: new Date(),
        };

        // Envie a mensagem para o chat
        ws.send(JSON.stringify(newMessage));

        // Limpe a mídia selecionada e o nome do arquivo
        setMediaFile(null);
        setSelectedFileName("");
        setShowMediaModal(false);

        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, message: messageInput }, // Garanta que a mensagem inclua o texto digitado
        ]);

        setMessageInput(""); // Limpe a entrada de mensagem
        setMediaFile(null); // Limpe a mídia selecionada
        setSelectedFileName(""); // Limpe o nome do arquivo selecionado
        setShowMediaModal(false); // Feche o modal de mídia
        setMediaUploading(false);
      } catch (error) {
        setMediaUploading(false);
      }
    }
  };

  const enviarUrlParaBackEnd = async (url) => {
    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/message/enviar-mensagem/${userId}/${communityId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageInput,
            media: url, // Envie a URL da mídia para o backend
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Erro ao enviar URL da mídia para o backend:", error);
    }
  };

  // UseEffect
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setCurrentUserProfileImage(user.profileImageUrl);
      loadCommunityMessages(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (messages.length > 0) {
      fetchAllUserProfileImages();
    }
  }, [messages]);

  useEffect(() => {
    // Estabelece a conexão WebSocket
    const ws = new WebSocket(
      "wss://websocket-deploy-ac202d6667db.herokuapp.com/"
    );
    let pingInterval; // Variável para armazenar o intervalo do ping

    ws.onopen = () => {
      console.log("Conexão WebSocket estabelecida");
      setWs(ws);

      // Configura o intervalo para enviar pings a cada 30 segundos
      pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000); // 30 segundos
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket fechada");
      clearInterval(pingInterval); // Limpa o intervalo quando a conexão é fechada
    };

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(pingInterval); // Limpa o intervalo quando o componente é desmontado
    };
  }, [userId, communityId]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        let newMessage;
        if (event.data instanceof Blob) {
          event.data.text().then((text) => {
            try {
              newMessage = JSON.parse(text);
            } catch (error) {
              console.error("Erro ao analisar a mensagem JSON:", error.message);
              return;
            }
            console.log("Nova mensagem recebida:", newMessage);
            // Verifica se a mensagem recebida não é um ping
            if (newMessage.type !== "ping") {
              // Verifica se a mensagem recebida não é do usuário atual
              if (newMessage.userId !== userId) {
                setUnreadMessages((prevUnread) => prevUnread + 1);
                fetchUserProfileImage(newMessage.userId);
                // Adiciona a mensagem apenas se não for duplicada
                if (
                  !messages.find((msg) => msg.message === newMessage.message)
                ) {
                  setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
              }
            }
          });
        } else {
          try {
            newMessage =
              typeof event.data === "string"
                ? JSON.parse(event.data)
                : event.data;
          } catch (error) {
            console.error("Erro ao analisar a mensagem JSON:", error.message);
            return;
          }

          // Verifica se a mensagem recebida não é um ping
          if (newMessage.type !== "ping") {
            // Verifica se a mensagem recebida não é do usuário atual
            if (newMessage.userId !== userId) {
              setUnreadMessages((prevUnread) => prevUnread + 1);
              fetchUserProfileImage(newMessage.userId);
              // Adiciona a mensagem apenas se não for duplicada
              if (!messages.find((msg) => msg.message === newMessage.message)) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              }
            }
          }
        }
      };
    }
  }, [ws, userId]);

  useEffect(() => {
    scrollToBottomIfNeeded();
  }, [messages, scrollToBottomNeeded, unreadMessages]);

  useEffect(() => {
    if (scrollToBottomNeeded) {
      scrollToBottom();
      setScrollToBottomNeeded(false);
    }
  }, [messages, scrollToBottomNeeded]);

  return {
    // function
    scrollToBottom,
    handleUnreadMessageClick,
    scrollToBottomIfNeeded,
    handleKeyPress,
    scrollToLastMessageSeen,
    handleMediaModalClose,
    handleMediaFileChange,
    handleCancel,
    handleDragOver,
    handleDrop,
    formatMessageTime,
    getUserColorClass,

    // state
    userId,
    setUserId,
    messages,
    setMessages,
    messageInput,
    setMessageInput,
    ws,
    setWs,
    profileImages,
    setProfileImages,
    currentUserProfileImage,
    setCurrentUserProfileImage,
    unreadMessages,
    setUnreadMessages,
    scrollToBottomNeeded,
    setScrollToBottomNeeded,
    lastMessageSeenIndex,
    setLastMessageSeenIndex,
    videoPlayed,
    setVideoPlayed,
    mediaFile,
    setMediaFile,
    selectedFileName,
    setSelectedFileName,
    usernames,
    setUsernames,
    sendingMessage,
    setSendingMessage,
    firstUnreadMessageIndex,
    setFirstUnreadMessageIndex,
    mediaUploading,
    setMediaUploading,
    showMediaModal,
    setShowMediaModal,
    useState,

    // asyncFunction
    loadCommunityMessages,
    sendPendingMessages,
    sendMessage,
    fetchAllUserProfileImages,
    fetchUserProfileImage,
    handleMediaUpload,
    enviarUrlParaBackEnd,

    communityId,
    messagesEndRef,
    user,
  };
};

export default Function;
