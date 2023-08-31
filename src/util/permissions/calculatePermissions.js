import calcBlockedNetworkRoutes from "./calcBlockedNetworkRoutes";
import calcBlockedProfileRoutes from "./calcBlockedProfileRoutes";

// if a user has not updated their permissions in overlord we do not have a record of
// overlord settings; therefore we set a basic config until we receive their updated settings
// NOTE: Networking is a different setting than chat. Networking refers to "schedule a meeting", chat refers to the direct chat pop-up
export const defaultPermissions = {
  allowDirectChat: false, //controls direct chat icon in header and "Start Chat" text
  allowNetworkingMeetings: false, //controls "Schedule a Meeting" button and text visibility
  allowNetworkingChatMeetings: false, //controls Chat button inside "Schedule a Meeting" Modal
  allowScheduleMeetings: false, //not used anywhere except in test files - use allowNetworkingMeetings which checks for both event and user settings
  allowScheduleMeetingsAttendeeToAttendee: false,
  allowScheduleMeetingsExhibitorToAttendee: false,
  allowScheduleMeetingsExhibitorToExhibitor: false,
  blockedProfileRoutes: [],
  showSettingsNetworkingOptions: false,
  showSettingsManageMyOptions: false,
  allowDirectChatAccess: false, //not accurate grouping for direct chat - replace with allowDirectChat
  allowVideoChatAccess: false, //controls Video button inside "Schedule a Meeting" Modal
  blockedNetworkRoutes: [],
  boothStaff: false,
};

// format settings from overlord for easier readability
const calculatePermissions = ({ globalSettings }) => {
  return {
    allowDirectChat:
      //networking and chat have to be on at the event and user levels
      globalSettings.eventNetworking && //event level networking
      globalSettings.chat && //event level chat
      globalSettings.allowNetworking && //attendee level networking
      globalSettings.allowUserNetworking && //attendee optional networking (from profile settings)
      globalSettings.allowChat, //attendee level chat
    allowNetworkingMeetings:
      //networking has to be on at the event and user levels and at least one of the two meeting formats has to be allowed
      globalSettings.eventNetworking &&
      globalSettings.allowUserNetworking &&
      globalSettings.allowNetworking &&
      (globalSettings.networkingMeetings.meetingFormats.chat ||
        globalSettings.networkingMeetings.meetingFormats.videoChat),
    allowNetworkingChatMeetings:
      //networking and chat have to be on at the event and user levels plus meeting format Chat is on at the event level
      globalSettings.eventNetworking && //event
      globalSettings.chat && //event
      globalSettings.networkingMeetings.meetingFormats.chat && //event meeting format
      globalSettings.allowNetworking && //user (by registration)
      globalSettings.allowUserNetworking && //user (by user choice)
      globalSettings.allowChat, //user
    allowNotifications: globalSettings.enableNotifications,
    allowNetworking: globalSettings.allowNetworking,
    allowScheduleMeetings: globalSettings.eventNetworking,
    allowScheduleMeetingsAttendeeToAttendee:
      globalSettings.eventNetworking &&
      globalSettings.allowNetworking &&
      globalSettings.networkingMeetings.userTypeMeetings.attendeeToAttendee,
    allowScheduleMeetingsExhibitorToAttendee:
      globalSettings.eventNetworking &&
      globalSettings.allowNetworking &&
      globalSettings.networkingMeetings.userTypeMeetings.exhibitorToAttendee,
    allowScheduleMeetingsExhibitorToExhibitor:
      globalSettings.eventNetworking &&
      globalSettings.allowNetworking &&
      globalSettings.networkingMeetings.userTypeMeetings.exhibitorToExhibitor,
    blockedProfileRoutes: calcBlockedProfileRoutes(globalSettings),
    showSettingsNetworkingOptions: globalSettings.eventNetworking,
    showSettingsManageMyOptions:
      globalSettings.eventNetworking &&
      globalSettings.chat &&
      globalSettings.allowNetworking,
    allowDirectChatAccess:
      globalSettings.eventNetworking &&
      globalSettings.allowChat &&
      globalSettings.chat,
    allowVideoChatAccess:
      //networking has to be on at the event and user levels plus meeting format Video Chat is on at the event level
      globalSettings.eventNetworking && //event
      globalSettings.networkingMeetings.meetingFormats.videoChat && //event meeting format
      globalSettings.allowNetworking && //user (by registration)
      globalSettings.allowUserNetworking, //user (by user choice)
    blockedNetworkRoutes: calcBlockedNetworkRoutes(globalSettings),
    boothStaff: globalSettings.boothStaff,
    allowUserNetworking: globalSettings.allowUserNetworking,
    exhibitorAdmin: globalSettings.exhibitorAdmin,
  };
};

export default calculatePermissions;
