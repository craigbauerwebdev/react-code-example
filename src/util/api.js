/**
 * This file contains the queries principally responsible for interacting with the meeting api endpoints in the oep-api repo.
 * The function names are pretty self explanatory.
 * One item worth noting is that the create meeting and update meeting are essentially called in a tight sequential manner upon the meeting's initial creation.
 * Since the meeting creation function doesn't actually do much except create the chime meeting instance,
 * the update meeting carries the bulk of the responsibility when it comes to inserting the meeting data into the record in the db.
 */

import Logger from "js-logger";
import axios from "axios";
import { dataTypes } from "store/utils/dataTypes";

export const BASE_URL = process.env.REACT_APP_API_HOST;

export async function fetchMeeting(meetingId) {
  const response = await axios.get(
    `${BASE_URL}/${dataTypes.meetings}/${encodeURIComponent(meetingId)}`
  );

  return response?.data ?? response;
}

export async function getNearestRegion() {
  const res = await axios.get(`https://nearest-media-region.l.chime.aws`);
  return res ?? "us-west-2";
}

export function getQueryVariable(variable, location) {
  const query = location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return "";
}

/**
 * This function is responsible for getting the join token for a given attendee.
 * It's unclear what the benefit was of designing it to return a function
 * @param {String} meetingId
 *
 */
export function getJoinToken(meetingId) {
  return async (attendeeId) => {
    const attendeeUrl = `${BASE_URL}/${
      dataTypes.meetingsJoinTokens
    }/${encodeURIComponent(meetingId)}`;
    try {
      const res = await axios.get(attendeeUrl);
      const hasData = res.data.data;

      if (!hasData) {
        return null;
      }

      if (res.data && res.data.data && res.data.data.mappings) {
        res.data.data.mappings.push({
          ExternalUserId: res.data.data.ExternalUserId,
          fuzionAttendeeId: res.data.data.fuzionAttendeeId,
        });
      }

      return res;
    } catch (error) {
      Logger.log(error);
    }
  };
}

export async function endMeeting(meetingId) {
  return await axios.put(
    `${BASE_URL}/${dataTypes.meetingsEnd}/${encodeURIComponent(meetingId)}`
  );
}

/**
 * This function declaration is not ideal in that we really have no idea what the changedLists are at all and so makes this a rather opaque operation.
 * It's also verbose and could benefit from destructuring.
 * @param {Meeting} meeting
 * @param {Object} changedLists
 * @returns
 */
export async function updateMeeting(meeting, changedLists) {
  const body = {
    host: meeting.host,
    description: meeting.description,
    meetingTitle: meeting.meetingTitle,
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    meetingId: meeting.meetingId,
    meetingType: meeting.meetingType,
    ...changedLists,
  };

  return await axios.put(`${BASE_URL}/${dataTypes.meetings}`, body);
}

// This function triggers the appropriate api logic for updating the meeting data, specifically its roster when a user is promoted to moderator
export async function addModeratorToChat(meeting, attendeeIdToPromote) {
  return await axios.post(
    `${BASE_URL}/${dataTypes.chatLivestream}/${meeting.streamId}/moderator/${attendeeIdToPromote}`
  );
}
// Relatedly as you might imagine, this function triggers the appropriate api logic for updating the meeting data, specifically its roster when a user is demoted from moderator
export async function removeModeratorFromChat(
  meeting,
  attendeeIdForUserToDemote
) {
  return await axios.delete(
    `${BASE_URL}/${dataTypes.chatLivestream}/${meeting.streamId}/moderator/${attendeeIdForUserToDemote}`
  );
}

export async function removeUserFromChat(
  meeting,
  attendeeIdOfUserToRemove,
  moderatorAttendeeId
) {
  return await axios.delete(
    `${BASE_URL}/${dataTypes.chatLivestream}/${meeting.streamId}/attendee/${attendeeIdOfUserToRemove}`,
    {
      data: {
        moderatorAttendeeId,
      },
    }
  );
}

export async function blockUserFromMeeting(meetingId, attendeeToBlock) {
  const data = await axios.post(
    `${BASE_URL}/${dataTypes.blockSingleMeeting}/${meetingId}`,
    {
      attendeeToBlock,
    }
  );

  return data;
}

// Get User profile that were not loaded yet
export async function getCurrentUserProfile() {
  const data = await axios.get(`${BASE_URL}/${dataTypes.accountProfile}`);

  return data;
}
// Get User public profile by user attendee id. Used to get profile of some other user, not currently logged in user
export async function getUserProfileByFuzionId(otherUserAttendeeId) {
  const data = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${dataTypes.accountGuestProfile}/${otherUserAttendeeId}`
  );

  return data;
}
// Get User public status by user attendee id. Used to get profile of some other user, not currently logged in user
export async function getUserStatusByFuzionId(otherUserAttendeeId) {
  const data = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${dataTypes.accountGuestStatus}/${otherUserAttendeeId}`
  );

  return data;
}
