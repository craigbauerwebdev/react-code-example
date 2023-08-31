/**
 * Add sub filters to store
 * @param {object} state current state in store
 * @param {string} name of object key
 * @param {boolean} active
 */
export const setFiltersWithSubFilters = (state, { name, active }) => {
  return {
    ...state,
    filtersWithSubFilters: {
      ...state.filtersWithSubFilters,
      [name]: {
        active: active,
      },
    },
  };
};

/**
 * Toggle the UI state for sub filters
 * @param {object} state of current store
 * @param {string} name of object key
 */
export const toggleSubFiltersActive = (state, name) => {
  const copyFilter = {};
  // Find sub filter in store and make a copy
  const copyParent = { ...state.filtersWithSubFilters[name] };
  // Toggle current items active state
  copyParent.active = !copyParent.active;
  // Loop through all sub filter items.
  for (const property in state.filtersWithSubFilters) {
    const copy = { ...state.filtersWithSubFilters[property] };
    // Set all items in store to false
    copy.active = false;

    copyFilter[property] = copy;
  }
  // Update state
  return {
    ...state,
    filtersWithSubFilters: {
      ...copyFilter,
      [name]: copyParent,
    },
  };
};
