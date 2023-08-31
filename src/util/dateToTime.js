import moment from "moment";

/**
 * Take a date and get a time.
 * Timezone not need here what ever the date that is pass
 * Will be the data time return
 *
 * @param {string} time YYYY-MM-dd
 * @returns {Date}
 */
export default function dateToTime(time) {
  return moment(time).toDate();
}
