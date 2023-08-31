import React from "react";
import { shallow } from "enzyme";
import SocialShare from "../SocialShare";
import toJson from "enzyme-to-json";

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

it("renders without crashing", () => {
  const comp = shallow(
    <SocialShare isLiveStream={true} title="Unit Test" page="unit test" />
  );
  expect(toJson(comp)).toMatchSnapshot();
});
