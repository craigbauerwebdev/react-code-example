import React, { useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import SvgTypes from "Components/SVG/SvgTypes";
import clearStyles from "./scss/clear-search.module.scss";

/**
 * Clear current user Search
 * https://github.com/Klowd/onlineeventpro-product-ui/wiki/Clear-Search
 *
 * @param {object} props
 * @param {Function} props.clearSearch
 *
 * @returns {JSX.Element}
 */

const ClearSearch = ({ clearSearch, page }) => {
  const [active, setActive] = useState(false);
  const enter = () => {
    setActive(true);
  };
  const leave = () => {
    setActive(false);
  };
  return (
    <OEPAnalytics
      componentType="Button"
      page={page}
      url="Clear Search"
      componentName="Clear Search"
    >
      <button
        onClick={clearSearch}
        onMouseEnter={enter}
        onFocus={enter}
        onMouseLeave={leave}
        onBlur={leave}
        className={`${clearStyles.clear} ${active && clearStyles.active}`}
        aria-label="Clear Search"
        type="button"
      >
        <div
          className={`${clearStyles.contentHolder} ${
            active && clearStyles.active
          }`}
        >
          <span className={clearStyles.copy}>Clear</span>{" "}
          <span
            className={`${clearStyles.svgHolder} ${
              active && clearStyles.active
            }`}
          >
            <SvgTypes name={"close-modal"} />
          </span>
        </div>
      </button>
    </OEPAnalytics>
  );
};

export default ClearSearch;
