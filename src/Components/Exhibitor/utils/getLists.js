import { levelsIndex } from "./getLevels";
import lodash from "lodash";

/**
 * @typedef {Object} FilterList
 * @param {string} value
 * @param {Boolean} active
 * @param {String} name
 */

/**
 * Setup data for Levels filters
 * @param {Array} defaultLevels
 * @returns {[FilterList]} list of levels
 */
export function getLevelsList(defaultLevels, filterSettings) {
  return defaultLevels.map((level) => {
    const setting = {
      value: level,
      active: false,
      ...filterSettings,
    };
    switch (level) {
      case levelsIndex.TIER_1:
      case levelsIndex.UPGRADE_3:
        return {
          ...setting,
          name: levelsIndex.PLATINUM,
        };
      case levelsIndex.TIER_2:
      case levelsIndex.UPGRADE_2:
        return {
          ...setting,
          name: levelsIndex.GOLD,
        };
      case levelsIndex.TIER_3:
      case levelsIndex.UPGRADE_1:
        return {
          ...setting,
          name: levelsIndex.SILVER,
        };
      case levelsIndex.TIER_4:
      case levelsIndex.BASIC:
        return {
          ...setting,
          name: levelsIndex.BRONZE,
        };
      default:
        return { name: level };
    }
  });
}
/**
 * Get list of locations
 * @param {Array} filteredExhibitors
 * @returns {[FilterList]} list of locations
 */
export function getLocationsList(filteredExhibitors, settings) {
  const locations = lodash.uniqBy(
    filteredExhibitors
      .map((location) => {
        if (location.custom_attributes?.custom_fields?.Country) {
          return {
            active: false,
            name: location.custom_attributes?.custom_fields?.Country,
            ...settings,
          };
        }

        return null;
      })
      .filter((location) => location),
    "name"
  );

  return locations;
}

/**
 * Get list of category
 * @param {Array} filteredExhibitors
 * @returns {[FilterList]} list of locations
 */
export function getCategoryList(filteredExhibitors, settings) {
  const categoryList = lodash.uniqBy(
    lodash
      .flatten(
        filteredExhibitors
          .map(
            (exhibitors) =>
              (exhibitors.industry_category &&
                Array.isArray(exhibitors.industry_category) &&
                exhibitors.industry_category) ||
              []
          )
          .filter((cat) => cat.length > 0)
      )
      .map((cat) => ({ active: false, name: cat, ...settings })),
    "name"
  );

  return categoryList;
}
