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
  const [loadingSavedPosts, setLoadingSavedPosts] = useState(true); // Adiciona o estado de carregamento
  const { user } = useAuth();
  const { userId } = useParams();

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
    // Recupera posts salvos do localStorage
    const savedPostsFromStorage = localStorage.getItem("savedPosts");
    if (savedPostsFromStorage) {
      setSavedPosts(JSON.parse(savedPostsFromStorage));
      setLoadingSavedPosts(false);
    } else {
      // Caso não haja posts no localStorage, busca do servidor
      const fetchSavedPosts = async () => {
        setLoadingSavedPosts(true);
        try {
          const response = await fetch(
            `https://connecter-server-033a278d1512.herokuapp.com/feedRoutes/savedPosts/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch saved posts");
          }
          const data = await response.json();
          setSavedPosts(data.savedPosts);
          // Armazena os posts no localStorage
          localStorage.setItem("savedPosts", JSON.stringify(data.savedPosts));
        } catch (error) {
          console.error("Error fetching saved posts:", error);
        } finally {
          setLoadingSavedPosts(false);
        }
      };

      if (activeTab === "salvos" && user && userId === user.id) {
        fetchSavedPosts();
      }
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
        userId === user.id &&
        (loadingSavedPosts ? (
          <div className="loading-placeholder"></div>
        ) : (
          <SavedPostsGrid
            savedPosts={savedPosts}
            loadedImages={loadedImages}
            handleImageLoaded={handleImageLoaded}
          />
        ))
      )}
    </div>
  );
};

export default Galeria;
