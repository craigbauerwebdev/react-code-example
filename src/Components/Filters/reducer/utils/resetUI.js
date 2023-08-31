/**
 * Clear filters UI State
 * @param {object} state
 * @param {string} value object key to match state object
 * @param {string} filterType value to reset item to active
 */
export default function resetUI(state, { value, filterType }) {
  let days = state.daysList;
  let filtersWithSubFilters = state.filtersWithSubFilters;
  let toggleFilters = state.toggleFilters;
  let tabFilters = state.tabFilters;
  // Reset day UI when filters is cleared
  if (days) {
    days = [...state.daysList].map((days) => {
      const daysCopy = { ...days };
      // Set all days to active when filters are cleared
      if (daysCopy.date === "All") {
        daysCopy.active = true;
      } else {
        daysCopy.active = false;
      }

      return daysCopy;
    });
  }
  // Reset UI for filters with sub filters
  if (filtersWithSubFilters) {
    for (const property in filtersWithSubFilters) {
      filtersWithSubFilters[property].active = false;
    }
  }
  // Reset UI for toggle filters with sub filters
  if (toggleFilters) {
    for (const property in toggleFilters) {
      toggleFilters[property].active = false;
    }
  }
  // Reset UI for tab filters
  if (tabFilters) {
    for (const property in tabFilters) {
      /*
       * Set a tab filter to active when filters are cleared.
       * Used in Speakers page to set All speakers to active
       */
      if (filterType === "tabFilters" && property === value) {
        tabFilters[property].active = true;
      } else {
        tabFilters[property].active = false;
      }
    }
  }

  return {
    ...state,
    daysList: days,
    filtersWithSubFilters: filtersWithSubFilters,
    toggleFilters: toggleFilters,
    tabFilters: tabFilters,
  };
}
