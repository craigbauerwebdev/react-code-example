import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { bannerActionTypes, bannerIntState, bannerReducer } from "./reducer";
import lodash, { shuffle } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import BannerArrows from "./BannerArrows";
import BannerDots from "./BannerDots";
import BannerImg from "./BannerImg";
import Loader from "Components/Loader";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import staticDataVertical from "util/staticData/Components/Banners/VerticalSponsorBanner.data";
import useBannerAnalytics from "hooks/useBannerAnalytics";
import useTabVisibility from "hooks/useTabVisibility";
import verticalBannerStyles from "./scss/vertical-sponsor-banner.module.scss";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Sponsor-Banners
 * Rotating Vertical Banner Images
 * Data is being pulled from liferay
 * If this is not the desired outcome you can replace it with static data.
 * Need to restrict access https://github.com/Klowd/onlineeventpro-product-ui/wiki/Gating-Demo#banners
 * @param {string} pageName What set of date to use
 * @param {boolean} arrows Display arrows for banner when true
 * @param {boolean} dots Display dots for banner when true
 * @param {string} intervalName Set interval name to be attached to the global window object must be unique for each banner
 */
const VerticalSponsorBanner = ({
  pageName,
  arrows = true,
  dots = true,
  intervalName = "verticalInterval",
  hasPadding = false,
  transparentArrows = false,
}) => {
  const dispatch = useDispatch();
  const bannerData = useSelector((state) => state.global.towerBanner);
  const modalActive = useSelector((state) => state.global.modalActive);
  const bannerRef = useRef();
  const tabIsActive = useTabVisibility();
  //Time in seconds
  const defaultInv = 10;
  const moveSlide = useCallback(() => {
    dispatchBanner({
      type: bannerActionTypes.UPDATE_SLIDE,
    });
  }, []);
  const [banner, dispatchBanner] = useReducer(bannerReducer, bannerIntState);
  const blurEvt = () => {
    if (banner.focus) {
      // Re-start banners when we are no longer focus on them for ADA.
      clearInterval(window[intervalName]);
      window[intervalName] = setInterval(moveSlide, banner.invTime);
    }

    dispatchBanner({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: false,
    });
  };

  const stopBannerRotation = () => {
    dispatchBanner({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: true,
    });
  };

  const resumeBannerRotation = () => {
    dispatchBanner({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: false,
    });
  };

  /**
   * Pause banners when browser is no longer focused on website.
   * Pause if external modal is open.
   * Unpause when browser regains focus or modal is closed.
   */
  useEffect(() => {
    if (banner.maxCount > 0 && tabIsActive && !banner.focus && !modalActive) {
      window[intervalName] = setInterval(moveSlide, banner.invTime);
    } else if (!tabIsActive || modalActive) {
      clearInterval(window[intervalName]);
    }

    return () => {
      clearInterval(window[intervalName]);
    };
  }, [
    banner.maxCount,
    tabIsActive,
    banner.invTime,
    moveSlide,
    banner.focus,
    modalActive,
    intervalName,
  ]);

  // Banner Tracking for when banner comes into view
  const inView = useBannerAnalytics(bannerRef, {
    page: pageName || "Homepage",
    url: banner?.item?.altText || banner?.item?.linkURL,
  });

  useEffect(() => {
    inView ? resumeBannerRotation() : stopBannerRotation();
  }, [inView]);

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   *  const data = staticDataVertical.sponsors[pageName];
      const { banners, delay, random: randomizeData } = data;
      // Static banners
      dispatchBanner({
        type: bannerActionTypes.SET_DATA,
        payload: {
          data: randomizeData ? shuffle(banners) : banners,
          delay: delay || defaultInv,
        },
      });
   */
  useEffect(() => {
    // Liferay banners
    if (!bannerData) {
      dispatch(getPayload(dataTypes.towerBanner));
    } else if (
      !lodash.isEmpty(bannerData[pageName]) &&
      !lodash.isEmpty(bannerData[pageName].banners)
    ) {
      const { banners, delay, random: randomizeData } = bannerData[pageName];
      const sortHeros = lodash.orderBy(banners, ["sortOrder"], ["asc"]);

      dispatchBanner({
        type: bannerActionTypes.SET_DATA,
        payload: {
          data: randomizeData ? shuffle(sortHeros) : sortHeros,
          delay: delay || defaultInv,
        },
      });
    } else {
      // No Liferay banners found
      dispatchBanner({
        type: bannerActionTypes.NO_DATA,
      });
    }
  }, [bannerData, dispatch, pageName, defaultInv]);

  if (banner.noData) {
    return null;
  }

  if (!banner.item) {
    return (
      <div className={verticalBannerStyles.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`${verticalBannerStyles.verticalSponsorBanner} ${
        hasPadding && verticalBannerStyles.verticalSponsorBannerPadding
      }`}
      ref={bannerRef}
      aria-roledescription="slide"
      aria-label={`${banner.currentIndex + 1} of ${banner.maxCount + 1}`}
      onBlur={blurEvt}
      role="button"
      onPointerEnter={stopBannerRotation}
      onPointerLeave={resumeBannerRotation}
    >
      <div>
        {/* Banner Arrows */}
        {banner.maxCount > 0 && arrows && (
          <BannerArrows
            pageName={pageName}
            dispatch={dispatchBanner}
            interval={intervalName}
            classList={
              transparentArrows
                ? ["verticalLeftTransparent", "verticalRightTransparent"]
                : ["verticalLeft", "verticalRight"]
            }
            url={banner.item}
          />
        )}
        <BannerImg
          banner={banner.item}
          tracking={{
            ...staticDataVertical.OEPAnalytics,
            page: pageName,
          }}
          dispatch={dispatchBanner}
          interval={intervalName}
        />
        {/* Banner Dots */}
        {banner.maxCount > 0 && dots && (
          <BannerDots
            pageName={pageName}
            dispatch={dispatchBanner}
            interval={intervalName}
            count={banner.maxCount}
            currentIndex={banner.currentIndex}
            classList={transparentArrows ? "verticalTransparent" : "vertical"}
          />
        )}
      </div>
    </div>
  );
};

export default VerticalSponsorBanner;
