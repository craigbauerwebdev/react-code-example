import { useHistory, useLocation } from "react-router-dom";

import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import actionButtonStyles from "./scss/action-button.module.scss";
import { actionTypesNotification } from "./reducer";
import { checkIfMeetingShouldHaveEnded } from "util/checkForWatchNow";
import getAnalyticsPage from "util/getAnalyticsPage";
import getMeetingUrl from "util/getMeetingUrl";
import { getUserProfileByFuzionId } from "util/api";
import { meetingTypes } from "./util/meetingTypes";
import { setOpenChat } from "Components/Profile/store/actions";
import { useDispatch } from "react-redux";

/**
 *
 * @param {object} props
 * @param {Notification} props.notification
 * @param {NotificationState} props.notificationState
 * @param {Function} props.dispatchNotificationState
 * @param {Meeting} props.meeting
 *
 * @returns {JSX.Element}
 */
const ActionButton = ({
  notification,
  notificationState,
  dispatchNotificationState,
  meeting,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { type, actionId: action, senderFuzionAttendeeId } = notification;
  const { shouldHaveEnded } = meeting
    ? checkIfMeetingShouldHaveEnded(meeting)
    : { shouldHaveEnded: true };
  const handleMeetingInviteClick = () => {
    dispatchNotificationState({
      type: actionTypesNotification.SET_MEETING_INVITE_POPUP_OPEN,
      payload: true,
    });
  };

  const handleChatClick = () => {
    getUserProfileByFuzionId(senderFuzionAttendeeId).then((result) => {
      const id = result.data.data.attendeeId;
      dispatch(
        setOpenChat({
          selectedAttendee: { id, Profile: result },
          isMinimized: false,
          show: true,
        })
      );
    });
  };

  const handleChatMentionClick = () => {
    // due to recent changes, there might be inconsistencies of actionId begining with "/" or not.
    // remove the first char if it is "/"
    const normalizedDestination = notification.actionId.replace(/^\//, "");
    if (type === "NewMentionLiveStream") {
      history.push(`/${normalizedDestination}/true`);
    } else {
      history.push(`/directchat/${notification.actionId}`);
    }
  };

  const getActionButtonContent = (type, action) => {
    const detailsBtn = () => {
      if (!notificationState.matchedMeeting || notification.canceled) {
        return null;
      }

      // page name rendered for https://freemandigital.atlassian.net/browse/OEP-5405
      return (
        <OEPAnalytics
          page={getAnalyticsPage(location.pathname)}
          componentType="Button"
          url="View Invite Details"
          componentName="Invite Details"
        >
          <button
            type="button"
            className={actionButtonStyles.watchButton}
            onClick={handleMeetingInviteClick}
          >
            Details
          </button>
        </OEPAnalytics>
      );
    };

    if (type && action) {
      switch (type) {
        case meetingTypes.MEETING_INVITE:
        case meetingTypes.MEETING_UPDATE:
          return detailsBtn();
        case meetingTypes.MEETING_START:
          if (!notificationState.matchedMeeting || shouldHaveEnded) return null;

          return (
            <LinkWrapper
              className={actionButtonStyles.watchButton}
              to={getMeetingUrl(notificationState.matchedMeeting)}
              aria-label={`Join "${notificationState.matchedMeeting?.sessionName}" Now`}
              page={getAnalyticsPage(location.pathname)}
              componentType="Join Button"
              trackingUrl={`${notificationState.matchedMeeting?.sessionName}`}
              componentName="Join"
            >
              Join
            </LinkWrapper>
          );
        case meetingTypes.NEW_CHAT:
          return (
            <OEPAnalytics
              page={getAnalyticsPage(location.pathname)}
              componentType="Button"
              url="Reply meeting"
            >
              <button
                className={actionButtonStyles.watchButton}
                onClick={handleChatClick}
                aria-label={`Reply "${notificationState.matchedMeeting?.sessionName}"`}
              >
                Reply
              </button>
            </OEPAnalytics>
          );
        case meetingTypes.NEW_MENTION:
          return (
            <OEPAnalytics
              page={getAnalyticsPage(location.pathname)}
              componentType="Button"
              url="View meeting"
            >
              <button
                className={actionButtonStyles.watchButton}
                onClick={handleChatMentionClick.bind(null)}
                //to={`/directchat/${notification.actionId}`}
                aria-label={`View "${notificationState.matchedMeeting?.sessionName}"`}
              >
                View
              </button>
            </OEPAnalytics>
          );
        case meetingTypes.NEW_MENTION_LIVESTREAM:
          return (
            <OEPAnalytics
              page={getAnalyticsPage(location.pathname)}
              componentType="Button"
              url="View meeting"
            >
              <button
                className={actionButtonStyles.watchButton}
                onClick={handleChatMentionClick.bind(null)}
                //to={`/directchat/${notification.actionId}`}
                aria-label={`View "${notificationState.matchedMeeting?.sessionName}" Now`}
              >
                View
              </button>
            </OEPAnalytics>
          );
        default:
          return null;
      }
    }

    return null;
  };

  return getActionButtonContent(type, action);
};

export default ActionButton;
