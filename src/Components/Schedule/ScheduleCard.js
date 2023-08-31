import CreateMeetingModal, {
  MODAL_TYPES,
} from "Components/Profile/CreateMeetingModal";
import React, { useState } from "react";
import checkForWatchNow, {
  checkIfMeetingShouldHaveEnded,
} from "util/checkForWatchNow";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";
import { useDispatch, useSelector } from "react-redux";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import { MEETING_TYPES } from "util/meetingTypes";
import MeetingInvitePopup from "Components/Profile/MeetingInvitePopup";
import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import checkForChimeMeeting from "util/checkForChimeMeeting";
import checkForLiveStream from "util/checkForLiveStream";
import checkForShowcaseSession from "util/checkForShowcaseSession";
import formatDate from "util/formatDate";
import getMeetingUrl from "util/getMeetingUrl";
import getScheduleIcons from "util/getScheduleIcons";
import getSessionLink from "../Session/utils/getSessionLink";
import { getUserProfileByFuzionId } from "util/api";
import scheduleCardStyles from "./scss/schedule-card.module.scss";
import { setOpenChat } from "Components/Profile/store/actions";
import { timeSetting } from "util/staticData/timeOffset";

/**
 * Schedule Item
 *
 * @param {Object} props
 * @param {Meeting} props.event
 * @param {String} props.exhibitorAdminCompanyId
 *
 * @returns {JSX.Element}
 */
