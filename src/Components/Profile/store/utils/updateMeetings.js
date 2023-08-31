import { NOTIFICATION_TYPES } from "./notificationsDataCheck";
export default function updateMeetings(state, newNotification) {
  const copySchedule = { ...state.schedule };
  const currentMeetings = (id) => {
    return copySchedule.meetings
      ? [...copySchedule.meetings].filter((meetingId) => meetingId !== id)
      : [];
  };

  if (newNotification.type === NOTIFICATION_TYPES.MeetingCanceled) {
    copySchedule.meetings = currentMeetings(newNotification.actionId);
  }

  return copySchedule;
}
