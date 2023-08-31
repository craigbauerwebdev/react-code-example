import * as actionTypes from "./actionTypes";

import { deleteSingleWebinar, setSingleWebinar } from "store/actions";

import ConfigService from "services/ConfigService";
import Logger from "js-logger";
import { MEETING_TYPES } from "util/meetingTypes";
import axios from "axios";
import { chatOptions } from "../utils/chatTypes";
import { dataTypes } from "store/utils/dataTypes";
import getAlgoliaIndex from "../utils/getAlgoliaIndex";
import getMeetingStatus from "../utils/getMeetingStatus";
import moment from "moment";
import { profileLookupKey } from "../utils/profileLookupKey";
import { retrievedPayloads } from "store/utils/retrievedPayloads";
import { setCurrentMeeting } from "Components/Meeting/store/actions";

const errorCheck = "Error";

const formatMeetingData = (data) => {
  return {
    meetingTitle: data.meetingTitle,
    startTime: moment
      .tz(data.startTime, ConfigService.runValues.momentTimezone)
      .format("YYYY-MM-DDTHH:mm:ss"),
    endTime: moment
      .tz(data.endTime, ConfigService.runValues.momentTimezone)
      .format("YYYY-MM-DDTHH:mm:ss"),
    host: data.host?.fuzionAttendeeId ? data.host?.fuzionAttendeeId : data.host,
    meetingType: data.meetingType,
    description: data.description,
    meetingStatus: data.meetingStatus ? data.meetingStatus : "created",
  };
};

const setFavorites = (payload) => ({
  type: actionTypes.SET_FAVORITES,
  payload,
});

export const setShow = (payload) => ({
  type: actionTypes.SET_SHOW,
  payload,
});

export const setIsMinimized = (payload) => ({
  type: actionTypes.SET_IS_MINIMIZED,
  payload,
});

export const setDirectChatID = (payload) => ({
  type: actionTypes.SET_DIRECT_CHAT_ID,
  payload,
});

const setSchedule = (payload) => ({
  type: actionTypes.SET_SCHEDULE,
  payload,
});

export const setAccountProfile = (payload) => ({
  type: actionTypes.SET_ACCOUNT_PROFILE,
  payload,
});

export const setOtherAttendeeProfile = (payload) => ({
  type: actionTypes.SET_OTHER_ATTENDEE_PROFILE,
  payload,
});

export const setGuestProfiles = (payload) => ({
  type: actionTypes.SET_GUEST_PROFILES,
  payload,
});

const setAccountNotifications = (payload) => ({
  type: actionTypes.SET_ACCOUNT_NOTIFICATIONS,
  payload,
});

export const updateBegin = () => ({
  type: actionTypes.UPDATE_BEGIN,
});

export const setOpenChat = (payload) => ({
  type: actionTypes.SET_OPEN_CHAT,
  payload,
});

export const setShowList = (payload) => ({
  type: actionTypes.SET_SHOW_LIST,
  payload,
});

export const setRecentChannels = (payload) => ({
  type: actionTypes.SET_RECENT_CHANNELS,
  payload,
});

export const setBlockedUsers = (payload) => ({
  type: actionTypes.SET_BLOCKED_USERS,
  payload,
});

export const setBlockedByUsers = (payload) => ({
  type: actionTypes.SET_BLOCKED_BY_USERS,
  payload,
});

export const setAlgoliaSearchIndex = (payload) => ({
  type: actionTypes.SET_ALGOLIA_SEARCH_INDEX,
  payload,
});

export const setMutedUsers = (payload) => ({
  type: actionTypes.SET_MUTED_USERS,
  payload,
});

export const notificationNotNew = (payload) => ({
  type: actionTypes.SET_NOTIFICATION_NOT_NEW,
  payload,
});

export const setNotificationRead = (payload) => ({
  type: actionTypes.SET_NOTIFICATION_READ,
  payload,
});

export const setSingleMeeting = (payload) => ({
  type: actionTypes.PATCH_MEETING_UPDATE,
  payload,
});

export const deleteSingleMeeting = (payload) => ({
  type: actionTypes.DELETE_MEETING_UPDATE,
  payload,
});

export const updateEditing = (payload) => ({
  type: actionTypes.UPDATE_EDITING,
  payload,
});

const addDeclinedMeeting = (payload) => ({
  type: actionTypes.ADD_DECLINED_MEETING,
  payload,
});

const removedDeclinedMeeting = (payload) => ({
  type: actionTypes.REMOVE_DECLINED_MEETING,
  payload,
});

const setMeetings = (payload) => ({
  type: actionTypes.SET_MEETINGS,
  payload,
});

