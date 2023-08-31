import { TIME_CHECKS, checkTime } from "./timeCheck";

import lodash from "lodash";

/**
 * Remove item if it fails start time and end time test
 * @param {object} navItem
 */
const navStartEnd = (navItem) => {
  if (!navItem.starts) {
    delete navItem.starts;
  } else if (!checkTime(TIME_CHECKS.start, navItem.starts)) {
    return true;
  }

  if (!navItem.ends) {
    delete navItem.ends;
  } else if (!checkTime(TIME_CHECKS.end, navItem.ends)) {
    return true;
  }
};

/**
 * Sort and run a check on navigation items.
 * Remove navigation items if they passed there start or end time checks.
 * Remove empty submenus array.
 * @param {array} nav
 *
 * @returns {array} sorted nav items
 */
export default function formatNavData(nav) {
  if (nav) {
    const formatNav = nav
      .map((navItem) => {
        const copyNavItem = { ...navItem };
        const hasSubNav = lodash.isEmpty(copyNavItem.submenus);
        const removeItem = navStartEnd(copyNavItem);
        /**
         * Run a check to see if item should be removed.
         * Base on starts and ends time.
         */
        if (removeItem) {
          return null;
        }

        copyNavItem.sortOrder = Number(copyNavItem.sortOrder);

        if (!hasSubNav) {
          copyNavItem.submenus = lodash.orderBy(
            copyNavItem.submenus
              .map((subItem) => {
                const copyNavSubItem = { ...subItem };
                const removeSubItem = navStartEnd(copyNavSubItem);
                /**
                 * Run a check to see if item should be removed.
                 * Base on starts and ends time.
                 */
                if (removeSubItem) {
                  return null;
                }

                copyNavSubItem.sortOrder = Number(copyNavSubItem.sortOrder);

                return copyNavSubItem;
              })
              .filter(Boolean),
            ["sortOrder"],
            ["asc"]
          );
        } else {
          delete copyNavItem.submenus;
        }

        return copyNavItem;
      })
      .filter(Boolean);

    return lodash.orderBy(formatNav, ["sortOrder"], ["asc"]);
  }

  return [];
}
