import "../TypeDef/typedef";

/**
 * Sidebar display or type information
 * @param {String} title
 * @param {String} data
 * @returns {SideBarContent} Sidebar Type display
 */
export function sidebarDisplay(title, data) {
  return {
    title: title,
    content: data,
  };
}

/**
 * @param {String} pageName Page name for tracking
 * @returns {SideBarContent} Sidebar Type display
 */
export function disclosures(pageName) {
  return {
    title: "Disclosures",
    page: pageName,
  };
}
