import * as useGuestProfiles from "hooks/useGuestProfiles";
import * as useSearch from "hooks/useSearch";
import * as useWindowDimensions from "hooks/useWindowDimensions";

import CreateMeetingModal from "../CreateMeetingModal";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");
jest.mock("Components/LinkWrapper/LinkWrapper", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <div>{children}</div>;
    },
  };
});

const spySearch = jest.spyOn(useSearch, "default");
spySearch.mockReturnValue({
  searchState: {},
  dispatchSearchState: jest.fn(),
});

const spyWindowDimension = jest.spyOn(useWindowDimensions, "default");
spyWindowDimension.mockReturnValue({
  width: 300,
  height: 400,
});

const spyGuestProfiles = jest.spyOn(useGuestProfiles, "default");
spyGuestProfiles.mockReturnValue({
  loadProfiles: {},
  listWithGuestProfileData: {},
});

jest.mock("hooks/useAlgoliaSetting", () => jest.fn());
jest.mock("hooks/useGuestProfiles", () => jest.fn());
jest.mock("hooks/useWindowDimensions", () => jest.fn());
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: () => {},
}));

describe("Define mockstore", () => {
  let wrapper;
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  }));

  let setDisableEdit = jest.fn((disableEdit) => {});
  let setMeetingActionType = jest.fn((meetingActionType) => {});
  let setIsSuccess = jest.fn((isSuccess) => {});
  let setErrorModal = jest.fn((errorModal) => {});
  let setIsLoading = jest.fn((isLoading) => {});
  let setError = jest.fn((error) => {});
  let setTitleError = jest.fn((titleError) => {});
  let setLimitErrorMessage = jest.fn((limitErrorMessage) => {});
  let setEditMeetingOriginalAttendees = jest.fn(
    (editMeetingOriginalAttendees) => {}
  );
  let setDeletedAttendees = jest.fn((deletedAttendees) => {});
  let setHostHasChanged = jest.fn((hostHasChanged) => {});
  let setInviteeError = jest.fn((inviteeError) => {});
  let setInviteeErrorMsg = jest.fn((inviteeErrorMsg) => {});
  let setTierLeveLData = jest.fn((tierLeveLData) => {});
  React.useState = jest
    .fn()
    .mockImplementationOnce((disableEdit) => [
      (disableEdit = null),
      setDisableEdit,
    ])
    .mockImplementationOnce((meetingActionType) => [
      (meetingActionType = null),
      setMeetingActionType,
    ])
    .mockImplementationOnce((isSuccess) => [(isSuccess = null), setIsSuccess])
    .mockImplementationOnce((errorModal) => [
      (errorModal = null),
      setErrorModal,
    ])
    .mockImplementationOnce((isLoading) => [(isLoading = false), setIsLoading])
    .mockImplementationOnce((error) => [(error = null), setError])
    .mockImplementationOnce((titleError) => [
      (titleError = null),
      setTitleError,
    ])
    .mockImplementationOnce((limitErrorMessage) => [
      (limitErrorMessage = null),
      setLimitErrorMessage,
    ])
    .mockImplementationOnce((editMeetingOriginalAttendees) => [
      (editMeetingOriginalAttendees = null),
      setEditMeetingOriginalAttendees,
    ])
    .mockImplementationOnce((deletedAttendees) => [
      (deletedAttendees = null),
      setDeletedAttendees,
    ])
    .mockImplementationOnce((hostHasChanged) => [
      (hostHasChanged = null),
      setHostHasChanged,
    ])
    .mockImplementationOnce((inviteeError) => [
      (inviteeError = null),
      setInviteeError,
    ])
    .mockImplementationOnce((inviteeErrorMsg) => [
      (inviteeErrorMsg = ""),
      setInviteeErrorMsg,
    ])
    .mockImplementationOnce((tierLeveLData) => [
      (tierLeveLData = null),
      setTierLeveLData,
    ]);

  const mockStore = createStore((state) => state, {
    global: {
      user: {},
      permissions: {
        allowNotifications: true,
        allowNetworking: true,
        allowScheduleMeetings: true,
        allowScheduleMeetingsAttendeeToAttendee: false,
        allowScheduleMeetingsExhibitorToAttendee: false,
        blockedProfileRoutes: [
          {
            component: "product showcase setup",
            link: "/account/product-showcase-setup",
          },
          {
            component: "Exhibitor Management",
            link: "Exhibitor Management",
          },
          {
            component: "representative setup",
            link: "/account/representative-setup",
          },
          {
            component: "product showcase setup",
            link: "/account/product-showcase-setup",
          },
          {
            component: "availability",
            link: "/account/availability",
          },
        ],
        showSettingsNetworkingOptions: true,
        showSettingsManageMyOptions: false,
        allowDirectChatAccess: false,
        allowVideoChatAccess: false,
        blockedNetworkRoutes: [
          {
            link: "/networking/showcases",
          },
        ],
        boothStaff: false,
        allowUserNetworking: true,
      },
      networkSettings: {
        tierNames: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
        allowedNetworkingTimes: [
          {
            date: "",
            times: [
              {
                from: "",
                to: "",
              },
            ],
          },
        ],
        enableNotifications: true,
        eventNetworking: true,
        networkingDates: {
          from: "2021-12-31T05:38:42.209Z",
          to: "2022-04-30T05:38:42.000Z",
        },
        eventMeetingTimes: {
          from: "09:00AM",
          to: "05:00PM",
        },
        networkingMeetings: {
          userTypeMeetings: {
            attendeePendingMeetings: 99,
            attendeeToAttendee: true,
            exhibitorToExhibitor: true,
            exhibitorToAttendee: true,
            exhibitorPendingMeetings: 999,
          },
          modifyExhibitorTierNetwork: false,
          tiers: [
            {
              productShowcaseLimit: 999,
              tierName: "Tier 1",
              chat: true,
              videoChat: true,
              productShowcase: true,
              inPerson: false,
              pendingMeetingsExhibitor: 999,
            },
            {
              productShowcaseLimit: 999,
              tierName: "Tier 2",
              chat: true,
              videoChat: true,
              productShowcase: true,
              inPerson: false,
              pendingMeetingsExhibitor: 999,
            },
          ],
          meetingFormats: {
            productShowcaseLimit: 999,
            roundTables: false,
            chat: false,
            watchParty: false,
            videoChat: true,
            productShowcase: true,
            inPerson: false,
          },
        },
        meetingTimes: [
          {
            date: "2022-04-29T05:38:42.209Z",
            from: "09:00AM",
            to: "05:00PM",
          },
          {
            date: "2022-04-30T05:38:42.209Z",
            from: "09:00AM",
            to: "05:00PM",
          },
        ],
        blockedTimes: [
          {
            date: "",
            times: [
              {
                fromAmOrPm: "",
                toMinutes: "",
                fromHour: "",
                fromMinutes: "",
                toAmOrPm: "",
                message: "",
                toHour: "",
              },
            ],
          },
        ],
        boothStaff: false,
        allowChat: true,
        exhibitorAdmin: false,
        allowNetworking: true,
        allowUserNetworking: true,
      },
      timezone: "Asia/Calcutta",
    },
    profile: {
      accountProfile: {},
      blockedByUsers: {},
      guestProfiles: {},
      algoliaSearchIndex: {
        attendeeData: {
          transporter: {
            hostsCache: {},
            logger: {},
            requester: {},
            requestsCache: {},
            responsesCache: {},
            timeouts: {
              connect: 1,
              read: 2,
              write: 30,
            },
            userAgent: {
              value: "Algolia for JavaScript (4.8.6); Browser",
            },
            headers: {
              "x-algolia-api-key": "cb9a163beffdbc40a6087cad9164ed2c",
              "x-algolia-application-id": "72HX1I220S",
              "content-type": "application/x-www-form-urlencoded",
            },
            queryParameters: {},
            hosts: [
              {
                protocol: "https",
                url: "72HX1I220S-dsn.algolia.net",
                accept: 1,
              },
              {
                protocol: "https",
                url: "72HX1I220S.algolia.net",
                accept: 2,
              },
              {
                protocol: "https",
                url: "72HX1I220S-1.algolianet.com",
                accept: 3,
              },
              {
                protocol: "https",
                url: "72HX1I220S-3.algolianet.com",
                accept: 3,
              },
              {
                protocol: "https",
                url: "72HX1I220S-2.algolianet.com",
                accept: 3,
              },
            ],
          },
          appId: "72HX1I220S",
          indexName: "11EB34BFE04099A0B49459260BA52E41_attendee_data",
        },
      },
    },
  });
  const showEditMeetingModalMock = jest.fn();
  beforeEach(() => {});

  it("renders successfully when videochat toggle off at tier level", () => {
    wrapper = mount(
      <Provider store={mockStore}>
        <CreateMeetingModal toggleDialog={showEditMeetingModalMock} />
      </Provider>
    );
    expect(wrapper.find("span").get(0).props.children).toBe("Create meeting");
  });
});
