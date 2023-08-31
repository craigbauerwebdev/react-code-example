import React, { useEffect, useState } from "react";

import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import getAnalyticsPage from "util/getAnalyticsPage";
import headerStyles from "./scss/desktop.module.scss";
import { useHeaderDropdownContext } from "Components/Context/HeaderDropdownContext";
import { useLocation } from "react-router-dom";

export const HEADER_DROPDOWN_TYPES = {
  notifications: "dropdownNotification",
};

export default function HeaderDropdown({
  tabName,
  title,
  titleNode,
  children,
  hideCaret,
  headerDropdownType,
}) {
  const location = useLocation();
  const [pathname, setPathname] = useState("");
  useEffect(() => setPathname(location.pathname), [location.pathname]);
  const {
    onClick,
    onBlur,
    onKeyPress,
    onKeyDown,
    isActive,
  } = useHeaderDropdownContext(tabName);

  return (
    <OEPAnalytics
      page={getAnalyticsPage(pathname)}
      componentType="navigation item"
      url={`/${title}`}
      componentName={`${title}`}
    >
      <div
        onBlur={onBlur}
        className={`${headerStyles.headerLabel} ${headerStyles.headerLabelButton}`}
        onClick={onClick}
        role="button"
        title={`Toggle menu options for ${title}`}
        aria-label={`Toggle menu options for ${title}`}
        aria-haspopup="true"
        aria-controls={`menu-${tabName}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
      >
        <div
          id={`menu-button-${tabName}`}
          className={`${
            hideCaret
              ? headerStyles.dropDownNoCaret
              : headerStyles.dropDownTitle
          } ${headerStyles.tabItem}`}
        >
          {titleNode || title}
        </div>
        <DropdownContent
          isActive={isActive}
          tabName={tabName}
          dropdownType={headerDropdownType}
        >
          {children}
        </DropdownContent>
      </div>
    </OEPAnalytics>
  );
}

function DropdownContent({ children, tabName, isActive, dropdownType }) {
  const className = isActive
    ? headerStyles.activeDropdown
    : headerStyles.inactiveDropdown;
  const dropdownTypeClassName = dropdownType && headerStyles[dropdownType];
  return (
    <div className={`${className} ${dropdownTypeClassName}`}>
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <div className={headerStyles.dropdownLink} key={`${tabName}-${i}`}>
            {child}
          </div>
        ))
      ) : (
        <div className={headerStyles.dropdownLink}>{children}</div>
      )}
    </div>
  );
}

HeaderDropdown.propTypes = {
  tabName: PropTypes.oneOf(["tab1", "tab2", "tab3", "tab4", "tab5", "tab6"])
    .isRequired,
  title: PropTypes.string.isRequired,
  titleNode: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
