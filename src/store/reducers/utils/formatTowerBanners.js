import formatSponsorsBanner from "./formatSponsorsBanner";
import lodash from "lodash";

/**
 * Format data into an object with page names as the keys
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Sponsor-Banners
 * @param {object} data payload for Liferay
 */
export default function formatTowerBanners(data) {
  const towerBanners = {};

  if (lodash.isEmpty(data)) {
    return {};
  }

  data.banners.forEach(formatSponsorsBanner(towerBanners, "BannerPage"));

  return towerBanners;
}
