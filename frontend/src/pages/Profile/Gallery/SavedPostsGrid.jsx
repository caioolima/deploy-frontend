import React from "react";
import { useTranslation } from "react-i18next";
import EmptyMessage from "./EmptyMessage";

const SavedPostsGrid = ({
  savedPosts,
  loadedImages,
  handleImageLoaded,
  loadingSavedPosts,
}) => {
  const { t } = useTranslation();

  return (
    <div className="photo-gallery">
      {loadingSavedPosts ? (
        <div className="loading-message-posts-saved">
          <p>{t('loading_saved_posts')}</p>
        </div>
      ) : savedPosts.length > 0 ? (
        <div className="photo-grid">
          {savedPosts.map((post, index) => (
            <div className="photo-item-saved" key={index}>
              {!loadedImages[index] && (
                <div className="loading-spinner">
                  <div className="dot-loader"></div>
                  <div className="dot-loader"></div>
                  <div className="dot-loader"></div>
                </div>
              )}

              <img
                src={post.imageUrl}
                alt="saved_post"
                style={{
                  opacity: loadedImages[index] ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
                onLoad={() => handleImageLoaded(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyMessage messageKey="no_saved_posts" />
      )}
    </div>
  );
};


export default SavedPostsGrid;
