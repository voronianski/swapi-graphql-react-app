import React from "react";
import { shallow } from "enzyme";

import Title from "../Title";

describe("Title component", () => {
  it("should render proper title text", () => {
    const titleText = "Super title!";
    const wrapper = shallow(<Title text={titleText} />);

    expect(wrapper.find(".title-text").text()).toEqual(titleText);
  });
});