export const emptyProfile = () => {
  const removeKeys = [
    profileLookupKey.favorites,
    profileLookupKey.schedule,
    profileLookupKey.accountProfile,
    profileLookupKey.notifications,
  ];

  removeKeys.forEach((key) => {
    if (retrievedPayloads.has(key)) {
      retrievedPayloads.delete(key);
    }
  });

  return {
    type: actionTypes.EMPTY_PROFILE,
  };
};

export const blockOrMuteUser = (attendeeId, action, accountProfile) => (
  dispatch
) => {
  if (action === chatOptions.BLOCK) {
    return axios
      .patch(`${process.env.REACT_APP_API_HOST}/${dataTypes.accountBlock}`, {
        users: [...accountProfile.blockedUsers, attendeeId],
      })
      .then((response) => response.data.data)
      .then((blocked) => {
        if (blocked) {
          dispatch(setBlockedUsers(blocked.blockedUsers));
        }
      });
  } else if (action === chatOptions.MUTE) {
    return axios
      .patch(`${process.env.REACT_APP_API_HOST}/${dataTypes.accountMute}`, {
        users: [...accountProfile.mutedUsers, attendeeId],
      })
      .then((response) => response.data.data)
      .then((muted) => {
        if (muted) {
          dispatch(setMutedUsers(muted.mutedUsers));
        }
      });
  }
};

export const unblockOrUnmuteUser = (attendeeId, action) => (dispatch) => {
  if (action === chatOptions.UNBLOCK) {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/${dataTypes.accountBlock}`, {
        data: {
          users: [attendeeId],
        },
      })
      .then((blocked) =>
        dispatch(setBlockedUsers(blocked.data.data.blockedUsers))
      );
  } else if (action === chatOptions.UNMUTE) {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/${dataTypes.accountMute}`, {
        data: {
          users: [attendeeId],
        },
      })
      .then((muted) => dispatch(setMutedUsers(muted.data.data.mutedUsers)));
  }
};

const payLoadReturn = (endPoint, data, dispatch) => {
  const meetingSetup = async () => {
    const status = await getMeetingStatus(data.data);
    dispatch(
      setSingleMeeting({
        meetingData: data.data,
        status,
      })
    );
  };
  switch (endPoint) {
    case dataTypes.favorites:
      dispatch(setFavorites(data.data));
      break;
    case dataTypes.schedule:
      dispatch(setSchedule(data.data));
      break;
    case dataTypes.accountProfile:
      dispatch(setAccountProfile(data.data));
      break;
    case dataTypes.accountNotifications:
      dispatch(setAccountNotifications(data));
      break;
    case dataTypes.meetings:
      meetingSetup();
      break;
    case dataTypes.guestProfile:
      dispatch(setGuestProfiles([data.data]));
      break;
    default:
      break;
  }
};

// Handle Get request for profile data
// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Profile
export const getProfileData = (endpoint, lookupKey, bypass = false) => (
  dispatch
) => {
  if (bypass || !retrievedPayloads.has(lookupKey)) {
    retrievedPayloads.set(lookupKey, true);

    axios
      .get(`${process.env.REACT_APP_API_HOST}/${endpoint}`)
      .then((response) => response.data)
      .then((data) => {
        payLoadReturn(endpoint, data, dispatch);
      });
  }
};

export const getMeetingNotifications = (notificationId) => (dispatch) => {
  axios
    .get(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetings}/${notificationId}`
    )
    .then((response) => response.data)
    .then(async (response) => {
      const status = await getMeetingStatus(response.data);

      dispatch(
        setSingleMeeting({
          meetingData: response.data,
          status,
        })
      );
    });
};

export const getGuestUserProfileByFuzionId = (guestUserFuzionId) => (
  dispatch
) => {
  axios
    .get(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.accountGuestProfile}/${guestUserFuzionId}`
    )
    .then((response) => response.data)
    .then((guestProfile) => dispatch(setGuestProfiles([guestProfile.data])));
};

// Handle Patch request for Profile data
// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Profile
export const patchProfileData = (endpoint, data) => (dispatch) => {
  return axios
    .patch(`${process.env.REACT_APP_API_HOST}/${endpoint}`, data)
    .then((response) => response.data)
    .then((data) => {
      payLoadReturn(endpoint, data, dispatch);
      dispatch(updateEnd());
    })
    .catch((error) => {
      dispatch(updateEnd(error));
    });
};

export const patchGuestProfileData = async (fuzionAttendeeId, data) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_API_HOST}/${dataTypes.accountGuestProfile}/${fuzionAttendeeId}`,
    data
  );
  return res.data;
};

// Handle Delete request for profile data
// https://github.com/Klowd/onlineeventpro-product-ui/wiki/Profile
export const deleteProfileData = (endpoint, data) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API_HOST}/${endpoint}`, { data })
    .then((response) => response.data)
    .then((data) => {
      payLoadReturn(endpoint, data, dispatch);
    });
};

