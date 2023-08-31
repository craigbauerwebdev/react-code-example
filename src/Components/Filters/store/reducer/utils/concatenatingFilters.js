import { MEETING_TYPES } from "util/meetingTypes";
import formatDate from "util/formatDate";

/**
 * Filter
 * @param {object} state
 * @param {object} payload
 * @param {string | boolean} payload.value - value to filter by
 * @param {string} payload.key - string to add to active filter object
 * @param {boolean} payload.active - to filter or un-filter
 */
export default function concatenatingFilters(
  state,
  { key, value, active, deleteKeys }
) {
  const activeFiltersCopy = { ...state.activeFilterList };
  let activeFilters;

  /**
   * If no key run filters from current active filters state.
   * Used for clearing search.
   */
  if (key) {
    // Update active filters to include or remove new item by key
    if (active) {
      // Only store one day value as days doesn't support more then one day at a time to be selected.
      if (key === "Day") {
        activeFilters = { ...activeFiltersCopy, [key]: value };
      } else if (deleteKeys) {
        // For tab filters we only want to filter by one tab at a time so clear out other tabs.
        deleteKeys.forEach((deleteKey) => {
          if (activeFiltersCopy[deleteKey]) {
            delete activeFiltersCopy[deleteKey];
          }
        });

        activeFilters = { ...activeFiltersCopy, [key]: [value] };
      } else if (
        activeFiltersCopy[key] &&
        !activeFiltersCopy[key].includes(value)
      ) {
        activeFiltersCopy[key].push(value);
        activeFilters = { ...activeFiltersCopy };
      } else if (!activeFiltersCopy[key]) {
        //Add new value to existing filter
        activeFilters = { ...activeFiltersCopy, [key]: [value] };
      }
    } else {
      activeFiltersCopy[key] = activeFiltersCopy[key]?.filter(
        (item) => item !== value
      );
      // Delete item for active filter object
      if (activeFiltersCopy[key]?.length <= 0) {
        delete activeFiltersCopy[key];
      }

      activeFilters = { ...activeFiltersCopy };
    }
  } else {
    // No Key use current filters for filtering
    activeFilters = activeFiltersCopy;
  }

  // Filter data here by active filter object
  const data = state.fuzzySearching ? state.fuzzySearchResult : state.fullList;
  let filteredSessions = data
    ?.filter((session) => {
      // Filter by Day
      if (activeFilters?.Day && activeFilters.Day !== "All") {
        if (session.sessionStartList) {
          let sessionList = [];
          session.sessionStartList.forEach((startTime) => {
            sessionList.push(formatDate({ date: startTime }, state.timezone));
          });
          return sessionList.includes(activeFilters.Day);
        } else {
          return (
            activeFilters.Day ===
            formatDate({ date: session.sessionStart }, state.timezone)
          );
        }
      }
      return session;
    })
    // Filter by Session Type
    .filter((data) =>
      activeFilters?.SessionType
        ? activeFilters.SessionType.includes(data.sessionType.sessionTypeName)
        : data
    )
    // Filter by Session Track
    .filter((data) =>
      activeFilters?.SessionTrack
        ? activeFilters.SessionTrack.includes(data.sessionTrack)
        : data
    )
    // Filter by sessionVideoSource (Livestream)
    .filter((data) =>
      activeFilters?.SessionVideoSource ? data.sessionVideoSource : data
    )
    // Filter by Ondemand
    .filter((data) =>
      activeFilters?.Ondemand ? !data.sessionVideoSource : data
    )
    // Filter by Sub Session Type (Posters)
    .filter((data) =>
      activeFilters?.SubSessionType
        ? activeFilters.SubSessionType.includes(data.subSessionType)
        : data
    )
    // Filter by Sponsor (Exhibitors)
    .filter((data) =>
      activeFilters?.Sponsor
        ? activeFilters.Sponsor.includes(data.membership_level)
        : data
    )
    // Filter by Location (Exhibitors)
    .filter((data) =>
      activeFilters?.Location
        ? activeFilters.Location.includes(
            data.custom_attributes?.custom_fields?.Country
          )
        : data
    )
    // Filter by Keynote (Speakers)
    .filter((data) => (activeFilters?.Keynote ? data.isVip : data))
    .filter((data) =>
      activeFilters?.ScheduleShowcase
        ? data.meetingType === MEETING_TYPES.SHOW_CASE
        : data
    )
    .filter((data) => {
      if (activeFilters?.ScheduleMeeting) {
        if (data.meetingType) {
          const meetingType = data.meetingType.toLowerCase();
          switch (meetingType) {
            case MEETING_TYPES.VIDEO:
            case MEETING_TYPES.CHAT:
            case MEETING_TYPES.INPERSON:
            case MEETING_TYPES.IN_PERSON:
              return true;
            default:
              return false;
          }
        }

        return false;
      }

      return data;
    })
    .filter((data) =>
      activeFilters?.ScheduleRoundTable ? data.type === "roundTable" : data
    )
    .filter((data) =>
      activeFilters?.FavSessions ? data.type === "sessions" : data
    )
    .filter((data) =>
      activeFilters?.FavPosters ? data.type === "posters" : data
    )
    .filter((data) =>
      activeFilters?.FavSpeakers ? data.type === "speakers" : data
    )
    .filter((data) =>
      activeFilters?.FavExhibitors ? data.type === "exhibitors" : data
    );

  // Filter by Category (Exhibitors)
  if (activeFilters?.Category) {
    filteredSessions = filteredSessions
      .map((exhibitor) => {
        if (
          activeFilters.Category.some((cat) => {
            if (exhibitor?.industry_category) {
              return exhibitor.industry_category.includes(cat);
            }

            return null;
          })
        ) {
          return exhibitor;
        } else {
          return null;
        }
      })
      .filter(Boolean);
  }

  return {
    ...state,
    filteredData: filteredSessions ? [...filteredSessions] : [],
    activeFilterList: activeFilters ? { ...activeFilters } : {},
  };
}
