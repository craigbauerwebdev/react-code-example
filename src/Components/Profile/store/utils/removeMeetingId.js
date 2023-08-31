export default function removeMeetingId(state, meetingId) {
  const copySchedule = { ...state.schedule };
  const filteredMeetings = copySchedule.meetings.filter(
    (id) => id !== meetingId
  );
  copySchedule.meetings = filteredMeetings;
  return { ...state, schedule: copySchedule };
}
