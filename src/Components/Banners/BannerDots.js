import { ReactComponent as Circle } from "./symbol.svg";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import { bannerActionTypes } from "./reducer";
import lodash from "lodash";
import rotatingBanner from "./scss/banner-navigation.module.scss";

/**
 * Banner Dots for all banner types
 * @param {function} dispatch local reducer set on parent component to mange state changes
 * @param {number} count total number of slides
 * @param {number} currentIndex current active slide
 * @param {string} interval window interval name
 * @param {string} classList class name to customize display
 */
const BannerDots = ({
  dispatch,
  count,
  currentIndex,
  interval,
  classList,
  pageName,
}) => {
  const loop = lodash.times(count); // Get array of how many dots should display
  // Fast travel to selected item
  const goToSlide = (index) => {
    dispatch({
      type: bannerActionTypes.UPDATE_SLIDE,
      payload: index,
    });
  };
  // Dots have Focus pause rotation
  const focusEvt = () => {
    dispatch({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: true,
    });
    clearInterval(window[interval]);
  };

  return (
    <div
      className={`${rotatingBanner.bannerNavigation} ${rotatingBanner[classList]}`}
    >
      {loop.map((i) => (
        <OEPAnalytics
          key={i}
          componentType="Button"
          page={pageName}
          pageId="Banners"
          url={`Go to Slide ${i + 1}`}
          componentName="Slide Navigation"
        >
          <button
            title={`Go to Slide ${i + 1}`}
            aria-label={`Go to Slide ${i + 1}`}
            onClick={goToSlide.bind(this, i)}
            onFocus={focusEvt}
            className={`${rotatingBanner.bannerNavigationButton} ${
              i === currentIndex && rotatingBanner.bannerNavigationButtonActive
            }`}
          >
            <Circle />
          </button>
        </OEPAnalytics>
      ))}
    </div>
  );
};

export default BannerDots;
