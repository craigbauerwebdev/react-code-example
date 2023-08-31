import React, { useContext, useEffect, useRef, useState } from "react";

import { bpMap } from "util/bpMap";
import routes from "routes";
import { useLocation } from "react-router-dom";
import { useMeetingManager } from "../lib/chimeComponents";
import useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

const NavigationContext = React.createContext(null);

const sidebarContent = {
  roster: "ROSTER",
  chat: "CHAT",
};

const NavigationProvider = ({ children }) => {
  const isTablet = useToggleDisplayMQ(bpMap.tablet);
  const [showNavbar, setShowNavbar] = useState(!isTablet);
  const [showSidebar, setShowSidebar] = useState(
    !isTablet && sidebarContent.roster
  );
  const [showMetrics, setShowMetrics] = useState(false);
  const [refreshChat, setRefreshChat] = useState(false);
  const isTabletRef = useRef(isTablet);
  const location = useLocation();
  const meetingManager = useMeetingManager();

  const toggleRoster = () => {
    if (showSidebar === sidebarContent.roster) {
      setShowSidebar(sidebarContent.chat);
    } else {
      setShowSidebar(sidebarContent.roster);
    }
  };
  const toggleChat = () => {
    if (showSidebar === sidebarContent.chat) {
      setShowSidebar(sidebarContent.roster);
    } else {
      setShowSidebar(sidebarContent.chat);
    }
  };
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const toggleMetrics = () => {
    setShowMetrics((currentState) => !currentState);
  };
  const openNavbar = () => {
    setShowNavbar(true);
  };
  const closeNavbar = () => {
    setShowNavbar(false);
  };
  const openRoster = () => {
    setShowSidebar(sidebarContent.roster);
  };
  const closeRoster = () => {
    setShowSidebar(null);
  };
  const openChat = () => {
    setShowSidebar(sidebarContent.chat);
  };
  const closeChat = () => {
    setShowSidebar(null);
  };
  const providerValue = {
    showNavbar,
    showRoster: showSidebar === sidebarContent.roster,
    showChat: showSidebar === sidebarContent.chat,
    showMetrics,
    toggleRoster,
    toggleChat,
    toggleNavbar,
    toggleMetrics,
    openRoster,
    closeRoster,
    openChat,
    closeChat,
    openNavbar,
    closeNavbar,
    refreshChat,
    setRefreshChat,
  };

  useEffect(() => {
    if (location.pathname.includes(routes.MEETING)) {
      return () => {
        meetingManager.leave();
      };
    }
  }, [location.pathname, meetingManager]);

  useEffect(() => {
    if (refreshChat) {
      setRefreshChat(false);
    }
  }, [refreshChat, setRefreshChat]);

  useEffect(() => {
    const isResizeTablet = isTablet;

    if (isTabletRef.current === isResizeTablet) {
      return; // Fast end of function
    }

    isTabletRef.current = isResizeTablet;

    if (isResizeTablet) {
      setShowNavbar(false);
      setShowSidebar(null);
    } else {
      setShowNavbar(true);
      setShowSidebar(sidebarContent.roster);
    }
  }, [isTablet]);

  return React.createElement(
    NavigationContext.Provider,
    { value: providerValue },
    children
  );
};

const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw Error("Use useNavigation in NavigationProvider");
  }
  return context;
};

export { NavigationProvider, useNavigation };
