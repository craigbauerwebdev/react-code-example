import BlockedUsersPage from "../BlockedUsersPage";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { mount } from "enzyme";

jest.mock("Components/BlockedUser/ManageUserCard", () => ({
  ManageUserCard: () => "",
}));

describe("Text Checks", () => {
  let wrapper;
  const mockStore = createStore((state) => state, {
    profile: { guestProfiles: [], mutedUsers: [], blockedUsers: [] },
  });

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockStore}>
        <BlockedUsersPage.WrappedComponent
          match={{ url: "/account/blocked-users" }}
        />
      </Provider>
    );
  });

  it("renders title text correctly", () => {
    expect(wrapper.find("h1").text()).toContain("Blocked Users");
  });

  it("renders description text correctly", () => {
    expect(wrapper.find("p").text()).toContain(
      "Once you block someone, that person can no longer invite you to events or groups, or start a conversation with you."
    );
  });
});
