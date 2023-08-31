import CreateMeetingModal, {
  MODAL_TYPES,
} from "Components/Profile/CreateMeetingModal";
import {
  disableParentPageScroll,
  enableParentPageScroll,
} from "Components/Modal/utils/toggleParentPageScrolling";

import { MEETING_TYPES } from "util/meetingTypes";
import MeetingInvitePopup from "Components/Profile/MeetingInvitePopup";
import MeetingRemovedPopup from "Components/Profile/MeetingRemovedPopup";
import React from "react";
import { actionTypesNotification } from "./reducer";
import { useSelector } from "react-redux";

/**
 *
 * @param {object} props
 * @param {NotificationState} props.notificationState
 * @param {Function} props.dispatchNotificationState
 * @param {Meeting} props.meeting
 *
 * @returns {JSX.Element}
 */
const MeetingPopup = ({
  notificationState,
  dispatchNotificationState,
  meeting,
  callBack,
}) => {
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const toggleEdit = () => {
    if (notificationState.editPopupMeeting && callBack) {
      callBack();
    }

    dispatchNotificationState({
      type: actionTypesNotification.SET_EDIT_MEETING,
    });
  };

  const closeDetails = () => {
    if (callBack) {
      callBack();
    }
    dispatchNotificationState({
      type: actionTypesNotification.TOGGLE_MEETING_DETAILS,
      payload: false,
    });
    enableParentPageScroll();
  };

  if (notificationState.meetingInvitePopupOpen && !meeting) {
    return <MeetingRemovedPopup showModal={closeDetails} />;
  }

  if (meeting && user) {
    if (
      notificationState.meetingInvitePopupOpen &&
      user.fuzion_attendee_id !== meeting.host &&
      meeting.attendees &&
      !meeting.attendees.includes(user.fuzion_attendee_id)
    ) {
      return <MeetingRemovedPopup showModal={closeDetails} />;
    }
  }

  if (notificationState.meetingInvitePopupOpen) {
    disableParentPageScroll();
    return (
      <MeetingInvitePopup
        showModal={closeDetails}
        event={meeting}
        showEditModal={toggleEdit}
      />
    );
  }

  if (
    meeting &&
    meeting.meetingType === MEETING_TYPES.SHOW_CASE &&
    notificationState.editPopupMeeting
  ) {
    return (
      <CreateMeetingModal
        modalType={MODAL_TYPES.webinar}
        meetingTypes={["Showcase"]}
        editEvent={meeting}
        toggleDialog={toggleEdit}
      />
    );
  }

  if (notificationState.editPopupMeeting) {
    return <CreateMeetingModal editEvent={meeting} toggleDialog={toggleEdit} />;
  }

  return null;
};

export default MeetingPopup;
