/**
 * Set/Unset tabs active state
 * @param {object} state Current state of filters
 * @param {string} name Name of tab to save in store
 * @param {boolean} active state of the tab on or off
 */
export default function formatTabFilters(state, { name, active }) {
  let tab = state.tabFilters[name]; // Do the store have this tab

  if (tab) {
    // Tab is in the store
    tab = { ...state.tabFilters };
    for (const property in tab) {
      const copyTab = { ...tab[property] };
      /**
       * State the active state of the Tab
       * Only one can be active at a time.
       */
      if (name === property) {
        copyTab.active = active;
      } else {
        // Turn off all other tabs
        copyTab.active = false;
      }

      tab[property] = copyTab;
    }
  } else {
    // New tab to add to the store to track
    state.tabFilters[name] = {
      active,
    };
  }

  return {
    ...state,
    tabFilters: { ...state.tabFilters, ...tab },
  };
}
