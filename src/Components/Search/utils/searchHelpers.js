import ConfigService from "services/ConfigService";
import SearchService from "services/SearchService";
import { pageTypes } from "Components/Filters/store/reducer";

export const filterOnCategory = (incomingData, category) => {
  const data = incomingData || []; //making sure that we can call .filter on it later on
  if (category === "Session") {
    return data.filter((d) => !d.meetingType);
  }
  if (category === "Showcase") {
    return data.filter((d) => d.meetingType === category.toLowerCase());
  }
  if (category === "Meeting") {
    return data.filter((d) => d.meetingType && d.meetingType !== "showcase");
  }
  return data;
};

export const result = ({ data, type, pageType, searchTerm }) => {
  const getData = (name, searchData) => {
    const [dataSet] = searchData.filter((item) => item.type === name);
    return dataSet?.items;
  };

  const sessionOrSubSessions = ConfigService.runValues.hasSubSessions
    ? "sessions & subsessions"
    : "sessions";

  const defaultReturnArray = [
    {
      type: sessionOrSubSessions,
      items: SearchService.searchSessions({
        data: getData(sessionOrSubSessions, data),
        searchTerm,
      }),
      filterKeyName: "favSessions",
    },
    {
      type: "speakers",
      items: SearchService.searchSpeakers({
        data: getData("speakers", data),
        searchTerm,
      }),
      filterKeyName: "favSpeakers",
    },
  ];

  if (ConfigService.runValues.hasExhibitors) {
    defaultReturnArray.push({
      type: "exhibitors",
      items: SearchService.searchExhibitors({
        data: getData("exhibitors", data),
        searchTerm,
      }),
      filterKeyName: "favExhibitors",
    });
  }

  if (ConfigService.runValues.hasPosters) {
    defaultReturnArray.push({
      type: "posters",
      items: SearchService.searchPosters({
        data: getData("posters", data),
        searchTerm,
      }),
      filterKeyName: "favPosters",
    });
  }

  switch (true) {
    case pageType === pageTypes.SESSION:
      return SearchService.searchSessions({ data, searchTerm });
    case ConfigService.runValues.hasPosters && pageType === pageTypes.POSTER:
      return SearchService.searchPosters({ data, searchTerm });
    case pageType === pageTypes.SPEAKER:
      return SearchService.searchSpeakers({ data, searchTerm });
    case ConfigService.runValues.hasExhibitors &&
      pageType === pageTypes.EXHIBITOR:
      return SearchService.searchExhibitors({ data, searchTerm });
    case pageType === pageTypes.EXHIBITOR_NETWORKING:
      return SearchService.searchExhibitorsNetworking({ data, searchTerm });
    case pageType === pageTypes.SCHEDULE:
      return SearchService.searchSchedule({
        data,
        searchTerm,
      });
    case pageType === pageTypes.WEBINARS:
      return SearchService.searchWebinars({ data, searchTerm });
    case pageType === pageTypes.FAVORITES:
      switch (true) {
        case type === "Sessions":
          return [
            {
              type: "sessions",
              items: SearchService.searchSessions({
                data: getData("sessions", data),
                searchTerm,
              }),
              filterKeyName: "favSessions",
            },
          ];
        case type === "Posters":
          return [
            {
              type: "posters",
              items: SearchService.searchPosters({
                data: getData("posters", data),
                searchTerm,
              }),
              filterKeyName: "favPosters",
            },
          ];
        case type === "Exhibitors":
          return [
            {
              type: "exhibitors",
              items: SearchService.searchExhibitors({
                data: getData("exhibitors", data),
                searchTerm,
              }),
              filterKeyName: "favExhibitors",
            },
          ];
        case type === "Speakers":
          return [
            {
              type: "speakers",
              items: SearchService.searchSpeakers({
                data: getData("speakers", data),
                searchTerm,
              }),
              filterKeyName: "favSpeakers",
            },
          ];
        default:
          return defaultReturnArray;
      }
    default:
      return null;
  }
};
