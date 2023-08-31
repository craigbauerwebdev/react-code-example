import ModalBody from "./ModalBody";
import React from "react";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<ModalBody title={"booya"}>Hello There</ModalBody>);
});
