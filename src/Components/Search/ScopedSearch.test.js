import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { createStore } from "redux";
import toJson from "enzyme-to-json";
import ScopedSearch from "./ScopedSearch";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

jest.mock("Components/Search/AccountPageSideBarFilters", () => ({
  AccountPageSideBarFilters: () => "",
}));
jest.mock("Components/OEPAnalytics", () => ({
  OEPAnalytics: () => "",
}));
jest.mock("Components/SVG/SvgTypes", () => ({
  SvgTypes: () => "",
}));
jest.mock("Components/Filters/FilterWrapper", () => ({
  FilterWrapper: () => "",
}));

jest.mock("Components/Filters/DaysList", () => ({
  DaysList: () => "",
}));

describe("Text Checks", () => {
  let wrapper;
  const mockStore = createStore((state) => state, {
    filters: {
      searchTerm: "test",
      pageType: "webinars",
      fullList: [],
    },
  });

  beforeEach(() => {
    const props = {
      preserveFilters: {},
      page: "Networking",
    };
    wrapper = shallow(
      <Provider store={mockStore}>
        <ScopedSearch {...props} />
      </Provider>
    );
  });
  it("snapshot test", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
