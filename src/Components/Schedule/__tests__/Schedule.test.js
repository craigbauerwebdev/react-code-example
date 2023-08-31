import * as reactModule from "react";

import { Provider } from "react-redux";
import React from "react";
import Schedule from "../Schedule";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

jest.mock("../scss/schedule-page.module.scss", () => ({
  scheduleStyles: () => "",
}));

jest.mock("../ScheduleList", () => "ScheduleList");

jest.mock("../../Profile/CreateMeetingModal", () => "CreateMeetingModal");

describe("Test Schedule", () => {
  let setNoData;
  let setDisplayPage;
  let setShowMeetingModal;
  let setDefaultListSet;
  let setFetchDone;
  let setSortedSchedule;
  let setFilterTypes;
  let setCurrentMeetingList;
  let setUserMeetingIds;
  let setMeetingsChanged;
  const mFilter = false;

  const mockStore = createStore((state) => state, {
    global: {
      user: {
        registration_timestamp: null,
        registration_number: "100001",
        booth_staff_flag: null,
        registration_complete_flag: null,
        fuzion_event_id: "11EB34BFE04099A0B49459260BA52E41",
        registration_status_flag: "Confirmed",
        custom_attributes:
          '[{"GripOptIn":"Yes","Interests":"Digital","professional_category":"Technology","hasSeenWelcomeVideo":"Yes","hasSeenPersonaModal":true}]',
        occupation_type: null,
        create_timestamp: "2020-12-22T13:05:15.350Z",
        contact: {
          email_two: null,
          primary_contact_flag: null,
          linkedin_account: null,
          name_suffix: null,
          last_name: "Test",
          middle_name: null,
          title: "Executive",
          facebook_account: null,
          fax_number: null,
          snapchat_account: null,
          name_prefix: null,
          contact_type: null,
          website_url: null,
          twitter_account: null,
          other_phone_number: null,
          instagram_account: null,
          phone_number: "555-555-5555",
          company: "Freeman",
          mobile_number: null,
          first_name: "Freeman",
          email: "testuser@freeman.com",
          preferred_name: null,
        },
        first_time_flag: null,
        fuzion_exhibitor_id: null,
        membership_type: null,
        fuzion_attendee_id: "11EB445655439220BE6C13988A7BDB55",
        networking_opt_in_flag: null,
        address: {
          country: "US",
          address_line_three: null,
          address_type: null,
          city: "Dallas",
          address_line_two: "Suite 100",
          postal_code_plus_four: null,
          state_province: "Texas",
          primary_address_flag: null,
          address_line_one: "1600 Viceroy Drive",
          postal_code: "12345",
        },
        fuzion_parent_attendee_id: "11EB449179A0A550B5D1F5C7DF9DDB27",
        membership_flag: null,
        badge_number: "100001",
        attendee_type_flag: "Attendee",
        attended_last_event_flag: null,
        last_mod_timestamp: "2021-06-21T04:15:06.973Z",
        attendee_arrival_timestamp: null,
        analytics_opt_in_flag: null,
        website_url: null,
        registration_method_flag: "Self-Registration",
        attendance_verification_flag: 1,
        exhibitor_company_id: "11EB449179A0A550B5D1F5C7DF9DDB27",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTFFQjQ0NTY1NTQzOTIyMEJFNkMxMzk4OEE3QkRCNTUifQ.5cLZW0IOs2gnUJG6Qs9u8kH-N5v0qkksQyBCNtWRN_0",
      },
      permissions: {
        allowNotifications: true,
        allowNetworking: true,
        allowScheduleMeetings: true,
        allowScheduleMeetingsAttendeeToAttendee: true,
        allowScheduleMeetingsExhibitorToAttendee: true,
        blockedProfileRoutes: [
          {
            component: "availability",
            link: "/account/availability",
          },
        ],
        showSettingsNetworkingOptions: true,
        showSettingsManageMyOptions: true,
        allowDirectChatAccess: true,
        allowVideoChatAccess: true,
        blockedNetworkRoutes: [],
        boothStaff: false,
        allowUserNetworking: true,
      },
      sessionsData: [],
      showcaseSessions: [],
    },
    filters: {
      filteredSchedule: [
        {
          sessionId: 19759870,
          eventId: 2972,
          sponsorId: 846830,
          clientSessionId: "120",
          sessionName:
            "Should you consider a host for your next live virtual event - US",
          description:
            "A host can make or break your virtual event. Learn how to choose the best ones and use them effectively. ",
          sessionTrack: "Content",
          isDeleted: false,
          sessionStart: "2021-11-25T11:00:00",
          sessionEnd: "2021-11-25T23:30:00",
          sessionCustom1:
            "You may not want to admit it to yourself, but your CEO or senior executive may not be the best host for your next event. Set an engaging tone both literally and figuratively for your next event by hiring a professional host. Learn how they do not just tell a corny joke, but also how they move the show along and turn a dull panel into a riveting interview.",
          sessionCustom2: null,
          sessionCustom3: "ls_embed_1588356975,9094134",
          sessionCustom4: "2021-10-28T10:00:00|2021-11-10T00:00:00|Post Event",
          sessionCustom5: null,
          sessionCustom6: null,
          interactionKey: "dm0vk71p",
          sessionVideoSource: "ls_embed_1610723764,9487628",
          sessionSurveyLink: "https://www.proprofs.com/survey/t/?title=v9j79",
          sessionExternalLink:
            "https://www.freeman.com/solutions/by-expertise/digital",
          sessionCmelink: "https://www.merriam-webster.com/dictionary/CME",
          secondaryTrack: "Virtual Events",
          keywords: "English",
          groupMeetingLink: null,
          featuredSession: true,
          sessionFormat: {
            sessionFormatId: 1,
            sessionFormatName: "RoomInPerson",
          },
          sessionFormatId: 1,
          eventRoom: {
            roomId: 1512767,
            roomName: "Room A1",
            displayName: "Room A1",
          },
          moderators: [
            {
              username: "80adbde44cad9540cdc15b4555b10517588277c0",
              email: "80adbde44cad9540cdc15b4555b10517588277c0",
              firstName: "Dörte",
              middleName: null,
              lastName: "Smith",
              suffix: "",
              degree: "MD",
              organization: "Instantfest - 2",
              isVip: true,
              userBioText:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              headShotUrl:
                "https://orchoepfiles.blob.core.windows.net/profile-photos/oepproduct2021%2Fdarren.-smith%40email.non.jpg?1618599307416",
              disclosureText:
                '<p class="MsoNormal"><b>2010-2015 - Lorem\nipsum dolor sit<o:p></o:p></b></p>\n\n<p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\ndo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.<o:p></o:p></p>\n\n<p class="MsoNormal"><b>2015-2020- deserunt\nmollit anim id est laborum.<o:p></o:p></b></p>\n\n<p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed\ndo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim\nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.<o:p></o:p></p>',
              eventUserCustom1: "",
              eventUserCustom2: null,
              eventUserCustom3: null,
              eventUserCustom4: "07/08/2021 01:03 am",
              eventUserCustom5: "",
              preferredName: "Darren",
              title: "President",
              city: "Dallas",
              state: "TX",
              country: "United States",
              userUrl: "www.freeman.com",
              prefix: "Dr.",
              socialMediaTypes: [
                {
                  socialMediaTypeId: 1,
                  url: "https://www.facebook.com/freemanfans",
                },
                {
                  socialMediaTypeId: 2,
                  url: "https://www.instagram.com/freemancompany/",
                },
                {
                  socialMediaTypeId: 3,
                  url: "https://www.linkedin.com/company/the-freeman-company/",
                },
                {
                  socialMediaTypeId: 4,
                  url: "https://twitter.com/freemanco",
                },
              ],
              eventUserId: "dd7f5aca-741b-43b6-951f-1a2d4bd6a1ba",
            },
          ],
          moderatorFiles: null,
          subSessions: [
            {
              clientSubSessionId: "1022",
              subSessionId: 25584125,
              eventId: 2972,
              subSessionName: "Finding the Right Host",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              startTime: "2021-11-25T11:00:00",
              endTime: "2021-11-25T23:30:00",
              isDeleted: false,
              subSessionCustom1:
                "I am certain that after the dust of centuries has passed over our cities, we, too, will be remembered not for victories or defeats in battle or in politics, but for our contribution to the human spirit.",
              subSessionCustom2: null,
              subSessionCustom3: "",
              subSessionCustom4: null,
              subSessionCustom5: null,
              subSessionCustom6: null,
              subSessionType: "Lab",
              subSessionOrder: 1,
              subSessionVideoSource: null,
              subSurveyUrl: null,
              subExternalUrl: null,
              subInteractionKey: null,
              presentationFiles: [
                {
                  presentationFileId: 40168858,
                  fileName: "16.pdf",
                  filePath:
                    "EventFiles\\oepproduct2021\\PresentationFiles\\Uploads\\19759870\\25584125\\16.pdf",
                  isHandOutFile: false,
                  isDeleted: false,
                  dateCreated: "0001-01-01T00:00:00",
                  isStartupFile: false,
                  status: "Pending",
                },
              ],
              presenters: [
                {
                  username: "42d874eeb7ea2dd58023f242486484d81d7c8962",
                  email: "42d874eeb7ea2dd58023f242486484d81d7c8962",
                  firstName: "Domenic",
                  middleName: null,
                  lastName: "Hemmer",
                  suffix: "Ph.D",
                  degree: "",
                  organization: "Primary Agenda",
                  isVip: true,
                  userBioText:
                    "Domenic Hemmer is the technology vice president of the Primary Agenda, a global leader in Latin American governance and strategy. He co-founded LATX, the first Latin American destination management investment group in the US, and Bolivarian Ventures, one of the most significant South American technology funds. He and his staff are offering infrastructure and strategies on government concerns, encouraging companies and brands to make practical, pioneering digital commitments to customized support.",
                  headShotUrl:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/DomenicHemmer.jpg",
                  disclosureText:
                    '<p class="MsoNormal"><span style="font-weight: bolder;">2010-2015 - Lorem ipsum dolor sit<o:p></o:p></span></p><p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<o:p></o:p></p><p class="MsoNormal"><span style="font-weight: bolder;">2015-2020- deserunt mollit anim id est laborum.<o:p></o:p></span></p><p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                  eventUserCustom1:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/DomenicHemmer.jpg",
                  eventUserCustom2:
                    "Domenic Hemmer is the technology vice president of the Primary Agenda, a global leader in Latin American governance and strategy. He co-founded LATX, the first Latin American destination management investment group in the US, and Bolivarian Ventures, one of the most significant South American technology funds. He and his staff are offering infrastructure and strategies on government concerns, encouraging companies and brands to make practical, pioneering digital commitments to customized support.",
                  eventUserCustom3:
                    "Our mission at Primary Agenda is to prepare and implement your dream of ingenuity, imagination and originality so that your visitors are left with an unending impression.",
                  eventUserCustom4: "07/17/2021 05:00 am",
                  eventUserCustom5: "https://twitter.com/FreemanCo",
                  preferredName: null,
                  title: null,
                  city: "Dallas",
                  state: "TX",
                  country: "United States",
                  userUrl: "www.freeman.com",
                  prefix: "Mr.",
                  socialMediaTypes: null,
                  eventUserId: "9f02a93b-e8b0-49e6-b730-cf97dcc8c0d8",
                  fullName: "Domenic Hemmer",
                  subSessionId: 25584125,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  subSessionName: "Finding the Right Host",
                  subSessionType: "Lab",
                  sessionId: 19759870,
                },
              ],
              sessionId: 19759870,
              sessionName:
                "Should you consider a host for your next live virtual event - US",
              sessionType: {
                sessionTypeId: 1088384,
                sessionTypeName: "Livestream",
              },
              sessionTrack: "Content",
              sessionStart: "2021-11-25T11:00:00",
              sessionEnd: "2021-11-25T23:30:00",
            },
            {
              clientSubSessionId: "1023",
              subSessionId: 25584126,
              eventId: 2972,
              subSessionName: "The Dangers of Not Using a Host",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              startTime: "2021-11-25T11:00:00",
              endTime: "2021-11-25T23:30:00",
              isDeleted: false,
              subSessionCustom1:
                "To further the appreciation of culture among all the people, to increase respect for the creative individual, to widen participation by all the processes and fulfilments of art - this is one of the fascinating challenges of these days.",
              subSessionCustom2: null,
              subSessionCustom3: "",
              subSessionCustom4: null,
              subSessionCustom5: null,
              subSessionCustom6: null,
              subSessionType: "Keynote",
              subSessionOrder: 1,
              subSessionVideoSource: null,
              subSurveyUrl: null,
              subExternalUrl: null,
              subInteractionKey: null,
              presentationFiles: null,
              presenters: [
                {
                  username: "6aa68b704f967297138da487b39c4a729ef871c1",
                  email: "6aa68b704f967297138da487b39c4a729ef871c1",
                  firstName: "Russell",
                  middleName: null,
                  lastName: "Smith",
                  suffix: "",
                  degree: "MD",
                  organization: "EventTitan",
                  isVip: false,
                  userBioText: null,
                  headShotUrl:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/IMG_E1109.JPG",
                  disclosureText:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/IMG_E1109.JPG",
                  eventUserCustom1:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/IMG_E1109.JPG",
                  eventUserCustom2: null,
                  eventUserCustom3: null,
                  eventUserCustom4: "Thursday",
                  eventUserCustom5: "https://twitter.com/FreemanCo",
                  preferredName: null,
                  title: null,
                  city: "Dallas",
                  state: "TX",
                  country: "United States",
                  userUrl: "www.freeman.com",
                  prefix: null,
                  socialMediaTypes: null,
                  eventUserId: "bbea4585-9864-4c31-8007-cbddfb5bb883",
                  fullName: "Russell Smith",
                  subSessionId: 25584126,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  subSessionName: "The Dangers of Not Using a Host",
                  subSessionType: "Keynote",
                  sessionId: 19759870,
                },
              ],
              sessionId: 19759870,
              sessionName:
                "Should you consider a host for your next live virtual event - US",
              sessionType: {
                sessionTypeId: 1088384,
                sessionTypeName: "Livestream",
              },
              sessionTrack: "Content",
              sessionStart: "2021-11-25T11:00:00",
              sessionEnd: "2021-11-25T23:30:00",
            },
          ],
          sessionType: {
            sessionTypeId: 1088384,
            sessionTypeName: "Livestream",
          },
          filterKey: "scheduleSession",
          order: 0,
        },
        {
          sessionId: 19759861,
          eventId: 2972,
          sponsorId: 846830,
          clientSessionId: "100",
          sessionName:
            "Vimeo Live Recurring - Create engaging interactions with your live and virtual audiences",
          description:
            "Learn how to craft experiences that will leave your audiences wanting more. ",
          sessionTrack: "Audience Interaction",
          isDeleted: false,
          sessionStart: "2021-11-26T07:00:00",
          sessionEnd: "2021-11-26T19:00:00",
          sessionCustom1: "",
          sessionCustom2: null,
          sessionCustom3: "",
          sessionCustom4: null,
          sessionCustom5: null,
          sessionCustom6: null,
          interactionKey: "kpniosoy",
          sessionVideoSource: "543563",
          sessionSurveyLink: "https://www.proprofs.com/survey/t/?title=bobte",
          sessionExternalLink:
            "https://www.freeman.com/solutions/by-expertise/digital",
          sessionCmelink: "https://www.merriam-webster.com/dictionary/CME",
          secondaryTrack: "Virtual Events",
          keywords: "English",
          groupMeetingLink: null,
          featuredSession: false,
          sessionFormat: {
            sessionFormatId: 1,
            sessionFormatName: "RoomInPerson",
          },
          sessionFormatId: 1,
          eventRoom: {
            roomId: 1512767,
            roomName: "Room A1",
            displayName: "Room A1",
          },
          moderators: [
            {
              username: "8c638c2e28bf551d5ad214bed9f8403a5aaa5678",
              email: "8c638c2e28bf551d5ad214bed9f8403a5aaa5678",
              firstName: "Elissa",
              middleName: null,
              lastName: "Ewers",
              suffix: "",
              degree: "",
              organization: "",
              isVip: false,
              userBioText: null,
              headShotUrl: null,
              disclosureText: null,
              eventUserCustom1: null,
              eventUserCustom2: null,
              eventUserCustom3: null,
              eventUserCustom4:
                " https://www.linkedin.com/company/the-freeman-company/",
              eventUserCustom5: "https://twitter.com/FreemanCo",
              preferredName: null,
              title: null,
              city: "Dallas",
              state: "TX",
              country: "United States",
              userUrl: "www.freeman.com",
              prefix: null,
              socialMediaTypes: null,
              eventUserId: "60718b81-3b7b-4946-96f5-66b5b93ab78f",
            },
          ],
          moderatorFiles: null,
          subSessions: [
            {
              clientSubSessionId: "1000",
              subSessionId: 25584048,
              eventId: 2972,
              subSessionName: "Getting the most out of your Q and A",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              startTime: "2021-11-26T07:00:00",
              endTime: "2021-11-26T19:00:00",
              isDeleted: false,
              subSessionCustom1: "",
              subSessionCustom2: null,
              subSessionCustom3: "",
              subSessionCustom4: null,
              subSessionCustom5: null,
              subSessionCustom6: null,
              subSessionType: "General Session",
              subSessionOrder: 1,
              subSessionVideoSource: null,
              subSurveyUrl: null,
              subExternalUrl: null,
              subInteractionKey: null,
              presentationFiles: [
                {
                  presentationFileId: 40168860,
                  fileName: "18.pdf",
                  filePath:
                    "EventFiles\\oepproduct2021\\PresentationFiles\\Uploads\\19759861\\25584048\\18.pdf",
                  isHandOutFile: false,
                  isDeleted: false,
                  dateCreated: "0001-01-01T00:00:00",
                  isStartupFile: false,
                  status: "Pending",
                },
              ],
              presenters: [
                {
                  username: "fac4b681844ae925eea2e41daf117c188871d889",
                  email: "fac4b681844ae925eea2e41daf117c188871d889",
                  firstName: "Amanda",
                  middleName: null,
                  lastName: "Cartland",
                  suffix: "Ph.D",
                  degree: "MD",
                  organization: "Anyfest",
                  isVip: true,
                  userBioText:
                    "Amanda is an award-winning event design strategist with various and numerous background inside the appearing arts and the shipping of large-scale conferences. With a Bachelor of Arts in Music from Boston University, Amanda blends art and technological know-how in all her work. With over 15 years in the occasion industry, Amanda has taken the leading position in pushing the bounds for crafting impactful reviews for organizations and their participants. In her new function, Amanda has developed new strategies for delivering deep human-to-human engagement. Amanda is also a Visionary Awards Event Designer of the Year Finalist. Amanda sits on the Board of Directors serves at the Visit NYC Customer Advisory Board. Amanda is a passionate artist and mom.",
                  headShotUrl:
                    "https://orchoepfiles.blob.core.windows.net/profile-photos/oepproduct2021%2FAmanda.Cartland%40mail.non.jpg?1614981045100",
                  disclosureText:
                    '<p class="MsoNormal"><span style="font-weight: bolder;">2010-2015 - Lorem ipsum dolor sit<o:p></o:p></span></p><p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<o:p></o:p></p><p class="MsoNormal"><span style="font-weight: bolder;">2015-2020- deserunt mollit anim id est laborum.<o:p></o:p></span></p><p class="MsoNormal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                  eventUserCustom1:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/AmandaCartland.jpg",
                  eventUserCustom2:
                    "Amanda is an award-winning event design strategist with various and numerous background inside the appearing arts and the shipping of large-scale conferences. With a Bachelor of Arts in Music from Boston University, Amanda blends art and technological know-how in all her work. With over 15 years in the occasion industry, Amanda has taken the leading position in pushing the bounds for crafting impactful reviews for organizations and their participants. In her new function, Amanda has developed new strategies for delivering deep human-to-human engagement. Amanda is also a Visionary Awards Event Designer of the Year Finalist. Amanda sits on the Board of Directors serves at the Visit NYC Customer Advisory Board. Amanda is a passionate artist and mom.",
                  eventUserCustom3:
                    "Anyfest brings innovation and imagination to live audiences by creating meaningful festivals that change the world.",
                  eventUserCustom4: "07/17/2021 06:00 am",
                  eventUserCustom5: "https://twitter.com/FreemanCo",
                  preferredName: null,
                  title: null,
                  city: "Dallas",
                  state: "TX",
                  country: "United States",
                  userUrl: "www.freeman.com",
                  prefix: "Mrs.",
                  socialMediaTypes: null,
                  eventUserId: "a1d55a12-ebe2-444e-ad69-98ccb2a1a9d0",
                  fullName: "Amanda Cartland",
                  subSessionId: 25584048,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  subSessionName: "Getting the most out of your Q and A",
                  subSessionType: "General Session",
                  sessionId: 19759861,
                },
              ],
              sessionId: 19759861,
              sessionName:
                "Vimeo Live Recurring - Create engaging interactions with your live and virtual audiences",
              sessionType: {
                sessionTypeId: 1088384,
                sessionTypeName: "Livestream",
              },
              sessionTrack: "Audience Interaction",
              sessionStart: "2021-11-26T07:00:00",
              sessionEnd: "2021-11-26T19:00:00",
            },
            {
              clientSubSessionId: "1001",
              subSessionId: 25584049,
              eventId: 2972,
              subSessionName:
                "Powerpoints that Won't Put Your Audience to Sleep",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              startTime: "2021-11-26T07:00:00",
              endTime: "2021-11-26T19:00:00",
              isDeleted: false,
              subSessionCustom1: "",
              subSessionCustom2: "",
              subSessionCustom3: "",
              subSessionCustom4: null,
              subSessionCustom5: null,
              subSessionCustom6: null,
              subSessionType: "Lab",
              subSessionOrder: 1,
              subSessionVideoSource: null,
              subSurveyUrl: null,
              subExternalUrl: null,
              subInteractionKey: null,
              presentationFiles: [
                {
                  presentationFileId: 40168861,
                  fileName: "19.pdf",
                  filePath:
                    "EventFiles\\oepproduct2021\\PresentationFiles\\Uploads\\19759861\\25584049\\19.pdf",
                  isHandOutFile: false,
                  isDeleted: false,
                  dateCreated: "0001-01-01T00:00:00",
                  isStartupFile: false,
                  status: "Pending",
                },
              ],
              presenters: [
                {
                  username: "5e8ee1accea6aa44ba2088652ed4e7bf912c2aa8",
                  email: "5e8ee1accea6aa44ba2088652ed4e7bf912c2aa8",
                  firstName: "孙",
                  middleName: null,
                  lastName: "腾起",
                  suffix: "",
                  degree: "MD",
                  organization: "Anyfest",
                  isVip: false,
                  userBioText: "????????????????",
                  headShotUrl:
                    "https://orchteststorage.blob.core.windows.net/fuzion-confex-changes/Elissa-Color.jpg",
                  disclosureText:
                    '<p class="MsoNormal"><span style="color: rgb(77, 81, 86); font-family: arial, sans-serif;">?????? ??????????????????????</span><br></p><p class="MsoNormal"><br></p>',
                  eventUserCustom1: "",
                  eventUserCustom2: null,
                  eventUserCustom3: null,
                  eventUserCustom4: "",
                  eventUserCustom5: "",
                  preferredName: null,
                  title: "Simplified Chinese",
                  city: "Dallas",
                  state: "TX",
                  country: "United States",
                  userUrl: "www.freeman.com",
                  prefix: "heather smith old name",
                  socialMediaTypes: null,
                  eventUserId: "b71ede07-9354-429a-84ae-9d246f172a10",
                  fullName: "孙 腾起",
                  subSessionId: 25584049,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  subSessionName:
                    "Powerpoints that Won't Put Your Audience to Sleep",
                  subSessionType: "Lab",
                  sessionId: 19759861,
                },
              ],
              sessionId: 19759861,
              sessionName:
                "Vimeo Live Recurring - Create engaging interactions with your live and virtual audiences",
              sessionType: {
                sessionTypeId: 1088384,
                sessionTypeName: "Livestream",
              },
              sessionTrack: "Audience Interaction",
              sessionStart: "2021-11-26T07:00:00",
              sessionEnd: "2021-11-26T19:00:00",
            },
          ],
          sessionType: {
            sessionTypeId: 1088384,
            sessionTypeName: "Livestream",
          },
          filterKey: "scheduleSession",
          order: 0,
        },
      ],
      fuzzySearchResult: [],
      searchTerm: [],
      fuzzySearching: [],
      filtersFullList: [],
    },
    profile: {
      schedule: {},
      isEditing: {},
      declinedMeetings: [],
      meetings: [],
      blockedByUsers: [],
    },
  });

  beforeEach(() => {});

  it("test without crashing", () => {
    setSortedSchedule = jest.fn((sortedSchedule) => {});
    setDisplayPage = jest.fn((displayPage) => {});
    setShowMeetingModal = jest.fn((showMeetingModal) => {});
    setFilterTypes = jest.fn((filterTypes) => {});
    setCurrentMeetingList = jest.fn((currentMeetingList) => {});
    setUserMeetingIds = jest.fn((userMeetingIds) => {});
    setNoData = jest.fn((noData) => {});
    setDefaultListSet = jest.fn((defaultListSet) => {});
    setFetchDone = jest.fn((fetchDone) => {});

    setMeetingsChanged = jest.fn((meetingsChanged) => {});
    reactModule.useState = jest
      .fn()
      .mockImplementationOnce((sortedSchedule) => [
        (sortedSchedule = []),
        setSortedSchedule,
      ])
      .mockImplementationOnce((displayPage) => [
        (displayPage = true),
        setDisplayPage,
      ])
      .mockImplementationOnce((showMeetingModal) => [
        (showMeetingModal = false),
        setShowMeetingModal,
      ])
      .mockImplementationOnce((filterTypes) => [
        (filterTypes = []),
        setFilterTypes,
      ])
      .mockImplementationOnce((currentMeetingList) => [
        (currentMeetingList = []),
        setCurrentMeetingList,
      ])
      .mockImplementationOnce((userMeetingIds) => [
        (userMeetingIds = []),
        setUserMeetingIds,
      ])
      .mockImplementationOnce((noData) => [(noData = true), setNoData])
      .mockImplementationOnce((defaultListSet) => [
        (defaultListSet = false),
        setDefaultListSet,
      ])
      .mockImplementationOnce((fetchDone) => [(fetchDone = true), setFetchDone])
      .mockImplementationOnce((meetingsChanged) => [
        (meetingsChanged = false),
        setMeetingsChanged,
      ]);
    const wrapper = mount(
      <Provider store={mockStore}>
        <Schedule mobileFilter={mFilter} />
      </Provider>
    );
    expect(wrapper.find("OEPAnalytics").get(0).props.url).toBe(
      "Schedule a meeting modal open"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
