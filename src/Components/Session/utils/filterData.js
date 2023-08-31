import formatDate from "util/formatDate";
import lodash from "lodash";
import sortResults from "../../../util/sortResults";

/**
 * Make a list of Session Tracks
/**
 * @typedef {Object} Settings
 *
 * @property {String} name display name
 * @property {Boolean} active
 * @property {String} key
 * @property {String} url for tracking
 */

/**
 * @typedef {Object} Day
 *
 * @property {String} date
 * @property {Boolean} active
 */

/**
 * Make a list of Session Tracks
 *
 * @param {Session[]} sessions
 * @param {Settings} sessions
 *
 * @returns {Settings[]} of session with tracks
 */
export function getTrackList(sessions, settings) {
  return (
    sessions &&
    lodash.uniqBy(
      sessions
        .map((session) => {
          if (session.sessionTrack) {
            return {
              name: session.sessionTrack,
              active: false,
              ...settings,
            };
          }

          return null;
        })
        .filter(Boolean),
      "name"
    )
  );
}
/**
 * Make Filter list of days
 *
 * @param {Session[]} sessions
 * @param {string} tz
 * added sorting to keep filter order intact after redoing sort to drop past sessions to bottom of list
 *
 * @returns {Day[]} with day filter settings
 */
export function getDays(sessions, tz) {
  const daysList =
    sessions &&
    lodash.uniqBy(
      sortResults(
        sessions.filter((session) => session.sessionStart),
        "startEndTimeAndName"
      ).map((session) => {
        return {
          date: formatDate({ date: session.sessionStart }, tz),
          active: false,
        };
      }),
      "date"
    );

  return [{ date: "All", active: false }, ...daysList];
}

/**
 * Make a list of session types
 *
 * @param {Session[]} sessions
 * @param {Settings} sessions
 *
 * @returns {Settings[]} list of session types
 */
export function getSessionTypes(sessions, settings) {
  return (
    sessions &&
    lodash.uniqBy(
      sessions
        .map((session) => {
          if (
            session?.sessionType?.sessionTypeName &&
            session?.sessionType?.sessionTypeName !== "None"
          ) {
            return {
              name: session.sessionType.sessionTypeName,
              active: false,
              ...settings,
            };
          }
          return null;
        })
        .filter(Boolean),
      "name"
    )
  );
}
