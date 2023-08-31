import React, { useEffect, useReducer } from "react";
import { initialNotificationState, notificationReducer } from "./reducer";

import ActionButton from "./ActionButton";
import MeetingPopup from "./MeetingPopup";
import NotificationBody from "./NotificationBody";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import dropdownStyles from "./scss/dropdown-notification.module.scss";
import useNotificationMeeting from "hooks/useNotificationMeeting";
import { useSelector } from "react-redux";

const PopupNotification = ({
  avatar,
  senderFirstName,
  preferredName,
  senderLastName,
  sender,
  company,
  timestamp,
  notification,
  callback,
  closeNotification,
}) => {
  const { notificationText: message } = notification;
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

  useNotificationMeeting(
    notification,
    notificationState,
    dispatchNotificationState
  );

  useEffect(() => {
    if (notificationState.meetingInvitePopupOpen) {
      callback();
    }
  }, [notificationState.meetingInvitePopupOpen, callback]);

  useEffect(() => {
    if (
      notificationState.hasOpened &&
      !notificationState.meetingInvitePopupOpen &&
      !notificationState.editPopupMeeting
    ) {
      closeNotification();
    }
  }, [
    closeNotification,
    notificationState.hasOpened,
    notificationState.meetingInvitePopupOpen,
    notificationState.editPopupMeeting,
  ]);

  return (
    <div className={dropdownStyles.listItem}>
      <div className={dropdownStyles.notificationBanner}>
        <ProfileAvatar
          url={avatar}
          firstName={senderFirstName}
          preferredName={preferredName}
          lastName={senderLastName}
          size={60}
        />

        <NotificationBody
          className={dropdownStyles.notificationBannerBody}
          company={company}
          message={message}
          sender={sender}
          timestamp={timestamp}
        >
          <div className={dropdownStyles.actionButtonContainer}>
            <ActionButton
              notification={notification}
              notificationState={notificationState}
              dispatchNotificationState={dispatchNotificationState}
              meeting={meeting}
            />
          </div>
        </NotificationBody>
      </div>
      <MeetingPopup
        meeting={meeting}
        notificationState={notificationState}
        dispatchNotificationState={dispatchNotificationState}
      />
    </div>
  );
};

export default PopupNotification;
