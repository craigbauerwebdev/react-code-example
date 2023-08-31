import * as actionTypes from "./actionTypes";

import ConfigService from "services/ConfigService";
import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";
import { retrievedPayloads } from "store/utils/retrievedPayloads";

const setSessions = (payload) => ({
  type: actionTypes.SET_SESSIONS,
  payload,
});

const setSpeaker = (payload) => ({
  type: actionTypes.SET_SPEAKERS,
  payload,
});

const setPosters = (payload) => ({
  type: actionTypes.SET_POSTERS,
  payload,
});

const setShowcases = (payload) => ({
  type: actionTypes.SET_SHOWCASES,
  payload,
});

const setExhibitors = (payload) => ({
  type: actionTypes.SET_EXHIBITOR,
  payload,
});

const setVirtualBooths = (payload) => ({
  type: actionTypes.SET_VIRTUAL_BOOTHS,
  payload,
});

const setFaqs = (payload) => ({
  type: actionTypes.SET_FAQS,
  payload,
});

const setHero = (payload) => ({
  type: actionTypes.SET_HERO,
  payload,
});

const setHorizontalBanner = (payload) => ({
  type: actionTypes.SET_HORIZONTAL_BANNER,
  payload,
});

const setTowerBanner = (payload) => ({
  type: actionTypes.SET_TOWER_BANNER,
  payload,
});

const setNotifications = (payload) => ({
  type: actionTypes.SET_NOTIFICATIONS,
  payload,
});

const setTopNav = (payload) => ({
  type: actionTypes.SET_TOP_NAV,
  payload,
});

const setFooter = (payload) => ({
  type: actionTypes.SET_FOOTER,
  payload,
});

const setHomeTiles = (payload) => ({
  type: actionTypes.SET_HOME_TILES,
  payload,
});

const setSiteConfig = (payload) => ({
  type: actionTypes.SET_SITE_CONFIG,
  payload,
});

const setLoginForm = (payload) => ({
  type: actionTypes.SET_LOGIN_FORM,
  payload,
});

const setLeaderBoard = (payload) => ({
  type: actionTypes.SET_LEADER_BOARD,
  payload,
});

const setAttendeeLeaderBoards = (payload) => ({
  type: actionTypes.SET_ATTENDEE_LEADER_BOARDS,
  payload,
});

const setLeaderBoardCMS = (payload) => ({
  type: actionTypes.SET_LIFE_RAY_LEADER_BOARD,
  payload,
});

const clearEndpoints = () => {
  const removePayloads = [
    dataTypes.sessions,
    dataTypes.speakers,
    dataTypes.posters,
    dataTypes.showcaseSessions,
    dataTypes.exhibitors,
    dataTypes.virtualBooths,
  ];

  removePayloads.forEach((endpoint) => {
    if (retrievedPayloads.has(endpoint)) {
      retrievedPayloads.delete(endpoint);
    }
  });
};

export const setUser = (payload) => {
  clearEndpoints();

  return {
    type: actionTypes.SET_USER,
    payload,
  };
};

export const hideLiveStreamAlerts = (payload) => ({
  type: actionTypes.HIDE_LIVE_STREAM_ALERT,
  payload,
});

const setWebinars = (payload) => ({
  type: actionTypes.SET_WEBINARS,
  payload: payload.data,
});

export const setSingleWebinar = (payload) => ({
  type: actionTypes.PATCH_WEBINAR_UPDATE,
  payload,
});

export const deleteSingleWebinar = (payload) => ({
  type: actionTypes.DELETE_WEBINAR_UPDATE,
  payload,
});

export const emptyGlobalStore = () => {
  clearEndpoints();

  return {
    type: actionTypes.EMPTY_GLOBAL_DATA,
  };
};

export const setNetworkSettings = (payload) => ({
  type: actionTypes.SET_NETWORK_SETTINGS,
  payload,
});

export const setProfileConfigurations = (payload) => ({
  type: actionTypes.SET_PROFILE_CONFIGURATIONS,
  payload,
});

export const setPermissions = (payload) => ({
  type: actionTypes.SET_PERMISSIONS,
  payload,
});

export const setSurveys = (payload) => ({
  type: actionTypes.SET_SURVEYS,
  payload,
});

