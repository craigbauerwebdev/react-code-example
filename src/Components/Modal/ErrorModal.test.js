import ErrorModal from "./ErrorModal.js";
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: () => ({
    pathname: "mocked-path",
  }),
}));
jest.mock("./ModalButtons", () => {
  return {
    __esModule: true,
    default: () => {
      return "";
    },
  };
});
jest.mock("Components/LinkWrapper/LinkWrapper", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <div>{children}</div>;
    },
  };
});
it("renders without crashing", () => {
  const component = shallow(
    <ErrorModal
      isActive={true}
      onCloseErrorModal={() => null}
      className={"special class"}
    />
  );

  expect(component.find("Modal").length).toEqual(1);
  expect(toJson(component)).toMatchSnapshot();
});
