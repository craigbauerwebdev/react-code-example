import * as actionTypes from "../actions/actionTypes";

import {
  deleteMeetingUpdate,
  patchMeetingUpdate,
} from "../utils/patchMeetingUpdate";

import { filterDuplicateGuestProfiles } from "../utils/filterDuplicateGuestProfiles";
import formatMeetings from "store/reducers/utils/formatMeetings";
import lodash from "lodash";
import markAsRead from "../utils/markAsRead";
import notificationUUID from "../utils/notificationUUID";
import notificationsDataCheck from "../utils/notificationsDataCheck";
import setNotificationNotNew from "../utils/setNotificationNotNew";
import updateMeetings from "../utils/updateMeetings";

const initialProfileState = {
  favorites: { default: true },
  show: false,
  showList: false,
  selectedAttendee: {},
  directChatId: {},
  isMinimized: false,
  schedule: { default: true },
  meetings: [],
  accountProfile: {},
  otherAttendeeProfile: {},
  notifications: null,
  recentChannels: null,
  guestProfiles: [],
  updateInProgress: false,
  blockedUsers: [],
  blockedByUsers: [],
  mutedUsers: [],
  declinedMeetings: null,
  isEditing: false,
  algoliaSearchIndex: {
    attendeeData: null,
  },
};

const updateObject = (data, currentItemState) => {
  const copyData = lodash.cloneDeep(currentItemState);
  copyData.default = false;
  return { ...copyData, ...data };
};

const addNotification = (state, action) => {
  // if notifications are allowed/enabled this property would be true
  if (state.accountProfile?.notifications) {
    return {
      ...state,
      notifications: notificationUUID(
        notificationsDataCheck(state, action.payload)
      ),
      schedule: { ...updateMeetings(state, action.payload) },
    };
  }

  return { ...state };
};

const profileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: updateObject(action.payload, state.favorites),
      };
    case actionTypes.SET_SCHEDULE:
      return {
        ...state,
        schedule: updateObject(action.payload, state.schedule),
      };
    case actionTypes.EMPTY_PROFILE:
      return {
        ...state,
        favorites: { default: true },
        schedule: { default: true },
        accountProfile: {},
        notifications: null,
        updateInProgress: false,
        meetings: [],
        guestProfiles: [],
        declinedMeetings: null,
      };
    case actionTypes.UPDATE_BEGIN:
      return {
        ...state,
        updateInProgress: true,
      };
    case actionTypes.UPDATE_END:
      return {
        ...state,
        updateInProgress: false,
        error: action.payload.error ? action.payload.error.response.data : null,
      };
    case actionTypes.SET_ACCOUNT_PROFILE:
      return {
        ...state,
        accountProfile: action.payload,
        // Set this here since it is needed when profile is loaded
        blockedUsers: action.payload?.blockedUsers,
        mutedUsers: action.payload?.mutedUsers,
        updateInProgress: false,
      };
    case actionTypes.SET_OTHER_ATTENDEE_PROFILE:
      return {
        ...state,
        otherAttendeeProfile: action.payload,
      };
    case actionTypes.SET_SHOW:
      return {
        ...state,
        show: action.payload,
      };
    case actionTypes.SET_ALGOLIA_SEARCH_INDEX:
      return {
        ...state,
        algoliaSearchIndex: {
          attendeeData: action.payload,
        },
      };
    case actionTypes.SET_SELECTED_ATTENDEE:
      return {
        ...state,
        selectedAttendee: action.payload,
      };
    case actionTypes.SET_IS_MINIMIZED:
      return {
        ...state,
        isMinimized: action.payload,
      };
    case actionTypes.SET_DIRECT_CHAT_ID:
      return {
        ...state,
        directChatId: action.payload,
      };
    case actionTypes.SET_BLOCKED_USERS:
      return {
        ...state,
        blockedUsers: action.payload,
      };
    case actionTypes.SET_BLOCKED_BY_USERS:
      return {
        ...state,
        blockedByUsers: action.payload,
      };
    case actionTypes.SET_MUTED_USERS:
      return {
        ...state,
        mutedUsers: action.payload,
      };
    case actionTypes.SET_RECENT_CHANNELS:
      return {
        ...state,
        recentChannels: action.payload,
      };
    case actionTypes.SET_OPEN_CHAT:
      return {
        ...state,
        selectedAttendee: action.payload.selectedAttendee,
        isMinimized: action.payload.isMinimized,
        show: action.payload.show,
      };
    case actionTypes.SET_SHOW_LIST:
      return {
        ...state,
        showList: action.payload,
      };
    case actionTypes.SET_GUEST_PROFILES:
      return {
        ...state,
        guestProfiles: filterDuplicateGuestProfiles(
          state.guestProfiles,
          action.payload
        ),
      };
    case actionTypes.SET_ACCOUNT_NOTIFICATIONS:
      return {
        ...state,
        notifications: notificationUUID(action.payload),
      };
    case actionTypes.ADD_NETWORKING_NOTIFICATION:
      return addNotification(state, action);
    case actionTypes.SET_NOTIFICATION_NOT_NEW: {
      return {
        ...state,
        notifications: notificationUUID(
          setNotificationNotNew(state, action.payload)
        ),
      };
    }
    case actionTypes.SET_NOTIFICATION_READ: {
      return markAsRead(state, action.payload);
    }
    case actionTypes.SET_MEETINGS:
      return {
        ...state,
        meetings: [...formatMeetings(action.payload)],
      };
    case actionTypes.PATCH_MEETING_UPDATE: {
      return {
        ...state,
        isEditing: action.payload.isEditing || state.isEditing,
        ...patchMeetingUpdate(
          state,
          formatMeetings([action.payload.meetingData])[0],
          action.payload.status
        ),
      };
    }
    case actionTypes.DELETE_MEETING_UPDATE:
      return {
        ...state,
        ...deleteMeetingUpdate(state, action.payload),
      };
    case actionTypes.ADD_DECLINED_MEETING:
      return {
        ...state,
        declinedMeetings: state.declinedMeetings
          ? [...state.declinedMeetings, action.payload]
          : [action.payload],
      };
    case actionTypes.REMOVE_DECLINED_MEETING:
      return {
        ...state,
        declinedMeetings: state.declinedMeetings
          ? state.declinedMeetings.filter((m) => m !== action.payload)
          : state.declinedMeetings,
      };
    case actionTypes.UPDATE_EDITING:
      return {
        ...state,
        isEditing: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
