import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
// GOOGLE ANALYTICS
import React from "react";
import checkForLiveStream from "util/checkForLiveStream";
import checkForWatchNow from "util/checkForWatchNow";
import cropName from "util/cropName";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "util/generatedName";
import sessionCardStyles from "./scss/session-card.module.scss";
import { useSelector } from "react-redux";

/**
 * SessionCard
 *
 * @param {object} props
 * @param {Session} props.data
 * @param {string} props.classList
 * @param {string} props.page
 *
 * @returns {JSX.Element} SessionCard
 */
export const SessionCard = ({ data, classList, page }) => {
  const timezone = useSelector((state) => state.global.timezone);
  const linkVal = () => {
    return checkForLiveStream(data)
      ? `/live-stream/${data.sessionId}/${generatedName(data.sessionName)}`
      : `/sessions/${data.sessionId}/${generatedName(data.sessionName)}`;
  };

  const detailsButtonLabel = checkForWatchNow(data) ? "Watch Now" : "Details";
  const detailsButtonAriaLabel = checkForWatchNow(data)
    ? `Watch "${data.sessionName}" Now`
    : `Details for "${data.sessionName}"`;

  return (
    <CardWrapper
      componentType="Card"
      className={`${classList ? sessionCardStyles[classList] : ""} ${
        sessionCardStyles.smallCard
      }`}
    >
      <div className={sessionCardStyles.favoritesHolder}>
        <Favorites
          page={page}
          url={data.sessionName}
          type={favoriteTypes.sessions}
          id={data.sessionId}
          data={data}
        />
      </div>
      <h1>{cropName(data.sessionName, 35)}</h1>
      {data.eventRoom && data.eventRoom.displayName && (
        <div className={sessionCardStyles.sessionMeta}>
          {data.eventRoom.displayName}
        </div>
      )}
      <div className={sessionCardStyles.dateTime}>
        {formatTime(data, timezone)}
        <br />
        {formatDate({ date: data.sessionStart }, timezone)}
      </div>
      <LinkWrapper
        className="gtm-watch-now"
        to={linkVal()}
        aria-label={detailsButtonAriaLabel}
        page={page}
        componentType="Button"
        trackingUrl={linkVal()}
        componentName={detailsButtonLabel}
      >
        {detailsButtonLabel}
      </LinkWrapper>
    </CardWrapper>
  );
};
