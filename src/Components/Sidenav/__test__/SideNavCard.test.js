import React from "react";
import SideNavCard from "../SideNavCard";
import { shallow } from "enzyme";

jest.mock("../scss/sidenav-card.module.scss", () => ({
  cardStyles: () => "",
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));

jest.mock("Components/LinkWrapper/LinkWrapper", () => "LinkWrapper");

describe("Test SideNavCard", () => {
  it("SideNavCard networking Attendee List", () => {
    const sectionRef = {};
    const lnkUrl = "/networking/attendees";
    const menuLabel = "Attendees";
    const iconUrl = "";

    const wrapper = shallow(
      <SideNavCard
        linkUrl={lnkUrl}
        title={menuLabel}
        iconUrl={iconUrl}
        active={false}
        key={menuLabel}
        isNested={false}
        sectionRef={sectionRef}
      />
    );
    expect(wrapper.find("LinkWrapper").get(0).props.page).toBe(
      "networking attendee list"
    );
  });

  it("SideNavCard networking showcase list", () => {
    const sectionRef = {};
    const lnkUrl = "/networking/showcases";
    const menuLabel = "Showcases";
    const iconUrl = "";

    const wrapper = shallow(
      <SideNavCard
        linkUrl={lnkUrl}
        title={menuLabel}
        iconUrl={iconUrl}
        active={false}
        key={menuLabel}
        isNested={false}
        sectionRef={sectionRef}
      />
    );
    expect(wrapper.find("LinkWrapper").get(0).props.page).toBe(
      "networking showcase list"
    );
  });

  it("SideNavCard networking exhibitors list", () => {
    const sectionRef = {};
    const lnkUrl = "/networking/exhibitors";
    const menuLabel = "Exhibitors";
    const iconUrl = "";

    const wrapper = shallow(
      <SideNavCard
        linkUrl={lnkUrl}
        title={menuLabel}
        iconUrl={iconUrl}
        active={false}
        key={menuLabel}
        isNested={false}
        sectionRef={sectionRef}
      />
    );
    expect(wrapper.find("LinkWrapper").get(0).props.page).toBe(
      "networking exhibitors list"
    );
  });
});
