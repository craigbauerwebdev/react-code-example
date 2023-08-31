import PreEvent from "../PreEvent";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

jest.mock("Components/Banners/BannerWrapper", () => "BannerWrapper");

jest.mock("Components/Loader", () => "Loader");

jest.mock("Components/Meta", () => "Meta");

jest.mock("Components/PreEvent/About", () => "About");

jest.mock(
  "Components/PreEvent/PreEventSessionsList",
  () => "PreEventSessionsList"
);

jest.mock("Components/FAQ/FAQs", () => "FAQs");

jest.mock("Components/PreEvent/SponsorCards", () => "SponsorCards");

it("renders without crashing", () => {
  const tree = shallow(<PreEvent />);
  expect(tree.find("lazy").get(2).props.pageName).toBe("preevent");
  expect(toJson(tree)).toMatchSnapshot();
});
