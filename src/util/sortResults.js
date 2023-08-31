import ConfigService from "services/ConfigService";
import moment from "moment-timezone";

export const sortTypes = {
  time: "time",
  startEndTimeAndName: "startEndTimeAndName",
  notEndedStartEndTimeAndName: "NotEndedStartEndTimeAndName",
  lastFirstChar: "char",
  name: "name",
  subSessionName: "sub Session Name",
};
/**
 * Sort Arrays by different sort types
 * @param {Array} data
 * @param {string} sortType
 * @returns {Array} sorted array based on sort type
 */
export default function sortResults(data, sortType) {
  switch (sortType) {
    // Sort byt Start time
    case sortTypes.time:
      return data.sort(function (a, b) {
        if (a.sessionStart < b.sessionStart) {
          return -1;
        }
        if (a.sessionStart > b.sessionStart) {
          return 1;
        }
        return 0;
      });
    // Sort by start time and end time and name
    case sortTypes.startEndTimeAndName:
      return data.sort(function (a, b) {
        const aSessionStart = a.sessionStart;
        const bSessionStart = b.sessionStart;
        const aSessionEnd = a.sessionEnd;
        const bSessionEnd = b.sessionEnd;
        const aSessionName = a?.sessionName?.toLowerCase();
        const bSessionName = b?.sessionName?.toLowerCase();

        if (aSessionStart < bSessionStart) {
          return -1;
        }

        if (aSessionStart > bSessionStart) {
          return 1;
        }

        if (aSessionStart === bSessionStart) {
          if (aSessionEnd < bSessionEnd) {
            return -1;
          }

          if (aSessionEnd > bSessionEnd) {
            return 1;
          }

          if (aSessionEnd === bSessionEnd) {
            if (aSessionName < bSessionName) {
              return -1;
            }

            if (aSessionName > bSessionName) {
              return 1;
            }
          }
        }

        return 0;
      });
    case sortTypes.notEndedStartEndTimeAndName:
      return data.sort(function (a, b) {
        const aSessionStart = a.sessionStart;
        const bSessionStart = b.sessionStart;
        const aSessionEnd = a.sessionEnd;
        const bSessionEnd = b.sessionEnd;
        const aSessionName = a.sessionName?.toLowerCase();
        const bSessionName = b.sessionName?.toLowerCase();
        const currentTime = moment(new Date().toISOString())
          .clone()
          .tz(ConfigService.runValues.momentTimezone);

        const sessionAEndMoment = moment.tz(
          aSessionEnd,
          ConfigService.runValues.momentTimezone
        );
        const sessionBEndMoment = moment.tz(
          bSessionEnd,
          ConfigService.runValues.momentTimezone
        );

        const sessionAHasEnded = currentTime.isAfter(sessionAEndMoment);
        const sessionBHasEnded = currentTime.isAfter(sessionBEndMoment);
        const bothEnded = sessionAHasEnded && sessionBHasEnded;
        const noneHasEnded = !sessionAHasEnded && !sessionBHasEnded;

        if (sessionAHasEnded && !sessionBHasEnded) {
          return 1;
        }
        if (sessionBHasEnded && !sessionAHasEnded) {
          return -1;
        }

        if (bothEnded || noneHasEnded) {
          if (aSessionStart < bSessionStart) {
            return -1;
          }

          if (aSessionStart > bSessionStart) {
            return 1;
          }

          if (aSessionStart === bSessionStart) {
            if (aSessionEnd < bSessionEnd) {
              return -1;
            }

            if (aSessionEnd > bSessionEnd) {
              return 1;
            }

            if (aSessionEnd === bSessionEnd) {
              if (aSessionName < bSessionName) {
                return -1;
              }

              if (aSessionName > bSessionName) {
                return 1;
              }
            }
          }
        }

        return 0;
      });
    // Sort by time last char
    case sortTypes.lastFirstChar:
      return data.sort((a, b) => {
        const aLastChar = a.startTime.charAt(0);
        const bLastChar = b.startTime.charAt(0);

        if (aLastChar > bLastChar) {
          return 1;
        }

        if (aLastChar < bLastChar) {
          return -1;
        }

        const aFirstChar = a.startTime;
        const bFirstChar = b.startTime;

        if (aFirstChar > bFirstChar) {
          return 1;
        }

        if (aFirstChar < bFirstChar) {
          return -1;
        }

        return 0;
      });
    // Sort by name
    case sortTypes.name:
      return data.sort((a, b) => {
        const aLastChar = a.lastName
          ? a.lastName
          : a.preferredName || a.firstName; //if last name doesn't exist, use first name as last name
        const bLastChar = b.lastName
          ? b.lastName
          : b.preferredName || b.firstName; //https://freemandigital.atlassian.net/browse/OE-2262

        if (aLastChar > bLastChar) {
          return 1;
        }

        if (aLastChar < bLastChar) {
          return -1;
        }
        const aFirstChar = a.preferredName || a.firstName;
        const bFirstChar = b.preferredName || b.firstName;

        if (aFirstChar > bFirstChar) {
          return 1;
        }

        if (aFirstChar < bFirstChar) {
          return -1;
        }
        return 0;
      });
    case sortTypes.subSessionName:
      return data.sort((a, b) => {
        if (a.subSessionName.toLowerCase() < b.subSessionName.toLowerCase()) {
          return -1;
        }
        if (a.subSessionName.toLowerCase() > b.subSessionName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    // Sort by name and time
    default:
      return data.sort(function (a, b) {
        if (
          a.sessionStart < b.sessionStart &&
          a.sessionName.toLowerCase() < b.sessionName.toLowerCase()
        ) {
          return -1;
        }
        if (
          a.sessionStart > b.sessionStart &&
          a.sessionName.toLowerCase() > b.sessionName.toLowerCase()
        ) {
          return 1;
        }
        return 0;
      });
  }
}