// Get data from endpoint
export const getPayload = (baseEndpoint, dynamicPath, bypass = false) => (
  dispatch
) => {
  const endpoint = dynamicPath
    ? `${baseEndpoint}/${dynamicPath}`
    : baseEndpoint;

  if (
    baseEndpoint === dataTypes.posters &&
    !ConfigService.runValues.hasPosters
  ) {
    return dispatch(setPosters([]));
  }
  if (
    baseEndpoint === dataTypes.exhibitors &&
    !ConfigService.runValues.hasExhibitors
  ) {
    return dispatch(setExhibitors([]));
  }

  // Check to see if request was already sent
  if (!retrievedPayloads.has(baseEndpoint)) {
    // If bypass is true don't save to hasRun array.
    if (!bypass) {
      retrievedPayloads.set(baseEndpoint, true);
    }
    axios
      .get(`${process.env.REACT_APP_API_HOST}/${endpoint}`)
      .then((response) => response.data)
      .then((data) => {
        switch (baseEndpoint) {
          case dataTypes.sessions:
            dispatch(setSessions(data));
            break;
          case dataTypes.speakers:
            dispatch(setSpeaker(data));
            break;
          case dataTypes.posters:
            dispatch(setPosters(data));
            break;
          case dataTypes.showcaseSessions:
            dispatch(setShowcases(data));
            break;
          case dataTypes.exhibitors:
            dispatch(setExhibitors(data));
            break;
          case dataTypes.virtualBooths:
            dispatch(setVirtualBooths(data));
            break;
          case dataTypes.faqs:
            dispatch(setFaqs(data));
            break;
          case dataTypes.hero:
            dispatch(setHero(data));
            break;
          case dataTypes.horizontalBanner:
            dispatch(setHorizontalBanner(data));
            break;
          case dataTypes.towerBanner:
            dispatch(setTowerBanner(data));
            break;
          case dataTypes.notifications:
            dispatch(setNotifications(data));
            break;
          case dataTypes.topNav:
            dispatch(setTopNav(data));
            break;
          case dataTypes.footerData:
            dispatch(setFooter(data));
            break;
          case dataTypes.homepageTiles:
            dispatch(setHomeTiles(data));
            break;
          case dataTypes.siteConfig:
            dispatch(setSiteConfig(data));
            break;
          case dataTypes.loginForm:
            dispatch(setLoginForm(data));
            break;
          case dataTypes.leaderBoard:
            dispatch(setLeaderBoard(data));
            break;
          case dataTypes.attendeeLeaderBoards:
            dispatch(setAttendeeLeaderBoards(data));
            break;
          case dataTypes.cmsLeaderBoard:
            dispatch(setLeaderBoardCMS(data));
            break;
          case dataTypes.webinars:
            dispatch(setWebinars(data));
            break;
          case dataTypes.networkSettings:
            dispatch(setNetworkSettings(data.data));
            break;
          case dataTypes.profileConfigurations:
            dispatch(setProfileConfigurations(data.data));
            break;
          case dataTypes.surveys:
            dispatch(setSurveys(data));
            break;
          default:
            break;
        }
      })
      .catch(() => {
        //TODO add handling for other error conditions as needed
        switch (baseEndpoint) {
          case dataTypes.showcaseSessions:
            //If server error set showcases to empty array to prevent UI loader loop
            dispatch(setShowcases([]));
            break;
          default:
            break;
        }
      });
  }
};

export const loadFeed = () => ({
  type: actionTypes.LOAD_FEED,
});

export const setTimeZone = (payload) => ({
  type: actionTypes.SET_TIME_ZONE,
  payload,
});

export const setTimeZoneList = () => ({
  type: actionTypes.SET_TIME_ZONE_LIST,
});

export const setModalFlag = (payload) => ({
  type: actionTypes.SET_MODAL,
  payload,
});

export const updateBusinessCardsList = (payload) => ({
  type: actionTypes.UPDATE_BUSINESS_CARDS_LIST,
  payload,
});

export const updateAuthProgress = (payload) => ({
  type: actionTypes.SET_AUTH_PROGRESS,
  payload,
});

export const updateAuth = (payload) => ({
  type: actionTypes.SET_AUTH,
  payload,
});

export const resetAuth = () => ({
  type: actionTypes.RESET_AUTH,
});

export const setNowPlayingDrawerIsOpen = (payload) => ({
  type: actionTypes.SET_NOW_PLAYING_DRAWER_IS_OPEN,
  payload,
});
