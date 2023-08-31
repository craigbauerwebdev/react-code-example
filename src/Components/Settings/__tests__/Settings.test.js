import Settings from "../Settings";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("Components/Profile/FormButtons", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("Components/LinkWrapper/LinkWrapper", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("Components/OEPAnalytics", () => {
  return {
    saveAnalytic: () => {
      return "";
    },
  };
});

jest.mock("hooks/useAccountProfile", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

let wrapper;
const mockStore = createStore((state) => state, {
  global: {
    permissions: {},
    profileConfigurations: {},
    networkSettings: {
      enableNotifications: true,
    },
  },
});

beforeEach(() => {
  wrapper = mount(
    <Provider store={mockStore}>
      <Settings />
    </Provider>
  );
});

it("renders without crashing", () => {
  expect(wrapper).not.toEqual(null);
});