export const addNetworkingNotification = (payload) => {
  return {
    type: actionTypes.ADD_NETWORKING_NOTIFICATION,
    payload,
  };
};

export const createMeeting = (data) => (dispatch) => {
  const meetingData = {
    ...formatMeetingData(data),
    createdBy: data.createdBy,
    attendees: data.attendees.map((attendee) => ({
      id: attendee.fuzionAttendeeId,
      name: attendee.name,
      preferredName: attendee.preferredName,
      company: attendee.company,
    })),
  };

  const setUpMeetingData = async (data) => {
    const status = await getMeetingStatus(data);

    dispatch(setSingleMeeting({ meetingData: data, status }));
  };
  //
  /**
   * PJX-530 Fix - payload object corrected for Create Meeting and Product Showcase
   * if the moderators exists for Product Showcase then only it should update the moderators, attendees, host and exhibitorId.
   * This will also fix PJX-550 Meeting not seen on Invitees' My Schedule
   */
  if (data.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
    if (data.moderators && data.moderators.length) {
      meetingData.moderators = data?.moderators.map((moderator) => {
        return moderator.fuzionAttendeeId;
      });
      meetingData.attendees = data.moderators.map((moderator) => {
        return { id: moderator.fuzionAttendeeId, name: moderator.name };
      });
    }
    meetingData.exhibitorId = data.exhibitorId;
    meetingData.companyId = data.companyId;
  }

  meetingData.attendees.push({
    id: data.host.fuzionAttendeeId,
    name: data.host.name,
    company: data?.host?.company,
  });

  return axios
    .post(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.singleMeeting}`,
      meetingData
    )
    .then(async (res) => {
      const data = res.data.data;
      //Sets to show success modal if passed in
      if (data) {
        if (data.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
          dispatch(setSingleWebinar(data));
        } else {
          await setUpMeetingData(data);

          return true;
        }
      } else if (res.data.name === errorCheck) {
        Logger.log("createMeeting Error", res.data);
        throw new Error(res.data.message);
      }

      return data;
    });
};

export const updateMeetingStatus = (
  data,
  id = null,
  disableNotification = false
) => (dispatch) => {
  const meetingData = { ...formatMeetingData(data), meetingId: data.meetingId };

  const setUpMeetingData = async (data) => {
    const status = await getMeetingStatus(data);

    dispatch(setSingleMeeting({ meetingData: data, status }));
  };

  return axios
    .put(
      `${process.env.REACT_APP_API_HOST}/meetings?userId=${id}&disableNotification=${disableNotification}`,
      meetingData
    )
    .then(async (res) => {
      const data = res.data.data;

      dispatch(setCurrentMeeting(data));

      if (meetingData.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
        dispatch(setSingleWebinar(data));
      } else {
        await setUpMeetingData(data);
      }

      return data;
    });
};

export const updateMeeting = (
  data,
  id,
  deleted,
  originalAttendees,
  isEditing,
  hostHasChanged = false
) => (dispatch) => {
  /**
   * TODO: refactor all of this.
   * This is a mess wrapped in a nightmare. 3 calls for updating a meeting.
   * 1 for updating the meeting
   * 1 for updating attendees or moderators
   * 1 for deleting attendee or moderator
   */
  const meetingData = { ...formatMeetingData(data), meetingId: id };
  let newHost;

  if (hostHasChanged) {
    const {
      host: { name, fuzionAttendeeId, id },
    } = data;

    newHost = {
      name,
      id: fuzionAttendeeId || id,
    };

    axios.post(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendeeBatch}`,
      [newHost]
    );
  }
  const getNewAttendees = () => {
    /**
     * Showcases don't have attendees they have moderators.
     * So we pass a list of moderators to be update in the batch update for attendees.
     * To be updated with a showcase update
     */

    if (meetingData.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
      const newMods = data?.moderators?.length
        ? data.moderators
            .filter((z) => !originalAttendees.includes(z.id))
            .map((m) => ({
              id: m.fuzionAttendeeId || m.id,
              name: m.name,
            }))
        : [];
      if (hostHasChanged && newHost) {
        newMods.push(newHost);
      }
      return newMods;
    }
    // Update attendees with new attendees only
    return data.attendees
      .filter((z) => !originalAttendees.includes(z.id))
      .map((attendee) => ({
        id: attendee.fuzionAttendeeId || attendee.id,
        name: attendee.name,
      }));
  };
  const newAttendees = getNewAttendees();
  const setUpMeetingData = async (data) => {
    const status = await getMeetingStatus(data);

    dispatch(setSingleMeeting({ meetingData: data, status, isEditing }));
  };

  // Add exhibitorId to Showcase meeting update
  if (meetingData.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
    meetingData.exhibitorId = data.exhibitorId; // I don't know what this is for but it's being used
    /**
     * For showcase we pass the updated list of moderators to be updated with the meeting.
     * We only pass the moderators list for showcases
     * For all other meeting types we do not send the updated attendees in the meeting update.
     */
    meetingData.moderators = data.moderators
      ? data.moderators.map((m) => m.id) // only send moderator id
      : []; // Need to pass list of moderators for showcase meeting update.
  }

  // Delete one or many attendees form a meeting
  if (deleted.length) {
    axios.delete(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendeeBatch}/${id}`,
      { data: deleted }
    );
  }

  // Add one or many attendees/moderators to a meeting
  if (newAttendees.length) {
    axios.post(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendeeBatch}/${id}`,
      newAttendees
    );
  }

  // Update a meeting
  return axios
    .put(`${process.env.REACT_APP_API_HOST}/${dataTypes.meetings}`, meetingData)
    .then(async (res) => {
      const data = res.data.data;
      if (data) {
        if (meetingData.meetingType.toLowerCase() === MEETING_TYPES.SHOW_CASE) {
          dispatch(setSingleWebinar(data));
        } else {
          await setUpMeetingData(data);
        }

        return data;
      } else if (res.data.name === errorCheck) {
        Logger.log("updateMeeting Error", res.data);
        throw new Error(res.data.message);
      }
    });
};

