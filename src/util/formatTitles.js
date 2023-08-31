import { TIME_CHECKS, checkTime } from "./timeCheck";

import { defaultIconPath } from "./staticData/Components/Home/Main";
import lodash from "lodash";

/**
 *
 * @param {object} titles
 *
 * @returns {LinkCard[]} of tiles
 */
export default function formatTitles(titles) {
  const icon = titles.subLabelImageURLOverride || defaultIconPath;
  const displayIcon = titles.displaySubLabelImageOnTiles;
  const cleanTiles = titles.tiles
    .filter((title) =>
      title.start ? checkTime(TIME_CHECKS.start, title.start) : true
    )
    .filter((title) =>
      title.end ? checkTime(TIME_CHECKS.end, title.end) : true
    );

  return lodash.sortBy(
    cleanTiles.map((title) => ({
      ...title,
      icon: icon,
      activeIcon: displayIcon,
    })),
    "sortOrder"
  );
}
