import * as actionTypes from "../actions/actionTypes";

import calculatePermissions, {
  defaultPermissions,
} from "util/permissions/calculatePermissions";
import {
  deleteWebinarUpdate,
  patchWebinarUpdate,
} from "./utils/patchWebinarUpdate";

import ConfigService from "services/ConfigService";
import formatExhibitors from "./utils/formatExhibitors";
import formatFaqs from "./utils/formatFaqs";
import formatFooter from "./utils/formatFooter";
import formatHeros from "./utils/formatHeros";
import formatHorizontalBanners from "./utils/formatHorizontalBanners";
import formatLeaderBoard from "./utils/formatLeaderBoard";
import formatLogin from "./utils/formatLogin";
import formatMeetings from "./utils/formatMeetings";
import formatNav from "./utils/formatNav";
import formatNotifications from "./utils/formatNotifications";
import formatSessions from "./utils/formatSessions";
import formatSiteConfig from "./utils/formatSiteConfig";
import formatSurveys from "./utils/formatSurveys";
import formatTimezone from "./utils/formatTimezone";
import formatTitles from "./utils/formatTitles";
import formatTowerBanners from "./utils/formatTowerBanners";
import getBusinessId from "./utils/getBusinessId";

const initialState = {
  user: null,
  auth: {
    inProgress: true,
    isStarted: true,
    isError: false,
    message: null,
    errorType: null,
  },
  sessions: null,
  speakers: null,
  posters: null,
  showcaseSessions: null,
  exhibitors: null,
  virtualBooths: null,
  faqs: null,
  feedLoaded: false, // Track if feed has loaded to avoid it be blank on returning back top page.
  hideLiveStreamAlertMessages: false,
  hero: null,
  horizontalBanner: null,
  towerBanner: null,
  notifications: null,
  topNav: null,
  footer: null,
  homeTiles: null,
  timezone: ConfigService.runValues.momentTimezone,
  tzList: null,
  modalActive: false,
  sessionSpeakerMerged: false,
  droppedBusinessCards: getBusinessId(),
  login: null,
  leaderBoard: null,
  attendeeLeaderBoards: null,
  leaderBoardCMSContent: null,
  isPreventOn: process.env.REACT_APP_ENABLE_PRE_EVENT === "true",
  webinars: null,
  siteConfig: {
    grip: {
      id: process.env.REACT_APP_FUZION_EVENT_ID,
      url: `https://matchmaking.grip.events/${ConfigService.runValues.gripEventName}`,
    },
  },
  networkingNotifications: null,
  networkSettings: null,
  profileConfigurations: null,
  nowPlayingDrawerIsOpen: null,
  permissions: defaultPermissions,
  surveys: null,
};

const removeExtracted = (payload) => {
  // This key has nothing to do with the UI not need downstream
  delete payload.extracted;

  return payload;
};

const baseEmptyBlockData = {
  sessions: null,
  speakers: null,
  posters: null,
  showcaseSessions: null,
  exhibitors: null,
  virtualBooths: null,
};

