export const chimeUserTypes = {
  host: "HOST",
  moderator: "MODERATOR",
  attendee: "ATTENDEE",
  speaker: "SPEAKER",
};

const getUserType = (fuzionAttendeeId, meeting) => {
  if (meeting?.host === fuzionAttendeeId) {
    return chimeUserTypes.host;
  }

  if (meeting?.moderators?.includes(fuzionAttendeeId)) {
    return chimeUserTypes.moderator;
  }

  if (
    meeting?.meetingType !== "showcase" ||
    meeting?.speakers?.includes(fuzionAttendeeId)
  ) {
    return chimeUserTypes.speaker;
  }

  return chimeUserTypes.attendee;
};

export default getUserType;
