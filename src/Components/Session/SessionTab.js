import React, { useReducer } from "react";
import { actionTypesSessionsTab, sessionTabReducer } from "./reducer";
import checkForWatchNow, {
  checkForAfterSessionEnd,
  subtractMinutes,
} from "util/checkForWatchNow";
import sortResults, { sortTypes } from "util/sortResults";

import AddToCalendar from "../AddToCalendar";
import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import SessionTitle from "./SessionTitle";
import { SubSessionCard } from "./SubSessionCard";
import addPrefix from "util/addPrefix";
import { bpMap } from "util/bpMap";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForLiveStream from "util/checkForLiveStream";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import cropName from "util/cropName";
import { enableParentPageScroll } from "Components/Modal/utils/toggleParentPageScrolling";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import formattedTrackData from "util/formattedTrackData";
import getAnalyticsPage from "util/getAnalyticsPage";
import getMeetingUrl from "util/getMeetingUrl";
import getSessionLink from "./utils/getSessionLink";
import { hasBasicUserAccess } from "util/gatingHelpers";
import kebabCase from "lodash/kebabCase";
import renderSpeakerName from "util/renderSpeakerName";
import sessionStarted from "util/sessionStarted";
import sessionTabStyles from "./scss/session-tab.module.scss";
import { timeSetting } from "util/staticData/timeOffset";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

/**
 * Single session card
 *
 * @param {object} props
 * @param {Session} props.data
 * @param {boolean} props.modal
 * @param {boolean} props.isWebinar
 * @param {string} props.page
 *
 * @returns {JSX.Element} react component
 */

