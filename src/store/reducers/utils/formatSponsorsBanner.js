import bannerTimeCheck from "./bannerTimeCheck";
import getSlugValue from "./getSlugValue";

/**
 * Format the banner data for the UI
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Sponsor-Banners
 * @param {object} obj
 * @param {string} pageKey
 */
export default function formatSponsorsBanner(obj, pageKey) {
  return (banner) => {
    const { delay, random } = banner;
    const slug = banner.childHzUrlSlug;
    const base = {
      // remove items that don't pass the time check test.
      banners: banner.banners.map(bannerTimeCheck).filter(Boolean),
      delay: delay,
      random: random,
    };

    if (slug) {
      obj[`${banner[pageKey].toLowerCase()}_${getSlugValue(slug)}`] = base;
    } else {
      // Make key for date from the passed in pageKey value.
      obj[banner[pageKey].toLowerCase()] = base;
    }
  };
}
