import React from "react";
import { shallow } from "enzyme";

import App from "../App";

describe("App component", () => {
  it("should include Header", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists("Header")).toEqual(true);
  });

  it("should include container", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists(".container")).toEqual(true);
  });
});
