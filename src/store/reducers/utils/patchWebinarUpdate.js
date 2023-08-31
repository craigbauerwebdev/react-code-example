import formatMeetings from "./formatMeetings";

export const patchWebinarUpdate = (state, webinar) => {
  const [formattedWebinar] = formatMeetings([webinar]);
  const modifiedWebinars = state.webinars?.length ? [...state.webinars] : [];
  const cleanWebinar =
    modifiedWebinars.length > 0
      ? modifiedWebinars.filter(
          (z) => z?.sessionId !== formattedWebinar?.sessionId
        )
      : [];

  return {
    webinars: [...cleanWebinar, { ...formattedWebinar }],
  };
};

export const deleteWebinarUpdate = (state, meetingId) => {
  const modifiedWebinar = state.webinars ? [...state.webinars] : [];

  return {
    webinars:
      modifiedWebinar.length > 0
        ? modifiedWebinar.filter((z) => z.sessionId !== meetingId)
        : [],
  };
};
