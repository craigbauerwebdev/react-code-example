import OEPAnalytics from "Components/OEPAnalytics";
import PropTypes from "prop-types";
import React from "react";
import SvgTypes from "Components/SVG/SvgTypes";
import { actionTypesNowPlayingDrawer } from "./reducer";
import drawerButtonStyles from "./scss/drawer-button.module.scss";
import { setNowPlayingDrawerIsOpen } from "../../store/actions";
import { useDispatch } from "react-redux";

/**
 *
 * @param {object} props
 * @param {Session} props.session
 * @param {NowPlayingState} props.state
 * @param {Function} props.dispatch
 *
 * @returns {JSX.Element}
 */
export default function DrawerButton({ session, state, dispatch }) {
  const openOrClose = state.drawerIsOpen ? "Close" : "Open";
  const dispatchBanner = useDispatch();
  const toggleDrawer = () => {
    dispatch({
      type: actionTypesNowPlayingDrawer.SET_DRAWER,
      payload: !state.drawerIsOpen,
    });
    dispatchBanner(setNowPlayingDrawerIsOpen(!state.drawerIsOpen));
  };
  return (
    <OEPAnalytics
      page="Now Playing"
      componentType="Button"
      url={`${
        state.drawerIsOpen
          ? "Close Now Playing Drawer"
          : "Open Now Playing Drawer"
      }`}
      componentName={`${
        state.drawerIsOpen
          ? "Close Now Playing Drawer"
          : "Open Now Playing Drawer"
      }`}
    >
      <button
        className={`${drawerButtonStyles.drawerToggleButton} ${
          state.drawerIsOpen ? "" : drawerButtonStyles.closed
        }`}
        onClick={toggleDrawer}
        aria-label={`${openOrClose} Now Playing Banner`}
      >
        <SvgTypes name="arrow-filled" />
      </button>
    </OEPAnalytics>
  );
}

DrawerButton.propTypes = {
  session: PropTypes.shape({
    sessionName: PropTypes.string.isRequired,
  }).isRequired,
};
