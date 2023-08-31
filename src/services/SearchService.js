import Fuse from "fuse.js";

/**
 * Fuse.js setting can be found here https://fusejs.io/api/options.html
 * includeScore (Whether the score should be included in the result set. A score of 0indicates a perfect match, while a score of)
 * shouldSort (Whether to sort the result list, by score)
 * keys (List of keys that will be searched. This supports nested paths, weighted search, searching in arrays of strings and objects)
 * location (Determines approximately where in the text is the pattern expected to be found.)
 * threshold (At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.)
 * distance (Determines how close the match must be to the fuzzy location (specified by location). An exact letter match which is distance characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified. A distance of 1000 would require a perfect match to be within 800 characters of the location to be found using a threshold of 0.8.)
 * minMatchCharLength (Only the matches whose length exceeds this value will be returned. (For instance, if you want to ignore single character matches in the result, set it to 2).
 */

const fuseSetting = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  minMatchCharLength: 3,
  location: 0,
  distance: 100,
  findAllMatches: true,
};

const searchExhibitors = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "exhibitor_name",
        weight: 0.7,
      },
      {
        name: "exhibitor_description",
        weight: 0.1,
      },
      {
        name: "industry_category",
        weight: 0.2,
      },
    ],
  };
  const formattedData = data;
  return fuzzySearch({ formattedData, options, searchTerm });
};

const searchExhibitorsNetworking = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "exhibitor_name",
        weight: 0.8,
      },

      {
        name: "industry_category",
        weight: 0.2,
      },
    ],
  };
  const formattedData = data;
  return fuzzySearch({ formattedData, options, searchTerm });
};

const searchPosters = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "subSessionName",
        weight: 0.3,
      },
      {
        name: "description",
        weight: 0.16,
      },
      {
        name: "presenters.organization",
        weight: 0.08,
      },
      {
        name: "presenters.firstName",
        weight: 0.15,
      },
      {
        name: "presenters.lastName",
        weight: 0.15,
      },
      {
        name: "presenters.fullName",
        weight: 0.15,
      },
    ],
  };
  return fuzzySearch({ formattedData: data, options, searchTerm });
};

const searchSessions = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    threshold: 0.7,
    // These setting will lead to more irrelevant search results use sparling.
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "sessionName",
        weight: 0.3,
      },
      {
        name: "description",
        weight: 0.15,
      },
      {
        name: "sessionType.sessionTypeName",
        weight: 0.1,
      },
      {
        name: "subSessions.presenters.firstName",
        weight: 0.08,
      },
      {
        name: "subSessions.presenters.lastName",
        weight: 0.08,
      },
      {
        name: "subSessions.presenters.fullName",
        weight: 0.08,
      },
      {
        name: "subSessions.subSessionName",
        weight: 0.2,
      },
    ],
  };
  return fuzzySearch({ formattedData: data, options, searchTerm });
};

const searchSpeakers = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "firstName",
        weight: 0.165,
      },
      {
        name: "lastName",
        weight: 0.165,
      },
      {
        name: "fullName",
        weight: 0.165,
      },
      {
        name: "preferredName",
        weight: 0.165,
      },
      {
        name: "givenName",
        weight: 0.165,
      },
      {
        name: "organization",
        weight: 0.14,
      },
      {
        name: "userBioText",
        weight: 0.1,
      },
    ],
  };

  return fuzzySearch({ formattedData: data, options, searchTerm });
};

const searchSchedule = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    threshold: 0.7,
    keys: [
      {
        name: "sessionName",
        weight: 0.3,
      },
      {
        name: "meetingType",
        weight: 0.2,
      },
      {
        name: "AttendeesWithDetails.name",
        weight: 0.2,
      },
      {
        name: "AttendeesWithDetails.company",
        weight: 0.2,
      },
    ],
  };

  return fuzzySearch({ formattedData: data, options, searchTerm });
};

const searchWebinars = ({ data, searchTerm }) => {
  const options = {
    ...fuseSetting,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    keys: [
      {
        name: "sessionName",
        weight: 0.11,
      },
      {
        name: "companyName",
        weight: 0.08,
      },
      { name: "presenters", weight: 0.05 },
      {
        name: "subSessions.presenters.firstName",
        weight: 0.08,
      },
      {
        name: "subSessions.presenters.lastName",
        weight: 0.08,
      },
      {
        name: "subSessions.presenters.fullName",
        weight: 0.08,
      },
      {
        name: "hostProfile.firstName",
        weight: 0.1,
      },
      {
        name: "hostProfile.lastName",
        weight: 0.1,
      },
      {
        name: "hostProfile.fullName",
        weight: 0.1,
      },
      {
        name: "hostProfile.preferredFullName",
        weight: 0.1,
      },
      {
        name: "hostProfile.company",
        weight: 0.1,
      },
    ],
  };

  return fuzzySearch({ formattedData: data, options, searchTerm });
};

function fuzzySearch({ formattedData, options, searchTerm }) {
  formattedData = formattedData ?? [];
  if (formattedData.length === 0) {
    return formattedData;
  }

  searchTerm = searchTerm ?? "";
  if (typeof searchTerm !== "string" || searchTerm.length === 0) {
    return formattedData;
  }

  const fuse = new Fuse(formattedData, options);
  let results = fuse.search(searchTerm);
  if (results.length === 0) {
    results = fuse.search(searchTerm.trim());
    results = results.filter((result) => result.score < 0.2);
  }
  //adjust filter result.score based on site requirements
  return results
    .filter((result) => result.score <= 0.6)
    .map((results) => results.item);
}

export default {
  searchExhibitors,
  searchExhibitorsNetworking,
  searchPosters,
  searchSessions,
  searchSpeakers,
  searchSchedule,
  searchWebinars,
};
