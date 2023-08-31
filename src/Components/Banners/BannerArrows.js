import React, { Fragment } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import { bannerActionTypes } from "./reducer";
import rotatingBanner from "./scss/banner-navigation.module.scss";

/**
 * Arrows Component for moving banners one item at a time.
 * @param {function} dispatch local reducer set on parent component to mange state changes
 * @param {string} interval window interval name
 * @param {Array} classList class name to customize display
 */
const BannerArrows = ({
  pageName,
  dispatch,
  interval,
  classList = ["left", "right"],
}) => {
  const [left, right] = classList;
  const arrowEvt = (dur) => {
    // Move Slide
    dispatch({
      type: bannerActionTypes.ARROW_CHANGE,
      payload: dur,
    });
  };

  const focusEvt = () => {
    // Arrows have Focus pause rotation
    dispatch({
      type: bannerActionTypes.SET_BANNER_FOCUS,
      payload: true,
    });
    clearInterval(window[interval]);
  };

  return (
    <Fragment>
      {/* Left Arrow */}
      <OEPAnalytics
        page={pageName}
        componentType="Button"
        url="Go to previous slide"
        componentName="Slide Navigation"
      >
        <button
          type="button"
          className={`${rotatingBanner.arrows} ${
            classList && rotatingBanner[left]
          }`}
          onClick={arrowEvt.bind(this, "prev")}
          title="Go to previous slide"
          aria-label="Go to previous slide"
          onFocus={focusEvt}
        >
          <SvgTypes name="arrow-left" />
        </button>
      </OEPAnalytics>
      {/* Right Arrow */}
      <OEPAnalytics
        page={pageName}
        componentType="Button"
        url="Go to next slide"
        componentName="Slide Navigation"
      >
        <button
          type="button"
          className={`${rotatingBanner.arrows} ${
            classList && rotatingBanner[right]
          }`}
          onClick={arrowEvt.bind(this, "next")}
          title="Go to next slide"
          aria-label="Go to next slide"
          onFocus={focusEvt}
        >
          <SvgTypes name="arrow-left" />
        </button>
      </OEPAnalytics>
    </Fragment>
  );
};

export default BannerArrows;
