import sortResults, { sortTypes } from "./sortResults";

import ConfigService from "services/ConfigService";
import moment from "moment";

/**
 * Sort sessions to put current and upcoming sessions first, then past sessions
 * @param {array} filtered sessions
 * @returns {sorted array with first past session identified}
 */
export default function getPastAndUpcomingSessions(filteredSessions) {
  if (filteredSessions) {
    const now = moment.tz(new Date(), ConfigService.runValues.momentTimezone);
    const sortedSessions = sortResults(
      filteredSessions,
      sortTypes.notEndedStartEndTimeAndName
    );
    const firstPastSession = sortedSessions.find(({ sessionEnd }) =>
      now.isAfter(moment.tz(sessionEnd, ConfigService.runValues.momentTimezone))
    );
    const currentSession = sortedSessions.find(({ sessionEnd }) =>
      now.isSameOrBefore(
        moment.tz(sessionEnd, ConfigService.runValues.momentTimezone)
      )
    );
    sortedSessions.map((s) => {
      if (firstPastSession && s.sessionId === firstPastSession.sessionId) {
        s.firstPastSession = true;
      } else {
        s.firstPastSession = false; // this resets data to remove true value from any previous filtered views
      }
      return s;
    });
    return { sortedSessions: sortedSessions, currentSessions: currentSession };
  }
  return [];
}
