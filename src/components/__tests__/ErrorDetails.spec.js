import React from "react";
import { shallow, mount } from "enzyme";

import ErrorDetails from "../ErrorDetails";

describe("ErrorDetails component", () => {
  it("should render passed error text", () => {
    const errorText = "Oops!";
    const wrapper = shallow(<ErrorDetails text={errorText} />);

    expect(wrapper.find(".error-details-text").text()).toEqual(errorText);
  });

  it("should render giphy image", () => {
    const wrapper = mount(<ErrorDetails />);

    expect(
      wrapper
        .find(".error-details-image")
        .getDOMNode()
        .getAttribute("src")
    ).toContain("giphy");
  });
});
