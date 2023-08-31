import getSpeakerNames from "util/getSpeakerNames";
import mockSessionData from "util/staticData/dummyData/mockSessionData";
import mockSessionDataNoSpeakers from "util/staticData/dummyData/mockSessionDataNoSpeakers";

describe("get speaker names util", () => {
  it("Makes a string of all unique speakers for a subsession", () => {
    expect(getSpeakerNames(mockSessionData.subSessions)).toBe(
      "Test User, Lindsey Smith test"
    );
  });
  it("returns empty if no speakers", () => {
    expect(getSpeakerNames(mockSessionDataNoSpeakers.subSessions)).toBe("");
  });
});
