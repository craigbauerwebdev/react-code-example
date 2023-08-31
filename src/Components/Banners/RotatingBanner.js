import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { bannerActionTypes, bannerIntState, bannerReducer } from "./reducer";
import lodash, { shuffle } from "lodash";

import BannerArrows from "./BannerArrows";
import BannerDots from "./BannerDots";
import BannerImg from "./BannerImg";
import Loader from "Components/Loader";
import bannerContent from "../../util/staticData/Components/Banners/RotatingBanner";
import rotatingBanner from "./scss/rotating-banner.module.scss";
import useBannerAnalytics from "hooks/useBannerAnalytics";
import { useSelector } from "react-redux";
import useTabVisibility from "hooks/useTabVisibility";

/**
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Heros
 * Rotating Banner Images
 * This is getting liferay data.
 * Need to restrict access https://github.com/Klowd/onlineeventpro-product-ui/wiki/Gating-Demo#banners
 * @param {object} bannerData Static data to display banners when data is not coming from liferay
 * @param {boolean} arrows Display arrows for banner when true
 * @param {boolean} dots Display dots for banner when true
 * @param {string} intervalName Set interval name to be attached to the global window object must be unique for each banner
 */
const RotatingBanner = ({
  bannerData,
  pageName,
  arrows = true,
  dots = true,
  intervalName = "bannerInterval",
  transparentArrows = true,
}) => {
  const modalActive = useSelector((state) => state.global.modalActive);
  const bannerRef = useRef();
  const tabIsActive = useTabVisibility();
  //Time in seconds
  const defaultInv = 7;
  const [banner, dispatchBanner] = useReducer(bannerReducer, bannerIntState);
  const moveSlide = useCallback(() => {
    dispatchBanner({
      type: bannerActionTypes.UPDATE_SLIDE,
    });
  }, []);
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
    if (banner.maxCount > 1 && tabIsActive && !banner.focus && !modalActive) {
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
    moveSlide,
    banner.invTime,
    banner.focus,
    modalActive,
    intervalName,
  ]);

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this. As long as you pass the Banner data in the bannerData prop.
   * Static banners
    dispatchBanner({
      type: bannerActionTypes.SET_DATA,
      payload: {
        data: bannerData.bannerDetails,
        delay: defaultInv,
      },
    });
   */
  useEffect(() => {
    // Liferay banners
    const {
      bannerDetails,
      rotationDurationDelay,
      randomBannerRotation,
    } = bannerData;
    const sortHeros = lodash.orderBy(bannerDetails, ["sortOrder"], ["asc"]);

    dispatchBanner({
      type: bannerActionTypes.SET_DATA,
      payload: {
        data: randomBannerRotation ? shuffle(sortHeros) : bannerDetails,
        delay: rotationDurationDelay ? rotationDurationDelay : defaultInv,
      },
    });
  }, [bannerData]);

  const inView = useBannerAnalytics(bannerRef, {
    page: pageName || "Homepage",
    url: banner?.item?.altText || banner?.item?.linkURL,
  });

  useEffect(() => {
    inView ? resumeBannerRotation() : stopBannerRotation();
  }, [inView]);

  if (banner.noData) {
    return null;
  }

  if (!banner.item) {
    return <Loader />;
  }

  return (
    <div
      className={rotatingBanner.rotatingBannerHolder}
      ref={bannerRef}
      role="button"
      aria-roledescription="slide"
      aria-label={`${banner.currentIndex + 1} of ${banner.maxCount + 1}`}
      onBlur={blurEvt}
      onPointerEnter={stopBannerRotation}
      onPointerLeave={resumeBannerRotation}
    >
      {/* Banner Arrows */}
      {banner.maxCount > 1 && arrows && (
        <BannerArrows
          interval={intervalName}
          dispatch={dispatchBanner}
          pageName={pageName}
          url={banner.item}
          classList={
            transparentArrows
              ? ["rotatingLeftTransparent", "rotatingRightTransparent"]
              : ["rotatingLeft", "rotatingRight"]
          }
        />
      )}
      <BannerImg
        banner={banner.item}
        tracking={{
          ...bannerContent.OEPAnalytics,
          page: pageName,
        }}
        interval={intervalName}
        dispatch={dispatchBanner}
      />
      {/* Banner Dots */}
      {banner.maxCount > 1 && dots && (
        <BannerDots
          pageName={pageName}
          interval={intervalName}
          dispatch={dispatchBanner}
          count={banner.maxCount}
          currentIndex={banner.currentIndex}
          classList={transparentArrows ? "rotatingTransparent" : "rotating"}
        />
      )}
    </div>
  );
};

export default RotatingBanner;
