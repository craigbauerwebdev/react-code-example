import React, { useState } from "react";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import { useDispatch, useSelector } from "react-redux";

import CreateMeetingModal from "Components/Profile/CreateMeetingModal";
import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import { MEETING_TYPES } from "util/meetingTypes";
import MeetingInvitePopup from "Components/Profile/MeetingInvitePopup";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForLiveStream from "util/checkForLiveStream";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import checkForWatchNow from "util/checkForWatchNow";
import formatDate from "util/formatDate";
import getAnalyticsPage from "util/getAnalyticsPage";
import getMeetingUrl from "util/getMeetingUrl";
import getScheduleIcons from "util/getScheduleIcons";
import getSessionLink from "Components/Session/utils/getSessionLink";
import { getUserProfileByFuzionId } from "util/api";
import moment from "moment";
import scheduleStyles from "./scss/schedule.module.scss";
import { setOpenChat } from "Components/Profile/store/actions";
import { timeSetting } from "util/staticData/timeOffset";
import { useLocation } from "react-router-dom";

const ScheduleCard = ({ event }) => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const watchNow = checkForWatchNow(event, timeSetting);
  const user = useSelector((state) => state.global.user);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  const isShowcaseSession = checkForShowcaseSession(event);
  const location = useLocation();
  const checkMeetingAvailability = () => {
    const todaysDate = moment.tz(new Date(), timezone).format();
    // user can join meeting if it is 5 minutes before start time
    const timeOffset = moment
      .tz(event.sessionStart, timezone)
      .subtract(timeSetting, "minutes")
      .format();

    const isTimeTillEvent = moment(todaysDate).isSameOrAfter(
      timeOffset,
      "minute"
    );

    const isBeforeSessionEnd = moment(todaysDate).isBefore(
      event.sessionEnd,
      "minute"
    );

    if (isTimeTillEvent && isBeforeSessionEnd) {
      return true;
    }

    return false;
  };
  const toggleShowModal = () => {
    setShowMeetingDetailsModal(!showMeetingDetailsModal);
    if (showMeetingDetailsModal) {
      enableParentPageScroll();
    } else {
      disableParentPageScroll();
    }
  };

  const showEditMeetingModal = () => {
    setShowMeetingDetailsModal(false);
    setShowEditModal(!showEditModal);
    if (!showMeetingDetailsModal) {
      enableParentPageScroll();
    }
  };

  const handleChatClick = ({ attendees }) => {
    const [id] = attendees.filter(
      (attendee) => attendee !== user.fuzion_attendee_id
    );

    getUserProfileByFuzionId(id).then((result) => {
      dispatch(
        setOpenChat({
          selectedAttendee: { id, Profile: result.data.data },
          isMinimized: false,
          show: true,
        })
      );
    });
  };

  const iconDisplay = () => {
    return (
      <span className={scheduleStyles.icon}>
        <SvgTypes name="infoIcon" />
        <span className="sr-only">Event Info</span>
      </span>
    );
  };

  const getButton = () => {
    if (watchNow) {
      if (checkForLiveStream(event)) {
        return (
          <LinkWrapper
            className={scheduleStyles.watchButton}
            to={getSessionLink(event, isShowcaseSession)}
            aria-label={`Watch "${event.sessionName}" Now`}
            page="My Schedule"
            componentType="Link"
            trackingUrl={getSessionLink(event, isShowcaseSession)}
            external={false}
            componentName="Watch now"
          >
            Watch
          </LinkWrapper>
        );
      }

      if (checkForChimeMeeting(event)) {
        const isHost = event.host === accountProfile.attendeeId;

        return (
          <LinkWrapper
            className={scheduleStyles.watchButton}
            to={getMeetingUrl(event, isShowcaseSession)}
            aria-label={`${isHost ? "Start" : "Join"} "${
              event.sessionName
            }" Now`}
            page="My Schedule"
            componentType="button"
            trackingUrl={getMeetingUrl(event, isShowcaseSession)}
            external={false}
            componentName={isHost ? "Start" : "Join"}
          >
            {isHost ? "Start" : "Join"}
          </LinkWrapper>
        );
      }

      if (event.meetingType === MEETING_TYPES.CHAT) {
        return (
          <OEPAnalytics
            componentType="Button"
            page="My Schedule"
            url={`Join ${event.sessionName}`}
            componentName="Join Meeting"
          >
            <button
              className={scheduleStyles.watchButton}
              onClick={handleChatClick.bind(null, event)}
              aria-label={`Join "${event.sessionName}" Now`}
              page="My Schedule"
              componentType="button"
              trackingUrl={getMeetingUrl(event, isShowcaseSession)}
              external={false}
            >
              Join
            </button>
          </OEPAnalytics>
        );
      }
    }

    return null;
  };

  const getPage = (path) => {
    if (path.indexOf("showcase") > -1) return "showcases";
    else if (path.indexOf("attendees") > -1) return "attendees";
    else return path;
  };

  const getInfoIcon = () => {
    if (
      !watchNow &&
      !event.eventId &&
      event.sessionType?.sessionTypeName?.toLowerCase() !==
        MEETING_TYPES.SHOW_CASE
    ) {
      // meeting
      return (
        <OEPAnalytics
          page={getPage(getAnalyticsPage(location.pathname))}
          componentType="Button"
          url={`View ${event.sessionName}`}
          componentName="View Meeting"
        >
          <button
            type="button"
            className={scheduleStyles.iconButton}
            onClick={toggleShowModal}
          >
            {iconDisplay()}
          </button>
        </OEPAnalytics>
      );
    } else if (
      !watchNow &&
      event.eventId &&
      event.sessionType?.sessionTypeName.toLowerCase() !==
        MEETING_TYPES.SHOW_CASE
    ) {
      // session
      return (
        <LinkWrapper
          to={getSessionLink(event, isShowcaseSession)}
          aria-label={`Details on "${event.sessionName}" `}
          page={getPage(getAnalyticsPage(location.pathname))}
          componentType="Link"
          trackingUrl={getSessionLink(event, isShowcaseSession)}
          componentName="Details Icon"
        >
          {iconDisplay()}
        </LinkWrapper>
      );
    } else if (
      !watchNow &&
      event.eventId &&
      event.sessionType?.sessionTypeName.toLowerCase() ===
        MEETING_TYPES.SHOW_CASE
    ) {
      // showcase
      return (
        <div className={scheduleStyles.iconButton}>
          <LinkWrapper
            to={
              checkForChimeMeeting(event)
                ? getMeetingUrl(event, isShowcaseSession)
                : getSessionLink(event, isShowcaseSession)
            }
            className={`${scheduleStyles.btn}`}
            aria-label={`See Details for "${event.sessionName}"`}
            page={getPage(getAnalyticsPage(location.pathname))}
            componentType="Link"
            trackingUrl={
              checkForChimeMeeting(event)
                ? getMeetingUrl(event, isShowcaseSession)
                : getSessionLink(event, isShowcaseSession)
            }
            componentName="Details Icon"
          >
            {iconDisplay()}
          </LinkWrapper>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div
      key={event.id}
      className={`${scheduleStyles.cardWrapper} ${
        !checkForChimeMeeting(event) &&
        event?.meetingType?.toLowerCase() !== MEETING_TYPES.CHAT &&
        scheduleStyles.session
      } ${checkMeetingAvailability() && scheduleStyles.active} ${
        event?.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE &&
        scheduleStyles.showcase
      }`}
    >
      <div className={scheduleStyles.right}>
        <div
          className={`${scheduleStyles.icon} ${
            checkMeetingAvailability() && scheduleStyles.iconBlue
          }`}
        >
          <SvgTypes name={getScheduleIcons(event)} />
        </div>
        <div className={scheduleStyles.eventDetails}>
          <span>
            {formatDate(
              { date: event.sessionStart, format: "h:mm a" },
              timezone
            )}
          </span>
          <div className={scheduleStyles.sessionName}>
            <strong>{event.sessionName}</strong>
          </div>
        </div>
      </div>
      <div>
        {getButton()}
        {getInfoIcon()}
      </div>

      {showMeetingDetailsModal && (
        <MeetingInvitePopup
          showModal={toggleShowModal}
          event={event}
          showEditModal={showEditMeetingModal}
          page="My Schedule"
        />
      )}
      {showEditModal && (
        <CreateMeetingModal
          editEvent={event}
          toggleDialog={showEditMeetingModal}
        />
      )}
    </div>
  );
};
export default ScheduleCard;