const ScheduleCard = ({ event, exhibitorAdminCompanyId }) => {
  const dispatch = useDispatch();
  const timezone = useSelector((state) => state.global.timezone);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);
  const watchNow = checkForWatchNow(event, timeSetting);
  const isChatNow = checkForWatchNow(event, 0);
  const [showEditModal, setShowEditModal] = useState(false);
  const accountProfile = useSelector((state) => state.profile.accountProfile);
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const isShowcaseSession = checkForShowcaseSession(event);
  const { shouldHaveEnded = null } = checkIfMeetingShouldHaveEnded(event);

  const meetingIsOverButHasNotBeenUpdated =
    event?.meetingStatus === "started" && shouldHaveEnded;

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

  const getButton = () => {
    if (!watchNow && event?.meetingType?.toLowerCase() !== MEETING_TYPES.CHAT) {
      return null;
    }

    if (!exhibitorAdminCompanyId) {
      if (
        (event.meetingType?.toLowerCase() === MEETING_TYPES.VIDEO ||
          event.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE) &&
        event.meetingStatus !== "ended" &&
        !event?.sessionVideoSource?.includes("whereby")
      ) {
        const isHost = event.host === accountProfile.attendeeId;
        return (
          <LinkWrapper
            className={scheduleCardStyles.joinBtn}
            to={getMeetingUrl(event, isShowcaseSession)}
            aria-label={`${isHost ? "Start" : "Join"} "${
              event.sessionName
            }" Now`}
            page="My Schedule"
            componentType="button"
            trackingUrl={`${event.sessionName}`}
            external={false}
            componentName={isHost ? "Start" : "Join"}
          >
            {isHost ? "Start" : "Join"}
          </LinkWrapper>
        );
      }

      if (checkForLiveStream(event)) {
        if (event?.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
          if (watchNow) {
            return (
              <LinkWrapper
                className={scheduleCardStyles.watchButton}
                to={
                  checkForChimeMeeting(event)
                    ? getMeetingUrl(event, isShowcaseSession)
                    : getSessionLink(event, isShowcaseSession)
                }
                aria-label={`Watch "${event.sessionName}" Now`}
                page="My Schedule"
                componentType="Link"
                trackingUrl={`${event.sessionName}`}
                external={false}
                componentName="watch now"
              >
                Watch
              </LinkWrapper>
            );
          }
          return;
        } else
          return (
            <LinkWrapper
              className={scheduleCardStyles.watchButton}
              to={
                checkForChimeMeeting(event)
                  ? getMeetingUrl(event, isShowcaseSession)
                  : getSessionLink(event, isShowcaseSession)
              }
              aria-label={`Watch "${event.sessionName}" Now`}
              page="My Schedule"
              componentType="Link"
              trackingUrl={
                checkForChimeMeeting(event)
                  ? getMeetingUrl(event, isShowcaseSession)
                  : getSessionLink(event, isShowcaseSession)
              }
              external={false}
              componentName="watch now"
            >
              Watch
            </LinkWrapper>
          );
      }
    }

    if (event.meetingType?.toLowerCase() === MEETING_TYPES.CHAT && isChatNow) {
      const isHost = event.host === accountProfile.attendeeId;

      return (
        <OEPAnalytics
          page="My Schedule"
          componentType="button"
          url={`${isHost ? "Start" : "Join"} ${event.sessionName}`}
          componentName={isHost ? "Start Chat" : "Join Chat"}
        >
          <button
            className={scheduleCardStyles.chatJoinBtn}
            onClick={handleChatClick.bind(null, event)}
            aria-label={`Join "${event.sessionName}" Now`}
            componentName={event.sessionName}
          >
            {isHost ? "Start Chat" : "Join Chat"}
          </button>
        </OEPAnalytics>
      );
    }
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

  return (
    <div
      className={`${scheduleCardStyles.card} ${
        !checkForChimeMeeting(event) &&
        event?.meetingType?.toLowerCase() !== MEETING_TYPES.CHAT &&
        event?.meetingType?.toLowerCase() !== MEETING_TYPES.VIDEO &&
        scheduleCardStyles.session
      } ${watchNow && scheduleCardStyles.watchNow} ${
        event?.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE &&
        scheduleCardStyles.showcase
      }`}
    >
      <div className={scheduleCardStyles.cardContent}>
        <div
          className={`${scheduleCardStyles.icon} ${
            watchNow && scheduleCardStyles.iconBlue
          }`}
        >
          <SvgTypes name={getScheduleIcons(event)} />
        </div>

        <div>
          <time
            className={scheduleCardStyles.time}
            dateTime={formatDate(
              { date: event.sessionStart, format: "YYYY-MM-DD h:mm a" },
              timezone
            )}
          >
            {formatDate(
              { date: event.sessionStart, format: "h:mm a z" },
              timezone
            )}
          </time>
          <div className={scheduleCardStyles.name}>
            {event.meetingType &&
            event.meetingType.toLowerCase() !== MEETING_TYPES.SHOW_CASE ? (
              <OEPAnalytics
                page="My Schedule"
                componentType="Button"
                url={`View ${event.sessionName}`}
                componentName={event.sessionName}
              >
                <button
                  type="button"
                  className={scheduleCardStyles.sessionNameButton}
                  onClick={toggleShowModal}
                  aria-label={`See Details for "${event.sessionName}"`}
                >
                  <h4 className={scheduleCardStyles.bodyTitle}>
                    {event.sessionName}
                  </h4>
                </button>
              </OEPAnalytics>
            ) : (
              <h4 className={scheduleCardStyles.bodyTitle}>
                {event.sessionName}
              </h4>
            )}
          </div>
        </div>
      </div>
      <div className={scheduleCardStyles.cardAction}>
        {getButton()}
        {event?.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE &&
          !exhibitorAdminCompanyId && (
            <LinkWrapper
              to={
                event.meetingStatus === "ended" ||
                meetingIsOverButHasNotBeenUpdated
                  ? getSessionLink(event, isShowcaseSession)
                  : checkForChimeMeeting(event)
                  ? getMeetingUrl(event, isShowcaseSession)
                  : getSessionLink(event, isShowcaseSession)
              }
              className={
                watchNow ? scheduleCardStyles.joinBtn : scheduleCardStyles.btn
              }
              aria-label={`See Details for "${event.sessionName}"`}
              page="my schedule"
              componentType="button"
              trackingUrl={`${event.sessionName}`}
              componentName="details"
              sessionId={event.sessionId}
            >
              Details
            </LinkWrapper>
          )}
        {event?.filterKey === "scheduleSession" && !exhibitorAdminCompanyId && (
          <LinkWrapper
            to={getSessionLink(event, isShowcaseSession)}
            className={
              watchNow ? scheduleCardStyles.joinBtn : scheduleCardStyles.btn
            }
            aria-label={`See Details for "${event.sessionName}"`}
            page="my schedule"
            componentType="button"
            trackingUrl={`${event.sessionName}`}
            componentName="details"
            sessionId={event.sessionId}
          >
            Details
          </LinkWrapper>
        )}
        {/* show edit meeting */}
        {event?.meetingType?.toLowerCase() !== MEETING_TYPES.SHOW_CASE &&
          event?.filterKey !== "scheduleSession" && (
            <OEPAnalytics
              page="My Schedule"
              componentType="Button"
              url={`View ${event.sessionName}`}
              componentName={event.sessionName}
              sessionId={event.sessionId}
            >
              <button
                aria-label={`See Details for "${event.sessionName}"`}
                type="button"
                className={` ${
                  watchNow ? scheduleCardStyles.joinBtn : scheduleCardStyles.btn
                }`}
                onClick={toggleShowModal}
              >
                Details
              </button>
            </OEPAnalytics>
          )}
        {/* show admin edit meeting - can delete */}
        {event?.meetingType?.toLowerCase() === MEETING_TYPES.SHOW_CASE &&
          exhibitorAdminCompanyId && (
            <OEPAnalytics
              page="My Schedule"
              componentType="Button"
              url={`View ${event.sessionName}`}
              componentName={event.sessionName}
              sessionId={event.sessionId}
            >
              <button
                type="button"
                aria-label={`See Details for "${event.sessionName}"`}
                className={` ${
                  watchNow ? scheduleCardStyles.joinBtn : scheduleCardStyles.btn
                }`}
                onClick={showEditMeetingModal}
              >
                Details
              </button>
            </OEPAnalytics>
          )}
      </div>
      {showMeetingDetailsModal && (
        <MeetingInvitePopup
          showModal={toggleShowModal}
          event={event}
          exhibitorAdminCompanyId={exhibitorAdminCompanyId}
          showEditModal={showEditMeetingModal}
          page="My Schedule"
        />
      )}
      {showEditModal && !exhibitorAdminCompanyId && (
        <CreateMeetingModal
          editEvent={event}
          toggleDialog={showEditMeetingModal}
        />
      )}
      {showEditModal && exhibitorAdminCompanyId && (
        <CreateMeetingModal
          toggleDialog={showEditMeetingModal}
          modalType={MODAL_TYPES.webinar}
          meetingTypes={["Showcase"]}
          editEvent={event}
        />
      )}
    </div>
  );
};

export default ScheduleCard;
