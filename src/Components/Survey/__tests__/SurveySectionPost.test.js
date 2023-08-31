import React from "react";
import SurveySection from "Components/Survey/SurveySection";
import { shallow } from "enzyme";
import mockSurveyConfigPost from "util/staticData/dummyData/MockSurveyConfigPost";
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
        surveyConfig={mockSurveyConfigPost}
        sessionData={mockSession}
        closeSurveyModal={() => {}}
      />
    );
  });

  it("checks if it is after the end time and shows the post message", () => {
    expect(wrapper.find("p").text()).toContain(
      "Thank you for submitting your CME credit Survey."
    );
  });
});
