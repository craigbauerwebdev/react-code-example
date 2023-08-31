import * as reactModule from "react";

import { applyMiddleware, createStore } from "redux";

import DirectChat from "Components/Chat/DirectChat";
import { Provider } from "react-redux";
import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("stream-chat-react", () => ({
  Chat: () => "Chat",
  Channel: () => "Channel",
  ChannelHeader: () => "ChannelHeader",
  ChannelList: () => "ChannelList",
  InfiniteScrollPaginator: () => "InfiniteScrollPaginator",
  MessageInput: () => "MessageInput",
  MessageList: () => "MessageList",
  MessageTeam: () => "MessageTeam",
  Thread: () => "Thread",
  Window: () => "Window",
}));

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

jest.mock("Components/Modal/ErrorModal", () => "ErrorModal");

jest.mock(
  "Components/Chat/ChannelListDirectChat",
  () => "ChannelListDirectChat"
);

jest.mock("Components/LinkWrapper/LinkWrapper", () => "LinkWrapper");
jest.mock("Components/Loader", () => "Loader");

describe("Test Schedule", () => {
  let toggleDirectChat;
  let setShowErrorModal;
  let setComponentLoaded;
  const mockStore = createStore(
    (state) => state,
    {
      global: {
        user: {},
      },
      chat: {
        channels: {},
        chatUserFlag: false,
        chatClient: {
          on: () => {},
        },
      },
      networkSettings: {
        eventNetworking: {},
      },
    },
    applyMiddleware(thunk)
  );
  beforeEach(() => {});
  it("test without crashing", () => {
    setComponentLoaded = jest.fn((componentLoaded) => {});
    setShowErrorModal = jest.fn((showErrorModal) => {});
    toggleDirectChat = jest.fn((showDirectChat) => {});
    reactModule.useState = jest
      .fn()
      .mockImplementationOnce((showDirectChat) => [
        (showDirectChat = true),
        toggleDirectChat,
      ])
      .mockImplementationOnce((showErrorModal) => [
        (showErrorModal = false),
        setShowErrorModal,
      ])
      .mockImplementationOnce((componentLoaded) => [
        (componentLoaded = false),
        setComponentLoaded,
      ]);
    const matchProps = { xyz: false };
    const wrapper = mount(
      <Provider store={mockStore}>
        <DirectChat match={matchProps} />
      </Provider>
    );
    expect(wrapper.find("OEPAnalytics").get(0).props.componentName).toBe(
      "Channel Chat"
    );
  });
});
