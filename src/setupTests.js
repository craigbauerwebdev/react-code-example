import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
require("jest-canvas-mock");
configure({ adapter: new Adapter() });
