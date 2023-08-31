import sortResults, { sortTypes } from "util/sortResults";

import { applyOverrides } from "./attendeeSearchOverrides";

/* this is temp code needed since Algolia is currently not indexed in a way
 * that allows us to filter whether a user has a company Id or not and so if
 * a user is set up incorrectly in Dynamo (an attendee has boothStaff set to
 * true) they come back from algolia as a rep
 */
const applyClientFilter = (hits, filter) => {
  switch (filter) {
    case "networking.boothStaff.BOOL:false":
      return hits.filter((z) => !z.companyId);
    case "networking.boothStaff.BOOL:true":
      return hits.filter((z) => z.companyId);
    default:
      return hits;
  }
};

export default function formatSearchResults(state, payload) {
  const { hits, ...resultsInfo } = payload;
  const filteredHits = applyClientFilter(hits, state.filter);
  const overrideResult = applyOverrides(state.resultsOverrides, filteredHits);
  const sortedHits = sortResults(overrideResult.hits, sortTypes.name);

  return {
    ...state,
    resultsOverrides: overrideResult.neededOverrides,
    hits: sortedHits,
    resultsInfo: resultsInfo,
  };
}
