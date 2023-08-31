import React, { useState } from "react";

import ConfigService from "services/ConfigService";
import FavoriteSubSessionCard from "./FavoriteSubSessionCard";
import FavoritesCard from "./FavoritesCard";
import checkForLiveStream from "util/checkForLiveStream";
import { favoriteTypes } from "./Favorites";
import favoritesCardStyles from "./scss/card.module.scss";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import generatedName from "util/generatedName";
import { useSelector } from "react-redux";

/**
 * Favorite Session Card
 *
 * @param {object} prop
 * @param {Session} prop.data
 *
 * @returns {JSX.Element}
 */
const FavoriteSessionCard = ({ data }) => {
  const timezone = useSelector((state) => state.global.timezone);
  const [showSubSessions, setShowSubSesions] = useState(false);
  const hasFavoritedSubSessions = data?.subSessions?.some(
    (subSession) => subSession.isFavorited
  );
  const subSessionFavoriteIds = data?.subSessions
    ?.filter((subSession) => subSession.isFavorited)
    .flat()
    .map((s) => String(s.subSessionId));

  const subSessionFavoriteCards = data.subSessions?.map((subSession) => {
    if (!subSession.isFavorited) return null;
    const subSessionUrl = `/sessions/${data.sessionId}/subsession/${
      subSession.subSessionId
    }/${generatedName(subSession.subSessionName)}`;

    if (!showSubSessions) return null;

    return (
      <FavoriteSubSessionCard
        linkTo={subSessionUrl}
        linkTrackingUrl={subSession.subSessionName}
        favoriteId={subSession.subSessionId}
        key={subSession.subSessionId}
        type={favoriteTypes.subsessions}
        name={subSession.subSessionName}
        data={subSession}
      >
        <h5 className={favoritesCardStyles.subSessionTitle}>
          {subSession.subSessionName}
        </h5>
      </FavoriteSubSessionCard>
    );
  });

  return (
    <>
      <FavoritesCard
        linkTo={
          checkForLiveStream(data)
            ? `/live-stream/${data.sessionId}/${generatedName(
                data.sessionName
              )}`
            : `/sessions/${data.sessionId}/${generatedName(data.sessionName)}`
        }
        linkTrackingUrl={data.sessionName}
        favoriteId={data.sessionId}
        type={favoriteTypes.sessions}
        name={data.sessionName}
        data={data}
        subSessionFavoriteIds={subSessionFavoriteIds}
      >
        <div
          className={`${favoritesCardStyles.content} ${favoritesCardStyles.sessionContent}`}
        >
          <div className={favoritesCardStyles.centerInDivLarge}>
            <h4 className={favoritesCardStyles.bodyTitle}>
              {data.sessionName}
            </h4>
            <ToggleSubSessions
              subSessionState={[showSubSessions, setShowSubSesions]}
              disabled={
                !hasFavoritedSubSessions ||
                !ConfigService.runValues.hasSubSessions
              }
            />
          </div>
          {data.sessionType && data.sessionType.sessionTypeName !== "OnDemand" && (
            <div
              className={`${favoritesCardStyles.dateTimeWrapper} ${favoritesCardStyles.centerInDivLarge}`}
            >
              <div className={favoritesCardStyles.dateTime}>
                <time className={favoritesCardStyles.time}>
                  {data.sessionStart &&
                    formatDate({ date: data.sessionStart }, timezone)}
                </time>
                <div className={favoritesCardStyles.time}>
                  {data.sessionStart && formatTime(data, timezone)}
                </div>
              </div>
            </div>
          )}
        </div>
      </FavoritesCard>
      {subSessionFavoriteCards}
    </>
  );
};

export default FavoriteSessionCard;

const ToggleSubSessions = ({
  subSessionState: [isExpanded, setExpanded],
  disabled,
}) => {
  if (disabled) return null;

  return (
    <button
      className={`${favoritesCardStyles.subSessionToggleButton} ${
        isExpanded ? favoritesCardStyles.expanded : ""
      }`}
      onClick={() => setExpanded((expanded) => !expanded)}
      aria-label="View / Hide Subsessions"
    />
  );
};
