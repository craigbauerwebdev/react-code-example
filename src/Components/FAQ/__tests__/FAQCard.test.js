import FAQCard from "../FAQCard";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

jest.mock("Components/Buttons/ExpandToggle", () => "ExpandToggle");

jest.mock("Components/OEPAnalytics", () => "OEPAnalytics");

jest.mock("../scss/faq-card.module.scss", () => ({
  faqCardStyles: () => "",
}));

it("renders without crashing", () => {
  const tree = shallow(<FAQCard page="preevent" />);
  expect(tree.find("OEPAnalytics").get(0).props.page).toBe("preevent");
  expect(toJson(tree)).toMatchSnapshot();
});
