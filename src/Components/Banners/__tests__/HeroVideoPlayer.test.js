import { HeroVideoPlayer } from "../../Banners/HeroVideoPlayer";
import React from "react";
import { shallow } from "enzyme";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => {},
  useEffect: () => {},
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

jest.mock("hooks/useVimeoPlayerAnalytics", () => jest.fn());
jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

describe("", () => {
  beforeEach(() => {});

  it("renders without crashing", () => {
    const videoData = {
      active: true,
      urlId: "0_6G4qivELg",
      autoplay: true,
      sound: true,
      Position: "right",
      starts: "11/5/2021 12:00 am",
      ends: "12/22/2021 02:00 am",
    };
    const component = shallow(<HeroVideoPlayer data={videoData} />);
    expect(component.find("YouTube").get(0).props).toHaveProperty(
      "onReady",
      "onStateChange",
      "onPlaybackQualityChange",
      "onPlaybackRateChange",
      "onPause",
      "onPlay",
      "onEnd",
      "onError"
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
