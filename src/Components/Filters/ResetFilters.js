import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import { actionTypesFiltersUI } from "./reducer";
import { filterDataNonConcatenating } from "./store/actions";
import filterStyles from "./scss/filters.module.scss";
import { removeUrlHash } from "Components/Filters/util/filterHelpers";
import { useDispatch } from "react-redux";

/**
 * Clear Filters
 * @param {string} name this is the key that will be used to save the filter in the store
 * @param {string} filterBy this is what is used to do the filtering in the global filters store
 * @param {function} dispatchUI local store dispatch function
 * @param {string} defaultTo when cleared should something be active ie(all Speakers) filter
 * @param {string} resetToFilterType what object is the default item stored in the local UI store
 */
const ResetFilters = ({
  name,
  filterBy,
  dispatchUI,
  defaultTo,
  resetToFilterType,
  page,
}) => {
  const dispatch = useDispatch();

  const filterData = () => {
    // Clear filters
    dispatch(filterDataNonConcatenating(filterBy));
    dispatchUI({
      type: actionTypesFiltersUI.CLEAR_FILTERS_UI,
      payload: {
        value: defaultTo,
        filterType: resetToFilterType,
      },
    });
    removeUrlHash();
  };
  // TODO:
  // This "clear filters" button is duplicate and is being rendered exactly on top of other button with the same exact label.
  // All such duplicate buttons are marked with this same comment and can be searched by it in this repo

  // "Clear Filters" on SessionsList page that comes from passing "ResetFilters.js" to FilterWrapper on SessionsList.js line 72
  // "Clear Filters" on profile/schedule and favorites pages that comes from MasterDetail.js "getShowcaseFilters()" line 105
  // "Clear Filters" on any page with Scoped Search in "ScopedSearch.js" line 555
  return (
    <OEPAnalytics
      page={page}
      componentType="Button"
      url="Clear filters"
      componentName="Clear filters"
    >
      <button className={filterStyles.clearButton} onClick={filterData}>
        {name}
      </button>
    </OEPAnalytics>
  );
};

export default ResetFilters;
