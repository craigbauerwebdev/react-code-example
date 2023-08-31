import React, { useEffect, useReducer } from "react";
import { actionTypesHeader, navTabsReducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./Header";
import { HeaderDropdownContextProvider } from "Components/Context/HeaderDropdownContext";
import MobileHeader from "./MobileHeader";
import OEPAnalytics from "Components/OEPAnalytics";
import { bpMap } from "util/bpMap";
import { dataTypes } from "store/utils/dataTypes";
import { getPayload } from "store/actions";
import headerStyles from "./scss/header-wrapper.module.scss";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

/**
 * This component is pulling data from Liferay by default.
 * If this is not the desired outcome you can replace it with static data.
 */
const HeaderWrapper = () => {
  const dispatch = useDispatch();
  /** @type {User} */
  const user = useSelector((state) => state.global.user);
  const topNav = useSelector((state) => state.global.topNav);
  const preEvent = useSelector((state) => state.global.isPreventOn);
  const [navState, navDispatch] = useReducer(navTabsReducer, {
    tabs: {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false,
    },
    navData: null,
    logo: null,
  });
  const mobileHeader = useToggleDisplayMQ(
    preEvent ? bpMap.tabletSmall : bpMap.desktop
  );
  const adrumData = {
    username: "",
  };
  // Header is triggered by hover
  // Mobile is triggered by click

  // To change Header to be triggered by click, remove
  // `.header-label:hover + .inactive-dropdown` and uncomment out class logic on the inactive-dropdown element

  const updateOpenMenu = (menu) => {
    navDispatch({
      type: actionTypesHeader.NAV_TABS_OPEN,
      payload: menu,
    });
  };

  const updateCloseMenu = (menu) => {
    navDispatch({
      type: actionTypesHeader.NAV_TABS_CLOSE,
      payload: menu,
    });
  };

  /**
   * This is getting liferay data.
   * To use statice data replace what is inside this useEffect with this.
   * navDispatch({
        type: actionTypesHeader.NAV_DATA,
        payload: {
          nav: preEvent ? topNav.preEvent : topNav.mainNav,
          logo: topNav.logo,
        },
      });
   */
  useEffect(() => {
    if (!topNav) {
      dispatch(getPayload(dataTypes.topNav));
    } else {
      navDispatch({
        type: actionTypesHeader.NAV_DATA,
        payload: {
          nav: preEvent ? topNav.preEvent : topNav.mainNav,
          logo: topNav.logo,
        },
      });
    }
  }, [dispatch, topNav, preEvent]);

  if (user && user.contact) {
    adrumData.username = user.contact.email;
    window.setAdrumData && window.setAdrumData(adrumData);
  }

  if (!navState.navData) {
    return null;
  }

  return (
    <HeaderDropdownContextProvider
      updateOpenMenu={updateOpenMenu}
      updateCloseMenu={updateCloseMenu}
      activeDropdownState={navState.tabs}
    >
      <div
        className={`${headerStyles.header} ${
          preEvent ? headerStyles.preEvent : ""
        }`}
        role="banner"
      >
        <OEPAnalytics
          componentType="Button"
          page="Header"
          url="#content"
          componentName="Skip to main content"
        >
          <a href="#content" className="sr-focusable">
            Skip to main content
          </a>
        </OEPAnalytics>
        {!mobileHeader && (
          <Header logo={navState.logo} nav={navState.navData} />
        )}
        {mobileHeader && (
          <MobileHeader logo={navState.logo} nav={navState.navData} />
        )}
      </div>
    </HeaderDropdownContextProvider>
  );
};

export default HeaderWrapper;
