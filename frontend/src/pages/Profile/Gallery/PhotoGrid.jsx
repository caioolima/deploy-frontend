// PhotoGrid.js
import React from "react";

const PhotoGrid = ({
  photos,
  loadedImages,
  handleImageLoaded,
  handleClick,
}) => {
  return (
    <div className="photo-grid">
      {photos.map((photoData, index) => (
        <div className="photo-item" key={index}>
          <div
            className="image-container-button"
            onClick={() => handleClick(index)}
          >
            {!loadedImages[index] && (
              <div className="loading-spinner">
                <div className="dot-loader"></div>
                <div className="dot-loader"></div>
                <div className="dot-loader"></div>
              </div>
            )}
            <img
              src={photoData.url}
              alt="photo"
              style={{
                opacity: loadedImages[index] ? 1 : 0,
                transition: "opacity 0.5s",
              }}
              onLoad={() => handleImageLoaded(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
