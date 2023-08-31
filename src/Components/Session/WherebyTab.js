import React, { useEffect, useReducer, useState } from "react";

import AddToCalendar from "../AddToCalendar";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import SessionTitle from "./SessionTitle";
import addPrefix from "util/addPrefix";
import { allowVideo } from "util/allowWherebyVideo";
import { bpMap } from "util/bpMap";
import checkForWatchNow from "util/checkForWatchNow";
import cropName from "util/cropName";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import formattedTrackData from "util/formattedTrackData";
import getAnalyticsPage from "util/getAnalyticsPage";
import getMeetingUrl from "util/getMeetingUrl";
import { hasBasicUserAccess } from "util/gatingHelpers";
import kebabCase from "lodash/kebabCase";
import lodash from "lodash";
import renderSpeakerName from "util/renderSpeakerName";
import { sessionTabReducer } from "./reducer";
import sessionTabStyles from "./scss/session-tab.module.scss";
import useAccountProfile from "hooks/useAccountProfile";
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
 *
 * @returns {JSX.Element} react component
 */

const WherebyTab = ({ data, modal, isWebinar, exhibitors }) => {
  const location = useLocation();
  const { accountProfile } = useAccountProfile();
  const timezone = useSelector((state) => state.global.timezone);
  const user = useSelector((state) => state.global.user);
  const exhibitorInfo = data?.sessionCustom5?.replace(/ /g, "")?.toLowerCase();
  const exhibitor = exhibitors?.find(
    (ex) =>
      ex.exhibitor_name?.replace(/ /g, "")?.toLowerCase() === exhibitorInfo ||
      ex.exhibitor_company_id?.replace(/ /g, "")?.toLowerCase() ===
        exhibitorInfo
  );
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const titleId = kebabCase(data.sessionName?.slice(0, 30).trim());
  const [stateSessionTab, dispatchSessionTab] = useReducer(sessionTabReducer, {
    expandDescription: false,
    renderHiddenContent: false,
  });
  const isMobile = useToggleDisplayMQ(bpMap.tablet);
  // for getMeetingUrl
  if (data) data.meetingType = "showcase";

  const getSpeakers = (session) => {
    if (session.hostProfile) {
      return cropName(
        renderSpeakerName({ ...session.hostProfile, suffix: "" }),
        150
      );
    }
    const speakers =
      session.subSessions &&
      lodash
        .flatten(session.subSessions.map((s) => s.presenters))
        .filter(Boolean)
        .map((s) => addPrefix(s, renderSpeakerName(s)));

    if (!speakers || speakers.length <= 0) {
      return null;
    }

    return cropName(speakers.join(", "), 150);
  };

  const sessionTracks = formattedTrackData(data);
  const sessionSpeakers = getSpeakers(data);

  const getButton = () => {
    const exhibitorInfo = data?.sessionCustom5
      ?.replace(/ /g, "-")
      ?.toLowerCase();
    const accountInfo = accountProfile?.companyId
      ?.replace(/ /g, "-")
      ?.toLowerCase();
    const isHost = accountInfo === exhibitorInfo;

    const watchNow = checkForWatchNow(data, isHost ? 30 : 0);

    return showMeetingInfo === 0 ? (
      hasBasicUserAccess(user) && (
        <div className={sessionTabStyles.addToHolder}>
          <AddToCalendar
            session={data}
            userTz={timezone}
            page={getAnalyticsPage(location.pathname)}
          />
          <ScheduleToCalendar
            id={data.sessionId}
            page={getAnalyticsPage(location.pathname)}
            url={getMeetingUrl(data, true)}
          />
        </div>
      )
    ) : (
      <div className={sessionTabStyles.addToHolder}>
        <LinkWrapper
          to={getMeetingUrl(data, true)}
          className={`${sessionTabStyles.detailsButton} gtm-session-details`}
          aria-describedby={`See Details for "${titleId}"`}
          page={getAnalyticsPage(location.pathname)}
          componentType="button"
          trackingUrl={getMeetingUrl(data, true)}
          componentName={watchNow ? "WATCH NOW" : "DETAILS"}
        >
          {watchNow ? "WATCH NOW" : "DETAILS"}
        </LinkWrapper>
      </div>
    );
  };

  useEffect(() => {
    if (accountProfile && !showMeetingInfo) {
      setShowMeetingInfo(allowVideo(data, accountProfile));
    }
  }, [accountProfile, data, showMeetingInfo]);

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
            exhibitor={exhibitor}
          />
        )}

        <h2 className={sessionTabStyles.sessionMeta}>
          {formatDate({ date: data.sessionStart }, timezone)}
          <br />
          {formatTime(data, timezone)}
        </h2>
        {sessionTracks && (
          <h2 className={sessionTabStyles.sessionMeta}>{sessionTracks}</h2>
        )}
        {getButton()}
      </section>
      <div
        className={`${sessionTabStyles.sessionContent} ${sessionTabStyles.webinarSessionContent}`}
      >
        {!isMobile && (
          <SessionTitle
            data={data}
            isWebinar={isWebinar}
            modal={modal}
            stateSessionTab={stateSessionTab}
            dispatchSessionTab={dispatchSessionTab}
            page={getAnalyticsPage(location.pathname)}
            exhibitor={exhibitor}
          />
        )}

        <div className={sessionTabStyles.sessionCardHolder}>
          {data.description && (
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          )}
        </div>

        <div
          className={`${sessionTabStyles.sessionCardDetails} ${
            sessionSpeakers ? "" : sessionTabStyles.sessionCardDetailsOnly
          }`}
        >
          {sessionSpeakers && <h2>{getSpeakers(data)}</h2>}
        </div>
      </div>
    </div>
  );
};

WherebyTab.propTypes = {
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

export default WherebyTab;
