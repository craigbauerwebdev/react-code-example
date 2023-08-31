import React, { useReducer, useState } from "react";
import {
  acceptMeeting,
  declineMeeting,
  deleteMeeting,
  updateNotificationRead,
} from "Components/Profile/store/actions";
import {
  actionTypesNotification,
  initialNotificationState,
  notificationReducer,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import ActionButton from "./ActionButton";
import Dropdown from "./Dropdown";
import MeetingPopup from "./MeetingPopup";
import NotificationBody from "Components/UserNotification/NotificationBody";
import NotificationHolder from "Components/UserNotification/NotificationHolder";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import { Redirect } from "react-router-dom";
import pageNotificationStyles from "./scss/page-notification.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import useNotificationMeeting from "hooks/useNotificationMeeting";

const PageNotification = ({
  avatar,
  senderFirstName,
  preferredName,
  senderLastName,
  sender,
  company,
  timestamp,
  notification,
}) => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const [redirect, setRedirect] = useState();
  const { notificationText: message } = notification;
  /** @type {[NotificationState, Function]} */
  const [notificationState, dispatchNotificationState] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  /** @type {Meeting[]} */
  const [meeting] = useSelector((state) =>
    state.profile.meetings
      ? state.profile.meetings.filter(
          (m) => m.sessionId === notification.actionId
        )
      : []
  );

  const markAsRead = () => {
    dispatchNotificationState({
      type: actionTypesNotification.SET_DROPDOWN_OPEN,
      payload: false,
    });

    if (!notification.notificationRead) {
      dispatch(updateNotificationRead(notification));
    }
  };

  const markAccepted = () => {
    dispatch(
      acceptMeeting(notificationState.matchedMeeting, notification.sendTo)
    );
  };

  const markDeclined = () => {
    dispatch(
      declineMeeting(notificationState.matchedMeeting, notification.sendTo)
    );
  };

  const markCancelled = () => {
    dispatch(
      deleteMeeting(
        notificationState.matchedMeeting.sessionId,
        notificationState.matchedMeeting.meetingType,
        user.fuzion_attendee_id
      )
    );
  };

  const handleProfileClick = (notification) => {
    if (user.fuzion_attendee_id !== notification.senderFuzionAttendeeId) {
      saveAnalytic({
        page: "Notifications",
        pageId: "Attendee Profile",
        componentType: "Link",
        componentName: `${senderFirstName} ${senderLastName}`,
        url: `/attendee/${notification.senderFuzionAttendeeId}/notifications`,
      });
      setRedirect(
        `/attendee/${notification.senderFuzionAttendeeId}/notifications`
      );
    }
  };

  useNotificationMeeting(
    notification,
    notificationState,
    dispatchNotificationState
  );
  if (redirect) return <Redirect push to={redirect} />;
  return (
    <li
      className={`${pageNotificationStyles.notificationItemHolder} ${
        !notification.notificationRead &&
        !notificationState.markAsRead &&
        pageNotificationStyles.dot
      }`}
    >
      <NotificationHolder
        className={`${pageNotificationStyles.notificationBanner} ${
          !notification.notificationRead &&
          !notificationState.markAsRead &&
          pageNotificationStyles.dot
        }`}
        notification={notification}
        callBack={markAsRead}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={handleProfileClick.bind(null, notification)}
        >
          <ProfileAvatar
            url={avatar}
            firstName={senderFirstName}
            preferredName={preferredName}
            lastName={senderLastName}
            size={60}
          />
        </div>
        <NotificationBody
          className={pageNotificationStyles.notificationBannerBody}
          company={company}
          message={message}
          sender={sender}
          timestamp={timestamp}
        />
        <div className={pageNotificationStyles.buttonContainer}>
          <ActionButton
            notification={notification}
            notificationState={notificationState}
            dispatchNotificationState={dispatchNotificationState}
            meeting={meeting}
          />
          <Dropdown
            notification={notification}
            notificationState={notificationState}
            dispatchNotificationState={dispatchNotificationState}
            markAsRead={markAsRead}
            markAccepted={markAccepted}
            markDeclined={markDeclined}
            markCancelled={markCancelled}
          />
          <MeetingPopup
            meeting={meeting}
            notificationState={notificationState}
            dispatchNotificationState={dispatchNotificationState}
          />
        </div>
      </NotificationHolder>
    </li>
  );
};

export default PageNotification;
