import ConfigService from "services/ConfigService";
import getZoneName from "./getZoneName";
import moment from "moment-timezone";

/**
 * formatTime formats it like 9:00 am - 9:00 pm EST.
 *
 * @param {Session} sessionData {SessionStart, SessionEnd} is a DateString.
 * @param {string} localTZ User timezone value
 *
 * @returns {string} formatted time
 */
export default function formatTime(
  { sessionStart, sessionEnd },
  localTZ = ConfigService.runValues.momentTimezone
) {
  const eventStartTime = moment.tz(
    sessionStart,
    ConfigService.runValues.momentTimezone
  );
  const eventEndTime = moment.tz(
    sessionEnd,
    ConfigService.runValues.momentTimezone
  );

  getZoneName(localTZ);

  return `${eventStartTime
    .clone()
    .tz(localTZ)
    .format("LT")} - ${eventEndTime.clone().tz(localTZ).format("LT zz")}`;
}
