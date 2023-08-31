import LeaderBoard from "../LeaderBoard";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { mount } from "enzyme";

jest.mock("Components/Loader", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("../LeaderBoardSelect", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("../YourRank", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("../LeaderBoardTable", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("../LeaderBoardSorry", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("../Rules", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

describe("LeaderBoard", () => {
  let wrapper;

  const mockStore = createStore((state) => state, {
    global: {
      timezone: {},
      leaderBoardCMSContent: {
        leaderboard: { leaderboardTitle: "Top Scores", badges: [] },
      },
    },
  });
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  }));

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore}>
        <LeaderBoard />
      </Provider>
    );
  });

  it("Title contains leaderboardTitle", () => {
    expect(wrapper.find("h2").text()).toContain("Top Scores");
  });
});
