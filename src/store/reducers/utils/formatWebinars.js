/**
 * Set up sessions to be saved in store
 * @param {object} state
 * @param {object} payload data from endpoint
 */

export default function formatWebinars(state, payload) {
  let formattedWebinars = payload.map((webinar, i) => {
    let formattedWebinar = {};
    formattedWebinar.sessionId = webinar.meetingId;
    formattedWebinar.startTime = webinar.startTime;
    formattedWebinar.endTime = webinar.endTime;
    formattedWebinar.sessionEnd = webinar.endTime;
    formattedWebinar.sessionName = webinar.title;
    formattedWebinar.description = webinar.description;
    formattedWebinar.presenters = webinar.hosts;
    formattedWebinar.sessionType = { sessionTypeName: webinar.meetingType };
    formattedWebinar.sessionVideoSource = webinar.videoSource;
    formattedWebinar.companyName = webinar.companyName;
    formattedWebinar.sessionStart = webinar.startTime;
    formattedWebinar.invitees = webinar.invitees;
    formattedWebinar.presenter = webinar.presenter;
    formattedWebinar.exhibitor = webinar.exhibitor;
    formattedWebinar.longDescription = webinar.longDescription;
    formattedWebinar.fuzionExhibitorId = webinar.fuzionExhibitorId;
    formattedWebinar.streamId = webinar.streamId;
    formattedWebinar.isMeetingFull = webinar.isMeetingFull;
    formattedWebinar.host = webinar.host;
    return formattedWebinar;
  });
  return {
    ...state,
    webinars: formattedWebinars,
  };
}
