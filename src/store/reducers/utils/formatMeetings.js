import lodash from "lodash";

/**
 * Set up sessions to be saved in store
 * @param {object} payload data from endpoint
 *
 * @returns {[]} formatted meetings
 */

//TODO: When doing the meeting data refactor in serveless look to move this to the API.
export const formatMeeting = (meeting) => ({
  ...meeting,
  fuzionExhibitorId: meeting?.exhibitorId,
  streamId: meeting?.streamChannelId,
  // additional fields needed to re-use session components (SessionTab, SessionTitle)
  sessionId: meeting?.meetingId,
  sessionStart: meeting?.startTime,
  sessionEnd: meeting?.endTime,
  sessionName: meeting?.meetingTitle,
});

export default function formatMeetings(payload) {
  if (payload) {
    /**
     * Temp fix for some reason serverless is return a single object at times?
     * We shouldn't need this after this ticket get done https://freemandigital.atlassian.net/browse/PJX-1229
     */
    const data = Array.isArray(payload) ? payload : [payload];
    // remove any bad meeting data
    const validMeetings = data.filter((el) => el && !lodash.isEmpty(el));

    if (validMeetings.length > 0) {
      const formattedMeetings = validMeetings?.map(formatMeeting);

      return formattedMeetings;
    }
  }

  return [];
}
