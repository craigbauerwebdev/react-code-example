export const addModerator = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };

  if (!newMeeting.moderators) {
    newMeeting.moderators = [attendeeId];
  } else {
    if (!newMeeting.moderators.includes(attendeeId)) {
      newMeeting.moderators.push(attendeeId);
    }
  }

  if (newMeeting.speakers) {
    newMeeting.speakers = newMeeting.speakers.filter((x) => x !== attendeeId);
  }

  return newMeeting;
};

export const addModeratorReplaceHost = (meeting, attendeeId) => {
  const { host, moderators, ...rest } = {
    ...addModerator(meeting, attendeeId),
  };
  if (!moderators.includes(host)) {
    moderators.push(host);
  }
  return {
    ...rest,
    host: attendeeId,
    moderators,
  };
};

export const removeModerator = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };

  if (newMeeting.moderators?.length) {
    newMeeting.moderators = newMeeting.moderators.filter(
      (x) => x !== attendeeId
    );
  }

  return newMeeting;
};

export const addSpeaker = (meeting, attendeeId) => {
  const newMeeting = { ...removeModerator(meeting, attendeeId) };
  return {
    ...newMeeting,
    speakers: newMeeting?.speakers?.length
      ? [...newMeeting.speakers, attendeeId]
      : [attendeeId],
  };
};

export const removeSpeaker = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };

  if (newMeeting.speakers) {
    newMeeting.speakers = newMeeting.speakers.filter((x) => x !== attendeeId);
  }

  return newMeeting;
};

export const demoteToAttendee = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };

  if (newMeeting.speakers) {
    newMeeting.speakers = newMeeting.speakers.filter((x) => x !== attendeeId);
  }

  if (newMeeting.moderators) {
    newMeeting.moderators = newMeeting.moderators.filter(
      (x) => x !== attendeeId
    );
  }

  return newMeeting;
};

export const removeUser = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };

  if (newMeeting.speakers) {
    newMeeting.speakers = newMeeting.speakers.filter((x) => x !== attendeeId);
  }

  if (newMeeting.moderators) {
    newMeeting.moderators = newMeeting.moderators.filter(
      (x) => x !== attendeeId
    );
  }

  if (newMeeting.attendees) {
    newMeeting.attendees = newMeeting.attendees.filter((x) => x !== attendeeId);
  }

  if (newMeeting.blockedUsers) {
    newMeeting.blockedUsers.push(attendeeId);
  } else {
    newMeeting.blockedUsers = [attendeeId];
  }

  return newMeeting;
};

export const userDisconnected = (meeting, attendeeId) => {
  const newMeeting = { ...meeting };
  // Do something here
  return newMeeting;
};

export const removeJoinToken = (meeting) => {
  const newMeeting = { ...meeting };
  if (newMeeting.chimeMeeting) {
    newMeeting.chimeMeeting.attendeeInfo = null;
  }
  return newMeeting;
};
