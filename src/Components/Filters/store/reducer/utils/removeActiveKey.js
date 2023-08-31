import lodash from "lodash";

/**
 * Remove a value form the activeFilterList object to run filters for search
 * @param {object} state current store
 * @param {string} value what filter to be removed
 * @param {string} key what item in the activeFilterList object need to be updated
 */
export default function removeActiveKey(state, { value, key }) {
  const copyActiveFilterList = { ...state.activeFilterList };
  copyActiveFilterList[key] = copyActiveFilterList[key].filter(
    (val) => val !== value // remove value from list
  );
  // If that object is empty remove it from the activeFilterList list
  if (lodash.isEmpty(copyActiveFilterList[key])) {
    delete copyActiveFilterList[key];
  }

  return copyActiveFilterList;
}
