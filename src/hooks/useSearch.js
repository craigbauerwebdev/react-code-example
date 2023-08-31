import {
  initialSearchState,
  searchActionTypes,
  searchReducer,
} from "Components/AttendeeSearch/AttendeeSearchReducer";
import { useCallback, useEffect, useReducer } from "react";

const HITS_PER_PAGE = 20;

/**
 * @typedef AttendeeState
 * @property {AttendeeSearchState} searchState
 * @property {Function} dispatchSearchState
 **/

/**
 * Search Algolia https://www.algolia.com/doc/ for attendee data
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/useSearch
 *
 * @param {import("algoliasearch").SearchIndex} index algolia Search Index
 *
 * @returns {AttendeeState}
 */
const useSearch = (index) => {
  const [searchState, dispatchSearchState] = useReducer(
    searchReducer,
    initialSearchState
  );
  const search = useCallback(
    /**
     * @param  {import("algoliasearch").SearchIndex} i algolia Search Index options
     * @param  {Number} p page
     * @param  {string} q search query
     * @param  {string} f filter
     */
    async (i, p, q, f) => {
      if (i) {
        // Send search off to algolia
        const options = {
          page: p,
          hitsPerPage: HITS_PER_PAGE,
          filters: f || "",
        };
        const res = await i.search(q, options);

        dispatchSearchState({
          type: searchActionTypes.SET_RESULTS,
          payload: res,
        });
      }
    },
    []
  );

  // Run search on change of searchState.index, searchState.page and searchState.searchQuery
  const searchIndex = searchState?.index;
  const searchPage = searchState?.page;
  const searchQuery = searchState?.searchQuery;
  const searchFilter = searchState?.filter;

  useEffect(() => {
    search(searchIndex, searchPage, searchQuery, searchFilter);
  }, [searchIndex, searchPage, searchQuery, searchFilter, search]);

  // Set algolia index for searching
  useEffect(() => {
    if (index) {
      dispatchSearchState({
        type: searchActionTypes.SET_INDEX,
        payload: index,
      });
    }
  }, [dispatchSearchState, index]);

  return {
    searchState,
    dispatchSearchState,
  };
};

export default useSearch;
