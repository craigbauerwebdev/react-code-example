// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

//interface retained for documentation purposes
//var MeetingResponse = {
//  JoinInfo: {
//    Attendee: null,
//    Meeting: null,
//  },
//};

export async function fetchMeeting(meetingId, name, region) {
  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}chime/join?title=${encodeURIComponent(
      meetingId
    )}&name=${encodeURIComponent(name)}${
      region ? `&region=${encodeURIComponent(region)}` : ""
    }`,
    {
      method: "POST",
    }
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(`Server error: ${data.error}`);
  }

  return data;
}

export async function getNearestRegion() {
  try {
    const res = await fetch(`https://nearest-media-region.l.chime.aws`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    return data.region;
  } catch (e) {
    // console.error("Could not fetch nearest region: ", e.message);
    throw new Error(e);
  }
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

export function createGetAttendeeCallback(meetingId) {
  return async (chimeAttendeeId, externalUserId) => {
    const attendeeUrl = `${
      process.env.REACT_APP_API_HOST
    }chime/attendee?title=${encodeURIComponent(
      meetingId
    )}&attendee=${encodeURIComponent(chimeAttendeeId)}`;
    const res = await fetch(attendeeUrl, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Invalid server response");
    }

    const data = await res.json();

    return {
      name: data.AttendeeInfo.Name,
    };
  };
}

export async function endMeeting(meetingId) {
  const res = await fetch(
    `${process.env.REACT_APP_API_HOST}chime/end?title=${encodeURIComponent(
      meetingId
    )}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Server error ending meeting");
  }
}

export default {
  fetchMeeting: fetchMeeting,
  getNearestRegion: getNearestRegion,
  getQueryVariable: getQueryVariable,
  createGetAttendeeCallback: createGetAttendeeCallback,
  endMeeting: endMeeting,
};
