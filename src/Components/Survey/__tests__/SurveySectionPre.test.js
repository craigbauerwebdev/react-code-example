import React from "react";
import SurveySection from "Components/Survey/SurveySection";
import { shallow } from "enzyme";
import mockSurveyConfigPre from "util/staticData/dummyData/MockSurveyConfigPre.js";
import mockSession from "util/staticData/dummyData/MockSession";

jest.mock("Components/OEPAnalytics", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

jest.mock("Components/Survey/SurveyForm", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});

describe("Survey Section", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <SurveySection
        surveyConfig={mockSurveyConfigPre}
        sessionData={mockSession}
        closeSurveyModal={() => {}}
      />
    );
  });

  it("checks if it is before the start time and shows the pre message", () => {
    expect(wrapper.find("p").text()).toContain(
      "Please check back after the sessions is over to submit your survey for CME."
    );
  });
});
