import React from "react";
import { Provider } from "react-redux";
import SideNav from "../SideNav";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("services/ConfigService", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("Components/Sidenav/SideNavCard", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("Components/Banners/VerticalSponsorBanner", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("hooks/useGetPageByPathname", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("hooks/useToggleDisplayMQ", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

let wrapper;
const mockStore = createStore((state) => state, {
  global: {
    permissions: {},
    networkSettings: {
      networkingMeetings: {
        meetingFormats: {
          productShowcase: true,
        },
        enableNotifications: true,
      },
    },
  },
  profile: {
    accountProfile: {},
  },
});

beforeEach(() => {
  wrapper = mount(
    <Provider store={mockStore}>
      <SideNav.WrappedComponent />
    </Provider>
  );
});

it("renders without crashing", () => {
  expect(wrapper).not.toEqual(null);
});
