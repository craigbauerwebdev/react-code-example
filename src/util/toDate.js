import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

/**
 * Make a date object
 * @param {string} time
 *
 * @returns {Date}
 */
export default function toDate(
  time,
  tz = ConfigService.runValues.momentTimezone
) {
  return moment.tz(time, tz).toDate();
}
