import React, { Fragment, useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import getAnalyticsPage from "util/getAnalyticsPage";
import mobileHeaderStyles from "./scss/mobile.module.scss";
import { useHeaderDropdownContext } from "Components/Context/HeaderDropdownContext";
import { useLocation } from "react-router-dom";

export default function MobileHeaderDropdown({ title, tabName, children }) {
  const { isActive, onClick } = useHeaderDropdownContext(tabName);
  const className = isActive
    ? mobileHeaderStyles.activeDropdown
    : mobileHeaderStyles.inactiveDropdown;
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  useEffect(() => setPathname(location.pathname), [location.pathname]);
  return (
    <section className={mobileHeaderStyles.mobileInnerLinksHolder}>
      <div className={mobileHeaderStyles.headerLabel}>
        <OEPAnalytics
          componentType="Button"
          page={getAnalyticsPage(pathname)}
          url={`/${title}`}
          componentName={title}
        >
          <button
            className={`${mobileHeaderStyles.headerLabel} ${mobileHeaderStyles.headerLabelButton}`}
            onClick={onClick}
            title={`Toggle menu options for ${title}`}
            aria-label={`Toggle menu options for ${title}`}
          >
            <span className={mobileHeaderStyles.dropDownTitle}>{title}</span>
          </button>
        </OEPAnalytics>
      </div>
      <div className={className}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <Fragment key={`${tabName}-mobile-${i}`}>{child}</Fragment>
            ))
          : { children }}
      </div>
    </section>
  );
}

MobileHeaderDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  tabName: PropTypes.oneOf(["tab1", "tab2", "tab3", "tab4", "tab5", "tab6"])
    .isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
