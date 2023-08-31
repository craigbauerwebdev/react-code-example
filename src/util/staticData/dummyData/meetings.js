const meetings = [
  {
    sessionId: 19759863,
    eventId: 2972,
    clientSessionId: "104",
    sessionName:
      "Multi-Lingual OnDemand: Your viewers want to talk to each other in-person and in-chat",
    description:
      "People yearn to connect to one another, but not everyone can break the ice in-person. A virtual chat room can be a fantastic way for your audiences to discuss and debate the finer points of your content. More importantly, they can meet and create meaningful relationships online just as well as they can IRL.",
    sessionTrack: "Audience Interaction",
    isDeleted: false,
    sessionStart: "2021-03-24T09:49:00",
    sessionEnd: "2021-03-24T22:00:00",
    sessionCustom1: "",
    sessionCustom2: null,
    sessionCustom3: null,
    sessionCustom4: null,
    sessionCustom5: null,
    sessionCustom6: null,
    interactionKey: "5m0qxfbt",
    sessionVideoSource: null,
    sessionSurveyLink: null,
    sessionExternalLink: null,
    sessionCmelink: null,
    secondaryTrack: null,
    keywords: null,
    groupMeetingLink: null,
    featuredSession: false,
    sessionFormat: {
      sessionFormatId: 2,
      sessionFormatName: "OnDemandVirtual",
    },
    sessionFormatId: 2,
    moderators: null,
    moderatorFiles: null,
    sessionType: {
      sessionTypeId: 1088385,
      sessionTypeName: "OnDemand",
    },
  },
  {
    streamChannelId: "f2bc2970-88c3-11eb-9e8e-1d0cd57816af",
    attendees: ["11EB4456F6AAFF90BE6C13988A7BDB55"],
    host: "11EB4456F6AAFF90BE6C13988A7BDB55",
    description: "This is a test",
    meetingTitle: "test",
    meetingId: "1pyrG4udSFcsd41zLfHDYP5OGSo",
    meetingType: "chat",
    streamId: "f2bc2970-88c3-11eb-9e8e-1d0cd57816af",
    sessionId: "1pyrG4udSFcsd41zLfHDYP5OGSo",
    sessionStart: "2021-03-24T09:49:00",
    sessionEnd: "2021-03-22T18:00:00",
    sessionName: "test",
  },
  {
    streamChannelId: "2ae515a0-874d-11eb-b187-6b94b19588f2",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764E74E3B9A0A0CC5B8A15D079BA",
    ],
    host: "11EB764E74E3B9A0A0CC5B8A15D079BA",
    description: "test",
    meetingTitle: "test chat with cas",
    meetingId: "1ptazamoHRt7M8oORsoXpTqbUhp",
    meetingType: "chat",
    streamId: "2ae515a0-874d-11eb-b187-6b94b19588f2",
    sessionId: "1ptazamoHRt7M8oORsoXpTqbUhp",
    sessionStart: "2021-03-24T09:50:00",
    sessionEnd: "2021-03-22T18:32:00",
    sessionName: "test chat with cas",
  },
  {
    streamChannelId: "3f10a8a0-874d-11eb-b187-6b94b19588f2",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764E74E3B9A0A0CC5B8A15D079BA",
    ],
    host: "11EB764E74E3B9A0A0CC5B8A15D079BA",
    description: "",
    meetingTitle: "test video with cas",
    meetingId: "1ptb41x0cSAdZtytUvuuOCQQ7Ej",
    chimeMeeting: {
      Meeting: {
        MeetingId: "7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          ScreenViewingUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
          AudioFallbackUrl:
            "wss://haxrp.m3.ue1.app.chime.aws:443/calls/7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
          ScreenDataUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
          TurnControlUrl: "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
          ScreenSharingUrl:
            "wss://bitpw.m3.ue1.app.chime.aws:443/v2/screen/7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
          AudioHostUrl:
            "a86963753cea66838187bd46d3d65fd8.k.m3.ue1.app.chime.aws:3478",
          SignalingUrl:
            "wss://signal.m3.ue1.app.chime.aws/control/7a17201a-ab8c-4c4e-bf15-225f2c4a2c42",
        },
        ExternalMeetingId: "1ptb41x0cSAdZtytUvuuOCQQ7Ej",
      },
    },
    meetingType: "video",
    streamId: "3f10a8a0-874d-11eb-b187-6b94b19588f2",
    sessionId: "1ptb41x0cSAdZtytUvuuOCQQ7Ej",
    sessionStart: "2021-03-23T15:15:00",
    sessionEnd: "2021-03-23T15:30:00",
    sessionName: "test video with cas",
  },
  {
    streamChannelId: "5f56c5e0-8739-11eb-8efb-2b085ebe58da",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764E9E7868B09C07E38170D0F0B4",
    ],
    host: "11EB764E9E7868B09C07E38170D0F0B4",
    description: "test remove meetings",
    meetingTitle: "test remove video",
    startTime: "2021-03-23T11:53:00",
    meetingId: "1ptJlRh9cYjbydmLg9HKKGlbPsC",
    endTime: "2021-03-18T12:08:00",
    chimeMeeting: {
      Meeting: {
        MeetingId: "b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          ScreenViewingUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
          AudioFallbackUrl:
            "wss://haxrp.m2.ue1.app.chime.aws:443/calls/b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
          ScreenDataUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
          TurnControlUrl: "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
          ScreenSharingUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
          AudioHostUrl:
            "3cb307613902e0d3090806f13dda517a.k.m2.ue1.app.chime.aws:3478",
          SignalingUrl:
            "wss://signal.m2.ue1.app.chime.aws/control/b5a607f2-9a9d-4cf1-82f5-ee217e820e35",
        },
        ExternalMeetingId: "1ptJlRh9cYjbydmLg9HKKGlbPsC",
      },
    },
    meetingType: "video",
    streamId: "5f56c5e0-8739-11eb-8efb-2b085ebe58da",
    sessionId: "1ptJlRh9cYjbydmLg9HKKGlbPsC",
    sessionStart: "2021-03-23T11:53:00",
    sessionEnd: "2021-03-23T12:08:00",
    sessionName: "test remove video",
  },
  {
    streamChannelId: "4e425df0-8739-11eb-8efb-2b085ebe58da",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764E9E7868B09C07E38170D0F0B4",
    ],
    host: "11EB764E9E7868B09C07E38170D0F0B4",
    description: "",
    meetingTitle: "test remove chat ca",
    startTime: "2021-03-17T12:45:00",
    meetingId: "1ptJhnSNQfxuEFrSrlWJEn8PZzd",
    endTime: "2021-03-17T13:00:00",
    meetingType: "chat",
    streamId: "4e425df0-8739-11eb-8efb-2b085ebe58da",
    sessionId: "1ptJhnSNQfxuEFrSrlWJEn8PZzd",
    sessionStart: "2021-03-17T12:45:00",
    sessionEnd: "2021-03-17T13:00:00",
    sessionName: "test remove chat ca",
  },
  {
    streamChannelId: "387c2dc0-8739-11eb-8efb-2b085ebe58da",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764E9E7868B09C07E38170D0F0B4",
    ],
    host: "11EB764E9E7868B09C07E38170D0F0B4",
    description: "",
    meetingTitle: "test remove ca",
    startTime: "2021-03-17T13:45:00",
    meetingId: "1ptJd0qdbuBxlGKTeMdDyfdZcQe",
    endTime: "2021-03-17T14:00:00",
    chimeMeeting: {
      Meeting: {
        MeetingId: "ab359d46-3c0c-45ac-aa13-2c1412b5b239",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          ScreenViewingUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=ab359d46-3c0c-45ac-aa13-2c1412b5b239",
          AudioFallbackUrl:
            "wss://haxrp.m2.ue1.app.chime.aws:443/calls/ab359d46-3c0c-45ac-aa13-2c1412b5b239",
          ScreenDataUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/ab359d46-3c0c-45ac-aa13-2c1412b5b239",
          TurnControlUrl: "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
          ScreenSharingUrl:
            "wss://bitpw.m2.ue1.app.chime.aws:443/v2/screen/ab359d46-3c0c-45ac-aa13-2c1412b5b239",
          AudioHostUrl:
            "3bbea598896baf43b397537b9c8be5cd.k.m2.ue1.app.chime.aws:3478",
          SignalingUrl:
            "wss://signal.m2.ue1.app.chime.aws/control/ab359d46-3c0c-45ac-aa13-2c1412b5b239",
        },
        ExternalMeetingId: "1ptJd0qdbuBxlGKTeMdDyfdZcQe",
      },
    },
    meetingType: "video",
    streamId: "387c2dc0-8739-11eb-8efb-2b085ebe58da",
    sessionId: "1ptJd0qdbuBxlGKTeMdDyfdZcQe",
    sessionStart: "2021-03-17T13:45:00",
    sessionEnd: "2021-03-17T14:00:00",
    sessionName: "test remove ca",
  },
  {
    streamChannelId: "c1f8b750-866a-11eb-9853-cf47c88685cc",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB445655439220BE6C13988A7BDB55",
    ],
    host: "11EB445655439220BE6C13988A7BDB55",
    description: "",
    meetingTitle: "test video",
    startTime: "2021-03-16T11:15:00",
    meetingId: "1pqPtO2lAC2ZL6YHkgPytw2KrIx",
    endTime: "2021-03-16T11:30:00",
    chimeMeeting: {
      Meeting: {
        MeetingId: "d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          ScreenViewingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
          AudioFallbackUrl:
            "wss://haxrp.m1.ue1.app.chime.aws:443/calls/d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
          ScreenDataUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
          TurnControlUrl: "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
          ScreenSharingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
          AudioHostUrl:
            "fddd7eb097b29b437f2430ba902c9b76.k.m1.ue1.app.chime.aws:3478",
          SignalingUrl:
            "wss://signal.m1.ue1.app.chime.aws/control/d452ada0-fe4f-4df9-882c-3ffdbb3d9d97",
        },
        ExternalMeetingId: "1pqPtO2lAC2ZL6YHkgPytw2KrIx",
      },
    },
    meetingType: "video",
    streamId: "c1f8b750-866a-11eb-9853-cf47c88685cc",
    sessionId: "1pqPtO2lAC2ZL6YHkgPytw2KrIx",
    sessionStart: "2021-03-16T11:15:00",
    sessionEnd: "2021-03-16T11:30:00",
    sessionName: "test video",
  },
  {
    streamChannelId: "370035c0-8731-11eb-9984-c55b47b39d99",
    attendees: [
      "11EB4456F6AAFF90BE6C13988A7BDB55",
      "11EB764DF60E1710B59B3F124C9BCC0D",
    ],
    host: "11EB764DF60E1710B59B3F124C9BCC0D",
    description: "test video meeting",
    meetingTitle: "test chat",
    startTime: "2021-03-17T12:30:00",
    meetingId: "1ptCesRnBsNMStOsFl4YeCTySBT",
    endTime: "2021-03-17T13:00:00",
    chimeMeeting: {
      Meeting: {
        MeetingId: "366a51e6-c6fe-4d34-a124-9276071f45e9",
        MediaRegion: "us-east-1",
        MediaPlacement: {
          ScreenViewingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=366a51e6-c6fe-4d34-a124-9276071f45e9",
          AudioFallbackUrl:
            "wss://haxrp.m1.ue1.app.chime.aws:443/calls/366a51e6-c6fe-4d34-a124-9276071f45e9",
          ScreenDataUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/366a51e6-c6fe-4d34-a124-9276071f45e9",
          TurnControlUrl: "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
          ScreenSharingUrl:
            "wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/366a51e6-c6fe-4d34-a124-9276071f45e9",
          AudioHostUrl:
            "7e77e1c719b870eebe6cf768411c5232.k.m1.ue1.app.chime.aws:3478",
          SignalingUrl:
            "wss://signal.m1.ue1.app.chime.aws/control/366a51e6-c6fe-4d34-a124-9276071f45e9",
        },
        ExternalMeetingId: "1ptCesRnBsNMStOsFl4YeCTySBT",
      },
    },
    meetingType: "video",
    streamId: "370035c0-8731-11eb-9984-c55b47b39d99",
    sessionId: "1ptCesRnBsNMStOsFl4YeCTySBT",
    sessionStart: "2021-03-17T12:30:00",
    sessionEnd: "2021-03-17T13:00:00",
    sessionName: "test chat",
  },
];

export default meetings;
