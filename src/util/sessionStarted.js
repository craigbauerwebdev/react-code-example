import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

/**
 * A check to see if the session has already started
 *
 * @param {String} sessionStartTime
 *
 * @returns {Boolean} true if session has already started.
 */
export default function sessionStarted(sessionStartTime) {
  const currentTime = moment.tz(
    new Date(),
    "MMM Do YYYY h:mmA",
    ConfigService.runValues.momentTimezone
  );
  const eventStartTime = moment.tz(
    sessionStartTime,
    ConfigService.runValues.momentTimezone
  );

  return currentTime.isAfter(eventStartTime);
}
