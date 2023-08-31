import { MEETING_TYPES } from "./meetingTypes";

/**
 * checkForChimeMeeting gets a meeting object and checks if it is a chime meeting.
 * @param {Meeting} meeting a meeting Object coming from the API.
 * @returns {Boolean} returns a true if the session is a live stream, false if it is not.
 */
export default function checkForChimeMeeting({ meetingType }) {
  return (
    meetingType === MEETING_TYPES.VIDEO ||
    meetingType === MEETING_TYPES.SHOW_CASE
  );
}
