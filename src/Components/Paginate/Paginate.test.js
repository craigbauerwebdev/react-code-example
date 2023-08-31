import { Paginate } from "./Paginate";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("../OEPAnalytics", () => ({
  OEPAnalytics: () => "",
}));

it("Snapshot Test", () => {
  const props = {
    total: 15,
    inc: 10,
  };
  const component = shallow(<Paginate {...props} />);
  expect(toJson(component)).toMatchSnapshot();
});
