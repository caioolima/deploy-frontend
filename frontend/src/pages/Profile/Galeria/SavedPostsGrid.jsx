// SavedPostsGrid.js
import React from "react";
import EmptyMessage from "./EmptyMessage";

const SavedPostsGrid = ({ savedPosts, loadedImages, handleImageLoaded, handlePublicationClick }) => {
  return (
    <div className="photo-gallery">
      {savedPosts.length > 0 ? (
        <div className="photo-grid">
          {savedPosts.map((post, index) => (
            <div className="photo-item" key={index}>
              {!loadedImages[index] && (
                <div className="loading-spinner">
                  <div className="dot-loader"></div>
                  <div className="dot-loader"></div>
                  <div className="dot-loader"></div>
                </div>
              )}
              <a href={`/profile/${post.postOwnerId}`}>
                <img
                  src={post.imageUrl}
                  alt="saved_post"
                  style={{
                    opacity: loadedImages[index] ? 1 : 0,
                    transition: "opacity 0.5s",
                  }}
                  onLoad={() => handleImageLoaded(index)}
                  onClick={() => handlePublicationClick(index)}
                />
              </a>
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
