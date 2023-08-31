import React, { useCallback, useEffect } from "react";

import ConfigService from "services/ConfigService";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import formatDate from "util/formatDate";
import lodash from "lodash";
import moment from "moment-timezone";
import notificationsMeetingStyles from "./scss/notifications-meetings.module.scss";
import { useSelector } from "react-redux";

/**
 * User Notifications for a meeting starting in 15mins.
 * @param {object} prop
 * @param {Meeting} prop.meeting
 * @param {Function} prop.meeting
 *
 * @returns {JSX.Element}
 */
const NotificationsMeetings = ({ meeting, filterList }) => {
  const timezone = useSelector((state) => state.global.timezone);
  const timerDone = useCallback(() => {
    filterList(meeting.sessionId);
  }, [filterList, meeting]);

  useEffect(() => {
    let t = setTimeout(() => {
      timerDone();
    }, 10000);

    return () => {
      clearTimeout(t);
    };
  });

  return (
    <div className={notificationsMeetingStyles.meeting}>
      <OEPAnalytics
        componentType="Button"
        page="notifications list"
        url="Close notification"
        componentName="Close notification"
      >
        <button
          className={notificationsMeetingStyles.close}
          type="button"
          onClick={filterList.bind(null, meeting.sessionId)}
        >
          <SvgTypes name="close-icon" />
        </button>
      </OEPAnalytics>
      <h1>{meeting.sessionName}</h1>
      {meeting.description && (
        <p className={notificationsMeetingStyles.description}>
          {meeting.description}
        </p>
      )}
      <p className={notificationsMeetingStyles.time}>
        {meeting.sessionType ? "Your session starts " : "Your meeting starts "}
        <time
          dateTime={formatDate(
            { date: meeting.sessionStart, format: "YYYY-MM-DD hh:mm a" },
            timezone
          )}
        >
          {moment
            .tz(meeting.sessionStart, ConfigService.runValues.momentTimezone)
            .from()}
        </time>
      </p>

      <LinkWrapper
        to="/account/schedule"
        className={notificationsMeetingStyles.cta}
        componentName="My Schedule"
      >
        My Schedule
      </LinkWrapper>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  // Only re-render component if events change.
  if (lodash.isEqual(prevProps.meeting, nextProps.meeting)) {
    return true;
  }

  return false;
}

export default React.memo(NotificationsMeetings, areEqual);
