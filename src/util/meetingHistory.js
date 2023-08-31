const MEETING_HISTORY = "meeting_history";

export const addMeetingToHistory = (meetingId) => {
  const meetingHistoryString = sessionStorage.getItem(MEETING_HISTORY);
  const meetingHistory = meetingHistoryString
    ? JSON.parse(meetingHistoryString)
    : {};

  meetingHistory[meetingId] = true;

  sessionStorage.setItem(MEETING_HISTORY, JSON.stringify(meetingHistory));
};

export const isMeetingInHistory = (meetingId) => {
  const meetingHistoryString = sessionStorage.getItem(MEETING_HISTORY);

  if (meetingHistoryString) {
    const meetingHistory = JSON.parse(meetingHistoryString);

    return meetingHistory && meetingHistory[meetingId] === true;
  }

  return false;
};
