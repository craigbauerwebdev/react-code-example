import ConfigService from "services/ConfigService";
import moment from "moment";

/**
 * Check if item is currently playing
 *
 * @param {object} sessionData Session
 * @param {string} sessionData.sessionStart Session Start Time.
 * @param {string} sessionData.sessionEnd Session End Time.
 * @param {number | boolean} minutesEarly Session End Time.
 *
 * @returns {boolean} is current time between session start time and end time
 */
export default function checkForWatchNow(
  { sessionStart, sessionEnd },
  minutesEarly = false
) {
  const startTime = minutesEarly
    ? subtractMinutes(sessionStart, minutesEarly)
    : moment.tz(sessionStart, ConfigService.runValues.momentTimezone);
  const endTime = moment.tz(sessionEnd, ConfigService.runValues.momentTimezone);

  return moment
    .tz(new Date(), ConfigService.runValues.momentTimezone)
    .isBetween(startTime, endTime);
}

export const checkForAfterSessionEnd = ({ sessionEnd }) => {
  const endTime = moment.tz(sessionEnd, ConfigService.runValues.momentTimezone);
  return moment
    .tz(new Date(), ConfigService.runValues.momentTimezone)
    .isAfter(endTime);
};

export const checkIfMeetingShouldHaveEnded = ({ sessionEnd, endTime }) => {
  const end = moment.tz(
    sessionEnd || endTime,
    ConfigService.runValues.momentTimezone
  );

  const present = moment.tz(new Date(), ConfigService.runValues.momentTimezone);

  const isAfter = moment(present).isAfter(end);
  return {
    shouldHaveEnded: isAfter,
  };
};

/**
 * Subtract minutes form date
 *
 * @param {Date} time
 * @param {Number} minutes
 *
 * @returns {Date} update date
 */
export const subtractMinutes = (time, minutes) => {
  const momentTime = moment.tz(time, ConfigService.runValues.momentTimezone);
  momentTime.subtract(minutes, "minutes");
  return momentTime.toDate();
};
