import formatDate from "./formatDate";

/**
 *
 * @param {string} time
 * @param {string} tz
 * @param {string} checkStartDate
 * @returns {string} time string as YYYY-MM-DDTHH:mm:ss
 */
export default function newDate(time, tz, checkStartDate) {
  /**
   * Check to see if the end time get converted to the next day.
   * If it is converted to the next day get the base end time.
   * and reformat time to be the same day with the base end time.
   */
  if (checkStartDate) {
    const startCheck = formatDate(
      {
        date: checkStartDate,
        format: "YYYY-MM-DD",
      },
      tz
    );
    const endCheck = formatDate(
      {
        date: time,
        format: "YYYY-MM-DD",
      },
      tz
    );

    if (startCheck !== endCheck) {
      return new Date(`${endCheck}T${time.split("T")[1]}`);
    }
  }

  return new Date(
    formatDate(
      {
        date: time,
        format: "YYYY-MM-DDTHH:mm:ss",
      },
      tz
    )
  );
}
