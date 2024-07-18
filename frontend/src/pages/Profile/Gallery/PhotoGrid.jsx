// PhotoGrid.js
import React from "react";

const PhotoGrid = ({
  photos,
  loadedImages,
  handleImageLoaded,
  handleClick,
}) => {
  return (
    <div className="photo-gallery">
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div className="photo-item" key={index}>
            {!loadedImages[index] && (
              <div className="loading-spinner">
                <div className="dot-loader"></div>
                <div className="dot-loader"></div>
                <div className="dot-loader"></div>
              </div>
            )}
            <img
              src={photo.url}
              alt="user_photo"
              style={{
                opacity: loadedImages[index] ? 1 : 0,
                transition: "opacity 0.5s",
              }}
              onLoad={() => handleImageLoaded(index)}
              onClick={() => handleClick(index)} // Passa o índice
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
