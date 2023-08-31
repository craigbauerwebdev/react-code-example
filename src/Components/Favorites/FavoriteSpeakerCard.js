import DefaultCardContent from "./DefaultCardContent";
import FavoritesCard from "./FavoritesCard";
import React from "react";
import { favoriteTypes } from "./Favorites";
import generatedSpeakerUrl from "util/generatedSpeakerUrl";
import renderSpeakerName from "util/renderSpeakerName";

/**
 * Favorite Speaker Card
 *
 * @param {object} props
 * @param {Speaker} props.data
 *
 * @returns {JSX.Element}
 */
const FavoriteSpeakerCard = ({ data }) => {
  return (
    <FavoritesCard
      linkTo={generatedSpeakerUrl(data)}
      linkTrackingUrl={renderSpeakerName(data)}
      favoriteId={data.username}
      type={favoriteTypes.speakers}
      name={renderSpeakerName(data)}
      data={data}
    >
      <DefaultCardContent
        title={renderSpeakerName(data)}
        thumbnail={data.headShotUrl}
        thumbnailAlt={`${renderSpeakerName(data)} headshot`}
      />
    </FavoritesCard>
  );
};

export default FavoriteSpeakerCard;
