import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import React from "react";
import getAnalyticsPage from "util/getAnalyticsPage";
import tabListItemStyle from "./scss/tab-list-item.module.scss";
import { useLocation } from "react-router-dom";
export default function TabListItem(props) {
  const { isActive, onClick, tabIndex, tabName } = props;
  const location = useLocation();

  return (
    <li
      className={`${tabListItemStyle.tabListItem} ${
        isActive && tabListItemStyle.tabListActive
      }`}
      role="tab"
      id={`tab-${tabIndex}`}
    >
      <OEPAnalytics
        componentType="Button"
        page={getAnalyticsPage(location.pathname)}
        url={`${isActive ? "Open" : "Close"} ${tabName}`}
        componentName={tabName}
      >
        <button onClick={onClick.bind(this, tabIndex)}>{tabName}</button>
      </OEPAnalytics>
    </li>
  );
}

TabListItem.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  tabName: PropTypes.string,
};
