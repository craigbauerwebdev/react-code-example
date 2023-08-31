import Rules from "../Rules";
import React from "react";
import { shallow } from "enzyme";

jest.mock("Components/Modal/Modal", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
    MODAL_TYPES: () => {
      return {};
    },
  };
});

jest.mock("Components/Modal/ModalButtons", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
    BUTTON_TYPES: () => {
      return {};
    },
  };
});

jest.mock("../RuleModal", () => {
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

jest.mock("Components/OEPAnalytics", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

describe("Rules", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Rules rulesData={{ rulesTitle: "Rules" }} />);
  });

  it("Title contains rulesTitle", () => {
    expect(wrapper.find("h2").text()).toContain("Rules");
  });
});
