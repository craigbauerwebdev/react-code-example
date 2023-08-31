import lodash from "lodash";
// List of Levels
export const levelsIndex = {
  PLATINUM: "Platinum",
  TIER_1: "Tier 1",
  UPGRADE_3: "Upgrade3",
  GOLD: "Gold",
  TIER_2: "Tier 2",
  UPGRADE_2: "Upgrade2",
  SILVER: "Silver",
  TIER_3: "Tier 3",
  UPGRADE_1: "Upgrade1",
  BRONZE: "Bronze",
  TIER_4: "Tier 4",
  BASIC: "Basic",
};

/**
 * Make a list of Exhibitor Levels
 * @param {object} exhibitorsData
 */
export default function getLevels(exhibitorsData) {
  // Make Array of levels with name and id
  const formatLevels = lodash
    .uniq(exhibitorsData.map((exhibitor) => exhibitor.membership_level || ""))
    .map((level) => {
      switch (level) {
        case levelsIndex.PLATINUM:
        case levelsIndex.TIER_1:
        case levelsIndex.UPGRADE_3:
          return { name: level, id: 1 };
        case levelsIndex.GOLD:
        case levelsIndex.TIER_2:
        case levelsIndex.UPGRADE_2:
          return { name: level, id: 2 };
        case levelsIndex.SILVER:
        case levelsIndex.TIER_3:
        case levelsIndex.UPGRADE_1:
          return { name: level, id: 3 };
        case levelsIndex.BRONZE:
        case levelsIndex.TIER_4:
        case levelsIndex.BASIC:
          return { name: level, id: 4 };
        default:
          return { name: false };
      }
    })
    .filter((level) => level.name);

  if (formatLevels.length > 0) {
    // We have levels sorted by ID return just the level name
    const levels = lodash
      .sortBy(formatLevels, ["id"])
      .map((level) => level.name);

    return levels;
  }
  // No levels
  return [];
}
