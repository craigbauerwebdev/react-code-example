import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

export const TIME_CHECKS = {
  start: "start",
  end: "end",
};
/**
 * Handle check to see if link start and end times have already passed.
 * @param {string} when check start time or end time
 * @param {string} time the data to check against.
 */
export const checkTime = (when, time) => {
  const today = new Date();
  const currentTime = moment.tz(
    today,
    "MMM Do YYYY h:mmA",
    ConfigService.runValues.momentTimezone
  );
  // Check start time
  if (when === TIME_CHECKS.start) {
    return currentTime.isAfter(
      moment.tz(
        time,
        "MM/DD/YYYY hh:mm a",
        ConfigService.runValues.momentTimezone
      )
    );
  }
  // Check end time
  if (when === TIME_CHECKS.end) {
    return currentTime.isBefore(
      moment.tz(
        time,
        "MM/DD/YYYY hh:mm a",
        ConfigService.runValues.momentTimezone
      )
    );
  }
};
