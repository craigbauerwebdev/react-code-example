import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

/**
 * isEventOver checks the time in the "ConfigService.runValues.eventOverDate" and
 * tell us if the event is over comparing it to now.
 *
 * @returns {boolean} if event is over
 */
export default function isEventOver() {
  const currentTime = moment.tz(
    new Date(),
    "MMM Do YYYY h:mmA",
    ConfigService.runValues.momentTimezone
  );

  return currentTime.isAfter(
    moment.tz(
      ConfigService.runValues.eventOverDate,
      ConfigService.runValues.momentTimezone
    )
  );
}
