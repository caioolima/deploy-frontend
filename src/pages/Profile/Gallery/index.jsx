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
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
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
        const response = await fetch(
          `https://server-repository.onrender.com/feedRoutes/savedPosts/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved posts");
        }
        const data = await response.json();

        // Adiciona o índice original aos posts
        const postsWithIndex = data.savedPosts.map((post, index) => ({
          ...post,
          originalIndex: index,
        }));

        // Ordena os posts por índice original (do mais recente para o mais antigo)
        const sortedPosts = postsWithIndex.sort(
          (a, b) => b.originalIndex - a.originalIndex
        );

        // Obtém os posts salvos do localStorage
        const savedPostsFromStorage = localStorage.getItem(
          `savedPosts_${userId}`
        );
        const savedPostsData = savedPostsFromStorage
          ? JSON.parse(savedPostsFromStorage)
          : [];

        // Verifica se os posts recebidos são diferentes dos posts no localStorage
        const postsAreDifferent =
          JSON.stringify(sortedPosts) !== JSON.stringify(savedPostsData);

        if (postsAreDifferent) {
          // Atualiza o localStorage e o estado somente se houver uma mudança
          localStorage.setItem(
            `savedPosts_${userId}`,
            JSON.stringify(sortedPosts)
          );
          setSavedPosts(sortedPosts);
          console.log("Posts updated and saved to localStorage.");
        } else {
          setSavedPosts(savedPostsData);
          console.log("Posts are the same as localStorage.");
        }

        setDataLoaded(true);
        setLoadingSavedPosts(false);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        // Carrega posts do localStorage em caso de erro
        const savedPostsFromStorage = localStorage.getItem(
          `savedPosts_${userId}`
        );
        if (savedPostsFromStorage) {
          setSavedPosts(JSON.parse(savedPostsFromStorage));
          setDataLoaded(true);
        }
        setLoadingSavedPosts(false);
      }
    };

    if (activeTab === "salvos" && user && userId === user.id) {
      fetchSavedPosts();
    } else if (activeTab === "salvos") {
      // Se a aba é 'salvos' mas o usuário não está logado ou o userId não corresponde
      const savedPostsFromStorage = localStorage.getItem(
        `savedPosts_${userId}`
      );
      if (savedPostsFromStorage) {
        setSavedPosts(JSON.parse(savedPostsFromStorage));
        setDataLoaded(true);
      }
      setLoadingSavedPosts(false);
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
            loadingSavedPosts={!dataLoaded && loadingSavedPosts}
          />
        )
      )}
    </div>
  );
};

export default Galeria;