export const getMeetings = (meetingIds, lookupKey, bypass = false) => (
  dispatch
) => {
  if (!retrievedPayloads.has(lookupKey) || bypass) {
    return axios
      .post(`${process.env.REACT_APP_API_HOST}/${dataTypes.meetingsBatch}`, {
        meetingIds,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch(setMeetings(data.data));
        return true;
      });
  }
};

export const deleteMeeting = (id, meetingType, attendeeId) => (dispatch) => {
  dispatch(
    deleteProfileData(dataTypes.schedule, attendeeId, { meetings: [`${id}`] })
  );

  axios.delete(`${process.env.REACT_APP_API_HOST}/${dataTypes.meetings}/${id}`);

  if (meetingType === MEETING_TYPES.SHOW_CASE) {
    dispatch(deleteSingleWebinar(id));
  } else {
    dispatch(deleteSingleMeeting(id));
  }
};

export const acceptMeeting = (meeting, attendeeId) => (dispatch) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendeeAccept}/${meeting.sessionId}`
    )
    .then((res) => {
      const data = res.data.data;

      if (data) {
        dispatch(setSchedule(data));
        dispatch(removedDeclinedMeeting(meeting.sessionId));

        return res;
      } else if (res.data.name === errorCheck) {
        Logger.log("acceptMeeting Error", res.data);
        throw new Error(res.data.message);
      }
    });
};

export const declineMeeting = (meeting, attendeeId) => (dispatch) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.meetingAttendeeDecline}/${meeting.sessionId}`
    )
    .then((res) => {
      const data = res.data;

      if (data.name !== errorCheck) {
        dispatch(addDeclinedMeeting(meeting.sessionId));
        dispatch(deleteSingleMeeting(meeting.sessionId));
        return meeting.sessionId;
      } else {
        Logger.log("declineMeeting Error", res.data);
        throw new Error(data.message);
      }
    });
};

export const updateNotificationRead = (notification) => (dispatch) => {
  // notifications that come from websocket does not have pk and sk. Such notifications cannot be marked as read on the server without these properties.
  // it will cause notification to appear unread on next page reload
  // To compose PK we need user fuzion id which we attached to notification object in DropdownNotification.js
  const pk =
    notification.pk ||
    `${process.env.REACT_APP_FUZION_EVENT_ID}#${notification.userFuzionId}`;
  const sk = notification.sk || Number(notification.timestamp);

  return axios
    .patch(
      `${process.env.REACT_APP_API_HOST}/${dataTypes.notificationsMarkRead}`,
      {
        pk,
        sk,
      }
    )
    .then(() => {
      dispatch(setNotificationRead(notification));
    });
};

export const algoliaSetting = (type) => (dispatch) => {
  const data = getAlgoliaIndex(type);

  if (data) {
    getAlgoliaIndex(type).then((data) => {
      dispatch(setAlgoliaSearchIndex(data));
    });
  }
};

export const updateEnd = (error) => ({
  type: actionTypes.UPDATE_END,
  payload: { error },
});
