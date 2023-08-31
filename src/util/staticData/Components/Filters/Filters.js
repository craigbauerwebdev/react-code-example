import { capitalize } from "lodash";
// Take a look a README.md
export const filtersConfig = {
  allSpeakers: {
    name: `All ${capitalize(process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE)}`,
    filterBy: "all",
  },
  clear: {
    name: "Clear Filters",
    filterBy: "clear",
  },
  keynote: {
    name: "Filter by Keynote",
    filterBy: "Keynote",
  },
  scheduleSession: {
    name: "Sessions",
    filterBy: "SessionVideoSource",
  },
  scheduleMeeting: {
    name: "Meetings",
    filterBy: "ScheduleMeeting",
  },
  scheduleShowcase: {
    name: "Showcases",
    filterBy: "ScheduleShowcase",
  },
  scheduleRoundTable: {
    name: "Round Table",
    filterBy: "ScheduleRoundTable",
  },
  scheduleWatchParty: {
    name: "Watch Party",
    filterBy: "ScheduleWatchParty",
  },
  favSessions: {
    name: "Sessions",
    filterBy: "FavSessions",
  },
  favPosters: {
    name: "Posters",
    filterBy: "FavPosters",
  },
  favSpeakers: {
    name: "Speakers",
    filterBy: "FavSpeakers",
  },
  favExhibitors: {
    name: "Exhibitors",
    filterBy: "FavExhibitors",
  },
  liveStream: {
    name: "Filter by Live Stream",
    filterBy: "SessionVideoSource",
  },
  sessionType: {
    name: "Filter by Session Type",
    subFilterSetting: {
      key: "SessionType", // Use as filtering key
      // ariaLabel: "toggle session type filters",
      url: "Filter By Session Type",
    },
  },
  //For sessions list Page
  sessionTrack: {
    name: "Filter by Topic",
    // These are the button setting for sub filter items
    subFilterSetting: {
      key: "SessionTrack", // Use as filtering key
      // ariaLabel: "see filtered sessions by track",
      url: "Filter By Session Track",
    },
  },
  //For poster list Page
  sessionTopic: {
    name: "Filter by Topic",
    // These are the button setting for sub filter items
    subFilterSetting: {
      key: "SubSessionType", // Use as filtering key
      // ariaLabel: "perform topic filtering",
      url: "Filter By Session Topic",
    },
  },
  sponsor: {
    name: "Filter by Sponsor Level",
    // These are the button setting for sub filter items
    subFilterSetting: {
      key: "Sponsor", // Use as filtering key
      url: "Filter By Sponsor Level",
      // ariaLabel: "sponsor exhibitor level toggle",
    },
  },
  location: {
    name: "Filter by Location",
    // These are the button setting for sub filter items
    subFilterSetting: {
      key: "Location", // Use as filtering key
      url: "Filter By Location",
      // ariaLabel: "sponsor map location selection",
    },
  },
  category: {
    name: "Filter by Category",
    // These are the button setting for sub filter items
    subFilterSetting: {
      key: "Category", // Use as filtering key
      url: "Filter By Category",
      // ariaLabel: "sponsor category category toggle",
    },
  },
};
