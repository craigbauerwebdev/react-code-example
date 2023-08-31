import isEventOver from "util/isEventOver";
import moment from "moment-timezone";

/**
 * @param {string} data
 * "2021-09-20T00:00:00" or "Post Event" or "2021-09-20T00:00:00|2021-09-21T00:00:00|Post Event"
 * @param {string} timezone
 * @returns {boolean}
 */

export const checkIfTodayByCustomDate = (data, timezone) => {
  const now = moment.tz(new Date(), timezone);
  const isPostEvent = isEventOver();
  const customDates = data?.split("|");

  const isToday = customDates?.some((date) => {
    const customDate = moment.tz(date, timezone);
    const isDateValid = customDate.isValid();
    const isMatch = isDateValid && now.isSame(customDate, "day");
    const isPostEventMatch = isPostEvent && date === "Post Event";

    return isMatch || isPostEventMatch;
  });

  return isToday;
};
