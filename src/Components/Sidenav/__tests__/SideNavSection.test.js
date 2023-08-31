import React from "react";
import SideNavSection from "../SideNavSection";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
it("SideNavSection renders without crashing", () => {
  const wrapper = shallow(<SideNavSection title="sign-out" />);
  expect(wrapper.html()).toContain("sign-out");
});

it("snapshot test", () => {
  const wrapper = shallow(<SideNavSection title="sign-out" />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
