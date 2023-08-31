import generatedName from "util/generatedName";
/**
 *
 * @param {Meeting} meeting
 * @returns {string} showcase url
 *
 */

const getMeetingUrl = (meeting, isShowcaseSession) => {
  switch (meeting.meetingType) {
    case "showcase":
      return isShowcaseSession
        ? `/showcases/${meeting.sessionId}/${generatedName(
            meeting.sessionName
          )}`
        : `/product-showcase/${meeting.sessionId}/${generatedName(
            meeting.sessionName
          )}`;
    default:
      return `/meeting/${meeting.sessionId}`;
  }
};
export default getMeetingUrl;
