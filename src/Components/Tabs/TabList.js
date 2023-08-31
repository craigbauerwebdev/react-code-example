import React, { Fragment, cloneElement, useEffect, useState } from "react";

import tabListStyle from "./scss/tab-list.module.scss";
import { withRouter } from "react-router-dom";

const TabList = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [propsChildren, setPropsChildren] = useState([]);
  const displayTabs = propsChildren.length > 1;
  const tabClassList = displayTabs ? "" : tabListStyle.hideTabs;
  const tabClassContent = displayTabs ? "" : tabListStyle.tabContentNoTab;
  const isWherebyStyle = props.whereBy ? tabListStyle.tabResponsive : "";

  useEffect(() => {
    const children = props.children.filter((child) => child && child !== "");
    setPropsChildren(children);
  }, [props.children]);

  useEffect(() => {
    // Run on page change
    if (!props.ik) {
      setActiveTabIndex(0);
    }
    if (props.ik && props.ismention) {
      setActiveTabIndex(1);
    }

    return () => {
      setActiveTabIndex(0);
      setPropsChildren([]);
    };
  }, [props.match, props.ik, props.ismention]);

  const renderContent = () => {
    if (propsChildren[activeTabIndex]) {
      return propsChildren[activeTabIndex].props.children;
    }
  };

  const handleTabToggle = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  const renderTabs = () => {
    if (!propsChildren) {
      return <div />;
    }

    return Array.isArray(propsChildren) ? (
      propsChildren.map((child, index) => {
        return (
          <Fragment key={index}>
            {cloneElement(child, {
              onClick: handleTabToggle,
              tabIndex: index,
              isActive: index === activeTabIndex,
            })}
          </Fragment>
        );
      })
    ) : (
      <Fragment key="0">
        {cloneElement(propsChildren, {
          onClick: handleTabToggle,
          tabIndex: 0,
          isActive: activeTabIndex === 0,
        })}
      </Fragment>
    );
  };

  if (propsChildren.length <= 0) {
    return null;
  }
  //
  return (
    <div className={isWherebyStyle}>
      <ul className={`${tabListStyle.tabList} ${tabClassList}`} role="tablist">
        {renderTabs()}
      </ul>
      <div
        className={`${tabListStyle.tabContent} ${tabClassContent}`}
        role="tabpanel"
        id={`tab-section-${activeTabIndex}`}
        aria-labelledby={`tab-${activeTabIndex}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default withRouter(TabList);