/**
 *
 * @param {State} state
 * @param {Action} action
 *
 * @returns {State}
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        ...baseEmptyBlockData,
      };
    case actionTypes.SET_NOW_PLAYING_DRAWER_IS_OPEN:
      return {
        ...state,
        nowPlayingDrawerIsOpen: action.payload,
      };
    case actionTypes.SET_SESSIONS:
      return formatSessions(state, action.payload);
    case actionTypes.SET_SPEAKERS:
      return {
        ...state,
        speakers: action.payload,
      };
    case actionTypes.SET_POSTERS:
      return {
        ...state,
        posters: action.payload,
      };
    case actionTypes.SET_SHOWCASES:
      return {
        ...state,
        showcaseSessions: action.payload,
      };
    case actionTypes.SET_EXHIBITOR:
      return formatExhibitors(state, action.payload);
    case actionTypes.SET_VIRTUAL_BOOTHS:
      return {
        ...state,
        virtualBooths: action.payload,
      };
    case actionTypes.LOAD_FEED:
      return {
        ...state,
        feedLoaded: true,
      };
    case actionTypes.HIDE_LIVE_STREAM_ALERT:
      return {
        ...state,
        hideLiveStreamAlertMessages: action.payload,
      };
    case actionTypes.SET_FAQS:
      return {
        ...state,
        faqs: formatFaqs(removeExtracted(action.payload)),
      };
    case actionTypes.SET_HERO:
      return {
        ...state,
        hero: formatHeros(removeExtracted(action.payload)),
      };
    case actionTypes.SET_HORIZONTAL_BANNER:
      return {
        ...state,
        horizontalBanner: formatHorizontalBanners(
          removeExtracted(action.payload)
        ),
      };
    case actionTypes.SET_TOWER_BANNER:
      return {
        ...state,
        towerBanner: formatTowerBanners(removeExtracted(action.payload)),
      };
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: formatNotifications(removeExtracted(action.payload)),
      };
    case actionTypes.SET_TOP_NAV:
      return {
        ...state,
        topNav: formatNav(removeExtracted(action.payload)),
      };
    case actionTypes.SET_TIME_ZONE:
      return {
        ...state,
        timezone: action.payload,
      };
    case actionTypes.SET_TIME_ZONE_LIST:
      return formatTimezone(state);
    case actionTypes.SET_FOOTER:
      return formatFooter(state, removeExtracted(action.payload));
    case actionTypes.SET_HOME_TILES:
      return {
        ...state,
        homeTiles: formatTitles(removeExtracted(action.payload)),
      };
    case actionTypes.SET_SITE_CONFIG:
      return {
        ...state,
        siteConfig: formatSiteConfig(removeExtracted(action.payload)),
      };
    case actionTypes.SET_MODAL:
      return {
        ...state,
        modalActive: action.payload,
      };
    case actionTypes.UPDATE_BUSINESS_CARDS_LIST:
      return {
        ...state,
        droppedBusinessCards: [...state.droppedBusinessCards, action.payload],
      };
    case actionTypes.SET_LOGIN_FORM:
      return {
        ...state,
        login: formatLogin(removeExtracted(action.payload)),
      };
    case actionTypes.SET_LEADER_BOARD:
      return {
        ...state,
        leaderBoard: action.payload || {},
      };
    case actionTypes.SET_ATTENDEE_LEADER_BOARDS:
      return {
        ...state,
        attendeeLeaderBoards: action.payload,
      };
    case actionTypes.SET_LIFE_RAY_LEADER_BOARD:
      return {
        ...state,
        leaderBoardCMSContent: formatLeaderBoard(
          removeExtracted(action.payload)
        ),
      };
    case actionTypes.EMPTY_GLOBAL_DATA:
      return {
        ...state,
        user: null,
        ...baseEmptyBlockData,
      };
    case actionTypes.SET_WEBINARS:
      return {
        ...state,
        webinars: formatMeetings(action.payload),
      };
    case actionTypes.PATCH_WEBINAR_UPDATE:
      return {
        ...state,
        ...patchWebinarUpdate(state, action.payload),
      };
    case actionTypes.DELETE_WEBINAR_UPDATE:
      return {
        ...state,
        ...deleteWebinarUpdate(state, action.payload),
      };
    case actionTypes.SET_NETWORK_SETTINGS:
      return {
        ...state,
        networkSettings: action.payload,
      };
    case actionTypes.SET_PROFILE_CONFIGURATIONS:
      return {
        ...state,
        profileConfigurations: action.payload,
      };
    case actionTypes.SET_AUTH_PROGRESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: action.payload,
        },
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
        },
      };

    case actionTypes.RESET_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...initialState.auth,
        },
      };
    case actionTypes.SET_PERMISSIONS:
      return {
        ...state,
        permissions: calculatePermissions(action.payload),
      };
    case actionTypes.SET_SURVEYS:
      return formatSurveys(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
