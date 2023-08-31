/**
 * checkNetworkingPermissions gets the permissions object and checks if chat and meeting types are allowed
 * @param {object} permissions a permissions Object coming from Overlord via calculatePermissions.js
 * @param {boolean} userIsExhibitor boolean value to indicate if user is an exhibitor
 * @param {boolean} targetIsExhibitor boolean value to indicate if the attendee in the attendee list or public profile page is an exhibitor
 * @returns {object} returns object with each networking option for chat and schedule a meeting
 */
//NOTE: this file should not change by event - these settings come from Overlord. See additional notes below the code

export default (
  permissions,
  userIsExhibitor = false,
  targetIsExhibitor = false
) => {
  // if networking and chat are both turned off for the event or for the user, no need for further checks - return object with false values
  if (
    (!permissions.allowDirectChat && !permissions.allowNetworkingMeetings) ||
    !permissions.showSettingsManageMyOptions
  ) {
    return {
      directChat: false,
      chatMeeting: false,
      videoMeeting: false,
    };
  }

  let networking = {
    directChat: true,
    chatMeeting: true,
    videoMeeting: true,
  };
  for (const property in permissions) {
    switch (property) {
      //DIRECT CHAT
      case "allowDirectChat":
        if (!permissions[property]) {
          //user will not have chat icon in header or "Start Chat" text on profile/networking pages
          networking.directChat = false;
        }
        break;

      //SCHEDULE A MEETING
      case "allowNetworkingChatMeetings":
        if (!permissions[property]) {
          //user will not have Chat button in Schedule a Meeting
          networking.chatMeeting = false;
        }
        break;

      case "allowVideoChatAccess":
        if (!permissions[property]) {
          //user will not have Video button in Schedule a Meeting
          networking.videoMeeting = false;
        }
        break;

      case "allowNetworkingMeetings":
      case "showSettingsNetworkingOptions":
        //Schedule a Meeting should not appear anywhere - user still has direct chat in header and in "Start Chat" text
        if (!permissions[property]) {
          networking.chatMeeting = false;
          networking.videoMeeting = false;
        }
        break;

      case "allowScheduleMeetingsAttendeeToAttendee":
      case "allowScheduleMeetingsExhibitorToAttendee":
      case "allowScheduleMeetingsExhibitorToExhibitor":
        //need to build these three out using the params for userIsExhibitor and targetIsExhibitor
        break;

      case "allowUserNetworking":
      case "boothStaff":
      case "exhibitorAdmin":
        //these need further clarifications to build out accordingly
        break;
      default:
        break;
    }
  }
  return networking;
};

/**
 * IF FALSE, NO CHAT OR NETWORKING ALLOWED AT ALL
 * -------- if either of the following are false, there is no direct chat AND no networking for the event or the user -------
 * showSettingsManageMyOptions: includes three toggles: 1) EVENT > Enable Networking, 2) EVENT > Enable Chat, 3) ATTENDEE > AllowNetworking
 * allowDirectChat AND allowNetworkingMeetings: these settings combined means both direct chat and networking are turned off for the event and the user
 * -----------------------------------
 * ADDITIONAL ATTENDEE LEVEL SETTINGS
 * allowDirectChat: combines two toggles: 1) EVENT > Enable Chat, 2) ATTENDEE > AllowChat - controls direct chat icon in header and "Start Chat" text
 * allowUserNetworking: ATTENDEE > AllowUserNetworking toggle (description pending more clarification)
 * boothStaff: ATTENDEE > BoothStaff toggle (description pending more clarification)
 * exhibitorAdmin: ATTENDEE > ExhibitorAdmin toggle (description pending more clarification)
 * -----------------------------------
 * ADDITIONAL EVENT-WIDE LEVEL SETTINGS
 * allowNetworkingMeetings: combines two toggles: 1) EVENT > Enable Networking, 2) ATTENDEE > AllowNetworking
 * allowNetworkingChatMeetings: NETWORK MEETINGS > meeting formats > Chat - if false, the Chat button should not appear in the "Schedule a Meeting modal"
 * allowVideoChatAccess: NETWORK MEETINGS > meeting formats > Video Chat - if false, the Video button should not appear in the "Schedule a Meeting modal"
 * showSettingsNetworkingOptions: EVENT > Enable Networking - if false, "Schedule a Meeting" button should not be shown anywhere
 * allowScheduleMeetingsAttendeeToAttendee: NETWORK MEETINGS > Attendee to Attendee - "Schedule a Meeting" where user and target are both Attendees
 * allowScheduleMeetingsExhibitorToAttendee: NETWORK MEETINGS > Exhibitor to Attendee - "Schedule a Meeting" where user is Exhibitor and target is Attendee
 * allowScheduleMeetingsExhibitorToExhibitor: NETWORK MEETINGS > Attendee to Attendee - "Schedule a Meeting" where user and target are both Exhibitors
 */
