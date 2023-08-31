import "../../Sidebar/TypeDef/typedef";

import { sidebarDisplay } from "Components/Sidebar/utils";

/**
 * Setup exhibitor logo sidebar
 *
 * @param {object} exhibitorData
 * @param {string} exhibitorData.exhibitor_name
 * @param {string} exhibitorData.logo_image_path
 * @param {string} exhibitorData.company_info.website_url
 *
 * @returns {SideBarContent}
 */
function exhibitorLogo({
  exhibitor_name,
  company_info: { website_url },
  logo_image_path,
}) {
  return {
    name: exhibitor_name,
    url: website_url,
    img: logo_image_path,
  };
}

/**
 * Exhibitor Categories Sidebar data
 * @param {Object} exhibitorData
 * @returns {SideBarContent}
 */
function categories({ industry_category }) {
  const data =
    typeof industry_category === "string"
      ? industry_category.split("|")
      : industry_category || [];
  return {
    title: "Product Categories",
    data,
  };
}

// Exhibitors Logo
export function getExhibitorsLogo(exhibitor) {
  return exhibitorLogo(exhibitor);
}

// Exhibitors Location
export function getExhibitorsLocation(exhibitor) {
  if (exhibitor?.custom_attributes?.custom_fields?.Country) {
    return sidebarDisplay(
      "Location",
      exhibitor.custom_attributes?.custom_fields?.Country
    );
  }

  return null;
}

// Exhibitors Categories
export function getExhibitorsCategories(exhibitor) {
  if (exhibitor?.industry_category?.length) {
    return categories(exhibitor);
  }

  return null;
}
