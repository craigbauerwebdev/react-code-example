import DefaultCardContent from "./DefaultCardContent";
import FavoritesCard from "./FavoritesCard";
import React from "react";
import { favoriteTypes } from "./Favorites";
import generatedName from "util/generatedName";

/**
 * Card type for Favorite Posters
 *
 * @param {object} props
 * @param {PosterData} props.data
 *
 * @returns {JSX.Element}
 */
const FavoritePosterCard = ({ data }) => {
  return (
    <FavoritesCard
      linkTo={`/posters/${data.subSessionId}/${generatedName(
        data.subSessionName
      )}`}
      linkTrackingUrl={`Poster - ${data.subSessionName}`}
      favoriteId={data.subSessionId}
      type={favoriteTypes.posters}
      name={data.subSessionName}
      data={data}
    >
      <DefaultCardContent title={data.subSessionName} />
    </FavoritesCard>
  );
};

export default FavoritePosterCard;
