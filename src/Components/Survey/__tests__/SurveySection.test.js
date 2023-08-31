import React from "react";
import SurveySection from "Components/Survey/SurveySection";
import { shallow } from "enzyme";
import mockSurveyConfig from "util/staticData/dummyData/MockSurveyConfigPost";
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
  it("renders the survey section", () => {
    shallow(
      <SurveySection
        surveyConfig={mockSurveyConfig}
        sessionData={mockSession}
        closeSurveyModal={() => {}}
      />
    );
  });
});
