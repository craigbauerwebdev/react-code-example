import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import React from "react";
import cropName from "util/cropName";
import generatedName from "util/generatedName";
import posterCardStyles from "./scss/poster-card.module.scss";
import renderSpeakerName from "util/renderSpeakerName";

/**
 * Poster Card
 *
 * @param {object} props
 * @param {Poster} props.data
 * @param {string} props.page
 *
 * @returns {JSX.Element} Poster card component
 */
export const PosterCard = ({ data, page }) => {
  return (
    <div className={posterCardStyles.posterCardHolder}>
      <div className={posterCardStyles.favoritesHolder}>
        <Favorites
          page={page}
          type={favoriteTypes.posters}
          url={data.subSessionName}
          id={data.subSessionId}
          posterId={data.subSessionId}
          data={data}
        />
      </div>
      <CardWrapper
        to={`/posters/${data.subSessionId}/${generatedName(
          data.subSessionName
        )}`}
        page={page}
        componentType="Card"
        trackingUrl={`/posters/${data.subSessionId}/${generatedName(
          data.subSessionName
        )}`}
        posterId={data.subSessionId}
      >
        <div className={posterCardStyles.posterCard}>
          <h2 className={posterCardStyles.posterTitle}>
            {cropName(data.subSessionName, 80)}
          </h2>
          {data.presenters &&
            data.presenters.map((presenter) => (
              <div key={`${presenter.email}`}>
                <span className={posterCardStyles.posterPresenterName}>
                  {renderSpeakerName(presenter)}
                </span>
                <span className={posterCardStyles.posterPresenterOrg}>
                  {cropName(presenter.organization, 80)}
                </span>
              </div>
            ))}
          <div className={posterCardStyles.posterTopic}>
            {data.subSessionType}
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};
