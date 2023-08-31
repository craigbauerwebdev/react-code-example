import ConfigService from "services/ConfigService";
import getZoneName from "./getZoneName";
import moment from "moment-timezone";

/**
 * Format a date to a default time format or an specified one.
 *
 * @param {object} object
 * @param {string} object.date a date string to be formatted.
 * @param {string} object.format a string format to format the date. default "dddd, MMMM Do"
 * @param {string} localTZ user timezone value
 *
 * @returns {string} returns the formatted date.
 */
export default function formatDate(
  { date, format = "dddd, MMMM Do" },
  localTZ = ConfigService.runValues.momentTimezone
) {
  const eventStartTime = moment.tz(
    date,
    ConfigService.runValues.momentTimezone
  );

  getZoneName(localTZ);

  return eventStartTime.clone().tz(localTZ).format(format);
}
