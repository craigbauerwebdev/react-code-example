export type GuestProfile = {
  attendeeId: string;
  avatar?: string;
  company: string;
  firstName: string;
  lastName: string;
  meetingTimes?: any[];
  preferredName?: string;
  title: string;
};

export type ChimeAttendeeProfile = {
  chimeAttendeeId: string;
  externalUserId: ChimeAttendeeProfile["fuzionAttendeeId"];
  fuzionAttendeeId: GuestProfile["attendeeId"];
  name?: string;
  isHost: boolean;
  isCurrentUser: boolean;
  role: string;
};

export type RosterProfile = {
  attendee: ChimeAttendeeProfile;
  guestProfile: GuestProfile;
};
export interface PresentAttendee extends ChimeAttendeeProfile, GuestProfile {
  tileId?: any;
  shareTileId?: any;
  index?: number;
}

export type ChimeMeeting = {
  meetingInfo: {
    ExternalMeetingId: string;
    MediaPlacement: {
      AudioFallbackUrl: string;
      AudioHostUrl: string;
      ScreenDataUrl: string;
      ScreenSharingUrl: string;
      ScreenViewingUrl: string;
      SignalingUrl: string;
      TurnControlUrl: string;
    };

    MediaRegion: string;
    MeetingId: string;
  };
  attendeeInfo: {
    AttendeeId: string;
    ExternalUserId: string;
    JoinToken: string;
    fuzionAttendeeId: string;
    mappings: ChimeAttendeeProfile[];
  };
};
export type User = {
  address: any;
  analytics_opt_in_flag: any;
  attendance_verification_flag: 1;
  attended_last_event_flag: any;
  attendee_arrival_timestamp: any;
  attendee_type_flag: string;
  badge_number: string;
  booth_staff_flag: any;
  contact: any;
  create_timestamp: string;
  custom_attributes: any;
  exhibitor_company_id: string;
  first_time_flag: any;
  fuzion_attendee_id: string;
  fuzion_exhibitor_id: any;
  fuzion_parent_attendee_id: any;
  last_mod_timestamp: string;
  membership_flag: any;
  membership_type: any;
  networking_opt_in_flag: any;
  occupation_type: any;
  registration_complete_flag: any;
  registration_method_flag: any;
  registration_number: string;
  registration_status_flag: any;
  registration_timestamp: any;
  token: string;
  website_url: string;
};
export type Meeting = {
  attendees: string[];
  chimeMeeting: ChimeMeeting;
  description: "";
  endTime: string;
  exhibitorId: string;
  fuzionExhibitorId: string;
  host: string;
  meetingId: string;
  meetingTitle: string;
  meetingType: string;
  moderators: string;
  sessionEnd: string;
  sessionId: string;
  sessionName: string;
  sessionStart: string;
  startTime: string;
  streamChannelId: string;
  streamId: string;
};
