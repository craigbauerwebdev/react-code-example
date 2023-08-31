import { checkForCanceledMeeting } from "./notificationsDataCheck";
import lodash from "lodash";

export const patchMeetingUpdate = (
  state,
  formattedMeeting,
  usersWithStatuses
) => {
  //if not in schedule
  const modifiedSchedule = { ...state.schedule };
  const modifiedMeetings = [...state.meetings];
  const [userStatus] = usersWithStatuses.filter(
    (user) => user?.id === state.accountProfile.attendeeId
  );

  if (!lodash.isEmpty(formattedMeeting)) {
    // If meeting was declined by user don't add it to the user meetings schedule
    if (userStatus && userStatus.status === "declined") {
      return {
        meetings: [...state.meetings, formattedMeeting],
        schedule: modifiedSchedule,
      };
    }

    if (
      formattedMeeting &&
      formattedMeeting.host !== state.accountProfile.attendeeId &&
      formattedMeeting.attendees &&
      !formattedMeeting.attendees.includes(`${state.accountProfile.attendeeId}`)
    ) {
      return {
        meetings: [...state.meetings, formattedMeeting],
        schedule: modifiedSchedule,
      };
    }

    if (!state.schedule.meetings) {
      modifiedSchedule.meetings = [formattedMeeting.sessionId];
    } else if (!state.schedule.meetings.includes(formattedMeeting.sessionId)) {
      // Only update user schedule if the are list as host or moderator
      if (formattedMeeting.meetingType === "showcase") {
        if (
          formattedMeeting.host === state.accountProfile.attendeeId ||
          (formattedMeeting.moderators &&
            formattedMeeting.moderators.includes(
              state.accountProfile.attendeeId
            ))
        ) {
          modifiedSchedule.meetings = [
            ...state.schedule.meetings,
            formattedMeeting.sessionId,
          ];
        }
      } else {
        modifiedSchedule.meetings = [
          ...state.schedule.meetings,
          formattedMeeting.sessionId,
        ];
      }
    }

    //if not in meetings add, else replace
    const index = state.meetings
      .map((z) => z.sessionId)
      .indexOf(formattedMeeting.sessionId);

    if (index > -1) {
      modifiedMeetings.splice(index, 1);
    }

    modifiedMeetings.push(formattedMeeting);
  }

  return {
    meetings: modifiedMeetings,
    schedule: modifiedSchedule,
  };
};

export const deleteMeetingUpdate = (state, meetingId) => {
  //remove from schedule
  const modifiedSchedule = { ...state.schedule };

  if (state.schedule.meetings) {
    const index = state.schedule.meetings.indexOf(meetingId);

    if (index > -1) {
      modifiedSchedule.meetings.splice(index, 1);
    }
  }

  //remove from meetings
  const modifiedMeetings = [...state.meetings];
  const index = state.meetings.map((z) => z.sessionId).indexOf(meetingId);

  if (index > -1) {
    modifiedMeetings.splice(index, 1);
  }

  //remove details button form Notifications
  const notificationsUpdate = state.notifications?.map(
    checkForCanceledMeeting(meetingId)
  );

  return {
    meetings: modifiedMeetings,
    schedule: modifiedSchedule,
    notifications: notificationsUpdate,
  };
};
