/**
 * If user doesn't have the right permissions to view all nav content.
 * Here is were we filter out guarded nav content from being display.
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Content-Gating-Work-Flow
 * @param {Array} blockedRoutes
 * @param {Array} nav
 * @returns {Array} guarded nav items
 */

const redirectedLinkForPermissions = (blockedRoutes, dropdown) => {
  if (
    blockedRoutes.find((b) => b.link === "/networking/attendees") &&
    dropdown.link === "/networking/attendees"
  ) {
    return "/networking/showcases";
  } else return dropdown.link;
};

const useNavGuarding = (nav, blockedRoutes) => {
  const filterSubNavForPermissions = (data) => {
    return data?.filter((item) => {
      const newLink = redirectedLinkForPermissions(blockedRoutes, item);
      item.link = newLink;
      const isBlocked = blockedRoutes.find(
        (route) => route.link === item.link || route.link === item.menuLabel
      );
      return !isBlocked && item;
    });
  };

  const filterNavForPermissions = (data) => {
    return data?.filter((item) => {
      const link = item.link ? item.link : item.linkURL; // Handle links values in different places
      const isBlocked = blockedRoutes.find(
        (route) => route.link === link || route.link === item.menuLabel
      );
      const subMenus =
        item.submenus && filterSubNavForPermissions(item.submenus);

      // After menu item has been filtered for permissions, check that
      // the parent nav does not have an empty array of subnavs

      if (item?.submenus?.length && !subMenus?.length) {
        // since this nav meets that above condition
        // do not return menu item
        return null;
      } else {
        item.submenus = subMenus;
      }
      return !isBlocked && item;
    });
  };

  return filterNavForPermissions(nav);
};

export default useNavGuarding;
