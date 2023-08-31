import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Banner } from "./Banner";
import RotatingBanner from "./RotatingBanner";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import lodash from "lodash";
import { shouldBlockBanner } from "util/gatingHelpers";

// import staticData from "../../util/staticData/Components/Banners/Banner.data";

/**
 * Banners
 * Data is being pulled from liferay
 * Banners https://github.com/Klowd/onlineeventpro-product-ui/wiki/Heros
 * @param {string} pageName what set of banners are you pulling from the data.
 */

const sortBySortorder = (d) => {
  return d.sort(function (a, b) {
    if (a.sortOrder < b.sortOrder) {
      return -1;
    }
    if (a.sortOrder > b.sortOrder) {
      return 1;
    }
    return 0;
  });
};

const BannerWrapper = ({ pageName }) => {
  const dispatch = useDispatch();
  const bannerData = useSelector((state) => state.global.hero);
  const [banner, setBanner] = useState(null);
  const user = useSelector((state) => state.global.user);

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   * const [data] = staticData.banners[pageName];
   * setBanner(data);
   */
  useEffect(() => {
    if (!bannerData) {
      // Dynamic Hero banners pulled from liferay
      dispatch(getPayload(dataTypes.hero));
    } else {
      if (bannerData[pageName]) {
        // Hero Banner found
        const [banner] = bannerData[pageName];

        banner.pageName = pageName;

        if (banner.heroBannerType && !lodash.isEmpty(banner.bannerDetails)) {
          // gate banners from grip access
          const gatedBanners = shouldBlockBanner(user, banner.bannerDetails);
          // re-sort after post event changes
          banner.bannerDetails = sortBySortorder(gatedBanners);
          setBanner(banner);
        } else {
          // No banners
          setBanner({
            banner: {
              heroBannerType: "none",
            },
          });
        }
      }
    }
  }, [dispatch, user, bannerData, pageName]);

  // Pick what banner type to display
  if (banner) {
    switch (banner.heroBannerType) {
      case "rotating":
        return <RotatingBanner bannerData={banner} pageName={pageName} />;
      case "static":
        return <Banner bannerData={banner} page={pageName} />;
      default:
        return null;
    }
  }

  return null;
};

export default BannerWrapper;
