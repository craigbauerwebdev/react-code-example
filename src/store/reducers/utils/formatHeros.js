import { TIME_CHECKS, checkTime } from "util/timeCheck";

import getSlugValue from "./getSlugValue";
import lodash from "lodash";

/**
 * Format Heros data form Liferay before saving in store
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Heros
 * @param {object} heros data from Liferay
 */
export default function formatHeros(heros) {
  if (!lodash.isEmpty(heros.heroBanners)) {
    const heroData = {};

    heros.heroBanners.forEach((hero) => {
      const [data] = hero;
      const slug = data.childBannerUrlSlug; // Sub page route ie(sessions/on-demand)
      const base = {
        bannerDetails: lodash.flatten(data.heroBannerDetails),
        heroBannerType: data.heroBannerType,
        randomBannerRotation: data.randomBannerRotation,
        rotationDurationDelay: data.rotationDurationDelay,
      };

      if (slug) {
        // Set data to object key
        heroData[
          `${data.heroBannerPage.toLowerCase()}_${getSlugValue(slug)}`
        ] = [base];
      } else {
        // No child slug make page selection key in object.
        heroData[data.heroBannerPage.toLowerCase()] = [base];
      }
    });

    for (const property in heroData) {
      heroData[property] = heroData[property].map((data) => {
        // Clean up bannerDetails object
        data.bannerDetails = data.bannerDetails
          .map((banner) => {
            const [bannerSetting] = banner.typeImageOptions;
            const [sponsorsData] = bannerSetting.sponsors;

            // Remove Item if the starts time hasn't passed yet.
            if (banner.starts && !checkTime(TIME_CHECKS.start, banner.starts)) {
              return null;
            }

            // Remove Item if the ends time has already passed.
            if (banner.ends && !checkTime(TIME_CHECKS.end, banner.ends)) {
              return null;
            }

            banner.sortOrder = Number(banner.sortOrder);
            banner.imageURL = banner.imageUrl;
            banner.linkURL = banner.linkUrl;
            banner.typeImageOptions = bannerSetting;
            banner.typeImageOptions.sponsors = sponsorsData;

            delete banner.imageUrl;
            delete banner.linkUrl;
            return banner;
          })
          .filter(Boolean);

        return data;
      });
    }

    return heroData;
  }

  return heros;
}
