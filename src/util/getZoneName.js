import moment from "moment-timezone";

/**
 * uses https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString for timezone name
 * @param {string} localTZ
 * @param {string} zoneName
 *
 * @returns {string} zone short or long name
 */
export const zoneName = (localTZ, zoneName = "short") => {
  const date = new Date();
  const options = { timeZone: localTZ, timeZoneName: zoneName }; // Can change this value to be "long" will return Eastern Standard Time vs EST
  const tz = date.toLocaleTimeString("en-US", options);

  return tz.split(" ").slice(2).join(" ");
};

/**
 * uses moment timezone value to get the correct timezone to display
 * Map over moment zone value when using the zz flag https://momentjs.com/timezone/docs/#/using-timezones/formatting/
 *
 * @param {string} localTZ
 *
 * @returns {string} zone name
 */
export default function getZoneName(localTZ) {
  moment.fn.zoneName = function () {
    return zoneName(localTZ) || this.zoneAbbr();
  };
}
