import React, { Fragment, useEffect, useState } from "react";

import AttendeesSubFiltersList from "Components/Filters/AttendeesSubFiltersList";
import SubFiltersList from "./SubFiltersList";
import { actionTypesFiltersUI } from "./reducer";
import lodash from "lodash";
import { setByValue } from "./store/actions";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

/**
 * Parent filter item that opens the sub filter
 * @param {string} name this is the key that will be used to save the filter in the store
 * @param {array} subFilters list of sub filter items
 * @param {string} page tracking value
 * @param {function} dispatchUI local store dispatch function
 * @param {object} UIState current local UI state
 * @param {boolean} byPassSort Don't sort form a-z
 * @param {string} filterBy the Key we use for filtering
 */
const FiltersWithSubFilters = ({
  name,
  subFilters,
  page,
  dispatchUI,
  UIState,
  byPassSort = false,
  filterBy,
  dispatchSearchState,
  searchState,
  match,
}) => {
  const dispatch = useDispatch();
  const urlFilter = match.params.filter;
  const [filterItem, setFilterItem] = useState(null);
  const [hasPreFiltered, setHasPreFiltered] = useState(false);
  /**
   * Set local store to have a object of all items that have sub-filters.
   * This is so we can display one set of sub filter items at a time.
   * Also to control the active state of the sub filter parent.
   */
  useEffect(() => {
    dispatchUI({
      type: actionTypesFiltersUI.SET_PARENT_SUB_FILTER,
      payload: {
        name,
        active: false,
      },
    });
  }, [dispatchUI, name]);

  /**
   *  Once Item is save in the store we pull out.
   * That item and set it to local state to control the open and close of the sub filters
   */
  useEffect(() => {
    if (UIState.filtersWithSubFilters && UIState.filtersWithSubFilters[name]) {
      setFilterItem(UIState.filtersWithSubFilters[name]);
    }
  }, [UIState.filtersWithSubFilters, name]);

  /**
   * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Filters#active-filters-with-url
   * Pre filter by URl
   */
  useEffect(() => {
    // Check to see if url has filter value filter/Content
    if (urlFilter && !hasPreFiltered) {
      const hasFilter = subFilters.filter(
        (filter) => filter.name === urlFilter
      );

      // If there is a filter value filter by that value
      if (!lodash.isEmpty(hasFilter)) {
        dispatch(
          setByValue({
            key: filterBy,
            value: urlFilter,
            active: true,
          })
        );
      }

      setHasPreFiltered(true);
    }
  }, [urlFilter, subFilters, filterBy, dispatch, hasPreFiltered]);

  if (!filterItem) {
    return null;
  }

  return (
    <Fragment>
      <div>
        {page === "Attendee List" ? (
          <AttendeesSubFiltersList
            filters={
              byPassSort ? subFilters : lodash.sortBy(subFilters, "name")
            }
            active={true}
            page={page}
            dispatchSearchState={dispatchSearchState}
            searchState={searchState}
          />
        ) : (
          <SubFiltersList
            filters={
              byPassSort ? subFilters : lodash.sortBy(subFilters, "name")
            }
            active={true}
            page={page}
            name={name}
            filterBy={filterBy}
          />
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(withRouter(FiltersWithSubFilters));
