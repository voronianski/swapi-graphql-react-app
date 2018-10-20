import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn()
};
global.sessionStorage = sessionStorageMock;
