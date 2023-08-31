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
import NotificationBody from "./NotificationBody";
import NotificationHolder from "./NotificationHolder";
import ProfileAvatar from "Components/Profile/ProfileAvatar";
import { Redirect } from "react-router-dom";
import dropdownStyles from "./scss/dropdown-notification.module.scss";
import { saveAnalytic } from "Components/OEPAnalytics";
import useNotificationMeeting from "hooks/useNotificationMeeting";

/**
 *
 * @param {object} props
 * @param {Notification} props.notification
 *
 * @returns {JSX.Element}
 */
const DropdownNotification = ({
  avatar,
  senderFirstName,
  preferredName,
  senderLastName,
  sender,
  company,
  timestamp,
  notification,
  closeNav,
}) => {
  const { notificationText: message } = notification;
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const [redirect, setRedirect] = useState();
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
      type: actionTypesNotification.MARK_AS_READ,
    });

    if (!notification.notificationRead) {
      dispatch(
        updateNotificationRead({
          ...notification,
          userFuzionId: user.fuzion_attendee_id,
        })
      );
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
        page: "Attendee Profile",
        pageId: "Attendee Profile",
        componentType: "Link",
        componentName: "Link",
        url: "Attendee Profile from Networking",
      });
      setRedirect(
        `/attendee/${notification.senderFuzionAttendeeId}/notifications`
      );
      setTimeout(() => {
        setRedirect(null);
      }, 1000);
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  useNotificationMeeting(
    notification,
    notificationState,
    dispatchNotificationState
  );

  return (
    <li
      className={`${dropdownStyles.listItem} ${
        !notification.notificationRead &&
        !notificationState.markAsRead &&
        dropdownStyles.dot
      }`}
    >
      <NotificationHolder
        notification={notification}
        callBack={markAsRead}
        onClick={stopPropagation}
        className={dropdownStyles.notificationBanner}
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
          className={dropdownStyles.notificationBannerBody}
          company={company}
          message={message}
          sender={sender}
          timestamp={timestamp}
          inNav
        >
          <div className={dropdownStyles.actionButtonContainer}>
            <ActionButton
              meeting={meeting}
              notification={notification}
              notificationState={notificationState}
              dispatchNotificationState={dispatchNotificationState}
            />
          </div>
        </NotificationBody>

        <div className={dropdownStyles.buttonContainer}>
          <Dropdown
            notification={notification}
            notificationState={notificationState}
            dispatchNotificationState={dispatchNotificationState}
            markAsRead={markAsRead}
            markAccepted={markAccepted}
            markDeclined={markDeclined}
            markCancelled={markCancelled}
          />
        </div>
        <MeetingPopup
          notificationState={notificationState}
          dispatchNotificationState={dispatchNotificationState}
          meeting={meeting}
          callBack={closeNav}
        />
      </NotificationHolder>
      {redirect && <Redirect push to={redirect} />}
    </li>
  );
};

export default DropdownNotification;
