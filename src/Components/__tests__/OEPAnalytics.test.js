/*import OEPAnalytics, { saveAnalytic } from "../OEPAnalytics";

import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

jest.mock("services/Auth", () => ({
  Auth: () => "",
}));

jest.mock("axios", () => ({
  axios: () => "",
})); 

jest.mock("detect.js", () => ({
  detect: () => "",
}));

it("renders without crashing", () => {
  const tree = shallow(
    <OEPAnalytics
      title="AnalyticsTest"
      page="AnalyticsTest"
      componentType="AnalyticsTest"
      url="AnalyticsTest"
      componentName="AnalyticsTest"
    />
  );
  expect(saveAnalytic(tree.get(0).props)).toBeDefined();
  expect(toJson(tree)).toMatchSnapshot();
});*/
