/**
 * Active state for Toggle Filters
 * @param {object} state current state of the store
 * @param {string} name name of filter
 * @param {boolean} active value of filter
 */
export default function formatToggleFilters(state, { name, active }) {
  const copy = { ...state.toggleFilters };
  // Set active state of toggle filters
  copy[name] = {
    active: active,
  };

  return {
    ...state,
    toggleFilters: { ...state.toggleFilters, ...copy },
  };
}
