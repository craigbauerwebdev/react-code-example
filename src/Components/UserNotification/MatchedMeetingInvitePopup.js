import MeetingInvitePopup from "Components/Profile/MeetingInvitePopup";
import React from "react";
import { actionTypesNotification } from "./reducer";

const MatchedMeetingInvitePopup = ({
  notificationState,
  dispatchNotificationState,
}) => {
  const closeModal = () => {
    dispatchNotificationState({
      type: actionTypesNotification.SET_MEETING_INVITE_POPUP_OPEN,
      payload: false,
    });
  };

  if (
    !notificationState.matchedMeeting ||
    !notificationState.meetingInvitePopupOpen
  ) {
    return null;
  }

  return (
    <MeetingInvitePopup
      event={notificationState.matchedMeeting}
      showModal={closeModal}
    />
  );
};

export default MatchedMeetingInvitePopup;
