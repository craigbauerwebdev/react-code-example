import * as useToggleDisplayMQ from "hooks/useToggleDisplayMQ";

import AttendeeListBody from "../AttendeeListBody";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

jest.mock("../scss/attendee-list.module.scss", () => ({
  attendeeListStyles: () => "",
}));

jest.mock("Components/Profile/ProfileAvatar", () => "ProfileAvatar");

const spy = jest.spyOn(useToggleDisplayMQ, "default");
spy.mockReturnValue({
  isMobile: false,
});

describe("Test Schedule", () => {
  const data = [
    {
      fuzionEventId: "11EB34BFE04099A0B49459260BA52E41",
      fuzionAttendeeId: "11EB764DAE8911B0B59B3F124C9BCC0D",
      name: "EAOne AAACo",
      firstName: "EAOne",
      lastName: "AAACo",
      preferredName: "",
      avatar: "",
      company: "AAA Company",
      companyId: "11EB764B4A07EBF09E50BD7CA8CCCE3B",
      attributes: {},
      onlineStatus: "offline",
      title: "Sales Associate",
      networking: {
        boothStaff: {
          BOOL: true,
        },
        allowChat: {
          BOOL: true,
        },
        allowUserNetworking: {
          BOOL: true,
        },
        networkingAdmin: {
          BOOL: false,
        },
        exhibitorAdmin: {
          BOOL: false,
        },
        allowNetworking: {
          BOOL: true,
        },
        isVIP: {
          BOOL: false,
        },
      },
      viewInNetworking: false,
      objectID: "11EB764DAE8911B0B59B3F124C9BCC0D",
      _highlightResult: {
        name: {
          value: "EAOne AAACo",
          matchLevel: "none",
          matchedWords: [],
        },
        firstName: {
          value: "EAOne",
          matchLevel: "none",
          matchedWords: [],
        },
        lastName: {
          value: "AAACo",
          matchLevel: "none",
          matchedWords: [],
        },
        preferredName: {
          value: "",
          matchLevel: "none",
          matchedWords: [],
        },
        company: {
          value: "AAA Company",
          matchLevel: "none",
          matchedWords: [],
        },
        companyId: {
          value: "11EB764B4A07EBF09E50BD7CA8CCCE3B",
          matchLevel: "none",
          matchedWords: [],
        },
        onlineStatus: {
          value: "offline",
          matchLevel: "none",
          matchedWords: [],
        },
        title: {
          value: "Sales Associate",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
    {
      fuzionEventId: "11EB34BFE04099A0B49459260BA52E41",
      fuzionAttendeeId: "11EB764D8AFA4930B59B3F124C9BCC0D",
      name: "ERFive AAACo",
      firstName: "ERFive",
      lastName: "AAACo",
      preferredName: "",
      avatar: "",
      company: "AAA Company",
      companyId: "11EB764B4A07EBF09E50BD7CA8CCCE3B",
      attributes: {},
      title: "Sr Sales Advisor",
      networking: {
        boothStaff: {
          BOOL: true,
        },
        allowChat: {
          BOOL: true,
        },
        allowUserNetworking: {
          BOOL: true,
        },
        networkingAdmin: {
          BOOL: false,
        },
        exhibitorAdmin: {
          BOOL: false,
        },
        allowNetworking: {
          BOOL: true,
        },
        isVIP: {
          BOOL: false,
        },
      },
      viewInNetworking: false,
      objectID: "11EB764D8AFA4930B59B3F124C9BCC0D",
      _highlightResult: {
        name: {
          value: "ERFive AAACo",
          matchLevel: "none",
          matchedWords: [],
        },
        firstName: {
          value: "ERFive",
          matchLevel: "none",
          matchedWords: [],
        },
        lastName: {
          value: "AAACo",
          matchLevel: "none",
          matchedWords: [],
        },
        preferredName: {
          value: "",
          matchLevel: "none",
          matchedWords: [],
        },
        company: {
          value: "AAA Company",
          matchLevel: "none",
          matchedWords: [],
        },
        companyId: {
          value: "11EB764B4A07EBF09E50BD7CA8CCCE3B",
          matchLevel: "none",
          matchedWords: [],
        },
        title: {
          value: "Sr Sales Advisor",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
  ];
  const handleChatClick = jest.fn();
  const handleClick = jest.fn();
  const handleProfileClick = jest.fn();
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
    },
    profile: {
      blockedByUsers: [],
    },
  });

  it("AttendeeListBody Test", () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <AttendeeListBody
          data={data}
          handleChatClick={handleChatClick}
          handleClick={handleClick}
          handleProfileClick={handleProfileClick}
        />
      </Provider>
    );
    expect(wrapper.find("OEPAnalytics").get(1).props.url).toBe(
      "Schedule a meeting"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
