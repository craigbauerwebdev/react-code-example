import React, { createContext, useCallback, useContext } from "react";

import PropTypes from "prop-types";

const HeaderDropdownContext = createContext();

export function useHeaderDropdownContext(tabName) {
  const { updateOpenMenu, updateCloseMenu, activeDropdownState } = useContext(
    HeaderDropdownContext
  );

  const handleOutsideClick = useCallback(
    (event) => {
      const hasClass = event.relatedTarget
        ? event.relatedTarget.classList
        : false;

      if (!event.currentTarget.contains(event.relatedTarget) && hasClass) {
        const isTimeContainer = event.relatedTarget.closest(".k-group");

        /**
         * TODO: It might be time to rethink how the nav works with some of the new elements.
         * This is a hack for this issue https://freemandigital.atlassian.net/browse/PJX-1154.
         * For some reason when click on the icons in the modal window its not coming back as a part of the parent element.
         * This checks for the class of those elements and stops the item from closing.
         */
        if (
          !event.relatedTarget.classList.contains("k-time-list") &&
          !event.relatedTarget.classList.contains("k-calendar") &&
          !isTimeContainer
        ) {
          updateCloseMenu(tabName);
        }
      } else if (!event.currentTarget.contains(event.relatedTarget)) {
        updateCloseMenu(tabName);
      }
    },
    [updateCloseMenu, tabName]
  );

  const onClick = useCallback(() => {
    updateOpenMenu(tabName);
  }, [updateOpenMenu, tabName]);

  const onKeyPress = useCallback(
    ({ key }) => {
      if (key === "Enter") {
        updateOpenMenu(tabName);
      }
    },
    [updateOpenMenu, tabName]
  );

  const onKeyDown = useCallback(
    ({ key }) => {
      if (key === "Escape") {
        updateCloseMenu(tabName);
      }
    },
    [updateCloseMenu, tabName]
  );

  const onClose = useCallback(() => {
    updateCloseMenu(tabName);
  }, [updateCloseMenu, tabName]);

  return {
    onClose,
    onClick,
    onKeyPress,
    onKeyDown,
    onBlur: handleOutsideClick,
    isActive: activeDropdownState[tabName],
  };
}

export function HeaderDropdownContextProvider({ children, ...props }) {
  return (
    <HeaderDropdownContext.Provider value={props}>
      {children}
    </HeaderDropdownContext.Provider>
  );
}

HeaderDropdownContextProvider.propTypes = {
  updateOpenMenu: PropTypes.func.isRequired,
  updateCloseMenu: PropTypes.func.isRequired,
  activeDropdownState: PropTypes.objectOf(PropTypes.bool).isRequired,
  children: PropTypes.any,
};
