import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

/**
 * Make a list of upcoming sessions
 *
 * @param {Session[]} sessions
 * @returns {Array} an array of sessions that are upcoming
 */
export default function getUpcomingSessions(sessions) {
  const current = moment.tz(
    new Date(),
    "MMM Do YYYY h:mmA",
    ConfigService.runValues.momentTimezone
  );

  return sessions.filter((session) =>
    current.isBefore(
      moment.tz(session.sessionStart, ConfigService.runValues.momentTimezone)
    )
  );
}
