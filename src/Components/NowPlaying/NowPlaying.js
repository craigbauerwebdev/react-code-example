import Favorites, { favoriteTypes } from "Components/Favorites/Favorites";
import React, { useCallback, useEffect, useState } from "react";
import sortResults, { sortTypes } from "util/sortResults";
import { useDispatch, useSelector } from "react-redux";

import CardWrapper from "Components/CardWrapper/CardWrapper";
import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import Loader from "Components/Loader";
import LottieAnimation from "Components/Lottie/LottieAnimation";
import LottieFile from "Components/Lottie/LottieFiles/live.json";
import checkForWatchNow from "util/checkForWatchNow";
import cropName from "util/cropName";
import { dataTypes } from "store/utils/dataTypes";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import { getPayload } from "store/actions/index";
import getSessionUrl from "util/getSessionUrl";
import getSpeakerNames from "util/getSpeakerNames";
import kebabCase from "lodash/kebabCase";
import moment from "moment-timezone";
import nowPlayingStyles from "./scss/now-playing.module.scss";

const current = moment.tz(
  new Date(),
  "MMM Do YYYY h:mmA",
  ConfigService.runValues.momentTimezone
);

export default function NowPlaying() {
  const dispatch = useDispatch();
  const [isLivestream, setIsLiveStream] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState(null);
  /**@type {Session[]} */
  const sessions = useSelector((state) => state.global.sessions);
  const timezone = useSelector((state) => state.global.timezone);
  const fetchSessions = useCallback((data) => {
    const nowPlaying = sortResults(data, sortTypes.time)
      .filter((session) => session.sessionVideoSource)
      .filter((session) => checkForWatchNow(session));

    const nextSessions = sortResults(data, sortTypes.time)
      .filter((session) => session.sessionVideoSource)
      .map((session) => {
        const currentIsBeforeSessionStart = moment(current).isBefore(
          moment.tz(
            session.sessionStart,
            ConfigService.runValues.momentTimezone
          )
        );
        return currentIsBeforeSessionStart ? session : null;
      })
      .filter(Boolean)
      .slice(0, 3);

    setIsLiveStream(nowPlaying.length ? true : false);
    setFilteredSessions(
      nowPlaying.length
        ? sortResults(nowPlaying, sortTypes.startEndTimeAndName)
        : sortResults(nextSessions, sortTypes.startEndTimeAndName)
    );
  }, []);
  /**
   *
   * @param {Session} session
   * @returns {JSX.Element}
   */
  const renderSessionCard = (session) => {
    const sessionSpeakers = getSpeakerNames(session.subSessions);
    const titleId = kebabCase(session.sessionName?.slice(0, 30).trim());
    const detailsButtonLabel = isLivestream ? "Watch Now" : "Details";

    return (
      <CardWrapper
        key={session.sessionId}
        className={nowPlayingStyles.largeCard}
      >
        <div className={nowPlayingStyles.npContentContainer}>
          <div className={nowPlayingStyles.npSpeakersFavorites}>
            <div className={nowPlayingStyles.sessionSpeakers}>
              {sessionSpeakers && sessionSpeakers}
            </div>
            <Favorites
              page="homepage"
              url={session.sessionName}
              type={favoriteTypes.sessions}
              id={session.sessionId}
              data={session}
            />
          </div>
          <h1 id={titleId}>{cropName(session.sessionName, 65)}</h1>
          <h2>
            {formatDate({ date: session.sessionStart }, timezone)}
            <br />
            {formatTime(session, timezone)}
          </h2>
          <LinkWrapper
            to={getSessionUrl(session)}
            aria-describedby={titleId}
            page="homepage"
            componentType="Button"
            trackingUrl={getSessionUrl(session)}
          >
            {detailsButtonLabel}
          </LinkWrapper>
        </div>
      </CardWrapper>
    );
  };
  const getTitle = () => {
    if (ConfigService.runValues.enableLottie) {
      return (
        <LottieAnimation
          animationData={LottieFile}
          style={nowPlayingStyles.lottie}
        />
      );
    }

    return <h2 className={nowPlayingStyles.npTitle}>Now Playing</h2>;
  };

  useEffect(() => {
    if (!sessions) {
      dispatch(getPayload(dataTypes.sessions));
    } else if (sessions) {
      fetchSessions(sessions);
    }
  }, [sessions, dispatch, fetchSessions]);

  if (!filteredSessions) {
    return <Loader />;
  }

  if (filteredSessions.length <= 0) {
    return null;
  }

  return (
    <div className={nowPlayingStyles.npWrapper}>
      {isLivestream ? (
        getTitle()
      ) : (
        <h2 className={nowPlayingStyles.npTitle}>Coming Up Next</h2>
      )}
      <section className={nowPlayingStyles.npCards}>
        {filteredSessions.map((session) => renderSessionCard(session))}
      </section>
    </div>
  );
}
