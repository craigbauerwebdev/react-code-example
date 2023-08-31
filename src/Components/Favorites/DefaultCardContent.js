import React from "react";
import favoritesCardStyles from "./scss/card.module.scss";

const DefaultCardContent = ({ title, thumbnail, thumbnailAlt }) => {
  return (
    <div className={`${favoritesCardStyles.content}`}>
      {thumbnail && thumbnailAlt && (
        <div className={favoritesCardStyles.thumbnailWrapper}>
          <img src={thumbnail} alt={thumbnailAlt} />
        </div>
      )}
      <div className={favoritesCardStyles.centerInDiv}>
        <h4 className={favoritesCardStyles.bodyTitle}>{title}</h4>
      </div>
    </div>
  );
};

export default DefaultCardContent;
