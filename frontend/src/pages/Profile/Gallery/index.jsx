import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
import { useMyContext } from "../../../contexts/profile-provider";
import useEventsModals from "../Hooks/useEventsModals";
import { useAuth } from "../../../contexts/auth-provider";
import { useParams } from "react-router-dom";
import TabButton from "./TabButton";
import PhotoGrid from "./PhotoGrid";
import SavedPostsGrid from "./SavedPostsGrid";
import EmptyMessage from "./EmptyMessage";

const Galeria = () => {
  const { t } = useTranslation();
  const { userPhotos } = useMyContext();
  const { handlePublicationClick } = useEventsModals();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loadedImages, setLoadedImages] = useState(
    Array(userPhotos.length).fill(false)
  );
  const [activeTab, setActiveTab] = useState("galeria");
  const { user } = useAuth();
  const { userId } = useParams();
  const [loadingSavedPosts, setLoadingSavedPosts] = useState(true);

  useEffect(() => {
    // Aplica overflow: hidden ao elemento html para remover o scroll
    document.documentElement.style.overflowX = "hidden";

    // Cleanup: remove overflow: hidden ao desmontar o componente
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      userPhotos.forEach((photoData, index) => {
        const img = new Image();
        img.src = photoData.url;
        img.onload = () => handleImageLoaded(index);
        img.onerror = (e) =>
          console.error(`Failed to load image at ${photoData.url}`, e);
      });
    };

    if (userPhotos.length > 0) {
      preloadImages();
    }
  }, [userPhotos]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoadingSavedPosts(true);
      try {
        // Fazer uma requisição para obter as publicações salvas
        const response = await fetch(
          `https://connecter-server-033a278d1512.herokuapp.com/feedRoutes/savedPosts/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved posts");
        }
        const data = await response.json();

        // Atualiza os posts salvos no estado e no localStorage
        setSavedPosts(data.savedPosts);
        localStorage.setItem(`savedPosts_${userId}`, JSON.stringify(data.savedPosts));
        setLoadingSavedPosts(false);
      } catch (error) {
        console.error("Error fetching saved posts:", error);

        // Verifica se os posts salvos estão no localStorage
        const savedPostsFromStorage = localStorage.getItem(`savedPosts_${userId}`);
        if (savedPostsFromStorage) {
          setSavedPosts(JSON.parse(savedPostsFromStorage));
        }

        setLoadingSavedPosts(false);
      }
    };

    // Se a guia ativa for 'salvos' e o userId corresponder ao user.id, buscar as publicações salvas
    if (activeTab === "salvos" && user && userId === user.id) {
      fetchSavedPosts();
    }
  }, [activeTab, userId, user]);

  const handleImageLoaded = (index) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="gallery-container">
      <div className="tab-buttons">
        <TabButton
          active={activeTab === "galeria"}
          onClick={() => toggleTab("galeria")}
        >
          gallery
        </TabButton>
        {user && userId === user.id && (
          <TabButton
            active={activeTab === "salvos"}
            onClick={() => toggleTab("salvos")}
          >
            saved
          </TabButton>
        )}
      </div>
      {activeTab === "galeria" ? (
        userPhotos.length > 0 ? (
          <PhotoGrid
            photos={userPhotos}
            loadedImages={loadedImages}
            handleImageLoaded={handleImageLoaded}
            handleClick={handlePublicationClick}
          />
        ) : (
          <EmptyMessage messageKey="no_photos" />
        )
      ) : (
        userId === user.id && (
          <SavedPostsGrid
            savedPosts={savedPosts}
            loadedImages={loadedImages}
            handleImageLoaded={handleImageLoaded}
            loadingSavedPosts={loadingSavedPosts} // Passa o estado de carregamento
          />
        )
      )}
    </div>
  );
};

export default Galeria;
