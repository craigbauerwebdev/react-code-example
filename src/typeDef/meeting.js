/**
 * @typedef MediaPlacement
 * @property {string} ScreenViewingUrl
 * @property {string} AudioFallbackUrl
 * @property {string} ScreenDataUrl
 * @property {string} TurnControlUrl
 * @property {string} ScreenSharingUrl
 * @property {string} AudioHostUrl
 * @property {string} SignalingUrl
 **/

/**
 * @typedef ChimeMeetingInfo
 * @property {string} MeetingId
 * @property {string} MediaRegion
 * @property {MediaPlacement} MediaPlacement
 * @property {string} ExternalMeetingId
 **/

/**
 * @typedef ChimeMeeting
 * @property {ChimeMeetingInfo} Meeting
 **/

/**
 * @typedef Meeting
 *
 * @property {string} streamChannelId
 * @property {string} exhibitorId
 * @property {string} meetingStatus
 * @property {string[]} attendees list of attendees ids
 * @property {string} description
 * @property {string} meetingTitle should use sessionName over this value
 * @property {string} startTime should use sessionStart over this value
 * @property {string} meetingId same as sessionId use sessionId value over this
 * @property {string} endTime should use sessionEnd over this value
 * @property {string} meetingType
 * @property {string} host
 * @property {string[]} moderators list of moderator ids
 * @property {string} sessionId same value as meetingId
 * @property {string} sessionStart Time string YYY-MM-DDTHH:mm:ss
 * @property {string} sessionEnd Time string YYYY-MM-DDTHH:mm:ss
 * @property {string} sessionName same as meetingTitle
 * @property {boolean} meetingHasStarted
 * @property {string} fuzionExhibitorId
 * @property {string} streamId
 * @property {ChimeMeeting} chimeMeeting
 */
