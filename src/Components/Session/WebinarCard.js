import React, { Fragment, useEffect, useState } from "react";
import checkForWatchNow, { subtractMinutes } from "util/checkForWatchNow";

import AddToCalendar from "../AddToCalendar";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import PropTypes from "prop-types";
import ScheduleToCalendar from "Components/Schedule/ScheduleToCalendar";
import { allowVideo } from "util/allowWherebyVideo";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForLiveStream from "util/checkForLiveStream";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import cropName from "../../util/cropName";
import formatDate from "util/formatDate";
import formatTime from "util/formatTime";
import getMeetingUrl from "util/getMeetingUrl";
import getSessionLink from "./utils/getSessionLink";
import { hasBasicUserAccess } from "util/gatingHelpers";
import kebabCase from "lodash/kebabCase";
import sessionStarted from "util/sessionStarted";
import { timeSetting } from "util/staticData/timeOffset";
import useAccountProfile from "hooks/useAccountProfile";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import webinarCardStyles from "./scss/webinar-card.module.scss";

/**
 * Single session card
 *
 * @param {object} props
 * @param {Session} props.data
 * @param {boolean} props.isWebinar
 *
 * @returns {JSX.Element} react component
 */

const WebinarCard = ({ data, isWebinar, page }) => {
  const timezone = useSelector((state) => state.global.timezone);
  const user = useSelector((state) => state.global.user);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const isShowcaseSession = data && checkForShowcaseSession(data);
  const titleId = kebabCase(data?.sessionName?.slice(0, 30).trim());
  const { accountProfile } = useAccountProfile();
  let history = useHistory();
  const eventStarted =
    data &&
    sessionStarted(
      checkForChimeMeeting(data)
        ? subtractMinutes(data.sessionStart || data.startTime, timeSetting)
        : data.sessionStart || data.startTime
    );

  const getDetailsBtn = (data) => {
    const exhibitorInfo = data?.sessionCustom5?.split("|");
    const accountInfo = accountProfile?.companyId?.split("|");
    const exhibitorID = exhibitorInfo && exhibitorInfo[0];
    const companyId = accountInfo && accountInfo[0];
    const isHost = companyId === exhibitorID;

    const watchNow = checkForWatchNow(data, isHost ? 30 : 5);

    if (data) {
      return (
        <LinkWrapper
          to={
            checkForChimeMeeting(data)
              ? getMeetingUrl(data, isShowcaseSession)
              : getSessionLink(data, isShowcaseSession)
          }
          className={`${webinarCardStyles.detailsButton} gtm-session-details`}
          aria-describedby={`See Details for "${titleId}"`}
          page="Whereby List"
          componentType="button"
          trackingUrl={history.location.pathname}
          componentName={watchNow ? "WATCH NOW" : "DETAILS"}
        >
          {watchNow ? "WATCH NOW" : "DETAILS"}
        </LinkWrapper>
      );
    }

    return null;
  };

  useEffect(() => {
    if (accountProfile && !showMeetingInfo) {
      setShowMeetingInfo(allowVideo(data, accountProfile));
    }
  }, [accountProfile, data, showMeetingInfo]);

  return data ? (
    <div
      className={`${webinarCardStyles.sessionTab}`}
      style={isWebinar && { height: "360px" }}
    >
      <section className={webinarCardStyles.sessionInfo}>
        <LinkWrapper
          to={
            checkForChimeMeeting(data)
              ? getMeetingUrl(data, isShowcaseSession)
              : getSessionLink(data, isShowcaseSession)
          }
          className={`gtm-session-details`}
          aria-label={`See Details for "${data.sessionName}"`}
          page="Sessions List"
          componentType="button"
          trackingUrl={history.location.pathname}
          componentName={`${data.sessionName}`}
        >
          <h1>
            {isWebinar
              ? cropName(data.sessionName, 34)
              : cropName(data.sessionName?.replace(/<(.|\n)*?>/g, ""), 34)}
          </h1>
        </LinkWrapper>
        {(checkForLiveStream(data) || checkForChimeMeeting(data)) && (
          <h2 className={webinarCardStyles.sessionMeta}>
            {formatDate({ date: data.sessionStart }, timezone)}
            <br />
            {formatTime(data, timezone)}
          </h2>
        )}

        {isWebinar && (
          <p>{cropName(data.description?.replace(/<(.|\n)*?>/g, ""), 80)}</p>
        )}
      </section>

      <div className={webinarCardStyles.addToHolder}>
        {hasBasicUserAccess(user) && getDetailsBtn(data)}

        {(checkForLiveStream(data) || checkForChimeMeeting(data)) &&
          !eventStarted &&
          hasBasicUserAccess(user) && (
            <Fragment>
              <AddToCalendar
                session={data}
                userTz={timezone}
                page="Sessions List"
                iconOnly
                customClassName={webinarCardStyles.iconOnlyAtc}
              />
              <ScheduleToCalendar
                id={data.sessionId}
                page="Sessions List"
                isWebinar={isWebinar}
                iconOnly
              />
            </Fragment>
          )}
      </div>
    </div>
  ) : (
    <div />
  );
};

WebinarCard.propTypes = {
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
  }),
};

export default WebinarCard;