const SessionTab = ({ data, modal, isWebinar, page }) => {
  const location = useLocation();
  const timezone = useSelector((state) => state.global.timezone);
  const isChime = checkForChimeMeeting(data);
  const isChimeOrLiveStream = (data && checkForLiveStream(data)) || isChime;
  const user = useSelector((state) => state.global.user);
  const eventStarted = sessionStarted(
    isChime
      ? subtractMinutes(data.sessionStart || data.startTime, timeSetting)
      : data.sessionStart || data.startTime
  );
  const titleId = kebabCase(data.sessionName?.slice(0, 30).trim());
  const [stateSessionTab, dispatchSessionTab] = useReducer(sessionTabReducer, {
    expandDescription: false,
    renderHiddenContent: false,
  });
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  const isShowcaseSession = checkForShowcaseSession(data);

  const handleDetailsClick = () => {
    enableParentPageScroll();
  };

  const getSpeakers = (session) => {
    if (isWebinar && session.hostProfile) {
      return cropName(
        renderSpeakerName({ ...session.hostProfile, suffix: "" }),
        150
      );
    }

    const speakers = [
      ...new Set(
        session.subSessions
          ?.flatMap((subsession) => subsession?.presenters)
          .filter(Boolean)
          .map((speaker) => addPrefix(speaker, renderSpeakerName(speaker)))
      ),
    ].join(", ");

    if (!speakers) {
      return null;
    }

    return cropName(speakers, 150);
  };

  const getWatchNowBtn = (data) => {
    const watchNow = checkForWatchNow(data, isChime && timeSetting);
    const isSessionEnded = checkForAfterSessionEnd(data);

    if ((watchNow || isSessionEnded) && data) {
      return (
        <LinkWrapper
          className={sessionTabStyles.watchButton}
          to={
            isChime
              ? getMeetingUrl(data, isShowcaseSession)
              : getSessionLink(data, isShowcaseSession)
          }
          aria-describedby={`Watch "${titleId}" Now`}
          page={page || "Sessions List"}
          componentType="Button"
          trackingUrl={
            isChime
              ? getMeetingUrl(data, isShowcaseSession)
              : getSessionLink(data, isShowcaseSession)
          }
          componentName={isSessionEnded ? "Watch Again" : "Watch Now"}
        >
          {isSessionEnded ? "Watch Again" : "Watch Now"}
        </LinkWrapper>
      );
    }

    return null;
  };

  const sessionTracks = formattedTrackData(data);
  const sessionSpeakers = getSpeakers(data);
  const handleTransEnd = (e) => {
    e.persist();
    if (!stateSessionTab.expandDescription) {
      dispatchSessionTab({
        type: actionTypesSessionsTab.UPDATE_RENDER_HIDDEN_CONTENT,
        payload: false,
      });
    }
  };
  return (
    <div
      className={`${sessionTabStyles.sessionTab} ${
        modal && sessionTabStyles.modal
      }`}
    >
      <section className={sessionTabStyles.sessionInfo}>
        {isMobile && (
          <SessionTitle
            data={data}
            isWebinar={isWebinar}
            modal={modal}
            stateSessionTab={stateSessionTab}
            dispatchSessionTab={dispatchSessionTab}
            page={getAnalyticsPage(location.pathname)}
          />
        )}
        {isChimeOrLiveStream && (
          <h2 className={sessionTabStyles.sessionMeta}>
            {formatDate({ date: data.sessionStart }, timezone)}
            <br />
            {formatTime(data, timezone)}
          </h2>
        )}
        {isChimeOrLiveStream && !eventStarted && hasBasicUserAccess(user) && (
          <div className={sessionTabStyles.addToHolder}>
            <AddToCalendar
              session={data}
              userTz={timezone}
              page={getAnalyticsPage(location.pathname)}
            />

            <ScheduleToCalendar
              id={data.sessionId}
              page={getAnalyticsPage(location.pathname)}
              isWebinar={isWebinar}
            />
          </div>
        )}
        {data.sessionType && !isWebinar && (
          <h2 className={sessionTabStyles.sessionMeta}>
            {data.sessionType.sessionTypeName}
          </h2>
        )}
        {sessionTracks && (
          <h2 className={sessionTabStyles.sessionMeta}>{sessionTracks}</h2>
        )}
        {isChimeOrLiveStream && getWatchNowBtn(data)}
      </section>
      <div
        className={`${sessionTabStyles.sessionContent} ${
          isWebinar && sessionTabStyles.webinarSessionContent
        }`}
      >
        {!isMobile && (
          <SessionTitle
            data={data}
            isWebinar={isWebinar}
            modal={modal}
            stateSessionTab={stateSessionTab}
            dispatchSessionTab={dispatchSessionTab}
            page={getAnalyticsPage(location.pathname)}
          />
        )}

        <div className={sessionTabStyles.sessionCardHolder}>
          {data.description && (
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          )}

          {!modal &&
            ConfigService.runValues.hasSubSessions &&
            data.subSessions &&
            data.subSessions.length > 0 && (
              <div
                id={`session-desc-${data.sessionId}`}
                onTransitionEnd={handleTransEnd}
                aria-hidden={!stateSessionTab.expandDescription}
                className={`${
                  stateSessionTab.expandDescription
                    ? sessionTabStyles.expandedArticle
                    : sessionTabStyles.croppedArticle
                } ${sessionTabStyles.speakerList}`}
              >
                {!isWebinar &&
                  stateSessionTab.renderHiddenContent &&
                  sortResults(
                    data.subSessions,
                    sortTypes.lastFirstChar
                  ).map((s) => (
                    <SubSessionCard data={s} key={s.subSessionId} />
                  ))}
              </div>
            )}
        </div>

        <div
          className={`${sessionTabStyles.sessionCardDetails} ${
            sessionSpeakers ? "" : sessionTabStyles.sessionCardDetailsOnly
          }`}
        >
          {sessionSpeakers && <h2>{sessionSpeakers}</h2>}

          <LinkWrapper
            to={
              isChime
                ? getMeetingUrl(data, isShowcaseSession)
                : getSessionLink(data, isShowcaseSession)
            }
            onClick={handleDetailsClick}
            className={`${sessionTabStyles.detailsButton} gtm-session-details`}
            aria-describedby={`See Details for "${titleId}"`}
            page={getAnalyticsPage(location.pathname)}
            componentType="button"
            trackingUrl={
              isChime
                ? getMeetingUrl(data, isShowcaseSession)
                : getSessionLink(data, isShowcaseSession)
            }
            componentName="details"
          >
            DETAILS
          </LinkWrapper>
        </div>
      </div>
    </div>
  );
};

SessionTab.propTypes = {
  page: PropTypes.string,
  data: PropTypes.shape({
    sessionVideoSource: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    sessionStart: PropTypes.string,
    startTime: PropTypes.string,
    sessionName: PropTypes.string.isRequired,
    sessionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    sessionTrack: PropTypes.string,
    subSessions: PropTypes.arrayOf(
      PropTypes.shape({
        presenters: PropTypes.arrayOf(
          PropTypes.shape({
            firstName: PropTypes.string,
            middleName: PropTypes.string,
            lastName: PropTypes.string,
            suffix: PropTypes.string,
          })
        ),
      })
    ),
    sessionType: PropTypes.shape({
      sessionTypeId: PropTypes.number,
      sessionTypeName: PropTypes.string,
    }),
    description: PropTypes.string,
  }).isRequired,
};

export default SessionTab;
