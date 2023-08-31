import Logout from "../Logout";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { mount } from "enzyme";

jest.mock("Components/Auth/LifeRayAuthMessage", () => {
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
    default: ({ children }) => {
      return <div>{children}</div>;
    },
  };
});

jest.mock("Components/TechnicalSupport/TechnicalSupportModal", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("services/Route", () => {
  return {
    searchCode: () => {
      return "hb_logout";
    },
  };
});

describe("Logout", () => {
  let wrapper;
  const mockStore = createStore((state) => state, {
    global: {
      login: { logout: {}, settings: {} },
      user: {},
    },
    chat: { chatClient: { disconnect: () => {} } },
  });
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  }));

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore}>
        <Logout onLogout={() => {}} />
      </Provider>
    );
  });

  it("renders the heartbeat message", () => {
    expect(wrapper.find("span").text()).toContain("technical support");
  });
});
