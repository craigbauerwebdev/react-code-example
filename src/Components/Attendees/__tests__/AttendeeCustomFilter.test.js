import AttendeeCustomFilter from "../AttendeeCustomFilter";
import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { createStore } from "redux";

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

describe("Test Attendee Custom Filter", () => {
  const mockStore = createStore((state) => state, {});
  const toggleShowMore = () => {};
  const handleCustomFilterChange = () => {};
  const toggleCustomSection = () => {};

  const customFields = [
    {
      pageSearch: false,
      hide: false,
      label: "Interests",
      attr: "Interests",
      checkboxFilter: true,
      checkboxSchema: [
        "Engineering",
        "Music",
        "Sales",
        "Audio",
        "Coffee",
        "Cars",
        "Sports",
        "Stuff",
      ],
    },
    {
      pageSearch: true,
      hide: false,
      label: "Professional Category",
      attr: "professional_category",
      checkboxFilter: true,
      checkboxSchema: [
        "Sports",
        "Basketball",
        "Soccer",
        "Football",
        "Hockey",
        "Tennis",
        "Racketball",
      ],
    },
    {
      pageSearch: false,
      hide: false,
      label: "Favorite Food",
      attr: "favorite_food",
      checkboxFilter: true,
      checkboxSchema: ["Pizza", "Donuts"],
    },
  ];
  const page = "networking attendee list";
  const customFilterToggle = [false, false, false, false];
  const showMore = [false, false, false];

  it("renders without crashing", () => {
    const firstLabel = <span>Interests</span>;
    const secondLabel = <span>Professional Category</span>;
    const thirdLabel = <span>Favorite Food</span>;
    const wrapper = mount(
      <Provider store={mockStore}>
        <AttendeeCustomFilter
          customFields={customFields}
          customFilterToggle={customFilterToggle}
          showMore={showMore}
          page={page}
          onToggleShowMore={toggleShowMore}
          onHandleCustomFilterChange={handleCustomFilterChange}
          onToggleCustomSection={toggleCustomSection}
        />
      </Provider>
    );
    expect(wrapper.contains(firstLabel)).toEqual(true);
    expect(wrapper.contains(secondLabel)).toEqual(true);
    expect(wrapper.contains(thirdLabel)).toEqual(true);
  });
});
