import lodash from "lodash";
import moment from "moment-timezone";

const Hours_24 = 86400;
let timer;

/**
 *
 * Make list of notifications to be displayed for the user.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Notifications-web-worker
 *
 * @param {Meeting[]} messages
 * @param {number} timeDelay
 */
export const setNotificationsTimer = (messages, timeDelay, timezone) => {
  // Add time offset to current time so remove event that have passed the offset
  const now = moment.tz(new Date(), timezone).add(timeDelay, "m");
  /**
   * Remove all data that is passed the now time
   * Also sort all data by date
   */
  const cleanMessages = lodash.sortBy(
    messages.filter((message) =>
      now.isSameOrBefore(moment.tz(message.sessionStart, timezone))
    ),
    function (dateObj) {
      return new Date(dateObj.sessionStart);
    }
  );
  /**
   * Make a list of notifications for display.
   * Get the first item in cleanMessages and pull out all items with the same start time.
   */
  const notificationsList = cleanMessages.filter(
    (message) => message.sessionStart === cleanMessages[0].sessionStart
  );

  if (cleanMessages.length > 0) {
    /**
     * Get duration of how long time out should be before displaying messages.
     */
    const timeDiff = moment
      .tz(cleanMessages[0].sessionStart, timezone)
      .subtract(timeDelay, "m")
      .diff(
        moment.tz(new Date(), timezone), // Get up today time after filters and sort has run
        "second"
      );
    /**
     * If time differences is lager then 24 hours return 24 in secondes
     * @returns {Number} 24 hours in seconds or time differences between now and event time
     */
    const getTimeInSec = () => (timeDiff > Hours_24 ? Hours_24 : timeDiff);

    // Clear out timer so timeout doesn't run more then once.
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      // Send list of notifications back to the UI main thread for display.
      postMessage(notificationsList);
    }, getTimeInSec() * 1000);
  }
};
